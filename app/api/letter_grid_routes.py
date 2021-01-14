import re
import os
import itertools
from collections import deque
import time


'''
create a single algo that finds all words for a given grid
change out all 4s in the algo for an ncols variable and for the maxtrixise change out the 5 for ncols + 1

'''

my_global_var = ''
# enumerate essentially takes an iterable and creates an enumerate object which can be converted to list of tuples with the value of the iterable and the index/count of iteration
def find_words(grid, words, prefixes):
  wordMemo = dict()
  for y, row in enumerate(grid):  # loops through each row of letters giving letters in row(row) and row number(y)
      for x, letter in enumerate(row):  # loops through each letter in each row giving letter(letter) and column number(x)
          for result in pathing(grid, letter, ((x, y),), words, prefixes):
              if result[0] not in wordMemo:  # this may decrease efficiency but it prevents duplicate words
                  wordMemo[result[0]] = result[0]
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
  queue_letters = deque(letters)
  for i in range(4, 15, 5):
    queue_letters.insert(i, ' ')
  return ''.join(list(queue_letters)).split(' ')

# function to find every orientation of letters
def orientation_generator(letters, words, prefixes):
  max_words = 0
  count = 0
  letter_orientation = 'letters'
  rotated_orientations = set()
  for i in itertools.permutations(letters):
      count += 1
      if i not in rotated_orientations:
          i = matrixize(i)
          for z in range(3):
            rotated_i = ''.join([list(a) for a in (zip(*reversed(i)))].pop())
            rotated_orientations.add(''.join(rotated_i))
          words_found = len(list(find_words(i, words, prefixes)))  # checks all words for orientation
          if words_found > max_words:  # compare the yielded value to current max
            letter_orientation = ''.join(i)
            max_words = words_found
            print(letter_orientation, max_words, 'permutation count is', count)
            if max_words >= 45:
              my_global_var = letter_orientation
              break
          yield i
  return {letter_orientation: max_words}

def find_best_grid(letters): # 'aaaa bbbb cccc dddd'
    grid = letters.split()  # ['fpie', 'amlo', 'ewbx', 'astu'] list of rows
    # nrows, ncols = len(grid), len(grid[0])  # gets number of col and number of rows

    # create string from letters for regex -- A dictionary word that could be a solution must use only the grid's letters
    prefix_letters = ''.join(set(''.join(grid)))
    # regex object for words that will match our letters and have length >= 3.  -- re.I makes it case-insensitive
    is_grid_word = re.compile('[' + prefix_letters + ']{3,}$', re.I).match

    # gets all words in dictionary possible with the letters using regex -- rstrip removes sepcified trailing characters, in our case the new line in file
    words = set(word.rstrip('\n') for word in open(f'{os.getcwd()}/app/api/words.txt') if is_grid_word(word))

    # will speed up the word check by checking first for prefixes and then entire words -- gets all prefixes from our words
    prefixes = set(word[:i] for word in words
                   for i in range(2, len(word) + 1))

    answer = orientation_generator(letters, words, prefixes)
    return answer


    # grid_words = [item[0] for item in list(find_words(grid, words, prefixes))]  # all words for grid orientation
    # print('longest word is', max(grid_words, key=lambda word: len(word)))  # longest word


# Printing result
start = time.time()
print(list(find_best_grid('lpsacfszoicavdli')))
end = time.time()
print('time to run: ', end - start)
# use threading to lock thread for the algorithm before returning my_global_var check w19d1 lecture material
# https://open.appacademy.io/learn/js-py---aug-2020-online/week-19-aug-2020-online/basic-python-threading-demo

print(my_global_var)
