class ListsController < ActionController::API
  def index
    lists = current_user.lists.all.order(created_at: :asc)
    render json: lists.as_json(only: [:id, :title])
  end

  def create
    list = current_user.lists.new(list_params)
    if list.save
      render json: { message: '保存が成功しました', list: list.as_json(only: [:id, :title]) }, status: :ok
    else
      render json: { error: '保存に失敗しました' }, status: :unprocessable_entity
    end
  end

  def destroy
    list = List.find(params[:id])
    if list.destroy
      render json: { message: '削除が成功しました' }, status: :ok
    else
      render json: { error: '削除に失敗しました' }, status: :unprocessable_entity
    end
  end

  def destroy_all_cards
    list = List.find(params[:id])

    if destroy_cards(list.items)
      render json: { message: '削除が成功しました' }, status: :ok
    else
      render json: { error: '削除に失敗しました' }, status: :unprocessable_entity
    end
  end

  private

  def list_params
    params.require(:list).permit(:title)
  end

  def destroy_cards(cards)
    Card.transaction do
      cards.each do |card_data|
        card = Card.find(card_data['id'])
        card.destroy!
      end
    rescue => e
      Rails.logger.error "Failed to destroy cards: #{e.message}"
      return false
    end
    true
  end
end
