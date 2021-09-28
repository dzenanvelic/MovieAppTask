import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/moviecard/MovieCard'
import axios from 'axios'
import './newMovieslist.scss'
import { Link } from 'react-router-dom'


function NewMoviesList() {
    //set loading
    const [loading,SetLoading]=useState(false)

    /* set best movies */
    const [bestMovies,setBestMovies]= useState([])
    const[search,setSearch]= useState('')

    //set items per page
    const[itemsPerPage,setItemsPerPage]= useState(20)

//current page in pagination
const[currentPage,setCurrentPage]= useState(1)

//total number of pages
const [totalNumberMovies,setTotalNumberMovies]=useState(null)

//for showing limited number pages
const [pageNumberLimit,setPageNumberLimit]=useState(5)
const [maxPageNumberLimit,setMaxPageNumberLimit]=useState(5)
const [minPageNumberLimit,setMinPageNumberLimit]=useState(0)

//handleClick
const handleClick=(e)=>{
    setCurrentPage(Number(e.target.id));
    //console.log(e.target.id)
}
//total number of pages
const pages =[];
for(let i=1; i<= Math.ceil(totalNumberMovies /itemsPerPage);i++){
    pages.push(i)
}
const renderedPageNumbers = pages.map((number)=>{
    if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
         return (
        <li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null}>
{number}
        </li>
    )
    }else{
        return null;
    }
   
})

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
    },[currentPage, search])
//console.log(bestMovies)



//set movies from search
useEffect(()=>{
    const getSearchedMovies=async()=>{
    try {
      const searchedMovies =  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US&page=${currentPage}&include_adult=false&query=${search}`) 
if(searchedMovies){
    setBestMovies(searchedMovies.data.results)

    setTotalNumberMovies(searchedMovies.data.total_results)
}
    } catch (error) {
        console.log("FILTER MOVIES ERROR",error)
        
    }
}
getSearchedMovies()
    },[search,currentPage])

    //next page
    const handleNext=()=>{
        setCurrentPage(currentPage + 1)
        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
}
//previous page
    const handlePrev=()=>{
setCurrentPage(currentPage - 1)
 if((currentPage - 1)%pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    }
//increment page button
    let pageIncrementButton=null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementButton = <li onClick={handleNext}>&hellip;</li>
    }
    //decrement page button
    let pageDecrementButton=null;
    if(pages.length > maxPageNumberLimit){
        pageDecrementButton = <li onClick={handlePrev}>&hellip;</li>
    }
    return (
        <div className="newMoviesList">
            <h1 className="bestMoviesHeader">Best Movies</h1>
 <div className="search">
               
                <input type="text" placeholder="search movie" onChange={(e)=>setSearch(e.target.value)}/>
            </div>

          <div className="newMoviesListWrapper">

{
loading ? (<h1>Loading...</h1>) :
(bestMovies.map((movie)=>{
    return <MovieCard key={movie.id} movie={movie}/>
}))

}

          </div>
          <div className="pagination">
              <ul className="pageNumbers">
                  <li>
                      <button onClick={handlePrev} disabled={currentPage == pages[0] ? true : false}>
                          Prev
                      </button>
                  </li>
                  {pageDecrementButton}
                    {renderedPageNumbers}
                    {pageIncrementButton}
                     <li>
                      <button onClick={handleNext}disabled={currentPage == pages[pages.length-1] ? true : false}>
                         Next
                      </button>
                  </li>
              </ul>
       
          </div>
        </div>
    )
}

export default NewMoviesList
