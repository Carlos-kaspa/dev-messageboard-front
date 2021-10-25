import { useEffect, useRef, useState } from "react"
import { api } from '../../services/api'
import io from 'socket.io-client'
import { BottomMessage, MessageListComponent, MessageListWrapper } from "./components"
import { IMessages } from "./interfaces"
import { mountMessageComponent } from "./methods"



const messageQueue: IMessages[] = []
const baseUrl:any = import.meta.env.VITE_BASE_API_URL
const socket = io(String(baseUrl))

socket.on('new_message', newMessage => {
    console.log('new message: ', newMessage)
    messageQueue.push(newMessage)
})

export const MessageList = () => {

    const [ messages, setMessages ] = useState<IMessages[]>([])
    const bottomMessageRef = useRef<any>()
    const scrollToBottom = () => {
        bottomMessageRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
    useEffect(() => {
        api.get(`/messages/latest?amount=100`)
            .then(({ data }:any) => setMessages(data))
        scrollToBottom()

    },[])
   
    useEffect(() => {
        const timer = setInterval(() => {
            if(messageQueue.length > 0){
                
                setMessages(prevState => [
                    ...prevState,
                    messageQueue[0]
                ].filter(Boolean))
              
                messageQueue.shift()
                scrollToBottom()
            }
        }, 3000)
    },[])

    useEffect(() => {
        scrollToBottom()
    },[messages])

    

    return (
        <>
            <MessageListWrapper>
                <MessageListComponent>
                    {mountMessageComponent(messages)}
                    <BottomMessage ref={bottomMessageRef} id='bottomDiv'/>
                </MessageListComponent>
            </MessageListWrapper>
        </>
    )
}