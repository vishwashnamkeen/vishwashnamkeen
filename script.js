/* ===========================
   VISHWAS NAMKEEN
   SCRIPT.JS PART 1
=========================== */

let cart = [];
let total = 0;

/* Elements */

const cartBox = document.getElementById("cartBox");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("total");
const cartCount = document.getElementById("cartCount");

/* Open Cart */

function openCart(){

cartBox.style.right="0";

}

/* Close Cart */

function closeCart(){

cartBox.style.right="-420px";

}

/* Add To Cart */

document.querySelectorAll(".cart").forEach(function(button){

button.addEventListener("click",function(){

let card=this.closest(".card");

let name=card.querySelector("h3").innerText;

let price=parseInt(card.querySelector("h4").innerText.replace(/[^\d]/g,""));

let found=cart.find(item=>item.name===name);

if(found){

found.qty++;

}else{

cart.push({

name:name,

price:price,

qty:1

});

}

updateCart();

showNotification(name+" Added To Cart");

});

});

/* Update Cart */

function updateCart(){

cartItems.innerHTML="";

total=0;

let count=0;

cart.forEach(function(item,index){

count+=item.qty;

total+=item.price*item.qty;

cartItems.innerHTML+=`

<div class="item">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<div class="qty">

<button onclick="minus(${index})">-</button>

<span>${item.qty}</span>

<button onclick="plus(${index})">+</button>

</div>

</div>

`;

});

totalPrice.innerHTML=total;

cartCount.innerHTML=count;

}

/* Notification */

function showNotification(message){

let notify=document.getElementById("notify");

if(notify){

notify.innerHTML=message;

notify.style.right="20px";

setTimeout(function(){

notify.style.right="-350px";

},2500);

}

}
/* ===========================
   SCRIPT.JS PART 2
   Quantity + Buy Now
=========================== */

/* Increase Quantity */

function plus(index){

cart[index].qty++;

updateCart();

updateCheckout();

}

/* Decrease Quantity */

function minus(index){

if(cart[index].qty>1){

cart[index].qty--;

}else{

cart.splice(index,1);

}

updateCart();

updateCheckout();

}

/* Update Checkout */

function updateCheckout(){

let items=0;

let amount=0;

cart.forEach(function(item){

items+=item.qty;

amount+=item.price*item.qty;

});

let totalItems=document.getElementById("totalItems");

let checkoutTotal=document.getElementById("checkoutTotal");

if(totalItems){

totalItems.innerHTML=items;

}

if(checkoutTotal){

checkoutTotal.innerHTML=amount;

}

}

/* Buy Now */

const buyButton=document.getElementById("buyNow");

if(buyButton){

buyButton.addEventListener("click",function(){

if(cart.length===0){

alert("Your cart is empty!");

return;

}

let success=document.getElementById("success");

if(success){

success.style.display="flex";

}

cart=[];

updateCart();

updateCheckout();

});

}

/* Close Success Popup */

function closeSuccess(){

let success=document.getElementById("success");

if(success){

success.style.display="none";

}

}

/* Clear Cart */

function clearCart(){

cart=[];

updateCart();

updateCheckout();

}

/* Open Cart Button */

const cartIcon=document.querySelector(".cart-fixed");

if(cartIcon){

cartIcon.addEventListener("click",openCart);

}

/* ESC Key Close Cart */

document.addEventListener("keydown",function(e){

if(e.key==="Escape"){

closeCart();

}

});
/* ===========================
   SCRIPT.JS PART 3
   Search + Wishlist + Coupon
=========================== */

/* ---------- SEARCH ---------- */

const searchBox = document.getElementById("searchBox");

if(searchBox){

searchBox.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".card").forEach(function(card){

let text=card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/* ---------- WISHLIST ---------- */

let wishlist=[];

document.querySelectorAll(".wishlistBtn").forEach(function(btn){

btn.addEventListener("click",function(){

let card=this.closest(".card");

let product=card.querySelector("h3").innerText;

if(!wishlist.includes(product)){

wishlist.push(product);

showNotification(product+" Added To Wishlist ❤️");

}else{

showNotification("Already In Wishlist");

}

});

});

/* ---------- COUPON ---------- */

function applyCoupon(){

let code=document.getElementById("couponCode").value.trim().toUpperCase();

let result=document.getElementById("couponResult");

if(code==="VISHWAS10"){

result.innerHTML="✅ 10% Discount Applied";

result.style.color="lime";

}else{

result.innerHTML="❌ Invalid Coupon";

result.style.color="red";

}

}

/* ---------- ORDER TRACK ---------- */

function trackOrder(){

let id=document.getElementById("trackId").value.trim();

let status=document.getElementById("trackStatus");

if(id==="VN1001"){

status.innerHTML="🚚 Order Packed";

status.style.color="orange";

}

else if(id==="VN1002"){

status.innerHTML="🚛 Out For Delivery";

status.style.color="yellow";

}

else if(id==="VN1003"){

status.innerHTML="✅ Delivered Successfully";

status.style.color="lime";

}

else{

status.innerHTML="❌ Order Not Found";

status.style.color="red";

}

}
/* ===========================
   SCRIPT.JS PART 4
   Login + Dark Mode + Slider
=========================== */

/* ---------- LOGIN ---------- */

function openLogin(){

const popup=document.getElementById("loginPopup");

if(popup){

popup.style.display="flex";

}

}

function closeLogin(){

const popup=document.getElementById("loginPopup");

if(popup){

popup.style.display="none";

}

}

function login(){

let name=document.getElementById("loginName").value.trim();

if(name===""){

alert("Please Enter Your Name");

return;

}

let user=document.getElementById("userName");

if(user){

user.innerHTML=name;

}

alert("Login Successful");

closeLogin();

}

/* ---------- REGISTER ---------- */

function openRegister(){

const popup=document.getElementById("registerPopup");

if(popup){

popup.style.display="flex";

}

}

function closeRegister(){

const popup=document.getElementById("registerPopup");

if(popup){

popup.style.display="none";

}

}

function registerUser(){

alert("Registration Successful");

closeRegister();

}

/* ---------- DARK MODE ---------- */

let darkMode=true;

function toggleTheme(){

darkMode=!darkMode;

if(darkMode){

document.body.style.background="#080808";

document.body.style.color="#ffffff";

}else{

document.body.style.background="#ffffff";

document.body.style.color="#000000";

}

}

/* ---------- HERO AUTO SLIDER ---------- */

const heroImages=[

"HERO.PNG",

"BHAKARWADI.PNG",

"BINGOMASALA.PNG",

"BINGOPANIPURI.PNG",

"MASALABANANAWEFER.PNG",

"METHIPURI.PNG",

"NADIYADIMIX.PNG",

"PUNJABIMIX.PNG"

];

let heroIndex=0;

setInterval(function(){

const hero=document.getElementById("heroImage");

if(hero){

heroIndex++;

if(heroIndex>=heroImages.length){

heroIndex=0;

}

hero.src=heroImages[heroIndex];

}

},3000);

/* ---------- BACK TO TOP ---------- */

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",function(){

if(!topBtn) return;

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

function goTop(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}
/* ==========================================
   VISHWAS NAMKEEN
   SCRIPT.JS PART 5
   Premium Effects
========================================== */

/* ---------- PAGE LOADER ---------- */

window.addEventListener("load",function(){

const loader=document.getElementById("loader");

if(loader){

setTimeout(function(){

loader.style.opacity="0";

setTimeout(function(){

loader.style.display="none";

},500);

},1200);

}

});

/* ---------- IMAGE HOVER ZOOM ---------- */

document.querySelectorAll(".card img").forEach(function(img){

img.addEventListener("mouseenter",function(){

this.style.transform="scale(1.08)";

this.style.transition=".4s";

});

img.addEventListener("mouseleave",function(){

this.style.transform="scale(1)";

});

});

/* ---------- REVIEW SLIDER ---------- */

let review=0;

const reviews=document.querySelectorAll(".review-card");

function reviewSlider(){

if(reviews.length==0) return;

reviews.forEach(function(card){

card.style.display="none";

});

reviews[review].style.display="block";

review++;

if(review>=reviews.length){

review=0;

}

}

setInterval(reviewSlider,3000);

reviewSlider();

/* ---------- GALLERY EFFECT ---------- */

document.querySelectorAll(".gallery img").forEach(function(image){

image.addEventListener("click",function(){

this.style.transform="scale(1.15)";

setTimeout(()=>{

this.style.transform="scale(1)";

},500);

});

});

/* ---------- BUTTON RIPPLE ---------- */

document.querySelectorAll("button").forEach(function(btn){

btn.addEventListener("click",function(e){

let ripple=document.createElement("span");

ripple.className="ripple";

ripple.style.left=e.offsetX+"px";

ripple.style.top=e.offsetY+"px";

this.appendChild(ripple);

setTimeout(function(){

ripple.remove();

},600);

});

});

/* ---------- PREMIUM CARD EFFECT ---------- */

document.querySelectorAll(".card").forEach(function(card){

card.addEventListener("mouseenter",function(){

this.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",function(){

this.style.transform="translateY(0px)";

});

});

/* ---------- FOOTER YEAR ---------- */

const year=document.getElementById("year");

if(year){

year.innerHTML=new Date().getFullYear();

}
/* ==========================================
   VISHWAS NAMKEEN
   SCRIPT.JS PART 6
   Checkout System
========================================== */

/* Random Order ID */

function generateOrderId(){

return "VN"+Math.floor(Math.random()*900000+100000);

}

/* Payment Method */

function getPaymentMethod(){

let payment=document.getElementById("paymentMethod");

if(payment){

return payment.value;

}

return "Cash On Delivery";

}

/* Place Order */

const placeOrder=document.getElementById("placeOrder");

if(placeOrder){

placeOrder.addEventListener("click",function(){

if(cart.length===0){

alert("Your Cart Is Empty");

return;

}

let name=document.getElementById("customerName");

let phone=document.getElementById("customerPhone");

let address=document.getElementById("customerAddress");

if(!name.value || !phone.value || !address.value){

alert("Please Fill All Required Details");

return;

}

let orderId=generateOrderId();

let payment=getPaymentMethod();

/* Success Popup */

let success=document.getElementById("success");

if(success){

success.style.display="flex";

}

/* Order Details */

console.log("Order ID :",orderId);

console.log("Customer :",name.value);

console.log("Phone :",phone.value);

console.log("Payment :",payment);

console.log("Total :",total);

/* WhatsApp Message Ready */

let message=
"🛒 Vishwas Namkeen Order%0A"+
"Order ID : "+orderId+"%0A"+
"Name : "+name.value+"%0A"+
"Phone : "+phone.value+"%0A"+
"Address : "+address.value+"%0A"+
"Payment : "+payment+"%0A"+
"Total : ₹"+total;

/*
Future Use:

window.open(
"https://wa.me/91XXXXXXXXXX?text="+message,
"_blank"
);

*/

showNotification("Order Placed Successfully ✅");

cart=[];

updateCart();

updateCheckout();

});

}

/* Close Success */

function closeSuccess(){

let success=document.getElementById("success");

if(success){

success.style.display="none";

}

}

/* Toast Notification */

function toast(text){

let notify=document.getElementById("notify");

if(!notify) return;

notify.innerHTML=text;

notify.style.right="20px";

setTimeout(function(){

notify.style.right="-350px";

},2500);

}
/* ==========================================
   VISHWAS NAMKEEN
   SCRIPT.JS PART 7
   Wishlist + Local Storage
========================================== */

/* ---------- SAVE CART ---------- */

function saveCart(){

localStorage.setItem("vishwasCart",JSON.stringify(cart));

}

/* ---------- LOAD CART ---------- */

function loadCart(){

let data=localStorage.getItem("vishwasCart");

if(data){

cart=JSON.parse(data);

updateCart();

updateCheckout();

}

}

window.addEventListener("load",loadCart);

/* ---------- SAVE WISHLIST ---------- */

let wishlist=JSON.parse(localStorage.getItem("wishlist")) || [];

function saveWishlist(){

localStorage.setItem("wishlist",JSON.stringify(wishlist));

}

/* ---------- ADD WISHLIST ---------- */

document.querySelectorAll(".wishlistBtn").forEach(function(btn){

btn.addEventListener("click",function(){

let card=this.closest(".card");

let product=card.querySelector("h3").innerText;

if(!wishlist.includes(product)){

wishlist.push(product);

saveWishlist();

toast("❤️ Added To Wishlist");

}else{

toast("Already In Wishlist");

}

});

});

/* ---------- PRODUCT RATING ---------- */

document.querySelectorAll(".rating").forEach(function(rate){

rate.addEventListener("click",function(){

toast("⭐ Thanks For Rating!");

});

});

/* ---------- ORDER HISTORY ---------- */

function saveOrder(orderId,total){

let orders=JSON.parse(localStorage.getItem("orders")) || [];

orders.push({

id:orderId,

price:total,

date:new Date().toLocaleString()

});

localStorage.setItem("orders",JSON.stringify(orders));

}

/* ---------- CLEAR CART ---------- */

function clearCart(){

cart=[];

saveCart();

updateCart();

updateCheckout();

}

/* ---------- AUTO SAVE ---------- */

setInterval(function(){

saveCart();

},1000);
/* ==========================================
   VISHWAS NAMKEEN
   SCRIPT.JS PART 7
   Wishlist + Local Storage + Orders
========================================== */

/* Wishlist */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* Add Wishlist */

function addWishlist(product){

if(!wishlist.includes(product)){

wishlist.push(product);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

showNotification(product + " Added To Wishlist ❤️");

}else{

showNotification("Already In Wishlist");

}

}

/* Wishlist Button */

document.querySelectorAll(".wishlistBtn").forEach(function(btn){

btn.addEventListener("click",function(){

let card=this.closest(".card");

let product=card.querySelector("h3").innerText;

addWishlist(product);

});

});

/* Save Cart */

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}

/* Load Cart */

function loadCart(){

let data=localStorage.getItem("cart");

if(data){

cart=JSON.parse(data);

updateCart();

if(typeof updateCheckout==="function"){

updateCheckout();

}

}

}

window.addEventListener("load",loadCart);

/* Save Order */

function saveOrder(orderId){

let orders=JSON.parse(localStorage.getItem("orders")) || [];

orders.push({

id:orderId,

date:new Date().toLocaleDateString(),

total:total

});

localStorage.setItem("orders",JSON.stringify(orders));

}

/* View Orders */

function viewOrders(){

let orders=JSON.parse(localStorage.getItem("orders")) || [];

console.log(orders);

}

/* Auto Save Cart */

setInterval(function(){

saveCart();

},1000);

/* Product Rating */

document.querySelectorAll(".rating").forEach(function(star){

star.addEventListener("click",function(){

showNotification("⭐ Thank You For Rating!");

});

});
/* ==========================================
   VISHWAS NAMKEEN
   SCRIPT.JS PART 8
========================================== */

/* ---------- DARK MODE SAVE ---------- */

let theme = localStorage.getItem("theme") || "dark";

function loadTheme(){

if(theme=="light"){

document.body.classList.add("light-mode");

}else{

document.body.classList.remove("light-mode");

}

}

loadTheme();

function toggleTheme(){

document.body.classList.toggle("light-mode");

if(document.body.classList.contains("light-mode")){

localStorage.setItem("theme","light");

}else{

localStorage.setItem("theme","dark");

}

}

/* ---------- USER PROFILE ---------- */

function saveProfile(){

let name=document.getElementById("loginName");

if(!name) return;

localStorage.setItem("userName",name.value);

}

function loadProfile(){

let user=localStorage.getItem("userName");

if(user){

let box=document.getElementById("userName");

if(box){

box.innerHTML=user;

}

}

}

window.addEventListener("load",loadProfile);

/* ---------- MOBILE MENU ---------- */

function toggleMenu(){

let nav=document.querySelector("nav");

if(!nav) return;

nav.classList.toggle("active");

}

/* ---------- PREMIUM NOTIFICATION ---------- */

function notify(text){

let box=document.getElementById("notify");

if(!box) return;

box.innerHTML=text;

box.style.right="20px";

setTimeout(function(){

box.style.right="-350px";

},2500);

}

/* ---------- BUTTON ANIMATION ---------- */

document.querySelectorAll("button").forEach(function(btn){

btn.addEventListener("mouseenter",function(){

this.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",function(){

this.style.transform="scale(1)";

});

});

/* ---------- PERFORMANCE ---------- */

window.addEventListener("load",function(){

document.querySelectorAll("img").forEach(function(img){

img.loading="lazy";

});

});

/* ---------- SCROLL HEADER ---------- */

window.addEventListener("scroll",function(){

let header=document.querySelector("header");

if(!header) return;

if(window.scrollY>80){

header.style.background="#000";

header.style.boxShadow="0 5px 20px rgba(0,0,0,.5)";

}else{

header.style.background="#111";

header.style.boxShadow="none";

}

});
/* ==========================================
   VISHWAS NAMKEEN
   SCRIPT.JS PART 9
========================================== */

/* ---------- ADVANCED SEARCH ---------- */

const searchInput = document.getElementById("searchBox");

if(searchInput){

searchInput.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".card").forEach(function(card){

let product=card.querySelector("h3").innerText.toLowerCase();

if(product.indexOf(value)>-1){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/* ---------- CATEGORY FILTER ---------- */

function filterProducts(category){

document.querySelectorAll(".card").forEach(function(card){

let type=card.getAttribute("data-category");

if(category=="all"){

card.style.display="block";

}

else if(type==category){

card.style.display="block";

}

else{

card.style.display="none";

}

});

}

/* ---------- FAVORITE COUNTER ---------- */

function updateWishlistCount(){

let count=document.getElementById("wishlistCount");

if(count){

count.innerHTML=wishlist.length;

}

}

updateWishlistCount();

/* ---------- DASHBOARD ---------- */

function updateDashboard(){

let product=document.getElementById("productCount");

let customer=document.getElementById("customerCount");

let order=document.getElementById("orderCount");

if(product){

product.innerHTML=document.querySelectorAll(".card").length;

}

if(customer){

customer.innerHTML="500+";

}

if(order){

order.innerHTML=localStorage.getItem("orders")?

JSON.parse(localStorage.getItem("orders")).length:

0;

}

}

updateDashboard();

/* ---------- SAVE LAST VISIT ---------- */

localStorage.setItem(

"lastVisit",

new Date().toLocaleString()

);

/* ---------- SHOW LAST VISIT ---------- */

const visit=document.getElementById("lastVisit");

if(visit){

visit.innerHTML=localStorage.getItem("lastVisit");

}

/* ---------- AUTO CLOSE POPUP ---------- */

setTimeout(function(){

let popup=document.getElementById("success");

if(popup){

popup.style.display="none";

}

},5000);

/* ---------- CONSOLE MESSAGE ---------- */

console.log("✅ Vishwas Namkeen Premium Website Loaded Successfully");
/* ==========================================
   VISHWAS NAMKEEN
   SCRIPT.JS PART 10
   FINAL PREMIUM VERSION
========================================== */

/* ---------- LOADER ---------- */

window.addEventListener("load",function(){

const loader=document.getElementById("loader");

if(loader){

setTimeout(function(){

loader.style.opacity="0";

setTimeout(function(){

loader.style.display="none";

},500);

},1200);

}

});

/* ---------- SCROLL ANIMATION ---------- */

const observer=new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

entry.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(function(section){

section.classList.add("fade");

observer.observe(section);

});

/* ---------- BUTTON RIPPLE ---------- */

document.querySelectorAll("button").forEach(function(btn){

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

ripple.className="ripple";

ripple.style.left=e.offsetX+"px";

ripple.style.top=e.offsetY+"px";

this.appendChild(ripple);

setTimeout(function(){

ripple.remove();

},600);

});

});

/* ---------- IMAGE HOVER ---------- */

document.querySelectorAll(".card img").forEach(function(img){

img.addEventListener("mouseenter",function(){

this.style.transform="scale(1.08) rotate(2deg)";

this.style.transition=".4s";

});

img.addEventListener("mouseleave",function(){

this.style.transform="scale(1)";

});

});

/* ---------- CARD ANIMATION ---------- */

document.querySelectorAll(".card").forEach(function(card){

card.addEventListener("mouseenter",function(){

this.style.transform="translateY(-10px)";

this.style.boxShadow="0 0 25px rgba(255,215,0,.35)";

});

card.addEventListener("mouseleave",function(){

this.style.transform="translateY(0)";

this.style.boxShadow="none";

});

});

/* ---------- AUTO SAVE ---------- */

window.addEventListener("beforeunload",function(){

localStorage.setItem("cart",JSON.stringify(cart));

});

/* ---------- ONLINE / OFFLINE ---------- */

window.addEventListener("online",function(){

notify("✅ Internet Connected");

});

window.addEventListener("offline",function(){

notify("❌ No Internet Connection");

});

/* ---------- YEAR ---------- */

const year=document.getElementById("year");

if(year){

year.innerHTML=new Date().getFullYear();

}

/* ---------- WELCOME ---------- */

setTimeout(function(){

notify("Welcome To Vishwas Namkeen ❤️");

},1000);

/* ---------- ERROR HANDLER ---------- */

window.onerror=function(){

console.log("JavaScript Error Handled");

return true;

};

/* ---------- WEBSITE READY ---------- */

console.log("====================================");

console.log("VISHWAS NAMKEEN PREMIUM WEBSITE");

console.log("Version : 1.0");

console.log("Status : Ready");

console.log("====================================");
