const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://smallshawn95_db_user:meme_mart@cluster0.i9j27kn.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

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
    { id: 13, name: "Emotional Damage", price: 10, type: "classic", desc: "What the say..." },
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
    { id: 24, name: "咻蹦", price: 520, type: "taiwan", desc: "安餒今大聲。" },
    { id: 25, name: "降肉", price: 800, type: "taiwan", desc: "九天玄女。" },
    { id: 26, name: "小孩子才做選擇", price: 1, type: "taiwan", desc: "我全都要！" },
    { id: 27, name: "QQㄋㄟㄋㄟ好喝到咩噗茶", price: 55, type: "taiwan", desc: "講出來！" },
    { id: 28, name: "劉德華恭喜發財", price: 30, type: "taiwan", desc: "恭喜你發財。" },
    { id: 29, name: "超派鐵拳", price: 999, type: "taiwan", desc: "醋飯天條。" },
    { id: 30, name: "可以色色", price: 18, type: "taiwan", desc: "不可以色色。" },
    { id: 31, name: "小黃瓜", price: 30, type: "mygo", desc: "這個不用了。" },
    { id: 32, name: "讓我(們)看看(?", price: 999, type: "mygo", desc: "不讓我們看看我們怎麼知道。" },
    { id: 33, name: "演奏春日影", price: 100, type: "mygo", desc: "因為春日影是一首好歌。" },
    { id: 34, name: "ア．テンポノート", price: 10, type: "mygo", desc: "那是...歌詞嗎 ?" },
    { id: 35, name: "一輩子", price: 111, type: "mygo", desc: "她和我約好要一輩子組樂團了。" },
    { id: 36, name: "蘇玉玲", price: 450, type: "mygo", desc: "Soyorin。" },
    { id: 37, name: "是這樣沒錯，但不是這樣", price: 4, type: "mygo", desc: "什麼叫不是這樣。" },
    { id: 38, name: "木須龍", price: 576, type: "mygo", desc: "我愛慕虛榮啦。" },
    { id: 39, name: "瓦他希", price: 5, type: "mygo", desc: "要是沒有小祥妳們的話我就。" },
    { id: 40, name: "無視燈", price: 54, type: "mygo", desc: "那傢伙竟敢無視燈。" },
    { id: 41, name: "🤡", price: 9, type: "mygo", desc: "面紗之下的小丑。" },
    { id: 42, name: "HBD", price: 18, type: "mygo", desc: "生日快樂。" },
    { id: 43, name: "薑汁汽水", price: 55, type: "mygo", desc: "請給我薑汁汽水,辣一點的。" },
    { id: 44, name: "一頭一頭一頭野獸", price: 3, type: "mygo", desc: "你是多頭的野獸。" },
    { id: 45, name: "還真是高高在上", price: 375, type: "mygo", desc: "而且這樣擅作主張。" }
];

const QUOTES = [
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
    "這個設計師是不是喝多了？太讚了。",
    "收到貨了，跟圖片完全不一樣，但我更喜歡了。",
    "這東西的廢物程度超乎我想像，大推。",
    "我阿嬤都比你會買，她叫我多買兩個。",
    "來自深淵的商品，凝視它，它也凝視著你的錢包。",
    "詐騙集團看了都流淚，真誠的搶錢。",
    "買這個比買台積電還刺激，心臟受不了。"
];

async function run() {
  try {
    await client.connect();
    console.log("MongoDB 成功連線");
    const database = client.db('meme_mart');

    let collection, result;
    collection = database.collection('products');
    await collection.deleteMany({});
    console.log("商品舊資料已清空");
    result = await collection.insertMany(PRODUCTS);
    console.log(`成功匯入 ${result.insertedCount} 筆商品資料`);

    collection = database.collection('quotes');
    await collection.deleteMany({});
    console.log("留言舊資料已清空");
    const quoteDocs = QUOTES.map(q => ({ text: q }));
    result = await collection.insertMany(quoteDocs);
    console.log(`成功匯入 ${result.insertedCount} 筆留言資料`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
