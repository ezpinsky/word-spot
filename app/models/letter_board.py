from .db import db
from .user import User


class Letter_Board(db.Model):
  __tablename__ = 'letter_board'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
  letters = db.Column(db.JSON, nullable=False)
  words = db.Column(db.JSON, nullable=False)
  orientations = db.Column(db.JSON, nullable=False)

  def to_dict(self):
    return {'user_id': self.user_id,
            'leters': self.letters,
            'words': self.words,
            'orientations': self.orientations
            }
