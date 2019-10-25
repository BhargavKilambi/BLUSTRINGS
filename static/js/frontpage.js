var ticking = false;
var isFirefox = /Firefox/i.test(navigator.userAgent);
var isIe = /MSIE/i.test(navigator.userAgent) || /Trident.*rv\:11\./i.test(navigator.userAgent);
var scrollSensitivitySetting = 30;
var slideDurationSetting = 800;
var currentSlideNumber = 0;
var totalSlideNumber = $('.section').length;

function currentSlideTransition() {
    var $currentSlide = $('.section').eq(currentSlideNumber);
    $currentSlide.css('transform', 'translate3d(0,-2rem,0)').find('.content-wrapper').css('transform', 'translateY(15vh)');
}

function nextItem() {
    var $previousSlide = $('.section').eq(currentSlideNumber - 1);
    $previousSlide.css('transform', 'translate3d(0,-2rem,0)').find('.content-wrapper').css('transform', 'translateY(40vh)');
    currentSlideTransition();
}

function previousItem() {
    var $previousSlide = $('.section').eq(currentSlideNumber + 1);
    $previousSlide.css('transform', 'translate3d(0,2rem,0)').find('.content-wrapper').css('transform', 'translateY(30vh)');
    currentSlideTransition();
}

function slideDurationTimeout(slideDuration) {
    setTimeout(function () {
        ticking = false;
    }, slideDuration);
}

function parallaxScroll(evt) {
    if (isFirefox) {
        delta = evt.detail * -120;
    } else if (isIe) {
        delta = -evt.deltaY;
    } else {
        delta = evt.wheelDelta;
    }

    if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
            ticking = true;
            if (currentSlideNumber !== totalSlideNumber - 1) {
                currentSlideNumber++;
                nextItem();
            }

            slideDurationTimeout(slideDurationSetting);
        }

        if (delta >= scrollSensitivitySetting) {
            ticking = true;
            if (currentSlideNumber !== 0) {
                currentSlideNumber--;
            }

            previousItem();
            slideDurationTimeout(slideDurationSetting);
        }
    }
}

var mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel';
// window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

var isAnimating = false;

function handleParallaxScroll(event) {
    if (isAnimating) {
        event.preventDefault();
    }

    if (event.deltaY > 0) { // Is scrolling down

    } else { // Is scrolling up

    }
}

// window.addEventListener('wheel', _.throttle(handleParallaxScroll, 60), false);

////////////////////////////////////////////////////////////////////////////////
////////////// Observer API for handling section specific anims ////////////////
////////////////////////////////////////////////////////////////////////////////
// const options = {
//     threshold: 0.4
// };

// function callback(entries) {
//     for (const entry of entries) {
//         if (entry.isIntersecting) {
//             const section = entry.target;
//             section.classList.add('is-visible');
//         }
//     }
// }

// const observer = new IntersectionObserver(callback, options);

// const sections = document.querySelectorAll('.section');
// for (const section of sections) {
//     observer.observe(section);
// }

////////////////////////////////////////////////////////////////////////////////
//////////////////////// Snap scroll to next section //////////////////////////
////////////////////////////////////////////////////////////////////////////////
let animationIsFinished = false;
let timeoutId;

var animationTimeout;
var transitionTimeout;
var animationTime = 600;
var transitionTime = 200;

fullpage("#fullpage", {
    sectionSelector: '.section',
    afterLoad: function(origin, destination, direction) {
        if (direction === 'down') {
            destination.item.classList.add('animate-in-up');
        } else {
            destination.item.classList.add('animate-in-down');
        }

        setTimeout(() => {
            destination.item.classList.add('animation-done');
        }, animationTime);
    },
    onLeave: function(origin, destination, direction) {
        console.log(origin, destination, direction);

        if (animationIsFinished) return;

        // Remove all useless classes before moving to next section
        destination.item.classList.remove('animation-done');
        destination.item.classList.remove('animate-in-up');
        destination.item.classList.remove('animate-in-down');
        destination.item.classList.remove('animate-out-up');
        destination.item.classList.remove('animate-out-down');

        if (direction === 'down') {
            origin.item.classList.add('animate-out-up');
        } else {
            origin.item.classList.add('animate-out-down');
        }

        clearTimeout(transitionTimeout);

        transitionTimeout = setTimeout(function() {
            animationIsFinished = true;

            origin.item.classList.remove('animation-done');
            origin.item.classList.remove('animate-in-up');
            origin.item.classList.remove('animate-in-down');
            origin.item.classList.remove('animate-out-up');
            origin.item.classList.remove('animate-out-down');

            // Move to target section
            if(direction === 'down') {
                fullpage_api.moveSectionDown();
            } else {
                fullpage_api.moveSectionUp();
            }

            transitionTimeout = setTimeout(() => animationIsFinished = false, transitionTime);
        }, animationTime);

        return animationIsFinished;
    }
});
