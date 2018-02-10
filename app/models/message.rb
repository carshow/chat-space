class Message < ApplicationRecord
  validates :body, presence: true, unless: :image?
  belongs_to :group
  belongs_to :user
  mount_uploader :image, ImageUploader
end
