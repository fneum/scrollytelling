const scroller = scrollama();

function handleStepEnter(response) {
    // Toggle the sticky figure visibility based on whether we're in block 2
    const graphicContainer = document.querySelector('.graphic__container');
    if (response.index === 1) { // Block 2 has an index of 1
        graphicContainer.classList.add('visible');
    } else {
        graphicContainer.classList.remove('visible');
    }

    // Highlight the current step as active
    response.element.classList.add('is-active');
}

function handleStepExit(response) {
    // Remove the active class on step exit
    response.element.classList.remove('is-active');

    // Optionally, remove visibility when exiting block 2 to ensure consistency in any scenario
    // This check is simplified since the visibility is mainly managed on entry
    if (response.index === 1) { // Exiting block 2
        document.querySelector('.graphic__container').classList.remove('visible');
    }
}

function setupScroller() {
    scroller.setup({
        step: '.scroll__text .step',
        offset: 0.5,
        debug: false, // Set to true to see visual debug cues
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

    // Update graphic container height
    const graphicContainer = document.querySelector('.graphic__container');
    graphicContainer.style.height = `${window.innerHeight}px`;
}

// Initialize
setupScroller();
// Reinitialize on resize to ensure correct positioning
window.addEventListener('resize', setupScroller);