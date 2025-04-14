
import http from 'http'
import { Server } from "socket.io";
import { IoManager } from './managers/ioManager';


const io = IoManager.getIo(); 

io.on('connection', (socket:any) => { 
        socket.emit('j',socket.id);

        console.log("ID : ",socket.id)

})
 
io.listen(3000,()=>{
    console.log("first")
});
