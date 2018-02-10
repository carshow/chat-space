class MessagesController < ApplicationController
before_action :set_groups
  def index
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      flash[:notice] = "メッセージが送信されました。"
      redirect_to group_messages_path(@group)
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージを入力ください。"
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_groups
    @group = Group.find(params[:group_id])
  end
end
