import { Quiz } from "../quiz";
import { IoManager } from "./ioManager";

export class QuizManager {
  private quizes: Quiz[];
  constructor() {
    this.quizes = [];
  }

  public start(roomId:string){
    const io = IoManager.getIo();
    io.to(roomId).emit('start quiz',{
    })
  }
  public next(roomId:string){
    const io = IoManager.getIo();
    io.to(roomId).emit('start quiz',{
    })
  }

  addUser(name:string, roomId:string){
     return this.getQuizs(roomId)?.addUser(name);
  }

  submit(problem:string,userId:string,submission:1|2|3|4, quizId:string){
    this.getQuizs(quizId)?.submit(problem,userId,submission);
  }

  getQuizs(quizId:string){
    return this.quizes.find((quiz)=>quiz.roomId===quizId) ?? null;
  }

}
