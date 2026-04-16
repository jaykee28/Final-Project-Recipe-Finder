import{l as i}from"./utils-DWrwBPhd.js";i();const a=document.getElementById("favorites");let r=JSON.parse(localStorage.getItem("favorites"))||[];r.length===0?a.innerHTML="<p>No favorites yet 😔</p>":r.forEach(t=>{const e=document.createElement("div");e.classList.add("favorite-card"),e.innerHTML=`
      <img src="${t.image}" alt="${t.name}" />
      <h3>${t.name}</h3>
      <button class="remove-btn" data-id="${t.idMeal}">❌ Remove</button>
    `,e.querySelector(".remove-btn").addEventListener("click",o=>{o.stopPropagation(),n(t.idMeal),e.remove()}),a.appendChild(e)});function n(t){let e=JSON.parse(localStorage.getItem("favorites"))||[];e=e.filter(o=>o.idMeal!==t),localStorage.setItem("favorites",JSON.stringify(e))}
