import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { TheatersRounded } from '@material-ui/icons'
function SingleMovie() {
    /* set loading */
    const[loading,setLoading]= useState(false)
    /* set single movie */
    const[singleMovie,setSingleMovie]=useState({})
const {singleMovieId}=useParams()
//console.log("SINGLE",singleMovieId)

useEffect(()=>{
const getSingleMovie=async()=>{
try {
    setLoading(true)
   await axios.get(`https://api.themoviedb.org/3/movie/${singleMovieId}?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US`)
    .then((res)=>{
       
        setSingleMovie(res.data)
        setLoading(false)
    }
    )
    
} catch (error) {
    setLoading(false)
    console.log("GET SINGLE MOVIE ERROR",error)
}
}
getSingleMovie()
},[singleMovieId])
//console.log(singleMovie)
    return (
      
      <div className="singleMovie">



      </div>
      
    )
}

export default SingleMovie
