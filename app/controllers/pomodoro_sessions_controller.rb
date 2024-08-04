class PomodoroSessionsController < ApplicationController
  before_action :require_login

  def create
    @pomodoro_session = current_user.pomodoro_sessions.new(pomodoro_session_params)
    if @pomodoro_session.save
      render json: @pomodoro_session, status: :created
    else
      logger.debug @pomodoro_session, status: :created
      render json: @pomodoro_session.errors, status: :unprocessable_entity
    end
  end

  def index
    @pomodoro_sessions = current_user.pomodoro_sessions
    render json: @pomodoro_sessions
  end

  def count
    card_id = params[:card_id]
    count = PomodoroSession.where(card_id: card_id).count
    render json: { count: count }
  end

  private

  def pomodoro_session_params
    params.require(:pomodoro_session).permit(:start_time, :end_time, :count, :card_id)
  end
end
