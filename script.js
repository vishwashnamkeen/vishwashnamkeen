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
// =========================
// SHOPPING CART
// =========================

let cart = [];

// Add To Cart
function addToCart(name, price) {

    let item = cart.find(product => product.name === name);

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

// Update Cart
function updateCart() {

    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");
    let totalItems = document.getElementById("totalItems");

    let html = "";
    let total = 0;
    let items = 0;

    if(cart.length==0){
        cartItems.innerHTML="<p>Your Cart is Empty</p>";
        cartTotal.innerHTML="0";
        totalItems.innerHTML="0";
        return;
    }

    cart.forEach((item,index)=>{

        total += item.price * item.qty;
        items += item.qty;

        html += `
        <div class="cart-item">

            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>

            <div>

                <button onclick="changeQty(${index},-1)">-</button>

                <span>${item.qty}</span>

                <button onclick="changeQty(${index},1)">+</button>

            </div>

            <strong>₹${item.price*item.qty}</strong>

            <button onclick="removeItem(${index})">
            ❌
            </button>

        </div>
        `;
    });

    cartItems.innerHTML = html;
    cartTotal.innerHTML = total;
    totalItems.innerHTML = items;
}

// Quantity
function changeQty(index,value){

    cart[index].qty += value;

    if(cart[index].qty<=0){
        cart.splice(index,1);
    }

    updateCart();
}

// Remove Product
function removeItem(index){

    cart.splice(index,1);

    updateCart();
}

// Checkout
function checkout(){

    if(cart.length==0){
        alert("Cart is Empty");
        return;
    }

    alert("Proceeding To Checkout");
}
