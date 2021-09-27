import React  from 'react'
import './moviecard.scss'
import {Link, useParams}from 'react-router-dom'
function MovieCard({movie}) {
//console.log("Movie",movie)
const id = movie.id
  // console.log("ID",id)
    return (
        <Link to={`/${id}`}>
        <div className="movieCard">
            <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie" />
           <div className="image"></div>
           <div className="description">
               <h5>{movie.vote_average}</h5>
               <h3>{movie.title}</h3>
               

           </div>
        </div>
        </Link>
        
    )
}

export default MovieCard
