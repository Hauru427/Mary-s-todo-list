class RemindersController < ApplicationController
  require 'line/bot'
  protect_from_forgery except: :callback
  skip_before_action :require_login, only: %i[callback]

  def send_reminders
    current_time = Time.now
    send_daily_reminders if current_time.hour == 9
    send_hourly_reminders
    send_merry_reminders if current_time.hour == 12
  end

  def send_daily_reminders
    reminders = {
      '3日前' => 3.days,
      '2日前' => 2.days,
      '1日前' => 1.day
    }

    reminders.each do |label, time_before|
      Card.where(due_date: (Time.now.beginning_of_day + time_before))..(Time.now.end_of_day + time_before).find_each do |card|
        send_normal_line_reminder(card, label)
      end
    end
  end

  # 1時間前のリマインダー
  def send_hourly_reminders
    Card.where('due_date <= ?', Time.now + 1.hour + 5.minutes).where('due_date > ?', Time.now).find_each do |card|
      send_normal_line_reminder(card, "1時間前")
    end
  end

  def send_normal_line_reminder(card)
    user = card.list.user

    return unless user.line_id.present?
    message = {
      type: 'text',
      text: "#{card.title}の期限が#{timing}に近づいています。"
    }

    response = client.push_message(user.line_id, message)
    Rails.logger.info("LINE reminder sent: #{response}")
  end

  def send_merry_reminders
    Card.where('due_date < ?', Time.now).find_each do |card|
      days_overdue = (Time.now.to_date - card.due_date.to_date).to_i
      case days_overdue
      when 1
        send_merry_line_reminder(card, "今ゴミ捨て場にいるの、#{card.title}は終わらせた？")
      when 2
        send_merry_line_reminder(card, "今あなたの家の前にいるの")
      when 3
        send_merry_line_reminder(card, "もう#{card.title}はいらないわね")
        card.destroy
      end
    end
  end

  def send_merry_line_reminder(card, message_part)
    user = card.list.user

    return unless user.line_id.present?
    message = {
      type: 'text',
      text: "もしもし、私メリー、#{message_part}"
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
