import styled from "styled-components"

export const SendMessageFormWrapper = styled.div`
    background: #1b1b1f;
    background: linear-gradient(170deg,transparent 10%, #db11a9be 48%, #16cedbd1 100%);

    border-radius: 20px;
    padding: 24px;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;

    @media(max-width: 700px) {
        height: 140px;
        padding: 0;
    }

`

export const UserInfo = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const UserImageDiv = styled.div`
    padding: 3px;
    background: linear-gradient(100deg, #ff008e 0.48%, #42c9ff 100%);
    border-radius: 50%;
    line-height: 0;
    @media(max-width: 700px) {
        display: none;
}
`

export const UserImage = styled.img`
    width: 94px;
    height: 94px;
    border-radius: 50% ;
    border: 6px solid #121214;

`
export const UserName = styled.strong`
    font-size: 24px;
    line-height: 30px;
    margin-top: 16px;
    @media(max-width: 700px) {
        display: none;
    }
`
export const UserGithub = styled.span`
    display: flex;
    align-items: center;
    margin-top: 8px;
    color: #c4c4cc;
    @media(max-width: 700px) {
        display: none;
    }

`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    margin-top: 48px;
    background: #202024;
    width: 400px;
    @media(max-width: 700px) {
        margin-top: 0;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
    }

`

export const FormLabel = styled.label`
    padding: 18px 24px;
    font-size: 20px;
    background: #29292e;
    font-weight: bold;
    text-align: left;

    @media(max-width: 700px) {
    display: none;
    }
`
export const TextArea = styled.textarea`
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
    @media(max-width: 700px) {
        height: 100%;
        background: rgba(255,255,255,0.1);
        color:  #ffcd1e;
        font-size: 14px;
        line-height: 14px;
        border: 0;
        padding: 10px;
        
    }
`

export const SubmitButton = styled.button`
    background: #0aedf5d2;
    margin: 24px;
    padding: 0 32px;
    border-radius: 30px;
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

    @media(max-width: 700px) {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        position: fixed;
        bottom: 5px;
        right: 5px;
        padding: 0;
        margin: 0;
        background: transparent;
        color: #ff008e;
    }
`