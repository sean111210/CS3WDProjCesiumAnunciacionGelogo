//initialize panel selection for dimensions section

const dimSelectors = document.querySelectorAll(".dim-selectors");
const dimPanels = document.querySelectorAll(".dim-panel");

let currentDim = "overworld"; //defaults to overworld dimension

//initialize — display the current dimension panel and set active class on the corresponding selector
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
    dimSelector.addEventListener("click", () => { //when a dimension selector is clicked
        const selectedDim = dimSelector.dataset.dim;
        dimPanels.forEach(function(dimPanel) { //scans through all elements with class dim-panel
            if (dimPanel.dataset.dim === selectedDim) { //if the data-dim attribute matches the selected dimension
                dimPanel.style.display = "flex";
            } else {
                dimPanel.style.display = "none";
            }
        });

        //update active class on dimension selectors
        dimSelectors.forEach(function(dimSelector) {
            dimSelector.classList.remove("active"); //removes active class from all dimension selectors
        });

        dimSelector.classList.add("active"); //adds active class to the clicked dimension selector
    });
});

