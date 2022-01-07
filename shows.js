window.onload = function(){
    const API_KEY = 'api_key=73b31f15b44a93f52789c751c34a5d7d';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_URL = '/discover/tv?' + API_KEY + '&sort_by=popularity.desc';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const url = BASE_URL + API_URL;
    const movie_container = document.getElementById('movie_container');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const ulTag = document.querySelectorAll('.numb');
    const liTag = document.querySelector('li');
    const genres = document.querySelectorAll('.genre');

    var lastUrl = '';
    var currentPage = 1;
    var nextPage = 2;
    var prevPage = 3;
    var totalPages = 100;


    fetchURL(url);


    function fetchURL(url){
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
    }   

    trendingShows = (shows) => {
        movie_container.innerHTML = "";
    
        shows.forEach((show) => {
          img = IMG_URL + show.poster_path;
          title = show.original_name;
          rate = show.vote_average;
          date = show.release_date;
          tagline = show.tagline;
    
          const movieEl = document.createElement("div");
          movieEl.classList.add("movie");
          movieEl.setAttribute("data-modal-target", ".popup");
    
          movieEl.innerHTML = `<span class="rate">${rate}</span>
                <img src="${img}">
                <span class="movie_title">${title}</span>
                <span class="movie_date" style="text-align: left;">${tagline}</span>
                <span class="movie_date">${date}</span>
                    `;
          movie_container.appendChild(movieEl);
        });
    
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `<div class="popup_left">
                    <img src="img/dark_knight.jpg">
                </div>
                <div class="popup_right">
                        <span class="text" id="popup_title">Movie Title</span>
                        <span class="text" id="popup_tagline">Tagline</span>
                        <div class="description">
                        </div>
                    </div>
                <span data-close-button="close_button" class="close_popup"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                    `;
        movie_container.appendChild(popup);
        let movief = document.querySelectorAll("[data-modal-target]");
        movief.forEach((el) => {
          console.log(el);
          el.addEventListener("click", (e) => {
            let target = e.target || e.currentTarget;
            let clicked_target = null;
            if (target.getAttribute("class") === null) {
              clicked_target = target.parentElement;
            } else {
              clicked_target = target;
            }
            let clicked_title = clicked_target.querySelector("span.movie_title")
              .textContent;
            show.forEach((show) => {
              // skip foreach if title doesnt match
              if (clicked_title === show.original_name) {
                //console.log("movie title  and clicked title match: ", movie);
                let modal = document.querySelector(el.dataset.modalTarget);
                modal.innerHTML = "";
                img = IMG_URL + show.poster_path;
                title = show.title;
                tag = show.tagline;
                description = show.overview;
                modal.innerHTML = `
                        <div class="popup_left">
                        <img src=${img}>
                    </div>
                    <div class="popup_right">
                            <span class="text" id="popup_title">${title}</span>
                            <span class="text" id="popup_tagline">${tag}</span>
                            <div class="description">
                            ${description}
                            </div>
                        </div>
                    <span data-close-button="close_button" class="close_popup"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                        `;
                openModal(modal);
              }
            });
            let close = document.querySelectorAll("[data-close-button]");
    
            close.forEach((el) => {
              el.addEventListener("click", () => {
                const modal = el.closest(".popup");
                closeModal(modal);
              });
            });
          });
        }); 

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
      fetchURL(url);
      console.log(typeof(page));
      window.scrollTo(0, 0);
        } 

    ulTag.forEach(el => el.addEventListener('click', (e) =>{
            pagination(e);
            }));

    genres.forEach(el => el.addEventListener('click', (e) => {
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active');
          } else if (!e.target.classList.contains('active')) {
            e.target.classList.toggle('active');
          }
          genreChoose(e);
    }))


    function genreChoose(e){
        let genres = {
            'Action & Adventure': '10759',
            'Animation': '16',
            'Comedy': '35',
            'Crime': '80',
            'Documentary': '99',
            'Drama': '18',
            'Family': '10751',
            'Kids': '10762',
            'Mystery': '9648',
            'News': '10763',
            'Reality': '10764',
            'Sci-Fi & Fantasy': '10765',
            'Soap': '10766',
            'War & Politics': '10768',
            'Western': '37'
        };
        params = new URLSearchParams('');
        document.querySelectorAll('.genre.active').forEach(f => params.append('with_genres', genres[f.innerText]));
        console.log(params.toString());
        fetchURL(url + ([...params].length > 0 ? '&' : '') + params.toString());
    }

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
}
