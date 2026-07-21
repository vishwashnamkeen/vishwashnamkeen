// =====================
// VISHWASH NAMKEEN
// script.js
// =====================

// Banner Slider
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    if (slides.length > 0) {
        slides[slideIndex - 1].classList.add("active");
    }

    setTimeout(showSlides, 3000);
}

showSlides();
let cart=[];
// ===============================


}

// ======================
// SEARCH PRODUCTS
// ======================

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

let text=card.innerText.toLowerCase();

card.style.display=text.includes(value)
?"block":"none";

});

});

}

// ======================
// MOBILE MENU
// ======================

const menu=document.querySelector(".menu-btn");
const nav=document.querySelector("nav");

if(menu && nav){

menu.onclick=()=>{

nav.classList.toggle("show");

};

}

// ======================
// BACK TO TOP
// ======================

const topBtn=document.getElementById("topBtn");

window.onscroll=function(){

if(topBtn){

if(document.documentElement.scrollTop>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

}

};

if(topBtn){

topBtn.onclick=function(){

window.scrollTo({
top:0,
behavior:"smooth"
});

};

}

// ======================
// WEBSITE LOADED
// ======================

console.log("Vishwash Namkeen Website Ready");

function orderNow(product) {
    let qty = prompt("Kitne Packet Chahiye?");

    if (qty && qty > 0) {
        let message =
`Hello Vishwash Namkeen,

Mujhe order karna hai.

Product: ${product}
Quantity: ${qty} Packet`;

        let url = "https://wa.me/918460183525?text=" + encodeURIComponent(message);
        window.open(url, "_blank");
    }
}
let cart = [];

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    updateCart();
}

function updateCart() {
    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        html += `
        <div class="cart-item">
            <b>${item.name}</b><br>

            <button onclick="changeQty(${index},-1)">-</button>

            ${item.qty}

            <button onclick="changeQty(${index},1)">+</button>

            ₹${item.price * item.qty}

            <button onclick="removeItem(${index})">❌</button>
        </div><hr>
        `;
    });

    document.getElementById("cartItems").innerHTML = html;
    document.getElementById("cartTotal").innerHTML = "₹ " + total;
}



// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(product, price, qtyId) {

    let quantityInput = document.getElementById(qtyId);

    let quantity = 1;

    if (quantityInput) {
        quantity = parseInt(quantityInput.value) || 1;
    }

    // Check if product already exists
    let existingProduct = cart.find(
        item => item.name === product
    );

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            name: product,
            price: Number(price),
            quantity: quantity
        });

    }

    updateCart();

    // Scroll to cart
    let cartSection = document.getElementById("shopping-cart");

    if (cartSection) {
        cartSection.scrollIntoView({
            behavior: "smooth"
        });
    }
