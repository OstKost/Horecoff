const btn = document.querySelector('.btn_info');
const wrap = document.querySelector('.gears-wrap');
// btn.addEventListener('click', () => {
//     wrap.classList.toggle('is-flipped');
// });
//////////////////////////hamburger//////////////////////////
///////////////////////////////////////////////////////////
const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    menuLinks = document.querySelectorAll('.menu__link');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });
    function onMenuLinkClick() {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
}
////////////////////////toTHR TOP/////////////

/* begin begin Back to Top button  */
(function () {
    function trackScroll() {
        const scrolled = window.pageYOffset;
        const coords = document.documentElement.clientHeight;

        if (scrolled > coords) {
            goTopBtn.classList.add('back_to_top-show');
        }
        if (scrolled < 50) {
            goTopBtn.classList.remove('back_to_top-show');
        }
    }

    function backToTop() {
        document.documentElement.style.scrollBehavior = 'auto';
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -100);
            setTimeout(backToTop, 0);
        }
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    let goTopBtn = document.querySelector('.back_to_top');

    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
})();
/* end begin Back to Top button  */

//////////////////////////////glide_JS////////////
/////////////////////////////////////////////////

//new Glide('.glide').mount();

///////////////////Form Validate/////////////////////////
////////////////////////////////////////////////////////
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////
//////////////////////Fresh fulll year////////////////////////////////

const curYear = document.querySelector('.copyright-year');

curYear.innerText = new Date().getFullYear();
