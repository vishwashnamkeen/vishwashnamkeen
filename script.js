// ==========================================
// 1. GLOBAL STATE (CART & WISHLIST)
// ==========================================
let cartState = [];
let wishlistState = [];
let currentTab = 'cart'; // 'cart' or 'wishlist'
let currentSlideIndex = 0;

// ==========================================
// 2. DOM CONTENT LOADED INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initMobileMenu();
    initSearchOverlay();
    initDrawerSystem();
    initProductActions();
    initSmoothScroll();
});

// ==========================================
// 3. HERO IMAGE SLIDER FUNCTIONALITY
// ==========================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide-item');
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');

    if (!slides.length) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        currentSlideIndex = (index + slides.length) % slides.length;
        slides[currentSlideIndex].classList.add('active');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
    }

    // Auto Slide every 4 seconds
    setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 4000);
}

// ==========================================
// 4. MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

// ==========================================
// 5. SEARCH OVERLAY TOGGLE
// ==========================================
function initSearchOverlay() {
    const searchToggle = document.getElementById('search-toggle-btn');
    const closeSearch = document.getElementById('close-search-btn');
    const searchOverlay = document.getElementById('search-overlay');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            document.getElementById('search-input')?.focus();
        });
    }

    if (closeSearch && searchOverlay) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }
}

// ==========================================
// 6. SLIDING DRAWER SYSTEM (CART & WISHLIST)
// ==========================================
function initDrawerSystem() {
    const cartBtn = document.getElementById('cart-drawer-btn');
    const wishlistBtn = document.getElementById('wishlist-btn');
    const closeBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('sliding-drawer');
    const overlay = document.getElementById('drawer-overlay');

    const tabCartBtn = document.getElementById('tab-cart-btn');
    const tabWishlistBtn = document.getElementById('tab-wishlist-btn');

    function openDrawer(tab = 'cart') {
        currentTab = tab;
        switchTab(tab);
        drawer?.classList.add('open');
        overlay?.classList.add('active');
        renderDrawerContent();
    }

    function closeDrawer() {
        drawer?.classList.remove('open');
        overlay?.classList.remove('active');
    }

    function switchTab(tab) {
        currentTab = tab;
        if (tab === 'cart') {
            tabCartBtn?.classList.add('active');
            tabWishlistBtn?.classList.remove('active');
        } else {
            tabWishlistBtn?.classList.add('active');
            tabCartBtn?.classList.remove('active');
        }
        renderDrawerContent();
    }

    cartBtn?.addEventListener('click', () => openDrawer('cart'));
    wishlistBtn?.addEventListener('click', () => openDrawer('wishlist'));
    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);

    tabCartBtn?.addEventListener('click', () => switchTab('cart'));
    tabWishlistBtn?.addEventListener('click', () => switchTab('wishlist'));

    // Checkout via WhatsApp
    const checkoutBtn = document.getElementById('whatsapp-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleWhatsAppCheckout);
    }
}

// ==========================================
// 7. PRODUCT BUTTON ACTIONS (ADD, BUY, WISHLIST)
// ==========================================
function initProductActions() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const img = card.dataset.img;

        // 1. Add to Cart Button
        const addBtn = card.querySelector('.add-to-cart-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                addToCart(id, name, price, img);
            });
        }

      // ==========================================
// DIRECT BUY NOW WITH SUCCESS POPUP & WHATSAPP
// ==========================================
function buyNowInstant(name, price) {
    // 1. WhatsApp Message Text
    const phone = "919876543210"; // 👈 Yahan apna WhatsApp Number likhein (Country code ke sath)
    const message = `Hello Vishwash Namkeen! 👋\n\nI want to place an order for:\n📦 *Product:* ${name}\n💰 *Price:* ₹${price}\n\nPlease share payment & delivery details!`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // 2. Show Success Notification Popup
    showSuccessOrderModal(name, price, whatsappUrl);
}

// Success Modal Popup Function
function showSuccessOrderModal(productName, price, whatsappUrl) {
    // Check if modal already exists, remove it
    const existingModal = document.getElementById('success-order-modal');
    if (existingModal) existingModal.remove();

    // Create Modal HTML
    const modal = document.createElement('div');
    modal.id = 'success-order-modal';
    modal.className = 'order-success-overlay';
    modal.innerHTML = `
        <div class="order-success-card">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h2>Order Initiated Successfully!</h2>
            <p>Aapne <strong>"${productName}"</strong> (₹${price}) choose kiya hai.</p>
            <p class="sub-text">WhatsApp open ho raha hai, wahan se message send karke apna order confirm karein.</p>
            <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp-confirm" id="confirm-wa-btn">
                <i class="fab fa-whatsapp"></i> Continue to WhatsApp
            </a>
        </div>
    `;

    document.body.appendChild(modal);

    // Auto Redirect to WhatsApp after 1.5 Seconds
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1500);

    // Close Modal on Click Outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}
        }

        // 3. Wishlist Heart Button
        const wishlistBtn = card.querySelector('.card-wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                toggleWishlist(id, name, price, img, wishlistBtn);
            });
        }
    });
}

// Add Item to Cart
function addToCart(id, name, price, img) {
    const existing = cartState.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cartState.push({ id, name, price, img, quantity: 1 });
    }
    updateBadges();
    showNotification(`"${name}" added to Cart! 🛒`);
}

// Toggle Wishlist Item
function toggleWishlist(id, name, price, img, btnElement) {
    const index = wishlistState.findIndex(item => item.id === id);
    const icon = btnElement.querySelector('i');

    if (index > -1) {
        wishlistState.splice(index, 1);
        icon.className = 'fa-regular fa-heart';
        btnElement.classList.remove('active');
        showNotification(`Removed "${name}" from Wishlist`);
    } else {
        wishlistState.push({ id, name, price, img });
        icon.className = 'fa-solid fa-heart';
        btnElement.classList.add('active');
        showNotification(`Added "${name}" to Wishlist! ❤️`);
    }
    updateBadges();
}

// Direct Buy Now Action
// ==========================================
// DIRECT BUY NOW WITH POPUP & WHATSAPP REDIRECT
// ==========================================

// Global Direct Buy Function (Works for both HTML inline & Event Listeners)
window.buyNowInstant = function(name, price) {
    // 1. Apna WhatsApp Number Yahan Set Karein (Country Code ke sath, without + or spaces)
    const phone = "919876543210"; // 👈 Yahan apna WhatsApp Number dalein
    
    // 2. Message Format
    const message = `Hello Vishwash Namkeen! 👋\n\nI want to BUY NOW:\n📦 *Product:* ${name}\n💰 *Price:* ₹${price}\n\nPlease share payment and delivery details!`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // 3. Show Instant Success Modal
    showSuccessOrderModal(name, price, whatsappUrl);
};

// Success Popup Modal
function showSuccessOrderModal(productName, price, whatsappUrl) {
    // Purana modal ho toh pehle remove karein
    const existingModal = document.getElementById('success-order-modal');
    if (existingModal) existingModal.remove();

    // Naya Modal create karein
    const modal = document.createElement('div');
    modal.id = 'success-order-modal';
    modal.className = 'order-success-overlay';
    modal.innerHTML = `
        <div class="order-success-card">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h2>Order Initiated Successfully!</h2>
            <p>Aapne Choose Kiya Hai: <strong>"${productName}"</strong> (₹${price})</p>
            <p class="sub-text">Redirecting to WhatsApp for order confirmation...</p>
            <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp-confirm" id="confirm-wa-btn">
                <i class="fab fa-whatsapp"></i> Open WhatsApp Now
            </a>
        </div>
    `;

    document.body.appendChild(modal);

    // 1.5 Second me automatic WhatsApp redirect karein
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1500);

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Event Listener Fix for Product Cards
function initProductActions() {
    // Event Delegation use kar rahe hain taaki har Buy Now Button 100% kaam kare
    document.body.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('.buy-now-btn');
        if (buyBtn) {
            e.preventDefault();
            const card = buyBtn.closest('.product-card');
            
            // Product Data extract karein
            const name = card?.dataset.name || buyBtn.getAttribute('data-name') || "Namkeen Item";
            const price = card?.dataset.price || buyBtn.getAttribute('data-price') || "0";
            
            buyNowInstant(name, price);
        }
    });
}

// ==========================================
// 8. UPDATE BADGES & CALCULATION
// ==========================================
function updateBadges() {
    const cartCount = document.getElementById('cart-count');
    const wishCount = document.getElementById('wishlist-count');
    const drawerCartNum = document.getElementById('drawer-cart-num');
    const drawerWishNum = document.getElementById('drawer-wishlist-num');

    const totalCartQty = cartState.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCount) cartCount.innerText = totalCartQty;
    if (wishCount) wishCount.innerText = wishlistState.length;
    if (drawerCartNum) drawerCartNum.innerText = totalCartQty;
    if (drawerWishNum) drawerWishNum.innerText = wishlistState.length;
}

// ==========================================
// 9. RENDER DRAWER CONTENT dynamically
// ==========================================
function renderDrawerContent() {
    const body = document.getElementById('drawer-body');
    const footer = document.getElementById('drawer-footer');
    if (!body) return;

    body.innerHTML = '';

    const activeList = currentTab === 'cart' ? cartState : wishlistState;

    if (activeList.length === 0) {
        body.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 40px 10px; color: #888;">
                <i class="fas ${currentTab === 'cart' ? 'fa-shopping-basket' : 'fa-heart-broken'}" style="font-size: 2.5rem; color: #d4af37; margin-bottom: 10px;"></i>
                <p>Your ${currentTab} is empty!</p>
            </div>
        `;
        if (footer) footer.style.display = 'none';
        return;
    }

    if (footer) footer.style.display = currentTab === 'cart' ? 'block' : 'none';

    activeList.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'drawer-item';
        itemRow.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid #222; margin-bottom: 10px;';

        if (currentTab === 'cart') {
            itemRow.innerHTML = `
                <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 6px;">
                <div style="flex: 1; margin-left: 10px;">
                    <h5 style="color: #fff; font-size: 0.85rem; margin: 0;">${item.name}</h5>
                    <span style="color: #e50914; font-weight: bold; font-size: 0.8rem;">₹${item.price}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <button onclick="changeQty('${item.id}', -1)" style="background: #222; border: 1px solid #444; color: #fff; width: 22px; height: 22px; border-radius: 4px; cursor: pointer;">-</button>
                    <span style="color: #fff; font-size: 0.85rem; min-width: 15px; text-align: center;">${item.quantity}</span>
                    <button onclick="changeQty('${item.id}', 1)" style="background: #222; border: 1px solid #444; color: #fff; width: 22px; height: 22px; border-radius: 4px; cursor: pointer;">+</button>
                </div>
                <button onclick="removeItem('${item.id}', 'cart')" style="background: transparent; border: none; color: #888; font-size: 1rem; margin-left: 10px; cursor: pointer;"><i class="fas fa-trash-alt"></i></button>
            `;
        } else {
            itemRow.innerHTML = `
                <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 6px;">
                <div style="flex: 1; margin-left: 10px;">
                    <h5 style="color: #fff; font-size: 0.85rem; margin: 0;">${item.name}</h5>
                    <span style="color: #d4af37; font-weight: bold; font-size: 0.8rem;">₹${item.price}</span>
                </div>
                <button onclick="moveWishlistToCart('${item.id}')" style="background: #e50914; border: none; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Add to Cart</button>
                <button onclick="removeItem('${item.id}', 'wishlist')" style="background: transparent; border: none; color: #888; font-size: 1rem; margin-left: 8px; cursor: pointer;"><i class="fas fa-trash-alt"></i></button>
            `;
        }
        body.appendChild(itemRow);
    });

    calculateTotals();
}

// Global Quantity & Remove Handlers
window.changeQty = function(id, delta) {
    const item = cartState.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cartState = cartState.filter(i => i.id !== id);
        }
        updateBadges();
        renderDrawerContent();
    }
};

window.removeItem = function(id, type) {
    if (type === 'cart') {
        cartState = cartState.filter(i => i.id !== id);
    } else {
        wishlistState = wishlistState.filter(i => i.id !== id);
    }
    updateBadges();
    renderDrawerContent();
};

window.moveWishlistToCart = function(id) {
    const item = wishlistState.find(i => i.id === id);
    if (item) {
        addToCart(item.id, item.name, item.price, item.img);
        removeItem(id, 'wishlist');
    }
};

// Automatic Subtotal & Total Calculation
function calculateTotals() {
    const subtotal = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotalEl = document.getElementById('cart-subtotal');
    const grandTotalEl = document.getElementById('cart-grand-total');

    if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
    if (grandTotalEl) grandTotalEl.innerText = `₹${subtotal}`;
}

// WhatsApp Checkout with List
function handleWhatsAppCheckout() {
    if (cartState.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    let message = "Hello Vishwash Namkeen! 👋\nI would like to order the following items:\n\n";
    let grandTotal = 0;

    cartState.forEach((item, index) => {
        const total = item.price * item.quantity;
        grandTotal += total;
        message += `${index + 1}. *${item.name}* x ${item.quantity} = ₹${total}\n`;
    });

    message += `\n*Grand Total: ₹${grandTotal}*\n`;
    message += "Please provide delivery confirmation.";

    const phone = "919876543210"; // Apne WhatsApp Number se badlein
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Notification Toast Popup
function showNotification(msg) {
    let toast = document.createElement('div');
    toast.innerText = msg;
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        backgroundColor: '#e50914',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        zIndex: '99999',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '0', 2500);
    setTimeout(() => toast.remove(), 2800);
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
// ==========================================
// 10. DYNAMIC REVIEW MODAL & STAR SYSTEM
// ==========================================
let selectedRating = 5;

document.addEventListener('DOMContentLoaded', () => {
    initReviewSystem();
});

function initReviewSystem() {
    const modal = document.getElementById('review-modal-overlay');
    const openBtn = document.getElementById('open-review-modal-btn');
    const closeBtn = document.getElementById('close-review-modal');
    const form = document.getElementById('review-form');
    const starContainer = document.getElementById('star-select');

    // Open/Close Modal
    openBtn?.addEventListener('click', () => modal?.classList.add('active'));
    closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Star Selection Handler
    if (starContainer) {
        const stars = starContainer.querySelectorAll('i');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.dataset.rating);
                stars.forEach((s, idx) => {
                    if (idx < selectedRating) {
                        s.className = 'fas fa-star';
                    } else {
                        s.className = 'far fa-star';
                    }
                });
            });
        });
    }

    // Submit Review Dynamically
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewer-name').value;
        const text = document.getElementById('reviewer-text').value;

        if (!name || !text) return;

        // Render new review dynamically
        addNewReviewCard(name, text, selectedRating);

        // Reset and Close Modal
        form.reset();
        modal?.classList.remove('active');
        showNotification('Dhanyawad! Aapka review publish ho gaya h. ⭐');
    });
}

function addNewReviewCard(name, text, rating) {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        starsHtml += i < rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }

    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.innerHTML = `
        <div class="review-user-info">
            <div class="user-avatar gold">${name.charAt(0).toUpperCase()}</div>
            <div>
                <h4>${name}</h4>
                <span class="verified-tag"><i class="fas fa-check-circle"></i> Verified Buyer</span>
            </div>
        </div>
        <div class="rating-stars">${starsHtml}</div>
        <p class="review-text">"${text}"</p>
        <span class="review-date">Abhi abhi</span>
    `;

    // Add on top of list
    container.prepend(reviewCard);
}
