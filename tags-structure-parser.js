var Global = Global || {};
/**
 * 解析TAG的JSON结构
 * @param {object} 传入的TAG结构JSON字符串
 * @returns 解析好的一个对象。
 */
Global.parseTagsStruct = function(obj) {
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
            "t1":{
                "t1_1/t11":"",
                "t1_2":{
                    "t1_2_1":""
                }
            },
            "t2":""
        }
        returns:
        temp_obj = {
            "*":["t1","t2"],
            "t1":["t1_1/t11","t1_2"],
            "t1_2":["t1_2_1"]
        }
        Note that the max depth of each branch is 3.
    */
    return temp_obj;
}
