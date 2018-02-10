class MessagesController < ApplicationController
before_action :set_groups
  def index
  end

  private

  def set_groups
    @group = Group.find(params[:group_id])
  end
end
