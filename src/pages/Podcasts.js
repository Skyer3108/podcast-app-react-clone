import { useEffect, useState } from "react"
import Header from "../components/commanComponents/Headers"
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "../firebase";

import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/commanComponents/Podcasts/PodcastsCard";

import InputComponent from "../components/commanComponents/input";



function PodcastsPage() {

    const dispatch = useDispatch();

    

    const podcasts = useSelector((state) => state.podcasts.podcasts)


    const [search,setSearch]=useState('')

    useEffect(() => {


        const unsubscribe = onSnapshot(

            query(collection(db, 'podcasts')),

            (querySnapShot) => {

                const podcastsData = [];

                querySnapShot.forEach((doc) => {

                    podcastsData.push({ id: doc.id, ...doc.data() });

                })

                dispatch(setPodcasts(podcastsData));

            },
            (error) => {
                console.log("Error fetchiong podcasts:", error);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [dispatch]);




    var filteredPodcasts=podcasts.filter((item)=>{



       return  item.title.trim().toLowerCase().includes(search.trim().toLowerCase())

    })



    return (
        <div>

            <Header />

            <div className='input-wrapper' style={{ marginTop: "2rem" }}>
                <h1>Discover Podcasts</h1>

                <InputComponent state={search} setState={setSearch} placeholder='Search By Title ' type='text' require={true} />

                {
                    filteredPodcasts.length > 0 ? (<div className='podcast-flex' style={{marginTop:'1.5rem'}}>

                        {
                        filteredPodcasts.map((item) => {


                            return (
                            
                            <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage}/>
                            
                            )
                        })}

                    </div>
                    )

                        : (<p>{search?'No Podcast Found':"No current Podcasts"}</p>)
                }


                 




                 {/* {
                    podcasts.length> 0 ?(<>{podcasts.map((item)=>{
                        return <p>{item.title}</p>
                    })}</>)
                    
                    
                    :
                    
                    (<p>No Current Podcasts</p>)
                 } */}
            </div>


        </div>
    )

}

export default PodcastsPage