let latitude;
let longitude;
let marker;
let isLocationAvailable = false;

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
}

navigator.geolocation.watchPosition(success, error, options);

function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    callBack();
    isLocationAvailable = true;
}

function error(error) {
    PERMISSION_DENIED = 1; // GPS機能の利用が許可されていない
    POSITION_UNAVAILABLE = 2; // 何らかの内部エラーが発生した
    TIMEOUT = 3; // タイムアウト
    isLocationAvailable = false;
}

function callBack() {
    // ToDo:リアルタイムで更新されるようにする.
    var tuna_Icon = L.icon({ iconUrl: 'tuna.png', iconRetinaUrl: 'tuna.png', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -30] });

    let options = {
        pulsing: true, accuracy: 15, smallIcon: true, circleRadius: 10
    };
    if(marker === undefined || marker === null){
        marker = L.userMarker([latitude, longitude], options);
        marker.addTo(map).bindPopup("現在地");
        marker.setIcon(tuna_Icon);
    } else {
        marker.setLatLng([latitude, longitude]);
    }
}