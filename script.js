// ==========================================
// 1. GLOBAL STATE & DATA
// ==========================================
let cart = [];

// ==========================================
// 2. DOM LOADED INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCartButtons();
    initQuickView();
    initWhatsAppOrder();
    initSmoothScroll();
});

// ==========================================
// 3. MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle menu icon between bars & times (X)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

// ==========================================
// 4. CART SYSTEM (ADD TO CART)
// ==========================================
function initCartButtons() {
    const cartBtns = document.querySelectorAll('.cart-btn');

    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (!productCard) return;

            const productName = productCard.querySelector('h3').innerText;
            const priceText = productCard.querySelector('.price .current').innerText;
            const price = parseInt(priceText.replace('₹', '').trim());
            const imgSrc = productCard.querySelector('img').src;

            addToCart(productName, price, imgSrc);
        });
    });
}

function addToCart(name, price, img) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            img: img,
            quantity: 1
        });
    }

    updateCartUI();
    showToast(`"${name}" added to cart! 🛒`);
}

function updateCartUI() {
    const cartBadge = document.querySelector('.cart-icon .badge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.innerText = totalItems;

        // Pulse Animation for Cart Badge
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
    }
}

// ==========================================
// 5. QUICK VIEW & BUY NOW FUNCTIONALITY
// ==========================================
function initQuickView() {
    const viewBtns = document.querySelectorAll('.view-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (!productCard) return;

            const productName = productCard.querySelector('h3').innerText;
            const price = productCard.querySelector('.price .current').innerText;
            
            // Direct Order Link for WhatsApp
            const message = `Hello Vishwash Namkeen, I want to inquire about: *${productName}* (${price})`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
}

// ==========================================
// 6. WHATSAPP DIRECT ORDER BUTTONS
// ==========================================
function initWhatsAppOrder() {
    const orderBtns = document.querySelectorAll('.btn-whatsapp, .btn-whatsapp-large');

    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Agar Cart me items hain toh Cart details bhejega, warna normal message
            let message = "Hello Vishwash Namkeen! 👋\nI want to place an order.";

            if (cart.length > 0) {
                message = "Hello Vishwash Namkeen! 👋\nI would like to order the following items:\n\n";
                let total = 0;

                cart.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    message += `${index + 1}. *${item.name}* x ${item.quantity} = ₹${itemTotal}\n`;
                });

                message += `\n*Total Amount: ₹${total}*\n`;
                message += "\nPlease let me know the payment and delivery details!";
            }

            const phone = "910000000000"; // Aap yahan apna WhatsApp Phone Number dal sakte hain
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
}

// ==========================================
// 7. TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerText = message;

    // Toast Styling dynamically applied
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#e50914',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        zIndex: '9999',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        opacity: '0',
        transform: 'translateY(20px)'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// 8. SMOOTH SCROLLING
// ==========================================
function initSmoothScroll() {
    const navAnchors = document.querySelectorAll('a[href^="#"]');

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Mobile Menu ko band kar dega click hone par
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}
