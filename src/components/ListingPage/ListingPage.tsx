import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import SearchInput from '../SearchInput/SearchInput';
import { ApiService } from '../../service/ApiService';
import { Link } from 'react-router-dom';

const ListingPage = () => {

    const {
        movieListing,
        setMovieListing,
        queryDetails
    } = useContext(ApiContext)

    const callNextBatch = async () => {
        const res = await ApiService.getListings(queryDetails.pageNo + 1, queryDetails.term)
        const movieListingArr = movieListing?.Search
        movieListingArr?.push(...res.Search)
        setMovieListing((preValue: any) => {
            return {
                ...preValue,
                Search: movieListingArr
            }
        })
    }

    return (
        <main className='flex-grow px-2 mt-2 overflow-auto' onScroll={e => {
            const { scrollHeight, scrollTop, clientHeight } = (e.target as HTMLDivElement)
            if (scrollHeight > clientHeight && Math.abs(scrollHeight - clientHeight - scrollTop) < 2) {
                callNextBatch()
            }
        }}>
            <SearchInput />
            <div className='grid xl:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-2'
            >
                {
                    movieListing?.Search.map(movie => (
                        <Link to={`/${movie.imdbID}`} className='p-2 rounded-md bg-[#1e2832] flex flex-col gap-2' key={movie.imdbID}>
                            <img src={movie.Poster} alt={movie.Title} className='w-full aspect-[1.5] object-cover' />
                            <p className='text-[0.675rem] font-semibold text-left mb-3'>{movie.Title}</p>
                        </Link>
                    ))
                }
            </div>
        </main>
    )
}

export default ListingPage