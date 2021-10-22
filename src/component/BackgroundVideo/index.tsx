import styled from "styled-components"

const Video = styled.video`
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    position: fixed;
    z-index: -1;
`
export const BackgroundVideo = () => {
  const videoSource = '/assets/landscape.mp4'

  return(
    <Video autoPlay={true} loop={true} muted>
      <source src={videoSource}/>
    </Video>
  )
  
}