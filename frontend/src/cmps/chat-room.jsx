import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'


export function ChatRoom({selectedToy}) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState(selectedToy._id.toString())
    
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    
    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return <section className='chat'>
        <h4>Chat about {`${selectedToy.name}`}:</h4>
        <form onSubmit={sendMsg}>
            <input
                type="text" value={msg.txt} onChange={handleFormChange}
                name="txt" autoComplete="off" />
            <button>Send</button>
        </form>

        <ul>
            {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
        </ul>
    </section>
}