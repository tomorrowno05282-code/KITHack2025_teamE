/**
 * 検索ボタンが押されたトリガー
 * @param {string} keyword 検索ワード
 * @returns 検索結果
 */
function searchOnClick(keyword){
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