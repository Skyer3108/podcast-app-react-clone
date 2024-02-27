import Header from "../components/commanComponents/Headers"

import Button from "../components/commanComponents/Button";
import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'

import { useNavigate } from "react-router-dom"

import {doc,getDoc} from 'firebase/firestore';

import {db}  from '../firebase';

import { auth } from "../firebase"

import { toast } from "react-toastify"

import { collection,onSnapshot, query } from "firebase/firestore"

import EpisodeDetails from '../components/commanComponents/Podcasts/EpisodeDetails'

import AudioPlayer from '../components/commanComponents/Podcasts/AudioPlayer'



function PodcastDetails(){


    const {id}=useParams()

    const navigate=useNavigate()

    const [podcast,setPodcast]=useState({})

    const [episodes,setEpisodes]=useState([])

    const [playingFile,setplayingFile]=useState('')





    useEffect(()=>{

        if(id){
         getData()
        }

    },[id])


    const getData=async ()=>{

        

        try{

            const docRef=doc(db,'podcasts',id);

        const docSnap=await getDoc(docRef)

            if(docSnap.exists()){
                console.log("Document data:",docSnap.data())
    
                setPodcast({id:id,...docSnap.data()})

                toast.success("Podcast Found")
            }
    
            else{
    
                console.log("No such documnet!")

                toast.error("No such document")

                navigate('/podcasts')
            }

        }

        catch(e){
            toast.error(e.message)
        }
       
    }

    useEffect(()=>{
        const unsubscribe=onSnapshot(
            query(collection(db,'podcasts',id,'episodes')),

            (querySnapshot)=>{
                const episodesData=[];

                querySnapshot.forEach((doc)=>{
                    episodesData.push({id:doc.id,...doc.data()})
                })

                setEpisodes(episodesData);
            },
            (error)=>{
                console.log('Error fetching episodes',error);
            }
        );

        return()=>{
            unsubscribe()
        }
    },[id])

    



    return(
        <div>


            <Header/>

            <div className='input-wrapper' style={{marginTop:'2rem'}}>

            {
                podcast.id && (

                    <>

                    <div style={{display:'flex',justifyContent:"space-between",alignItems:"center",width:'100%',margin:'1rem'}}>



                    <h1 className='podcast-title-heading'>{podcast.title}</h1>

                {  
                podcast.createdBy==auth.currentUser.uid && (
                    <Button text={'Create Episode'}  style={{width:'200px !important',margin:0}} onClick={()=>navigate(`/podcast/${id}/create-episode`)}/>)}


                    </div>



                   

                   <div className='banner-wrapper'>

                   <img src={podcast.bannerImg}/>

                    </div>


                    <p className='podcast-description'>{podcast.description}</p>
                  

                    <h1  className="podcast-title-heading">Episodes</h1>

                    {

                        episodes.length>0?<>{episodes.map((episode,index)=> {
                            return <EpisodeDetails key={index} index={index+1} title={episode.title} description={episode.description} audioFile={episode.audioFile} onClick={(file)=>setplayingFile(file)}/>
                        } )}</>  :<p>No Episodes Found</p>
                    }

                    
                    
                    </>

              



                )
                    
                    


            }


</div>


          {
              playingFile  && 
                            <AudioPlayer audioSrc={playingFile}  image={podcast.displayImage} />

          }


        
        </div>

    )
}

export default PodcastDetails;