class RemindersController < ApplicationController
  require 'line/bot'

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

  def callback
    body = request.body.read

    signature = request.env['HTTP_X_LINE_SIGNATURE']
    unless client.validate_signature(body, signature)
      head :bad_request
      return
    end

    events = client.parse_events_from(body)

    events.each do |event|
      case event
      when Line::Bot::Event::Message
        case event.type
        when Line::Bot::Event::MessageType::Text
          message = {
            type: 'text',
            text: "Received your message: #{event.message['text']}"
          }
          client.reply_message(event['replyToken'], message)
        end
      end
    end

    head :ok
  end

  private

  def client
    @client ||= Line::Bot::Client.new do |config|
      config.channel_secret = ENV['LINE_CHANNEL_SECRET']
      config.channel_token = ENV['LINE_CHANNEL_TOKEN']
    end
  end
end
