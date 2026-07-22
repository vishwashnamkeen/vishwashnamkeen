// 1. PRODUCT DATABASE
const products = [
    { id: 1, name: "Bhakarwadi", price: 120, image: "BHAKARWADI.PNG.png" },
    { id: 2, name: "Bingo Masala", price: 100, image: "BINGOMASALA.PNG.png" },
    { id: 3, name: "Bingo Pani Puri", price: 100, image: "BINGOPANIPURI.PNG.png" },
    { id: 4, name: "Masala Banana Wafers", price: 140, image: "MASALABANANAWEFERS.PNG.png" },
    { id: 5, name: "Methi Puri", price: 110, image: "METHIPURI.PNG.jpeg" },
    { id: 6, name: "Nadiyadi Mix", price: 130, image: "NADIYADIMIX.PNG.png" },
    { id: 7, name: "Punjabi Mix", price: 150, image: "PUNJABIMIX.PNG.png" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// 2. PAGE INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartUI();
});

// 3. RENDER PRODUCTS TO HOME GRID
function renderProducts() {
    const grid = document.getElementById('product-list');
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <span class="badge">Fresh</span>
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p style="color:var(--brand-red); font-weight:bold;">₹${p.price}</p>
            <br>
            <button onclick="addToCart(${p.id})" class="btn btn-red">Add to Cart</button>
            <button onclick="toggleWishlist(${p.id})" class="btn btn-red-outline"><i class="fa-solid fa-heart"></i></button>
        </div>
    `).join('');
}

// 4. ADD TO CART
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    alert(`${item.name} Cart me add ho gaya hai!`);
}

// 5. WISHLIST FUNCTIONALITY
function toggleWishlist(id) {
    const item = products.find(p => p.id === id);
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    const wishCountElem = document.getElementById('wishlist-count');
    if (wishCountElem) {
        wishCountElem.innerText = wishlist.length;
    }
    
    alert(`${item.name} Wishlist me add ho gaya hai! Top navigation se Wishlist open karein.`);
}

function updateCartUI() {
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) {
        cartCountElem.innerText = cart.length;
    }
}

// 6. PROCESS WHATSAPP ORDER (Ye Hamesha Last Me Rahega)
function processWhatsAppOrder(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert("Cart me koi item nahi hai!");
        return;
    }

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const pincode = document.getElementById('custPincode').value;

    let itemsList = "";
    let total = 0;
    cart.forEach((item, index) => {
        itemsList += `${index + 1}. *${item.name}* - ₹${item.price}%0A`;
        total += item.price;
    });

    const msg = `*--- NEW ORDER - VISHWASH NAMKEEN ---*%0A%0A` +
                `*Name:* ${name}%0A*Phone:* ${phone}%0A*Address:* ${address}, ${pincode}%0A%0A` +
                `*Items:*%0A${itemsList}%0A` +
                `*Total Amount:* ₹${total}`;

    // Open WhatsApp URL in new tab
    window.open(`https://wa.me/918460183525?text=${msg}`, '_blank');

    // Reset Cart & UI
    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();
    
    alert("Order message ready hai. WhatsApp par Send daba kar wapas website par aayein!");
}
