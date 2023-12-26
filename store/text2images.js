var currentTags = []; // 現在のタグを保持するリスト

// タグが追加されたときのイベントリスナー
tagify.on('add', event => {
    currentTags.push(event.detail.data.value);
    updateImages();
});

// タグが削除されたときのイベントリスナー
tagify.on('remove', event => {
    var index = currentTags.indexOf(event.detail.data.value);
    if (index !== -1) {
        currentTags.splice(index, 1);
    }
    updateImages();
});

// 画像を更新する関数
function updateImages() {
    var container = document.getElementById('image-container');
    container.innerHTML = ''; // コンテナをクリア

    // 各タグに対してダミー画像を表示
    currentTags.forEach(tag => {
        var img = document.createElement('img');
        img.src = 'https://placehold.jp/200x200.png'; // ダミー画像のパス
        img.alt = 'Image for ' + tag;
        container.appendChild(img);
    });
}
