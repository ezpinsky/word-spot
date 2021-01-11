from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin  # This extends User to implement is_authenticated() and other propeties
from sqlalchemy.orm import relationship
from alembic import op
from datetime import datetime

friends = db.Table('friends',
                   db.Model.metadata,
                   db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
                   db.Column('friend_id', db.Integer, db.ForeignKey('users.id'))
                   )


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(18), nullable=False, unique=True)
  email = db.Column(db.String(255), nullable=False, unique=True)
  hashedPassword = db.Column(db.String(255), nullable=False)
  lastLoggedIn = db.Column(db.DateTime, nullable=False)

  friendList = db.relationship('User', secondary='friends', primaryjoin=id == friends.c.friend_id, secondaryjoin=id == friends.c.user_id, backref='friends')
  letterGrids = relationship('LetterGrid')

  def to_dict_friendList(self):
    return {friends: [User.query.filter(User.id == friend_id).first().to_dict()
                      for friend_id in self.friendList
                      ]
            }


  @property  # use this decorator for getters and setters
  def password(self):
    return self.hashedPassword

  @password.setter
  def password(self, password):
    self.hashedPassword = generate_password_hash(password)  # hashes user's password and stores in db

  def check_password(self, password):
    return check_password_hash(self.password, password)  # checks if user submitted password matches hash

  def to_dict(self):
    return {'id': self.id,
            'username': self.username,
            'email': self.email
            }
