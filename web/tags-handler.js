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
            '*':['modern','original']
            'modern':['scholl/collage','business','killer'],
            'business':['it','finance'],
        }
        Note that the max depth of each branch is 3.
    */
    return temp_obj;
}

/**
 * 获取用于搜索的TAG数组。
 * @param {array} s 用户端输入的TAG数组
 * @param {object} obj 用 convertTagStruct 方法转换过的对象
 * @returns 按照树状结构生成的用于搜索文章的TAG数组。
 */
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
    var target_tags = t_tags.clearRepetition();
    target_tags = this._seperateMultiNamedTags(target_tags);
    target_tags = this._removeBannedTags(target_tags);
    return target_tags;
}

Global._removeBannedTags = function(dirt_list){
    var banned_tags = Global.getPreference('banned-tags');
    var clean_list = [];
    for(var i = 0; i < dirt_list.length; i++){
        var tag = dirt_list[i];
        if(!banned_tags.contains(tag)) {
            clean_list.push(tag);
        }
    };
    return clean_list;
}

Global._seperateMultiNamedTags = function(arr) {
    for(var i = 0; i < arr.length; i++){
        var e = arr[i];
        if(e.indexOf('/') != -1) {
            var temp_arr = e.split('/');
            temp_arr.forEach((item,index)=>{
                arr.splice(i+index,0,item);
            });
            arr.splice(i+temp_arr.length,1);
            i += temp_arr.length - 1;
        }
    }
    return arr;
};
