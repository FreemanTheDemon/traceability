const errBtn = document.querySelector('#buttonError');
const warnBtn = document.querySelector('#buttonWarning');
const critBtn = document.querySelector('#buttonCritical');

function errorHandler(e){
    e.preventDefault();
    axios.get('/error')
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

function warningHandler(e){
    e.preventDefault();
    axios.get('/warning')
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

function criticalHandler(e){
    e.preventDefault();
    axios.get('/critical')
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

errBtn.addEventListener('click', errorHandler);
warnBtn.addEventListener('click', warningHandler);
critBtn.addEventListener('click', criticalHandler);