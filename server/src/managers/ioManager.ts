import { Server } from "socket.io";
import http from 'http';
const server = http.createServer();

// let io: Server | null = null;

// export function getIo(): Server {
//     if (!io) {
//         io = new Server(server);
//     }
//     return io;
// }

export class IoManager{
    private static io:any;
    private static instance:IoManager;
    
    public static getIo(){
        if(!this.instance){
            this.instance = new IoManager();
            const io = new Server(server,{
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                  }
            })
            this.io = io;
        }
        return this.io;
    } 
}