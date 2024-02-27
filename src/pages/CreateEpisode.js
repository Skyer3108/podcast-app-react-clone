
import Header from "../components/commanComponents/Headers"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"



import Button from "../components/commanComponents/Button";

import InputComponent from "../components/commanComponents/input";

import FileInput from "../components/commanComponents/input/FileInput"

import { toast } from "react-toastify"

import {useParams} from 'react-router-dom'

import { ref } from 'firebase/storage'

import { uploadBytes } from 'firebase/storage'

import { storage } from "../firebase"

import { auth } from "../firebase"


import { getDownloadURL } from "firebase/storage"

import { addDoc } from "firebase/firestore"

import { collection } from "firebase/firestore"

import { db } from "../firebase"


function CreateAnEpisodePage(){


    const {id}=useParams();


    

    const [title, setTitle] = useState('')

    const [desc,setDesc]=useState('')

    const [audioFile, setAudioFile] = useState()

    const [loading,setLoading]=useState(false)


    const navigate=useNavigate();

    const dispatch=useDispatch();

   const audioFileHandle=(file)=>{

    setAudioFile(file)

   }

   const handleSubmit=async ()=>{

    setLoading(true)

    if(title,desc,audioFile,id){

        try{

            const audioRef=ref(
                storage,
                `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
            );

            await uploadBytes(audioRef,audioFile);

            const audioURL=await getDownloadURL(audioRef);
            const episodeData={

                title:title,
                description:desc,
                audioFile:audioURL
            };

            await addDoc(
                collection(db,'podcasts',id,'episodes'),episodeData
            );

            toast.success('Episode Created Successfully')
            setLoading(false)
            navigate(`/podcast/${id}`)

            setTitle('');
            setDesc('');

            setAudioFile('')

        }

        catch(e){

            toast.e(e.message)

            setLoading(false)

        }

    }

    else{
        toast.error('All  Files Should Be There')

        setLoading(false)
    }

   }

    return(
        <div>

            <Header/>

            <div className='input-wrapper'>


                <h1>Create An Episode</h1>

                <InputComponent state={title} setState={setTitle} placeholder='Enter The Title' type='text' require={true} />

            <InputComponent state={desc} setState={setDesc} placeholder='Enter your Description' type='text' require={true} />

            <FileInput accept={'audio/*'} id='audio-file-input' fileHandleFnc={audioFileHandle} text={"Upload Audio File"} />

            <Button text={loading ? 'Loading...' : 'Create Episode'} disable={loading} onClick={handleSubmit} />

                </div>
            </div>
    )
}

export default CreateAnEpisodePage