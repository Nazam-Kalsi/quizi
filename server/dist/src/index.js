"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioManager_1 = require("./managers/ioManager");
const io = ioManager_1.IoManager.getIo();
io.on('connection', (client) => {
    client.on('event', (data) => {
        console.log(data);
        const type = data.type;
    });
});
io.listen(3000,()=>{
    console.log('Works')
});
