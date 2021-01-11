from .db import db
from .user import User


class LetterGrid(db.Model):
  __tablename__ = 'letterGrid'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
  letters = db.Column(db.String, nullable=False)
  words = db.Column(db.JSON, nullable=False)

  def to_dict(self):
    return {'userId': self.userId,
            'leters': self.letters,
            'words': self.words
            }
