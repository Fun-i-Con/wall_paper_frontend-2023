var search_words_length = 100;// 仮の数. /search/wordsの結果によって変更

var input = document.querySelector('input[name="input-custom-dropdown"]'),
    tagify = new Tagify(input, {
        whitelist: [], // 最初は空の配列
        maxTags: search_words_length,
        dropdown: {
            classname: "tags-look",
            maxItems: 300,
            enabled: 0,
            closeOnSelect: false
        }
    });

//検索できる単語を読み込む関数
async function getWordAndUpdateWhitelist() {

    try {
        const response = await fetch("http://34.84.217.185/search/words");
        if (!response.ok) {
            throw new Error("ネットワーク応答が正常ではありませんでした");
        }
        const result = await response.json();
        console.log("/search/words result");
        console.log(result);
        //Tagifyのwhitelistを更新
        search_words_length = result.length;
        tagify.settings.whitelist = result;
    } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
        return false;
    }
    return true;
}

// ページ読み込み時に検索できる単語を読み込む関数を動かす
document.addEventListener('DOMContentLoaded', function() {
    getWordAndUpdateWhitelist();
});

