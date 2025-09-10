
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
    function planRoute(startPoint, endPoint){
        // 既存の経路案内がある場合は削除
        if (this.routingControl) {
            this.map.removeControl(this.routingControl);
        }

        const start = places.find(place => place.names.includes(startPoint));
        const end = places.find(place => place.names.includes(endPoint));
        if (!start || !end) {
            console.error("指定された開始点または終了点が見つかりません");
            return;
        }

        console.log(`経路案内を作成: ${startPoint} (${start.lat}, ${start.lng}) から ${endPoint} (${end.lat}, ${end.lng}) へ`);

        this.routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start.lat, start.lng),
                L.latLng(end.lat, end.lng)
            ],
            routeWhileDragging: true,
            autoRoute: true
        }).addTo(this.map);

    }
