
import http from 'http'
import { Server } from "socket.io";
import { IoManager } from './managers/ioManager';


const io = IoManager.getIo(); 
io.on('connection', (client) => { 
    client.on('event',(data)=>{
        console.log(data)
        const type = data.type;

    })
 });
 
io.listen(3000);
