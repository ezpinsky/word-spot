from app.api.utils import find_all_words, find_all_rotations
from app.models import Letter_Board, db


def seed_letter_boards():
  letter_boards = [['hleo', 'aper', 'diua', 'udrt'], ['sayd', 'iunt', 'bsep', 'oris'], ['xsil', 'dend', 'peyr', 'okaa'],
                   ['ankl', 'alai', 'kbts', 'eeas'], ['pgah', 'slai', 'eraw', 'vnoe'], ['etar', 'rsaw', 'pcvo', 'lsex'],
                   ['mafd', 'poee', 'rdsk', 'eeap'], ['ytui', 'ehai', 'solj', 'spli'], ['voak', 'esnm', 'sahl', 'loef'],
                   ['siox', 'cgny', 'sahl', 'itza']
                   ]
  letter_board_seeds = []
  for board_letters in letter_boards:
    letter_board_seed = Letter_Board(letters=board_letters, words=find_all_words(board_letters), orientations=find_all_rotations(board_letters))
    letter_board_seeds.append(letter_board_seed)
    print(find_all_rotations(board_letters))
  print(letter_board_seeds)

  db.session.add_all(letter_board_seeds)
  db.session.commit()


def undo_letter_boards():
  db.session.execute('TRUNCATE letter_boards CASCADE;')
  db.session.commit()
