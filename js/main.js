/*===================== Show Menu========================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variable exists
    if(toggle && nav) {
        toggle.addEventListener('click', () => {
            // Adding show-menu class to the div tag with the nav_menu class
            nav.classList.toggle('show-menu')
        })
    }
}

showMenu('nav-toggle', 'nav-menu')

/*======================Remove Menu mobile========================*/
const navLink = document.querySelectorAll('.nav_link')
function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav_Link, we remove the show-enu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n=>n.addEventListener('click', linkAction))

/*======================Scroll Section Active Links========================*/
const sections = document.querySelectorAll('section[id]')
function scrollActive() {
    const scroll = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*======================SHOW SCROLL TOP======================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show scroll header class to the header tag
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll')
    else scrollTop.classList.remove('show-scroll')
}

window.addEventListener('scroll',scrollTop)

/*======================DARK LIGHT THEME======================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==============Reduce the size and print on A4 sheet=============*/
function scaleCv() {
    document.body.classList.add('scale-cv')
}
/*=================Remove the size when Cv is downloaded=================*/
function removeScale() {
    document.body.classList.remove('scale-cv')
}
/*======================Generate PDF======================*/
// PDF Generated Area
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')
// HTML2PDF option
let opt = {
  margin:       0,
  filename:     'myResume.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 4 },
  jsPDF:        { format: 'a4', orientation: 'portrait' }
};
// Function to call areaCv and HTML2Pdf option
function generateResume() {
    html2pdf(areaCv, opt)
}
// When the Button is clicked, it executes the three function
resumeButton.addEventListener('click', () => {
    // 1. The class scale-cv is added to the body, where it reduces the size of the elements
    scaleCv()
    // 2. The Pdf is generated
    generateResume()
    // 3. The .scale-cv is removed from the body after 5 seconds to return the normal size
    setTimeout(removeScale, 5000)
})

