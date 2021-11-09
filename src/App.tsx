import { useContext, useState } from 'react'
import styled from 'styled-components'
import { BackgroundVideo } from './component/BackgroundVideo'
import { LoginBox } from './component/LoginBox'
import { MessageList } from './component/MessageList'
import { SendMessageForm } from './component/SendMessageForm'
import { AuthContext } from './context/auth'
import gundam from '/assets/gundam.gif'
import logoImage from '/assets/logo.svg'
import redCar from '/assets/deloan_red_01.png'
import greenCar from '/assets/penetrator_green_01.png'
import { BackgroundMusic } from './component/BackgroundMusic'
import { VscSignOut } from "react-icons/vsc"


const LogoImage = styled.img`
    height: 28px;
    margin: 5px auto;

    @media(max-width: 700px) {
      height: 10px;
      margin: auto;
      
    }
`

const CreatorNoteDiv = styled.div`

  position: fixed;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  letter-spacing: 1px;
`
const CreatorNoteImage = styled.img`
  position: absolute;
  margin: auto;
  mix-blend-mode: screen;
  filter: brightness(0.8);
  filter: drop-shadow(2px 10px 2px black);
  height: 300px;
  align-self: center;
`

const CreatorNote = styled.h3`
  
  background-image: url('https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif');
  background-size: cover;
  color: transparent;
  -moz-background-clip: text;
  -webkit-background-clip: text;
  font-family: 'Dela Gothic One', cursive;
  font-size: 1000%;
  width: 100vw;
  margin: auto;
  animation: glow 1s ease-in-out infinite alternate;
  @keyframes glow {
      from {
        text-shadow: 0 0 20px #c011b7;
      }
      to {
        text-shadow: 0 0 30px #b63b9b, 0 0 10px #d138d1;
      }
  }
  
  @media(max-width: 700px) {
      bottom: auto;
      height: 15px;
      font-size: 4rem;
  }
`
const RedCarAsset = styled.img`
  position: fixed;
  top: 63vh;
  height: 40px;
  mix-blend-mode: screen;
  filter: brightness(200%);
  animation:driveBy 66s ease-in infinite ;
        
        @keyframes driveBy { 
            0% { 
                -webkit-transform:  translateX(-100vw); 
                transform:  translateX(-100vw); 
            }
            80% { 
                -webkit-transform:  translateX(-100vw); 
                transform:  translateX(-100vw); 
            }
            100% { 
                -webkit-transform:  translateX(100vw); 
                transform:  translateX(100vw); 
            }  
        }  
  @media(max-width: 700px) {
      bottom: auto;
      height: 15px;
  }

`
  const GreenCarAsset = styled.img`
    position: fixed;
    top: 65vh;
    height: 150px;
    mix-blend-mode: screen;
    filter: brightness(200%);
    animation:driveBy 70s ease-out infinite ;
          
          @keyframes driveBy { 
              0% { 
                  -webkit-transform:  translateX(-100vw); 
                  transform:  translateX(-100vw); 
              }
              90% { 
                  -webkit-transform:  translateX(-100vw); 
                  transform:  translateX(-100vw); 
              }
              100% { 
                  -webkit-transform:  translateX(100vw); 
                  transform:  translateX(100vw); 
              }  
          }  
    @media(max-width: 700px) {
        bottom: auto;
        height: 25px;
    }

  `
  
const Main = styled.main`
    display: grid;
    height: 90vh;
    grid-template-columns: 1fr 453px;
    column-gap: 120px;
    position: relative;
    max-width: 1200px;
    margin:  0 auto;
    overflow-y: hidden;

    @media(max-width: 700px) {
      display: flex;
      flex-direction: column;
      position: relative;
    }
  `
  const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  margin-right: 10rem;
  background: transparent;
  border: 0;
  color: #c4c4cc;
  cursor: pointer;
  :hover{
      filter: brightness(0.9);
  }

  @media(max-width: 700px) {
    align-self: flex-end;
    margin-right: 10px;
  }


`
export const App = () => {
  const [ viewAmountMessages, setViewAmountMessages ] = useState(10)
  const [konami, setKonami] = useState(false)
  const [keysPressed, setKeysPressed] = useState<any>('')
  const { user, signOut } = useContext(AuthContext)
  
  window.onkeyup = (e) => {
    if(keysPressed.length === 0){
      setKeysPressed(`${e.key}+`)
    } else if(keysPressed.length > 0 && keysPressed.split('+').filter((word:any) => word !== '').length < 7){
      setKeysPressed(`${keysPressed}${e.key}+`)
    } else if(keysPressed.split('+').filter((word:any) => word !== '').length  === 7 && !konami){
      const matchKonami = keysPressed.split('+').filter((word:any) => word !== '').join('')
      if(matchKonami === 'carlote'){
        setKonami(true)
      } else {
        setKonami(false)
        setKeysPressed('')
      }
    }  else if (konami) {
        const timer = setTimeout(() => {
          console.log('desligando')
          setKonami(false)
          setKeysPressed('')
        }, 1000)
    }
  }
  
  
  return (
      <> 
        {konami ? (<CreatorNoteDiv><CreatorNoteImage src={gundam}/><CreatorNote> シャーロット </CreatorNote></CreatorNoteDiv>) : null}
        {/* <button onClick={() => setViewAmountMessages(viewAmountMessages + 10)}> ver mais </button>
        <button onClick={() => viewAmountMessages <= 10 ? null : setViewAmountMessages(viewAmountMessages - 10)}> ver menos </button> */}
        <div style={{width: '100%', display: 'flex', alignContent: 'space-between', justifyContent: 'space-between', padding: '0 2rem'}}>
          <BackgroundMusic/>
          <SignOutButton onClick={signOut}> <VscSignOut size='32' style={{paddingRight: 5}}/> Sair </SignOutButton>
        </div>
        {/* <RedCarAsset src={redCar} />
        <GreenCarAsset src={greenCar} /> */}
        <BackgroundVideo />
        <Main>
          <MessageList />
        {!!user ? <SendMessageForm/> :<LoginBox />}
        </Main>
        <a style={{textDecoration: 'none', color: 'white', width: '100%', display:'inline-block', textAlign: 'center'}}href="https://www.instagram.com/carloxxlima/"> Created by Kaspa </a>
      </>
  )
}
