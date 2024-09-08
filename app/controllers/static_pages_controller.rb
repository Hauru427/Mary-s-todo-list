class StaticPagesController < ApplicationController
  skip_before_action :require_login, only: %i[top privacy_policy terms_of_service]

  def top
    if logged_in?
      redirect_to list_index_path
    else
      render :top
    end
  end

  def privacy_policy; end
  def terms_of_service; end
end
