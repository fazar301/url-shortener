const form = document.querySelector('form')
const linkContainer = document.querySelector('.link-container')

form.addEventListener('submit', async function(event){
    event.preventDefault()
    const keyword = document.querySelector('input[type = text]')

    if(validateUrl(keyword.value)){
        const hasil = await getData(keyword.value)
        const li = `<li><span class="ori">${hasil.original_link}</span><div class="kanan"><input class="shrt" value="${hasil.full_short_link}" readonly=true><button class="cyan" onclick=copy(this)>Copy</button></div></li>`
        console.log(hasil)

        linkContainer.insertAdjacentHTML('beforeend',li)
    }
})
function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}


function getData(url){
    return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
            .then(response => response.json())
            .then(data => data.result)
}


function copy(e){
    e.previousElementSibling.select()
    e.innerHTML = 'Copied!'
    e.classList.add('copy')
    setTimeout(function(){
        e.innerHTML = 'Copy'
        e.classList.remove('copy')
    },1000)
    return document.execCommand('copy')
}


// hamburger icon
const hamburger = document.querySelector('.hamburger')
hamburger.addEventListener('click', function(){
    hamburger.classList.toggle('active')
    hamburger.parentElement.nextElementSibling.classList.toggle('height')
})