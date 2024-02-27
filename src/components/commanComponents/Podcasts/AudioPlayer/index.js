
import './style.css'

import {useState,useRef, useEffect} from 'react'

import {FaPlay,FaPause,FaVolumeUp,FaVolumeMute} from 'react-icons/fa'

function AudioPlayer({audioSrc,image}){

    const [isPlaying,setIsPlaying]=useState(true)

    const [isMute,setIsMute]=useState(false)

    const [duration,setDuration]=useState(0)

    const [currentTime,setCurrentTime]=useState(0)
    const [volume,setVolume]=useState(1)


    const audioRef=useRef()


    const handleDuration=(e)=>{

        setCurrentTime(e.target.value)
        audioRef.current.currentTime=e.target.value

    }


   


    useEffect(()=>{

      const audio=audioRef.current;
      audio.addEventListener('timeUpdate',handleTimeUpdate)
      audio.addEventListener('loadedmetadata',handleLoadeMetadata)
      audio.addEventListener('ended',handleEnded)

      return()=>{
        audio.removeEventListener('timeUpdate',handleTimeUpdate)
        audio.removeEventListener('loadedmetadata',handleLoadeMetadata)
        audio.removeEventListener('ended',handleEnded)
      };

    },[])

    const handleTimeUpdate=()=>{
      setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadeMetadata=()=>{
      setDuration(audioRef.current.duration)
    }

    const handleEnded=()=>{
      setCurrentTime(0);
      setIsPlaying(false)
    }



    const handleVolume=(e)=>{

        setVolume(e.target.value)

        audioRef.current.volume=e.target.value

    }

    const formatTime=(time)=>{
      const min=Math.floor(time/60);
      const seconds=Math.floor(time%60)
      return `${min}:${seconds<10?"0":""}${seconds}`
    }

    const togglePlay=()=>{
          if(isPlaying){
            setIsPlaying(false)

          }

          else{
            setIsPlaying(true)
          }
    }


    const toggleMute=()=>{
        if(isMute){
          setIsMute(false)

        }

        else{
          setIsMute(true)
        }
  }



  // useEffect(()=>{

  //   setDuration(audioRef.current.duration)

  // },[audioRef])

useEffect(()=>{

  if(isPlaying){
    audioRef.current.play()
  }
  else{
    audioRef.current.pause()
  }
},[isPlaying])


useEffect(()=>{

  if(!isMute){
    audioRef.current.volume=1;
    setVolume(0.5)
  }
  else{
    audioRef.current.volume=0
    setVolume(0)

  }
},[isMute])





    return(
        <div className='custom-audio-player'>

            <img src={image} className='display-img-player'/>

            <audio ref={audioRef} src={audioSrc}/>



          <p  className='audio-btn' onClick={togglePlay}> {isPlaying ?<FaPause/>:<FaPlay/>}</p>

            <div className='duration-flex'>

                <p>{formatTime(currentTime)}</p>

                <input type='range' max={duration} value={currentTime}  step={0.1} onChange={handleDuration} className='duration-range'/>
                <p>{formatTime(duration- currentTime)}</p>

                <p className='audio-btn' onClick={toggleMute}>{!isMute ?<FaVolumeUp/>:<FaVolumeMute/>} </p>

                <input type='range' value={volume} max={1} min={0} step={0.1} onChange={handleVolume} className='volume-range'/>
                </div>

           
            </div>


    )
}
export default AudioPlayer;