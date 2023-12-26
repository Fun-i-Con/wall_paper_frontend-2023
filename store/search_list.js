var input = document.querySelector('input[name="input-custom-dropdown"]'),
    tagify = new Tagify(input, {
        whitelist: [], // 最初は空の配列
        maxTags: 5,
        dropdown: {
            classname: "tags-look",
            maxItems: 300,
            enabled: 0,
            closeOnSelect: false
        }
    });

function unique(array) {
    return array.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

// CSVファイルを読み込む関数
function loadCSVAndUpdateWhitelist() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../config/image2words.csv', true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            Papa.parse(xhr.responseText, {
                header: true,
                complete: function(results) {
                    var whitelist = [];
                    results.data.forEach(function(row) {
                        if (row['factor1']) whitelist.push(row['factor1']);
                        if (row['factor2']) whitelist.push(row['factor2']);
                        if (row['factor3']) whitelist.push(row['factor3']);
                        if (row['factor4']) whitelist.push(row['factor4']);
                    });
                    // 重複とundefinedを削除
                    whitelist = unique(whitelist);

                    // Tagifyのwhitelistを更新
                    tagify.settings.whitelist = whitelist;
                }
            });
        }
    };
    xhr.send();
}

// ページ読み込み時にCSVを読み込む
document.addEventListener('DOMContentLoaded', function() {
    loadCSVAndUpdateWhitelist();
});
