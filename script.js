document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initMobileNav();
    initProductActions();
    initReviewSystem();
});

// HERO SLIDER LOGIC
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide-item');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    prevBtn?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    nextBtn?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 4000);
}

// MOBILE NAVBAR TOGGLE
function initMobileNav() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');
    toggle?.addEventListener('click', () => {
        nav?.classList.toggle('active');
    });
}

// PRODUCT ACTIONS & WHATSAPP BUY NOW
window.buyNowInstant = function(name, price) {
    const phone = "919876543210"; // 👈 Aapka WhatsApp Number
    const message = `Hello Vishwash Namkeen! 👋\n\nI want to BUY NOW:\n📦 *Product:* ${name}\n💰 *Price:* ₹${price}\n\nPlease share payment and delivery details!`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    showSuccessOrderModal(name, price, whatsappUrl);
};

function showSuccessOrderModal(productName, price, whatsappUrl) {
    const existingModal = document.getElementById('success-order-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'success-order-modal';
    modal.className = 'order-success-overlay';
    modal.innerHTML = `
        <div class="order-success-card">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h2>Order Initiated Successfully!</h2>
            <p>Aapne choose kiya hai: <strong>"${productName}"</strong> (₹${price})</p>
            <p style="font-size: 0.75rem; color: #888; margin-top: 8px;">Redirecting to WhatsApp for order confirmation...</p>
            <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp-confirm">
                <i class="fab fa-whatsapp"></i> Open WhatsApp Now
            </a>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1500);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function initProductActions() {
    let cartCount = 0;
    let wishlistCount = 0;

    document.body.addEventListener('click', (e) => {
        // Buy Now Button Trigger
        const buyBtn = e.target.closest('.buy-now-btn');
        if (buyBtn) {
            const card = buyBtn.closest('.product-card');
            const name = card?.dataset.name || "Namkeen Item";
            const price = card?.dataset.price || "0";
            buyNowInstant(name, price);
        }

        // Add Cart Counter
        const cartBtn = e.target.closest('.add-to-cart-btn');
        if (cartBtn) {
            cartCount++;
            document.getElementById('cartCount').innerText = cartCount;
            alert('Item added to cart!');
        }

        // Wishlist Counter
        const wishBtn = e.target.closest('.card-wishlist-btn');
        if (wishBtn) {
            wishlistCount++;
            document.getElementById('wishlistCount').innerText = wishlistCount;
            wishBtn.querySelector('i').className = 'fas fa-heart text-red';
        }
    });
}

// REVIEWS MODAL
function initReviewSystem() {
    const modal = document.getElementById('review-modal-overlay');
    const openBtn = document.getElementById('open-review-modal-btn');
    const closeBtn = document.getElementById('close-review-modal');
    const form = document.getElementById('review-form');

    openBtn?.addEventListener('click', () => modal?.classList.add('active'));
    closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewer-name').value;
        const text = document.getElementById('reviewer-text').value;

        const container = document.getElementById('reviews-container');
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-user-info">
                <div class="user-avatar">${name.charAt(0).toUpperCase()}</div>
                <div><h4>${name}</h4><span class="verified-tag"><i class="fas fa-check-circle"></i> Verified Buyer</span></div>
            </div>
            <div class="rating-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
            <p class="review-text">"${text}"</p>
            <span class="review-date">Just now</span>
        `;
        container?.prepend(card);
        form.reset();
        modal?.classList.remove('active');
    });
}
