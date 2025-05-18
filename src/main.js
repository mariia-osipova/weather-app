import { renderLogin } from './login.js'
import { renderWeather } from './weather.js'

function router() {
    const hash = location.hash.replace('#','') || '/login'
    if (hash === '/login') {
        renderLogin()
    } else if (hash === '/weather') {
        renderWeather()
    } else {
        location.hash = '/login'
    }
}

window.addEventListener('hashchange', router)
window.addEventListener('DOMContentLoaded', router)
