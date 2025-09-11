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

    // ラジオボタンの配列
    const facilityRadios = document.querySelectorAll("input[name='facility']");


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
    });

    // 検索ボタンを押したら結果を表示
    doSearchBtn.addEventListener("click", () => {
        const keyword = searchInput.value;
        listContena.innerHTML = "";
        results = searchOnClick(keyword);
        results.forEach((result) => {
            const card = document.createElement("div");
            card.className = "result-card";
            card.textContent = result.names[0];
            card.onclick = () => cardOnClick(result)
            listContena.appendChild(card);
        });
    });

    // --- ラジオボタン選択イベント ---
    facilityRadios.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            facilityRadioOnClick(event.target.value);
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
        const placesOfType = facilityGroups[type];

        //【変更点②】サブアコーディオン作成時、親のコンテンツ要素(facilityContent)を渡す
        const subAccordionContent = createAccordion(facilityContent, displayName, facilityContent);
        createRadioButtons(subAccordionContent, placesOfType);
    });
});