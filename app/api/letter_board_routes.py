from app.models import db, User, Letter_Board
from flask import Blueprint, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from ..forms import Letter_Board_Form
from ..api.utils import find_all_rotations, find_all_words, matrixize, find_suitable_orientation

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
  form = Letter_Board_Form()
  print("this is the request.json():", request.get_json())
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    formatted_letters = ' '.join(matrixize(form.data['letters']))
    suitable_orientation = find_suitable_orientation(formatted_letters)
    user = current_user.get_id()
    created_letter_board = Letter_Board(user_id=user, letters=suitable_orientation[1], words=list(suitable_orientation[2]), orientations=find_all_rotations(suitable_orientation[1]))
    db.session.add(created_letter_board)
    db.session.commit()
    return created_letter_board.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}
