var Global = Global || {};
Global.onSearchStart = function() {
    this._initializeDataForSearch();
    this._loadClientSearchConditions();
}
Global._initializeDataForSearch = function() {
    this._search_keywords = [];
}
Global._loadClientSearchConditions = function(){
    var search_text = $('input.search-area').val();
    this._search_keywords = search_text.split(' ');
    
}
