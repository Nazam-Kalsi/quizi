import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import AddProblem from '../components/AddProblem';

type Props = {socket:Socket}

function Admin({socket}: Props) {

  const [roomId, setRoomId] = useState<string | null >(null);
  const [quizId, setQuizId] = useState<string | null >(null);
    useEffect(()=>{
        socket.on('j',(s)=>{
            console.log("socket id : ",s);
        })
        socket.emit('admin-join',{
          password:'qwerty'
        })
    },[])

    const createRoom = ()=>{
      setQuizId(roomId)

      socket.emit('create-quiz',roomId);
    }
  return !quizId ?(
    <div>
      <p>Room ID</p>
      <input type="text" onChange={(e)=>setRoomId(e.target.value)}/>
      <button onClick={createRoom}>Create</button>
    </div>
  ):<AddProblem socket={socket} quizId = {quizId}/>
}

export default Admin