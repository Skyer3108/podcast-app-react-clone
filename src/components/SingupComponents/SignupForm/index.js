import { useState } from "react"

import InputComponent from "../../commanComponents/input"

import Button from "../../commanComponents/Button"

import {auth,db,storage} from '../../../firebase'
import { setUser } from "../../../slices/userSlice"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { setDoc ,doc} from "firebase/firestore"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast} from "react-toastify"

function SingupForm() {


    const [fullName, setFullName] = useState('')

    const [email,setEmail]=useState('')

    const [password, setPassord] = useState('')


    const [confpassword, setConfPassword] = useState('')

    const [loading,setLoading]=useState(false)


    const navigate=useNavigate();

 const dispatch=useDispatch();


    const handleSingup=async ()=>{

        setLoading(true);


        if(password==confpassword && password.length>6 && fullName&&email)
        {
            try{

                //Her we are creating the Account
                const userCredential=await createUserWithEmailAndPassword(
    
                    auth,
                    email,
                    password
                );
    
                const user=userCredential.user

                console.log('user',user)


                //Now here we are Saving the user's details
                 await setDoc(doc(db,'users',user.uid),{
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                  
                 })


                 //Save data in the redux,call the redux action 
                 dispatch(setUser({
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                  
                 }))

                 toast.success('User as been Created')
                 setLoading(false)
                 navigate('/profile')
            }
    
            catch(e){
    
                console.log('error',e);

                toast.error(e.message)
                setLoading(false)
            }
        }



        else{

            //throw an error

            if(password!=confpassword){
                toast.error('please Make Sure your Password and confirm Password matches!')
            }

            else if(password.length<6){
                toast.error('Please Make Sure Your Password is more than 6 digit Long')
            }

            setLoading(false)
        }
      

    }

    return (
        <>
            <InputComponent state={fullName} setState={setFullName} placeholder='Full Name' type='text' require={true} />

            <InputComponent state={email} setState={setEmail} placeholder='Enter your Email' type='email' require={true} />

            <InputComponent state={password} setState={setPassord} placeholder='Enter your Password' type='password' require={true} />

            <InputComponent state={confpassword} setState={setConfPassword} placeholder='Conform Password' type='password' require={true} />

            <Button text={loading ?'Loading...': 'Singup'} disable={loading} onClick={handleSingup} />
        </>
    )
}

export default SingupForm