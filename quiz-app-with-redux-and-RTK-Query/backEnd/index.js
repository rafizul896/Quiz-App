"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Create Express app
const app = (0, express_1.default)();
app.use(body_parser_1.default.json()); // To parse JSON bodies
app.use((0, cors_1.default)({ origin: ['http://localhost:5173'] }));
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/quizApp');
// Quiz Schema (with embedded questions)
const quizSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const Quiz = mongoose_1.default.model('Quiz', quizSchema);
// Create Quiz Route (POST /api/quizzes)
app.post('/api/quizzes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, questions } = req.body;
    if (!title || !questions || questions.length === 0) {
        return res.status(400).send('Title and questions are required.');
    }
    try {
        const quiz = new Quiz({ title, description, questions });
        yield quiz.save();
        res.status(201).send(quiz);
    }
    catch (error) {
        res.status(500).send('Error creating quiz: ' + error);
    }
}));
// Get All Quizzes Route (GET /api/quizzes)
app.get('/api/quizzes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield Quiz.find();
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).send('Error fetching quizzes: ' + error);
    }
}));
// Get Single Quiz by ID (GET /api/quizzes/:id)
app.get('/api/quizzes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.params.id;
    try {
        const quiz = yield Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).send('Quiz not found');
        }
        res.json(quiz);
    }
    catch (error) {
        res.status(500).send('Error fetching quiz: ' + error);
    }
}));
// Update Quiz Route (PUT /api/quizzes/:id)
app.patch('/api/quizzes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.params.id;
    const { title, description, questions } = req.body;
    if (!title || !questions || questions.length === 0) {
        return res.status(400).send('Title and questions are required.');
    }
    try {
        const quiz = yield Quiz.findByIdAndUpdate(quizId, { title, description, questions, updatedAt: Date.now() }, { new: true });
        if (!quiz) {
            return res.status(404).send('Quiz not found');
        }
        res.json(quiz);
    }
    catch (error) {
        res.status(500).send('Error updating quiz: ' + error);
    }
}));
// Delete Quiz Route (DELETE /api/quizzes/:id)
app.delete('/api/quizzes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.params.id;
    try {
        const quiz = yield Quiz.findByIdAndDelete(quizId);
        if (!quiz) {
            return res.status(404).send('Quiz not found');
        }
        res.json({ message: 'Quiz deleted successfully' });
    }
    catch (error) {
        res.status(500).send('Error deleting quiz: ' + error);
    }
}));
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
