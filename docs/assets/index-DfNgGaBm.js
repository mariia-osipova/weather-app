(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function d(){const i=document.getElementById("app");i.innerHTML=`
    <h1>Login</h1>
    <form id="login-form">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Log In</button>
      <p id="error" style="color: red;"></p>
    </form>
  `,document.getElementById("login-form").addEventListener("submit",async o=>{o.preventDefault();const r=o.target.email.value,n=o.target.password.value;try{const e=await fetch("https://reqres.in/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,password:n})}),t=await e.json();if(e.ok)localStorage.setItem("token",t.token),location.hash="/weather";else throw new Error(t.error||"Login failed")}catch(e){document.getElementById("error").textContent=e.message}})}const c="eea92242ad2dd1114373984a18555b58";async function l(){if(!localStorage.getItem("token")){location.hash="/login";return}const o=document.getElementById("app");o.innerHTML=`
    <h1>Current Weather in Moscow</h1>
    <div id="weather">Loading...</div>
  `;try{const r=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=en&appid=${c}`),n=await r.json();if(!r.ok)throw new Error(n.message);const{temp:e}=n.main,t=n.weather[0].description,a=n.wind.speed;document.getElementById("weather").innerHTML=`
      <p>Temperature: ${e.toFixed(1)} °C</p>
      <p>Condition: ${t}</p>
      <p>Wind: ${a} m/s</p>
      <button id="logout">Log out</button>
    `,document.getElementById("logout").addEventListener("click",()=>{localStorage.removeItem("token"),location.hash="/login"})}catch(r){document.getElementById("weather").textContent="Error: "+r.message}}function s(){const i=location.hash.replace("#","")||"/login";i==="/login"?d():i==="/weather"?l():location.hash="/login"}window.addEventListener("hashchange",s);window.addEventListener("DOMContentLoaded",s);
