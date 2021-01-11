import time
import itertools
from collections import deque

orientations = dict()

grid = deque(['aaaa', 'bbbb', 'cccc', 'dddd'])
orientations[''.join(grid)] = 10
grid_mirror = ['', '', '', '']

'''
aefg
bdfg
cccc
dddd

dcba
dcde
dcff
dcgg


'''
for i in range(3):
  grid = [list(char) for char in (zip(*reversed('aaaabbbbccccdddd')))].pop()
  orientations[''.join(grid)] = 10

print(orientations)
# for x in range (3):
  # print(x)
  # for j in range(4):
  #   for i in range(3, -1, -1):
  #     print(grid[i][0])
  #     grid_mirror[j] += grid[i][:1]
  #     print(grid)
  #     print(grid_mirror)
  # orientations[''.join(grid_mirror)] = 10
  # grid = grid_mirror
  # print("grid is", grid)
  # grid_mirror = ['', '', '', '']

  # grid = .join, zip(*reversed(grid))
  # print(grid)

# for i in range(4):
#   print(''.join(x[i] for x in grid))

# print(orientations)


    # do sideways orientation but this does not work at all!!
    # grid1 = ''
    # for row in grid:
    #     for letter in row:
    #         if len(grid1) % 5 == 0:
    #             grid1 += ' '
    #         grid1 += letter
