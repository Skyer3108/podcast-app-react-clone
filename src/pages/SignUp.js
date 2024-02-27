import React from 'react'

import { useState } from 'react'
import Header from '../components/commanComponents/Headers'
import InputComponent from '../components/commanComponents/input'
import Button from '../components/commanComponents/Button'
import SingupForm from '../components/SingupComponents/SignupForm'
import LoginForm from '../components/SingupComponents/LoginForm'

function SignUp() {



    const [flag, setFlag] = useState(false)


    return (
        <div>
            <Header />

            <div className='input-wrapper'>
               


                {
                    !flag ?  <h1>Singup</h1> : <h1>Login</h1>
                }



            {
                    !flag ? <SingupForm/> : <LoginForm/>
                }


                {
                    !flag ?  (<p style={{cursor:'pointer'}}  onClick={()=>setFlag(!flag)}>Click Here if you alredy have an Account.Login</p>)  : (<p onClick={()=>setFlag(!flag)}>Don't Have an Account ? Click Here to SignUp</p>)
                }





              
              
                
                
            </div>

        </div>
    )
}

export default SignUp