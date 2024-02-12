var slider; // グローバルスコープでslider変数を定義
var wallimage = [];
var progress_bar_image = [];

window.onload = function () {
  getResult();
}

async function removeImages() {
  return new Promise((resolve) => {
    for (let i = 0; i < wallimage.length; i++) {
      // slider変数を使用してスライダーから画像を削除
      slider.slick('slickRemove', i, true);
    }
    slider.slick('unslick');
    slider.empty();

    // 削除が完了したことをresolveで通知
    resolve();
  });
}

async function reset() {
  wallimage = [];

  // 画像の削除
  await removeImages();
  // 画像の更新
  getResult();
}

function getResult() {
  const score = new scoreStore();
  const url = "http://34.84.217.185/calc";

  // js-reinitのクリックイベントリスナーを解除
  $('.js-reinit').off('click');

  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(score.getScore())
  })
  .then(response => response.json())
  .then(responseData => {
      for(let i = 0; i < responseData.choosed.length; i++){
        let name = "S" + String(i + 1)
        const imgElement = document.getElementById(name);
        if(responseData.choosed[i] != "" && responseData.choosed[i] != null){
          progress_bar_image.push(responseData.choosed[i]);
          imgElement.src = "http://34.84.217.185/image?name=" + responseData.choosed[i] + "&mode=2"
        }else{
          progress_bar_image.push("../img/bad_luck.png");
          imgElement.src = "../img/bad_luck.png";
        }
      }
      //
      for(let i = 0; i < responseData.result.names.length; i++){
          wallimage.push("http://34.84.217.185/image?name=" + responseData.result.names[i] + "&mode=2");
      }
      slider = $(".slider");

      // 画像更新ボタンのクリックイベントリスナー
      $('.js-reinit').on('click', function() {
        // 画像の削除とリセット
        reset();
      });

      if (slider.length > 0) {
      Promise.all(wallimage.map(loadImage))
        .then(images => {
          images.forEach((img, index) => {
            const li = $("<li></li>");
            $(li).append(img);

            $(li).on("click", () => {
              var x="http://34.84.217.185/image?name="+responseData.result.names[index]+"&mode=1";//リサイズ
              var y="http://34.84.217.185/image?name="+responseData.result.names[index]+"&mode=3";//３ｄ
                  
              displayModal(x,y, responseData.result.originals[index]);
            });

            slider.append(li);
          });

          // 画像の読み込みが完了した後にスライダーを初期化
          slider.slick({
            autoplay: true,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<div class="slick-prev"></div>',
            nextArrow: '<div class="slick-next"></div>',
            centerMode: true,
            variableWidth: true,
            dots: true,
          });
        })
        .catch(error => console.error("画像の読み込みエラー", error));
      }
    })
      .catch(error => console.error("APIのエラー", error));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function choosedModal(num){
  if(progress_bar_image[num] != "../img/bad_luck.png"){
    var x="http://34.84.217.185/image?name="+progress_bar_image[num]+"&mode=1";//リサイズ
    var y="http://34.84.217.185/image?name="+progress_bar_image[num]+"&mode=3";//３ｄ
  }else{
    var x = "../img/bad_luck.png";
    var y = "../img/bad_luck.png";
  }

  //結果画面でのxでモーダルが動かないように
  if(progress_bar_image[num] != "../img/bad_luck.png"){
    displayModal(x,y, "");
  }
}