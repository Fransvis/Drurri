window.onload=function(){
window.onscroll = function() {
    stickyFunction();
  };
  
  let navbar = document.getElementById("navbar");
  let sticky = navbar.offsetTop;
  
  function stickyFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }
}

const section = document.querySelector('.color-top');




const welcomeModal             = document.getElementById('welcomeModal');
const createProfileContent     = document.getElementById('createProfileContent');
const createProfileModalButton = document.getElementById('create-profile-button');


function shutItDown() {
  welcomeModal.style.display = 'none';
  createProfileContent.style.display = 'block';
}

createProfileModalButton.addEventListener('click', shutItDown);


// Modal sign up Freelancer 

// get modal element 








// function clickOutside(e){
//   if(e.target == modal)
//   modal.style.display = 'none';
// }










  