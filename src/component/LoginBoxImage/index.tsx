import styled from "styled-components"

const Video = styled.video`
    object-fit: contain;
    height: 20rem;
    mix-blend-mode: screen;
    filter: grayscale();

    @media(max-width: 700px) {
      height: 100%;
      position: fixed;
      top: -20px;
    }
   
`
export const LoginBoxImage = () => {
  const videoSource = '/assets/object.mp4'

  return(
   <div></div>
  )
  
}