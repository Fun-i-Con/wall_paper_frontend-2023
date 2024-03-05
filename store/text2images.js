var currentTags = { words : [] } //APIの要件に合わせて変更

// タグが追加されたときのイベントリスナー
tagify.on('add', event => {
    currentTags.words.push(event.detail.data.value);//ここは修正？
    updateImages();
});

// タグが削除されたときのイベントリスナー
tagify.on('remove', event => {
    var index = currentTags.words.indexOf(event.detail.data.value);
    if (index !== -1) {
        // currentTags.splice(index, 1);
        currentTags.words.splice(index, 1);
    }
    updateImages();
});

// 画像を更新する関数
function updateImages() {
    var container = document.getElementById('image-container');
    container.innerHTML = ''; // コンテナをクリア

    const url = "http://34.84.217.185/search/result";
    //APIを叩く
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({'words': currentTags['words'], "sessionNumber": JSON.parse(localStorage.getItem('sessionNumber')) })
    })
    .then(response => response.json())
    .then(responseData => {
        for(let i = 0; i < responseData.names.length; i++){
            var img = document.createElement('img');
            img.src = "http://34.84.217.185/image?name=" + responseData.names[i] + "&mode=2";
            img.alt = 'Image for ' + responseData.names[i];
            container.appendChild(img);

            // 画像にクリックイベントを追加
            img.addEventListener('click', function () {
                var x="http://34.84.217.185/image?name=" + responseData.names[i] + "&mode=1";;//リサイズ
                var y="http://34.84.217.185/image?name=" + responseData.names[i] + "&mode=3";;//３ｄ
                displayModal(x,y, responseData.original[i]);
            });
        }
    })
}

// ページ読み込み時にタグを入れる
document.addEventListener('DOMContentLoaded', function() {
    updateImages();
});