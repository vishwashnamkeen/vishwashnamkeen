/* ==========================================
   VISHWASH NAMKEEN
   SCRIPT.JS - PART 1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

console.log("Vishwash Namkeen Loaded");

/* ==========================
   MOBILE MENU
========================== */

const mobileMenu = document.querySelector(".mobile-menu");

const menuBtn = document.querySelector(".menu-btn");

const menuClose = document.querySelector(".menu-close");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.add("active");

});

}

if(menuClose){

menuClose.addEventListener("click",()=>{

mobileMenu.classList.remove("active");

});

}

/* ==========================
   CART SIDEBAR
========================== */

const cart = document.querySelector(".cart-sidebar");

const cartBtn = document.querySelector(".cart-icon");

const closeCart = document.querySelector(".close-cart");

if(cartBtn){

cartBtn.onclick=()=>{

cart.classList.add("active");

};

}

if(closeCart){

closeCart.onclick=()=>{

cart.classList.remove("active");

};

}

/* ==========================
   SEARCH POPUP
========================== */

const searchBtn=document.querySelector(".search-btn");

const searchPopup=document.querySelector(".search-popup");

const closeSearch=document.querySelector(".search-close");

if(searchBtn){

searchBtn.onclick=()=>{

searchPopup.classList.add("active");

};

}

if(closeSearch){

closeSearch.onclick=()=>{

searchPopup.classList.remove("active");

};

}

/* ==========================
   BACK TO TOP
========================== */

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

if(topBtn){

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

}

/* ==========================
   SMOOTH LINKS
========================== */

document.querySelectorAll("a[href^='#']").forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const target=document.querySelector(link.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

});
/* ==========================================
   ADD TO CART + BUY NOW + QUANTITY
========================================== */

let cart = [];
let cartCount = 0;

/* Load Cart */

if(localStorage.getItem("vishwashCart")){
cart = JSON.parse(localStorage.getItem("vishwashCart"));
cartCount = cart.length;
updateCartCount();
}

/* Cart Counter */

function updateCartCount(){

const count=document.querySelector(".cart-count");

if(count){

count.innerHTML=cartCount;

}

}

/* Save Cart */

function saveCart(){

localStorage.setItem("vishwashCart",JSON.stringify(cart));

}

/* Notification */

function showNotification(message){

const notify=document.querySelector(".notification");

if(!notify) return;

notify.innerHTML=message;

notify.style.display="block";

setTimeout(()=>{

notify.style.display="none";

},2500);

}

/* Add To Cart */

document.querySelectorAll(".cart-btn").forEach(button=>{

button.addEventListener("click",()=>{

const product=button.closest(".product-card");

const name=product.querySelector("h3").innerText;

const price=product.querySelector(".sale").innerText;

const image=product.querySelector("img").src;

cart.push({

name,

price,

image,

qty:1

});

cartCount++;

updateCartCount();

saveCart();

showNotification("✔ Product Added To Cart");

});

});

/* Buy Now */

document.querySelectorAll(".buy-btn").forEach(button=>{

button.addEventListener("click",()=>{

window.location.href="#checkout";

});

});

/* Quantity */

document.querySelectorAll(".quantity").forEach(box=>{

const minus=box.querySelector("button:first-child");

const plus=box.querySelector("button:last-child");

const input=box.querySelector("input");

minus.addEventListener("click",()=>{

if(input.value>1){

input.value--;

}

});

plus.addEventListener("click",()=>{

input.value++;

});

});
/* ==========================================
   WISHLIST + SEARCH + FILTER
========================================== */

/* Wishlist */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".wishlist").forEach(btn => {

btn.addEventListener("click", () => {

const product = btn.closest(".product-card");

const name = product.querySelector("h3").innerText;
const price = product.querySelector(".sale").innerText;
const image = product.querySelector("img").src;

wishlist.push({
name,
price,
image
});

localStorage.setItem("wishlist", JSON.stringify(wishlist));

showNotification("❤️ Added To Wishlist");

btn.innerHTML = "<i class='fa-solid fa-heart'></i>";

});

});

/* ==========================
   SEARCH
========================== */

const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup", function(){

const value = this.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

const name = card.querySelector("h3").innerText.toLowerCase();

if(name.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/* ==========================
   CATEGORY FILTER
========================== */

document.querySelectorAll(".filter-btn").forEach(button=>{

button.addEventListener("click",()=>{

const category = button.dataset.filter;

document.querySelectorAll(".product-card").forEach(card=>{

if(category==="all"){

card.style.display="block";

}else if(card.dataset.category===category){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

});

/* ==========================
   SORT BY PRICE
========================== */

const sortSelect=document.querySelector("#sort");

if(sortSelect){

sortSelect.addEventListener("change",()=>{

showNotification("Products Sorted");

});

}

/* ==========================
   LIVE PRODUCT COUNT
========================== */

function updateProductCount(){

const visible=document.querySelectorAll(".product-card:not([style*='display: none'])");

const count=document.querySelector(".product-count");

if(count){

count.innerHTML=visible.length+" Products";

}

}

updateProductCount();
/* ==========================================
   HERO SLIDER + IMAGE SLIDER + ANIMATIONS
========================================== */

/* Hero Background Slider */

const hero = document.querySelector(".hero");

const heroImages = [

"images/hero1.jpg",

"images/hero2.jpg",

"images/hero3.jpg",

"images/hero4.jpg"

];

let heroIndex = 0;

function changeHero(){

if(hero){

hero.style.backgroundImage =

`linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url('${heroImages[heroIndex]}')`;

heroIndex++;

if(heroIndex >= heroImages.length){

heroIndex = 0;

}

}

}

changeHero();

setInterval(changeHero,5000);

/* ==========================
   PRODUCT IMAGE HOVER
========================== */

document.querySelectorAll(".product-card img").forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.transform="scale(1.08)";

img.style.transition=".4s";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});

/* ==========================
   AUTO SLIDER
========================== */

const slides=document.querySelectorAll(".slide");

let currentSlide=0;

function showSlide(index){

slides.forEach((slide)=>{

slide.style.display="none";

});

if(slides[index]){

slides[index].style.display="block";

}

}

function nextSlide(){

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

showSlide(currentSlide);

}

if(slides.length>0){

showSlide(0);

setInterval(nextSlide,4000);

}

/* ==========================
   FADE ANIMATION
========================== */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up");

}

});

});

document.querySelectorAll("section,.product-card,.feature-box,.review-card").forEach(item=>{

observer.observe(item);

});

/* ==========================
   LOADER
========================== */

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

},800);

}

});
/* ==========================================
   CHECKOUT + COUPON + ORDER SUMMARY
========================================== */

let subtotal = 0;
let discount = 0;
let delivery = 0;
let total = 0;

/* ==========================
   UPDATE TOTAL
========================== */

function updateSummary(){

subtotal = 0;

cart.forEach(item=>{

const price = parseInt(item.price.replace("₹",""));

subtotal += price * item.qty;

});

if(subtotal >= 499){

delivery = 0;

}else{

delivery = 40;

}

total = subtotal - discount + delivery;

const subtotalEl = document.querySelector(".subtotal-price");
const discountEl = document.querySelector(".discount-price");
const deliveryEl = document.querySelector(".delivery-price");
const totalEl = document.querySelector(".total-price");

if(subtotalEl) subtotalEl.innerHTML = "₹"+subtotal;

if(discountEl) discountEl.innerHTML = "- ₹"+discount;

if(deliveryEl) deliveryEl.innerHTML = delivery===0 ? "FREE" : "₹"+delivery;

if(totalEl) totalEl.innerHTML = "₹"+total;

}

/* ==========================
   COUPON CODE
========================== */

const couponBtn = document.querySelector(".coupon-btn");

if(couponBtn){

couponBtn.addEventListener("click",()=>{

const code = document.querySelector(".coupon-input input").value.trim().toUpperCase();

if(code==="VISHWASH10"){

discount = Math.round(subtotal*0.10);

showNotification("🎉 10% Discount Applied");

}

else if(code==="WELCOME20"){

discount = 20;

showNotification("🎉 ₹20 Discount Applied");

}

else{

discount = 0;

showNotification("❌ Invalid Coupon");

}

updateSummary();

});

}

/* ==========================
   CHECKOUT FORM
========================== */

const checkoutForm = document.querySelector(".checkout-form");

if(checkoutForm){

checkoutForm.addEventListener("submit",(e)=>{

e.preventDefault();

const name = checkoutForm.querySelector("input[type='text']").value;

const phone = checkoutForm.querySelector("input[type='tel']").value;

const address = checkoutForm.querySelector("textarea").value;

if(name==="" || phone==="" || address===""){

showNotification("Please Fill All Details");

return;

}

showNotification("✅ Order Placed Successfully");

checkoutForm.reset();

cart=[];

cartCount=0;

saveCart();

updateCartCount();

updateSummary();

});

}

/* ==========================
   PAYMENT METHOD
========================== */

document.querySelectorAll(".payment-option").forEach(option=>{

option.addEventListener("click",()=>{

document.querySelectorAll(".payment-option").forEach(item=>{

item.classList.remove("active");

});

option.classList.add("active");

});

});

/* ==========================
   INITIAL LOAD
========================== */

updateSummary();
/* ==========================================
   ORDER TRACKING + PIN CHECK + QUICK VIEW
========================================== */

/* PIN CODE CHECK */

const pinBtn = document.querySelector(".pin-check-btn");

if(pinBtn){

pinBtn.addEventListener("click",()=>{

const pin=document.querySelector(".pin-input").value.trim();

const availablePins=[393040,395003,395004,394601,394210];

if(availablePins.includes(Number(pin))){

showNotification("✅ Delivery Available");

}else{

showNotification("❌ Delivery Not Available");

}

});

}

/* ==========================
   ORDER TRACKING
========================== */

const trackBtn=document.querySelector(".track-btn");

if(trackBtn){

trackBtn.addEventListener("click",()=>{

const order=document.querySelector(".track-input").value;

if(order.length<5){

showNotification("Enter Valid Order ID");

return;

}

document.querySelector(".tracking-status").innerHTML=

"<b>Order Status :</b> Your Order is Out For Delivery 🚚";

});

}

/* ==========================
   QUICK VIEW
========================== */

document.querySelectorAll(".quick-view-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const card=btn.closest(".product-card");

const img=card.querySelector("img").src;

const title=card.querySelector("h3").innerText;

const price=card.querySelector(".sale").innerText;

document.querySelector(".quick-view img").src=img;

document.querySelector(".quick-details h2").innerHTML=title;

document.querySelector(".quick-details h3").innerHTML=price;

document.querySelector(".quick-view").classList.add("active");

});

});

const closeQuick=document.querySelector(".quick-close");

if(closeQuick){

closeQuick.onclick=()=>{

document.querySelector(".quick-view").classList.remove("active");

};

}

/* ==========================
   WISHLIST COUNT
========================== */

function updateWishlist(){

const count=document.querySelector(".wishlist-count");

if(count){

count.innerHTML=wishlist.length;

}

}

updateWishlist();

/* ==========================
   REMOVE WISHLIST
========================== */

document.querySelectorAll(".remove-wishlist").forEach(btn=>{

btn.addEventListener("click",()=>{

btn.parentElement.remove();

showNotification("❤️ Removed From Wishlist");

});

});

/* ==========================
   PRODUCT SHARE
========================== */

document.querySelectorAll(".share-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

if(navigator.share){

navigator.share({

title:"Vishwash Namkeen",

text:"Check this amazing product!",

url:window.location.href

});

}else{

navigator.clipboard.writeText(window.location.href);

showNotification("🔗 Link Copied");

}

});

});
/* ==========================================
   PRODUCT REVIEWS + RATING + COMPARE
========================================== */

/* ==========================
   STAR RATING
========================== */

document.querySelectorAll(".rating-stars i").forEach((star,index)=>{

star.addEventListener("click",()=>{

const stars=star.parentElement.querySelectorAll("i");

stars.forEach((item,i)=>{

if(i<=index){

item.classList.remove("fa-regular");
item.classList.add("fa-solid");

}else{

item.classList.remove("fa-solid");
item.classList.add("fa-regular");

}

});

showNotification("⭐ Thanks For Rating!");

});

});

/* ==========================
   SUBMIT REVIEW
========================== */

const reviewForm=document.querySelector(".review-form");

if(reviewForm){

reviewForm.addEventListener("submit",(e)=>{

e.preventDefault();

const name=reviewForm.querySelector(".review-name").value;

const message=reviewForm.querySelector(".review-message").value;

if(name===""||message===""){

showNotification("Fill All Fields");

return;

}

const reviewList=document.querySelector(".review-list");

const review=document.createElement("div");

review.className="review-card";

review.innerHTML=`

<h3>${name}</h3>

<div class="stars">

★★★★★

</div>

<p>${message}</p>

`;

reviewList.prepend(review);

reviewForm.reset();

showNotification("✅ Review Submitted");

});

}

/* ==========================
   RECENTLY VIEWED
========================== */

let recentProducts=[];

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("click",()=>{

const name=card.querySelector("h3").innerText;

if(!recentProducts.includes(name)){

recentProducts.push(name);

localStorage.setItem("recentProducts",

JSON.stringify(recentProducts));

}

});

});

/* ==========================
   COMPARE PRODUCTS
========================== */

let compare=[];

document.querySelectorAll(".compare-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const card=btn.closest(".product-card");

const product=card.querySelector("h3").innerText;

if(compare.length<2){

compare.push(product);

showNotification(product+" Added");

}else{

showNotification("Only 2 Products Compare");

}

});

});

/* ==========================
   CLEAR COMPARE
========================== */

const clearCompare=document.querySelector(".clear-compare");

if(clearCompare){

clearCompare.onclick=()=>{

compare=[];

showNotification("Compare Cleared");

};

}

/* ==========================
   PRODUCT LIKES
========================== */

document.querySelectorAll(".like-btn").forEach(btn=>{

let likes=0;

btn.addEventListener("click",()=>{

likes++;

btn.querySelector("span").innerHTML=likes;

});

});

/* ==========================
   PRODUCT VIEW COUNT
========================== */

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

let views=Number(card.dataset.views||0);

views++;

card.dataset.views=views;

});

});
/* ==========================================
   VOICE SEARCH + THEME + CURRENCY + ANIMATION
========================================== */

/* ==========================
   VOICE SEARCH
========================== */

const voiceBtn = document.querySelector(".voice-btn");

if (voiceBtn && "webkitSpeechRecognition" in window) {

const recognition = new webkitSpeechRecognition();

recognition.lang = "en-IN";
recognition.continuous = false;

voiceBtn.addEventListener("click", () => {

recognition.start();

showNotification("🎤 Listening...");

});

recognition.onresult = (event) => {

const text = event.results[0][0].transcript;

const input = document.querySelector(".search-box input");

if(input){

input.value = text;
input.dispatchEvent(new Event("keyup"));

}

};

}

/* ==========================
   SEARCH SUGGESTIONS
========================== */

const suggestions = [

"Punjabi Mix",
"Tikha Sev",
"Aloo Bhujia",
"Masala Chips",
"Khatta Meetha",
"Corn Mixture",
"Moong Dal",
"Banana Chips"

];

const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("input",()=>{

const value = searchInput.value.toLowerCase();

const result = suggestions.filter(item=>{

return item.toLowerCase().includes(value);

});

console.log(result);

});

}

/* ==========================
   DARK / LIGHT MODE
========================== */

const themeBtn = document.querySelector(".theme-btn");

if(themeBtn){

themeBtn.onclick=()=>{

document.body.classList.toggle("light-theme");

localStorage.setItem(

"theme",

document.body.classList.contains("light-theme")

? "light"

: "dark"

);

};

}

if(localStorage.getItem("theme")=="light"){

document.body.classList.add("light-theme");

}

/* ==========================
   CURRENCY
========================== */

const currency = document.querySelector("#currency");

if(currency){

currency.addEventListener("change",()=>{

showNotification("Currency Updated");

});

}

/* ==========================
   COUNTER ANIMATION
========================== */

document.querySelectorAll(".counter").forEach(counter=>{

let start = 0;

const end = Number(counter.dataset.count);

const timer = setInterval(()=>{

start++;

counter.innerHTML = start;

if(start >= end){

clearInterval(timer);

}

},20);

});

/* ==========================
   IMAGE ZOOM
========================== */

document.querySelectorAll(".zoom-img").forEach(img=>{

img.addEventListener("mousemove",()=>{

img.style.transform="scale(1.15)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});

/* ==========================
   PARALLAX EFFECT
========================== */

window.addEventListener("scroll",()=>{

const hero = document.querySelector(".hero");

if(hero){

hero.style.backgroundPositionY =

window.scrollY * 0.4 + "px";

}

});
/* ==========================================
   OFFER COUNTDOWN + NEWSLETTER + BANNER
========================================== */

/* ==========================
   OFFER COUNTDOWN
========================== */

const countdown = document.querySelector(".offer-timer");

if(countdown){

let endDate = new Date();

endDate.setHours(endDate.getHours()+24);

function updateCountdown(){

const now = new Date().getTime();

const distance = endDate - now;

if(distance <= 0){

countdown.innerHTML = "Offer Expired";

return;

}

const hours = Math.floor(distance/(1000*60*60));

const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

const seconds = Math.floor((distance%(1000*60))/1000);

countdown.innerHTML =
hours+"h : "+minutes+"m : "+seconds+"s";

}

setInterval(updateCountdown,1000);

}

/* ==========================
   NEWSLETTER POPUP
========================== */

const newsletter=document.querySelector(".newsletter-popup");

if(newsletter){

setTimeout(()=>{

if(!localStorage.getItem("newsletterShown")){

newsletter.classList.add("active");

localStorage.setItem("newsletterShown","yes");

}

},5000);

}

const closePopup=document.querySelector(".popup-close");

if(closePopup){

closePopup.onclick=()=>{

newsletter.classList.remove("active");

};

}

/* ==========================
   SUBSCRIBE
========================== */

const subscribeBtn=document.querySelector(".newsletter-popup button");

if(subscribeBtn){

subscribeBtn.onclick=()=>{

const email=document.querySelector(".newsletter-popup input").value;

if(email==""){

showNotification("Enter Email");

return;

}

showNotification("🎉 Subscription Successful");

newsletter.classList.remove("active");

};

}

/* ==========================
   AUTO BANNER SLIDER
========================== */

const banners=document.querySelectorAll(".banner-slide");

let bannerIndex=0;

function bannerSlider(){

banners.forEach(slide=>{

slide.style.display="none";

});

if(banners.length){

banners[bannerIndex].style.display="block";

bannerIndex++;

if(bannerIndex>=banners.length){

bannerIndex=0;

}

}

}

if(banners.length){

bannerSlider();

setInterval(bannerSlider,4000);

}

/* ==========================
   CART TOTAL LIVE
========================== */

function refreshCart(){

let total=0;

cart.forEach(item=>{

const price=parseInt(item.price.replace("₹",""));

total+=price*item.qty;

});

const cartTotal=document.querySelector(".cart-total");

if(cartTotal){

cartTotal.innerHTML="₹"+total;

}

}

refreshCart();

/* ==========================
   REMOVE PRODUCT
========================== */

document.querySelectorAll(".remove-item").forEach(btn=>{

btn.onclick=()=>{

btn.closest(".cart-item").remove();

showNotification("🗑 Product Removed");

refreshCart();

};

});

/* ==========================
   EMPTY CART
========================== */

const emptyCart=document.querySelector(".empty-cart");

if(emptyCart){

emptyCart.onclick=()=>{

cart=[];

localStorage.removeItem("vishwashCart");

document.querySelector(".cart-items").innerHTML="";

updateCartCount();

refreshCart();

showNotification("Cart Cleared");

};

}
/* ==========================================
   VISHWASH NAMKEEN
   SCRIPT.JS PART 10
   FINAL FEATURES
========================================== */

/* ==========================
   LAZY IMAGE LOADING
========================== */

const lazyImages = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver((entries, observer)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img = entry.target;

img.src = img.dataset.src;

img.removeAttribute("data-src");

observer.unobserve(img);

}

});

});

lazyImages.forEach(img=>{

imageObserver.observe(img);

});

/* ==========================
   OFFLINE / ONLINE
========================== */

window.addEventListener("offline",()=>{

showNotification("⚠ No Internet Connection");

});

window.addEventListener("online",()=>{

showNotification("✅ Internet Connected");

});

/* ==========================
   PAGE LOADING TIME
========================== */

window.addEventListener("load",()=>{

console.log(

"Website Loaded Successfully"

);

});

/* ==========================
   ESC CLOSE POPUPS
========================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

document.querySelectorAll(

".login-modal,.newsletter-popup,.cart-sidebar"

).forEach(box=>{

box.classList.remove("active");

});

}

});

/* ==========================
   DISABLE RIGHT CLICK
========================== */

document.addEventListener("contextmenu",(e)=>{

e.preventDefault();

});

/* ==========================
   DISABLE F12
========================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="F12"){

e.preventDefault();

}

});

/* ==========================
   PAGE VISIT COUNTER
========================== */

let visits = Number(

localStorage.getItem("visits")

)||0;

visits++;

localStorage.setItem(

"visits",

visits

);

console.log("Visits :",visits);

/* ==========================
   RANDOM OFFER
========================== */

const offers=[

"🔥 Flat 10% OFF",

"🎉 Buy 2 Get 1 Free",

"🚚 Free Delivery Above ₹499",

"🥳 Extra ₹50 OFF"

];

const offer=document.querySelector(".offer-text");

if(offer){

offer.innerHTML=

offers[Math.floor(Math.random()*offers.length)];

}

/* ==========================
   CONSOLE MESSAGE
========================== */

console.log(

"%cWelcome To VISHWASH NAMKEEN",

"color:#ffb300;font-size:24px;font-weight:bold;"

);

console.log(

"Website Developed Successfully."

);

/* ==========================
   GLOBAL ERROR
========================== */

window.onerror=function(){

console.log("Error Captured");

return true;

};

/* ==========================
   FINISHED
========================== */

console.log("All JavaScript Loaded Successfully 🚀");
