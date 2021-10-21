import { useContext, useState } from 'react'
import styled from 'styled-components'
import { LoginBox } from './component/LoginBox'
import { MessageList } from './component/MessageList'
import { SendMessageForm } from './component/SendMessageForm'
import { AuthContext } from './context/auth'
import logoImage from './assets/logo.svg'

const LogoImage = styled.img`
    height: 28px;
    margin: 32px auto;

    @media(max-width: 700px) {
      height: 10px;
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
  
export const App = () => {
  const [ viewAmountMessages, setViewAmountMessages ] = useState(10)
  const { user } = useContext(AuthContext)
  
  
  
  return (
      <> 
        {/* <button onClick={() => setViewAmountMessages(viewAmountMessages + 10)}> ver mais </button>
        <button onClick={() => viewAmountMessages <= 10 ? null : setViewAmountMessages(viewAmountMessages - 10)}> ver menos </button> */}
        <div style={{width: '100%', display: 'flex', alignContent: 'center',alignItems: 'center'}}>
          <LogoImage src={logoImage} alt="DOWhile event logo by rocketseat" />
        </div>
        <Main>
          <MessageList />
        {!!user ? <SendMessageForm/> :<LoginBox />}
        </Main>
      </>
  )
}

