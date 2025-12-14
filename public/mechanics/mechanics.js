//initialize panel selection for gamemodes section

const modeSelectors = document.querySelectorAll(".mode-selectors");
const modePanels = document.querySelectorAll(".mode-panel");

let currentMode = "survivalMode";

modePanels.forEach(function(modePanel) {
    if (modePanel.dataset.mode === currentMode) {
        modePanel.style.display = "flex";
    } else {
        modePanel.style.display = "none";
    }
});

modeSelectors.forEach(function(modeSelector) {
    if (modeSelector.dataset.mode === currentMode) {
        modeSelector.classList.add("active");
    } else {
        modeSelector.classList.remove("active");
    }
});

//initialize panel selection for difficulties section

const diffSelectors = document.querySelectorAll(".diff-selectors");
const diffPanels = document.querySelectorAll(".diff-panel");

let currentDiff = "peaceful";

diffPanels.forEach(function(diffPanel) {
    if (diffPanel.dataset.diff === currentDiff) {
        diffPanel.style.display = "flex";
    } else {
        diffPanel.style.display = "none";
    }
});

diffSelectors.forEach(function(diffSelector) {
    if (diffSelector.dataset.diff === currentDiff) {
        diffSelector.classList.add("active");
    } else {
        diffSelector.classList.remove("active");
    }
});

//panel selection for difficulties section

modeSelectors.forEach(function(modeSelector) {
    modeSelector.addEventListener("click", () => {
        const selectedMode = modeSelector.dataset.mode;

        modePanels.forEach(function(modePanel) {
            if (modePanel.dataset.mode === selectedMode) {
                modePanel.style.display = "flex";
            } else {
                modePanel.style.display = "none";
            }
        });

        modeSelectors.forEach(function(modeSelector) {
            modeSelector.classList.remove("active");
        });

        modeSelector.classList.add("active");
    });
});

//panel selection for difficulties section

diffSelectors.forEach(function(diffSelector) {
    diffSelector.addEventListener("click", () => {
        const selectedDiff = diffSelector.dataset.diff;

        diffPanels.forEach(function(diffPanel) {
            if (diffPanel.dataset.diff === selectedDiff) {
                diffPanel.style.display = "flex";
            } else {
                diffPanel.style.display = "none";
            }
        });

        diffSelectors.forEach(function(diffSelector) {
            diffSelector.classList.remove("active");
        });

        diffSelector.classList.add("active");
    });
});

