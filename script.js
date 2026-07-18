// =========================
// Vishwas Namkeen Script
// Part 1A
// =========================

let cart = [];
let total = 0;

// Add Product
function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(name + " Added To Cart");
}

// Update Cart
function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");
    let popupTotal = document.getElementById("popupTotal");

    cartItems.innerHTML = "";

    total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        totalBox.innerHTML = "0";

        if (popupTotal) {
            popupTotal.innerHTML = "0";
        }

        return;
    }

    cart.forEach(function(item, index) {

        total += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

        <h3>${item.name}</h3>

        <p>₹${item.price}</p>

        <button onclick="removeItem(${index})">

        Remove

        </button>

        </div>

        `;

    });

    totalBox.innerHTML = total;

    if (popupTotal) {
        popupTotal.innerHTML = total;
    }

}

// Remove Product
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

// Checkout
function checkout() {

    if(cart.length==0){

        alert("Your Cart Is Empty");

        return;

    }

    document.getElementById("checkout").scrollIntoView({

        behavior:"smooth"

    });
    // =========================
// Vishwas Namkeen Script
// Part 1B
// =========================

// Auto Image Slider

let slideIndex = 0;

const slides = document.querySelectorAll(".slide");

function showSlides() {

    slides.forEach((slide) => {

        slide.style.display = "none";

    });

    slideIndex++;

    if (slideIndex > slides.length) {

        slideIndex = 1;

    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3000);

}

if (slides.length > 0) {

    showSlides();

}

// Dark Mode

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {

    darkBtn.onclick = function () {

        document.body.classList.toggle("dark");

    };

}

// Open Order Popup

function openPopup(product, price) {

    document.getElementById("orderPopup").style.display = "block";

    document.getElementById("productName").value = product;

    document.getElementById("productPrice").value = price;

    document.getElementById("popupTotal").innerHTML = price;

}

// Close Popup

function closePopup() {

    document.getElementById("orderPopup").style.display = "none";

}

// Quantity Change

const qty = document.getElementById("quantity");

if (qty) {

    qty.addEventListener("input", function () {

        let price = Number(document.getElementById("productPrice").value);

        let quantity = Number(this.value);

        if (quantity < 1) quantity = 1;

        document.getElementById("popupTotal").innerHTML = price * quantity;

    })// =========================
// Vishwas Namkeen Script
// Part 2
// =========================

// Payment Method

function paymentChange() {

    let method = document.getElementById("paymentMethod").value;

    let upiBox = document.getElementById("upiBox");

    if(method=="UPI"){

        upiBox.style.display="block";

    }else{

        upiBox.style.display="none";

    }

}

// Copy UPI

function copyUPI(){

    navigator.clipboard.writeText("n92066158@oksbi");

    alert("UPI ID Copied Successfully");

}

// Place Order

function placeOrder(){
    

    let name=document.getElementById("customerName").value.trim();

    let mobile=document.getElementById("customerMobile").value.trim();

    let address=document.getElementById("customerAddress").value.trim();

    let city=document.getElementById("customerCity").value.trim();

    let state=document.getElementById("customerState").value.trim();

    let pin=document.getElementById("customerPincode").value.trim();

    let payment=document.getElementById("paymentMethod").value;

    if(cart.length==0){

        alert("Your Cart Is Empty");

        return;

    }

    if(name==""||mobile==""||address==""||city==""||state==""){

        alert("Please Fill All Details");

        return;

    }

    if(mobile.length!=10){

        alert("Enter Valid Mobile Number");

        return;

    }

    if(pin.length!=6){

        alert("Enter Valid 6 Digit PIN Code");

        return;

    }

    if(payment==""){

        alert("Select Payment Method");

        return;

    }

    let orderId="VN"+Math.floor(Math.random()*900000+100000);
     createTracking(orderId);
    document.getElementBodyId("orderId").innerHTML =orderId;

    document.getElementById("orderId").innerHTML=orderId;

    document.getElementById("orderSuccess").style.display="block";

    let message="🛒 Vishwas Namkeen Order%0A%0A";

    cart.forEach(function(item){

        message+=item.name+" - ₹"+item.price+"%0A";

    });

    message+="%0ATotal : ₹"+total;

    message+="%0A%0AName : "+name;

    message+="%0AMobile : "+mobile;

    message+="%0AAddress : "+address;

    message+="%0ACity : "+city;

    message+="%0APIN : "+pin;

    message+="%0APayment : "+payment;

    window.open("https://wa.me/918460183525?text="+message,"_blank");


}
    // ===============================
// Vishwas Namkeen Pro Script 1A
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let gstRate = 5;
let deliveryCharge = 40;
let couponDiscount = 0;

// Save Cart

function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

}

// Add Product

function addToCart(name,price){

    let item = cart.find(p=>p.name===name);

    if(item){

        item.qty++;

    }else{

        cart.push({

            name:name,

            price:price,

            qty:1

        });

    }

    saveCart();

    updateCart();

    showToast(name+" Added To Cart");

}

// Update Cart

function updateCart(){

    let cartBox=document.getElementById("cart-items");

    let totalBox=document.getElementById("total");

    let productTotal=document.getElementById("productTotal");

    let gst=document.getElementById("gstAmount");

    let delivery=document.getElementById("deliveryCharge");

    let grand=document.getElementById("grandTotal");

    cartBox.innerHTML="";

    let subtotal=0;

    if(cart.length==0){

        cartBox.innerHTML="<p>Your Cart Is Empty</p>";

        totalBox.innerHTML="0";

        return;

    }

    cart.forEach((item,index)=>{

        subtotal += item.price*item.qty;

        cartBox.innerHTML += `

<div class="cart-item">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<div>

<button onclick="decreaseQty(${index})">-</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

`;

    });

    let gstValue=(subtotal*gstRate)/100;

    let grandTotal=subtotal+gstValue+deliveryCharge-couponDiscount;

    totalBox.innerHTML=subtotal;

    if(productTotal) productTotal.innerHTML="₹"+subtotal;

    if(gst) gst.innerHTML="₹"+gstValue;

    if(delivery) delivery.innerHTML="₹"+deliveryCharge;

    if(grand) grand.innerHTML="₹"+grandTotal;

    saveCart();

}

// Increase Qty

function increaseQty(index){

    cart[index].qty++;

    updateCart();

}

// Decrease Qty

function decreaseQty(index){

    if(cart[index].qty>1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

// Remove Item

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

// Toast

function showToast(msg){

    alert(msg);

}

updateCart();// ===============================
// Vishwas Namkeen Pro Script 1B
// ===============================

// Coupon Code

function applyCoupon() {

    let code = document.getElementById("coupon").value.trim().toUpperCase();

    if (code == "VISHWAS10") {

        couponDiscount = 10;

        alert("Coupon Applied Successfully");

    } else {

        couponDiscount = 0;

        alert("Invalid Coupon");

    }

    updateCart();

}

// Checkout

function checkout() {

    if (cart.length == 0) {

        alert("Your Cart Is Empty");

        return;

    }

    document.getElementById("checkout").scrollIntoView({

        behavior: "smooth"

    });

}

// Auto Image Slider

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

function autoSlider() {

    if (slides.length == 0) return;

    slides.forEach(function(slide) {

        slide.style.display = "none";

    });

    currentSlide++;

    if (currentSlide > slides.length) {

        currentSlide = 1;

    }

    slides[currentSlide - 1].style.display = "block";

    setTimeout(autoSlider, 3000);

}

window.onload = function () {

    updateCart();

    autoSlider();

};

// Dark Mode

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {

    darkBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("dark") ? "dark" : "light"

        );

    });

}

if (localStorage.getItem("theme") == "dark") {

    document.body.classList.add("dark");

}

// Product Search

function searchProducts() {

    let input = document.getElementById("searchBox").value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        let name = card.querySelector("h3").innerText.toLowerCase();

        if (name.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}// ===============================
// Vishwas Namkeen Pro Script 2A
// ===============================

// Payment Method Change

function paymentChange() {

    let payment = document.getElementById("paymentMethod").value;

    let upiBox = document.getElementById("upiBox");

    if (payment == "UPI") {

        upiBox.style.display = "block";

    } else {

        upiBox.style.display = "none";

    }

}

// PIN Code Validation

async function checkPincode() {

    let pin = document.getElementById("customerPincode").value;

    if (pin.length != 6) {

        return;

    }

    try {

        let res = await fetch("https://api.postalpincode.in/pincode/" + pin);

        let data = await res.json();

        if (data[0].Status == "Success") {

            let post = data[0].PostOffice[0];

            document.getElementById("customerCity").value = post.District;

            document.getElementById("customerState").value = post.State;

            document.getElementById("pinMessage").innerHTML =
            "✅ Delivery Available";

            document.getElementById("pinMessage").style.color = "green";

        } else {

            document.getElementById("pinMessage").innerHTML =
            "❌ Invalid PIN Code";

            document.getElementById("pinMessage").style.color = "red";

        }

    } catch (e) {

        console.log(e);

    }

}

// Check PIN Automatically

let pinInput = document.getElementById("customerPincode");

if (pinInput) {

    pinInput.addEventListener("keyup", checkPincode);

}

// Copy UPI

function copyUPI() {

    navigator.clipboard.writeText("n92066158@oksbi");

    alert("UPI ID Copied Successfully");

}

// Open UPI App

function openUPI() {

    let amount = document.getElementById("grandTotal").innerText.replace("₹","");

    let url =
    "upi://pay?pa=n92066158@oksbi&pn=Nikhil%20Vaishnav&am=" +
    amount +
    "&cu=INR";

    window.location.href = url;

}// ===============================
// Vishwas Namkeen Pro Script 2B
// ===============================

// Place Order

function placeOrder() {

    let name = document.getElementById("customerName").value.trim();
    let mobile = document.getElementById("customerMobile").value.trim();
    let address = document.getElementById("customerAddress").value.trim();
    let city = document.getElementById("customerCity").value.trim();
    let state = document.getElementById("customerState").value.trim();
    let pin = document.getElementById("customerPincode").value.trim();
    let payment = document.getElementById("paymentMethod").value;

    if (cart.length == 0) {
        alert("Your cart is empty.");
        return;
    }

    if (!name || !mobile || !address || !city || !state || !pin) {
        alert("Please fill all details.");
        return;
    }

    if (mobile.length != 10) {
        alert("Enter a valid 10 digit mobile number.");
        return;
    }

    if (pin.length != 6) {
        alert("Enter a valid PIN code.");
        return;
    }

    if (payment == "") {
        alert("Select payment method.");
        return;
    }

    let orderId = "VN" + Date.now();

    let history = JSON.parse(localStorage.getItem("orders")) || [];

    history.push({
        orderId: orderId,
        customer: name,
        mobile: mobile,
        total: document.getElementById("grandTotal").innerText,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(history));

    let message = "🛒 *Vishwas Namkeen Order*%0A%0A";

    cart.forEach(function(item) {

        message +=
        "• " +
        item.name +
        " x " +
        item.qty +
        " = ₹" +
        (item.price * item.qty) +
        "%0A";

    });

    message += "%0AOrder ID : " + orderId;

    message += "%0AName : " + name;

    message += "%0AMobile : " + mobile;

    message += "%0AAddress : " + address;

    message += "%0ACity : " + city;

    message += "%0AState : " + state;

    message += "%0APIN : " + pin;

    message += "%0APayment : " + payment;

    message += "%0ATotal : " +
    document.getElementById("grandTotal").innerText;

    window.open(
        "https://wa.me/918460183525?text=" + message,
        "_blank"
    );

    alert(
        "Order Placed Successfully!\nOrder ID : " +
        orderId
    );

    cart = [];
    saveCart();
    updateCart();

}

// View Order History

function viewOrders() {

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    console.log(orders);

}// ===============================
// Vishwas Namkeen Pro Script 3A
// Live Order Tracking
// ===============================

// Current Status
let orderStatus = [
    "Order Received",
    "Preparing",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
];

// Create Order Tracking
function createTracking(orderId){

    let tracking = {

        id: orderId,

        status: 0,

        date: new Date().toLocaleString()

    };

    localStorage.setItem(
        "tracking_"+orderId,
        JSON.stringify(tracking)
    );

}

// Update Tracking

function updateTracking(orderId){

    let data = JSON.parse(
        localStorage.getItem("tracking_"+orderId)
    );

    if(!data) return;

    if(data.status < orderStatus.length-1){

        data.status++;

        localStorage.setItem(
            "tracking_"+orderId,
            JSON.stringify(data)
        );

    }

}

// Track Order

function trackOrder(){

    let id = prompt("Enter Order ID");

    if(!id) return;

    let data = JSON.parse(
        localStorage.getItem("tracking_"+id)
    );

    if(!data){

        alert("Order Not Found");

        return;

    }

    let msg =
    "Order ID : "+id+
    "\n\nStatus : "+
    orderStatus[data.status]+
    "\n\nOrder Date : "+
    data.date;

    alert(msg);

}

// Delivery Date

function getDeliveryDate(){

    let d = new Date();

    d.setDate(d.getDate()+4);

    return d.toDateString();

}

// Estimated Delivery

function showDelivery(){

    let box=document.getElementById("deliveryDate");

    if(box){

        box.innerHTML=
        "Estimated Delivery : "+
        getDeliveryDate();

    }

}

// Auto Run

showDelivery();

}
