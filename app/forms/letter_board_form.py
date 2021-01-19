from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ..models import Letter_Board
from ..api.utils import matrixize


def is_valid_letter_board(form, field):
  print('Checking if letter board was formatted correctly.', field.data)
  letters = form.data['letters']

  if len(letters) != 16:
    raise ValidationError('LetterBoard must be exactly 16 letters.')

  if not all(letter.isalpha() for letter in letters):
    raise ValidationError('LettersBoard can only contain letters.')

  print('Checking if letterBoard has enough vowels.')
  count = 0
  for letter in letters:
   if letter in ('a', 'e', 'i', 'o', 'u'):
     count += 1
  if count < 6:
    raise ValidationError('LetterBoard must contain atleast 6 vowels.')

  print('Checking if letterBoard already exists', field.data)
  formatted_letters = matrixize(letters)
  letter_board = Letter_Board.query.filter(Letter_Board.letters is formatted_letters).first()
  if letter_board:
    raise ValidationError('This LetterBoard has already been created. Please try different letters.')


class Letter_Board_Form(FlaskForm):
  letters = StringField('letters', validators=[DataRequired(), is_valid_letter_board])
