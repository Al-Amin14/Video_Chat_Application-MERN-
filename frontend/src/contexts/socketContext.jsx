import io from 'socket.io-client'
import React from 'react'
import { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
const socketContext = createContext()

export const useSocketContext = () => {
    return useContext(socketContext)
}


export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState([])
    const [OnlineUser, setOnlineUser] = useState([])

    const authUser = localStorage.getItem('id')
    

    useEffect(() => {

        console.log("This is the app begin")

        if (authUser) {

            console.log("Auth is here " + authUser)
            const sockets = io('http://localhost:3000', {
                query: {
                    useId: authUser
                }
            })
            setSocket(sockets)

            sockets.on("getOnlineUsers", (users) => {
                setOnlineUser(users)
                console.log("Socket disconnected")
            })
            return () => sockets.close()
        } else {
            if (socket) {
                socket.close
                setSocket(null)
            }
        }

    }, [authUser]);

    return (<socketContext.Provider value={{ socket, OnlineUser }} >{children}</socketContext.Provider>)
}