import re
import os
from collections import deque
import time



# enumerate essentially takes an iterable and creates an enumerate object which can be converted to list of tuples with the value of the iterable and the index/count of iteration
def solve(grid, words, prefixes, ncols, nrows):
  wordMemo = dict()
  for y, row in enumerate(grid):  # loops through each row of letters giving letters in row(row) and row number(y)
      for x, letter in enumerate(row):  # loops through each letter in each row giving letter(letter) and column number(x)
          for result in extending(grid, letter, ((x, y),), words, prefixes, ncols, nrows):
              if result[0] not in wordMemo:  # this may decrease efficiency but it prevents duplicate words
                  wordMemo[result[0]] = result[0]
                  yield result


# path is a tuple of tuples containing coordinates of letters that build the word
def extending(grid, prefix, path, words, prefixes, ncols, nrows):
    if prefix in words:  # if this is in our words list then we found a good word and its path
        yield (prefix, path)

    for (nx, ny) in neighbors(*path[-1], ncols, nrows):  # current prefix is not in words so lets keep searching adjacent letters destructure the tuple
        # path[-1] evaluates to the most recent letter location
        # 'nx = next x'  'ny = next y'
        # neighbors will return a tuple of all next tuple locations
        if (nx, ny) not in path:  # checks if we have already hit this letter location
            prefix1 = prefix + grid[ny][nx]  # adds the new letter to the prefix
            if prefix1 in prefixes:  # if this is not a valid prefix we abandon the path otherwise we recursively continue down path
                for result in extending(grid, prefix1, path + ((nx, ny),), words, prefixes, ncols, nrows):
                    yield result


def neighbors(x, y, ncols, nrows):  #
    for nx in range(max(0, x - 1), min(x + 2, ncols)):
        for ny in range(max(0, y - 1), min(y + 2, nrows)):
            yield (nx, ny)


# Print a maximal-length word and its path:

# print(max(solve(), key=lambda (word, path): len(word)))

'''
to make this work for the purposes of find the grid setup with most amount of words available would take a long time
because of 16! number of orientations however we can make that number much smaller by
limiting changes to grid orientation
if two letters are the same check with memo if grid already made
some grid oreintations will technically be unique but if you "rotate" the grid they will be the same as a previously searched grid
 check this by adding "mirror grids" to the memo for everything
'''


'''
function to find every orientation of letters
'''


def find_best_grid(letters):
    orientations = dict()
    # algo to go through each orientation
    #################################
    '''
    call hellper function that recursively goies through
    if grid in orientations:
      next grid orientation
    '''
    grid = letters.split()  # ['fpie', 'amlo', 'ewbx', 'astu'] list of rows
    nrows, ncols = len(grid), len(grid[0])  # sets number of col and number of rows

    # A dictionary word that could be a solution must use only the grid's letters
    # create string from letters for regex
    letters = ''.join(set(''.join(grid)))

    # regex object for words that will match our letters and have length >= 3.
    #  re.I makes it case-insensitive
    is_grid_word = re.compile('[' + letters + ']{3,}$', re.I).match

    # rstrip removes sepcified trailing characters, in our case the new line in file
    # gets all words in dictionary possible with the letters using regex
    words = set(word.rstrip('\n') for word in open(f'{os.getcwd()}/app/api/words.txt') if is_grid_word(word))

    # gets all prefixes from our words
    # will speed up the word check by checking first for prefixes and then entire words
    prefixes = set(word[:i] for word in words
                   for i in range(2, len(word) + 1))

    grid_words = [item[0] for item in list(solve(grid, words, prefixes, ncols, nrows))]  # all words for grid orientation

    orientations[''.join(grid)] = len(grid_words)
    grid = deque(grid)
    for i in range(1, 4):
      letters = grid[i]
      del grid[i]
      grid.appendleft(letters)
    orientations[''.join(grid)] = len(grid_words)
    return orientations

    # print(len(list(solve())), 'words')  # Number of words
    # print('longest word is', max(grid_words, key=lambda word: len(word)))  # longest word


start = time.time()
print(find_best_grid("fpia cmll ewbd tlro"))
end = time.time()
print('time consumed', end - start)
