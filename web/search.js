var Global = Global || {};

Global.search = function(){
    this._onSearchStart();
    this._processSearch();
    this._onSearchEnd();
}

Global._onSearchStart = function() {
    this._searching = true;
    this._showVisualSearchSymbol();
    this._initializeDataForSearch();
    this._loadClientSearchConditions();
};

Global._processSearch = function() {

};

Global._onSearchEnd = function() {
    this._searching = false;
    this._hideVisualSearchSymbol();
    this._appendResult();
    this._generatePagination();
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
};

Global._loadClientSearchConditions = function(){
    var search_text = $('input.search-area').val();
    this._search_keywords = search_text.split(' ');
    this._search_author = $('li.author input').val();
    // this._search_subject = $('li.type input').val();
    this._search_role = [$('li.role input.role-yu').val(),$('li.role input.role-huang').val()];
    this._search_type = $('#settings-length').find("option:selected").val();
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

Global._showVisualSearchSymbol = function() {
    
};

Global._hideVisualSearchSymbol = function() {
    
};

Global._appendResult = function() {
    
};

Global._generatePagination = function() {
    
};

Global.isSearching = function() {
    return this._searching;
};
