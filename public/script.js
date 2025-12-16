/*hide-on scroll navigation bar*/
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

/*side navigation bar open and close functions*/

/* set width to 250px and open navigation */
function openNav() {
  document.getElementById("sidenav").style.width = "250px";
}

/* set width to 0 and close navigation */
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}