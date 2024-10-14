export default function Movies(settings) {
    const page = settings.page
    const container = settings.container
    container.innerHTML = ""
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3e52e2f5350ae60de5e2fc58e818d2a0&page=${page}`)
    .then(resp => {
        const movies = resp.data.results
        for(let movie of movies){
            const thumb = (movie.backdrop_path !== null) ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : `https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png`
            container.innerHTML +=
            `
            <a href = "./Movie.html?id=${movie.id}">
                <div class="movieDiv">
                <img class="movie" src="${thumb}" alt="movie"/>
                <h2 style="color: #00aaff;">${movie.original_title}</h3>
                <strong class="quality">HD</strong>
                <p class="rating">${Math.round(movie.vote_average*10)/10}</p>
                </div>
            </a>
             `
        }
    })
    .catch(e => console.log(e))
}