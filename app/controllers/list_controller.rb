class ListController < ApplicationController
  before_action :set_list, only: %i[edit update destroy]
  def new
    @list = List.new
  end

  def create
    @list = List.new(list_params)
    if @list.save
      redirect_to root_path
    else
      render :new
    end
  end

  def index
    @lists = List.where(user: current_user).order("created_at ASC")
  end

  def edit; end

  def update
    if @list.update(list_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    @list.destroy
    redirect_to list_index_path, status: :see_other
  end

  private

  def list_params
    params.require(:list).permit(:title).merge(user:current_user)
  end

  def set_list
    @list = List.find_by(id: params[:id])
  end

end
