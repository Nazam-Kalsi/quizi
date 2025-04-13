import { Socket } from "socket.io"
import { QuizManager } from "./quizManager";
const ADMIN_PASSWORD = "qwerty"
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
           socket.emit('init',{
            userId,
            state:this.quizManager.getCurrentState(roomId)
        });

        socket.on('admin-join',(data)=>{
            const userId =  this.quizManager.addUser(data.name, data.roomId);
            if(data.password !== ADMIN_PASSWORD) return;
            socket.emit('admin-init',{
                userId,
                state:this.quizManager.getCurrentState(roomId)
            });

            socket.on('create-problem',(data)=>{
                this.quizManager.addProblem(data.roomId,data.problem)
            })

            socket.on('next',({roomId})=>{
                this.quizManager.next(roomId)
            })

        })

       
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