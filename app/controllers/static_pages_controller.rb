class StaticPagesController < ApplicationController
  skip_before_action :require_login, only: %i[top]

  def top
    if logged_in?
      redirect_to list_index_path
    else
      render :top
    end
  end
end
