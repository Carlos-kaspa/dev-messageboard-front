import styled from "styled-components"
import { VscGithubInverted, VscSignOut } from "react-icons/vsc"
import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../context/auth"
import { api } from "../../services/api"

const SendMessageFormWrapper = styled.div`
    background: #1b1b1f;
    padding: 24px;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
`

const SignOutButton = styled.button`
    display: flex;
    align-items: center;
    align-content: center;
    background: transparent;
    border: 0;
    color: #c4c4cc;
    position: absolute;
    left: 24px;
    top: 24px;
    cursor: pointer;
    :hover{
        filter: brightness(0.9);
    }


`

const UserInfo = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

`

const UserImageDiv = styled.div`
    padding: 3px;
    background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);
    border-radius: 50%;
    line-height: 0;
`

const UserImage = styled.img`
    width: 94px;
    height: 94px;
    border-radius: 50% ;
    border: 6px solid #121214;
`
const UserName = styled.strong`
    font-size: 24px;
    line-height: 30px;
    margin-top: 16px;
`
const UserGithub = styled.span`
    display: flex;
    align-items: center;
    margin-top: 8px;
    color: #c4c4cc;

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    margin-top: 48px;
    background: #202024;
    width: 400px;
`

const FormLabel = styled.label`
    padding: 18px 24px;
    font-size: 20px;
    background: #29292e;
    font-weight: bold;
    text-align: left;
`
const TextArea = styled.textarea`
    background: transparent;
    color:  #ffcd1e;
    border: 0;
    padding: 24px;
    resize: none;
    height: 160px;
    font-size: 16px;
    line-height: 24px;

    :focus {
        outline: 0;
    }

    ::placeholder {
        color: #9d9d99;
    }
`

const SubmitButton = styled.button`
    background: #ff008e;
    margin: 24px;
    padding: 0 32px;
    height: 56px;
    color: #09090a;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    display: flex;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    cursor: pointer;
    :hover{
        filter: brightness(0.9)
    }
`
export const SendMessageForm = () => {
    const { user, signOut } = useContext(AuthContext)
    const [ message, setMessage ] = useState<string>('')

    

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
        <SignOutButton onClick={signOut}> <VscSignOut size='32' style={{paddingRight: 5}}/> Sair </SignOutButton>
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
                <SubmitButton onClick={(e) => handleSendMessage(e)}> Enviar </SubmitButton>
            </Form>
        </UserInfo>

         
        </SendMessageFormWrapper>
    )
}