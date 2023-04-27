// toggle search icon 
const searchIcon = document.querySelector(".search_icon_svg");
const searchIconDropdown = document.querySelector(".search_input_dropdown");
searchIcon.addEventListener("click", ()=>{
    searchIconDropdown.classList.toggle("show");
    
})


//toggole profile icon
var profileIcon = document.querySelector(".user_profile_icon");
var profileDetailsBlock = document.querySelector(".profile_details_and_account_settings");


profileIcon.addEventListener("click",()=>{
    profileDetailsBlock.classList.toggle("visible");
})

//custom accordian for nav
const navitem = document.querySelectorAll(".nav-item");

for(let i = 0; i < navitem.length; i++){
  navitem[i].addEventListener("click", () => {
navitem [i].classList.add("active");

  })
}




