function wait(ms){
    return new Promise(res=>{
        setTimeout(()=>{
            res();
        },ms);
    });
}


const mes = document.querySelector(".someInfo");
window.addEventListener("DOMContentLoaded",display);
async function display(){
    await wait(500);
    mes.classList.add("loaded");
}

const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const textArea = document.querySelector('textarea');
function toggleSubmit(force){
    if (!force){
        form.classList.add("disabled");
        for (let input of inputs){
            input.setAttribute("disabled","true");
        }
        textArea.setAttribute("disabled","true");
    } else {
        form.classList.remove("disabled");
        for (let input of inputs){
            input.removeAttribute("disabled");
        }
        textArea.removeAttribute("disabled");
    }
}

form.addEventListener("submit",function(e){
    e.preventDefault();
    toggleSubmit(false);
    var formData = new FormData(this);
    formData.append('service_id', 'service_port');
    formData.append('template_id', 'port');
    formData.append('user_id', 'VlIZlX3XpFdgpVYZR');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send-form');
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Your mail is sent!');
        } else {
            alert('Oops... ' + xhr.responseText);
        }
        toggleSubmit(true);
    };
    xhr.onerror = function() {
        alert('Oops... Something went wrong.');
    };
    xhr.send(formData);
})
