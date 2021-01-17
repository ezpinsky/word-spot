from app.models import db, User, Letter_Board
from flask import Blueprint
from flask_login import login_required, current_user


letter_board_routes = Blueprint('letterboards', __name__)


@letter_board_routes.route('/')
@login_required
def new_letter_board():
  user_id = current_user.get_id()
  user = User.query.get(user_id)
  if not user.last_played_id:
    user.last_played_id
    new_board = Letter_Board.query.get(1)
    return new_board.to_dict()
  new_id = user.last_played_id + 1
  user.last_played_id = new_id
  new_board = Letter_Board.query.get(new_id)
  return new_board.to_dict


@letter_board_routes.route('/<int:id>/')
@login_required
def get_letter_board(id):
  letter_board = Letter_Board.query.get(id)
  return letter_board.to_dict()
