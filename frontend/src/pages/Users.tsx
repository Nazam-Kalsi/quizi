import React from 'react'
import { Socket } from 'socket.io-client'

type Props = {socket :Socket}

function Users({socket}: Props) {
  return (
    <div>Users</div>
  )
}

export default Users