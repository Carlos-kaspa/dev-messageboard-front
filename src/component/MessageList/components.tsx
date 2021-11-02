import styled from "styled-components"

export const MessageListWrapper = styled.div`
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

export const MessageListComponent = styled.div`
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

export const Message = styled.span`
    border-radius: 10px;
    max-width: 440px;
    padding: 10px;
    margin-right: 1rem;
    margin-left: 10px;
    align-self: flex-start;
    word-wrap: break-word;
    background: linear-gradient(260deg,rgba(0,0,0,0.3) 50%, #ff008c99 80%, #10c2cfc0 100%);

    
    

    @media(max-width: 700px) {
        max-width: 80%;
    }       

`

export const OwnUserMessage = styled.span`
    border-radius: 10px;
    max-width: 440px;
    padding: 10px ;
    margin-left: 1rem;
    margin-right: 10px;
    align-self: flex-end;
    word-wrap: break-word;
    background: linear-gradient(260deg,rgba(0,0,0,0.3) 50%, #ff008c99 80%, #10c2cfc0 100%);

    
    

    @media(max-width: 700px) {
        max-width: 80%;
    }       

`

export const MessageContent = styled.p`

    font-size: 16px;
    line-height: 28px;
    @media(max-width: 700px) {
      font-size: 14px;
    }       
    
`

export const MessageUser = styled.div`
    max-width: 90%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    @media(max-width: 700px) {
        margin-top: 2px;
    } 

`
export const OwnMessageUser = styled.div`
    max-width: 90%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: right;
    @media(max-width: 700px) {
        margin-top: 2px;
    } 

`

export const UserImageDiv = styled.div`
    padding: 2px;
    background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);
    border-radius: 50%;
    line-height: 0;
    @media(max-width: 700px) {
      padding: 1px;
    }

`

export const UserImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50% ;
    border: 4px solid #121214;
    
`
export const UserName = styled.p`
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #ffcd1e;
    @media(max-width: 700px) {
      font-size: 12px;
    }   

`

export const OwnUserName = styled.span`
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #ffcd1e;
    text-align: right;
    @media(max-width: 700px) {
      font-size: 12px;
    }   

`

export const MessageTimeStamp = styled.span`
    font-size: 8px;
    @media(max-width: 700px) {
        
    }
`

export const Strong = styled.strong`
`

export const BottomMessage = styled.div`
`

export const DateTag = styled.span`
    background: rgba(0,0,0,0.4);
    border-radius: 20px;
    display: inline-block;
    margin:10px auto;
    padding:2px 3px;
    font-size: 10px;
`
