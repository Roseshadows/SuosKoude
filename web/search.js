var Global = Global || {};

Global.onSearchStart = function() {
    this._searching = true;
    this._showVisualSearchSymbol();
    this._initializeDataForSearch();
    this._loadClientSearchConditions();
};

Global.onSearchProcess = function() {
    
}

Global.onSearchEnd = function() {
    this._searching = false;
    this._hideVisualSearchSymbol();
}

Global._initializeDataForSearch = function() {
    this._search_keywords = [];
    this._search_author = '';
    this._search_tags = [];
    this._search_subject = '';   // type
    this._search_role = [];
    this._search_type = '';    // length
    this._search_status = '';
    this._search_ending = '';
    this._search_is_yuhuang_only = true;
    this._search_is_yu_huang_yu = false;
};

Global._loadClientSearchConditions = function(){
    var search_text = $('input.search-area').val();
    this._search_keywords = search_text.split(' ');
    this._search_author = $('li.author input').val();
    this._search_subject = $('li.type input').val();
    this._search_role = [$('li.role input.role-yu').val(),$('li.role input.role-huang').val()];
    this._search_type = $('li.length ')
}

Global._showVisualSearchSymbol = function() {
    
}

Global._hideVisualSearchSymbol = function() {
    
}

Global.isSearching = function() {
    return this._searching;
}
