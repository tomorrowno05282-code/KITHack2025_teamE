let latitude;
let longitude;
let marker;

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 100,
}

navigator.geolocation.watchPosition(success, error, options);

function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    callBack();
}

function error(error) {
    PERMISSION_DENIED = 1; // GPS機能の利用が許可されていない
    POSITION_UNAVAILABLE = 2; // 何らかの内部エラーが発生した
    TIMEOUT = 3; // タイムアウト
    console.log(TIMEOUT);
}
    //setInterval(callBack, 5000); // ToDo:読み込み順を適切にする.

function callBack() {
    // ToDo:リアルタイムで更新されるようにする.
    let options = {
        pulsing: true, accuracy: 1, smallIcon: true
    };
    // L.userMarker([latitude, longitude], options).addTo(map).bindPopup("pulsing true");
    if(marker == undefined){
        marker = L.userMarker([latitude, longitude], options);
        marker.addTo(map).bindPopup("現在地");
    } else {
        marker = L.userMarker([latitude, longitude], options);
    }
}