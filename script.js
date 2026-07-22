/* ==========================================================================
   VISHWASH NAMKEEN - COMPLETE JS WITH WORKING WISHLIST & EFFECTS
   ========================================================================== */

// 1. PRODUCT DATABASE
const products = [
    { id: 1, name: "Bhakarwadi", price: 120, image: "BHAKARWADI.PNG.png", weight: "250g" },
    { id: 2, name: "Bingo Masala", price: 100, image: "BINGOMASALA.PNG.png", weight: "200g" },
    { id: 3, name: "Bingo Pani Puri", price: 100, image: "BINGOPANIPURI.PNG.png", weight: "200g" },
    { id: 4, name: "Masala Banana Wafers", price: 140, image: "MASALABANANAWEFERS.PNG.png", weight: "250g" },
    { id: 5, name: "Methi Puri", price: 110, image: "METHIPURI.PNG.jpeg", weight: "250g" },
    { id: 6, name: "Nadiyadi Mix", price: 130, image: "NADIYADIMIX.PNG.png", weight: "300g" },
    { id: 7, name: "Punjabi Mix", price: 150, image: "PUNJABIMIX.PNG.png", weight: "300g" }
];

// Local Storage State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// 2. PAGE INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartUI();
    updateWishlistUI();
});

// 3. VOICE CONFIRMATION
function playOrderSuccessVoice() {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance("Your order is successfully placed!");
        speech.volume = 1;
        speech.rate = 0.95;
        speech.pitch = 1.0;
        speech.lang = 'en-US';
        window.speechSynthesis.speak(speech);
    }
}

// 4. RENDER PRODUCTS TO HOME GRID
function renderProducts() {
    const grid = document.getElementById('product-list');
    if (!grid) return;

    grid.innerHTML = products.map(p => {
        const isWishlisted = wishlist.some(w => w.id === p.id);

        return `
            <div class="product-card">
                <div class="card-top">
                    <span class="card-badge">Fresh</span>
                    
                    <span class="wishlist-icon-btn" onclick="toggleWishlist(${p.id}, this)" style="cursor:pointer;" title="Add to Wishlist">
                        <i class="${isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}" 
                           style="${isWishlisted ? 'color:red;' : 'color:#d90429;'} font-size: 18px;"></i>
                    </span>

                    <img src="${p.image}" alt="${p.name}">
                </div>
                <div class="card-info">
                    <h3>${p.name}</h3>
                    <div class="rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <small style="color:#777;">Weight: ${p.weight}</small>
                    <div class="price-tag">₹${p.price}</div>
                </div>
                <div class="card-actions">
                    <button onclick="addToCart(${p.id})" class="btn btn-outline btn-sm btn-block">
                        <i class="fa-solid fa-cart-plus"></i> Add
                    </button>
                    <button onclick="buyNow(${p.id})" class="btn btn-red btn-sm btn-block">
                        <i class="fa-solid fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// 5. WORKING WISHLIST TOGGLE
function toggleWishlist(id, element) {
    const item = products.find(p => p.id === id);
    if (!item) return;

    const existingIndex = wishlist.findIndex(w => w.id === id);

    if (existingIndex === -1) {
        wishlist.push(item);
        if (element) {
            const icon = element.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-heart';
                icon.style.color = 'red';
            }
        }
    } else {
        wishlist.splice(existingIndex, 1);
        if (element) {
            const icon = element.querySelector('i');
            if (icon) {
                icon.className = 'fa-regular fa-heart';
                icon.style.color = '#d90429';
            }
        }
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

// 6. UPDATE WISHLIST DISPLAY & COUNT
function updateWishlistUI() {
    const wishElem = document.getElementById('wishlist-count');
    if (wishElem) {
        wishElem.innerText = wishlist.length;
    }

    const wishlistContainer = document.getElementById('wishlist-items-container');
    if (wishlistContainer) {
        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = `<p style="color:#777; text-align:center;">Abhi koi item add nahi kiya gaya hai.</p>`;
        } else {
            wishlistContainer.innerHTML = wishlist.map((item) => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${item.image}" alt="${item.name}" style="width:40px; height:40px; object-fit:contain;">
                        <div>
                            <strong style="font-size:14px;">${item.name}</strong><br>
                            <small style="color:var(--brand-red); font-weight:bold;">₹${item.price}</small>
                        </div>
                    </div>
                    <button onclick="addToCart(${item.id})" class="btn btn-red btn-sm">
                        <i class="fa-solid fa-cart-plus"></i> Add
                    </button>
                </div>
            `).join('');
        }
    }
}

// 7. WISHLIST MODAL OPEN/CLOSE
function openWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    if (modal) {
        modal.style.display = 'flex';
        updateWishlistUI();
    }
}

function closeWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    if (modal) modal.style.display = 'none';
}

// 8. ADD TO CART & BUY NOW
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    alert(`${item.name} Cart me add ho gaya!`);
}

function buyNow(id) {
    const item = products.find(p => p.id === id);
    cart = [item];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    
    const checkoutElem = document.getElementById('checkout');
    if (checkoutElem) {
        checkoutElem.scrollIntoView({ behavior: 'smooth' });
    }
}

// 9. UPDATE CART UI
function updateCartUI() {
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) {
        cartCountElem.innerText = cart.length;
    }

    const cartItemsContainer = document.getElementById('cart-items');
    const grandTotalElem = document.getElementById('cart-grand-total');

    if (!cartItemsContainer || !grandTotalElem) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-msg">Aapki cart khali hai!</p>`;
        grandTotalElem.innerText = `₹0`;
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #eee;">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>₹${item.price}</small>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    grandTotalElem.innerText = `₹${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// 10. WHATSAPP ORDER WITH VOICE
function processWhatsAppOrder(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Pehle cart me koi item add karein!");
        return;
    }

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const pincode = document.getElementById('custPincode').value;

    let itemsSummary = "";
    let grandTotal = 0;

    cart.forEach((item, i) => {
        grandTotal += item.price;
        itemsSummary += `${i + 1}. *${item.name}* - ₹${item.price}%0A`;
    });

    const msg = `*--- VISHWASH NAMKEEN NEW ORDER ---*%0A%0A` +
                `👤 *Name:* ${name}%0A` +
                `📞 *Phone:* ${phone}%0A` +
                `🏠 *Address:* ${address}%0A` +
                `📍 *Pincode:* ${pincode}%0A%0A` +
                `📦 *ORDERED ITEMS:*%0A${itemsSummary}%0A` +
                `💳 *GRAND TOTAL:* ₹${grandTotal}%0A%0A` +
                `Please confirm my order!`;

    playOrderSuccessVoice();

    setTimeout(() => {
        window.open(`https://wa.me/918460183525?text=${msg}`, '_blank');
        cart = [];
        localStorage.removeItem('cart');
        updateCartUI();
    }, 800);
}
