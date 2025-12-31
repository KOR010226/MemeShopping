const API_URL = "http://localhost:3000";

let PRODUCTS = [];
let FAKE_QUOTES = [];
let rate = 1.0;
let cart = [];
let showProducts = [];
let currentBaseRate = 1.0;
let isMarketUp = true;

function getRate() {
    const display = document.getElementById('rate-display');
    const fluctuation = (Math.random() - 0.5) * 0.2;
    currentBaseRate = currentBaseRate * (1 + fluctuation);
    if (currentBaseRate < 0.1) currentBaseRate = 0.1;
    if (currentBaseRate > 8.0) currentBaseRate = 8.0;
    rate = currentBaseRate;
    display.innerText = `$${rate.toFixed(4)}`;
    if (fluctuation >= 0) {
        isMarketUp = true;
        display.style.color = "#39ff14";
        display.style.textShadow = "0 0 5px #39ff14";
    } else {
        isMarketUp = false;
        display.style.color = "#ef4444";
        display.style.textShadow = "0 0 5px #ef4444";
    }
    drawProducts();
}

function drawProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    const priceClass = isMarketUp ? 'green-text' : 'red-text';
    showProducts.forEach(p => {
        const price = (p.price * rate).toFixed(2);
        const imgSrc = getImageUrl(p);
        const fallbackUrl = `https://placehold.co/400x400/e2e8f0/1e293b?text=${encodeURIComponent(p.name)}`;
        const html = `
            <div class="box product-card bg-white">
                <div class="title-bar">
                    <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 0.5rem;">${p.name}.exe</span>
                    <div class="window-controls">
                        <div class="win-btn">-</div>
                        <div class="win-btn close">x</div>
                    </div>
                </div>
                <div style="padding: 1rem; display: flex; flex-direction: column; flex: 1;">
                    <div class="card-image-container">
                        <img src="${imgSrc}" class="card-image" alt="${p.name}" onerror="this.onerror=null; this.src='${fallbackUrl}'">
                        <div class="card-tag">
                            #${p.type.toUpperCase()}
                        </div>
                    </div>

                    <h3 class="card-title">${p.name}</h3>
                    <p class="card-desc">${p.desc}</p>

                    <div class="card-footer">
                        <div>
                            <span style="font-size: 0.75rem; color: #6b7280; font-weight: bold;">PTS: ${p.price}</span>
                            <div class="price-tag ${priceClass}">$${price}</div>
                        </div>
                        <button onclick="addToCart(${p.id})" class="buy-btn">
                            BUY
                        </button>
                    </div>
                </div>
            </div>
        `;
        list.innerHTML += html;
    });
}

function getImageUrl(p) {
    return `img/${p.id}.png`;
}

function filterProducts(type) {
    if (type === 'all') {
        showProducts = [...PRODUCTS];
    } else {
        showProducts = PRODUCTS.filter(p => p.type === type);
    }
    drawProducts();
}

function addToCart(id) {
    const p = PRODUCTS.find(item => item.id === id);
    const currentPrice = parseFloat((p.price * rate).toFixed(2));
    cart.push({ ...p, price: currentPrice });
    updateCart();

    const btn = event.target;
    const originalText = btn.innerText;
    const originalBg = btn.style.backgroundColor;
    btn.innerText = "OK!";
    btn.style.backgroundColor = "#22c55e";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = originalBg;
        btn.removeAttribute('style');
    }, 500);
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <li class="cart-item">
                <div>
                    <span style="font-weight: bold; font-size: 0.875rem; display: block;">${item.name}</span>
                    <span style="font-size: 0.75rem; color: #6b7280;">Meme Coin</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-family: monospace; font-weight: bold;">$${item.price.toFixed(2)}</span>
                    <button onclick="removeCart(${index})" class="remove-btn">X</button>
                </div>
            </li>
        `;
    });
    document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
}

function removeCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

function checkout() {
    if (cart.length === 0) return alert("購物車空的啦！");
    alert("交易成功！\n注意：您的靈魂已抵押給迷因魔神。");
    cart = [];
    updateCart();
    toggleCart();
}

async function fetchProducts() {
    try {
        const res = await fetch(`${API_URL}/products`);
        PRODUCTS = await res.json();
        showProducts = [...PRODUCTS];
        drawProducts();
    } catch (error) {
        console.error("無法取得商品:", error);
        document.getElementById('product-list').innerHTML = '<p class="text-center" style="color:red; grid-column: span 3;">伺服器爆炸啦 (API Error)</p>';
    }
}

async function fetchQuotes() {
    try {
        const res = await fetch(`${API_URL}/quotes`);
        FAKE_QUOTES = await res.json();
    } catch (error) {
        console.error("無法取得留言:", error);
        FAKE_QUOTES = ["伺服器連線失敗，我無法說話。"];
    }
}

async function fetchReviews() {
    const list = document.getElementById('reviews-list');
    if (FAKE_QUOTES.length === 0) return;
    try {
        const response = await fetch('https://randomuser.me/api/?results=3&inc=name,picture,location');
        const data = await response.json();
        const users = data.results;
        list.innerHTML = '';
        users.forEach(user => {
            const randomQuote = FAKE_QUOTES[Math.floor(Math.random() * FAKE_QUOTES.length)];
            const html = `
                <div class="review-card">
                    <div class="reviewer-info">
                        <img src="${user.picture.medium}" alt="user" class="reviewer-img">
                        <div>
                            <div class="font-bold">${user.name.first} ${user.name.last}</div>
                            <div style="font-size: 0.75rem; color: #9ca3af;">from ${user.location.country}</div>
                        </div>
                    </div>
                    <p class="reviewer-text">"${randomQuote}"</p>
                    <div class="text-right" style="color: #f59e0b;">★★★★★</div>
                </div>
            `;
            list.innerHTML += html;
        });
    } catch (error) {
        console.error("Fetch error:", error);
        list.innerHTML = '<p class="text-center" style="grid-column: span 3; color: red;">無法連接到平行宇宙 (API Error)</p>';
    }
}

window.onload = async function() {
    await getRate();
    await Promise.all([
        fetchProducts(),
        fetchQuotes()
    ]);
    fetchReviews();
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('product-list').classList.remove('hidden');
    setInterval(getRate, 2000);
};
