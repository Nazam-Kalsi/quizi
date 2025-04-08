import { Socket } from "socket.io"
import { QuizManager } from "./quizManager";

export class UserManager{
    private users:{
        roomId:string,
        socket:Socket
    }[];

    private quizManager;
    constructor(){
        this.users=[];
        this.quizManager = new QuizManager();
    };
    addUser(roomId:string,socket:Socket){
        this.users.push({roomId,socket});
        this.createHandler(roomId, socket);
    }
    private createHandler(roomId:string, socket:Socket){
        socket.on('join',(data)=>{
           const userId =  this.quizManager.addUser(data.name, data.roomId);
           socket.emit('join',{userId});
           socket.on('submit',(data)=>{
                const userId =data.userId;
                const problem = data.problem;
                const submission = data.submission;
                const quizId=data.roomId;

                if(submission !=1 ||submission !=2 ||submission !=3 ||submission !=4 ){
                    console.log('Invalid submission',submission);
                    return;
                }

                this.quizManager.submit(problem,userId,submission,quizId)
           })

        })
    }

}