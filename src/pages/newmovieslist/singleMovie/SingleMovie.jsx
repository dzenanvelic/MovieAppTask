import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import './singlemovie.scss'
import { ReactVideo } from "reactjs-media";

function SingleMovie() {
    /* set loading */
    const[loading,setLoading]= useState(false)

    //key for video
    const[videoKey,setVideoKey]= useState('')
    /* set single movie */
    const[singleMovie,setSingleMovie]=useState({})
const {singleMovieId}=useParams()
//console.log("SINGLEID",singleMovieId)

//youtube
//const video =  https://www.youtube.com/watch?v=az2sQoPocUQ 

//get single movie
useEffect(()=>{
const getSingleMovie=async()=>{
try {
    setLoading(true)
    /* fetching single movie */
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
console.log("SINGLE MOVIE",singleMovie)
//end fetching movie

//video adress api fetching
useEffect(async()=>{
    try {
        const keyAdress = await axios.get(`https://api.themoviedb.org/3/movie/${singleMovie.imdb_id}/videos?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US`)
  setVideoKey(keyAdress.data.results[0].key)
//console.log("VIDEO ADRESS",adress.data.results[0].key)
    } catch (error) {
        console.log("FETCHING VIDEO KEY ERROR",error)
    }

},[singleMovie.id])

//console.log("VIDEO KEY",videoKey)

    return (
      
      <div className="singleMovie">

          <div className="singleMovieWrapper">
              <div className="left">
                  {/* poster image */}
                 <img src={`http://image.tmdb.org/t/p/w500/${singleMovie.poster_path}`} alt={singleMovie.original_title} /> 
              </div>
              <div className="right">
                  {/* trailer */}
                  <div className="videoDiv">
                      <iframe src={`https://www.youtube.com/embed/${videoKey}` }width="400" height="200" frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen />
  
                     
                  </div>
                  
   
                 {/*  title and runtime */}
                  <h1>{singleMovie.title} <span>({singleMovie.runtime} min.)</span></h1>
                 {  <div className="genres">
                     {/* genre */}
                      <ul><strong>Genre:</strong>
                          {singleMovie.genres && singleMovie.genres.map((genre)=>{
                              return <li key={genre.id}>{genre.name}</li>
                          })}
                         
                      </ul>
                  </div> }
{/* release date */}
                  <p><b>Release date: </b>{singleMovie.release_date && singleMovie.release_date} </p>
                  {/* budget */}
                  <p className="budget">Budget: ${singleMovie.budget && singleMovie.budget}</p>
                  {/* revenue */}
                  <p className="revenue">Revenue: ${singleMovie.revenue && singleMovie.revenue}</p>
                  {/* status */}
                  <p className="status">Status: {singleMovie.status && singleMovie.status} </p>
                   {/*vote average*/}
                  <p className="average-vote">Average vote: {singleMovie.vote_average && singleMovie.vote_average}</p>
                  {/* vote count */}
                  <p className="vote-count">Status: {singleMovie.vote_count && singleMovie.vote_count} votes</p>
                  {/* production companies */}
                  <p className="companies">Production companies:</p>
                      <ul className="prod-comp">
                          {
                             singleMovie.production_companies && singleMovie.production_companies.map((company)=>{
                         return <li key={company.id}>{company.name}</li>  

                           })
                  }
                         </ul>
                    
                   
                    
                  {/* homepage href */}
<p className="homepage">{singleMovie.homepage && <a target="_blank"  href={singleMovie.homepage}>Go to homepage</a>}</p>
{/* tagline */}
<p>{singleMovie.tagline && singleMovie.tagline}</p>
{/* overview */}
<h3 className="overview">Overview:</h3>
<p className="sinopsis">{singleMovie.overview && singleMovie.overview}</p>
              </div>
          </div>



      </div>
      
    )
}

export default SingleMovie
