class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @users = @group.users
    respond_to do |format|
      format.html
      format.json {
          @new_messages = @messages.where('id > ?', params[:message][:id])
        }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    respond_to do |format|
      if @message.save
        format.html { redirect_to group_messages_path(@group) }
        format.json
      else
        format.html { render :index }
      end
    end

  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
