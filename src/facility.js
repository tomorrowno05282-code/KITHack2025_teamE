/**
 * 施設のラジオボタンが押された際のトリガー
 * @param {string} facility 施設のid
 * inputs[name='facility']のvalueと対応
 * 
 * search.jsにあるsearchPlace()を呼び出してマーカーを表示
 * 例: searchPlace("自動販売機");
 * 
 */


function facilityRadioOnClick(facility) {

    switch (facility) {
        // 1〜39号館
        case "1号館":
        case "1ごうかん":
            console.log("1号館が選択されました");
            searchPlace("1号館", true);
            break;
        case "2号館":
        case "2ごうかん":
            console.log("2号館が選択されました");
            searchPlace("2号館", true);
            break;
        case "3号館":
        case "3ごうかん":
            console.log("3号館が選択されました");
            searchPlace("3号館", true);
            break;
        case "4号館":
        case "4ごうかん":
            console.log("4号館が選択されました");
            searchPlace("4号館", true);
            break;
        case "5号館":
        case "5ごうかん":
            console.log("5号館が選択されました");
            searchPlace("5号館", true);
            break;
        case "6号館":
        case "6ごうかん":
            console.log("6号館が選択されました");
            searchPlace("6号館", true);
            break;
        case "7号館":
        case "7ごうかん":
            console.log("7号館が選択されました");
            searchPlace("7号館", true);
            break;
        case "10号館":
        case "10ごうかん":
            console.log("10号館が選択されました");
            searchPlace("10号館", true);
            break;
        case "15号館":
        case "15ごうかん":
            console.log("15号館が選択されました");
            searchPlace("15号館", true);
            break;
        case "17号館":
        case "17ごうかん":
            console.log("17号館が選択されました");
            searchPlace("17号館", true);
            break;
        case "18号館":
        case "18ごうかん":
            console.log("18号館が選択されました");
            searchPlace("18号館", true);
            break;
        case "19号館":
        case "19ごうかん":
            console.log("19号館が選択されました");
            searchPlace("19号館", true);
            break;
        case "20号館":
        case "20ごうかん":
            console.log("20号館が選択されました");
            searchPlace("20号館", true);
            break;
        case "21号館":
        case "21ごうかん":
            console.log("21号館が選択されました");
            searchPlace("21号館", true);
            break;
        case "22号館":
        case "22ごうかん":
            console.log("22号館が選択されました");
            searchPlace("22号館", true);
            break;
        case "30号館":
        case "30ごうかん":
            console.log("30号館が選択されました");
            searchPlace("30号館", true);
            break;
        case "31号館":
        case "31ごうかん":
            console.log("31号館が選択されました");
            searchPlace("31号館", true);
            break;
        case "33号館":
        case "33ごうかん":
            console.log("33号館が選択されました");
            searchPlace("33号館", true);
            break;
        case "36号館":
        case "36ごうかん":
            console.log("36号館が選択されました");
            searchPlace("36号館", true);
            break;
        case "37号館":
        case "37ごうかん":
            console.log("37号館が選択されました");
            searchPlace("37号館", true);
            break;
        case "38号館":
        case "38ごうかん":
            console.log("38号館が選択されました");
            searchPlace("38号館", true);
            break;
        case "39号館":
        case "39ごうかん":
            console.log("39号館が選択されました");
            searchPlace("39号館", true);
            break;

        // A〜G館
        case "A館":
        case "Aかん":
            console.log("A館が選択されました");
            searchPlace("A館", true);
            break;
        case "B館":
        case "Bかん":
            console.log("B館が選択されました");
            searchPlace("B館", true);
            break;
        case "C館":
        case "Cかん":
            console.log("C館が選択されました");
            searchPlace("C館", true);
            break;
        case "D館":
        case "Dかん":
            console.log("D館が選択されました");
            searchPlace("D館", true);
            break;
        case "E館":
        case "Eかん":
            console.log("E館が選択されました");
            searchPlace("E館", true);
            break;
        case "F館":
        case "Fかん":
            console.log("F館が選択されました");
            searchPlace("F館", true);
            break;
        case "G館":
        case "Gかん":
            console.log("G館が選択されました");
            searchPlace("G館", true);
            break;

        // その他の建物
        case "11月ホール":
        case "11がつほーる":
            console.log("11月ホールが選択されました");
            searchPlace("11月ホール", true);
            break;
        case "BLOSSOM CAFE":
        case "ぶろっさむかふぇ":
            console.log("BLOSSOM CAFEが選択されました");
            searchPlace("BLOSSOM CAFE", true);
            break;
        case "RI棟":
        case "RIとう":
            console.log("RI棟が選択されました");
            searchPlace("RI棟", true);
            break;
        case "ゲストハウス":
            console.log("ゲストハウスが選択されました");
            searchPlace("ゲストハウス", true);
            break;
        case "原子炉棟":
        case "げんしろとう":
            console.log("原子炉棟が選択されました");
            searchPlace("原子炉棟", true);
            break;
        case "情報処理教育棟(kudos)":
        case "じょうほうしょりきょういくとう(きゅーだす)":
            console.log("情報処理教育棟(kudos)が選択されました");
            searchPlace("情報処理教育棟(kudos)", true);
            break;
        case "本館":
        case "ほんかん":
            console.log("本館が選択されました");
            searchPlace("本館", true);
            break;
        case "液化窒素":
        case "えきかちっそ":
            console.log("液化窒素が選択されました");
            searchPlace("液化窒素", true);
            break;
        case "近畿大学附属高校":
        case "きんきだいがくふぞくこうこう":
            console.log("近畿大学附属高校が選択されました");
            searchPlace("近畿大学附属高校", true);
            break;
        case "立体駐車場":
        case "りったいちゅうしゃじょう":
            console.log("立体駐車場が選択されました");
            searchPlace("立体駐車場", true);
            break;
        case "管理棟":
        case "かんりとう":
            console.log("管理棟が選択されました");
            searchPlace("管理棟", true);
            break;
        case "英語村 e-cube":
        case "えいごむら いーきゅーぶ":
            console.log("英語村 e-cubeが選択されました");
            searchPlace("英語村 e-cube", true);
            break;
        case "記念会館別館":
        case "きねんかいかんべっかん":
            console.log("記念会館別館が選択されました");
            searchPlace("記念会館別館", true);
            break;
        case "記念会館":
        case "きねんかいかん":
            console.log("記念会館が選択されました");
            searchPlace("記念会館", true);
            break;
        case "クラブセンター":
        case "くらぶせんたー":
            console.log("クラブセンターが選択されました");
            searchPlace("クラブセンター", true);
            break;
        case "入学センター":
        case "にゅうがくせんたー":
            console.log("入学センターが選択されました");
            searchPlace("入学センター", true);
            break;
        case "南グラウンド":
        case "みなみぐらうんど":
            console.log("南グラウンドが選択されました");
            searchPlace("南グラウンド", true);
            break;
        case "人工芝グラウンド":
        case "じんこうしばぐらうんど":
            console.log("人工芝グラウンドが選択されました");
            searchPlace("人工芝グラウンド", true);
            break;
        case "北テニスコート":
        case "きたてにすこーと":
            console.log("北テニスコートが選択されました");
            searchPlace("北テニスコート", true);
            break;
        case "バイク駐輪場":
        case "ばいくちゅうりんじょう":
            console.log("バイク駐輪場が選択されました");
            searchPlace("バイク駐輪場", true);
            break;
        case "メタルパーキング":
        case "めたるぱーきんぐ":
            console.log("メタルパーキングが選択されました");
            searchPlace("メタルパーキング", true);
            break;
        case "クラブセンターグラウンド":
        case "くらぶせんたーぐらうんど":
            console.log("クラブセンターグラウンドが選択されました");
            searchPlace("クラブセンターグラウンド", true);
            break;
        case "東グラウンド":
        case "ひがしぐらうんど":
            console.log("東グラウンドが選択されました");
            searchPlace("東グラウンド", true);
            break;

        // 施設系
        case "vending":
            console.log("自動販売機が選択されました");
            searchPlace("自動販売機", true);
            break;
        case "printer":
            console.log("プリンターが選択されました");
            searchPlace("プリンター", true);
            break;
        case "restaurant":
            console.log("飲食店が選択されました");
            searchPlace("飲食店", true);
            break;
        case "trash":
            console.log("ゴミ箱が選択されました");
            searchPlace("ゴミ箱", true);
            break;

        // テスト用
        case "test":
            console.log("テストが選択されました");
            planRoute("E館", "11月ホール");
            break;
        case "test1":
            console.log("テスト1が選択されました");
            planRoute("E館", "近畿大学 記念会館");
            break;

        default:
            console.log("不明な施設が選択されました");
    }
}
