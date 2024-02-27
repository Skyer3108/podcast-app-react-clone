import { useState } from "react"

import { useDispatch } from "react-redux"

import { useNavigate } from "react-router-dom"

import Button from "../commanComponents/Button"

import InputComponent from "../commanComponents/input"

import { toast } from "react-toastify"

import { ref } from 'firebase/storage'

import { uploadBytes } from 'firebase/storage'

import { storage } from "../../firebase"

import { auth } from "../../firebase"


import { getDownloadURL } from "firebase/storage"

import { addDoc } from "firebase/firestore"

import { collection } from "firebase/firestore"

import { db } from "../../firebase"



// import {ref} from './firebase/storage'
// import {uploadBytes} from './firebase'

//  import {storage} from './firebase'

// // import {uploadBytes} from '../../firebase'
// // import ref from '../../firebase'





import FileInput from "../commanComponents/input/FileInput"


function CreatePodcastForm() {

    const [title, setTitle] = useState('')

    const [description, setDescription] = useState('')

    const [loading, setLoading] = useState('')


    const [displayImage, setDisplayImage] = useState(null)
    const [bannerImg, setBannerImg] = useState(null)


    const navigate = useNavigate();

    const dispatch = useDispatch();



    const handleSubmit = async () => {



        if (title && description && displayImage && bannerImg) {


            setLoading(true)

            //1.upload files==>get download links

            try {

               
                const bannerImgref = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(bannerImgref, bannerImg)

                const bannerImgUrl = await getDownloadURL(bannerImgref)
                

                const displayImgRef = ref(
                    storage,
                    `podcasts/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(displayImgRef, displayImage)

                const displayImgUrl = await getDownloadURL(displayImgRef)

                

                ////////////////////////////////////////////
               const podcastData={

                title:title,
                description:description,
                bannerImg:bannerImgUrl,
                displayImage:displayImgUrl,
                createdBy:auth.currentUser.uid,
               }

               //////////////////////////

                const docRef = await addDoc(collection(db, 'podcasts'), podcastData)
                
                console.log('fuccc')




                setTitle('');
                setDescription('');
                setBannerImg(null);
                setDisplayImage(null);


                toast.success('Podcast Created')
                setLoading(false)
            }

            catch (e) {

                toast.error(e.message);
                console.log(e)
                setLoading(false)

            }



            //2.create a new Doc in a new Collection called podcast

            //3.save this new podcast episodes states in our podcast

        }

        else {
            toast.error('Please Enter All Values')
            setLoading(false)
        }
    }

    const displayImageHandle = (file) => {

        setDisplayImage(file)

    }

    const bannerImageHandle = (file) => {

        setBannerImg(file)

    }



    return (
        <div>
            <InputComponent state={title} setState={setTitle} placeholder='Set Title' type='text' require={true} />
            <InputComponent state={description} setState={setDescription} placeholder='Enter the Description' type='text' require={true} />


            <FileInput accept={'image/*'} id='display-image-input' fileHandleFnc={displayImageHandle} text={"Display Image Upload"} />


            <FileInput accept={'image/*'} id='banner-image-input' fileHandleFnc={bannerImageHandle} text={"Banner Image Upload"} />

            <Button text={loading ? 'Loading...' : 'Create Podcast'} disable={loading} onClick={handleSubmit} />
        </div>
    )
}

export default CreatePodcastForm