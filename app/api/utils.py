import re
import os
import itertools
from collections import deque
import time


'''
Stretch goal to ability to dynamically work for a grid size of 3x3 or 4x4
change out all 4s in the algo for an ncols variable and for the maxtrixise change out the 5 for ncols + 1

'''


# enumerate essentially takes an iterable and creates an enumerate object which can be converted to list of tuples with the value of the iterable and the index/count of iteration
def find_words(grid, words, prefixes):
  for y, row in enumerate(grid):  # loops through each row of letters giving letters in row(row) and row number(y)
    for x, letter in enumerate(row):  # loops through each letter in each row giving letter(letter) and column number(x)
      for result in pathing(grid, letter, ((x, y),), words, prefixes):
        yield result


# path is a tuple of tuples containing coordinates of letters that build the word
def pathing(grid, prefix, path, words, prefixes):
  if prefix in words:  # if this is in our words list then we found a good word and its path
    yield (prefix, path)

  for (nx, ny) in neighbors(*path[-1]):  # current prefix is not in words so lets keep searching adjacent letters destructure the tuple
    # path[-1] evaluates to the most recent letter location
    # 'nx = next x'  'ny = next y'
    # neighbors will return a tuple of all next tuple locations
    if (nx, ny) not in path:  # checks if we have already hit this letter location
      prefix1 = prefix + grid[ny][nx]  # adds the new letter to the prefix
      if prefix1 in prefixes:  # if this is not a valid prefix we abandon the path otherwise we recursively continue down path
        for result in pathing(grid, prefix1, path + ((nx, ny),), words, prefixes):
          yield result


def neighbors(x, y):
  for nx in range(max(0, x - 1), min(x + 2, 4)):
    for ny in range(max(0, y - 1), min(y + 2, 4)):
      yield (nx, ny)


def matrixize(letters):
  matrix_letters = deque(letters)
  for i in range(4, 15, 5):
    matrix_letters.insert(i, ' ')
  return ''.join(list(matrix_letters)).split(' ')


# function to find every orientation of letters
def orientation_generator(letters, words, prefixes):
  count = 0
  rotated_orientations = set()
  letters = ''.join(letters.split(' '))
  for orientation in itertools.permutations(letters):  # ('a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'd', 'd', 'd', 'd')
    count += 1
    if orientation not in rotated_orientations:
      rotated_orientations.add(orientation)  # adds orientation to memo
      rotating_orientation = [list(chars) for chars in matrixize(orientation)]  # formats data for roation into list of lists

    # gets all rotations for memoization cuts permuations by 75%
      for z in range(3):
        rotating_orientation = [list(chars) for chars in zip(*rotating_orientation[::-1])]  # rotates matrix clockwise
        rotated_orientations.add(tuple(''.join([''.join(list_chars) for list_chars in rotating_orientation])))  # formats rotated orientation to add to memo

      found_words = set([a[0] for a in find_words(rotating_orientation, words, prefixes)])  # gets all unique words that were found using set
      num_words = len(found_words)  # checks all words for orientation
      yield matrixize(orientation), num_words, found_words, count


def find_suitable_orientation(letters):  # 'aaaa bbbb cccc dddd'
  grid = letters.split()  # ['fpie', 'amlo', 'ewbx', 'astu'] list of rows
  nrows, ncols = len(grid), len(grid[0])  # gets number of col and number of rows

  # create string from letters for regex -- A dictionary word that could be a solution must use only the grid's letters
  prefix_letters = ''.join(set(''.join(grid)))
  # regex object for words that will match our letters and have length >= 3.  -- re.I makes it case-insensitive
  is_grid_word = re.compile('[' + prefix_letters + ']{3,}$', re.I).match

  # gets all words in dictionary possible with the letters using regex -- rstrip removes sepcified trailing characters, in our case the new line in file
  words = set(word.rstrip('\n') for word in open(f'{os.getcwd()}/app/api/words.txt') if is_grid_word(word))

  # will speed up the word check by checking first for prefixes and then entire words -- gets all prefixes from our words
  prefixes = set(word[:i] for word in words
                 for i in range(2, len(word) + 1)
                 )
  max = (0,)
  for orientation, num_words, found_words, count in orientation_generator(letters, words, prefixes):
    if num_words > max[0]:
      max = num_words, orientation, found_words, count
    if num_words >= 120 or count >= 1:  # Only allows to run for maximum of 10 seconds
      return max


def find_all_words(letters):
  grid = letters
  prefix_letters = ''.join(set(''.join(grid)))
  is_grid_word = re.compile('[' + prefix_letters + ']{3,}$', re.I).match
  words = set(word.rstrip('\n') for word in open(f'{os.getcwd()}/app/api/words.txt') if is_grid_word(word))
  prefixes = set(word[:i] for word in words
                 for i in range(2, len(word) + 1)
                 )
  grid_words = [item[0] for item in list(find_words(grid, words, prefixes))]
  return grid_words
# print('longest word is', max(grid_words, key=lambda word: len(word)))  # longest word


def find_all_rotations(orientation):
  orientation = [list(chars) for chars in orientation]  # turns input into correct format: a list of lists
  rotated_orientations = []
  for z in range(3):
    orientation = [list(chars) for chars in zip(*orientation[::-1])]  # rotates by passing a reversed version into zip
    rotated_orientations.append([''.join(list_chars) for list_chars in orientation])
  return rotated_orientations


# print(find_suitable_orientation('aaaa bbbb cccc dddd'))
