export default function Movies(settings) {
    const page = settings.page;
    const container = settings.container;
    container.innerHTML = "";

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3e52e2f5350ae60de5e2fc58e818d2a0&page=${page}`)
        .then(resp => {
            const movies = resp.data.results;
            movies.forEach(movie => {
                const thumb = movie.backdrop_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                    : `https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png`;
                
                container.innerHTML += createMovieHTML(movie, thumb);
            });

            container.addEventListener('click', (e) => {
                if (e.target.closest('.bookmark-btn')) {
                    const movieId = e.target.closest('.movieDivMD').dataset.movieId;
                    const button = e.target.closest('.bookmark-btn');
                    addToFavourites(movieId, button);
                }
            });
        })
        .catch(e => console.log(e));

    function createMovieHTML(movie, thumb) {
        return `
            <div class="movieDivMD" data-movie-id="${movie.id}">
                <img class="movieMD" src="${thumb}" alt="movie" />
                <h2 class="movie-title">${movie.original_title}</h2>
                <strong class="qualityMD">HD</strong>
                <p class="ratingMd">${Math.round(movie.vote_average * 10) / 10}</p>
                <p class="overview">${movie.overview}</p>
                <p class="release-date">${movie.release_date}</p>
                <div class="button-container">
                    <button class="bookmark-btn"><i class="fa-solid fa-bookmark"></i></button>
                    <button class="cart-btn"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>
        `;
    }

    function addToFavourites(movieId, button) {
        axios.get('https://670d1d27073307b4ee425880.mockapi.io/api/v1/Favourites')
        .then(resp => {
            const ids = resp.data.map(fav => fav.movie_id);
            if(ids.includes(movieId)){
                showAlert('Movie already at Favourites')
            }
            else{
                axios.post('https://670d1d27073307b4ee425880.mockapi.io/api/v1/Favourites', {movie_id: movieId })
                .then(resp => {
                    showAlert('Movie added to Favourites');
                })
                .catch(e => console.log(e));
            }
        })
       
    }
    function showAlert(message) {
        const alertBox = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        alertMessage.textContent = message;
        alertBox.classList.remove('hidden');
    
        alertBox.style.opacity = '1';
        alertBox.style.transform = 'translateY(0)';
    
        setTimeout(() => {
            alertBox.style.opacity = '0'; 
            alertBox.style.transform = 'translateY(-20px)';
        }, 3000); 
    
        document.getElementById('alert-close').onclick = () => {
            alertBox.style.opacity = '0'; 
            alertBox.style.transform = 'translateY(-20px)'; 
        };
    }
}
