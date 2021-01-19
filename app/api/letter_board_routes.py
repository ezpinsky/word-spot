from app.models import db, User, Letter_Board
from flask import Blueprint
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms import is_letter_board_formatted
from ..api.utils import find_all_rotations, find_all_words

letter_board_routes = Blueprint('letterboards', __name__)


@letter_board_routes.route('/')
@login_required
def new_letter_board():
  user_id = current_user.get_id()
  user = User.query.get(user_id)
  if not user.last_played_id:
    user.last_played_id = 1
    new_board = Letter_Board.query.get(1)
    db.session.commit()
    return new_board.to_dict()
  new_id = user.last_played_id + 1
  user.last_played_id = new_id
  new_board = Letter_Board.query.get(new_id)
  if not new_board:
    user.last_played_id = 1
    new_board = Letter_Board.query.get(1)
  db.session.commit()
  return new_board.to_dict()


@letter_board_routes.route('/<int:id>/')
@login_required
def get_letter_board(id):
  letter_board = Letter_Board.query.get(id)
  return letter_board.to_dict()


@letter_board_routes.route('/', methods=['POST'])
@login_required
def create_letter_board():
  form = is_letter_board_formatted()
  print("this is the request.json():", request.get_json())
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    user = current_user.get_id()
    created_letters = from.data['letters']
    created_letter_board = Letter_Board(user_id=user, letters=created_letters, words=find_all_words(created_letters), orientations=find_all_rotations(created_letters))
    db.session.add(create_letter_board)
    db.session.commit()
    return created_letter_board.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}
