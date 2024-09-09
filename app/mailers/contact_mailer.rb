class ContactMailer < ApplicationMailer
  def send_email(contact)
    @contact = contact
    mail(to: ENV['GMAIL_ADDRESS'], subject: t('contact.subject') + @contact.subject)
  end
end
