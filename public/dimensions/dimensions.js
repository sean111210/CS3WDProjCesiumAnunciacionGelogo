// initialize slides for dimensions section

const sliderView = document.querySelector(".slider-view");
const slides = document.querySelectorAll(".slider-view img");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;

slides.forEach(function(slide) {
    sliderView.style.width = `${100 * slides.length}%`;
});

// slide selection for dimensions section

function dotsUpdate() {
    dots.forEach(function(dot, i) {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
};

function updateSlider() {
    sliderView.style.transform = `translateX(-${100 * index}%)`;
    dotsUpdate();
}

updateSlider();

nextBtn.addEventListener("click", () => {
    index = (index + 1);
    if (index >= slides.length) {
        index = 0;
    }

    updateSlider();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1);
    if (index < 0) {
        index = slides.length - 1;
    }

    updateSlider();
}); 

// initialize panel selection for dimensions section

const dimPanels = document.querySelectorAll(".dimension-panel");
const dimensionNames = ["nether", "overworld", "end"];

function dropAccordion() {
    dimPanels.forEach(function(dimPanel) {
        if (dimPanel.dataset.dim === dimensionNames[index]) {
            dimPanel.classList.add("active");
        } else {
            dimPanel.classList.remove("active");
        }
    });
}

dropAccordion();

nextBtn.addEventListener("click", () => {
    dropAccordion();
});

prevBtn.addEventListener("click", () => {
    dropAccordion();
});