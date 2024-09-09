class ContactMailer < ApplicationMailer

  def send_email(contact)
    @contact = contact
    mail(to: '', subject: '')
  end

end
