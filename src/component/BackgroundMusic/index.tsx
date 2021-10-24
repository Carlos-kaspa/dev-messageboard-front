import bgm from '/sounds/phonkbgm.mp3'
import { HiPlay, HiPause } from 'react-icons/hi'
import { BiVolumeFull, BiVolumeLow } from "react-icons/bi";
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const AudioButton = styled.button`
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    background: transparent;
    color: #ff008e; //linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);
    border: none;

    :hover {
        filter: brightness(0.8);
    }
`

const AudioControlDiv = styled.div`
    display: flex;
    
    align-items: center;
    align-content: space-between;
    gap: 5px;
    margin-left: 10px;
    @media(min-width: 700px) {
      margin-left: 10rem;
  }
`

export const BackgroundMusic = () => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(5)

    useEffect(() => {
       const audio: any = document.getElementById('bgm-music')
        audio ? audio.volume = Number(`0.${volume}`) : null  
    },[volume])

    return (
        <AudioControlDiv>
            
            <AudioButton  onClick={() => setIsPlaying(!isPlaying)}>{ isPlaying ? <HiPause size='20'/> : <HiPlay size='20'/>}</AudioButton>
            <AudioButton  onClick={() => (volume > 0 ? setVolume(volume - 1): null)}> <BiVolumeLow size='20'/> </AudioButton>
            <AudioButton  onClick={() => (volume <= 8 ? setVolume(volume + 1): null)}> <BiVolumeFull size='20'/> </AudioButton>
            
            <audio id='bgm-music' autoPlay={true} loop={true} src={isPlaying ? bgm : ''}></audio>
        </AudioControlDiv>
    )
}