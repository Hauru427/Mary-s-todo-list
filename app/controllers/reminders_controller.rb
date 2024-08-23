class RemindersController < ApplicationController
  require 'line/bot'
  require 'yaml'
  protect_from_forgery except: :callback
  skip_before_action :require_login, only: %i[callback]

  def send_reminders
    current_time = Time.now
    send_daily_reminders if current_time.hour == 5
    send_hourly_reminders
    send_merry_reminders if current_time.hour == 9
  end

  def send_daily_reminders
    reminders = {
      '3日前' => 3.days,
      '2日前' => 2.days,
      '1日前' => 1.day
    }

    reminders.each do |label, time_before|
      Card.where(due_date: (Time.now.beginning_of_day + time_before)..(Time.now.end_of_day + time_before)).find_each do |card|
        send_motivational_line_reminder(card, label, :daily)
      end
    end
  end

  # 1時間前のリマインダー
  def send_hourly_reminders
    Card.where('due_date <= ?', Time.now + 1.hour + 5.minutes).where('due_date > ?', Time.now).find_each do |card|
      send_motivational_line_reminder(card, "1時間前", :hourly)
    end
  end

  # 遅延タスクに対する名言リマインダー
  def send_motivational_reminders
    overdue_cards = Card.where('due_date < ?', Time.now).order(due_date: :asc)
    return if overdue_cards.empty?

    user = overdue_cards.first.list.user
    return unless user.line_id.present?

    task_messages = overdue_cards.map do |card|
      "#{card.title} (#{card.due_date.to_date}から過ぎています)"
    end.join("\n")

    quote_data = fetch_random_quote('overdue')
    message = {
      type: 'text',
      text: "以下のタスクが期限切れです:\n#{task_messages}\n\n#{quote_data['content']}\n- #{quote_data['author']}"
    }

    response = client.push_message(user.line_id, message)
    Rails.logger.info("LINE reminder sent: #{response}")
  end

  # 名言をランダムで送信するメソッド
  def send_motivational_line_reminder(card, timing, category)
    user = card.list.user
    return unless user.line_id.present?

    quote_data = fetch_random_quote(category)
    message = {
      type: 'text',
      text: "#{card.title}の期限が#{timing}に近づいています。\n今回の名言\n#{quote_data['content']}\n- #{quote_data['author']}"
    }

    response = client.push_message(user.line_id, message)
    Rails.logger.info("LINE reminder sent: #{response}")
  end

  def fetch_random_quote(category)
    quotes = YAML.load_file(Rails.root.join('config', 'quotes.yml'))
    quotes[category.to_s].sample
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
