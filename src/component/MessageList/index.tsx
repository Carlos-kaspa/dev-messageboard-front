import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { api } from '../../services/api'
import io from 'socket.io-client'

interface IUserInfo {
    avatar_url: string,
    github_id: number,
    id: string,
    login: string,
    name: string
}

interface IMessages {
    created_at: string,
    id: string,
    text: string,
    user: IUserInfo,
    user_id: string,
}


const MessageListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    justify-content: space-between;
    align-items: flex-start;
    overflow-y: hidden;
    
`

const MessageListComponent = styled.ul`
    list-style: none;
    display: flex;
    width: 100%;
    max-height:90vh;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    flex: 1;
    overflow-y: scroll;
    /* width */
    ::-webkit-scrollbar {
    width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #1d1d20;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);

    }
    
`

const Message = styled.li`
    max-width: 440px;
    min-width: 300px;
    padding: 20px;
    margin-right: 3rem;
    align-self: flex-start;
    word-wrap: break-word;
    border: 2px solid transparent;
    border-image: linear-gradient(30deg, #ff008e, #ffcd1e) 1 100%;
    background-color: #1d1d20;
    
    :nth-child(even) {
        align-self: flex-end;
        margin-left: 3rem;
    }       

`

const MessageContent = styled.p`
    font-size: 20px;
    line-height: 28px;
`

const MessageUser = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;
`
const UserImageDiv = styled.div`
    padding: 2px;
    background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);
    border-radius: 50%;
    line-height: 0;
`

const UserImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50% ;
    border: 4px solid #121214;
`
const UserName = styled.span`
    margin-left: 12px;
    font-size: 16px;

`

const MessageTimeStamp = styled.span`
    font-size: 8px;
`

const Strong = styled.strong`
`

const BottomMessage = styled.div`
`

interface Props {
    messageAmount: number
}

const messageQueue: IMessages[] = []
const baseUrl:any = import.meta.env.VITE_BASE_API_URL
const socket = io(String(baseUrl))

socket.on('new_message', newMessage => {
    console.log('new message: ', newMessage)
    messageQueue.push(newMessage)
})

export const MessageList = () => {

    const [ messages, setMessages ] = useState<IMessages[]>([])
    const [ scrollTracker, setScrollTracker ] = useState()
    const bottomMessageRef = useRef<any>()
    
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

    const formatDate = (created_at:string) => {
        const createdAt = new Date(created_at)
        const options:any = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        return `${createdAt.toLocaleDateString("pt-BR", options)} - ${createdAt.getHours()}:${createdAt.getMinutes()}`
    }

    const scrollToBottom = () => {
        bottomMessageRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const mountMessageComponent = () => {
        const messagesComponents = messages.map(({text,user,created_at,id}) => (                                
            <Message key={id} id={id}>
                <MessageTimeStamp> {formatDate(created_at)} </MessageTimeStamp>
                <MessageContent> {text} </MessageContent>
                <MessageUser>
                    <UserImageDiv>
                        <UserImage src={user.avatar_url} alt="user profile picture" />
                    </UserImageDiv>
                    <UserName> {user.name} </UserName>
                </MessageUser>
            </Message>
        ))
        
        const noMessageWarning = () => (
            <Message> 
                <Strong> Não há mensagens recentes</Strong>
            </Message>
        )
        return messagesComponents.length > 0 ? messagesComponents : noMessageWarning() 
    }


    return (
        <>
            
            <MessageListWrapper>
                <MessageListComponent>
                    {mountMessageComponent()}
                    <BottomMessage ref={bottomMessageRef} id='bottomDiv'/>
                </MessageListComponent>
            </MessageListWrapper>
        </>
    )
}