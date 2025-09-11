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
                    return L.marker(waypoint.latLng, { draggable: false });
                }
                return null;
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