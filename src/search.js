// 🔽 独自データ
var places = [
    // 自動販売機（シノニム: 自販機）
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65265, lng: 135.59455 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65258, lng: 135.59430 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65270, lng: 135.59279 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65271, lng: 135.59166 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65272, lng: 135.59108 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65273, lng: 135.59096 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65274, lng: 135.59052 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65222, lng: 135.58974 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65132, lng: 135.59100 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65088, lng: 135.59059 },
    { names: ["自動販売機", "自販機", "じどうはんばいき", "じはんき"], lat: 34.65074, lng: 135.59110 },

    // ゴミ箱
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65265, lng: 135.59455 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65258, lng: 135.59430 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65270, lng: 135.59279 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65273, lng: 135.59096 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65274, lng: 135.59052 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65222, lng: 135.58974 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65153, lng: 135.58967 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65144, lng: 135.59060 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65126, lng: 135.59105 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65099, lng: 135.59156 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65101, lng: 135.59107 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65088, lng: 135.59059 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65074, lng: 135.59110 },
    { names: ["ゴミ箱", "ごみばこ"], lat: 34.65100, lng: 135.59169 },
];
var markers = []; // 検索時にだけマーカーを表示するための配列

/**
 * 検索ボタンが押されたトリガー
 * @param {string} keyword 検索ワード
 * @returns 検索結果
 */
function searchOnClick(keyword) {
    searchPlace(keyword);
    // --- デモ用: ダミー検索結果 ---
    const dummyResults = [
        "ラーメン屋 A（駅前）",
        "カフェ B（2F）",
        "図書館 C（市役所横）",
        "公園 D（中央広場）",
        "スーパー E（商店街内）",
    ];
    return dummyResults;
}

/**
 * カードが押された際のトリガー
 * @param {string} value 押されたカードの中身
 */
function cardOnClick(value) {
    console.log(value);
}

// 🔍 入力正規化（全角半角・ひらがなカタカナ統一）
function normalize(str) {
    return str
        .toLowerCase()
        .normalize("NFKC") // 全角 → 半角
        .replace(/[ぁ-ん]/g, s => String.fromCharCode(s.charCodeAt(0) + 0x60)); // ひらがな→カタカナ
}

// 🔍 検索処理
function searchPlace(input) {
    var normInput = normalize(input);

    // 既存マーカー削除
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    var found = places.filter(p => p.names.some(n => normalize(n).includes(normInput)));

    if (found.length > 0) {
        found.forEach(f => {
            var m = L.marker([f.lat, f.lng]).addTo(map); // 👈 Popupなし
            markers.push(m);
        });
        map.setView([found[0].lat, found[0].lng], 18);
    } else {
        alert("見つかりませんでした");
    }
}