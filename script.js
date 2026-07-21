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

function orderNow(product) {
    let qty = prompt("Kitne Packet Chahiye?");

    if (qty && qty > 0) {
        let message =
`Hello Vishwash Namkeen,

Mujhe order karna hai.

Product: ${product}
Quantity: ${qty} Packet`;

        let url = "https://wa.me/918460183525?text=" + encodeURIComponent(message);
        window.open(url, "_blank");
    }
}
let cart = [];

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    updateCart();
}

function updateCart() {
    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        html += `
        <div class="cart-item">
            <b>${item.name}</b><br>

            <button onclick="changeQty(${index},-1)">-</button>

            ${item.qty}

            <button onclick="changeQty(${index},1)">+</button>

            ₹${item.price * item.qty}

            <button onclick="removeItem(${index})">❌</button>
        </div><hr>
        `;
    });

    document.getElementById("cartItems").innerHTML = html;
    document.getElementById("cartTotal").innerHTML = "₹ " + total;
}

function changeQty(index,val){
    cart[index].qty += val;

    if(cart[index].qty<=0){
        cart.splice(index,1);
    }

    updateCart();
}

function removeItem(index){
    cart.splice(index,1);
    updateCart();
}
// ==========================================
// SHOPPING CART
// ==========================================

let cart = [];


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(product, price, qtyId) {

    let quantityInput = document.getElementById(qtyId);

    let quantity = 1;

    if (quantityInput) {
        quantity = parseInt(quantityInput.value) || 1;
    }

    // Check if product already exists
    let existingProduct = cart.find(
        item => item.name === product
    );

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            name: product,
            price: Number(price),
            quantity: quantity
        });

    }

    updateCart();

    // Scroll to cart
    let cartSection = document.getElementById("shopping-cart");

    if (cartSection) {
        cartSection.scrollIntoView({
            behavior: "smooth"
        });
    }

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    let cartItems = document.getElementById("cartItems");

    let cartTotal = document.getElementById("cartTotal");

    let totalItems = document.getElementById("totalItems");

    let cartSubtotal = document.getElementById("cartSubtotal");

    if (!cartItems) return;


    // Empty Cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>

                <h3>Your cart is empty</h3>

                <p>Add products to your cart.</p>
            </div>
        `;

        if (cartTotal) {
            cartTotal.innerText = "0";
        }

        if (cartSubtotal) {
            cartSubtotal.innerText = "0";
        }

        if (totalItems) {
            totalItems.innerText = "0";
        }

        return;
    }


    let html = "";

    let subtotal = 0;

    let itemCount = 0;


    // Create Cart Items
    cart.forEach((item, index) => {

        let itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;

        itemCount += item.quantity;


        html += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>


                <div class="quantity-box">

                    <button
                        onclick="changeQty(${index}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQty(${index}, 1)">
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    cartItems.innerHTML = html;


    // Delivery Charge
    let delivery = 0;

    if (subtotal > 0 && subtotal < 500) {
        delivery = 50;
    }


    // Final Total
    let finalTotal =
        subtotal + delivery;


    // Update Subtotal
    if (cartSubtotal) {
        cartSubtotal.innerText =
            subtotal;
    }


    // Update Total
    if (cartTotal) {
        cartTotal.innerText =
            finalTotal;
    }


    // Update Item Count
    if (totalItems) {
        totalItems.innerText =
            itemCount;
    }

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQty(index, change) {

    if (!cart[index]) return;


    cart[index].quantity += change;


    // Quantity minimum 1
    if (cart[index].quantity < 1) {

        cart[index].quantity = 1;

    }


    updateCart();

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(index) {

    if (!cart[index]) return;


    let confirmRemove =
        confirm("Remove this product from cart?");


    if (confirmRemove) {

        cart.splice(index, 1);

        updateCart();

    }

}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your shopping cart is empty."
        );

        return;

    }


    let paymentMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (!paymentMethod) {

        alert(
            "Please select a payment method."
        );

        return;

    }


    if (
        paymentMethod.value === "upi"
    ) {

        payWithUPI();

    } else {

        placeOrder();

    }

}


// ==========================================
// UPI PAYMENT
// ==========================================

function payWithUPI() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    let total = calculateTotal();


    /*
       IMPORTANT:

       Yahan apna UPI ID likho.

       Example:
       yourname@upi

       Isko apne actual UPI ID se replace karo.
    */

    let upiId =
        "yourupi@upi";


    let merchantName =
        "My Online Store";


    let upiUrl =
        "upi://pay" +
        "?pa=" + encodeURIComponent(upiId) +
        "&pn=" + encodeURIComponent(merchantName) +
        "&am=" + total +
        "&cu=INR";


    // Open UPI App
    window.location.href =
        upiUrl;

}


// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal() {

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;

    });


    let delivery = 0;


    if (
        subtotal > 0 &&
        subtotal < 500
    ) {

        delivery = 50;

    }


    return subtotal + delivery;

}


// ==========================================
// WHATSAPP ORDER
// ==========================================

function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    // Customer Details
    let name =
        document.getElementById(
            "customerName"
        )?.value.trim();


    let phone =
        document.getElementById(
            "customerPhone"
        )?.value.trim();


    let address =
        document.getElementById(
            "customerAddress"
        )?.value.trim();


    let note =
        document.getElementById(
            "orderNote"
        )?.value.trim();


    // Check Details
    if (
        !name ||
        !phone ||
        !address
    ) {

        alert(
            "Please fill your name, mobile number and delivery address."
        );

        return;

    }


    let message =
        "🛒 *NEW ORDER*%0A%0A";


    message +=
        "*Customer Details*%0A";

    message +=
        "Name: " +
        encodeURIComponent(name) +
        "%0A";

    message +=
        "Phone: " +
        encodeURIComponent(phone) +
        "%0A";

    message +=
        "Address: " +
        encodeURIComponent(address) +
        "%0A%0A";


    message +=
        "*Order Details*%0A";


    cart.forEach(item => {

        let itemTotal =
            item.price *
            item.quantity;


        message +=
            encodeURIComponent(
                item.name
            ) +
            " x " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "%0A";

    });


    let total =
        calculateTotal();


    message +=
        "%0A*Total Amount: ₹" +
        total +
        "*%0A";


    if (note) {

        message +=
            "%0ANote: " +
            encodeURIComponent(note);

    }


    /*
       IMPORTANT:

       Yahan apna WhatsApp number likho.

       Country code ke saath.

       India example:
       919876543210

       + ya spaces mat lagana.
    */

    let whatsappNumber =
        "919876543210";


    let whatsappUrl =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    window.open(
        whatsappUrl,
        "_blank"
    );

}


// ==========================================
// LOAD CART
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCart();

    }
);
