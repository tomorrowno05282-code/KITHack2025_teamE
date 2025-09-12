// 独自データ
// data.jsonからplacesデータを取得
var markers = []; // 検索時にだけマーカーを表示するための配列

/**
 * 検索ボタンが押されたトリガー
 * @param {string} keyword 検索ワード
 * @returns 検索結果
 */
function searchOnClick(keyword) {
    const result = searchPlace(keyword);
    clearRoute();
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
    if(!isLocationAvailable) {
        console.log("現在地が取得できていません。代わりにBLOSSOM CAFEを出発地点とします");
        latitude = 34.6509499;
        longitude = 135.5898587;
        callBack();
    }
    planRoute(latitude, longitude, value.lat, value.lng);
}

// 🔎 入力正規化（全角半角・小文字統一）
function normalize(str) {
    return str
        .toLowerCase()
        .normalize("NFKC"); // 全角 → 半角
}

// 長音の揺らぎ
function addChoonVariations(str) {
    const variations = new Set([str]);
    if (str.includes("ー")) variations.add(str.replace(/ー/g, "-"));
    if (str.includes("-")) variations.add(str.replace(/-/g, "ー"));
    return [...variations];
}

// キーワードを正規化して複数の候補に展開
function expandKeywords(input) {
    const norm = normalize(input);
    const results = new Set([norm]);

    // --- 漢数字 → 数字 ---
    // シンプルに 1～39 まで対応
    const kanjiToNumber = {
        "零":0,"一":1,"二":2,"三":3,"四":4,"五":5,"六":6,"七":7,"八":8,"九":9,
        "十":10,"十一":11,"十二":12,"十三":13,"十四":14,"十五":15,"十六":16,"十七":17,"十八":18,"十九":19,
        "二十":20,"二十一":21,"二十二":22,"二十三":23,"二十四":24,"二十五":25,"二十六":26,"二十七":27,"二十八":28,"二十九":29,
        "三十":30,"三十一":31,"三十二":32,"三十三":33,"三十四":34,"三十五":35,"三十六":36,"三十七":37,"三十八":38,"三十九":39
    };
    Object.keys(kanjiToNumber).forEach(k => {
        if (norm.includes(k)) {
            results.add(norm.replace(new RegExp(k, "g"), String(kanjiToNumber[k])));
        }
    });

    // --- ひらがな数詞 → 数字 ---
    const hiraToNumber = {
        "ぜろ":0,"いち":1,"に":2,"さん":3,"よん":4,"し":4,"ご":5,"ろく":6,"なな":7,"しち":7,"はち":8,"きゅう":9,
        "じゅう":10,"じゅういち":11,"じゅうに":12,"じゅうさん":13,"じゅうよん":14,"じゅうし":14,"じゅうご":15,
        "じゅうろく":16,"じゅうなな":17,"じゅうしち":17,"じゅうはち":18,"じゅうきゅう":19,
        "にじゅう":20,"にじゅういち":21,"にじゅうに":22,"にじゅうさん":23,"にじゅうよん":24,"にじゅうし":24,"にじゅうご":25,
        "にじゅうろく":26,"にじゅうなな":27,"にじゅうしち":27,"にじゅうはち":28,"にじゅうきゅう":29,
        "さんじゅう":30,"さんじゅういち":31,"さんじゅうに":32,"さんじゅうさん":33,"さんじゅうよん":34,"さんじゅうし":34,"さんじゅうご":35,
        "さんじゅうろく":36,"さんじゅうなな":37,"さんじゅうしち":37,"さんじゅうはち":38,"さんじゅうきゅう":39
    };
    Object.keys(hiraToNumber).forEach(h => {
        if (norm.includes(h)) {
            results.add(norm.replace(new RegExp(h, "g"), String(hiraToNumber[h])));
        }
    });

    // --- ひらがな → アルファベット ---
    const hiraToAlphabet = {
        "えー":"A","びー":"B","しー":"C","でぃー":"D","でー":"D","いー":"E","えふ":"F","じー":"G","えいち":"H",
        "あい":"I","じぇー":"J","けー":"K","える":"L","えむ":"M","えぬ":"N","おー":"O","ぴー":"P",
        "きゅー":"Q","あーる":"R","えす":"S","てぃー":"T","ゆー":"U","ぶい":"V","だぶりゅー":"W","えっくす":"X",
        "わい":"Y","ぜっと":"Z"
    };
    Object.keys(hiraToAlphabet).forEach(h => {
        if (norm.includes(h)) {
            results.add(norm.replace(new RegExp(h, "g"), hiraToAlphabet[h]));
        }
    });

    console.log(results);
    
    return [...results];
}

// 🔎 検索処理
function search(input, isExact = false) {
    const expandedInputs = expandKeywords(input);

    return places.filter(p =>
        p.names.some(n => {
            return expandedInputs.some(e =>
                isExact ? n === e : n.includes(e) || e.includes(n)
            );
        })
    );
}

// 検索処理
// isExact: true → 完全一致, false → 部分一致
function searchPlace(input, isExact = false) {

    // 既存マーカー削除
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    var found = search(input, isExact);

    if (found.length > 0) {
        found = addDistanceToResults(found);
        found = sortResults(found);
        found.forEach(f => {
            var m = L.marker([f.lat, f.lng]).addTo(map);
            markers.push(m);
            console.log(renderCard(f));
        });
        map.setView([found[0].lat, found[0].lng], 18);
    } else {
        alert("見つかりませんでした");
    }
    return found;
}

// 座標間距離を算出
function calcDistance(lat1, lng1, lat2, lng2) {
    const R = 6378137; // 地球半径(m)
    const toRad = deg => deg * Math.PI / 180; // 1° をラジアンに換算した値

    const x = (lng2 - lng1) * Math.cos(toRad((lat1 + lat2) / 2));
    const y = (lat2 - lat1);

    const distance = Math.sqrt(x * x + y * y) * (Math.PI / 180) * R;
    return distance;
}

// 「自動販売機」と「ゴミ箱」のみ距離を追加
function addDistanceToResults(results) {
    return results.map(r => {
        if (r.names.includes("自動販売機") || r.names.includes("ゴミ箱")) {
            r.distance = calcDistance(latitude, longitude, r.lat, r.lng);
            r.detail = renderCard(r);
        } else {
            r.distance = null;
            r.detail = null;
        }
        return r;
    });
}

// 距離順に並び替える
function sortResults(results) {
    const vendingAndTrash = results.filter(r =>
        r.names.includes("自動販売機") || r.names.includes("ゴミ箱")
    );
    const others = results.filter(r =>
        !r.names.includes("自動販売機") && !r.names.includes("ゴミ箱")
    );

    // 距離順に並び替える
    vendingAndTrash.sort((a, b) => (a.distance || 0) - (b.distance || 0));

    // 「それ以外 → 対象」の順で返す
    return [...others, ...vendingAndTrash];
}

// カード生成時に距離を表示
function renderCard(result) {
    let text = "";
    if (result.distance !== null) {
        text += `約${result.distance.toFixed(0)}m`;
    }
    return text;
}