class UsersController < ApplicationController
  skip_before_action :require_login, only: %i[new create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path, success: t('users.create.success')
    else
      flash.now[:danger] = t('users.create.failure')
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @user = current_user
    @user.destroy
    flash[:success] = t('users.destroy.success')
    redirect_to :root, status: :see_other
  end

  private

  def user_params
    params.require(:user).permit(:user_name, :email, :password, :password_confirmation, :avatar)
  end
end
