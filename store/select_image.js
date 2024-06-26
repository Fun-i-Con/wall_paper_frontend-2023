    let count = 1;
    let question_num = 6;
    let question_list = Array.from({ length: 6 }, () => Array(4).fill(null));
    let question_flag = Array(question_num).fill(false);
    let selectedImages = Array(question_num).fill("../img/question_mark.png");
    let sessionNum = 0;

    const score = new scoreStore();
    score.setScore({ choices: [] });

    function updateProgressBar() {
      let progress_value = (count / question_num) * 100;
      $("#progressbar").progressbar({
        value: progress_value
      });
      $("#progressbar").find(".ui-progressbar-value").css({
        'background': '#00BFFF'
      });
      $("#progressbar").css({
        'border-radius': '100vh'
      });
    };

    window.addEventListener('load', async function () {
      const imageContainer = document.getElementById("image-container");

      let result1 = await getQuestion_one();
      if (result1) {
        for (let i = 0; i < question_list[0].length && i < 4; i++) {
          const imageElement = document.getElementById("A" + (i + 1));
          imageElement.src = "http://34.84.217.185/image?name=" + question_list[0][i] + "&mode=2";
        }
        question_flag[0] = true;
      } else {
          alert("質問1の通信に失敗しました。ページをもう一度読み込んでください。");
      }
      getQuestion_other();
  });

    async function getQuestion_one() {
        try {
          const response = await fetch("http://34.84.217.185/question?num=1");
          if (!response.ok) {
            throw new Error("ネットワーク応答が正常ではありませんでした（質問1の読み込み）");
          }
          const result = await response.json();
          for (let v = 0; v < result.names.length && v < 4; v++) {
            question_list[0][v] = result.names[v];
          }
          sessionNum = result.sessionNumber;
          localStorage.setItem('sessionNumber', JSON.stringify(sessionNum));
        } catch (error) {
          console.error("質問1のデータの取得中にエラーが発生しました:", error);
          return false;
        }
      return true;
    }

    async function getQuestion_other(){
      for (let n = 1; n < question_num; n++) {
        try {
          const response = await fetch("http://34.84.217.185/question?num=" + (n+1));
          if (!response.ok) {
            throw new Error("ネットワーク応答が正常ではありませんでした");
          }
          const result = await response.json();
          for (let v = 0; v < result.names.length && v < 4; v++) {
            question_list[n][v] = result.names[v];
          }
          question_flag[n] = true;
        } catch (error) {
          return false;
        }
      }
      return true;
    }

    function addLupeClickListener(elementId) {
      const imageElement = document.getElementById(elementId);
      const imageSrc = imageElement.src;

      const startIndex = imageSrc.indexOf("name=") + 5;
      const endIndex = imageSrc.indexOf("&mode=2");
      const extractedName = imageSrc.substring(startIndex, endIndex);
      var x = "http://34.84.217.185/image?name=" + extractedName + "&mode=1"; // リサイズ
      var y = "http://34.84.217.185/image?name=" + extractedName + "&mode=3"; // ３ｄ
      displayModal(x, y, "");
  }

  async function answer(id) {
    await waitForLoad(id);
  }

  function waitForLoad(id) {
      let storedScores = score.getScore();
      id = id[1];

      return new Promise(resolve => {
        const checkquestion = () => {
          if (id == "0") {
            selectedImages[count - 1] = "../img/bad_luck.png"
            storedScores.choices.push("");
            count++;
            score.setScore(storedScores);
            if(count <= question_num){
              setImage();
              getImage();
            }else{
              //最後の問題を答えたとき
              window.location.href = "result.html"
            }
            resolve();
          } else {
              if(question_flag[count-1] == true){
                selectedImages[count - 1] = "http://34.84.217.185/image?name=" + question_list[count - 1][id - 1] + "&mode=2";
                storedScores.choices.push(question_list[count - 1][id - 1]);
                count++;
                score.setScore(storedScores);
                if(count <= question_num){
                  setImage();
                  getImage();
                }else{
                  //最後の問題を答えたとき
                  window.location.href = "result.html"
                }
                resolve();
              }else{
                setTimeout(checkquestion, 100); // 100ミリ秒ごとに再試行
              }
            }
          }
          checkquestion();
      });
  }

    function setImage() {
      for (let i = 0; i < question_list[count-1].length && i < 4; i++) {
        const imageElement = document.getElementById("A" + (i + 1));
        imageElement.src = "http://34.84.217.185/image?name=" + question_list[count-1][i] + "&mode=2";
        //虫眼鏡の処理追加
        const LopeElement = document.createElement("A"+(i+1)+"_lupe");
          if(LopeElement){
            LopeElement.addEventListener("click", function () {
              var x="http://34.84.217.185/image?name="+question_list[count-1][i]+"&mode=1";//リサイズ
              var y="http://34.84.217.185/image?name="+question_list[count-1][i]+"&mode=3";//３ｄ
              displayModal(x,y,"");
            });
          }
      }
    }

    function getImage() {
      for (let i = 0; i < question_num; i++) {
        let name = "S" + String(i + 1)
        const imgElement = document.getElementById(name);
        imgElement.src = selectedImages[i];
      }
    }

    function delImage() {
      selectedImages[count - 2] = "../img/question_mark.png"
      getImage();
    }

    function back() {
      if (count > 1) {
        delImage();
        count--;
        let storedScores = score.getScore();
        let last = storedScores.choices.pop();
        score.setScore(storedScores);
        updateProgressBar();
        setImage();
      } else {
        alert("1つ以上答えて下さい")
      }
    }

    function choosedModal(num){
      let storedScores = score.getScore();
      if(storedScores.choices.length > num){
        //選択さればプログレスバーの番号に画像orXがある
        if(storedScores.choices[num] != ""){
          //画像があれば画像を出す
          var num_image = storedScores.choices[num];
          var x="http://34.84.217.185/image?name="+num_image+"&mode=1";//リサイズ
          var y="http://34.84.217.185/image?name="+num_image+"&mode=3";//３ｄ
          displayModal(x,y, "");
        }
      }
    }

    $(function () {
      updateProgressBar();
      setImage();
      getImage();
    });