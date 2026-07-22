// Sample Products Data
const products = [
    { id: 1, name: "Premium Wireless Headphones", category: "Electronics", price: 3499, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80" },
    { id: 2, name: "Minimalist Black Watch", category: "Accessories", price: 4999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
    { id: 3, name: "Smart Speaker Echo", category: "Electronics", price: 2899, image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80" },
    { id: 4, name: "Classic UV Sunglasses", category: "Fashion", price: 1599, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80" },
    { id: 5, name: "Ultra-thin Mechanical Keyboard", category: "Electronics", price: 6200, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80" },
    { id: 6, name: "Genuine Leather Backpack", category: "Fashion", price: 3899, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" }
];

// Application State
let wishlist = [];
let cart = [];
let currentCategory = 'All';

// Initialize App on DOM Load
window.addEventListener('DOMContentLoaded', () => {
    renderShop();
    updateBadges();
});

// Switch Between Shop & Dedicated Wishlist Tab
function switchTab(tab) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    if(tab === 'shop') {
        document.getElementById('shopView').classList.add('active');
        document.getElementById('tab-shop').classList.add('active');
    } else if(tab === 'wishlist') {
        document.getElementById('wishlistView').classList.add('active');
        document.getElementById('tab-wishlist').classList.add('active');
        renderWishlist();
    }
}

// Render Shop Items (with Category Filter & Live Search)
function renderShop() {
    const grid = document.getElementById('shopGrid');
    const searchVal = document.getElementById('searchInput').value.toLowerCase();

    const filtered = products.filter(p => {
        const matchesCat = currentCategory === 'All' || p.category === currentCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchVal);
        return matchesCat && matchesSearch;
    });

    grid.innerHTML = filtered.map(product => {
        const isLiked = wishlist.includes(product.id);
        return `
            <div class="card">
                <div class="card-img-wrapper">
                    <button class="like-btn ${isLiked ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                        <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                    <img src="${product.image}" alt="${product.name}" class="card-img">
                </div>
                <div class="card-body">
                    <span class="card-category">${product.category}</span>
                    <h3 class="card-title">${product.name}</h3>
                    <div class="card-footer">
                        <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
                        <button class="add-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Wishlist Items Tab
function renderWishlist() {
    const grid = document.getElementById('wishlistGrid');
    const emptyState = document.getElementById('wishlistEmpty');

    const wishlistProducts = products.filter(p => wishlist.includes(p.id));

    if(wishlistProducts.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        grid.innerHTML = wishlistProducts.map(product => `
            <div class="card">
                <div class="card-img-wrapper">
                    <button class="like-btn active" onclick="toggleWishlist(${product.id})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <img src="${product.image}" alt="${product.name}" class="card-img">
                </div>
                <div class="card-body">
                    <span class="card-category">${product.category}</span>
                    <h3 class="card-title">${product.name}</h3>
                    <div class="card-footer">
                        <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
                        <button class="add-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-plus"></i> Move To Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Toggle Wishlist Logic
function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    const product = products.find(p => p.id === id);

    if(idx === -1) {
        wishlist.push(id);
        showToast(`"${product.name}" Wishlist me add ho gaya!`);
    } else {
        wishlist.splice(idx, 1);
        showToast(`Wishlist se remove kar diya gaya.`);
    }

    updateBadges();
    renderShop();
    renderWishlist();
}

// Cart Logic & Drawer
function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    const product = products.find(p => p.id === id);

    if(existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    showToast(`"${product.name}" Cart me add ho gaya!`);
    updateBadges();
    renderCartDrawer();
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.qty += change;
        if(item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateBadges();
    renderCartDrawer();
}

function renderCartDrawer() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');

    if(cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color: var(--text-muted); margin-top:2rem;">Aapka Cart khali hai.</p>`;
        totalEl.innerText = `₹0`;
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    totalEl.innerText = `₹${total.toLocaleString('en-IN')}`;
}

function toggleCartDrawer(open) {
    document.getElementById('cartOverlay').classList.toggle('open', open);
    if(open) renderCartDrawer();
}

function checkout() {
    if(cart.length === 0) return alert("Aapka cart khali hai!");
    alert("Order successfully place ho gaya hai! Thank you.");
    cart = [];
    updateBadges();
    toggleCartDrawer(false);
}

// Filters & Searches
function filterCategory(category, element) {
    currentCategory = category;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    element.classList.add('active');
    renderShop();
}

function filterProducts() {
    renderShop();
}

// Badges & Toast Notifications
function updateBadges() {
    document.getElementById('wishlistBadge').innerText = wishlist.length;
    document.getElementById('cartBadge').innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}
