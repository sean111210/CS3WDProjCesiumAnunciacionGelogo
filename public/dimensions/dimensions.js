// initialize slides for dimensions section

const slides = document.querySelectorAll(".slider-view img");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 1;

// slide selection for dimensions section

function dotsUpdate(i) {
    dots.forEach(function(dot, i) {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
};

function updateSlider() {
    slides.forEach(function(slide) {
        slide.style.transform = `translateX(-${100 * index}%)`;
    });
    dotsUpdate();
}

slides.forEach(function(slide) {
    slide.style.transform = `translateX(-${100}%)`;
});
dotsUpdate(i=1);

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