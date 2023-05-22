$(document).ready(()=> {
    $("div.advanced-settings div.row").click(function() {
        $("ul.settings-columns").slideToggle();
        $("div.advanced-settings div.row i.arrow-down").toggleClass("fa-caret-down");
        $("div.advanced-settings div.row i.arrow-down").toggleClass("fa-caret-up");
    });
    $("span.clear-text").click(()=>{
        $("div.search-input input.search-area").val("");
        $("span.clear-text").css("visibility",'hidden');
    });
    $("div.search-input input.search-area").on('input',function(){
        var value = $("div.search-input input.search-area").val();
        if(value) {
            $("span.clear-text").css("visibility",'visible');
        } else {
            $("span.clear-text").css("visibility",'hidden');
        }
    });
    $('span.tags-list-btn').click(()=>{
        Global.getTags((tags)=>{
            if(!Global._search_tags || JSON.stringify(Global._search_tags) == '[]')
            tags = Global.convertTagStruct(tags);
            var tag_list = Global.getTagsForSearch(['*'], tags, true);
            tag_list.shift(); // 去掉数组开头的*字符
            var temp_str = '';
            tag_list.forEach((item)=>{
                temp_str += '<span class="selectable-tag"><i class="fa fa-circle-o"></i>'+item+'</span>';
            });
            $.confirm({
                title: '选择TAG',
                content: '<div class="tags-selection">'+temp_str+'</div>',
                boxWidth: "80%",
                useBootstrap: false,
                theme: 'light',
                type: 'blue',
                buttons: {
                    submit: {
                        text: '确认',
                        action: function () {
                            // console.log('yes')
                        }
                    },
                    cancel: {
                        text: '取消',
                        action: function () {
                            // console.log('no')
                        }
                    }
                }
            });
        })
    });
})