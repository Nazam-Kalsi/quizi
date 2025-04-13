"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const quizManager_1 = require("./quizManager");
const ADMIN_PASSWORD = "qwerty";
class UserManager {
    constructor() {
        this.users = [];
        this.quizManager = new quizManager_1.QuizManager();
    }
    ;
    addUser(roomId, socket) {
        this.users.push({ roomId, socket });
        this.createHandler(roomId, socket);
    }
    createHandler(roomId, socket) {
        socket.on('join', (data) => {
            const userId = this.quizManager.addUser(data.name, data.roomId);
            socket.emit('init', {
                userId,
                state: this.quizManager.getCurrentState(roomId)
            });
            socket.on('admin-join', (data) => {
                const userId = this.quizManager.addUser(data.name, data.roomId);
                if (data.password !== ADMIN_PASSWORD)
                    return;
                socket.emit('admin_init', {
                    userId,
                    state: this.quizManager.getCurrentState(roomId)
                });
                socket.on('create-problem', (data) => {
                    this.quizManager.addProblem(data.roomId, data.problem);
                });
                socket.on('next', ({ roomId }) => {
                    this.quizManager.next(roomId);
                });
            });
            socket.on('submit', (data) => {
                const userId = data.userId;
                const problem = data.problem;
                const submission = data.submission;
                const quizId = data.roomId;
                if (submission != 1 || submission != 2 || submission != 3 || submission != 4) {
                    console.log('Invalid submission', submission);
                    return;
                }
                this.quizManager.submit(problem, userId, submission, quizId);
            });
        });
    }
}
exports.UserManager = UserManager;
