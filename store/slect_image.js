    let count = 1;
    let question_num = 6;
    let names = Array.from({ length: 6 }, () => Array(4).fill(null));
    let selectedImages = Array(question_num).fill("../img/question_mark.png");

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

    const score = new scoreStore();

    window.addEventListener('load', async function () {
      console.log("load：リソースファイルを全て読み込みました.");
      const imageContainer = document.getElementById("image-container");

      let result = await getQuestion();
      if (result) {
        for (let i = 0; i < names[0].length && i < 4; i++) {
          const imageElement = document.getElementById("A" + (i + 1));
          imageElement.src = "http://192.168.11.3:8000/image?name=" + names[0][i] + "&mode=2";
        }
      } else {
          alert("通信に失敗しました。ページをもう一度読み込んでください。");
      }
  });

    async function getQuestion() {
      for (let n = 0; n < question_num; n++) {
        try {
          const response = await fetch("http://192.168.11.3:8000/question?num=" + (n + 1));
          if (!response.ok) {
            throw new Error("ネットワーク応答が正常ではありませんでした");
          }
          const result = await response.json();
          for (let v = 0; v < result.names.length && v < 4; v++) {
            names[n][v] = result.names[v];
          }
        } catch (error) {
          console.error("データの取得中にエラーが発生しました:", error);
          return false;
        }
      }
      return true;
    }

    function addLupeClickListener(elementId) {
      const imageElement = document.getElementById(elementId);
      const imageSrc = imageElement.src;

      // Extract the substring between "name=" and "&mode=2"
      const startIndex = imageSrc.indexOf("name=") + 5;
      const endIndex = imageSrc.indexOf("&mode=2");
      const extractedName = imageSrc.substring(startIndex, endIndex);
      // Now you can use 'extractedName' as needed
      var x = "http://192.168.11.3:8000/image?name=" + extractedName + "&mode=1"; // リサイズ
      var y = "http://192.168.11.3:8000/image?name=" + extractedName + "&mode=3"; // ３ｄ
      displayModal(x, y, "");
  }


    score.setScore({ choices: [] });

    function answer(id) {
      let storedScores = score.getScore();
      id = id[1];
      if (id == "0") {
        selectedImages[count - 1] = "../img/bad_luck.png"
        storedScores.choices.push("");
        score.setScore(storedScores);
      } else {
        selectedImages[count - 1] = "http://192.168.11.3:8000/image?name=" + names[count - 1][id - 1] + "&mode=2";
        storedScores.choices.push(names[count - 1][id - 1]);
        score.setScore(storedScores);
      }
      count++;

      console.log(score.getScore());

      if (count <= question_num) {
        setImage();
        getImage();
      } else {
        window.location.href = "result.html"
      }
    }

    function setImage() {
      for (let i = 0; i < names[count-1].length && i < 4; i++) {
        const imageElement = document.getElementById("A" + (i + 1));
        imageElement.src = "http://192.168.11.3:8000/image?name=" + names[count-1][i] + "&mode=2";
        //虫眼鏡の処理追加
        const LopeElement = document.createElement("A"+(i+1)+"_lupe");
          if(LopeElement){
            LopeElement.addEventListener("click", function () {
              var x="http://192.168.11.3:8000/image?name="+names[count-1][i]+"&mode=1";//リサイズ
              var y="http://192.168.11.3:8000/image?name="+names[count-1][i]+"&mode=3";//３ｄ
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
        console.log(last);
        console.log("↑削除");
        score.setScore(storedScores);
        console.log(score.getScore());
        console.log("↑最新");
        updateProgressBar();
        setImage();
      } else {
        alert("1つ以上答えて下さい")
      }
    }

    function choosedModal(num){
      let storedScores = score.getScore();
      if(storedScores.choices.length > num){
        //選択さればプログレスバーの番号に画像or×がある
        if(storedScores.choices[num] != ""){
          //画像があれば画像を出す
          var num_image = storedScores.choices[num];
          var x="http://192.168.11.3:8000/image?name="+num_image+"&mode=1";//リサイズ
          var y="http://192.168.11.3:8000/image?name="+num_image+"&mode=3";//３ｄ
          displayModal(x,y, "");
        }
      }
    }

    $(function () {
      updateProgressBar();
      setImage();
      getImage();
    });