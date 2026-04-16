(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();async function u(){const e=document.querySelector("header"),t=document.querySelector("footer");try{if(e){const n=await(await fetch("/partials/header.html")).text();e.innerHTML=n}if(t){console.log("FOOTER ELEMENT:",t);const n=await(await fetch("/partials/footer.html")).text();t.innerHTML=n}}catch(o){console.error("Error loading header/footer:",o)}}u();f();const p=document.getElementById("searchBtn");p.addEventListener("click",c);const m=document.getElementById("randomBtn");m.addEventListener("click",g);const h=document.getElementById("drinkBtn");h.addEventListener("click",y);document.getElementById("searchInput").addEventListener("keypress",e=>{e.key==="Enter"&&c()});async function f(){try{const t=await(await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")).json(),o=document.getElementById("categoryFilter");t.categories.forEach(n=>{const r=document.createElement("option");r.value=n.strCategory,r.textContent=n.strCategory,o.appendChild(r)})}catch(e){console.error("Error loading categories:",e)}}async function c(){const e=document.getElementById("results");e.innerHTML='<div class="loader"></div>';const t=document.getElementById("searchInput").value,o=document.getElementById("categoryFilter").value;if(!t&&!o){e.innerHTML="<p>⚠️ Enter ingredient or select category</p>";return}try{let n="";t?n=`https://www.themealdb.com/api/json/v1/1/filter.php?i=${t}`:n=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${o}`;const s=await(await fetch(n)).json();E(s.meals)}catch(n){console.error("Error fetching recipes:",n),e.innerHTML="<p>❌ Failed to load recipes. Try again.</p>"}}async function g(){const e=document.getElementById("results");e.innerHTML="<p>Loading random recipe...</p>";try{const n=(await(await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json()).meals[0];d(n)}catch(t){console.error("Error fetching random meal:",t),e.innerHTML="<p>❌ Failed to load random recipe.</p>"}}async function y(){const e=document.getElementById("results");e.innerHTML="<p>Loading drink...</p>";try{const n=(await(await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")).json()).drinks[0];v(n)}catch(t){console.error(t),e.innerHTML="<p>❌ Failed to load drink</p>"}}function v(e){const t=document.getElementById("results");t.innerHTML=`
    <div class="details-container">
      <h2>${e.strDrink}</h2>
      <img src="${e.strDrinkThumb}" />

      <h3>🥤 Instructions</h3>
      <p>${e.strInstructions}</p>

      <button id="backBtn">⬅ Back</button>
    </div>
  `,document.getElementById("backBtn").addEventListener("click",()=>{t.innerHTML=""})}function E(e){const t=document.getElementById("results");if(t.innerHTML="",!e){t.innerHTML="<p>😔 No recipes found. Try another search.</p>";return}e.forEach(o=>{const n=document.createElement("div");n.classList.add("favorite-card"),n.innerHTML=`
      <img src="${o.strMealThumb}" alt="${o.strMeal}" />
      <h3>${o.strMeal}</h3>
    `,n.addEventListener("click",()=>{w(o.idMeal)}),t.appendChild(n)})}async function w(e){try{const n=(await(await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)).json()).meals[0];d(n)}catch(t){console.error("Error fetching meal details:",t)}}function d(e){const t=document.getElementById("results");let o="<ul>";for(let i=1;i<=20;i++){const a=e[`strIngredient${i}`],l=e[`strMeasure${i}`];a&&a.trim()!==""&&(o+=`<li>${l} ${a}</li>`)}o+="</ul>";const n=e.strInstructions.split(/[\.\n]/).filter(i=>i.trim()!=="");let r="<ol>";n.forEach(i=>{r+=`<li>${i.trim()}</li>`}),r+="</ol>";let s="";e.strYoutube&&(s=`
      <h3>🎥 Cooking Video</h3>
      <iframe src="${`https://www.youtube.com/embed/${e.strYoutube.split("v=")[1]}`}" allowfullscreen></iframe>
    `),t.innerHTML=`
    <div class="details-container">

      <h2>${e.strMeal}</h2>
      <img src="${e.strMealThumb}" alt="${e.strMeal}" />

      <button id="saveBtn">❤️ Save to Favorites</button>

      <h3>🧂 Ingredients</h3>
      ${o}

      <h3>📖 Instructions</h3>
      ${r}

      ${s}

      <button id="backBtn">⬅ Back</button>
    </div>
  `,document.getElementById("saveBtn").addEventListener("click",()=>{M(e)}),document.getElementById("backBtn").addEventListener("click",()=>{c()})}function M(e){let t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.find(n=>n.idMeal===e.idMeal)){alert("Already in favorites");return}t.push({idMeal:e.idMeal,name:e.strMeal,image:e.strMealThumb}),localStorage.setItem("favorites",JSON.stringify(t)),alert("Saved to favorites ❤️")}
