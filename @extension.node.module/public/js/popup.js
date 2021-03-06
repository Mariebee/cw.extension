//chrome.storage.sync.clear()
(function() {
  'use strict';

  function getAll(query) {
    return [].slice.call(document.querySelectorAll(query));
  }
  function matches(elem, selector) {
    var nativeMatches = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector || elem.oMatchesSelector;
    return nativeMatches.call(elem, selector);
  }
  function closest(elem, selector) {
    while (elem) {
      if (matches(elem, selector)) {
        return elem;
      }
      elem = elem.parentElement;
    }
    return null;
  }

  var tableData = [];

  $.ajax({
    url: "/getHtmlData",
    success: function(result){
      //let array = JSON.parse("[" + result + "]");
      let array = JSON.parse(result);
      for(let i=0; i< array.length; i++) {
        if(undefined != array[i]
          && null != array[i]
          && '' != array[i])
          tableData.push([array[i].content_id, array[i].content, array[i].user, array[i].cre_time]);
      }
      $('#dataTable').DataTable({
        data: tableData,
            columns: [
                { title: "ID" },
                { title: "Content" },
                { title: "Owner" },
                { title: "Created Time" }
            ]
      });
    }
  });
  //ajax call to get windows logged in user name
  /*$.ajax({
    url: "/getUserName",
    success: function(result) {
      $("#username").html('Hello, ' + result.toUpperCase());
    }
  });*/
})();
