var Global = Global || {};
/**
 * 解析TAG的JSON结构
 * @param {object} obj 传入的TAG结构JSON字符串
 * @returns 解析好的一个对象。
 */
Global.convertTagStruct = function(obj) {
    var temp_obj = {};
    var keys1 = Object.keys(obj);
    temp_obj['*'] = keys1;
    for(var i = 0; i < keys1.length; i++){
        var k1 = keys1[i];
        var item1 = obj[k1];
        if(typeof item1 == 'object') {
            var keys2 = Object.keys(item1);
            temp_obj[k1] = keys2;
            for(var j = 0; j < keys2.length; j++) {
                var k2 = keys2[j];
                var item2 = item1[k2];
                if(typeof item2 == 'object') {
                    var keys3 = Object.keys(item2);
                    temp_obj[k2] = keys3;
                }
            }
        }
    };
    /*
        example:
        obj = {
            "modern":{
                "school/collage":"",
                "business":{
                    "it":"",
                    "finance":""
                },
                "killer":""
            },
            "original":""
        }
        returns:
        temp_obj = {
            '*':['modern','school/collage','business','it','finance','killer','original']
            'modern':['scholl/collage','business','killer'],
            'business':['it','finance'],
        }
        Note that the max depth of each branch is 3.
    */
    return temp_obj;
}

Global.getTagsForSearch = function(s, obj) {
    var temp_arr = s || null;
    var temp_arr2 = [];
    var t_tags = temp_arr;
    var keys = Object.keys(obj);
    while(temp_arr && JSON.stringify(temp_arr) != '[]') {
        temp_arr2 = [];
        for(var i = 0; i < temp_arr.length; i++) {
            keys.forEach((item)=>{
                if(item == temp_arr[i]) {
                    temp_arr2 = temp_arr2.concat(obj[item]);
                    t_tags = t_tags.concat(obj[item]);
                }
            });
        }
        if(JSON.stringify(temp_arr2) != '[]'){
            temp_arr = temp_arr2;
        } else {
            temp_arr = [];
        }
    };
    return t_tags;
}
