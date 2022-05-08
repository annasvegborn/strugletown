document.ontouchmove = function(event){
    event.preventDefault();
}




function syncHeight() {
    document.documentElement.style.setProperty(
        '--window-inner-height',
        `${window.innerHeight}px`
    );
}

window.addEventListener('resize', syncHeight);

let scrollY; // we'll store the scroll position here

const modal = document.querySelector('html');

function preventDefault(e) {
    e.preventDefault();
}

function showModal() {
    // remember scroll position
    scrollY = window.scrollY;

    document.documentElement.classList.add('is-locked');

    modal.classList.add('is-open');

    modal.addEventListener('pointermove', preventDefault);
}

function hideModal() {
    document.documentElement.classList.remove('is-locked');

    modal.classList.remove('is-open');

    modal.removeEventListener('pointermove', preventDefault);

    // restore scroll position
    window.scrollTo(0, scrollY);
}