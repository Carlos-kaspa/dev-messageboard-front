
import { VscGithubInverted } from "react-icons/vsc"
import { FormEvent, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth"
import { api } from "../../services/api"
import { HiArrowRight } from "react-icons/hi";
import { SendMessageFormWrapper, UserInfo, UserImageDiv, UserImage, UserName, UserGithub, Form, FormLabel, TextArea, SubmitButton } from "./components";


const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return width < 700 
}

export const SendMessageForm = () => {
    const { user, signOut } = useContext(AuthContext)
    const [ message, setMessage ] = useState<string>('')
    const [isMobileSize, setIsMobileSize] = useState(getWindowDimensions());
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobileSize(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
    }, [])
    
    const handleSendMessage = async (e:FormEvent) => {
        e.preventDefault()

        if(!message.trim()){
           return false
        }
       
        await api.post('/messages', {
            message: message
        })

        setMessage('')
    }

    return (
        <SendMessageFormWrapper>
        <UserInfo>
            <UserImageDiv>
                <UserImage src={user?.avatar_url} alt={`${user?.name} profile picture`} />
            </UserImageDiv>
            <UserName>{user?.name}</UserName>
            <UserGithub> <VscGithubInverted size='16' style={{marginRight: 10}}/>{user?.login}</UserGithub>

            <Form >
                <FormLabel htmlFor="message"> Mensagem </FormLabel>
                <TextArea 
                    name="message" 
                    id="message" 
                    placeholder="Digite uma mensagem"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <SubmitButton onClick={(e) => handleSendMessage(e)}> {isMobileSize ? <HiArrowRight size='32' /> : 'enviar'} </SubmitButton>
            </Form>
        </UserInfo>

         
        </SendMessageFormWrapper>
    )
}