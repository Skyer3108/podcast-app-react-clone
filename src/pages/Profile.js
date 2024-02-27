import { useSelector } from "react-redux"
import Header from "../components/commanComponents/Headers";
import Button from "../components/commanComponents/Button";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import Loader from "../components/commanComponents/Loader";
function Profile(){

    const user=useSelector((state)=>state.user.user);


    console.log('my user',user)

    if(!user){
        return <Loader/>
    }

    const handleLogout=()=>{

        signOut(auth).then(()=>{

            toast.success('User Logged Out')

        }).catch((error)=>{

            toast.error(error.message)
        })


    }


    
  


    return(
        <div>

            

            <Header/>

            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.uid}</h1>

            <Button text={'Logout'} onClick={handleLogout}/>




          

        </div>
    )
}

export default Profile