window.onload = function() {
  var prevScrollpos = window.pageYOffset;
  var navbar = document.getElementById("navbar");

  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = `-${navbar.offsetHeight}px`;
    }
    prevScrollpos = currentScrollPos;
  }
};

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