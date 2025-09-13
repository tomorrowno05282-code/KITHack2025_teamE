document.addEventListener("DOMContentLoaded", () => {
    // ボタン、要素
    const searchBtn = document.getElementById("search-btn");
    const facilityBtn = document.getElementById("find-facility-btn");
    const searchMode = document.querySelector(".mode-search");
    const facilityMode = document.querySelector(".mode-sisetu");
    const listContena = document.getElementById("listcontena");
    const searchInput = searchMode.querySelector("input[type='text']");
    const doSearchBtn = document.getElementById("do-search-btn");

    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const handle = document.querySelector(".drag-handle");

    // 初期状態: 検索モードを表示
    searchMode.style.display = "block";
    facilityMode.style.display = "none";
    searchBtn.classList.add("active");

    // 検索モード表示
    searchBtn.addEventListener("click", () => {
        searchMode.style.display = "block";
        facilityMode.style.display = "none";
        searchBtn.classList.add("active");
        facilityBtn.classList.remove("active");
    });

    // 施設を探すモード表示
    facilityBtn.addEventListener("click", () => {
        searchMode.style.display = "none";
        facilityMode.style.display = "block";
        facilityBtn.classList.add("active");
        searchBtn.classList.remove("active");
        clearRoute(); // ルート表示をクリア
    });

    // 検索ボタンを押したら結果を表示
    doSearchBtn.addEventListener("click", () => {
        const keyword = searchInput.value;
        listContena.innerHTML = "";
        results = searchOnClick(keyword);
        results.forEach((result) => {
            const card = document.createElement("div");
            card.className = "result-card";
            card.innerHTML = `
                <div class="result-title">${result.names[0]}</div>
                <div class="result-detail">${result.detail ? result.detail : "詳細情報はありません"}</div>
            `;
            card.onclick = () => {
                // すでに開いているものを閉じる
                document.querySelectorAll('.result-card.expanded').forEach(el => {
                    if (el !== card) el.classList.remove('expanded');
                });
                // 自分をトグル
                card.classList.toggle('expanded');
                cardOnClick(result);
            };
            listContena.appendChild(card);
        });
    });

    let isDragging = false;

    handle.addEventListener("mousedown", startDrag);
    handle.addEventListener("touchstart", startDrag);

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("touchmove", onDrag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
    }

    function onDrag(e) {
        if (!isDragging) return;

        const isPortrait = window.matchMedia("(orientation: portrait)").matches;

        if (isPortrait) {
            // 縦長: 上下リサイズ
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const newHeight = window.innerHeight - clientY;

            // 最小・最大値を設定（例: 20%〜80%）
            const minHeight = window.innerHeight * 0.2;
            const maxHeight = window.innerHeight * 0.8;

            if (newHeight > minHeight && newHeight < maxHeight) {
                left.style.height = `${newHeight}px`;
            }
        } else {
            // 横長: 左右リサイズ
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;

            // 最小・最大幅を設定（例: 200px〜70%）
            const minWidth = 200;
            const maxWidth = window.innerWidth * 0.7;

            if (clientX > minWidth && clientX < maxWidth) {
                left.style.width = `${clientX}px`;
            }
        }
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("touchmove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchend", stopDrag);
    }

    // データをカテゴリ分けする
    const buildings = places.filter(p => p.type === 'building');
    const facilities = places.filter(p => p.type !== 'building');

    // 施設をさらにtypeでグループ化
    const facilityGroups = facilities.reduce((acc, place) => {
        // グループが存在しなければ初期化
        if (!acc[place.type]) {
            acc[place.type] = [];
        }
        acc[place.type].push(place);
        return acc;
    }, {});

    // typeの表示名を定義
    const facilityTypeNames = {
        'facility': 'その他施設',
        'restaurant': '食堂',
        'cafe': 'カフェ',
        'store': '売店・書籍',
        'vending_machine': '自動販売機',
        'trash_can': 'ゴミ箱'
    };


    const container = document.querySelector('.mode-sisetu');
    container.innerHTML = ''; // コンテナを初期化

    /**
     * アコーディオンの基本構造を作成する関数
     * @param {HTMLElement} parent - 追加先の親要素
     * @param {string} title - ヘッダーに表示するタイトル
     * @param {HTMLElement|null} [parentContentDiv=null] - 親アコーディオンのコンテンツ要素 (ネスト時に使用)
     * @returns {HTMLElement} - 中にコンテンツを追加するためのcontent要素
     */
    const createAccordion = (parent, title, parentContentDiv = null) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'accordion-item';

        const headerBtn = document.createElement('button');
        headerBtn.className = 'accordion-header';
        headerBtn.textContent = title;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'accordion-content';

        itemDiv.appendChild(headerBtn);
        itemDiv.appendChild(contentDiv);
        parent.appendChild(itemDiv);

        // クリックで開閉するイベントリスナー
        headerBtn.addEventListener('click', () => {
            headerBtn.classList.toggle('active');
            const isActive = headerBtn.classList.contains('active');

            if (isActive) {
                // 開くとき: scrollHeightでコンテンツの高さを取得して設定
                contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
            } else {
                // 閉るとき
                contentDiv.style.maxHeight = null;
            }

            //【変更点①】もし親アコーディオンが存在すれば、その高さを再計算する
            if (parentContentDiv && parentContentDiv.style.maxHeight) {
                // 子の開閉アニメーションに合わせて少し待ってから親の高さを更新する
                setTimeout(() => {
                    parentContentDiv.style.maxHeight = parentContentDiv.scrollHeight + 'px';
                }, 250); // CSSのtransition時間と合わせる
            }
        });
        return contentDiv;
    };

    /**
     * ラジオボタンのリストを作成する関数
     * (この関数に変更はありません)
     */
    const createRadioButtons = (parent, placesData) => {
        placesData.forEach(place => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            const span = document.createElement("span");

            input.type = "radio";
            input.name = "destination";
            input.value = place.names[0];
            input.dataset.lat = place.lat;
            input.dataset.lng = place.lng;
            span.textContent = place.names[0];

            label.appendChild(input);
            label.appendChild(span);
            parent.appendChild(label);
            input.onclick = () => searchPlace(place.names[0], true);
        });
    };

    // --- UIの構築 ---

    // 1. 「建物」カテゴリのアコーディオンを作成
    const buildingContent = createAccordion(container, '建物');
    createRadioButtons(buildingContent, buildings);

    // 2. 「施設」カテゴリのアコーディオンを作成
    const facilityContent = createAccordion(container, '施設');

    // 3. 「施設」の中に、各タイプのサブアコーディオンを作成
    Object.keys(facilityGroups).forEach(type => {
        const displayName = facilityTypeNames[type] || type;
        
        // もしtypeが自販機かゴミ箱だったら
        if (type === 'vending_machine' || type === 'trash_can') {
            // 複数の場所を代表する単一のラジオボタンを作成する
            const label = document.createElement("label");
            const input = document.createElement("input");
            const span = document.createElement("span");

            input.type = "radio";
            input.name = "destination";
            input.value = displayName; // "自動販売機" または "ゴミ箱"
            
            // マップ連携用に、単一地点ではなくグループであることを示す属性を追加
            input.dataset.groupType = type; 

            span.textContent = displayName;

            label.appendChild(input);
            label.appendChild(span);

            input.onclick = () => searchPlace(displayName, true);
            
            // 「施設」アコーディオンの直下に配置
            facilityContent.appendChild(label);
        } else {
            // それ以外の施設は、これまで通りサブアコーディオンを作成する
            const placesOfType = facilityGroups[type];
            const subAccordionContent = createAccordion(facilityContent, displayName, facilityContent);
            createRadioButtons(subAccordionContent, placesOfType);
        }
    });
// 1. 表示したい全てのエリア情報を配列にまとめる
const areaData = [
    {
        coords: [ // 1つ目: 芝生エリア
            [34.65134, 135.58764], [34.65136, 135.58824],
            [34.65114, 135.58825], [34.65111, 135.58766]
        ],
        style: { color: '#FFFFE5', fillColor: '#FFFFE5', fillOpacity: 1, weight: 1 },
        popup: 'ここは現在、芝生の広場です。',
        label: ''
    },
    {
        coords: [ // 2つ目: 新しいエリア1 
            [34.65219, 135.58857], [34.65219, 135.58894],
            [34.65188, 135.58900], [34.65190, 135.58860]
        ],
        style: { color: '#FFFFE5', fillColor: '#FFFFE5', fillOpacity: 1, weight: 1 },
        popup: '工事中',
        label: '工事中'
    },
    {
        coords: [ // 3つ目: 新しいエリア2 (例: カフェ前の広場)
            [34.65178, 135.58678], [34.65178, 135.58702],
            [34.65139, 135.58701], [34.65136, 135.58681]
        ],
        style: { color: '#D9D0C9', fillColor: '#D9D0C9', fillOpacity: 1, weight: 1 },
        popup: '工事中',
        label: '工事中'
    }
];

// 作成したポリゴンを管理するための配列
const labeledPolygons = [];

// areaData配列の各データに対して、ポリゴンとラベルを作成
areaData.forEach(data => {
    // ポリゴンを作成
    const polygon = L.polygon(data.coords, data.style).addTo(map);
    // ポップアップを追加
    polygon.bindPopup(data.popup);
    // ツールチップを作成して紐付け
    const tooltip = L.tooltip({
        permanent: true,
        direction: 'center',
        className: 'custom-label' // 共通のクラス名を使う
    }).setContent(data.label);
    polygon.bindTooltip(tooltip);
    // 管理用の配列に追加
    labeledPolygons.push(polygon);
});

// ズームレベルに応じて「すべての」ラベルの表示を切り替える関数
function checkAllLabelsVisibility() {
    const currentZoom = map.getZoom();

    labeledPolygons.forEach(polygon => {
        if (currentZoom >= 17) {
            if (!polygon.isTooltipOpen()) {
                polygon.openTooltip();
            }
        } else {
            if (polygon.isTooltipOpen()) {
                polygon.closeTooltip();
            }
        }
    });
}

// イベントリスナーを設定
map.on('zoomend', checkAllLabelsVisibility);

// 初回読み込み時にもチェックを実行
checkAllLabelsVisibility();

window.addEventListener('load', () => {
    const weatherContainer = document.getElementById('weather-container');
        // 最初にウィジェットのHTMLコードを記憶しておく
    const originalWidgetHTML = weatherContainer.innerHTML;

    // ウィジェットを再生成する関数
    function refreshWeatherWidget() {
        console.log("天気ウィジェットを更新します...", new Date().toLocaleTimeString());
        
        // コンテナの中身を一度空にする
        weatherContainer.innerHTML = '';

        // 記憶しておいた元のHTMLコードを再度挿入する
        // これにより、<script>タグが再実行され、ウィジェットが再描画される
        weatherContainer.innerHTML = originalWidgetHTML;
    }

    // 10分（600,000ミリ秒）ごとにrefreshWeatherWidget関数を実行
    setInterval(refreshWeatherWidget, 600000);
});

});