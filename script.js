// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
  menuBtn.onclick = () => {
    navbar.classList.toggle("show");
  };
}

// Hero Banner Slider
const banners = ["banner1.jpg", "banner2.jpg"];
const heroImg = document.querySelector(".hero-image img");

if (heroImg) {
  let i = 0;
  setInterval(() => {
    i = (i + 1) % banners.length;
    heroImg.src = banners[i];
  }, 3000);
}

// Product Slider
const slider = document.querySelector(".product-slider");

if (slider) {
  setInterval(() => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    } else {
      slider.scrollBy({
        left: 320,
        behavior: "smooth"
      });
    }
  }, 3000);
}

// Product Search
const search = document.getElementById("search");

if (search) {
  search.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach(card => {
      card.style.display =
        card.innerText.toLowerCase().includes(value)
          ? "block"
          : "none";
    });
  });
}

// Buy Now Button
document.querySelectorAll(".buy-btn").forEach(btn => {

  btn.onclick = () => {

    const qty = prompt("Enter Quantity", "1");

    if (!qty) return;

    const address = prompt("Enter Full Address");

    if (!address) return;

    const pincode = prompt("Enter Pincode");

    if (!pincode) return;

    const total = Number(qty) * 120;

    const upi = "8460183525@ibl";

    window.location.href =
      "upi://pay?pa=" +
      upi +
      "&pn=Vishwash Namkeen&am=" +
      total +
      "&cu=INR";

  };

});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.onclick = function (e) {

    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });

  };

});

// Current Year
const year = document.getElementById("year");

if (year) {
  year.innerHTML = new Date().getFullYear();
}

console.log("Vishwash Namkeen Website Loaded");
