import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import './singleserie.scss'


function SingleSerie() {
    /* set loading */
    const[loading,setLoading]= useState(false)

    //key for video
    const[videoKey,setVideoKey]= useState('')
    /* set single movie */
    const[singleSerie,setSingleSerie]=useState({})
const {singleSerieId}=useParams()
//console.log("SINGLEID",singleMovieId)

//youtube
//const video =  https://www.youtube.com/watch?v=az2sQoPocUQ 

//get single movie
useEffect(()=>{
const getSingleSerie=async()=>{
try {
    setLoading(true)
    /* fetching single movie */
   await axios.get(`https://api.themoviedb.org/3/tv/${singleSerieId}?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US`)
   
    .then((res)=>{
       
        setSingleSerie(res.data)
        setLoading(false)
    }
    ) 
} catch (error) {
    setLoading(false)
    console.log("GET SINGLE MOVIE ERROR",error)
}
}
getSingleSerie()
},[singleSerieId])
console.log("SINGLE MOVIE",singleSerie)
//end fetching movie

//video adress api fetching
useEffect(async()=>{
    try {
        const keyAdress = await axios.get(`https://api.themoviedb.org/3/tv/${singleSerie.imdb_id}/videos?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US`)
  setVideoKey(keyAdress.data.results[0].key)
//console.log("VIDEO ADRESS",adress.data.results[0].key)
    } catch (error) {
        console.log("FETCHING VIDEO KEY ERROR",error)
    }

},[singleSerie.id])

//console.log("VIDEO KEY",videoKey)
//back to previous page 
/* const goBack=()=>{
  window. history.go(-1)
} */
    return (
      
      <div className="singleMovie">

          <div className="singleMovieWrapper">
              <div className="left">
                  {/* back button */}
                 {/*  <div className="backButton"onClick={goBack} >Back</div>*/}
                  {/* poster image */}
                 <img src={`http://image.tmdb.org/t/p/w500/${singleSerie.poster_path}`} alt={singleSerie.original_title} /> 
              </div>
              <div className="right">
                  {/* trailer */}
                  <div className="videoDiv">
                      <iframe src={`https://www.youtube.com/embed/${videoKey}` }width="400" height="200" frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen />
  
                     
                  </div>
                  
   
                 {/*  title and runtime */}
                  <h1>{singleSerie.title} <span>({singleSerie.runtime} min.)</span></h1>
                 {  <div className="genres">
                     {/* genre */}
                      <ul><strong>Genre:</strong>
                          {singleSerie.genres && singleSerie.genres.map((genre)=>{
                              return <li key={genre.id}>{genre.name}</li>
                          })}
                         
                      </ul>
                  </div> }
{/* release date */}
                  <p><b>Release date: </b>{singleSerie.release_date && singleSerie.release_date} </p>
                  {/* budget */}
                  <p className="budget">Budget: ${singleSerie.budget && singleSerie.budget}</p>
                  {/* revenue */}
                  <p className="revenue">Revenue: ${singleSerie.revenue && singleSerie.revenue}</p>
                  {/* status */}
                  <p className="status">Status: {singleSerie.status && singleSerie.status} </p>
                   {/*vote average*/}
                  <p className="average-vote">Average vote: {singleSerie.vote_average && singleSerie.vote_average}</p>
                  {/* vote count */}
                  <p className="vote-count">Status: {singleSerie.vote_count && singleSerie.vote_count} votes</p>
                  {/* production companies */}
                  <p className="companies">Production companies:</p>
                      <ul className="prod-comp">
                          {
                             singleSerie.production_companies && singleSerie.production_companies.map((company)=>{
                         return <li key={company.id}>{company.name}</li>  

                           })
                  }
                         </ul>
                    
                   
                    
                  {/* homepage href */}
<p className="homepage">{singleSerie.homepage && <a target="_blank"  href={singleSerie.homepage}>Go to homepage</a>}</p>
{/* tagline */}
<p>{singleSerie.tagline && singleSerie.tagline}</p>
{/* overview */}
<h3 className="overview">Overview:</h3>
<p className="sinopsis">{singleSerie.overview && singleSerie.overview}</p>
              </div>
          </div>



      </div>
      
    )
}

export default SingleSerie