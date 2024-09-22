import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../service/ApiService';
import { MovieDetailObj } from '../../interface';

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [movieDetailObj, setMovieDetailObj] = useState<MovieDetailObj>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return;
        (async () => {
            const res = await ApiService.getMovieDetails(id)
            if (res)
                setMovieDetailObj(res)
            else {
                navigate('/')
            }
        })()
    }, [id])

    return movieDetailObj
        ? <main className='flex-grow px-2 pt-2 mt-3 pb-[3rem] overflow-auto max-w-[1280px] mx-auto'>
            <img src={movieDetailObj.Poster} alt={movieDetailObj.Title} className='mx-auto max-w-[85%]' />
            <div className='mt-2 text-left'>
                <h1 className='header text-[2rem]'>{movieDetailObj.Title} <span className='text-[1.25rem] capitalize'>({movieDetailObj.Year})</span></h1>
                <div className='mt-5'>
                    <h2 className='header'>Type</h2>
                    <p className='mt-1 capitalize'>{movieDetailObj.Type}</p>
                </div>
                <div className='grid grid-cols-3 mt-5'>
                    {
                        movieDetailObj.Genre
                            ? <div className='flex flex-col'>
                                <h3 className='header'>Genre</h3>
                                <p className='mt-1'>{movieDetailObj.Genre}</p>
                            </div>
                            : null
                    }
                    {
                        movieDetailObj.Runtime
                            ? <div className='flex flex-col'>
                                <h3 className='header'>Running Time</h3>
                                <p className='mt-1'>{movieDetailObj.Runtime}</p>
                            </div>
                            : null
                    }
                    {
                        movieDetailObj.Rated
                            ? <div className='flex flex-col'>
                                <h3 className='header'>Rating</h3>
                                <p className='mt-1'>{movieDetailObj.imdbRating}/10</p>
                            </div>
                            : null
                    }
                </div>
                <div className='mt-5'>
                    <h2 className='header'>Plot</h2>
                    <p className='mt-1'>{movieDetailObj.Plot}</p>
                </div>
                <div className='mt-5'>
                    <h2 className='header'>Actors</h2>
                    <p className='mt-1'>{movieDetailObj.Actors}</p>
                </div>
                {
                    movieDetailObj.Ratings
                        ? <div className='mt-5'>
                            <h2 className='header'>More Ratings</h2>
                            <div className='mt-1 grid grid-cols-3'>
                                {
                                    movieDetailObj.Ratings.map(rating => (
                                        <div className='flex flex-col'>
                                            <h3 className='header'>{rating.Source}</h3>
                                            <p className='mt-1'>{rating.Value}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        : null
                }
                <div className='mt-5'>
                    <h2 className='header'>Writers</h2>
                    <p className='mt-1'>{movieDetailObj.Writer}</p>
                </div>
            </div>
        </main>
        : null
}

export default MovieDetailPage