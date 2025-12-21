const PRODUCTS = [
    { id: 1, name: "Doge", price: 999, type: "classic", desc: "Much Wow." },
    { id: 2, name: "Pepe", price: 300, type: "classic", desc: "Feels bad man." },
    { id: 3, name: "Nyan Cat", price: 500, type: "classic", desc: "Meow meow meow." },
    { id: 4, name: "Troll Face", price: 0, type: "classic", desc: "Problem?" },
    { id: 5, name: "Rick Roll", price: 69, type: "classic", desc: "Never gonna give you up." },
    { id: 6, name: "Hide The Pain Harold", price: 100, type: "classic", desc: "Smiling through pain." },
    { id: 7, name: "Success Kid", price: 200, type: "classic", desc: "I did it!" },
    { id: 8, name: "Disaster Girl", price: 666, type: "classic", desc: "House burning." },
    { id: 9, name: "Grumpy Cat", price: 99, type: "classic", desc: "NO." },
    { id: 10, name: "Woman Yelling at Cat", price: 250, type: "classic", desc: "Smudge the cat." },
    { id: 11, name: "Distracted Boyfriend", price: 50, type: "classic", desc: "Looking back." },
    { id: 12, name: "This Is Fine", price: 999, type: "classic", desc: "Fire everywhere." },
    { id: 13, name: "Change My Mind", price: 10, type: "classic", desc: "Prove me wrong." },
    { id: 14, name: "Is This A Pigeon", price: 30, type: "classic", desc: "Butterfly?" },
    { id: 15, name: "Drake Hotline", price: 80, type: "classic", desc: "No / Yes." },
    { id: 16, name: "傑哥不要", price: 87, type: "taiwan", desc: "讓我康康！" },
    { id: 17, name: "太無情了", price: 666, type: "taiwan", desc: "哭啊！" },
    { id: 18, name: "反正我很閒", price: 100, type: "taiwan", desc: "人民的法槌！" },
    { id: 19, name: "統神端火鍋", price: 50, type: "taiwan", desc: "一代一代一代。" },
    { id: 20, name: "我就爛", price: 0, type: "taiwan", desc: "讚啦。" },
    { id: 21, name: "歸剛欸", price: 77, type: "taiwan", desc: "水母頭。" },
    { id: 22, name: "阿姨我不想努力", price: 9999, type: "taiwan", desc: "求包養。" },
    { id: 23, name: "是在哈囉", price: 10, type: "taiwan", desc: "Hello?" },
    { id: 24, name: "像極了愛情", price: 520, type: "taiwan", desc: "寫詩。" },
    { id: 25, name: "降肉", price: 800, type: "taiwan", desc: "九天玄女。" },
    { id: 26, name: "關於我可能讓你很意外", price: 1, type: "taiwan", desc: "Point." },
    { id: 27, name: "咩噗", price: 55, type: "taiwan", desc: "流淚。" },
    { id: 28, name: "甘安捏", price: 30, type: "taiwan", desc: "方岑。" },
    { id: 29, name: "超派鐵拳", price: 999, type: "taiwan", desc: "醋飯天條。" },
    { id: 30, name: "可以色色", price: 18, type: "taiwan", desc: "不可以色色。" }
];

let rate = 1.0;
let cart = [];
let showProducts = [...PRODUCTS];

let currentBaseRate = 1.0;

function getRate() {
    const display = document.getElementById('rate-display');
    const fluctuation = (Math.random() - 0.5) * 0.2;
    currentBaseRate = currentBaseRate * (1 + fluctuation);

    if (currentBaseRate < 0.1) currentBaseRate = 0.1;
    if (currentBaseRate > 8.0) currentBaseRate = 8.0;

    rate = currentBaseRate;
    display.innerText = `$${rate.toFixed(4)}`;

    if (fluctuation >= 0) {
        display.style.color = "#39ff14";
        display.style.textShadow = "0 0 5px #39ff14";
    } else {
        display.style.color = "#ef4444";
        display.style.textShadow = "0 0 5px #ef4444";
    }
    drawProducts();
}

function getImageUrl(name) {
    const text = encodeURIComponent(name);
    return `https://placehold.co/400x400/e2e8f0/1e293b?text=${text}`;
}

function drawProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';

    showProducts.forEach(p => {
        const price = (p.price * rate).toFixed(2);
        const imgSrc = getImageUrl(p.name);
        const isPriceUp = Math.random() > 0.5;
        const priceClass = isPriceUp ? 'green-text' : 'red-text';

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
                        <img src="${imgSrc}" class="card-image" alt="${p.name}">
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

const FAKE_QUOTES = [
    "自從買了這個，我考試都考 100 分！(並沒有)",
    "這個商品改變了我的人生，現在我破產了。",
    "賣家出貨很快，但我不知道我買了什麼。",
    "這是我花過最冤枉的一筆錢，五星好評。",
    "買了之後，我的貓終於願意理我了。",
    "雖然很廢，但我就是管不住這雙手。",
    "警察先生，就是這個網站搶走我的錢。",
    "太神啦！我感受到智商在燃燒！",
    "這不是我要的肯德基... 但沒關係。",
    "真的很純，我是說這個迷因。",
    "我以為是比特幣，結果是Doge。",
    "老闆，這個可以退貨嗎？我的錢包在哭。",
    "看完這個網站，我的眼睛流汗了。",
    "這價格合理嗎？不管了，買！",
    "我覺得我需要去看醫生，笑到肚子痛。",
    "這是什麼黑科技？我的電腦當機了。",
    "原來快樂可以用錢買到，只要999。",
    "我把連結發給老闆，現在我不用上班了。",
    "這個設計師是不是喝多了？太讚了。"
];

async function fetchReviews() {
    const list = document.getElementById('reviews-list');
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
    fetchReviews();

    document.getElementById('loader').classList.add('hidden');
    document.getElementById('product-list').classList.remove('hidden');

    setInterval(getRate, 2000);
};
