var currentTags = { words : [] } //APIの要件に合わせて変更

// タグが追加されたときのイベントリスナー
tagify.on('add', event => {
    currentTags.words.push(event.detail.data.value);//ここは修正？
    console.log("currentTags");
    console.log(currentTags);
    updateImages();
});

// タグが削除されたときのイベントリスナー
tagify.on('remove', event => {
    var index = currentTags.words.indexOf(event.detail.data.value);
    console.log(index);
    if (index !== -1) {
        // currentTags.splice(index, 1);
        currentTags.words.splice(index, 1);
        console.log("currentTags");
        console.log(currentTags);
    }
    updateImages();
});

// 画像を更新する関数
function updateImages() {
    var container = document.getElementById('image-container');
    container.innerHTML = ''; // コンテナをクリア

    var result = [];

    // "緑"が含まれている場合
    if (currentTags.words.includes("緑")) {
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
        result.push("CY1551");
        result.push("CBBA84327507");
    }
    // "赤"が含まれている場合
    if (currentTags.words.includes("赤ちゃん")) {
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
        result.push("338-346829");
    }
    // 上記のいずれも該当しない場合
    if(currentTags.words.includes("木製")) {
        result.push("PAI100221603");
        result.push("PAI100221603");
        result.push("PAI100221603");
    }

    for(let i = 0; i < result.length; i++){
        var img = document.createElement('img');
        img.src = "http://35.187.199.64/image?name=" + result[i] + "&mode=2";
        img.alt = 'Image for ' + result[i];
        container.appendChild(img);

        // 画像にクリックイベントを追加
        img.addEventListener('click', function () {
            handleImageClick(result[i]);
        });
    }

    // const url = "http://35.187.199.64/search/results";
    // //APIを叩く
    // fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(currentTags)
    // })
    // .then(response => response.json())
    // .then(responseData => {
    //     for(let i = 0; i < responseData.result.names.length; i++){
    //         var img = document.createElement('img');
    //         img.src = "http://35.187.199.64/image?name=" + responseData.result.names[i] + "&mode=2";
    //         img.alt = 'Image for ' + responseData.result.names[i];
    //         container.appendChild(img);
    //     }
    // })
}

// ページ読み込み時にタグを入れる
document.addEventListener('DOMContentLoaded', function() {
    tagify.addTags(["緑"]);
    updateImages();
});

// 画像がクリックされた時の処理
function handleImageClick(imageName) {
    // クリックされた画像の処理をここに書く
    console.log('Image clicked:', imageName);
    var x="http://35.187.199.64/image?name="+imageName+"&mode=1";//リサイズ
    var y="http://35.187.199.64/image?name="+imageName+"&mode=3";//３ｄ
        
    displayModal(x,y, imageName);
}