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

/*accordion open and close functions*/

var buttons = document.querySelectorAll('.button');

buttons.forEach(function(button){
    button.addEventListener('click', function(){
      /*toggle clicked panel*/
      var panel = button.parentElement.nextElementSibling;
      if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
        panel.style.maxHeight = "0";
        panel.style.paddingBottom = "0";
        panel.style.paddingTop = "0";
        button.innerHTML = "&#9660;";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.paddingTop = "20px";
        panel.style.paddingBottom = "30px";
        button.innerHTML = "&#9650;";
      }

      // close all other panels if one is already open
      document.querySelectorAll('.panel').forEach(function(panels){
        if(panels !== panel){          // skip the clicked panel
          panels.style.maxHeight = "0";
          panels.style.paddingBottom = "0";
          panels.style.paddingTop = "0";
          button.innerHTML = "&#9660;";
        }
      });
    });
});