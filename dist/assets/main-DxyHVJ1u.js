import{l as u}from"./utils-7NcZ-LKH.js";u();g();const p=document.getElementById("searchBtn");p.addEventListener("click",c);const m=document.getElementById("randomBtn");m.addEventListener("click",f);const h=document.getElementById("drinkBtn");h.addEventListener("click",v);document.getElementById("searchInput").addEventListener("keypress",e=>{e.key==="Enter"&&c()});async function g(){try{const t=await(await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")).json(),r=document.getElementById("categoryFilter");t.categories.forEach(n=>{const o=document.createElement("option");o.value=n.strCategory,o.textContent=n.strCategory,r.appendChild(o)})}catch(e){console.error("Error loading categories:",e)}}async function c(){const e=document.getElementById("results");e.innerHTML='<div class="loader"></div>';const t=document.getElementById("searchInput").value,r=document.getElementById("categoryFilter").value;if(!t&&!r){e.innerHTML="<p>⚠️ Enter ingredient or select category</p>";return}try{let n="";t?n=`https://www.themealdb.com/api/json/v1/1/filter.php?i=${t}`:n=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${r}`;const i=await(await fetch(n)).json();E(i.meals)}catch(n){console.error("Error fetching recipes:",n),e.innerHTML="<p>❌ Failed to load recipes. Try again.</p>"}}async function f(){const e=document.getElementById("results");e.innerHTML="<p>Loading random recipe...</p>";try{const n=(await(await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json()).meals[0];d(n)}catch(t){console.error("Error fetching random meal:",t),e.innerHTML="<p>❌ Failed to load random recipe.</p>"}}async function v(){const e=document.getElementById("results");e.innerHTML="<p>Loading drink...</p>";try{const n=(await(await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")).json()).drinks[0];y(n)}catch(t){console.error(t),e.innerHTML="<p>❌ Failed to load drink</p>"}}function y(e){const t=document.getElementById("results");t.innerHTML=`
    <div class="details-container">
      <h2>${e.strDrink}</h2>
      <img src="${e.strDrinkThumb}" />

      <h3>🥤 Instructions</h3>
      <p>${e.strInstructions}</p>

      <button id="backBtn">⬅ Back</button>
    </div>
  `,document.getElementById("backBtn").addEventListener("click",()=>{t.innerHTML=""})}function E(e){const t=document.getElementById("results");if(t.innerHTML="",!e){t.innerHTML="<p>😔 No recipes found. Try another search.</p>";return}e.forEach(r=>{const n=document.createElement("div");n.classList.add("favorite-card"),n.innerHTML=`
      <img src="${r.strMealThumb}" alt="${r.strMeal}" />
      <h3>${r.strMeal}</h3>
    `,n.addEventListener("click",()=>{w(r.idMeal)}),t.appendChild(n)})}async function w(e){try{const n=(await(await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)).json()).meals[0];d(n)}catch(t){console.error("Error fetching meal details:",t)}}function d(e){const t=document.getElementById("results");let r="<ul>";for(let s=1;s<=20;s++){const a=e[`strIngredient${s}`],l=e[`strMeasure${s}`];a&&a.trim()!==""&&(r+=`<li>${l} ${a}</li>`)}r+="</ul>";const n=e.strInstructions.split(/[\.\n]/).filter(s=>s.trim()!=="");let o="<ol>";n.forEach(s=>{o+=`<li>${s.trim()}</li>`}),o+="</ol>";let i="";e.strYoutube&&(i=`
      <h3>🎥 Cooking Video</h3>
      <iframe src="${`https://www.youtube.com/embed/${e.strYoutube.split("v=")[1]}`}" allowfullscreen></iframe>
    `),t.innerHTML=`
    <div class="details-container">

      <h2>${e.strMeal}</h2>
      <img src="${e.strMealThumb}" alt="${e.strMeal}" />

      <button id="saveBtn">❤️ Save to Favorites</button>

      <h3>🧂 Ingredients</h3>
      ${r}

      <h3>📖 Instructions</h3>
      ${o}

      ${i}

      <button id="backBtn">⬅ Back</button>
    </div>
  `,document.getElementById("saveBtn").addEventListener("click",()=>{M(e)}),document.getElementById("backBtn").addEventListener("click",()=>{c()})}function M(e){let t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.find(n=>n.idMeal===e.idMeal)){alert("Already in favorites");return}t.push({idMeal:e.idMeal,name:e.strMeal,image:e.strMealThumb}),localStorage.setItem("favorites",JSON.stringify(t)),alert("Saved to favorites ❤️")}
