import styled from "styled-components"
import { VscGithubInverted } from 'react-icons/vsc'
import { useContext } from "react"
import { AuthContext } from "../../context/auth"

const LoginBoxWrapper = styled.div`
        height: 100vh;
        width: 100%;
        background: #17171a;
        background-image: url(src/assets/banner-girl.png);
        background-repeat: no-repeat;
        background-position-x: center; 
        background-position-y: top;

        padding: 440px 80px 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        
    `
    const Strong = styled.strong`
        font-size: 32px;
        line-height: 36px;

    `

    const SignIn = styled.a`
        background: #ffcd1e;
        margin-top: 32px;
        padding: 0 40px;
        height: 56px;
        color: #09090a;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: none;

        display: flex;
        align-items: center;
        justify-content: center;

        :hover {
            filter: brightness(0.9);
        }
    `
    
export const LoginBox = () => {

    const { signInUrl } = useContext(AuthContext)


    
    return (
        <LoginBoxWrapper>
            <Strong> Entre e compartilhe a sua mensagem </Strong>
            <SignIn href={signInUrl}>
                <VscGithubInverted 
                    size='25' 
                    style={{paddingRight: 6}}
                /> 
                Entrar 
            </SignIn>
        </LoginBoxWrapper>
    )
}