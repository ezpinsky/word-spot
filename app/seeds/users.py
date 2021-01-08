from werkzeug.security import generate_password_hash
from app.models import db, User
from datetime import datetime


def seed_users():
  seedUser1 = User(username='fiteMachine', email='bently@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser2 = User(username='ablindoldman', email='hanson@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser3 = User(username='heylookanalien', email='gabe@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser4 = User(username='greendaygoodday', email='jamesb@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser5 = User(username='thelilassasin', email='ezzy@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser6 = User(username='fredtheplant', email='ez@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser7 = User(username='wakeboarderfeik', email='sam@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser8 = User(username='madbrad420', email='brad@aol.com', password='password', lastLoggedIn=datetime.now())
  seedUser9 = User(username='locojamesslick', email='jamesr@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser10 = User(username='zegreenmachine45', email='peter@gmail.com', password='password', lastLoggedIn=datetime.now())
  seedUser11 = User(username='holy_hoglet1', email='nick@gmail.com', password='password', lastLoggedIn=datetime.now())
  demo = User(username='demoWord', email='demo@email.com', password='password', lastLoggedIn=datetime.now(), friendList=[seedUser1, seedUser2, seedUser3, seedUser4])

  # demo.friendList.append(seedUser1)

  db.session.add(demo)
  db.session.add(seedUser1)
  db.session.add(seedUser2)
  db.session.add(seedUser3)
  db.session.add(seedUser4)
  db.session.add(seedUser5)
  db.session.add(seedUser6)
  db.session.add(seedUser7)
  db.session.add(seedUser8)
  db.session.add(seedUser9)
  db.session.add(seedUser10)
  db.session.add(seedUser11)
  db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
  db.session.execute('TRUNCATE users CASCADE;')
  db.session.commit()
