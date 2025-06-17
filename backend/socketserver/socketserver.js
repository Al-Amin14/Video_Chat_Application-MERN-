import express from 'express'
const app = express()

import http from 'http'
import { Server } from 'socket.io'

const servre=http.createServer(app)
const io=new Server(servre,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET',"POST"]
    }
})

const users={}
io.on('connection',(socket)=>{
    console.log('New client connected ',socket.id)

    const userId=socket.handshake.query.useId
    if(userId){
        users[userId]=socket.id
        console.log("hello ",users)
    }

    io.emit("getOnlineUsers",Object.keys(users))

    socket.on("diconnect",()=>{
        console.log('Client disconnected ',socket.id)
        delete users[userId]
        io.emit("getOnlineUsers",Object.keys(users))
    })

})

export {app,io,servre}
