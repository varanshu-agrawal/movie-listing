import { createContext, useEffect, useState } from "react";
import { ApiContextInterface, MovieListingObj, QueryObj } from "../interface";
import { ApiService } from "../service/ApiService";

export const ApiContext = createContext<ApiContextInterface>({
    movieListing: undefined,
    setMovieListing: () => { },
    queryDetails: {
        term: "drive",
        pageNo: 1
    },
    setQueryDetails: () => { }
})

export const ApiContextProvider = ({
    children
}: {
    children: any
}) => {

    const [movieListing, setMovieListing] = useState<MovieListingObj | undefined>()
    const [queryDetails, setQueryDetails] = useState<QueryObj>({
        term: "drive",
        pageNo: 1
    })

    useEffect(() => {
        (async () => {
            const result = await ApiService.getListings(queryDetails.pageNo, queryDetails.term)
            setMovieListing(result)
        })()
    }, [])

    return (
        <ApiContext.Provider value={{
            movieListing,
            setMovieListing,
            queryDetails,
            setQueryDetails
        }}>
            {children}
        </ApiContext.Provider>
    )
}