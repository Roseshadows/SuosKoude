var Global = Global || {};
/**
 * 解析TAG的JSON结构
 * @param {object} 传入的TAG结构JSON字符串
 * @returns 解析好的一个对象。
 */
Global.getTagsData = function(obj) {
    var keys1 = Object.keys(obj);
    var tags = [];
    for (var i = 0; i < keys1.length; i++) {
        var k1 = keys1[i];
        var item1 = obj[k1];
        var temp_str = ''+k1;
        if (typeof item1 == 'object') {
            var keys2 = Object.keys(item1);
            for(var j = 0; j < keys2.length; j++) {
                var k2 = keys2[j];
                var item2 = item1[k2];
                var temp_str2 = temp_str + '-' + k2;
                if(typeof item2 == 'object') {
                    var keys3 = Object.keys(item2);
                    for(var a = 0; a < keys3.length; a++) {
                        var k3 = keys3[a];
                        var item3 = item2[k3];
                        var temp_str3 = temp_str2 + '-' + k3;
                        tags.push(temp_str3);
                    }
                } else {
                    tags.push(temp_str2);
                }
            }
        } else {
            tags.push(temp_str);
        }
    };
    /*
        example:
        obj = {
            "modern":{
                "school/collage":"",
                "bussiness":{
                    "it":"",
                    "finance":""
                }
            },
            "original":""
        }
        returns:
        tags = [
            'modern-school/collage',
            'modern-bussiness-it',
            'modern-bussiness-finance',
            'original'
        ]
        Note that the max depth of each branch is 3.
    */
    return tags;
}
