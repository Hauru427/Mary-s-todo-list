class ContactsController < ApplicationController
  skip_before_action :require_login

  def new
    @contact = Contact.new
  end

  def confirm
    @contact = Contact.new(contact_params)
    return unless @contact.invalid?

    flash.now[:danger] = t('contact.create.failure')
    render :new
  end

  def back
    @contact = Contact.new(contact_params)
    render :new
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      ContactMailer.send_email(@contact).deliver_now
      redirect_to done_contacts_path
    else
      flash.now[:danger] = t('contact.create.failure')
      render :new
    end
  end

  def done; end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :subject, :message)
  end
end
