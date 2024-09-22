import React from "react";

export interface MovieObj {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
}

export interface MovieListingObj {
    Response: string,
    Search: MovieObj[],
    totalResults: number
}

export interface ApiContextInterface {
    movieListing: MovieListingObj | undefined,
    setMovieListing: React.Dispatch<React.SetStateAction<MovieListingObj | undefined>>,
    queryDetails: QueryObj,
    setQueryDetails: React.Dispatch<React.SetStateAction<QueryObj>>
}

export interface QueryObj {
    pageNo: number,
    term: string
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieDetailObj {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}