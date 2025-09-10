// 独自データ
// data.jsonからplacesデータを取得
var markers = []; // 検索時にだけマーカーを表示するための配列

/**
 * 検索ボタンが押されたトリガー
 * @param {string} keyword 検索ワード
 * @returns 検索結果
 */
function searchOnClick(keyword) {
    searchPlace(keyword);
    const result = search(keyword);
    return result.map(place => place.names[0]);
}

/**
 * カードが押された際のトリガー
 * @param {string} value 押されたカードの中身
 */
function cardOnClick(value) {
    console.log(value);
}

// 入力正規化（全角半角・ひらがなカタカナ統一）
function normalize(str) {
    return str
        .toLowerCase()
        .normalize("NFKC") // 全角 → 半角
        .replace(/[ぁ-ん]/g, s => String.fromCharCode(s.charCodeAt(0) + 0x60)); // ひらがな→カタカナ
}

function search (input) {
    var normInput = normalize(input);
    return places.filter(p => p.names.some(n => normalize(n).includes(normInput)));
}

// 検索処理
function searchPlace(input) {

    // 既存マーカー削除
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    var found = search(input);

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