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
    return result;
}

/**
 * カードが押された際のトリガー
 * @param {object} value 押されたカードの中身
 */
function cardOnClick(value) {
    const marker = markers.find(marker => {
        return marker._latlng.lat == value.lat && marker._latlng.lng == value.lng
    });
    if (marker) {
        map.setView([value.lat, value.lng], 20);
        marker.bindPopup(value.names[0]).openPopup();
    }
}

// 🔎 入力正規化（全角半角・小文字統一）
function normalize(str) {
    return str
        .toLowerCase()
        .normalize("NFKC"); // 全角 → 半角
}

// 漢数字変換（1～39用）
function numberToKanji(num) {
    const kanjiDigits = ["零","一","二","三","四","五","六","七","八","九"];
    if (num < 10) return kanjiDigits[num];
    if (num < 20) return "十" + (num % 10 ? kanjiDigits[num % 10] : "");
    if (num < 30) return "二十" + (num % 10 ? kanjiDigits[num % 10] : "");
    if (num < 40) return "三十" + (num % 10 ? kanjiDigits[num % 10] : "");
    return String(num);
}

// ひらがな数詞変換（1～39用）
function numberToHiragana(num) {
    const digits = ["ぜろ","いち","に","さん","よん","ご","ろく","なな","はち","きゅう"];
    const alt4 = "し";
    const alt7 = "しち";

    if (num < 10) {
        if (num === 4) return ["よん","し"];
        if (num === 7) return ["なな","しち"];
        return [digits[num]];
    }
    if (num < 20) {
        if (num === 10) return ["じゅう"];
        const rest = num % 10;
        return ["じゅう" + digits[rest]].concat(
            rest === 4 ? ["じゅう" + alt4] : [],
            rest === 7 ? ["じゅう" + alt7] : []
        );
    }
    if (num < 30) {
        if (num === 20) return ["にじゅう"];
        const rest = num % 10;
        return ["にじゅう" + digits[rest]].concat(
            rest === 4 ? ["にじゅう" + alt4] : [],
            rest === 7 ? ["にじゅう" + alt7] : []
        );
    }
    if (num < 40) {
        if (num === 30) return ["さんじゅう"];
        const rest = num % 10;
        return ["さんじゅう" + digits[rest]].concat(
            rest === 4 ? ["さんじゅう" + alt4] : [],
            rest === 7 ? ["さんじゅう" + alt7] : []
        );
    }
    return [String(num)];
}

// アルファベット変換表
const alphabetHira = {
    A: ["えー"], B: ["びー"], C: ["しー"], D: ["でぃー","でー"],
    E: ["いー"], F: ["えふ"], G: ["じー"], H: ["えいち"],
    I: ["あい"], J: ["じぇー"], K: ["けー"], L: ["える"],
    M: ["えむ"], N: ["えぬ"], O: ["おー"], P: ["ぴー"],
    Q: ["きゅー"], R: ["あーる"], S: ["えす"], T: ["てぃー"],
    U: ["ゆー"], V: ["ぶい"], W: ["だぶりゅー"], X: ["えっくす"],
    Y: ["わい"], Z: ["ぜっと"]
};

// 長音の揺らぎ
function addChoonVariations(str) {
    const variations = new Set([str]);
    if (str.includes("ー")) variations.add(str.replace(/ー/g, "-"));
    if (str.includes("-")) variations.add(str.replace(/-/g, "ー"));
    return [...variations];
}

// クエリ展開
function expandQuery(query) {
    let results = new Set([query]);

    // 数字を漢数字・ひらがなに変換
    query.replace(/\d+/g, (numStr) => {
        const num = parseInt(numStr, 10);
        const kanji = numberToKanji(num);
        const hiraList = numberToHiragana(num);
        results.add(query.replace(numStr, kanji));
        hiraList.forEach(h => results.add(query.replace(numStr, h)));
    });

    // アルファベットをひらがなに変換
    query.replace(/[A-Z]/gi, (letter) => {
        const hiraList = alphabetHira[letter.toUpperCase()] || [];
        hiraList.forEach(h => results.add(query.replace(letter, h)));
    });

    // 長音の揺らぎ
    [...results].forEach(r => addChoonVariations(r).forEach(v => results.add(v)));

    return [...results];
}

// 🔎 検索結果を表示（部分一致・両側展開）
function search(input) {
    var normInput = normalize(input);
    var expandedInput = expandQuery(normInput);

    return places.filter(p =>
        p.names.some(n => {
            var expandedName = expandQuery(normalize(n));
            return expandedInput.some(e =>
                expandedName.some(en => en.includes(e) || e.includes(en))
            );
        })
    );
}

// 検索処理
function searchPlace(input) {

    // 既存マーカー削除
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    var found = search(input);

    if (found.length > 0) {
        found.forEach(f => {
            var m = L.marker([f.lat, f.lng]).addTo(map);
            markers.push(m);
        });
        map.setView([found[0].lat, found[0].lng], 18);
    } else {
        alert("見つかりませんでした");
    }
}