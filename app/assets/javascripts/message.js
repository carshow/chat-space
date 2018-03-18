$(function(){
  // function of creating messages in using ajax
  function buildHTML(message){
    var text =`<div class ='chat-main__message clearfix' data-id= "${message.id}"">
                  <div class="chat-main__message-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-main__message-time">
                    ${message.created_at}
                  </div>
                  <div class="chat-main__message-body">
                    ${message.body}</div></div>`
    var img = `<img class="chat-main__message-body-image", src="${message.image}">`
    var html = (message.image == null) ? text : text + img;
    return html;
  }

  function resetForm(){
    $(".submit").prop('disabled', false);
    $("#new_message")[0].reset();
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body--messages-list').append(html);
      $('#message').val("");
      resetForm();
      $("html, body, .chat-main__body").animate({scrollTop:$(".chat-main__body--messages-list")[0].scrollHeight});
      })
    .fail(function(){
      resetForm();
      alert('メッセージを入力してください。');
    })
  });
  // function of creating messages in using ajax

  // auto reloading messages

  var autoReload = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat-main__message:last').data('id');
      if( isNaN(last_message_id) ){
        last_message_id = 0;
        }
      $.ajax({
        url: location.href,
        type: "GET",
        dataType: "json",
        data: {
          message: { id: last_message_id }
        }
      })
      .done(function(data) {
        var insertHTML = '';
        data.forEach(function(message) {
            insertHTML += buildHTML(message);
        });
        $('.chat-main__body--messages-list').append(insertHTML);
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(autoReload);
     }}, 5000);
    // auto reloading messages
});
