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

// Cart Variables
let totalItems = 0;
let totalPrice = 0;

// Add To Cart
function addToCart(product, price, qtyId) {

    let qty = parseInt(document.getElementById(qtyId).value);

    if (isNaN(qty) || qty < 1) {
        qty = 1;
    }

    totalItems += qty;
    totalPrice += qty * price;

    document.getElementById("totalItems").innerText = totalItems;
    document.getElementById("totalPrice").innerText = totalPrice;

    alert(
        qty +
        " x " +
        product +
        " Added To Cart"
    );

}
// ======================
// BUY NOW FUNCTION
// ======================

function buyNow() {

    if (totalItems === 0) {
        alert("Please Add Product To Cart");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const upi = document.getElementById("upiid").value.trim();

    if (name === "") {
        alert("Enter Your Name");
        return;
    }

    if (mobile.length != 10) {
        alert("Enter Valid Mobile Number");
        return;
    }

    if (address === "") {
        alert("Enter Address");
        return;
    }

    if (pincode.length != 6) {
        alert("Enter Valid Pincode");
        return;
    }

    if (upi === "") {
        alert("Enter UPI ID");
        return;
    }

    let payURL =
        "upi://pay?pa=" +
        upi +
        "&pn=Vishwash Namkeen&am=" +
        totalPrice +
        "&cu=INR";

    window.location.href = payURL;

    alert(
        "Order Placed Successfully!\n\n" +
        "Customer : " + name +
        "\nTotal : ₹" + totalPrice
    );

}

// ======================
// SMOOTH SCROLL
// ======================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior:"smooth"
        });

    });

});
// ======================
// AUTO PRODUCT SLIDER
// ======================

const productSlider = document.querySelector(".product-slider");

if (productSlider) {

setInterval(() => {

productSlider.scrollBy({
left:300,
behavior:"smooth"
});

if (
productSlider.scrollLeft +
productSlider.clientWidth >=
productSlider.scrollWidth - 10
){

productSlider.scrollTo({
left:0,
behavior:"smooth"
});

}

},3000);

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
