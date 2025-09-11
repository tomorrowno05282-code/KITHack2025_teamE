    /**
     * 
     * @param {*} startPoint string
     * @param {*} endPoint string
     * 
     * data.jsのplacesデータを利用して経路案内を表示
     * 
     * 
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