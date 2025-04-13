"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const ioManager_1 = require("./managers/ioManager");
class Quiz {
    constructor(roomId) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProb = 0;
        this.users = [];
        this.currentState = 'notStarted';
    }
    addProblem(problem) {
        this.problems.push(problem);
    }
    start() {
        this.hasStarted = true;
        const io = ioManager_1.IoManager.getIo();
        io.emit('change-problem', {
            problem: this.problems[0],
        });
        this.problems[0].startTime = new Date().getTime();
        this.problems[0].submission = [];
    }
    next(roomId) {
        this.activeProb++;
        const problem = this.problems[this.activeProb];
        const io = ioManager_1.IoManager.getIo();
        if (problem) {
            problem.startTime = new Date().getTime();
            io.emit('change-problem', {
                problem
            });
        }
        else {
            //leaderBoard
            const io = ioManager_1.IoManager.getIo();
            io.emit('quiz-ended', {
                leaderBoard: this.getLeaderBoard()
            });
        }
    }
    setActiveProblem(problem) {
        problem.startTime = new Date().getTime();
        problem.submission = [];
    }
    addUser(name) {
        const id = Math.random().toString(36).substring(2, 15);
        this.users.push({
            name, id, points: 0
        });
        return id;
    }
    getLeaderBoard() {
        return this.users.sort((a, b) => { return (a.points < b.points ? 1 : -1); }).splice(0, 20);
    }
    submit(problemId, userId, submission) {
        // TODO: 
        const problem = this.problems.find((x) => x.id === problem.id);
        if (problem) {
            const existingSubmission = problem.submission.find((x) => x.userId === userId);
            const user = this.users.find((x) => x.id === userId);
            if (!user)
                return;
            if (existingSubmission)
                return;
            problem.submission.push({
                problemId,
                userId,
                isCorrect: submission == problem.answer,
                selectedOption: submission,
            });
            user.points += 1000 - 500 * (new Date().getTime() - problem.startTime) / 20;
        }
    }
    getCurrentState() {
        if (this.currentState === 'notStarted') {
            return {
                state: 'notStarted',
            };
        }
        else if (this.currentState === 'leaderBoard') {
            return {
                title: 'leaderBoard',
                leaderBoard: this.getLeaderBoard()
            };
        }
        else if (this.currentState === 'ended') {
            return {
                title: 'ended',
                leaderBoard: this.getLeaderBoard()
            };
        }
        else {
            return {
                title: 'question',
                problem: this.problems[this.activeProb]
            };
        }
    }
}
exports.Quiz = Quiz;
