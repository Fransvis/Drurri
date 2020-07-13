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


// Modal sign up Freelancer 

// get modal element 

const modal = document.getElementById('simpleModal');
const modalBtn = document.getElementById('modalBtn');
const closeBtn = document.getElementsByClassName('closeBtn')[0];
const firstName = document.getElementsByClassName('first-name')[0];
const firstNameActive = document.getElementsByClassName('firstName')[0];
const lastName = document.getElementsByClassName('last-name')[0];
const lastNameT = document.getElementsByClassName('lastName')[0];
const email = document.getElementsByClassName('email')[0];
const emailInput = document.getElementsByClassName('e-mail')[0];
const password = document.getElementsByClassName('password')[0];
const passwordInput = document.getElementsByClassName('pass-word')[0];

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal)
window.addEventListener('click', clickOutside);
firstName.addEventListener('click', firstNameChange);
lastName.addEventListener('click', lastNameChange);
email.addEventListener('click', emailInputChange);
password.addEventListener('click', passwordInputChange);


function firstNameChange(){
  firstNameActive.classList.toggle("signUpTransform")
}

function lastNameChange(){
  lastNameT.classList.toggle('signUpTransform')
}

function emailInputChange(){
  emailInput.classList.toggle('signUpTransform')
}

function passwordInputChange(){
  passwordInput.classList.toggle('signUpTransform')
}



function openModal () {
  modal.style.display = 'block';
}

function closeModal(){
  modal.style.display = 'none';
}

function clickOutside(e){
  if(e.target == modal)
  modal.style.display = 'none';
}





  