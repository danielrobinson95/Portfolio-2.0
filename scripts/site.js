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

    registerContactForm();

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

function registerContactForm() {
    var form     = document.getElementById("contact-form");
    var button   = document.getElementById("form-submit-btn");
    var status   = document.getElementById("my-form-status");

    function success() {
        $('.modal').modal('hide');
        form.reset();        
        $('#notification-title').text('Message sent');
        $('#notification-message').text('Thanks for reaching out, I will be in touch soon!');
        $('.toast').toast('show');
    }

    function error() {
        $('#notification-title').text('Oh no.');
        $('#notification-message').text('Something went wrong, please try again.');
        $('.toast').toast('show');
    }

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        post(data, success, error);
    });
}

function post(data, success, error) {
    const method = "POST";
    const url = "https://formspree.io/xjvvlqkk";
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}

$('.toast').on('show.bs.toast', function () {
    $('.toast').show();
  });

  $('.toast').on('hidden.bs.toast', function () {
    $('.toast').hide();
  })