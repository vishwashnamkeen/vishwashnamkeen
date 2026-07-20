/* ===========================
   RESET
=========================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

html{
    scroll-behavior:smooth;
}

body{
    background:linear-gradient(135deg,#000000,#220000,#5a0000,#000000);
    background-size:400% 400%;
    animation:bgMove 12s ease infinite;
    color:#fff;
    overflow-x:hidden;
}

@keyframes bgMove{

0%{
background-position:0% 50%;
}

50%{
background-position:100% 50%;
}

100%{
background-position:0% 50%;
}

}

a{
    text-decoration:none;
    color:white;
}

img{
    width:100%;
    display:block;
}

/* ===========================
HEADER
=========================== */

.header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px 8%;
    background:rgba(0,0,0,.85);
    position:sticky;
    top:0;
    z-index:999;
    backdrop-filter:blur(10px);
}

.logo h1{
    color:#FFD700;
    font-size:32px;
}

.logo span{
    color:#ffffff;
}

.logo p{
    color:#ddd;
    font-size:14px;
}

.menu-btn{
    font-size:28px;
    color:#FFD700;
    cursor:pointer;
}

/* ===========================
NAVBAR
=========================== */

.navbar{
    display:flex;
    justify-content:center;
    gap:30px;
    padding:15px;
    background:#111;
}

.navbar a{
    color:white;
    font-weight:600;
    transition:.3s;
}

.navbar a:hover{
    color:#FFD700;
}

.order-btn{
    background:#FFD700;
    color:#000 !important;
    padding:10px 22px;
    border-radius:30px;
    font-weight:bold;
    /* ===========================
   HERO SECTION
=========================== */

.hero{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:70px 8%;
    gap:50px;
    flex-wrap:wrap;
}

.hero-text{
    flex:1;
}

.hero-text h2{
    color:#FFD700;
    font-size:24px;
    margin-bottom:10px;
}

.hero-text h1{
    font-size:55px;
    line-height:1.2;
    margin-bottom:20px;
}

.hero-text span{
    color:#FFD700;
}

.hero-text p{
    color:#ddd;
    font-size:18px;
    margin-bottom:30px;
}

.btn{
    display:inline-block;
    padding:14px 35px;
    background:#FFD700;
    color:#000;
    border-radius:30px;
    font-weight:bold;
    transition:.3s;
}

.btn:hover{
    background:#fff;
    transform:scale(1.05);
}

/* ===========================
   HERO IMAGE SLIDER
=========================== */

.hero-image{
    flex:1;
    text-align:center;
}

.hero-image img{
    width:100%;
    max-width:500px;
    border-radius:20px;
    box-shadow:0 0 25px rgba(255,215,0,.4);
}

/* ===========================
   PRODUCTS
=========================== */

.products{
    padding:80px 8%;
}

.section-title{
    text-align:center;
    font-size:40px;
    color:#FFD700;
    margin-bottom:40px;
}

.product-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:30px;
}

.product-card{
    background:#111;
    border:2px solid #FFD700;
    border-radius:18px;
    overflow:hidden;
    transition:.3s;
    text-align:center;
    padding:20px;
}

.product-card:hover{
    transform:translateY(-10px);
    box-shadow:0 0 25px rgba(255,215,0,.4);
}

.product-card img{
    width:100%;
    height:250px;
    object-fit:contain;
}

.product-card h3{
    margin-top:15px;
    color:#FFD700;
}

.product-card p{
    color:#ccc;
    margin:10px 0;
}

.buy-btn{
    display:inline-block;
    padding:10px 25px;
    background:#FFD700;
    color:#000;
    border-radius:25px;
    font-weight:bold;
    transition:.3s;
}

.buy-btn:hover{
    background:#fff;
}
    /* ===========================
   ABOUT SECTION
=========================== */

.about{
    padding:80px 8%;
    text-align:center;
}

.about h2{
    color:#FFD700;
    font-size:40px;
    margin-bottom:20px;
}

.about p{
    max-width:900px;
    margin:auto;
    color:#ddd;
    line-height:1.8;
    font-size:18px;
}

/* ===========================
   CUSTOMER REVIEWS
=========================== */

.reviews{
    padding:80px 8%;
    text-align:center;
}

.reviews h2{
    color:#FFD700;
    margin-bottom:40px;
    font-size:40px;
}

.review-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
    gap:25px;
}

.review-card{
    background:#111;
    border:2px solid #FFD700;
    border-radius:18px;
    padding:25px;
    transition:.3s;
}

.review-card:hover{
    transform:translateY(-8px);
}

.review-card h3{
    color:#FFD700;
    margin-bottom:10px;
}

.review-card .stars{
    color:#FFD700;
    font-size:22px;
    margin-bottom:10px;
}

.review-card p{
    color:#ddd;
}

/* ===========================
   CONTACT
=========================== */

.contact{
    padding:80px 8%;
    text-align:center;
}

.contact h2{
    color:#FFD700;
    font-size:40px;
    margin-bottom:25px;
}

.contact p{
    margin:10px 0;
    font-size:18px;
}

.contact-buttons{
    margin-top:30px;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:20px;
}

.whatsapp-btn,
.call-btn{
    background:#FFD700;
    color:#000;
    padding:14px 30px;
    border-radius:30px;
    font-weight:bold;
    transition:.3s;
}

.whatsapp-btn:hover,
.call-btn:hover{
    background:#fff;
}

/* ===========================
   FOOTER
=========================== */

footer{
    background:#000;
    text-align:center;
    padding:40px 20px;
    margin-top:50px;
    border-top:2px solid #FFD700;
}

footer h3{
    color:#FFD700;
    margin-bottom:15px;
}

footer p{
    color:#ccc;
    margin:8px 0;
}

.social{
    margin:20px 0;
}

.social a{
    color:#FFD700;
    font-size:28px;
    margin:0 12px;
    transition:.3s;
}

.social a:hover{
    color:#fff;
}

.copy{
    font-size:14px;
    color:#888;
}

/* ===========================
   RESPONSIVE
=========================== */

@media(max-width:768px){

.header{
flex-direction:column;
text-align:center;
}

.navbar{
flex-wrap:wrap;
gap:15px;
}

.hero{
flex-direction:column;
text-align:center;
}

.hero-text h1{
font-size:38px;
}

.hero-image img{
max-width:350px;
}

.section-title,
.about h2,
.contact h2,
.reviews h2{
font-size:32px;
}

.contact-buttons{
flex-direction:column;
align-items:center;
}

}
// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("show");
});

// ==========================
// HERO BANNER AUTO SLIDER
// ==========================

const bannerImages = [
    "banner1.jpg",
    "banner2.jpg"
];

const heroImage = document.querySelector(".hero-image img");

let bannerIndex = 0;

setInterval(() => {

    bannerIndex++;

    if (bannerIndex >= bannerImages.length) {
        bannerIndex = 0;
    }

    heroImage.src = bannerImages[bannerIndex];

}, 3000);

// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});/* ===========================
   EXTRA ANIMATIONS
=========================== */

html{
    scroll-behavior:smooth;
}

.product-card{
    transition:0.4s;
}

.product-card:hover{
    transform:translateY(-10px) scale(1.03);
    box-shadow:0 0 20px rgba(255,215,0,0.4);
}

button,
.btn{
    transition:0.3s;
}

button:hover,
.btn:hover{
    transform:scale(1.05);
}

img{
    max-width:100%;
    height:auto;
}
/* ===========================
   PRODUCT IMAGE ANIMATION
=========================== */

.product-card img{
    transition:0.5s;
}

.product-card:hover img{
    transform:scale(1.08);
}

/* ===========================
   GOLDEN SCROLLBAR
=========================== */

::-webkit-scrollbar{
    width:10px;
}

::-webkit-scrollbar-track{
    background:#111;
}

::-webkit-scrollbar-thumb{
    background:#FFD700;
    border-radius:20px;
}

::-webkit-scrollbar-thumb:hover{
    background:#ffcc00;
}

/* ===========================
   SELECTION COLOR
=========================== */

::selection{
    background:#FFD700;
    color:#000;
}

/* ===========================
   INPUT BOX
=========================== */

input,
textarea,
select{
    width:100%;
    padding:14px;
    margin:10px 0;
    border:2px solid #FFD700;
    border-radius:10px;
    background:#111;
    color:#fff;
    font-size:16px;
}

input:focus,
textarea:focus,
select:focus{
    outline:none;
    box-shadow:0 0 15px #FFD700;
}

/* ===========================
   BUY BUTTON
=========================== */

.buy-btn{
    width:100%;
    padding:15px;
    background:#FFD700;
    color:#000;
    font-size:18px;
    font-weight:bold;
    border:none;
    border-radius:10px;
    cursor:pointer;
    transition:.3s;
}

.buy-btn:hover{
    background:#fff;
    transform:scale(1.03);
}
// ==========================
// PRODUCT SLIDER
// ==========================

const slider = document.querySelector(".product-slider");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if(nextBtn && prevBtn && slider){

nextBtn.onclick = () =>{
slider.scrollBy({
left:320,
behavior:"smooth"
});
}

prevBtn.onclick = () =>{
slider.scrollBy({
left:-320,
behavior:"smooth"
});
}

}

// ==========================
// AUTO PRODUCT SLIDER
// ==========================

if(slider){

setInterval(()=>{

slider.scrollBy({
left:320,
behavior:"smooth"
});

if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth-10){

slider.scrollTo({
left:0,
behavior:"smooth"
});

}

},3000);

}

// ==========================
// QUANTITY & TOTAL PRICE
// ==========================

const qtyInput=document.getElementById("qty");
const plus=document.getElementById("plus");
const minus=document.getElementById("minus");
const total=document.getElementById("total");

const price=120;

function updateTotal(){

if(!qtyInput || !total) return;

let qty=parseInt(qtyInput.value);

if(qty<1) qty=1;

qtyInput.value=qty;

total.innerHTML="₹"+(qty*price);

}

if(plus){

plus.onclick=()=>{

qtyInput.value=parseInt(qtyInput.value)+1;

updateTotal();

}

}

if(minus){

minus.onclick=()=>{

if(parseInt(qtyInput.value)>1){

qtyInput.value=parseInt(qtyInput.value)-1;

updateTotal();

}

}

}

updateTotal();
// ==========================
// BUY NOW BUTTON
// ==========================

const buyBtn = document.getElementById("buyNow");

if (buyBtn) {

buyBtn.addEventListener("click", function () {

const qty = document.getElementById("qty").value;
const total = document.getElementById("total").innerText;

let name = prompt("Enter Your Name");

if (!name) return;

let mobile = prompt("Enter Mobile Number");

if (!mobile) return;

let address = prompt("Enter Full Address");

if (!address) return;

let pincode = prompt("Enter Pincode");

if (!pincode) return;

let upi = "8460183525@ibl";

let message =
"Name : " + name +
"\nMobile : " + mobile +
"\nAddress : " + address +
"\nPincode : " + pincode +
"\nQuantity : " + qty +
"\nTotal : " + total +
"\n\nPay using UPI ID\n" + upi;

alert(message);

window.open(
"upi://pay?pa=" +
upi +
"&pn=Vishwash Namkeen&am=" +
total.replace("₹","") +
"&cu=INR"
);

});

}

// ==========================
// PRODUCT CARD CLICK
// ==========================

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("click",()=>{

card.scrollIntoView({
behavior:"smooth",
block:"center"
});

});

});

// ==========================
// SIMPLE FADE ANIMATION
// ==========================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".product-card,.review-card").forEach(item=>{

observer.observe(item);

});

// ==========================
// LOADING FINISHED
// ==========================

console.log("Vishwash Namkeen Website Loaded Successfully");
// ==========================
// BACK TO TOP BUTTON
// ==========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

if(window.scrollY > 300){

if(topBtn){
topBtn.style.display="block";
}

}else{

if(topBtn){
topBtn.style.display="none";
}

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

// ==========================
// SEARCH PRODUCTS
// ==========================

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",()=>{

let value=search.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

let text=card.innerText.toLowerCase();

if(text.includes(value)){
card.style.display="block";
}else{
card.style.display="none";
}

});

});

}

// ==========================
// CURRENT YEAR
// ==========================

const year=document.getElementById("year");

if(year){
year.innerHTML=new Date().getFullYear();
}

    
}
