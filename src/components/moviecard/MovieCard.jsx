import React  from 'react'
import './moviecard.scss'
import {Star}from '@material-ui/icons'
import {Link, useParams}from 'react-router-dom'
function MovieCard({movie}) {
//console.log("Movie",movie)
const id = movie.id
  // console.log("ID",id)
    return (
        /* link to single movie */
        <Link className="linkSingleCard" to={`/${id}`}>
        <div className="movieCard">
        {/* movie card image */}
            <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie" />
           <div className="image"></div>
           <div className="description">
           {/* rating on single movie card */}
               <h5 className="ratingStar"><Star className="iconStar"/>{movie.vote_average}</h5>
               {/* <h3>{movie.title}</h3> */}
               

           </div>
        </div>
        </Link>
        
    )
}

export default MovieCard
