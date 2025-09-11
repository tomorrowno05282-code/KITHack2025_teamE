    /**
     * 経路案内を作成
     * @param {number} strlat - 出発地点の緯度
     * @param {number} strlng - 出発地点の経度
     * @param {number} endlat - 目的地の緯度
     * @param {number} endlng - 目的地の経度
     * 参考: https://www.liedman.net/leaflet-routing-machine/
     */
    function planRoute(strlat,strlng, endlat, endlng){
        clearRoute();
        clearAllMarkers()
        if (!strlat || !strlng || !endlat || !endlng) {
            console.error("指定された座標が見つかりません");
            return;
        }

        console.log(`経路案内を作成: (${strlat}, ${strlng}) から (${endlat}, ${endlng}) へ`);

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(strlat, strlng),
                L.latLng(endlat, endlng)
            ],
            routeWhileDragging: true,
            autoRoute: true,
            addWaypoints: false,
            createMarker: function(i, waypoint, n) {
                if (i === 0) {
                    return null;
                }
                return L.marker(waypoint.latLng, {
                    draggable: false, // ドラッグできないように設定
                    icon: L.icon({
                        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })
                });
            }
        }).addTo(this.map);

        this.routingControl = routingControl;
    }

    function clearRoute(){
        if (this.routingControl) {
            this.map.removeControl(this.routingControl);
            this.routingControl = null;
        }
    }

    function clearAllMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
}