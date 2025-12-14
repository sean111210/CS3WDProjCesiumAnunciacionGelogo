const sliderView = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slider img");
const dots = document.querySelectorAll(".dot");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 1;

prev.addEventListener("click", () => {
    document.getElementbyId(next).onClick(function() {
        index = (index + 1);
        sliderView.style.transform = translateX("100vw")
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    });
});

next.addEventListener("click", () => {
    document.getElementbyId(prev).onClick(function() {
        index = (index - 1);
        sliderView.style.transform = translateX("-100vw");
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    });
});
