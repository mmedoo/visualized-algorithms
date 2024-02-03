document.addEventListener("DOMContentLoaded",addjs);
function addjs() {
  const divs = document.querySelectorAll('div');
  if (divs[divs.length-1].style[2] == 'z-index') {
      divs[divs.length-1].remove();
      console.log('beautifully done!');
  }
}
