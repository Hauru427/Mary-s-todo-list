class PomodoroSessionsController < ApplicationController
  def create
    @pomodoro_sessions = current_user.pomodoro_sessions.new(pomodoro_session_params)
    if @pomodoro_session.save
      render json: @pomodoro_session, status: :created
    else
      render json: @pomodoro_session.errors, status: :unprocessable_entity
    end
  end

  def index
    @pomodoro_sessions = current_user.pomodoro_sessions
    render json: @pomodoro_sessions
  end

  private

  def pomodoro_session_params
    params.require(:pomodoro_session).permit(:start_time, :end_time)
  end
end
