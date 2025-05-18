(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function c(){const i=document.getElementById("app");i.innerHTML=`
    <h1>Login</h1>
    <form id="login-form">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Log In</button>
      <p id="error" style="color: red;"></p>
    </form>
  `,document.getElementById("login-form").addEventListener("submit",async o=>{o.preventDefault();const n=o.target.email.value,r=o.target.password.value;try{const e=await fetch("https://reqres.in/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:r})}),t=await e.json();if(e.ok)localStorage.setItem("token",t.token),location.hash="/weather";else throw new Error(t.error||"Login failed")}catch(e){document.getElementById("error").textContent=e.message}})}async function d(){if(!localStorage.getItem("token")){location.hash="/login";return}const o="eea92242ad2dd1114373984a18555b58",n=document.getElementById("app");n.innerHTML=`
    <h1>Current Weather in Moscow</h1>
    <div id="weather">Loading…</div>
  `;try{const r=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=en&appid=${o}`),e=await r.json();if(!r.ok)throw new Error(e.message);n.querySelector("#weather").innerHTML=`
      <p>Temperature: ${e.main.temp.toFixed(1)} °C</p>
      <p>Condition: ${e.weather[0].description}</p>
      <p>Wind: ${e.wind.speed} m/s</p>
      <button id="logout">Log out</button>
    `,document.getElementById("logout").onclick=()=>{localStorage.removeItem("token"),location.hash="/login"}}catch(r){n.querySelector("#weather").textContent="Error: "+r.message}}function s(){const i=location.hash.replace("#","")||"/login";i==="/login"?c():i==="/weather"?d():location.hash="/login"}window.addEventListener("hashchange",s);window.addEventListener("DOMContentLoaded",s);
