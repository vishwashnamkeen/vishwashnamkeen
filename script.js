// MULTI-PAGE VIEW ROUTING
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-view');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// MOBILE MENU TOGGLE
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
}

// STORAGE FOR CART AND WISHLIST
let cart = [];
let wishlist = [];

// WISHLIST LOGIC WITH DIRECT QUANTITY & BUY OPTION
function toggleWishlist(name, price, img) {
    const index = wishlist.findIndex(item => item.name === name);
    if (index > -1) {
        wishlist.splice(index, 1);
        alert(`${name} Wishlist se hata diya gaya hai.`);
    } else {
        wishlist.push({ name: name, price: price, img: img });
        alert(`${name} Wishlist me add ho gaya hai!`);
    }
    updateWishlistUI();
}

function updateWishlistUI() {
    const container = document.getElementById('wishlistContainer');
    const badge = document.getElementById('wishlistBadge');
    const navCount = document.getElementById('wishlistCountNav');
    
    badge.innerText = wishlist.length;
    navCount.innerText = wishlist.length;

    if (wishlist.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color:#64748b; font-size:16px;">Aapne abhi koi product wishlist me save nahi kiya hai.</p>';
        return;
    }

    let html = '';
    wishlist.forEach((item, idx) => {
        html += `
            <div class="product-card" style="padding:15px; text-align:center;">
                <img src="${item.img}" alt="${item.name}" style="height:120px; object-fit:contain;">
                <h3 style="font-size:16px; margin: 10px 0; color:#0a192f;">${item.name}</h3>
                <p style="color:#d90429; font-weight:bold; font-size:18px;">₹${item.price}</p>
                <div style="display:flex; gap:8px; margin-top:12px;">
                    <button onclick="addToOrder('${item.name}', ${item.price}, '${item.img}')" style="flex:1; background:#25D366; color:white; border:none; padding:10px; border-radius:6px; font-size:12px; cursor:pointer; font-weight:bold;">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                    <button onclick="removeFromWishlist(${idx})" style="background:#ff4757; color:white; border:none; padding:10px; border-radius:6px; font-size:12px; cursor:pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    updateWishlistUI();
}

// ADD TO CART & GO TO CHECKOUT PAGE
function addToOrder(name, price, image) {
    const existingIndex = cart.findIndex(item => item.name === name);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1, img: image });
    }
    updateCartUI();
    showPage('checkout-page');
}

// QUANTITY (+/-) ADJUSTMENT
function changeQty(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const badge = document.getElementById('cartBadge');
    const navCount = document.getElementById('cartCountNav');
    const totalDisplay = document.getElementById('grandTotalDisplay');
    
    let grandTotal = 0;
    let totalItems = 0;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg" style="color:#64748b;">Aapka order cart abhi khali hai.</p>';
        badge.innerText = '0';
        navCount.innerText = '0';
        totalDisplay.innerText = '₹0';
        return;
    }
    
    let html = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        totalItems += item.qty;
        
        html += `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.qty} = ₹${itemTotal}</p>
                </div>
                <div class="qty-controls">
                    <button class="btn-qty" onclick="changeQty(${index}, -1)">-</button>
                    <span><b>${item.qty}</b></span>
                    <button class="btn-qty" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    badge.innerText = totalItems;
    navCount.innerText = totalItems;
    totalDisplay.innerText = `₹${grandTotal}`;
}

// PROCESS WHATSAPP ORDER
function processWhatsAppOrder(e) {
    e.preventDefault();
    if (cart.length === 0) {
        alert("Kripya pehle product cart me add karein!");
        showPage('home-page');
        return;
    }
    
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const pincode = document.getElementById('custPincode').value;
    
    let orderSummary = "";
    let grandTotal = 0;
    
    cart.forEach((item, i) => {
        const subtotal = item.price * item.qty;
        grandTotal += subtotal;
        orderSummary += `${i + 1}. *${item.name}* %0A   Qty: ${item.qty} | Price: ₹${subtotal}%0A`;
    });
    
    const message = 
        `*--- NEW ORDER - VISHWASH NAMKEEN ---*%0A%0A` +
        `*CUSTOMER DETAILS:*%0A` +
        `👤 *Name:* ${name}%0A` +
        `📞 *Phone:* ${phone}%0A` +
        `🏠 *Address:* ${address}%0A` +
        `📍 *Pincode:* ${pincode}%0A%0A` +
        `*ORDERED ITEMS:*%0A${orderSummary}%0A` +
        `💳 *GRAND TOTAL:* ₹${grandTotal}%0A%0A` +
        `Please confirm my order and share payment link!`;
    
    const whatsappURL = `https://wa.me/918460183525?text=${message}`;
    window.open(whatsappURL, '_blank');
}
