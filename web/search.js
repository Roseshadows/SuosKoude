var Global = Global || {};

// 优化了 tag-handler.js，现在不卡了

Global.search = function(){
    this._onSearchStart();
    this._processSearch();
    // this._onSearchEnd(); // 放到this._processSearch() 里了，因为必须实现 ajax 同步处理
}

Global._onSearchStart = function() {
    this._searching = true;
    this._hideSearchNotice();
    this._clearPrevResult();
    this._showVisualSearchSymbol();
    this._initializeDataForSearch();
    this._loadClientSearchConditions();
};

Global._processSearch = function() {
    var that = this;
    // 必须同步处理，否则接收不到 this._search_target_url
    this.getTags((tags)=>{
        var tag_list = that.convertTagStruct(tags); // tag
        var target_tags = that.getTagsForSearch(that._search_tags, tag_list);
        var target_keywords = that._search_keywords || [];
        that.getArticles((articles)=>{
            for(var i = 0; i < articles.length; i++){
                var a = articles[i];
                var fitness = true;
                var f = 0;
                target_keywords.forEach((k)=>{
                    if(a.title.toLowerCase().includes(k.toLowerCase())) f++;
                    if(a.tags.toLowerCase().includes(k.toLowerCase())) f++;
                    if(a.summary.toLowerCase().includes(k.toLowerCase())) f++;
                });
                if(!f && target_keywords.length > 0) fitness = false;
                target_tags.forEach((tag)=>{
                    if(!a.tags.toLowerCase().includes(tag.toLowerCase())) fitness = false;
                });
                
                if(that._search_author && !a.author.includes(that._search_author)) fitness = false;
                if(that._search_role.length > 0 && (!a.roles.split('x')[0].includes(that._search_role[0]) || !a.roles.split('x')[1].includes(that._search_role[1]))) fitness = false;
                if(that._search_type != '*' && a.type != that._search_type) fitness = false;
                if(that._search_status != '*' && a.status != that._search_status) fitness = false;
                if(that._search_ending != '*' && a.ending != that._search_ending) fitness = false;
                if(that._search_is_yuhuang_only != '*' && a.is_yuhuang_only != that._search_is_yuhuang_only) fitness = false;
                if(!that._search_is_yuhuangyu && a.is_yuhuangyu == !that._search_is_yuhuangyu) fitness = false;
                
                if(fitness) that._search_target_url.push(a.url_title);
            }
            that._onSearchEnd();
        })
    });
};

Global._onSearchEnd = function() {
    this._searching = false;
    this._hideVisualSearchSymbol();
    this._appendResult();
};

Global._initializeDataForSearch = function() {
    this._search_keywords = [];
    this._search_author = '';
    this._search_tags = JSON.stringify(this._search_tags) != '[]' ? this._search_tags : [];
    // this._search_subject = '';   // type
    this._search_role = [];
    this._search_type = '';    // length
    this._search_status = '';
    this._search_ending = '';
    this._search_is_yuhuang_only = '';
    this._search_is_yuhuangyu = '';
    
    this._search_target_url = [];
};

Global._loadClientSearchConditions = function(){
    var search_text = $('input.search-area').val();
    this._search_keywords = search_text.includes(' ') ? search_text.split(' ') : (search_text ? [search_text] : []);
    this._search_author = $('li.author input').val();
    // this._search_subject = $('li.type input').val();
    this._search_role = [$('li.role input.role-yu').val(), $('li.role input.role-huang').val()];
    var type = $('#settings-length').find("option:selected").val();
    this._search_type = (function(){
        switch(type) {
            case 'long':
                return '长篇';
            case 'medium':
                return '中篇';
            case 'short':
                return '短篇';
            default:
                return '*';
        }
    })()
    var status = $('#settings-status').find("option:selected").val();
    this._search_status = (function(){
        switch(status) {
            case 'completed':
                return '完结';
            case 'incompleted':
                return '未完结';
            default:
                return '*';
        }
    })();
    this._search_ending = $('#settings-ending').find("option:selected").val().toUpperCase() || '*';
    var iyo = $('#settings-is-yuhuang-only').find("option:selected").val() || 'no';
    this._search_is_yuhuang_only = iyo == 'unlimited' ? '*' : (iyo == 'yes' ? true : false);
    var iyhy = $('#settings-is-yuhuangyu').find("option:selected").val() || 'no';
    this._search_is_yuhuangyu = iyhy == 'yes' ? true : false;
};

Global._hideSearchNotice = function() {
    $('div.initial-result').css('display','none');
    $('div.no-result').css('display','none');
};

Global._clearPrevResult = function() {
    $('div.result-pages').html('');
    $('ul.pagination').html('');
    $('ul.pagination').css('display','none');
    // $(".search-result-area").css("margin-bottom",'0')
};

Global._showVisualSearchSymbol = function() {
    $('div.searching-symbol').css('display','block');
};

Global._hideVisualSearchSymbol = function() {
    $('div.searching-symbol').css('display','none');
};

Global._appendResult = function() {
    if(this._existsSearchResult()) {
        var columns_in_one_page = 10;
        var page_num = Math.floor(this._search_target_url.length / columns_in_one_page) + 1;
        for(var i = 0; i < page_num; i++) {
            var p = i + 1;
            $('div.result-pages').append('<div id="pg'+p+'"></div>');
        }
        this._search_target_url.forEach((item, index)=>{
            var p = Math.floor(index / columns_in_one_page) + 1;
            $('div#pg'+p).append('<div class="article-item">'+item+'</div>')
        })
        if(page_num > 1) this._generatePagination(page_num);
    } else {
        $('div.no-result').css('display','block');
    }
};

Global._generatePagination = function(page_num) {
    $('ul.pagination').css('display','block');
    this._curPage = 1;
    if($("div#pg"+page_num).html()=='') page_num -= 1;
    $('ul.pagination').append('<li><a href="javascript:Global.__prevPage('+page_num+')">&laquo;</a></li>');
    for(var i = 0; i < page_num; i++) {
        var page = i + 1;
        $('ul.pagination').append('<li><a href="javascript:Global.__pageTo('+page+')">'+page+'</a></li>');
    }
    $('ul.pagination').append('<li><a href="javascript:Global.__nextPage('+page_num+')">&raquo;</a></li>');
    $("ul.pagination li:nth-of-type(2)").addClass('active');
    // $(".search-result-area").css("margin-bottom",'60px')
};

Global.__pageTo = function(page) {
    $('div.result-pages>div').css('display','none');
    $('div.result-pages>div#pg'+page).css('display','block');
    $('ul.pagination li').removeClass('active');
    $('ul.pagination li').eq(page).addClass('active');
    this._curPage = page;
};

Global.__prevPage = function(page_num) {
    var newPage = this._curPage - 1;
    if(newPage < 1) newPage = page_num;
    this.__pageTo(newPage);
};

Global.__nextPage = function(page_num) {
    var newPage = this._curPage + 1;
    if(newPage > page_num) newPage = 1;
    this.__pageTo(newPage);
};

Global._existsSearchResult = function(){
    return this._search_target_url.length > 0;
};

Global.isSearching = function() {
    return this._searching;
};
