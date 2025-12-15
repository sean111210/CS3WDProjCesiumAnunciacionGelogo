//initialize panel selection for dimensions section

const dimSelectors = document.querySelectorAll(".dim-selectors");
const dimPanels = document.querySelectorAll(".dim-panel");

let currentDim = "overworld";

dimPanels.forEach(function(dimPanel) {
    if (dimPanel.dataset.dim === currentDim) {
        dimPanel.style.display = "flex";
    } else {
        dimPanel.style.display = "none";
    }
});

dimSelectors.forEach(function(dimSelector) {
    if (dimSelector.dataset.dim === currentDim) {
        dimSelector.classList.add("active");
    } else {
        dimSelector.classList.remove("active");
    }
});

//panel selection for dimensions section

dimSelectors.forEach(function(dimSelector) {
    dimSelector.addEventListener("click", () => {
        const selectedDim = dimSelector.dataset.dim;
        dimPanels.forEach(function(dimPanel) {
            if (dimPanel.dataset.dim === selectedDim) {
                dimPanel.style.display = "flex";
            } else {
                dimPanel.style.display = "none";
            }
        });

        dimSelectors.forEach(function(dimSelector) {
            dimSelector.classList.remove("active");
        });

        dimSelector.classList.add("active");
    });
});

