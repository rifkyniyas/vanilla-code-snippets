//Profile Image Upload
const profileOverlay = document.getElementById('profile-overlay')
const profileImage = document.getElementById('profileImage')
const uploadProfile = document.getElementById('uploadProfile')
const updBtn = document.getElementById('updateProfileButton')
//imitate click on picture towards file input
profileOverlay.addEventListener('click', ()=>{
    uploadProfile.click();
})
const fastPreview = ( uploader ) => {
    if ( uploader.files && uploader.files[0] ){
        profileImage.src = window.URL.createObjectURL(uploader.files[0])
        updBtn.classList.toggle('hidden')
    }
}