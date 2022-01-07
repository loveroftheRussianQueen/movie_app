window.onload = function(){
    const API_KEY = 'api_key=73b31f15b44a93f52789c751c34a5d7d';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_URL = '/discover/movie?' + API_KEY + '&sort_by=popularity.desc';
    const searchMovieURL = BASE_URL + '/search/movie?' + API_KEY;
    const searchTVURL = BASE_URL + '/search/tv?' + API_KEY;
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const movie_container = document.getElementById('movie_container');
    movie_container.innerHTML = '';
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const ulTag = document.querySelectorAll('.numb');
    const searchBar = document.getElementById('search');
    const btn = document.getElementById('search_btn');
    const buttons = document.querySelectorAll('.option');

    var lastUrl = '';
    var currentPage = 1;
    var nextPage = 2;
    var prevPage = 3;
    var totalPages = 100;

    buttons.forEach(btn => btn.addEventListener('click', (e) =>{
        buttons.forEach(btn =>{
                btn.classList.remove('active');
        })
          e.target.classList.toggle('active'); 
    }));

        searchBar.addEventListener('keyup', (e) =>{
            const searchString = e.target.value;
            if(buttons[0].classList.contains('active')){
                if(e.keyCode == 13){
                    searchMovie(searchMovieURL + '&query=' + searchString);
                }
            }
            else if(buttons[1].classList.contains('active')){
                if(e.keyCode == 13){
                    searchTV(searchTVURL + '&query=' + searchString);
                }
            }
            else(alert('fuck you'))
        })

    function searchMovie(query){
        const url = query;
        lastUrl = url;
        fetch(url)
        .then(res => res.json())
        .then(data =>{
            trendingMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;
            lastPage = totalPages;
            
            if(currentPage <= 1){
                prev.classList.add('disabled');
                next.classList.remove('disabled');
            }
            else if(currentPage >= lastPage){
                prev.classList.remove('disabled');
                next.classList.add('disabled');
            }else{
                prev.classList.remove('disabled');
                next.classList.remove('disabled');
            }
        })
        console.log(url);
    } 
    
    function searchTV(query){
        const url = query;
        lastUrl = url;
        fetch(url)
        .then(res => res.json())
        .then(data =>{
            trendingShows(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;
            lastPage = totalPages;
            
            if(currentPage <= 1){
                prev.classList.add('disabled');
                next.classList.remove('disabled');
            }
            else if(currentPage >= lastPage){
                prev.classList.remove('disabled');
                next.classList.add('disabled');
            }else{
                prev.classList.remove('disabled');
                next.classList.remove('disabled');
            }
        })
        console.log(url);

    }

    trendingMovies = movies =>{
        movie_container.innerHTML = '';

        movies.forEach(movie => {
            img = IMG_URL + movie.poster_path;
            title = movie.title;

            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');

            movieEl.innerHTML = 
            `<img src="${img}">
            <span class="movie_title">${title}</span>
                `
            movie_container.appendChild(movieEl);

            

        });
    }; 
    
    trendingShows = shows =>{
        movie_container.innerHTML = '';
        shows.forEach(show => {
            img = IMG_URL + show.poster_path;
            title = show.original_name;

            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');

            movieEl.innerHTML = 
            `<img src="${img}">
            <span class="movie_title">${title}</span>
                `
            movie_container.appendChild(movieEl);
        });
    }; 

    prev.addEventListener('click', (e)=>{
        e.preventDefault();
            if(prevPage > 0){
                pageCall(prevPage);
            }
            let numb = document.querySelectorAll('.numb.active');
            numb.forEach(el =>{
                if(el.classList.contains('active')){
                    el.classList.remove('active');
                }
            })
    
            let li = document.querySelectorAll('li');
                li.forEach(element =>{
                    if(element.innerText == prevPage){
                        element.classList.toggle('active');
                    }
                })
        })

    next.addEventListener('click', (e)=>{
        e.preventDefault();
        if(nextPage <= totalPages){
            pageCall(nextPage);
        } 
        let numb = document.querySelectorAll('.numb.active');
        numb.forEach(el =>{
            if(el.classList.contains('active')){
                el.classList.remove('active');
            }
        })
        let li = document.querySelectorAll('li');
            li.forEach(element =>{
                if(element.innerText == nextPage){
                    element.classList.toggle('active');
                }
            })
    })

     function pageCall(page){
      let url = new URL(lastUrl)
      url.searchParams.set("page", page)   
      if(btn[0].classList.contains('active')){
        searchMovie(url);
      }else if(btn[1].classList.contains('active')){
          searchTV(url);
      }
      
      console.log(typeof(page));
      window.scrollTo(0, 0);
        } 

    ulTag.forEach(el => el.addEventListener('click', (e) =>{
            pagination(e);
            }));

    function pagination(e) {
        let elems = document.querySelector('.pagination .active');
        if (elems !== null) {
          elems.classList.remove('active');
          e.target.classList.toggle('active'); 
          pageCall(e.target.innerText);
        }
        let dots = document.getElementsByClassName('dots')[0];
            let numb1 = document.getElementById('numb1');
            if (parseInt(e.target.innerText) >= 2) {
                numb1.insertAdjacentElement('afterend', dots);
            }       
      }

} 
