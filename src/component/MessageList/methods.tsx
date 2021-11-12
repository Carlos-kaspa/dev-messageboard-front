import { DateTag, MessageUser, UserImageDiv, UserImage, Message, UserName, MessageContent, MessageTimeStamp, Strong, OwnUserMessage, OwnMessageUser, OwnUserName } from "./components"
import { IMessages } from "./interfaces"

const formatDate = (created_at:string) => {
    const createdAt = new Date(created_at)
    return `${createdAt.getHours()}:${createdAt.getMinutes()}`
}
const formatMessageDateTag = (created_at:string) => {
    const createdAt = new Date(created_at)
    const PTBRMonths = [
        'janeiro', 
        'fevereiro', 
        'março', 
        'abril', 
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ]
    return `${createdAt.getDate()} de ${PTBRMonths[createdAt.getMonth()]} de ${createdAt.getFullYear()}`
}

const createMessageDateTags = (created_at:string) => {
    const createdAt = new Date(created_at)
    return createdAt.toLocaleDateString()
}



export const mountMessageComponent = (messages:any, loggedUser:any) => {
    const messagesByDate = messages.reduce((acum:any,curr:any) => { 
        const {text,user,created_at,id}:IMessages = curr
        const message = {text,user,created_at,id}
        if(!acum[createMessageDateTags(created_at)]){
            acum[createMessageDateTags(created_at)] = []
        }
        acum[createMessageDateTags(created_at)].push(message)
        return acum
    },[])
    const allDates = Object.keys(messagesByDate)
    const messagesComponents = allDates.map((date:string) => ( 
        <>  

            <DateTag>{formatMessageDateTag(messagesByDate[date][0]['created_at'])}</DateTag>
                {   messagesByDate[date].map(({text,user,created_at,id}:IMessages) =>(
                        user?.login === loggedUser?.login 
                            ? (
                                <OwnMessageUser>
                                    <MessageTimeStamp> {formatDate(created_at)} </MessageTimeStamp>
                                    <OwnUserMessage key={id} id={String(id)}>
                                        <OwnUserName >{user.name}</OwnUserName>
                                        <MessageContent> {text} </MessageContent>
                                    </OwnUserMessage>
                                    <a href={`https://github.com/${user.login}`} target="_blank" >
                                        <UserImageDiv>
                                            <UserImage src={user.avatar_url} alt="user profile picture" />
                                        </UserImageDiv>
                                    </a>
                                </OwnMessageUser> 
                            )
                            : (
                                <MessageUser>
                                    <a href={`https://github.com/${user.login}`} target="_blank" >
                                        <UserImageDiv>
                                            <UserImage src={user.avatar_url} alt="user profile picture" />
                                        </UserImageDiv>
                                    </a>
                                    <Message key={id} id={String(id)}>
                                        <UserName>{user.name}</UserName>
                                        <MessageContent> {text} </MessageContent>
                                    </Message>
                                    <MessageTimeStamp> {formatDate(created_at)} </MessageTimeStamp>
                                </MessageUser> 
                            )
                        ))
                }
        </>
    ))

    const noMessageWarning = () => (
        <Message> 
            <Strong> Não há mensagens recentes</Strong>
        </Message>
    )
    return messagesComponents.length > 0 ? messagesComponents : noMessageWarning() 
}