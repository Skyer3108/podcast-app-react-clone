
import './App.css';

import {BrowserRouter as Router,Route,Routes, BrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from './slices/userSlice';
import {  useDispatch } from 'react-redux';
import { auth,db } from './firebase';
import { doc } from 'firebase/firestore';
import PrivateRoutes from './components/commanComponents/privateRoutes';
import CreateAPodcast from './pages/CreatePodcast';
import PodcastsPage from './pages/Podcasts';
import PodcastDetails from './pages/PodcastDetails'

import CreateAnEpisodePage from './pages/CreateEpisode'



function App() {
  const dispatch=useDispatch()


  useEffect(()=>{

    const authUnsubsribe=onAuthStateChanged(auth,(user)=>{
      if(user){
        const UnsubsribeSnapshot=onSnapshot(
          doc(db,'users',user.uid),
          (userDoc)=>{


            if(userDoc.exists()){
              const userData=userDoc.data();

              dispatch(
                setUser(
                  {
                    name:userData.name,
                    email:userData.email,
                    uid:user.uid,
                    
                  
                  })
              )
            }
          },
          (error)=>{
            console.log('Error fetching user data',error)
          }
          
        )

        return()=>{
          UnsubsribeSnapshot()
        }
      }
    })

    return()=>{
      authUnsubsribe()
    }

  

  },[])






  return (
    <div className="App">
      <ToastContainer/>

     

      <BrowserRouter>
      
      <Routes>
        <Route path='/'element={<SignUp/>}/>

        <Route element={<PrivateRoutes/>}>


        <Route path='/profile' element={<Profile/>}/>
        
        <Route path='/create-a-podcast' element={<CreateAPodcast/>}/>

        <Route path='/podcasts' element={<PodcastsPage/>}/>

        <Route path='/podcast/:id' element={<PodcastDetails/>}/>

        <Route path='/podcast/:id/create-episode' element={<CreateAnEpisodePage/>}/>
        </Route>
        
      </Routes>
    
      </BrowserRouter>
   
    </div>
  );
}

export default App;
