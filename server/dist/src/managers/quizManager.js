"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizManager = void 0;
let globalId = 0;
class QuizManager {
    constructor() {
        this.quizes = [];
    }
    start(roomId) {
        const quiz = this.getQuizs(roomId);
        if (!quiz)
            return;
        quiz.start();
    }
    addProblem(roomId, problem) {
        const quiz = this.getQuizs(roomId);
        if (!quiz)
            return;
        quiz.addProblem(Object.assign(Object.assign({}, problem), { startTime: new Date().getTime(), submission: [], id: (globalId++).toString() }));
    }
    next(roomId) {
        const quiz = this.getQuizs(roomId);
        if (!quiz)
            return;
        quiz.next(roomId);
    }
    addUser(name, roomId) {
        var _a;
        return (_a = this.getQuizs(roomId)) === null || _a === void 0 ? void 0 : _a.addUser(name);
    }
    submit(problem, userId, submission, quizId) {
        var _a;
        (_a = this.getQuizs(quizId)) === null || _a === void 0 ? void 0 : _a.submit(problem, userId, submission);
    }
    getQuizs(quizId) {
        var _a;
        return (_a = this.quizes.find((quiz) => quiz.roomId === quizId)) !== null && _a !== void 0 ? _a : null;
    }
    getCurrentState(quizId) {
        const quiz = this.getQuizs(quizId);
        if (!quiz)
            return null;
        return quiz.getCurrentState();
    }
}
exports.QuizManager = QuizManager;
