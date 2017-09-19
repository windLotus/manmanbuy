function getSearch() {
    var searchStr = location.search.slice(1);
    var searchArr = searchStr.split('=');
    return searchArr
}