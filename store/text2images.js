var currentTags = { words : [] } //APIの要件に合わせて変更

// タグが追加されたときのイベントリスナー
tagify.on('add', event => {
    currentTags.words.push(event.detail.data.value);
    console.log("currentTags");
    console.log(currentTags);
    updateImages();
});

// タグが削除されたときのイベントリスナー
tagify.on('remove', event => {
    var index = currentTags.words.indexOf(event.detail.data.value);
    if (index !== -1) {
        // currentTags.splice(index, 1);
        currentTags.words.splice(index, 1);
        console.log("currentTags");
        console.log(currentTags);
    }
    //仕様として検索できる単語は1つの可能性があるので、タグを削除したときに画像の更新を行う必要がない
    //updateImages();
});

// 画像を更新する関数
function updateImages() {
    var container = document.getElementById('image-container');
    container.innerHTML = ''; // コンテナをクリア

    //APIを叩く
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(currentTags)
    })
    .then(response => response.json())
    .then(responseData => {
        for(let i = 0; i < responseData.result.names.length; i++){
            var img = document.createElement('img');
            img.src = "http://35.187.199.64/image?name=" + responseData.result.names[i] + "&mode=2";
            img.alt = 'Image for ' + responseData.result.names[i];
            container.appendChild(img);
        }
    })
}

