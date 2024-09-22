class ApiService {
    async getListings(pageNo: number = 1, term: string = "") {
        try {
            const output = await fetch(`https://www.omdbapi.com/?apikey=b9bd48a6&s=${term}&page=${pageNo}`)
            const result = await output.json()
            return result
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getMovieDetails(imdbId: string = "") {
        try {
            const output = await fetch(`https://www.omdbapi.com/?apikey=b9bd48a6&i=${imdbId}`)
            const result = await output.json()
            return result
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async searchTheMovie(title: string = "", signal: AbortSignal) {
        try {
            const output = await fetch(`https://www.omdbapi.com/?apikey=b9bd48a6&s=${title}`, {
                signal
            })
            const result = await output.json()
            return result
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

const apiService = new ApiService()
export { apiService as ApiService }