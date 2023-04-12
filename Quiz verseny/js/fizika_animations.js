/*================= SHOW MENU ==================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*================= REMOVE MENU MOBILE ==================*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*================= CHANGE BACKGROUND HEADER ==================*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('header-bg') 
                       : header.classList.remove('header-bg')
}
window.addEventListener('scroll', scrollHeader)

/*================= SCROLL REVEAL ANIMATION ==================*/
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 2500,
})

sr.reveal('.hud-item', {distance: '120px', delay: 400})
sr.reveal('.question', {delay: 1000})
sr.reveal('.choice-container:nth-child(1)', {delay: 1200})
sr.reveal('.choice-container:nth-child(2)', {delay: 1400})
sr.reveal('.choice-container:nth-child(3)', {delay: 1600})
