var isHidden = true;

$(document).ready(function() {
    new TypeIt('#intro-verb', {
        strings: ['Passionate', 'Determined', 'Hard-Working', 'Dedicated'],
        cursor: true,
        loop: true,
        nextStringDelay: [3000, 50],
        breakLines: false,
        loopDelay: 3000
    }).go();
});



function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)
    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)
        if (typeof callback === 'function') callback()
    }
    node.addEventListener('animationend', handleAnimationEnd)
}

$(window).scroll(function() {
    var isOffScreen = $('#contact-button-intro').is(':offscreen');
    if (isOffScreen && isHidden) {
        isHidden = false;
        $('#contact-button-nav').toggleClass('default-hidden');
        animateCSS('#contact-button-nav', 'slideInUp');
    } else if (!isOffScreen && !isHidden) {
        isHidden = true;
        $('#contact-button-nav').toggleClass('default-hidden');
    }
});

jQuery.expr.filters.offscreen = function (el) {
    var rect = el.getBoundingClientRect();
    return (
        (rect.x + rect.width) < 0 ||
        (rect.y + rect.height) < 0 ||
        (rect.x > window.innerWidth || rect.y > window.innerHeight)
    );
};