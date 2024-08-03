class AddCountToPomodoroSessions < ActiveRecord::Migration[7.0]
  def change
    add_column :pomodoro_sessions, :count, :integer, default:0
  end
end
