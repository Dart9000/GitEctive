// Header
var topIcon = document.querySelector('.icon');
var nav = document.querySelector('.nav-lin');
var navLi = document.querySelectorAll('.nav-lin li')

//Event Listener

topIcon.addEventListener("click", addNavBar);

//Functions

function addNavBar(){
  //Class given to topIcon
  nav.classList.toggle('icon-active');

  //links animation
  navLi.forEach((link, index) => {
    if(link.style.animation){
      link.style.animation = ""
    }else{
      link.style.animation = `navLinkFade 1s ease forwards ${index/5}s`;
    }
  });

  //icon animation
  topIcon.classList.toggle('toggle');
}
