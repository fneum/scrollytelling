const scroller = scrollama();

function handleStepEnter(response) {
    const graphicContainer = document.querySelector('.graphic__container');
    if (response.index === 1 || response.index === 2) {
        console.log("fasg zoom");
        graphicContainer.classList.add('visible');
    } else {
        graphicContainer.classList.remove('visible');
    }

    if (response.index === 2) {
        var layoutUpdate = {
            'xaxis.range': [2, 3],
            'yaxis.range': [6, 7],
        };
        var transitionOptions = {
            transition: {
                duration: 1000,
                easing: 'cubic-in-out',
            },
            frame: {
                duration: 1000,
            }
        };
        Plotly.animate('plotly-div', {
            layout: layoutUpdate
        }, transitionOptions);
    }
    if (response.index === 1) {
        var fullXRange = [2, 4.5];
        var fullYRange = [4, 8];
    
        var layoutUpdate = {
            'xaxis.range': fullXRange,
            'yaxis.range': fullYRange,
        };
        var transitionOptions = {
            transition: {
                duration: 1000,
                easing: 'cubic-in-out',
            },
            frame: {
                duration: 1000,
            }
        };
        console.log("Resetting zoom");
        Plotly.animate('plotly-div', {
            layout: layoutUpdate
        }, transitionOptions);
    }

    response.element.classList.add('is-active');
}

function handleStepExit(response) {
    response.element.classList.remove('is-active');
}

function setupScroller() {
    scroller.setup({
        step: '.scroll__text .step',
        offset: 0.5,
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