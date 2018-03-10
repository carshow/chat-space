$(function(){
  function buildHTML(message){
    if(message.image != null){
    var html = `<div class ='chat-main__message clearfix'>
                  <div class="chat-main__message-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-main__message-time">
                    ${message.created_at}
                  </div>
                  <div class="chat-main__message-body">
                    ${message.body}
                    <img class="chat-main__message-body-image", src="${message.image}">
                  </div>
                </div>`
    } else {
    var html = `<div class ='chat-main__message clearfix'>
                  <div class="chat-main__message-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-main__message-time">
                    ${message.created_at}
                  </div>
                  <div class="chat-main__message-body">
                    ${message.body}
                  </div>
                </div>`

    }
    return html;
  }

  $('#new-comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
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
      $(".submit").prop('disabled', false);
      $("#new-comment")[0].reset();
      $(".chat-main__body").animate({scrollTop:$(".chat-main__body--messages-list")[0].scrollHeight});
      })
    .fail(function(){
      $(".submit").prop('disabled', false);
      $("#new-comment")[0].reset();
      alert('メッセージを入力してください。');
    })
  });
});
