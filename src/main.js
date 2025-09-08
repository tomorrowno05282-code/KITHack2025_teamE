document.addEventListener("DOMContentLoaded", () => {
    // ボタン、要素
    const searchBtn = document.getElementById("search-btn");
    const facilityBtn = document.getElementById("find-facility-btn");
    const searchMode = document.querySelector(".mode-search");
    const facilityMode = document.querySelector(".mode-sisetu");
    const listContena = document.getElementById("listcontena");
    const searchInput = searchMode.querySelector("input[type='text']");
    const doSearchBtn = document.getElementById("do-search-btn");

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
            card.onclick = () => cardOnClick(result)
            listContena.appendChild(card);
        });
    });

    // --- ラジオボタン選択イベント ---
    facilityRadios.forEach(radio => {
        radio.addEventListener("change", (event) => {
            facilityRadioOnClick(event.target.value)
        });
    });
});
