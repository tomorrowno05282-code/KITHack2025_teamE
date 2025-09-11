
    /**
     * 
     * @param {*} startPoint string
     * @param {*} endPoint string
     * 
     * data.jsのplacesデータを利用して経路案内を表示
     * 
     * 例: planRoute("E館", "11月ホール");
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

        this.routingControl = L.Routing.control({
            waypoints: [
                L.latLng(strlat, strlng),
                L.latLng(endlat, endlng)
            ],
            routeWhileDragging: true,
            autoRoute: true
        }).addTo(this.map);

    }

    function clearRoute(){
        if (this.routingControl) {
            this.map.removeControl(this.routingControl);
            this.routingControl = null;
        }
    }
