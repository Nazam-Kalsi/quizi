import React, { useEffect } from 'react'
import { Socket } from 'socket.io-client'

type Props = {socket:Socket}

function Admin({socket}: Props) {

    useEffect(()=>{
        socket.on('connection',()=>{
            console.log(socket.id);
        })

        socket.emit('admin-join',{
          password:'qwerty'
        })

    },[])
  return (
    <div>Admin</div>
  )
}

export default Admin