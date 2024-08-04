class CardsController < ActionController::API
  def index
    cards = current_user.cards.includes(:list)
    render json: cards
  end

  def create
    list_id = card_params[:list_id]
    list = current_user.lists.find_by(id: list_id)

    unless list
      return render json: { error: '無効なカテゴリです' }, status: :unprocessable_entity
    end

    last_card_position = list.cards.maximum(:position) || 0
    new_card_position = last_card_position + 1
    card = current_user.cards.new(card_params.except(:list_id).merge(list: list, position: new_card_position))
    if card.save
      render json: { message: '保存が成功しました', card: card }, status: :ok
    else
      render json: { error: '保存に失敗しました' }, status: :unprocessable_entity
    end
  end

  def update
    card = current_user.cards.find(params[:id])
    if card.update(card_params)
      render json: { message: '更新が成功しました', card: card }, status: :ok
    else
      render json: { error: '更新に失敗しました' }, status: :unprocessable_entity
    end
  end

  def destroy
    card = current_user.cards.find(params[:id])
    if card.destroy
      render json: { message: '削除が成功しました' }, status: :ok
    else
      render json: { error: '削除に失敗しました' }, status: :unprocessable_entity
    end
  end

  def update_all_position
    updated_cards = params[:cards]
    if update_cards_position(updated_cards)
      render json: { message: '更新が成功しました' }, status: :ok
    else
      render json: { error: '更新に失敗しました' }, status: :unprocessable_entity
    end
  end

  private

  def card_params
    params.require(:card).permit(:title, :memo, :list_id, :due_date)
  end

  def update_cards_position(cards)
    Card.transaction do
      cards.each do |card_data|
        card = Card.find(card_data['id'])
        list = List.find(card_data['list_id'])
        card.update!(list_id: list.id, position: card_data['position'])
      end
    rescue => e
      Rails.logger.error "Failed to update cards: #{e.message}"
      return false
    end
    true
  end
end
