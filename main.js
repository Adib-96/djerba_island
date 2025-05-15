const btn = document.getElementById("backToTop");
const whats_call = document.querySelectorAll("#whats_call");
const menuList = document.getElementById("menu_list");
const hamburger = document.querySelector('.hamburger');
let clicked = false; // Use `let`, not `const`

// Show/hide back to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

// Scroll to top on button click
btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// WhatsApp call link
whats_call.forEach((el) => {
  el.addEventListener("click", () => {
    window.open("https://wa.me/21656533818");
  });
});

// Toggle menu
menuList.addEventListener("click", (e) => {
  const existingMenu = document.querySelector(".phone_menu");

  if (existingMenu) {
    existingMenu.remove();
    clicked = false;
  } else {
    clicked = true;
    const containerList = document.createElement('div');
    containerList.className = "phone_menu";

    const list = `
      <ul>
        <li><a href="#Accueil">Accueil</a></li>
        <li><a href="#À propos">À propos</a></li>
        <li><a href="#Excursions">Excursions</a></li>
        <li><a href="#Galerie">Galerie</a></li>
      </ul>
    `;

    containerList.innerHTML = list;
    containerList.style.position = "absolute";
    hamburger.appendChild(containerList);
  }
});
