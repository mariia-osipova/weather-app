export function renderLogin() {
    const app = document.getElementById('app')
    app.innerHTML = `
    <h1>Login</h1>
    <form id="login-form">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Log In</button>
      <p id="error" style="color: red;"></p>
    </form>
  `
    document.getElementById('login-form')
        .addEventListener('submit', async e => {
            e.preventDefault()
            const email = e.target.email.value
            const password = e.target.password.value
            try {
                const res = await fetch('https://reqres.in/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })
                const data = await res.json()
                if (res.ok) {
                    localStorage.setItem('token', data.token)
                    location.hash = '/weather'
                } else {
                    throw new Error(data.error || 'Login failed')
                }
            } catch (err) {
                document.getElementById('error').textContent = err.message
            }
        })
}
