$(function(){
  function buildHTML(message){
    var text =`<div class ='chat-main__message clearfix'>
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
    console.log(this);
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
      $(".chat-main__body").animate({scrollTop:$(".chat-main__body--messages-list")[0].scrollHeight});
      })
    .fail(function(){
      resetForm();
      alert('メッセージを入力してください。');
    })
  });
});
