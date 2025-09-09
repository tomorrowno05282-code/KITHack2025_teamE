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
    
    switch(facility){
        case "vending":
            // 自動販売機が選択された場合の処理
            console.log("自動販売機が選択されました");
            searchPlace("自動販売機"); 
            break;
        case "printer":
            // プリンターが選択された場合の処理
            console.log("プリンターが選択されました");
            searchPlace("プリンター"); // 仮(実際にはデータがない)
            break;
        case "restaurant":
            // 飲食店が選択された場合の処理
            console.log("飲食店が選択されました");
            searchPlace("飲食店"); // 仮(実際にはデータがない)
            break;
        case "trash":
            // ゴミ箱が選択された場合の処理
            console.log("ゴミ箱が選択されました");
            searchPlace("ゴミ箱"); // 仮(実際にはデータがない)
            break;
        default:
            console.log("不明な施設が選択されました");
    }
}