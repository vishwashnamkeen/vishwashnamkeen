// ===== Vishwas Namkeen =====

// Image Slider
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slides");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }

    setTimeout(showSlides, 3000);
}

// Product Search
function searchProduct() {

    let input = document.getElementById("searchInput").value.toUpperCase();

    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {

        let title = cards[i].getElementsByTagName("h3")[0];

        if (title.innerHTML.toUpperCase().indexOf(input) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }

    }
}
// ===== Shopping Cart =====

let cart = [];
let total = 0;

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();
}

function updateCart() {

    let cartItems = document.getElementById("cartItems");
    let totalBox = document.getElementById("total");

    if (!cartItems || !totalBox) return;

    cartItems.innerHTML = "";
    total = 0;

    cart.forEach(function(item, index){

        total += item.price;

        cartItems.innerHTML += `
        <div style="margin-bottom:10px;padding:10px;border-bottom:1px solid #ddd;">
            <b>${item.name}</b><br>
            ₹${item.price}
            <br><br>
            <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;

    });

    totalBox.innerHTML = "₹" + total;
}

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

