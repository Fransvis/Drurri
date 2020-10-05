/* =============================== */
      /* Navbar stick */
/* =============================== */


window.onscroll = function() {
    stickyFunction();
    infoDisplay();
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


const colorTop = document.querySelector('.color-top');
const faders = document.querySelectorAll('.fader');

const appearOptions = {
  threshold: 0,
  rootMargin: '0px 0px -100px 0px'
};

const appearOnScroll = new IntersectionObserver 
(function(
  entries, 
  appearOnScroll
) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.toggle('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// function infoDisplay (){
//   if (document.body.scrollTop > 1100 || document.documentElement.scrollTop > 1100) {
//     document.getElementById("icons").id = "test";
//   }
  // } else {
  //   document.getElementById("icons").id = "";
  // }
// }



// colorTop.addEventListener('mouseenter', infoDisplay);


/* =============================== */
      /* addProjectInputFile */
/* =============================== */

window.onload= function() {

const inpFile = document.getElementById('inpFile');
const previewContainer = document.getElementById('imagePreview');
const previewImage = document.querySelector('.image-preview__image');
const previewDefaultText = document.querySelector('.image-preview__default-text')


function inputFile() {
  const file = this.files[0];

  if(file){
    const reader = new FileReader();

    previewDefaultText.style.display = 'none';
    previewImage.style.display = 'block';

    reader.addEventListener('load', function() {
      console.log(this)
      previewImage.setAttribute('src', this.result);
    });

    reader.readAsDataURL(file);
  } else {
    previewDefaultText.style.display = null;
    previewImage.style.display = null;
    previewImage.setAttribute('src', '')
  }
};

inpFile.addEventListener('change', inputFile);

}

/* =============================== */
  /* EDIT PROFILE ON PROFILE PAGE */
/* =============================== */


  // const editProfileButton = document.getElementById('editProfile');
  // const editProfile       = document.getElementById('editProfileModal');
  // const profilePage       = document.querySelector('.profile-page');
  
  
  // function updateProfile() {
  //   profilePage.style.display = 'none'
  // }
  

 /* =============================== */
      /* Create profile Modal */
/* =============================== */
  
const welcomeModal             = document.getElementById('welcomeModal');
const createProfileContent     = document.getElementById('createProfileContent');
const createProfileModalButton = document.getElementById('create-profile-button');

function shutItDoooooown() {
  welcomeModal.style.display = 'none';
  createProfileContent.style.display = 'block';
}


/* ============================ */
      /* EVENT HANDLER */
/* ============================ */



// editProfileButton.addEventListener('click', updateProfile);
createProfileModalButton.addEventListener('click', shutItDoooooown);




































  