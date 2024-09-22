import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { ApiService } from '../../service/ApiService'
import { MovieObj } from '../../interface'

const SearchInput = () => {
    const { queryDetails, setMovieListing, setQueryDetails } = useContext(ApiContext)
    const [searchTerm, setSearchTerm] = useState(queryDetails.term)
    const [termPopup, setTermPopup] = useState(false)
    const [possibleTerms, setPossibleTerms] = useState<MovieObj[]>()

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!searchTerm) return
        const res = await ApiService.getListings(1, searchTerm)
        setMovieListing(res)
        setQueryDetails({
            pageNo: 1,
            term: searchTerm
        })
        setTermPopup(false)
    }

    const abortController = new AbortController();
    let timeoutForPopup: any

    useEffect(() => {
        (async () => {
            if (!searchTerm) return
            const { signal } = abortController
            const res = await ApiService.searchTheMovie(searchTerm, signal)
            if (res?.Search) {
                setPossibleTerms(res.Search)
                setTermPopup(true)
                timeoutForPopup = setTimeout(() => {
                    setTermPopup(false)
                }, 10000)
            }
        })()
        return () => {
            abortController.abort()
            clearTimeout(timeoutForPopup)
        }
    }, [searchTerm])


    return (
        <form className='w-full relative' onSubmit={submitHandler}>
            <input
                className='w-full rounded-md py-2 px-3 mb-2 outline-none text-black placeholder:text-[#9ea3ad]'
                placeholder='Search...'
                type='text'
                onChange={e => setSearchTerm(e.target.value)}
            />
            {
                possibleTerms && termPopup
                    ? <div className='absolute z-[100] top-full flex flex-col text-left bg-white rounded-md text-black w-full px-2 term-point'>
                        {
                            possibleTerms.map(term => (
                                <div className='py-2 [&:not(:last-child)]:border-b' key={`${term.imdbID}-search`}>{term.Title}</div>
                            ))
                        }
                    </div>
                    : null
            }
        </form>
    )
}

export default SearchInput