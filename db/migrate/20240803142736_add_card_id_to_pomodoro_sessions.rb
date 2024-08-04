class AddCardIdToPomodoroSessions < ActiveRecord::Migration[7.0]
  def change
    add_column :pomodoro_sessions, :card_id, :integer
  end
end
