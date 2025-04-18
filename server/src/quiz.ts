import { IoManager } from "./managers/ioManager";

interface Submission{
    problemId: string;
    userId:string;
    isCorrect:boolean;
    selectedOption:1|2|3|4;
}

interface Problems{
    id:string;
    title:string;
    description:string;
    answer:string;
    options:{
        id:number;
        title:string
    }[]
    startTime:number
    submission:Submission[];
}

interface Users{
    name:string;
    id:string;
    points:number
}

export class Quiz{
    public roomId:string;
    private hasStarted:boolean;
    private problems:Problems[];
    private activeProb:number;
    private users:Users[];
    private currentState: 'ended' | 'notStarted' | 'leaderBoard' | 'question'

    constructor(roomId:string){
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProb = 0;
        this.users = [];
        this.currentState = 'notStarted';
    }

    addProblem(problem:Problems){
        this.problems.push(problem);
    }
    start(){
        this.hasStarted = true;
        const io = IoManager.getIo();
        io.emit('change-problem',{
            problem:this.problems[0],
        })
        this.problems[0].startTime = new Date().getTime();
        this.problems[0].submission = [];
    }

    next(roomId:string){
        this.activeProb++;
        const problem = this.problems[this.activeProb];
        const io = IoManager.getIo();
        if(problem){
            problem.startTime = new Date().getTime();
            io.emit('change-problem',{
                problem
            })
        }else{
            //leaderBoard
            const io = IoManager.getIo();

            io.emit('quiz-ended',{
                leaderBoard:this.getLeaderBoard()
            })
        }        
    }

    setActiveProblem(problem:Problems){
        problem.startTime = new Date().getTime();
        problem.submission = [];

    }

    addUser(name:string){
        const id = Math.random().toString(36).substring(2, 15)
        this.users.push({
            name,id,points:0
        })
        return id;
    }

    getLeaderBoard(){
        return this.users.sort((a,b)=>{return ( a.points<b.points?1:-1)}).splice(0,20);
    }

    submit(problemId:string,userId:string,submission:1|2|3|4){
        // TODO: 
        const problem:any = this.problems.find((x)=>x.id===problem.id);
        if(problem){
            const existingSubmission = problem.submission.find((x:any)=>x.userId===userId);
            const user = this.users.find((x)=>x.id===userId);
            if(!user) return;
            if(existingSubmission)return;

            problem.submission.push({
                problemId,
                userId,                
                isCorrect:submission==problem.answer,
                selectedOption:submission,
            })

            user.points += 1000-500*(new Date().getTime() - problem.startTime) /20;
        }
      }
    
      getCurrentState(){
            if(this.currentState === 'notStarted'){
                return {
                    state:'notStarted',
                }

            }
            else if(this.currentState === 'leaderBoard'){
                return {
                    title:'leaderBoard',
                    leaderBoard:this.getLeaderBoard()
                }
            }
            else if( this.currentState === 'ended'){
                return {
                    title:'ended',
                    leaderBoard:this.getLeaderBoard()
                }
            }
            else{
                return{
                    title:'question',
                    problem: this.problems[this.activeProb] 
                }
            }
                
      }

}