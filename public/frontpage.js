// Grab elements
var sideNav = document.getElementById("sideNav");
var hamburger = document.getElementById("hamburger");
var closeBtn = document.querySelector(".sidenav .closebtn");

// Open side menu
hamburger.onclick = function() {
  sideNav.style.width = "250px"; // Slide out 250px
}

// Close side menu
closeBtn.onclick = function() {
  sideNav.style.width = "0";
}

// expansion on focus
var guideGrid = document.getElementById("guide-grid");
var guideBox = document.getElementById("guide-box");
var placeholder = document.getElementById("placeholder");

guideGrid.onfocus = function() {
  guideBox.style.width = "450px";
  placeholder.style.width = "450px";  
}