//chrome.storage.sync.clear()
(function() {
  'use strict';

  var tableData = [];
  //var table = $('#dataTable');

  $.ajax({
    url: "/getHtmlData",
    success: function(result){
      //let array = JSON.parse("[" + result + "]");
      let array = JSON.parse(result);
      for(let i=0; i< array.length; i++) {
        if(undefined != array[i]
          && null != array[i]
          && '' != array[i])
          tableData.push([
            '<a href="#"><img src="img/ic_add_box_black.png" height="30" width="30"></img></a>',
            array[i].content_id,
            array[i].content,
            array[i].user,
            array[i].cre_time,
            `<a href="javascript:;" onclick="deleteId('${array[i].content_id}')"><img src="img/ic_delete_black.png" height="30" width="30"></img></a>`
          ]);
          //$('#dataTable > tbody:last-child').append(`<tr><td>${array[i].content_id}</td><td>${array[i].content}</td><td>${array[i].user}</td><td>${array[i].cre_time}</td></tr>`);
      }
      $('#dataTable').DataTable({
        sScrollY: 590,
        data: tableData
      });
    }
  });

  var header = $("#header");
  header.on("scroll", function(e) {
    if (this.scrollTop > 100) {
      header.addClass("fix-search");
    } else {
      header.removeClass("fix-search");
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

function deleteId(id) {
  $.post("http://localhost:3000/delete",
  {
    id: id
  },
  function(data, status) {
  });
}
