function displayModal(resizedUrl, threeDUrl, wallName) {
    let isResizedImageShown = true;  // 最初はリサイズされた画像を表示

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.style.display = 'block';

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const image = document.createElement("img");
    image.src = resizedUrl;  // 最初に表示する画像
    image.style.width = '70vw';  // 画像サイズの指定
    modalContent.appendChild(image);

    const message = document.createElement("p");
    const message_3D = document.createElement("b");
    message_3D.className = "message_test";
    message_3D.textContent = "壁紙をクリックするとモデルルームを見ることができます";

    const Textbr_3D = document.createElement("br");

    // messageに子要素を追加
    message.appendChild(message_3D);
    message.appendChild(Textbr_3D);

    // modalContentにmessageを追加
    modalContent.appendChild(message);

    //
    if(wallName != ""){
      const wallNameText = document.createElement("p");
      wallNameText.textContent = "壁紙の名前: " + wallName;

      const Textbr = document.createElement("br");
      wallNameText.appendChild(Textbr);

      const link = document.createElement("a");
      link.href = "https://www.tecido.co.jp/products/search/?q=" + wallName + "&r=item%3AITEM%3A129%2Ctype%3ATYPE%3A2";
      link.textContent = "商品ページはこちら";
      link.target = "_blank"; // 新しいタブまたはウィンドウで開く
      wallNameText.appendChild(link);
      modalContent.appendChild(wallNameText);
    }
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.addEventListener("click", function () {
      
        // 画像をクリックしたときのイベントハンドラ
      image.addEventListener("click", function (e) {
        e.stopPropagation();  // イベントの伝播を停止

        const width = image.clientWidth; // 画像の幅
        const x = e.offsetX; // クリックされたX座標

        // 画像の右半分をクリックした場合にのみ切り替える
        if (x > width / 2) {
          if (isResizedImageShown) {
            image.src = threeDUrl;  // 3D画像に切り替え
            isResizedImageShown = false;
          } else {
            image.src = resizedUrl;  // リサイズされた画像に戻す
            isResizedImageShown = true;
          }
        } else {
          if (!isResizedImageShown) {
            image.src = resizedUrl;  // リサイズされた画像に戻す
            isResizedImageShown = true;
          }
        }
      });

    });

    // 画像をクリックしたときのイベントハンドラ
    image.addEventListener("click", function (e) {
      e.stopPropagation();  // イベントの伝播を停止

      const width = image.clientWidth; // 画像の幅
      const x = e.offsetX; // クリックされたX座標

      if (x < width) {
        if (isResizedImageShown) {
          image.src = threeDUrl;  // 3D画像に切り替え
          isResizedImageShown = false;
          // メッセージを変更
          message_3D.textContent = "モデルルームをクリックすると壁紙を見ることができます";
        } else {
          image.src = resizedUrl;  // リサイズされた画像に戻す
          isResizedImageShown = true;
          // メッセージを変更
          message_3D.textContent = "壁紙をクリックするとモデルルームを見ることができます";
        }
      } else {
        if (!isResizedImageShown) {
          image.src = resizedUrl;  // リサイズされた画像に戻す
          isResizedImageShown = true;
          // メッセージを変更
          message_3D.textContent = "壁紙をクリックするとモデルルームを見ることができます";
        }
      }
    });

    // モーダルをクリックしたときに閉じる
    modal.addEventListener("click", function () {
      modal.style.display = 'none';
      modal.remove();
    });
  }