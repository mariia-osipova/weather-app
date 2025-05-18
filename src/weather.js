export async function renderWeather() {
    const token = localStorage.getItem('token')
    if (!token) {
        location.hash = '/login'
        return
    }

    // читаем ключ внутри функции
    const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY
    if (!API_KEY) {
        document.getElementById('app').innerHTML = `
      <p style="color:red">Missing API key.</p>
    `
        return
    }

    const app = document.getElementById('app')
    app.innerHTML = `
    <h1>Current Weather in Moscow</h1>
    <div id="weather">Loading…</div>
  `

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather` +
            `?q=Moscow&units=metric&lang=en&appid=${API_KEY}`
        )
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)

        app.querySelector('#weather').innerHTML = `
      <p>Temperature: ${data.main.temp.toFixed(1)} °C</p>
      <p>Condition: ${data.weather[0].description}</p>
      <p>Wind: ${data.wind.speed} m/s</p>
      <button id="logout">Log out</button>
    `
        document.getElementById('logout').onclick = () => {
            localStorage.removeItem('token')
            location.hash = '/login'
        }
    } catch (err) {
        app.querySelector('#weather').textContent = 'Error: ' + err.message
    }
}
