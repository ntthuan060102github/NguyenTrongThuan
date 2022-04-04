const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const projects = $$('.projects__project')

// ----- Height of all page -----
const pageList = $$('.right-part__page')
var navItemTopPosList = []
function getHeightPages() {
    navItemTopPosList = []
    for( var page of pageList ) {
        const tempHeight = navItemTopPosList.length === 0 ? 0 : navItemTopPosList[navItemTopPosList.length - 1]
        if (page === $('.skills')){
            navItemTopPosList.push(page.clientHeight + tempHeight + $('.slide').clientHeight)
        }
        else {
            navItemTopPosList.push(page.clientHeight + tempHeight)
        }
    }
}

getHeightPages(navItemTopPosList)
// ----- Event: scroll page -----
window.onscroll = function() {
    getHeightPages()

    var idx = -1

    for(let i = 0; i < navItemTopPosList.length; i++) {
        if(navItemTopPosList[i]  - 1  <= document.documentElement.scrollTop + 200 && document.documentElement.scrollTop + 200 + 1 <= navItemTopPosList[i + 1]) {
            idx = i 
            break
        }
    }
    const preNavItem = $('.left-part__item--active')
    const preHeaderNavItem = $('.header__nav-item--active')
    if (idx + 1 !== parseInt(preNavItem.dataset.order)) {
        const curNavItem = Array.from(navItems).find(function (target) {
            return parseInt(target.dataset.order) === idx + 1
        })
        preNavItem.classList.remove('left-part__item--active')
        curNavItem.classList.add('left-part__item--active')

        const curHeaderNavItem = Array.from(headerNavItems).find(function (target) {
            return parseInt(target.dataset.order) === idx + 1
        })
        preHeaderNavItem.classList.remove('header__nav-item--active')
        curHeaderNavItem.classList.add('header__nav-item--active')
    }

    for (var project of projects) {
        project.style.height = project.clientWidth * 9 / 16 + 'px'
    }
}

// ----- Event: Focus navigation items -----
const navItems = $$('.left-part__item')

for ( var navItem of navItems ) {
    navItem.onclick = function() {
        // $('.left-part__item--active').classList.remove('left-part__item--active')
        // this.classList.add('left-part__item--active')

        window.scrollTo({
            top: this.dataset.order === '0' ? 0 : navItemTopPosList[parseInt(this.dataset.order) - 1],
            behavior: 'smooth'
        })
    }
}

const headerNavItems = $$('.header__nav-item')

for ( var headerNavItem of headerNavItems ) {
    headerNavItem.onclick = function() {
        // $('.header-nav-item--active').classList.remove('header-nav-item--active')
        // this.classList.add('header-nav-item--active')

        window.scrollTo({
            top: this.dataset.order === '0' ? 0 : navItemTopPosList[parseInt(this.dataset.order) - 1],
            behavior: 'smooth'
        })
    }

}

const contactForward = $('.about__description--contact-forward');
contactForward.onclick = function () {
    window.scrollTo({
        top: navItemTopPosList[4],
        behavior: 'smooth'
    })
}

const progressWrapList = $$('.skills__progess-wrap')
for (var progress of progressWrapList) {
    progress.querySelector('.skills__progress-rate').innerText = 
        (Math.round(progress.querySelector('.skills__progess-bar').clientWidth 
        / progress.querySelector('.skills__progess').clientWidth * 100)).toString() + '%'
}


const sendMessageBtn = $('.contact__submit-btn')
sendMessageBtn.onclick = function() {
    const inputForms = $$('.contact__form-input')
    let data = {}
    for (var inputForm of inputForms) {
        data[inputForm.name] = inputForm.value
    }
    // Send data
    console.log(data)
}

// const downloadCVBtn = $('.home__downloadCV')
// downloadCVBtn.onclick = function() {
//     alert('Coming soon!')
// }

function loadScript(target, subObj = "", subIdx = -1) {
    const content = target.dataset.content
    let idx = 0
    var loadContent = ">> "
    let subTarget

    target.innerText = loadContent
    
    function loadText() {
        if (idx < content.length) {
            if (idx === subIdx) {
                target.innerHTML += `<span class="${subObj}"></span>`
                subTarget = target.querySelector('span')
                loadContent = ""
            }
            loadContent += content[idx]
            if (idx < subIdx || subIdx === -1) {
                target.innerText = loadContent
            }
            else {
                subTarget.innerText = loadContent
            }
            idx += 1
            if (content[idx - 1] === ":" && target.getAttribute("id") !== "cursor-line") {
                setTimeout(loadText, 500)
            }
            else {
                setTimeout(loadText, 25)
            }
        }
        else {
            target.style.display = "block"
            if (target.getAttribute("id") === "cursor-line") {
                target.querySelector('.typed-cursor').style.animation = "blink 0.95s infinite"
            }
        }
    }
    setTimeout(loadText, 300)
}

function loading() {
    setTimeout(() => loadScript($('#line1'),"text-primary", 8), 0)
    setTimeout(() =>loadScript($('#line2')), 1550 + 200)
    setTimeout(() =>loadScript($('#line3'), "text-success", 8), 3800 + 200)
    setTimeout(() =>loadScript($('#line4')), 5450 + 200)
    setTimeout(() =>loadScript($('#cursor-line'), "typed-cursor", 0), 6200 + 200)

    const target = $('#preloader')
    
    setTimeout(() => {
        target.style.opacity = "0"
    } , 8000)
    setTimeout(() => {
        target.style.display = "none"
    }, 9000)
    
}
window.onload = () => setTimeout(loading, 500)

const themeBtn = $('.theme-mode')
themeBtn.onclick = function() {
    if (themeBtn.checked) {
        $('body').classList.remove('dark-theme')
        $('.theme-mode-mini').checked = false
    }
    else {
        $('body').classList.add('dark-theme')
        $('.theme-mode-mini').checked = true
    }
}

const themeMobile = $('.theme-mode-mini')
themeMobile.onclick = function() {
    if (themeMobile.checked) {
        $('body').classList.remove('dark-theme')
        $('.theme-mode').checked = false
    }
    else {
        $('body').classList.add('dark-theme')
        $('.theme-mode').checked = true
    }
}

const topBtn = $('.top-control')
topBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const skipLoader = $('.skip-loader')

skipLoader.onclick = () => {
    $('#preloader').style.opacity = "0"
    setTimeout(() => {
        $('#preloader').style.display = "none"
    }, 1000)
}
