from app.models import db, FriendList


def seed_friendLists():
  seedList1 = FriendList(userId=1, friendIds={'ids': '[2, 3, 4, 5]'})
  seedList2 = FriendList(userId=2, friendIds={'ids': '[1, 3, 4, 5]'})
  seedList3 = FriendList(userId=3, friendIds={'ids': '[1, 2, 4, 5]'})
  seedList4 = FriendList(userId=4, friendIds={'ids': '[1, 2, 3, 5]'})
  seedList5 = FriendList(userId=5, friendIds={'ids': '[1, 2, 3, 4, 10, 11, 12]'})
  seedList6 = FriendList(userId=6, friendIds={'ids': '[7, 8, 9, 10]'})
  seedList7 = FriendList(userId=7, friendIds={'ids': '[6]'})
  seedList8 = FriendList(userId=8, friendIds={'ids': '[6]'})
  seedList9 = FriendList(userId=9, friendIds={'ids': '[6]'})
  seedList10 = FriendList(userId=10, friendIds={'ids': '[5, 6, 11, 12]'})
  seedList11 = FriendList(userId=11, friendIds={'ids': '[5, 10]'})
  seedList12 = FriendList(userId=12, friendIds={'ids': '[5, 10]'})

  db.session.add(seedList1)
  db.session.add(seedList2)
  db.session.add(seedList3)
  db.session.add(seedList4)
  db.session.add(seedList5)
  db.session.add(seedList6)
  db.session.add(seedList7)
  db.session.add(seedList8)
  db.session.add(seedList9)
  db.session.add(seedList10)
  db.session.add(seedList11)
  db.session.add(seedList12)
  db.session.commit()


# def undo_friendLists():
#   db.session.execute('TRUNCATE friendLists')
#   db.session.commit()
