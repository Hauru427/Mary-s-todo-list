class RemindersController < ApplicationController
  require 'line/bot'
  protect_from_forgery except: :callback
  skip_before_action :require_login, only: %i[callback]

  def send_reminders
    send_normal_reminders
    send_merry_reminders
  end

  def send_normal_reminders
    Card.where('due_date <= ?', Time.now + 1.hour).find_each do |card|
      send_line_reminder(card)
    end
  end

  def send_normal_line_reminder(card)
    user = card.list.user

    return unless user.line_id.present?
    message = {
      type: 'text',
      text: "#{card.title}の期限が近づいています。"
    }

    response = client.push_message(user.line_id, message)
    Rails.logger.info("LINE reminder sent: #{response}")
  end

  def send_merry_reminders
    Card.where('due_date < ?', Time.now).find_each do |card|
      days_overdue = (Time.now.to_date - card.due_date.to_date).to_i
      case days_overdue
      when 1
        send_merry_line_reminder(card, "test")
      when 2
        send_merry_line_reminder(card, "test2")
      when 3
        send_merry_line_reminder(card, "test3")
        card.destroy
      end
    end
  end

  def send_merry_line_reminder(card, messae_part)
    user = card.list.user

    return unless user.line_id.present?
    message = {
      type: 'text',
      text: "もしもし、私メリー、#{card.title}がまだ終わってないわね。#{message_part}"
    }

    response = client.push_message(user.line_id, message)
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
