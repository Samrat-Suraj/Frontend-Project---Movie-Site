
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&
api_key=3e3e8f77c84d692046b164cbfe2ea204&page=1`
const IMG_PATH = `https://image.tmdb.org/t/p/original/`
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=3e3e8f77c84d692046b164cbfe2ea204&query=";


getmoviesdata(API_URL)

async function getmoviesdata(url){
    try{
        let res = await axios.get(url)
        showmovies(res.data.results)
        console.log(res.data.results)
    }
    catch(err){
        console.log('Error Caught' , err)
    }
} 

function showmovies(movies){
    main.innerHTML = "";

    movies.forEach(movie => {
        const {title,  poster_path , vote_average , overview} = movie;

        const movieEl = document.createElement
        ('div')
        movieEl.classList.add('movies')
        movieEl.innerHTML = `
            <img src="${IMG_PATH+poster_path}" alt="${title}">
            <div class="movies-info">
                <h3>${title}</h3>
                <span class="${getclassByrate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`

        main.appendChild(movieEl)
    });
}
function getclassByrate(vote){
    if(vote >= 8){
        return "green";
    }
    else if(vote >= 5){
        return "orange"
    }
    else{
        return 'red'
    }
}

const form  = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTeam = search.value

    if(searchTeam && searchTeam !== ""){

        getmoviesdata(SEARCH_API + searchTeam)
        search.value=''

    }else{
        window.location.reload()
    }
})
