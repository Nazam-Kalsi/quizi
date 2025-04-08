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
    }
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

    constructor(roomId:string){
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProb = 0;
        this.users = []
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

    next(){
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
                leaderBoard:this.getLeaderBoard().splice(0,10),
            })
        }        
    }

    addUser(name:string){
        const id = Math.random().toString(36).substring(2, 15)
        this.users.push({
            name,id,points:0
        })
        return id;
    }

    getLeaderBoard(){
        return this.users.sort((a,b)=>{
            if(a.points>b.points) return -1;
            if(a.points<b.points) return 1;
            return 0;
        })
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
    

}