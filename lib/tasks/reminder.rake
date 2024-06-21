namespace :reminder do
  desc "リマインダーの送信"
  task send: :environment do
    RemindersController.new.send_reminders
  end
end
