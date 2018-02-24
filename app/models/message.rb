class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  mount_uploader :image, ImageUploader
  validates :body, presence: true, unless: :image?

   def show_last_message
    if (last_message = messages.last).present?
      if last_message.body?
       last_message.body
      else
        '画像が投稿されています'
      end
    else
      'まだメッセージはありません。'
    end
  end
end
