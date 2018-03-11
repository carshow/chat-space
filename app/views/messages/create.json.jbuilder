json.body  @message.body
json.created_at @message.created_at.in_time_zone("Tokyo").strftime('%Y年%m月%d日 %H:%M:%S')
json.user_name  @message.user.name
json.image @message.image.url
json.id @message.id
