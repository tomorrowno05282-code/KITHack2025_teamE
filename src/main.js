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
            card.textContent = result;
            card.onclick = () => cardOnClick(result);
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
});
