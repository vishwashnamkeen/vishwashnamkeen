// ===== Vishwas Namkeen =====

// Image Slider
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slides");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }

    setTimeout(showSlides, 3000);
}

// Product Search
function searchProduct() {

    let input = document.getElementById("searchInput").value.toUpperCase();

    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {

        let title = cards[i].getElementsByTagName("h3")[0];

        if (title.innerHTML.toUpperCase().indexOf(input) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }

    }
}
// ===== Shopping Cart =====

let cart = [];
let total = 0;

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();
}

function updateCart() {

    let cartItems = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");

    if (!cartItems || !totalBox) return;

    cartItems.innerHTML = "";
    total = 0;

    cart.forEach(function(item, index){

        total += item.price;

        cartItems.innerHTML += `
        <div style="margin-bottom:10px;padding:10px;border-bottom:1px solid #ddd;">
            <b>${item.name}</b><br>
            ₹${item.price}
            <br><br>
            <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;

    });

    totalBox.innerHTML = "₹" + total;
}

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

function checkout(){

    if(cart.length==0){

        alert("Your cart is empty!");

        return;

    }

    let message="Hello Vishwas Namkeen,%0A%0AI want to order:%0A";

    cart.forEach(function(item){

        message += item.name + " - ₹" + item.price + "%0A";

    });

    message += "%0ATotal = ₹" + total;

    window.open("https://wa.me/918460183525?text=" + message);

}// ===== Quantity, Coupon, Dark Mode & Back To Top =====

let discount = 0;

// Coupon Code
function applyCoupon() {

    let code = document.getElementById("coupon").value.toUpperCase();

    if (code === "VISHWAS10") {
        discount = 10;
        alert("10% Discount Applied");
    } else if (code === "NAMKEEN20") {
        discount = 20;
        alert("20% Discount Applied");
    } else {
        discount = 0;
        alert("Invalid Coupon");
    }

    updateCart();
}

// Dark Mode
function darkMode() {
    document.body.classList.toggle("dark");
}

// Back To Top Button
let topBtn = document.getElementById("topBtn");

window.onscroll = function () {

    if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
    ) {
        if (topBtn) topBtn.style.display = "block";
    } else {
        if (topBtn) topBtn.style.display = "none";
    }

};

function topFunction() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
// ===== Quantity + GST + Delivery + WhatsApp Checkout =====

const GST = 0.05;
const DELIVERY = 40;

// Quantity Increase
function increaseQty(index) {
    cart[index].qty = (cart[index].qty || 1) + 1;
    updateCart();
}

// Quantity Decrease
function decreaseQty(index) {
    cart[index].qty = (cart[index].qty || 1) - 1;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// Update Cart
function updateCart() {

    let cartItems = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");

    if (!cartItems || !totalBox) return;

    cartItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach(function(item, index) {

        let qty = item.qty || 1;
        subtotal += item.price * qty;

        cartItems.innerHTML += `
        <div style="border-bottom:1px solid #ddd;padding:10px;">
            <b>${item.name}</b><br>
            ₹${item.price} × ${qty}<br><br>

            <button onclick="increaseQty(${index})">+</button>

            <button onclick="decreaseQty(${index})">-</button>

            <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    });

    let gst = subtotal * GST;
    let discountAmount = subtotal * (discount / 100);
    let finalTotal = subtotal + gst + DELIVERY - discountAmount;

    total = finalTotal;

    totalBox.innerHTML = `
        Subtotal : ₹${subtotal}<br>
        Discount : ₹${discountAmount.toFixed(2)}<br>
        GST : ₹${gst.toFixed(2)}<br>
        Delivery : ₹${DELIVERY}<br><hr>
        <b>Total : ₹${finalTotal.toFixed(2)}</b>
    `;
}

// WhatsApp Checkout
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "🛒 Vishwas Namkeen Order%0A%0A";

    cart.forEach(function(item) {

        let qty = item.qty || 1;

        message += `${item.name} × ${qty} = ₹${item.price * qty}%0A`;

    });

    message += `%0A📞 Customer Order`;
    message += `%0ATotal = ₹${total.toFixed(2)}`;

    alert("🎉 Order Placed Successfully!");

    window.open(
        "https://wa.me/918460183525?text=" + message,
        "_blank"
    );
}
function copyUPI(){

navigator.clipboard.writeText("n92066158@oksbi");

alert("UPI ID Copied!");

}
(addToCart() aur PlaceOrder(),
