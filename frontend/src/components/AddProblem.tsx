import React, { useState } from 'react'
import { Socket } from 'socket.io-client'

type Props = {
    socket:Socket;
    quizId:string;
}

function AddProblem({socket, quizId}: Props) {
    const [title,setTitle] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const [answer,setAnswer] = useState(0);
    
    const [options, setOptions] = useState<{ key: number; value: string }[]>([
        { key: 0, value: '' },
        { key: 1, value: '' },
        { key: 2, value: '' },
        { key: 3, value: '' },
    ]);

    const addProblem = () => {
        socket.emit('create-problem',{
            title,description,quizId,options,answer
        })
    }

  return <div>
    
    <p>title</p><input type="text" onChange={(e)=>setTitle(e.target.value)}/>
    <p>descripion</p><input type="text" onChange={(e)=>setDescription(e.target.value)}/>
       <br/>
       <br/>
       <p>Options</p>
        {options &&
            options.map((x,index) => (
                <div key={index}>
                    <input type="radio" checked = {x.key===answer} onChange={()=>setAnswer(x.key)}/>
                <input
                    key={x.key}
                    type="text"
                    value={x.value}
                    onChange={(e) =>
                        setOptions((prev) =>
                            prev.map((opt) =>
                                opt.key === x.key ? { ...opt, value: e.target.value } : opt
                )
            )
        }
        />
        
        </div>
            ))}
           <button onClick={addProblem}>Add</button>
            </div>
}

export default AddProblem