import styled from "styled-components"
import { VscGithubInverted } from 'react-icons/vsc'
import { useContext } from "react"
import { AuthContext } from "../../context/auth"
import { LoginBoxImage } from "../LoginBoxImage"

const LoginBoxWrapper = styled.div`
        height: 100vh;
        width: 100%;
        background: #000000;
        
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media(max-width: 700px) {
            position: fixed;
            top: 0;
            width: 100vw;
            height: 100vh;
        } 
      
        
    `


    const Div = styled.div`
        position: relative;
        margin-bottom: 2rem;
        @media(max-width: 700px) {
           position: absolute;
           width: 100%;
           height: 100px;
           top: 5rem;
        } 
    `

    const Strong = styled.strong`
        font-size: 65px;
        line-height: 36px;
        font-family: 'Dela Gothic One', cursive;
        @media(max-width: 700px) {
            font-size: 50px;
            width: 100%;
        } 
    `
    const Subtitle = styled.strong`
        font-size: 50px;
        line-height: 36px;
        font-family: 'Dela Gothic One', cursive;
        font-family: 'Roboto', sans-serif;
        color:#ff008cd5;
        position: absolute;
        top: 20px;
        right: 0;
        text-shadow:3px 2px 2px #21cbcd;

        @media(max-width: 700px) {
            width: 100%;
            font-size: 30px;
            text-align: right;
            right: 2rem;

        } 
    `
    const ScreenName = styled.h1`
        font-size: 20px;
        margin-top: 10px;
        line-height: 20px;
        font-family: 'Montserrat', sans-serif;
        color:#d4d4d4;
        text-align: right;
        

        @media(max-width: 700px) {
            position: absolute;
            width: 100%;
            right: 2rem;
           
        } 
    `
    const Message = styled.p`
        font-size: 14px;
        line-height: 14px;
        font-family: 'Roboto', sans-serif;
        color:#c6ebf0d2;
        

        @media(max-width: 700px) {
            position: absolute;
            bottom: 5rem;
            width: 300px;
        } 
    `

    const Message2 = styled.p`
        font-size: 14px;
        line-height: 14px;
        font-family: 'Roboto', sans-serif;
        color:#c6ebf0d2;
        

        @media(max-width: 700px) {
            position: absolute;
            bottom: 3rem;
            width: 300px;
        } 
    `
    const SignIn = styled.a`
        background: rgb(255,0,142);
        background: linear-gradient(90deg, #dac4c4 52%, #0b91dfcf 52%);
        margin-top: 32px;
        padding: 0 40px;
        height: 56px;
        color: #000000;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: none;
        border-radius: 30px;
        /* transform: rotate(-20deg); */
        display: inline-block;
        /* -ms-transform: rotate(-20deg); */
        /* -webkit-transform: rotate(-20deg); */

        display: flex;
        align-items: center;
        justify-content: center;

        animation:spin 4s ease-in-out infinite ;
        
        @keyframes spin { 
            0% { 
                -webkit-transform: rotate(-10deg); 
                transform:rotate(-10deg); 
            }
            50% { 
                -webkit-transform: rotate(-20deg); 
                transform:rotate(-20deg); 
            }
            100% { 
                -webkit-transform: rotate(-10deg); 
                transform:rotate(-10deg); 
            }  
        }                                           

        :hover {
            filter: brightness(0.9);
        }

        @media(max-width: 700px) {
            position: absolute;
            top: 400px;
        } 
    `
    
export const LoginBox = () => {

    const { signInUrl } = useContext(AuthContext)
    const randomMessageIndex = Math.floor(Math.random() * 10)
    const messages = [
        "It's good for your health!",
        "Loga aí e comenta!", "Sim, essas mensagens são aleatórias!",
        "Salve Dev!", 
        "(͠≖ ͜ʖ͠≖)👌",
        "Visita meu linkedIn aê! @carlos-lima-cl1", 
        "Me segue no instagram @carloxxlima !",
        "Projeto da Next Level Week - 07 by RocketSeat",
        "O̲ppa̲ (っ-̶●̃益●̶̃)っ ,︵‿ S̲t̲yl̲e̲",
        "No backend isso aqui é socket.io, prisma e express...",
        "No front é react e Vite como bundler",
        "Sim, eu gosto de retrowave... talvez até demais..."
    ]
    
    return (
        <LoginBoxWrapper>
            <Div >
                <Strong> シャーロット </Strong>
                <Subtitle> Шарлотта</Subtitle>
                <ScreenName> p h o n k   b o a r d </ScreenName>
            </Div>
            <LoginBoxImage/>
            <Message> {messages[randomMessageIndex]}</Message>
            <SignIn href={signInUrl}>
                <VscGithubInverted 
                    size='25' 
                    style={{paddingRight: 6}}
                /> 
                {randomMessageIndex === 0 ? 'Akira' : 'Entrar'} 
            </SignIn>
            <br/>
            <br/>
            {randomMessageIndex === 0 ? <Message2> pegou a referência de Akira ? </Message2> : null}
        </LoginBoxWrapper>
    )
}