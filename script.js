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
function openCart() {
    document.getElementById("cartDrawer").classList.add("active");
}

function closeCart() {
    document.getElementById("cartDrawer").classList.remove("active");
}
openCart();
let selectedProduct="";
let selectedPrice=0;
let popupQty=1;

function buyNow(product,price){

selectedProduct=product;
selectedPrice=price;
popupQty=1;

document.getElementById("popupProduct").innerText=product;
document.getElementById("popupPrice").innerText=price;
document.getElementById("popupQty").innerText=popupQty;

document.getElementById("buyPopup").style.display="flex";
}

function closePopup(){
document.getElementById("buyPopup").style.display="none";
}

function changePopupQty(val){

popupQty+=val;

if(popupQty<1) popupQty=1;

document.getElementById("popupQty").innerText=popupQty;
}

function confirmBuy(){

let total=selectedPrice*popupQty;

let message=
`Hello Vishwash Namkeen,

Product: ${selectedProduct}
Price: ₹${selectedPrice}
Quantity: ${popupQty}
Total: ₹${total}`;

window.open(
"https://wa.me/918460183525?text="+encodeURIComponent(message),
"_blank"
);

closePopup();
}
