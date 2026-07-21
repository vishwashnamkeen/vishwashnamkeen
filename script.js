// ================================
// VISHWASH NAMKEEN
// SCRIPT.JS PART 1
// ================================

// CART
let cart = [];

// CURRENT PRODUCT
let currentProduct = "";
let currentPrice = 0;
let currentQty = 1;

// ================================
// OPEN CART
// ================================

function toggleCart() {

    document.getElementById("cartDrawer").classList.toggle("active");

    document.getElementById("cartOverlay").classList.toggle("active");

}

function closeCart() {

    document.getElementById("cartDrawer").classList.remove("active");

    document.getElementById("cartOverlay").classList.remove("active");

}

// ================================
// BUY NOW POPUP
// ================================

function buyNow(product, price) {

    currentProduct = product;

    currentPrice = price;

    currentQty = 1;

    document.getElementById("popupProduct").innerHTML = product;

    document.getElementById("popupPrice").innerHTML = price;

    document.getElementById("popupQty").innerHTML = currentQty;

    document.getElementById("buyPopup").style.display = "flex";

}

function closePopup() {

    document.getElementById("buyPopup").style.display = "none";

}

// ================================
// CHANGE QTY
// ================================

function changeQty(value){

    currentQty += value;

    if(currentQty < 1){

        currentQty = 1;

    }

    document.getElementById("popupQty").innerHTML = currentQty;

}

// ================================
// ADD TO CART
// ================================

function addToCart(name, price){

    let item = cart.find(p => p.name === name);

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

}

// ================================
// ADD FROM POPUP
// ================================

function addPopupCart(){

    let item = cart.find(p=>p.name===currentProduct);

    if(item){

        item.qty += currentQty;

    }else{

        cart.push({

            name:currentProduct,

            price:currentPrice,

            qty:currentQty

        });

    }

    updateCart();

    closePopup();

    toggleCart();

}

// ================================
// UPDATE CART
// ================================

function updateCart(){

    let cartItems = document.getElementById("cartItems");

    let html = "";

    let total = 0;

    let count = 0;

    if(cart.length===0){

        cartItems.innerHTML="<p>Your Cart is Empty</p>";

        document.getElementById("cartCount").innerHTML="0";

        document.getElementById("cartCount2").innerHTML="0";

        document.getElementById("subTotal").innerHTML="0";

        document.getElementById("grandTotal").innerHTML="0";

        return;

    }

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        count += item.qty;

        html += `
        <div class="cart-item">

        <h3>${item.name}</h3>

        <p>₹${item.price}</p>

        <div class="qty">

        <button onclick="minusQty(${index})">-</button>

        <span>${item.qty}</span>

        <button onclick="plusQty(${index})">+</button>

        </div>

        <strong>

        ₹${item.price * item.qty}

        </strong>

        <button onclick="removeItem(${index})">

        Remove

        </button>

        </div>
        `;

    });

    cartItems.innerHTML = html;

    document.getElementById("cartCount").innerHTML = count;

    document.getElementById("cartCount2").innerHTML = count;

    document.getElementById("subTotal").innerHTML = total;

    document.getElementById("grandTotal").innerHTML = total + 50;

}
// ===============================
// PLUS QTY
// ===============================

function plusQty(index){

    cart[index].qty++;

    updateCart();

}

// ===============================
// MINUS QTY
// ===============================

function minusQty(index){

    cart[index].qty--;

    if(cart[index].qty<=0){

        cart.splice(index,1);

    }

    updateCart();

}

// ===============================
// REMOVE ITEM
// ===============================

function removeItem(index){

    if(confirm("Remove this item?")){

        cart.splice(index,1);

        updateCart();

    }

}

// ===============================
// CHECKOUT
// ===============================

function checkout(){

    if(cart.length==0){

        alert("Your cart is empty.");

        return;

    }

    placeOrder();

}

// ===============================
// WHATSAPP ORDER
// ===============================

function placeOrder(){

    let name=document.getElementById("customerName").value;

    let phone=document.getElementById("customerPhone").value;

    let pincode=document.getElementById("customerPincode").value;

    let address=document.getElementById("customerAddress").value;

    if(name=="" || phone=="" || pincode=="" || address==""){

        alert("Please fill all customer details.");

        return;

    }

    let message="🛒 *VISHWASH NAMKEEN ORDER*%0A%0A";

    message+="👤 Name : "+name+"%0A";

    message+="📞 Phone : "+phone+"%0A";

    message+="📍 Pincode : "+pincode+"%0A";

    message+="🏠 Address : "+address+"%0A%0A";

    message+="*Products*%0A";

    let total=0;

    cart.forEach(item=>{

        total+=item.price*item.qty;

        message+=item.name+" x "+item.qty+
        " = ₹"+(item.price*item.qty)+"%0A";

    });

    message+="%0A";

    message+="Delivery : ₹50%0A";

    message+="Total : ₹"+(total+50);

    window.open(

    "https://wa.me/918460183525?text="+message,

    "_blank"

    );

}

// ===============================
// UPI PAYMENT
// ===============================

function payUPI(){

    let total=0;

    cart.forEach(item=>{

        total+=item.price*item.qty;

    });

    total+=50;

    let upi="upi://pay?pa=92066158@oksbi&pn=Vishwash Namkeen&am="+total+"&cu=INR";

    window.location.href=upi;

}

// ===============================
// SEARCH
// ===============================

let search=document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

card.style.display=

card.innerText.toLowerCase().includes(value)

?"block":"none";

});

});

}

// ===============================
// MOBILE MENU
// ===============================

const menu=document.querySelector(".menu-btn");

const nav=document.querySelector(".nav-links");

if(menu){

menu.onclick=function(){

nav.classList.toggle("show");

}

}

// ===============================
// TOP BUTTON
// ===============================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(!topBtn) return;

if(window.scrollY>300){

topBtn.style.display="block";

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
// ===============================
// VISHWASH NAMKEEN
// SCRIPT.JS PART 3
// ===============================

// LOADER

window.addEventListener("load",function(){

let loader=document.getElementById("loader");

if(loader){

loader.style.display="none";

}

});

// ===============================
// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ===============================
// REVIEW AUTO SLIDER

let reviewIndex=0;

function reviewSlider(){

let reviews=document.querySelectorAll(".review-card");

if(reviews.length==0) return;

reviews.forEach(card=>{

card.style.display="none";

});

reviewIndex++;

if(reviewIndex>reviews.length){

reviewIndex=1;

}

reviews[reviewIndex-1].style.display="block";

setTimeout(reviewSlider,3000);

}

reviewSlider();

// ===============================
// SAVE CART

function saveCart(){

localStorage.setItem(

"vishwashCart",

JSON.stringify(cart)

);

}

// ===============================
// LOAD CART

function loadCart(){

let saved=

localStorage.getItem(

"vishwashCart"

);

if(saved){

cart=JSON.parse(saved);

updateCart();

}

}

loadCart();

// ===============================
// UPDATE SAVE

const oldUpdateCart=updateCart;

updateCart=function(){

oldUpdateCart();

saveCart();

}

// ===============================
// PINCODE CHECK

function checkPincode(){

let pin=document.getElementById("customerPincode");

if(!pin) return;

let value=pin.value;

if(value.length!=6){

alert("Enter Valid Pincode");

return false;

}

alert("Delivery Available");

return true;

}

// ===============================
// BUY PRODUCT

function buyProduct(){

addPopupCart();

checkout();

}

// ===============================
// SUCCESS MESSAGE

function orderSuccess(){

alert(

"Thank You ❤️\n\nYour Order Has Been Placed Successfully."

);

}

// ===============================
// ENTER KEY SEARCH

let searchInput=document.getElementById("search");

if(searchInput){

searchInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){

e.preventDefault();

}

});

}

// ===============================
// ANIMATION

const cards=document.querySelectorAll(".product-card");

window.addEventListener("scroll",()=>{

cards.forEach(card=>{

let top=card.getBoundingClientRect().top;

if(top<window.innerHeight-100){

card.classList.add("show");

}

});

});

// ===============================
// READY

console.log("✅ Vishwash Namkeen Website Loaded Successfully");
