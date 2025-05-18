const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export async function renderWeather() {
    const token = localStorage.getItem('token')
    if (!token) {
        location.hash = '/login'
        return
    }

    const app = document.getElementById('app')
    app.innerHTML = `
    <h1>Current Weather in Moscow</h1>
    <div id="weather">Loading...</div>
  `

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=en&appid=${API_KEY}`
        )
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)

        const { temp } = data.main
        const desc = data.weather[0].description
        const wind = data.wind.speed

        document.getElementById('weather').innerHTML = `
      <p>Temperature: ${temp.toFixed(1)} °C</p>
      <p>Condition: ${desc}</p>
      <p>Wind: ${wind} m/s</p>
      <button id="logout">Log out</button>
    `
        document.getElementById('logout')
            .addEventListener('click', () => {
                localStorage.removeItem('token')
                location.hash = '/login'
            })

    } catch (err) {
        document.getElementById('weather').textContent = 'Error: ' + err.message
    }
}
