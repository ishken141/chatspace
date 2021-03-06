$(function(){   
  function buildHTML(message){ 
    if ( message.image ) { 
      var html = 
      `<div class="message" data-message-id=${message.id}> 
        <div class="message__upper-info"> 
          <div class="message__upper-info__talker"> 
            ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.created_at} 
          </div> 
        </div> 
        <div class="message__text"> 
          <p class="lower-message__content">
            ${message.content}
            </p>  
            <img class="message__image" src="${message.image}">
          </div> 
        </div>` 
        return html; 
    } else { 
      var html =  
      `<div class="message" data-message-id=${message.id}> 
      <div class="message__upper-info"> 
        <div class="message__upper-info__talker"> 
          ${message.user_name}
        </div>
        <div class="message__upper-info__date">
          ${message.created_at} 
        </div> 
      </div> 
      <div class="message__text"> 
        <p class="lower-message__content">
          ${message.content}
          </p>  
        </div> 
      </div>` 
      return html; 
    };
  } 

  $('.Form').on('submit', function(e){ 
    e.preventDefault(); 
    var formData = new FormData(this); 
    var url = $(this).attr('action'); 
    $.ajax({ 
      url: url, 
      type: "POST", 
      data: formData, 
      dataType: "json", 
      processData: false, 
      contentType: false  
    }) 
    .done(function(data){ 
      var html = buildHTML(data); 
      $('.messages').append(html);  
      $('form')[0].reset(); 
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.submit').prop('disabled', false);
    }) 
    .fail(function(){ 
      alert('メッセージ送信に失敗しました'); 
      $('.submit').prop("disabled", false);
    });
    }); 
  }); 