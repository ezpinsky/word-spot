import re

grid = "fxie amlo ewbx astu".split()  # ['fxie', 'amlo', 'ewbx', 'astu']
nrows, ncols = len(grid), len(grid[0])  # Checks size of grid/matix

# A dictionary word that could be a solution must use only the grid's letters
# create string from letters for regex
letters = ''.join(set(''.join(grid)))

# regex object for words that will match our letters and have length >= 3.
#  re.I makes it case-insensitive
is_grid_word = re.compile('[' + letters + ']{3,}$', re.I).match

# rstrip removes sepcified trailing characters, in our case the new line in file
'''
might try implementing with dictionary package
'''

# gets all words in dictionary possible with the letters
words = set(word.rstrip('\n') for word in open('words') if is_grid_word(word))

# gets all prefixes from our words
# will speed up the word check by checking first for prefixes and then entire words
prefixes = set(word[:i] for word in words
               for i in range(2, len(word) + 1))

# enumerate essentially takes an iterable and creates an enumerate object which cna be converted to list tuples with the value of the iterable and the index/count of iteration
def solve():
    for y, row in enumerate(grid):  # loops through each row of letters giving letters in row(row) and row number(y)
        for x, letter in enumerate(row): # loops through each letter in each row giving letter(letter) and column number(x)
            for result in extending(letter, ((x, y),)):
                yield result


def extending(prefix, path):
    if prefix in words:
        yield (prefix, path)
    for (nx, ny) in neighbors(path[-1]): #see what neighbors is doing
        if (nx, ny) not in path:
            prefix1 = prefix + grid[ny][nx]
            if prefix1 in prefixes:
                for result in extending(prefix1, path + ((nx, ny),)):
                    yield result

'''
look at neighbors first
'''

def neighbors(x, y):
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
print(solve())
