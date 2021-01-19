from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ..models import Letter_Board


def is_letter_board_formatted(form, field):
  print('Checking if letters are formatted correctly.', field.data)
  new_letter_board = field.data
  if type(new_letter_board) is not list:
    raise ValidationError('Letters must be in list format.')

  if len(new_letter_board) is not 4:
    raise ValidationError('List must have 4 strings.')

  if len([len(row) for row in new_letter_board if len(row) is 4]) is not 4:
    raise ValidationError('Each row in list must have 4 letters.')


def letter_board_has_enough_vowels(form, field):
  new_letters = ''.join(field.data)
  if len[letter for letter in new_letters if letter in ('a', 'e', 'i', 'o', 'u')] is < 6:
    raise ValidationError('LetterBoard must contain atleast 6 vowels.')


def is_new_letterBoard(form, field):
  print('Checking if letterBoard already exists', field.data)
  new_letter_board = field.data
  letter_board = Letter_Board.query.filter(LetterBoard.letters == new_letter_board).first()
  if letter_board:
    raise ValidationError('This LetterBoard has already been created.')
