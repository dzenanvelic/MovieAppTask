import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/moviecard/MovieCard'
import axios from 'axios'
import './newMovieslist.scss'
import{useSelector} from 'react-redux'
import Pagination from '../../components/pagination/Pagination'


function NewMoviesList() {
    //set loading
    const [loading,SetLoading]=useState(false)

    /* set best movies */
    const [bestMovies,setBestMovies]= useState([])

    //current page in pagination
const[currentPage,setCurrentPage]= useState(1)
//redux for search
const{search}= useSelector((state)=>({...state}));
const {text}=search
    



//total number of pages
const [totalNumberMovies,setTotalNumberMovies]=useState(null)



//index of last movie
/* const indexOfLastMovie = currentPage * itemsPerPage; */
//index of first movie
/* const indexOfFirstMovie = indexOfLastMovie - itemsPerPage; */



//console.log("SEARCH",search)


    /* get best movies from API */
     useEffect(()=>{

        const getPopularMovies=async()=>{

try {
    SetLoading(true)
   const bestMovies =  await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US&page=${currentPage}`)
  // console.log("BEST MOVIES",bestMovies.data)
  setBestMovies(bestMovies.data.results)
  setTotalNumberMovies(bestMovies.data.total_results)
  SetLoading(false)
} catch (error) {
    SetLoading(false)
    console.log("ERROR FETCHING BEST MOVIES",error)
}
           
            
        }
getPopularMovies()
    },[currentPage ])
//console.log(bestMovies)



//set movies from search
useEffect(()=>{
    const getSearchedMovies=async()=>{
    try {
      const searchedMovies =  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US&page=${currentPage}&include_adult=false&query=${text}`) 
if(searchedMovies){
    setBestMovies(searchedMovies.data.results)

    setTotalNumberMovies(searchedMovies.data.total_results)
}
    } catch (error) {
        console.log("FILTER MOVIES ERROR",error)
        
    }
}
getSearchedMovies()
    },[text,currentPage])

    
    return (
        <div className="newMoviesList">
            <h1 className="bestMoviesHeader">Best Movies</h1>
 

          <div className="newMoviesListWrapper">

{
loading ? (<h1>Loading...</h1>) :
(bestMovies.map((movie)=>{
    return <MovieCard key={movie.id} movie={movie}/>
}))

}

          </div>
        {/*   pagination */}
         <Pagination totalNumberMovies={totalNumberMovies} currentPage={currentPage}setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default NewMoviesList
