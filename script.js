/*==================================
      VISHWASH NAMKEEN
      PROFESSIONAL SCRIPT
==================================*/

let cart = [];
let total = 0;

/*==================================
        ADD TO CART
==================================*/

function addToCart(name, price, image){

    const existing = cart.find(item => item.name === name);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    updateCart();

    showNotification(name + " added to cart");

}

/*==================================
        UPDATE CART
==================================*/

function updateCart(){

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    total = 0;

    let count = 0;

    if(cart.length === 0){

        cartItems.innerHTML =
        "<p class='empty-cart'>Your cart is empty.</p>";

        cartCount.innerText = "0";
        cartTotal.innerText = "0";

        return;
    }

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        count += item.quantity;

        cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div class="cart-details">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<div class="quantity-box">

<button onclick="decreaseQuantity(${index})">-</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${index})">+</button>

</div>

<button class="remove-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

`;

    });

    cartCount.innerText = count;

    cartTotal.innerText = total;

    localStorage.setItem("cart", JSON.stringify(cart));

}
/*==================================
        INCREASE QUANTITY
==================================*/

function increaseQuantity(index){

    cart[index].quantity++;

    updateCart();

}

/*==================================
        DECREASE QUANTITY
==================================*/

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

/*==================================
        REMOVE ITEM
==================================*/

function removeItem(index){

    cart.splice(index,1);

    updateCart();

    showNotification("Product Removed");

}

/*==================================
        CLEAR CART
==================================*/

function clearCart(){

    if(cart.length===0){

        showNotification("Cart Already Empty");

        return;

    }

    cart=[];

    updateCart();

    localStorage.removeItem("cart");

    showNotification("Cart Cleared");

}

/*==================================
      LOAD SAVED CART
==================================*/

window.addEventListener("load",()=>{

    const savedCart=localStorage.getItem("cart");

    if(savedCart){

        cart=JSON.parse(savedCart);

        updateCart();

    }

});
/*==================================
        TOGGLE CART
==================================*/

function toggleCart(){

    document.getElementById("cart").classList.toggle("active");

    document.getElementById("overlay").classList.toggle("active");

}

/*==================================
        CHECKOUT
==================================*/

function checkout(){

    if(cart.length===0){

        showNotification("Your Cart is Empty");

        return;

    }

    let message="🛒 *VISHWASH NAMKEEN ORDER*%0A%0A";

    let grandTotal=0;

    cart.forEach(item=>{

        const itemTotal=item.price*item.quantity;

        grandTotal+=itemTotal;

        message+=`📦 ${item.name}%0A`;
        message+=`Qty : ${item.quantity}%0A`;
        message+=`Price : ₹${item.price}%0A`;
        message+=`Subtotal : ₹${itemTotal}%0A%0A`;

    });

    message+=`💰 *Grand Total : ₹${grandTotal}*`;

    window.open(
    "https://wa.me/918460183525?text="+message,
    "_blank"
    );

}

/*==================================
      OPEN CART BUTTON
==================================*/

const cartButton=document.getElementById("cart-btn");

if(cartButton){

cartButton.addEventListener("click",toggleCart);

}

/*==================================
      CLOSE WITH ESC KEY
==================================*/

document.addEventListener("keydown",function(e){

if(e.key==="Escape"){

document.getElementById("cart").classList.remove("active");

document.getElementById("overlay").classList.remove("active");

}

});

/*==================================
      CLICK OUTSIDE CART
==================================*/

const overlay=document.getElementById("overlay");

if(overlay){

overlay.addEventListener("click",function(){

document.getElementById("cart").classList.remove("active");

overlay.classList.remove("active");

});

}
/*==================================
        LIVE SEARCH
==================================*/

const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup", function(){

const value = this.value.toLowerCase();

const products = document.querySelectorAll(".product-card");

products.forEach(product=>{

const name = product.querySelector("h3").innerText.toLowerCase();

if(name.includes(value)){

product.style.display="block";

}else{

product.style.display="none";

}

});

});

}

/*==================================
      SHOW NOTIFICATION
==================================*/

function showNotification(message){

const notification=document.getElementById("notification");

if(!notification) return;

notification.innerText=message;

notification.classList.add("show");

setTimeout(()=>{

notification.classList.remove("show");

},2500);

}

/*==================================
      BACK TO TOP BUTTON
==================================*/

const backTop=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

if(backTop){

backTop.style.display="flex";

}

}else{

if(backTop){

backTop.style.display="none";

}

}

});

/*==================================
      SCROLL TO TOP
==================================*/

function scrollToTop(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

/*==================================
      STICKY HEADER
==================================*/

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

/*==================================
      SMOOTH SECTION SCROLL
==================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});
/*==================================
        PAGE LOADER
==================================*/

window.addEventListener("load", function(){

const loader = document.getElementById("loader");

if(loader){

setTimeout(function(){

loader.style.opacity="0";

loader.style.visibility="hidden";

},800);

}

});

/*==================================
      SCROLL ANIMATION
==================================*/

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

document.querySelectorAll(
".fade-up,.fade-left,.fade-right"
).forEach(el=>{

observer.observe(el);

});

/*==================================
      GALLERY IMAGE ZOOM
==================================*/

document.querySelectorAll(".gallery-item img").forEach(img=>{

img.addEventListener("click",function(){

const popup=document.createElement("div");

popup.className="image-popup";

popup.innerHTML=`
<div class="popup-bg">
<img src="${this.src}">
<span class="popup-close">&times;</span>
</div>
`;

document.body.appendChild(popup);

popup.querySelector(".popup-close")
.onclick=function(){

popup.remove();

};

popup.onclick=function(e){

if(e.target===popup){

popup.remove();

}

};

});

});

/*==================================
      SEARCH POPUP
==================================*/

const searchIcon=document.querySelector(".fa-search");
const searchPopup=document.getElementById("searchPopup");

if(searchIcon && searchPopup){

searchIcon.addEventListener("click",()=>{

searchPopup.classList.toggle("active");

});

}

/*==================================
      CLOSE SEARCH (ESC)
==================================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape" && searchPopup){

searchPopup.classList.remove("active");

}

});

/*==================================
      PRELOAD IMAGES
==================================*/

[
"HERO.PNG",
"BHAKARWADI.PNG",
"BINGOMASALA.PNG",
"BINGOPANIPURI.PNG",
"METHIPURI.PNG",
"PUNJABIMIX.PNG",
"NADIYADIMIX.PNG",
"MASALABANANAWEFER.PNG"
].forEach(src=>{

const img=new Image();

img.src=src;

});
/*==================================
      LOGIN / SIGNUP MODAL
==================================*/

const loginModal=document.getElementById("loginModal");

function openLogin(){

if(loginModal){

loginModal.classList.add("active");

}

}

function closeLogin(){

if(loginModal){

loginModal.classList.remove("active");

}

}

/*==================================
      SUCCESS MODAL
==================================*/

const successModal=document.getElementById("successModal");

function openSuccess(){

if(successModal){

successModal.classList.add("active");

}

}

function closeSuccess(){

if(successModal){

successModal.classList.remove("active");

}

}

/*==================================
      NEWSLETTER
==================================*/

const newsletter=document.querySelector(".newsletter-form");

if(newsletter){

newsletter.addEventListener("submit",function(e){

e.preventDefault();

const email=this.querySelector("input").value.trim();

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email===""){

showNotification("Please Enter Email");

return;

}

if(!emailPattern.test(email)){

showNotification("Invalid Email");

return;

}

showNotification("Subscribed Successfully");

this.reset();

});

}

/*==================================
      CONTACT FORM
==================================*/

const contactForm=document.querySelector(".contact-form form");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

const name=this.querySelector("input[type='text']").value.trim();

const email=this.querySelector("input[type='email']").value.trim();

const phone=this.querySelector("input[type='tel']").value.trim();

if(name.length<3){

showNotification("Enter Valid Name");

return;

}

if(phone.length<10){

showNotification("Enter Valid Mobile Number");

return;

}

showNotification("Message Sent Successfully");

this.reset();

});

}

/*==================================
      CHECKOUT SUCCESS
==================================*/

function orderPlaced(){

openSuccess();

clearCart();

showNotification("Order Placed Successfully");

}

/*==================================
      CLICK SOUND
==================================*/

const clickSound=document.getElementById("clickSound");

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",()=>{

if(clickSound){

clickSound.currentTime=0;

clickSound.play().catch(()=>{});

}

});

});
/*==================================
      MOBILE MENU
==================================*/

const menuBtn=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}

/*==================================
      CLOSE MENU
==================================*/

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

if(navLinks){

navLinks.classList.remove("active");

}

});

});

/*==================================
        DARK MODE
==================================*/

const darkBtn=document.getElementById("darkMode");

if(darkBtn){

darkBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
?"dark":"light"
);

});

}

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){

document.body.classList.add("dark");

}

/*==================================
        WISHLIST
==================================*/

let wishlist=[];

function addWishlist(product){

if(!wishlist.includes(product)){

wishlist.push(product);

showNotification(product+" added to Wishlist");

}else{

showNotification("Already in Wishlist");

}

}

/*==================================
      PRODUCT FILTER
==================================*/

function filterProducts(category){

const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

const productCategory=card.dataset.category;

if(category==="all"){

card.style.display="block";

}
else if(productCategory===category){

card.style.display="block";

}
else{

card.style.display="none";

}

});

}

/*==================================
      PAGE SCROLL PROGRESS
==================================*/

window.addEventListener("scroll",()=>{

const totalHeight=
document.documentElement.scrollHeight-
window.innerHeight;

const progress=
(window.pageYOffset/totalHeight)*100;

const bar=document.getElementById("progressBar");

if(bar){

bar.style.width=progress+"%";

}

});
/*==================================
      AUTO HERO SLIDER
==================================*/

const heroImages=[
"HERO.PNG",
"BHAKARWADI.PNG",
"PUNJABIMIX.PNG",
"NADIYADIMIX.PNG"
];

let heroIndex=0;

const heroImage=document.querySelector(".hero-image img");

if(heroImage){

setInterval(()=>{

heroIndex++;

if(heroIndex>=heroImages.length){

heroIndex=0;

}

heroImage.style.opacity="0";

setTimeout(()=>{

heroImage.src=heroImages[heroIndex];

heroImage.style.opacity="1";

},300);

},4000);

}

/*==================================
      PRODUCT SORTING
==================================*/

function sortProducts(type){

const container=document.querySelector(".product-container");

if(!container) return;

const cards=[...container.querySelectorAll(".product-card")];

cards.sort((a,b)=>{

const priceA=parseInt(
a.querySelector(".price").innerText.replace(/[^\d]/g,"")
);

const priceB=parseInt(
b.querySelector(".price").innerText.replace(/[^\d]/g,"")
);

if(type==="low"){

return priceA-priceB;

}

if(type==="high"){

return priceB-priceA;

}

return 0;

});

cards.forEach(card=>container.appendChild(card));

}

/*==================================
      LAZY IMAGE LOADING
==================================*/

const lazyImages=document.querySelectorAll("img");

const imageObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.loading="lazy";

imageObserver.unobserve(img);

}

});

});

lazyImages.forEach(img=>{

imageObserver.observe(img);

});

/*==================================
      PRODUCT HOVER EFFECT
==================================*/

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/*==================================
      SCROLL REVEAL
==================================*/

window.addEventListener("scroll",()=>{

document.querySelectorAll("section").forEach(section=>{

const top=section.getBoundingClientRect().top;

if(top<window.innerHeight-120){

section.classList.add("fade-up","show");

}

});

});

/*==================================
      PRODUCT IMAGE CLICK
==================================*/

document.querySelectorAll(".product-card img").forEach(img=>{

img.style.cursor="pointer";

img.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

});
/*==================================
        COUPON SYSTEM
==================================*/

let couponDiscount = 0;

function applyCoupon(){

const coupon=document.getElementById("couponCode");

if(!coupon){

showNotification("Coupon Box Not Found");

return;

}

const code=coupon.value.trim().toUpperCase();

if(code==="VISHWASH10"){

couponDiscount=10;

showNotification("10% Discount Applied");

}
else if(code==="WELCOME20"){

couponDiscount=20;

showNotification("20% Discount Applied");

}
else{

couponDiscount=0;

showNotification("Invalid Coupon");

}

updateFinalBill();

}

/*==================================
      FINAL BILL
==================================*/

function updateFinalBill(){

let subtotal=0;

cart.forEach(item=>{

subtotal+=item.price*item.quantity;

});

const delivery=subtotal>=500?0:40;

const discount=(subtotal*couponDiscount)/100;

const gst=((subtotal-discount)*5)/100;

const grandTotal=subtotal-discount+delivery+gst;

const totalBox=document.getElementById("cart-total");

if(totalBox){

totalBox.innerText=Math.round(grandTotal);

}

}

/*==================================
      INVOICE
==================================*/

function generateInvoice(){

let invoice="";

invoice+="===== VISHWASH NAMKEEN =====\n\n";

cart.forEach(item=>{

invoice+=item.name+" x "+item.quantity;

invoice+=" = ₹"+(item.price*item.quantity);

invoice+="\n";

});

invoice+="\n";

invoice+="Total : ₹"+document.getElementById("cart-total").innerText;

alert(invoice);

}

/*==================================
      FINAL CHECKOUT
==================================*/

function finalCheckout(){

if(cart.length===0){

showNotification("Cart is Empty");

return;

}

generateInvoice();

checkout();

}

/*==================================
      SAVE LAST ORDER
==================================*/

function saveLastOrder(){

localStorage.setItem(

"lastOrder",

JSON.stringify(cart)

);

}

/*==================================
      CLEAR AFTER ORDER
==================================*/

function completeOrder(){

saveLastOrder();

clearCart();

showNotification("Thank You For Your Order");

}

/*==================================
      AUTO BILL UPDATE
==================================*/

setInterval(()=>{

updateFinalBill();

},1000);
/*==================================
      FINAL INITIALIZATION
==================================*/

document.addEventListener("DOMContentLoaded",()=>{

console.log("Vishwash Namkeen Website Loaded");

if(localStorage.getItem("cart")){

cart=JSON.parse(localStorage.getItem("cart"));

updateCart();

}

});

/*==================================
      GLOBAL ERROR HANDLER
==================================*/

window.addEventListener("error",(event)=>{

console.error(
"Error:",
event.message
);

});

/*==================================
      SAFE QUERY SELECTOR
==================================*/

function safeElement(selector){

try{

return document.querySelector(selector);

}catch{

return null;

}

}

/*==================================
      CART AUTO SAVE
==================================*/

function saveCart(){

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

}

setInterval(()=>{

saveCart();

},3000);

/*==================================
      PRODUCT COUNTER
==================================*/

function totalProducts(){

let total=0;

cart.forEach(item=>{

total+=item.quantity;

});

return total;

}

/*==================================
      WEBSITE STATS
==================================*/

console.log(
"Professional Vishwash Namkeen Store Ready"
);

/*==================================
      ONLINE / OFFLINE STATUS
==================================*/

window.addEventListener("online",()=>{

showNotification("Internet Connected");

});

window.addEventListener("offline",()=>{

showNotification("Internet Disconnected");

});

/*==================================
      PREVENT FORM RESUBMIT
==================================*/

if(window.history.replaceState){

window.history.replaceState(
null,
null,
window.location.href
);

}

/*==================================
      IMAGE ERROR FIX
==================================*/

document.querySelectorAll("img").forEach(img=>{

img.onerror=function(){

this.src="HERO.PNG";

};

});

/*==================================
      PERFORMANCE
==================================*/

window.requestIdleCallback?.(()=>{

console.log("Website Optimized");

});

/*==================================
      END OF SCRIPT.JS
==================================*/
