class RemindersController < ApplicationController
  def send_remainders
    Task.where('due_date <= ?', Time.now + 1.hour).find_each do |task|
      send_line_reminder(task)
    end
  end

  def send_line_reminder(task)
    message = {
      type: 'text',
      text: "#{card.title}の期限が近づいています。"
    }

    response = LINE_CLIENT.push_message(task.user.line_user_id, message)
    Rails.logger.info("LINE reminder sent: #{response}")
  end
end
