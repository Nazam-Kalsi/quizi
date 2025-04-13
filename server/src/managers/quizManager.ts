import { Quiz } from "../quiz";
import { IoManager } from "./ioManager";
let globalId =0;
export class QuizManager {
  private quizes: Quiz[];
  constructor() {
    this.quizes = [];
  }

  public start(roomId:string){
    const quiz = this.getQuizs(roomId);
    if(!quiz)return;
    quiz.start();
  }

  public addProblem(roomId:string,problem:{
    title:string;
    description:string;
    answer:string;
    options:{
        id:number;
        title:string
    }[];
   
  }){
    const quiz = this.getQuizs(roomId);
    if(!quiz)return;

    quiz.addProblem({
      ...problem,
      startTime:new Date().getTime(),
      submission:[],
      id:(globalId++).toString()
    })

    
  }

  public next(roomId:string){
    const quiz = this.getQuizs(roomId);
    if(!quiz)return;

    quiz.next(roomId);
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

  getCurrentState(quizId:string){
    const quiz = this.getQuizs(quizId);
    if(!quiz) return null;
    return quiz.getCurrentState();
  }

}
