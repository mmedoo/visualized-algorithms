function wait(ms){
    return new Promise(res=>{
        setTimeout(()=>{
            res();
        },ms);
    });
}


const mes = document.querySelector(".someInfo");
window.addEventListener("load",display);
async function display(){
    await wait(400);
    mes.classList.add("loaded");
}




const nav = document.querySelector('nav');
const buttons = document.querySelectorAll('button');
const heads = document.querySelectorAll('.a');
const scrolls = document.querySelectorAll('.hr');
const bar = document.querySelector('.ler');
function align() {
    let allHigh = document.body.offsetHeight;
    bar.style.width = pageYOffset*100/(allHigh-innerHeight)+'%';
}
align();
window.addEventListener('scroll',align);
window.addEventListener('scroll',() => {
    if (pageYOffset >= 2380) {
        nav.style.top = '0px';
    } else {
        nav.style.top = '-50px';
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
