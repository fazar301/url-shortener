const form = document.querySelector('form')
const linkContainer = document.querySelector('.link-container')
const loader = document.querySelector('.lds-ellipsis')
const keyword = document.querySelector('input[type = text]')
const errMsg = document.querySelector('.err-msg')

form.addEventListener('submit', async function(event){
    event.preventDefault()
    
    if(keyword.value === '') {
        errMsg.innerHTML = 'Please add a link.'
        return keyword.classList.add('err')
    }else if(!validateUrl(keyword.value)) {
        errMsg.innerHTML = 'Please enter a valid URL.'
        return keyword.classList.add('err')
    }

        const hasil = await getData(keyword.value)
        const li = `<li><span class="ori">${hasil.original_link}</span><div class="kanan"><input class="shrt" value="${hasil.full_short_link}" readonly=true><button class="cyan" onclick=copy(this)>Copy</button></div></li>`
        console.log(hasil)

        linkContainer.insertAdjacentHTML('beforeend',li)
    
})
function validateUrl(value) {
    let url;
  
    try {
      url = new URL(value);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}


function getData(url){
    loader.style.display = 'inline-block';
    keyword.setAttribute('disabled','true')

    return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
            .then(response => {
                if(response.ok){
                    loader.style.display = 'none'
                    keyword.removeAttribute('disabled')
                    keyword.classList.remove('err')
                    errMsg.innerHTML = ''
                }
                return response.json()
            })
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