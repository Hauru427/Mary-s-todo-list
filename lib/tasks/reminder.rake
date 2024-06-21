namespace :reminder do
  desc "リマインダーの送信"
  task send: :enviroment do
    RemindersController.new.send_reminders
  end
end
