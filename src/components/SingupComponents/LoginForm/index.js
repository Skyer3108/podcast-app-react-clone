import { useState } from "react"

import InputComponent from "../../commanComponents/input"

import Button from "../../commanComponents/Button"
import {auth,db,storage} from '../../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc,doc } from "firebase/firestore"

import { setUser } from "../../../slices/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
function LoginForm() {


 

    const [email,setEmail]=useState('')

    const [password, setPassord] = useState('')


    const [loading,setLoading]=useState(false)


    const navigate=useNavigate()
    const dispatch=useDispatch()


    const handleLogin=async  ()=>{

        setLoading(true)


        if(email && password)

        {
            try{

                //Her we are creating the Account
                const userCredential=await signInWithEmailAndPassword(
    
                    auth,
                    email,
                    password
                );
    
                const user=userCredential.user
    
                console.log('user',user)
    
    
    
              const userDoc=await getDoc(doc(db,'users',user.uid))
              const userData=userDoc.data()
    
              console.log('userData',userData)
    
                 //Save data in the redux,call the redux action 
                 dispatch(
                    setUser({
                    name:userData.name,
                    email:user.email,
                    uid:user.uid,
                  
                 }))
    
                 toast.success("Login Successfull")
    
                 setLoading(false)
    
    
                 
                 navigate('/profile')
            }
    
            catch(e){
    
                setLoading(false)
                console.log('error',e);
                toast.error(e.message)
            }
        }

        else{
            toast.error('Make Sure Email and Password are Not Empty')
        }
        

    }

    return (
        <>
           

            <InputComponent state={email} setState={setEmail} placeholder='Enter your Email' type='email' require={true} />

            <InputComponent state={password} setState={setPassord} placeholder='Enter your Password' type='password' require={true} />

           

            <Button text={loading? 'loading...' :'Login'} onClick={handleLogin} />
        </>
    )
}

export default LoginForm