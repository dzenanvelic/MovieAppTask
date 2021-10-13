import React  from 'react'
import './seriecard.scss'
import {Star}from '@material-ui/icons'
import {Link, useParams}from 'react-router-dom'
function SerieCard({serie}) {
//console.log("serie",movie)
const id = serie.id
  // console.log("ID",id)
    return (
        /* link to single movie */
        <Link className="linkSingleCard" to={`/serie/${id}`}>
        <div className="serieCard">
        {/* serie card image */}
            <img src={`http://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt="serie" />
           <div className="image"></div>
           <div className="description">
           {/* rating on single serie card */}
               <h5 className="ratingStar"><Star className="iconStar"/>{serie.vote_average}</h5>
               <h3>{serie.title}</h3>
               

           </div>
        </div>
        </Link>
        
    )
}

export default SerieCard
