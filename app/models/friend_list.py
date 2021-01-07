from .db import db
from .user import User


class FriendList(db.Model):
  __tablename__ = 'friendList'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'))
  friendIds = db.Column(db.JSON, default={'ids': '[]'})


  def to_dict(self):
    return {friends: [User.query.filter(User.id == friendId).first().to_dict()
                      for friendId in self.friendIds
                      ]
            }
