const nav = document.querySelector('nav');
const buttons = document.querySelectorAll('button');
const heads = document.querySelectorAll('.a');
const scrolls = document.querySelectorAll('.hr');
const bar = document.querySelector('.ler');
const title = document.querySelector('.title');
function align() {
    let allHigh = document.body.offsetHeight;
    bar.style.width = pageYOffset*100/(allHigh-innerHeight)+'%';
}
align();
window.addEventListener('scroll',align);
window.addEventListener('scroll',() => {
    if (pageYOffset >= 2380) {
        nav.style.top = '0px';
        title.innerText = 'Work'
    } else {
        nav.style.top = '-50px';
        title.innerText = 'Home'
    }
})
for (let i = 0; i < 3; i++) {
    buttons[i].addEventListener('click',() => {
        scrolls[i].scrollIntoView({behavior: "smooth"})
    })
    heads[i].addEventListener('click',() => {
        scrolls[i].scrollIntoView({behavior: "smooth"})
    })
}
