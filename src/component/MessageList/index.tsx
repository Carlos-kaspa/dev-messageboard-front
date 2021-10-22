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
    max-height: 100%;
    justify-content: space-between;
    align-items: flex-start;
    overflow-y: hidden;
    flex-wrap: wrap;
    @media(max-width: 700px) {
        padding: 10px;
        height: 100%;
        max-width: 100%;

     
    }   
    
`

const MessageListComponent = styled.div`
    display: flex;
    width: 100%;
    max-height:90vh;
    flex-direction: column;
    justify-content: center;
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

const Message = styled.span`
    border-radius: 30px;
    max-width: 440px;
    padding: 10px 2rem;
    margin-right: 1rem;
    margin-left: 10px;
    align-self: flex-start;
    word-wrap: break-word;
    background: linear-gradient(260deg,rgba(0,0,0,0.3) 50%, #ff008c99 80%, #10c2cfc0 100%);

    
    

    @media(max-width: 700px) {
        max-width: 80%;
    }       

`

const MessageContent = styled.p`

    font-size: 20px;
    line-height: 28px;
    @media(max-width: 700px) {
      font-size: 14px;
    }       
    
`

const MessageUser = styled.div`
    max-width: 90%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    @media(max-width: 700px) {
        margin-top: 2px;
    } 

`
const UserImageDiv = styled.div`
    padding: 2px;
    background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);
    border-radius: 50%;
    line-height: 0;
    @media(max-width: 700px) {
      padding: 1px;
    }

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
    @media(max-width: 700px) {
      font-size: 12px;
    }   

`

const MessageTimeStamp = styled.span`
    font-size: 8px;
    @media(max-width: 700px) {
        
    }
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
        
        return `${createdAt.getHours()}:${createdAt.getMinutes()}`
    }

    const scrollToBottom = () => {
        bottomMessageRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const mountMessageComponent = () => {
        const messagesComponents = messages.map(({text,user,created_at,id}) => ( 
            <>  
                <MessageUser>
                    <UserImageDiv>
                        <UserImage src={user.avatar_url} alt="user profile picture" />
                    </UserImageDiv>
                    <Message key={id} id={id}>
                        <MessageContent> {text} </MessageContent>
                    </Message>
                    <MessageTimeStamp> {formatDate(created_at)} </MessageTimeStamp>

                </MessageUser>  

                
            </>
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