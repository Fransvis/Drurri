


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

  // const input = document.querySelector('input[type="file"]');
  // input.addEventListener('change', function(e) {
  //   console.log(input.files);
  //   const reader = new FileReader
  // }, false)

  // var loadFile = function(event) {
  //   var image = document.getElementById('projectImage');
  //   image.src = URL.createObjectURL(event.target.files[0]);
  // };



/* =============================== */
      /* addProjectInputFile */
/* =============================== */



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





inpFile.addEventListener('change', inputFile);
// editProfileButton.addEventListener('click', updateProfile);
createProfileModalButton.addEventListener('click', shutItDoooooown);





 /* =============================== */
      /* Edit Profile Modal*/
/* =============================== */


































  