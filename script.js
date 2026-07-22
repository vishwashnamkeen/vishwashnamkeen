/*=========================================
VISHWASH NAMKEEN
SCRIPT.JS PART 1
=========================================*/

// Loader

window.addEventListener("load", function () {

const loader = document.getElementById("loader");

if(loader){

loader.style.opacity = "0";

setTimeout(() => {

loader.style.display = "none";

},500);

}

});

// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");

const menu = document.querySelector("#menu");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

menu.classList.toggle("active");

});

}

// Sticky Header

const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY > 80){

header.classList.add("sticky");

}else{

header.classList.remove("sticky");

}

});

// Search Popup

const searchPopup = document.getElementById("searchPopup");

const searchInput = document.getElementById("searchInput");

const searchIcon = document.querySelector(".fa-search");

if(searchIcon){

searchIcon.onclick = ()=>{

searchPopup.classList.toggle("show");

if(searchInput){

searchInput.focus();

}

};

}

// Close Search

window.addEventListener("click",(e)=>{

if(searchPopup &&

!searchPopup.contains(e.target) &&

!e.target.classList.contains("fa-search")){

searchPopup.classList.remove("show");

}

});

// Back To Top

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY > 300){

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

// Notification

function notify(message){

const box=document.getElementById("notify");

if(!box) return;

box.innerHTML=message;

box.style.right="20px";

setTimeout(()=>{

box.style.right="-400px";

},2500);

}
/*=========================================
SCRIPT.JS PART 2
SHOPPING CART
=========================================*/

let cart = [];

// Open Cart
const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.querySelector(".fa-shopping-cart");
const closeCart = document.getElementById("closeCart");

if(cartIcon){
cartIcon.onclick = () => {
cartSidebar.classList.add("active");
};
}

if(closeCart){
closeCart.onclick = () => {
cartSidebar.classList.remove("active");
};
}

// Add To Cart
document.querySelectorAll(".cart").forEach((btn)=>{

btn.addEventListener("click",()=>{

const card = btn.closest(".product-card");

const name = card.querySelector("h3").innerText;

const price = parseInt(
card.querySelector("h4").innerText.replace(/[^\d]/g,"")
);

let item = cart.find(x=>x.name===name);

if(item){

item.qty++;

}else{

cart.push({

name:name,

price:price,

qty:1

});

}

updateCart();

notify(name + " Added To Cart");

});

});

// Update Cart

function updateCart(){

const cartItems=document.getElementById("cartItems");

const total=document.getElementById("cartTotal");

const grand=document.getElementById("grandTotal");

const summary=document.getElementById("summaryItems");

if(!cartItems) return;

cartItems.innerHTML="";
summary.innerHTML="";

let totalPrice=0;

if(cart.length===0){

cartItems.innerHTML="<p class='empty-cart'>Your Cart Is Empty</p>";

total.innerHTML="₹0";

grand.innerHTML="₹0";

return;

}

cart.forEach((item,index)=>{

totalPrice += item.price * item.qty;

cartItems.innerHTML += `

<div class="cart-item">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<div class="qty">

<button onclick="minusQty(${index})">-</button>

<span>${item.qty}</span>

<button onclick="plusQty(${index})">+</button>

</div>

</div>

`;

summary.innerHTML += `

<p>

${item.name}

(${item.qty})

<span>

₹${item.price*item.qty}

</span>

</p>

`;

});

total.innerHTML="₹"+totalPrice;

grand.innerHTML="₹"+totalPrice;

}

// Quantity +

function plusQty(index){

cart[index].qty++;

updateCart();

}

// Quantity -

function minusQty(index){

cart[index].qty--;

if(cart[index].qty<=0){

cart.splice(index,1);

}

updateCart();

}
/*=========================================
SCRIPT.JS PART 3
BUY NOW + ORDER FORM
=========================================*/

let selectedProduct = "";
let selectedPrice = 0;

// Buy Button

document.querySelectorAll(".buy").forEach(button=>{

button.addEventListener("click",()=>{

const card = button.closest(".product-card");

selectedProduct = card.querySelector("h3").innerText;

selectedPrice = parseInt(
card.querySelector("h4").innerText.replace(/[^\d]/g,"")
);

document.getElementById("buyPopup").style.display="flex";

});

});

// Close Popup

const closePopup=document.querySelector(".closePopup");

if(closePopup){

closePopup.onclick=()=>{

document.getElementById("buyPopup").style.display="none";

};

}

// Order Form

const orderForm=document.getElementById("orderForm");

if(orderForm){

orderForm.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("customerName").value.trim();

const mobile=document.getElementById("customerMobile").value.trim();

const address=document.getElementById("customerAddress").value.trim();

const pincode=document.getElementById("customerPincode").value.trim();

const qty=document.getElementById("customerQty").value;

// Validation

if(name.length<3){

alert("Enter Valid Name");

return;

}

if(!/^[6-9]\d{9}$/.test(mobile)){

alert("Enter Valid Mobile Number");

return;

}

if(!/^\d{6}$/.test(pincode)){

alert("Pincode Must Be 6 Digits");

return;

}

const total=selectedPrice*qty;

// Success Popup

document.getElementById("buyPopup").style.display="none";

document.getElementById("successPopup").style.display="flex";

// WhatsApp Message

const msg=

`*NEW ORDER - VISHWASH NAMKEEN*%0A%0A`+

`👤 Name : ${name}%0A`+

`📱 Mobile : ${mobile}%0A`+

`🏠 Address : ${address}%0A`+

`📮 Pincode : ${pincode}%0A%0A`+

`🛒 Product : ${selectedProduct}%0A`+

`📦 Quantity : ${qty}%0A`+

`💰 Total : ₹${total}`;

setTimeout(()=>{

window.open(

"https://wa.me/91YOURNUMBER?text="+msg,

"_blank"

);

},1200);

});

}

// Success Close

function closeSuccess(){

document.getElementById("successPopup").style.display="none";

orderForm.reset();

}
/*=========================================
SCRIPT.JS PART 4
SEARCH + WISHLIST + CART COUNTER
=========================================*/

// Wishlist

let wishlist = [];

// Wishlist Buttons

document.querySelectorAll(".wishlistBtn").forEach((btn)=>{

btn.addEventListener("click",()=>{

const card = btn.closest(".product-card");

const name = card.querySelector("h3").innerText;

if(!wishlist.includes(name)){

wishlist.push(name);

notify(name + " Added To Wishlist ❤️");

btn.innerHTML="❤️ Wishlisted";

btn.style.background="#f4b400";
btn.style.color="#000";

}else{

notify(name + " Already In Wishlist");

}

});

});

// Live Search

const searchBox = document.getElementById("searchInput");

if(searchBox){

searchBox.addEventListener("keyup",()=>{

const value = searchBox.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

const text = card.querySelector("h3").innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// Cart Counter

function updateCartCounter(){

const count=document.querySelector(".cart-count");

if(!count) return;

let total=0;

cart.forEach(item=>{

total += item.qty;

});

count.innerHTML=total;

}

// Update Cart Override

const oldUpdateCart = updateCart;

updateCart = function(){

oldUpdateCart();

updateCartCounter();

};

// Product Animation

const cards=document.querySelectorAll(".product-card");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

cards.forEach(card=>{

observer.observe(card);

});

// Newsletter

const newsletter=document.getElementById("newsletterForm");

if(newsletter){

newsletter.addEventListener("submit",(e)=>{

e.preventDefault();

notify("Thank You For Subscribing ❤️");

newsletter.reset();

});

}
/*=========================================
SCRIPT.JS PART 5
COUPON + LOCAL STORAGE
=========================================*/

// Save Cart

function saveCart(){

localStorage.setItem(

"vishwash_cart",

JSON.stringify(cart)

);

}

// Load Cart

function loadCart(){

const data=localStorage.getItem(

"vishwash_cart"

);

if(data){

cart=JSON.parse(data);

updateCart();

}

}

loadCart();

// Override Update Cart

const oldCartUpdate=updateCart;

updateCart=function(){

oldCartUpdate();

saveCart();

updateCartCounter();

};

// Coupon

function applyCoupon(){

const code=document.getElementById(

"coupon"

);

const result=document.getElementById(

"couponResult"

);

if(!code || !result) return;

const value=code.value.toUpperCase();

if(value==="VISHWASH10"){

result.innerHTML="✅ Coupon Applied (10% OFF)";

result.style.color="lime";

}else if(value==="NAMKEEN20"){

result.innerHTML="✅ Coupon Applied (20% OFF)";

result.style.color="lime";

}else{

result.innerHTML="❌ Invalid Coupon";

result.style.color="red";

}

}

// Order Tracking

function trackOrder(){

const id=document.getElementById(

"trackingId"

);

const status=document.getElementById(

"trackStatus"

);

if(!id || !status) return;

if(id.value.length<5){

status.innerHTML="Invalid Order ID";

status.style.color="red";

return;

}

status.innerHTML="🚚 Your Order Is Processing";

status.style.color="#f4b400";

}

// Premium Notification

function showNotify(text){

const box=document.getElementById(

"notify"

);

if(!box) return;

box.innerHTML=text;

box.style.right="20px";

setTimeout(()=>{

box.style.right="-400px";

},2500);

}

// Welcome Message

window.addEventListener("load",()=>{

setTimeout(()=>{

showNotify(

"👋 Welcome To VISHWASH NAMKEEN"

);

},1000);

});

// Button Ripple

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

ripple.className="ripple";

const x=e.clientX-btn.offsetLeft;

const y=e.clientY-btn.offsetTop;

ripple.style.left=x+"px";

ripple.style.top=y+"px";

btn.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});
/*=========================================
SCRIPT.JS PART 6
SLIDER + ANIMATION
=========================================*/

// Hero Slider

const heroImages = [

"HIRO.jpg.png",

"BHAKARWADI.PNG.png",

"BINGOMASALA.PNG.png",

"BINGOPANIPURI.PNG.png"

];

let heroIndex = 0;

const heroImage = document.querySelector(".hero-image img");

function changeHeroImage(){

if(!heroImage) return;

heroIndex++;

if(heroIndex >= heroImages.length){

heroIndex = 0;

}

heroImage.style.opacity = "0";

setTimeout(()=>{

heroImage.src = heroImages[heroIndex];

heroImage.style.opacity = "1";

},400);

}

setInterval(changeHeroImage,4000);

// Scroll Animation

const fadeItems=document.querySelectorAll(

".product-card,.feature-box,.review-card,.gallery-item,.about-content,.founder-box"

);

const scrollObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.20

}

);

fadeItems.forEach(item=>{

scrollObserver.observe(item);

});

// Review Slider

const reviewCards=document.querySelectorAll(".review-card");

let reviewIndex=0;

function reviewSlide(){

reviewCards.forEach(card=>{

card.style.display="none";

});

reviewIndex++;

if(reviewIndex>reviewCards.length){

reviewIndex=1;

}

if(reviewCards.length){

reviewCards[reviewIndex-1].style.display="block";

}

}

if(reviewCards.length){

reviewSlide();

setInterval(reviewSlide,3500);

}

// Counter Animation

const counters=document.querySelectorAll(".counter-box h2");

const speed=50;

counters.forEach(counter=>{

const update=()=>{

const target=parseInt(

counter.innerText.replace(/\D/g,"")

);

let count=parseInt(counter.dataset.count||0);

const increment=Math.ceil(target/speed);

if(count<target){

count+=increment;

counter.dataset.count=count;

counter.innerText=count+"+";

setTimeout(update,30);

}else{

counter.innerText=target+"+";

}

};

update();

});

// Image Zoom

document.querySelectorAll(".gallery-item img").forEach(img=>{

img.addEventListener("click",()=>{

window.open(img.src,"_blank");

});

});

// Auto Close Popup

window.addEventListener("keyup",(e)=>{

if(e.key==="Escape"){

const popup=document.getElementById("buyPopup");

if(popup){

popup.style.display="none";

}

}

});
/*=========================================
SCRIPT.JS PART 7
DARK MODE + SORTING + EFFECTS
=========================================*/

// Dark Mode

const themeBtn = document.getElementById("themeBtn");

if(themeBtn){

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("light-mode");

localStorage.setItem(

"theme",

document.body.classList.contains("light-mode")

? "light"

: "dark"

);

});

}

window.addEventListener("load",()=>{

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="light"){

document.body.classList.add("light-mode");

}

});

// Product Sorting

const sortSelect=document.getElementById("sortProducts");

if(sortSelect){

sortSelect.addEventListener("change",()=>{

const grid=document.querySelector(".product-grid");

const cards=[...document.querySelectorAll(".product-card")];

cards.sort((a,b)=>{

const priceA=parseInt(a.querySelector("h4").innerText.replace(/[^\d]/g,""));

const priceB=parseInt(b.querySelector("h4").innerText.replace(/[^\d]/g,""));

if(sortSelect.value==="low") return priceA-priceB;

if(sortSelect.value==="high") return priceB-priceA;

return 0;

});

cards.forEach(card=>grid.appendChild(card));

});

}

// Premium Cart Animation

const cartSide=document.getElementById("cartSidebar");

if(cartSide){

document.querySelectorAll(".cart").forEach(btn=>{

btn.addEventListener("click",()=>{

cartSide.classList.add("shake");

setTimeout(()=>{

cartSide.classList.remove("shake");

},700);

});

});

}

// Floating Buttons

window.addEventListener("scroll",()=>{

const whatsapp=document.querySelector(".floating-whatsapp");

const call=document.querySelector(".floating-call");

if(window.scrollY>250){

if(whatsapp) whatsapp.style.bottom="25px";

if(call) call.style.bottom="95px";

}else{

if(whatsapp) whatsapp.style.bottom="-100px";

if(call) call.style.bottom="-100px";

}

});

// Live Search Highlight

const search=document.getElementById("searchInput");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

const title=card.querySelector("h3");

if(title.innerText.toLowerCase().includes(value)){

card.style.display="block";

title.style.color="#f4b400";

}else{

card.style.display="none";

}

});

});

}

// Page Fade

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};

// Footer Year

const year=document.getElementById("year");

if(year){

year.innerHTML=new Date().getFullYear();

}
/*=========================================
SCRIPT.JS PART 8
PREMIUM FEATURES
=========================================*/

// Auto Offer Popup

window.addEventListener("load", () => {

setTimeout(() => {

const popup = document.getElementById("offerPopup");

if (popup) {

popup.classList.add("show");

}

}, 4000);

});

// Close Offer Popup

const offerClose = document.getElementById("offerClose");

if (offerClose) {

offerClose.onclick = () => {

document.getElementById("offerPopup").classList.remove("show");

};

}

// Random Order ID

function generateOrderID() {

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let id = "VN-";

for (let i = 0; i < 8; i++) {

id += chars.charAt(Math.floor(Math.random() * chars.length));

}

return id;

}

// Live Orders

const liveCustomers = [

"Rahul - Indore",

"Amit - Bhopal",

"Priya - Ujjain",

"Vikas - Ratlam",

"Anjali - Jaipur",

"Rohit - Kota",

"Rakesh - Ahmedabad",

"Deepak - Surat"

];

function showLiveOrder() {

const notify = document.getElementById("liveOrder");

if (!notify) return;

const random = Math.floor(Math.random() * liveCustomers.length);

notify.innerHTML =

"🛒 " + liveCustomers[random] +

" ordered Vishwash Namkeen.";

notify.classList.add("show");

setTimeout(() => {

notify.classList.remove("show");

}, 3500);

}

setInterval(showLiveOrder, 9000);

// Success Sound

function playSuccessSound() {

const audio = new Audio(

"https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"

);

audio.play();

}

// Order Success

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

checkoutForm.addEventListener("submit", function(e) {

e.preventDefault();

const orderId = generateOrderID();

playSuccessSound();

alert(

"✅ Product Successfully Ordered\n\n" +

"Order ID : " + orderId

);

});

}

// Button Hover Animation

document.querySelectorAll("button").forEach(btn => {

btn.addEventListener("mouseenter", () => {

btn.style.transform = "scale(1.05)";

});

btn.addEventListener("mouseleave", () => {

btn.style.transform = "scale(1)";

});

});

// Image Hover Effect

document.querySelectorAll(".product-card img").forEach(img => {

img.addEventListener("mouseenter", () => {

img.style.transform = "scale(1.08)";

});

img.addEventListener("mouseleave", () => {

img.style.transform = "scale(1)";

});

});

// Smooth Anchor Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e) {

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if (target) {

target.scrollIntoView({

behavior: "smooth"

});

}

});

});
/*=========================================
SCRIPT.JS PART 9
ADVANCED FEATURES
=========================================*/

// Save Wishlist

function saveWishlist() {
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}

function loadWishlist() {
    const data = localStorage.getItem("wishlist");

    if (data) {
        wishlist = JSON.parse(data);
    }
}

loadWishlist();

// Save Cart

function saveCartData() {
    localStorage.setItem(
        "cartData",
        JSON.stringify(cart)
    );
}

function loadCartData() {

    const data = localStorage.getItem("cartData");

    if (data) {

        cart = JSON.parse(data);

        updateCart();

    }

}

loadCartData();

// Product Filter

function filterProducts(category) {

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        if (category === "all") {

            card.style.display = "block";

            return;

        }

        const type = card.dataset.category;

        if (type === category) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

// Cart Count

function cartCount() {

    const count = document.querySelector(".cart-count");

    if (!count) return;

    let total = 0;

    cart.forEach(item => {

        total += item.qty;

    });

    count.innerHTML = total;

}

cartCount();

// WhatsApp Order

function sendWhatsAppOrder(name,mobile,address,pincode){

    let order = "";

    let total = 0;

    cart.forEach(item=>{

        order +=

item.name +

" x " +

item.qty +

" = ₹" +

(item.price*item.qty) +

"%0A";

        total += item.price * item.qty;

    });

    const message =

`*🛒 VISHWASH NAMKEEN ORDER*%0A%0A`+

`👤 Name : ${name}%0A`+

`📞 Mobile : ${mobile}%0A`+

`🏠 Address : ${address}%0A`+

`📮 Pincode : ${pincode}%0A%0A`+

`${order}%0A`+

`💰 Total : ₹${total}`;

window.open(

"https://wa.me/91YOURNUMBER?text="+message,

"_blank"

);

}

// Loading Animation

function showLoading(){

    const loader=document.getElementById("loader");

    if(loader){

        loader.style.display="flex";

        setTimeout(()=>{

            loader.style.display="none";

        },1500);

    }

}

// Auto Save

setInterval(()=>{

saveCartData();

saveWishlist();

},3000);

// Welcome Notification

setTimeout(()=>{

notify("🔥 Welcome To VISHWASH NAMKEEN");

},2000);
/*=========================================
SCRIPT.JS PART 10
FINAL PROFESSIONAL FINISH
=========================================*/

// Page Fade Animation

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
});

// Product Hover Effect

document.querySelectorAll(".product-card").forEach((card) => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });

});

// Lazy Loading Images

document.querySelectorAll("img").forEach((img) => {

    img.setAttribute("loading", "lazy");

});

// Active Navigation

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// Floating Buttons Animation

const floatingButtons = document.querySelectorAll(
".floating-whatsapp,.floating-call"
);

floatingButtons.forEach(btn => {

    setInterval(() => {

        btn.classList.toggle("pulse");

    }, 1800);

});

// Image Error Handler

document.querySelectorAll("img").forEach((img) => {

    img.onerror = function () {

        this.src = "HIRO.jpg.png";

    };

});

// Disable Right Click

document.addEventListener("contextmenu", function(e){

    e.preventDefault();

});

// Disable F12 / Dev Shortcut

document.addEventListener("keydown", function(e){

    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U")
    ) {

        e.preventDefault();

    }

});

// Performance

window.addEventListener("load", () => {

    console.log(
        "VISHWASH NAMKEEN Website Loaded Successfully"
    );

});

// Footer Year

const footerYear = document.getElementById("year");

if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

}

// Final Welcome

setTimeout(() => {

    notify("❤️ Thank You For Visiting VISHWASH NAMKEEN");

}, 5000);

/*=========================================
END OF SCRIPT.JS
Developed For:
VISHWASH NAMKEEN

Founder:
NIKHIL VAISHNAV
=========================================*/
