window.onload = function(){
    const movie = document.querySelectorAll('[data-modal-target');
    const close = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');


    movie.forEach(el =>{
        el.addEventListener('click', () =>{
            const modal = document.querySelector(el.dataset.modalTarget)
            openModal(modal);
        })
    })

    close.forEach(el =>{
        el.addEventListener('click', () =>{
            const modal = el.closest('.popup');
            closeModal(modal);
        })
    })

    function openModal(modal){
        if(modal == null) return
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal(modal){
        if(modal == null) return
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
}


