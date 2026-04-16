export async function loadHeaderFooter() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  try {
    if (header) {
      const res = await fetch('/Final-Project-Recipe-Finder/partials/header.html'); 
      const data = await res.text();
      header.innerHTML = data;
    }

    if (footer) {
       console.log("FOOTER ELEMENT:", footer); 
      const res = await fetch('/Final-Project-Recipe-Finder/partials/footer.html'); 
      const data = await res.text();
      footer.innerHTML = data;

    }

  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}