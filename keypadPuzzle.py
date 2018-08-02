import pprint

"""
Write a program to calculate the number of n-digit numbers that simultaneously:
• exclude * and #
• start with 0
• are formed by cycling through three moves: a "tall L" (two steps in one direction followed by one
step in the perpendicular direction) followed by two "short L"s (one step in one direction followed
by one step in the perpendicular direction).
"""

# Solution:

MOVES = [
  {'short': [7, 9],       'tall': [4, 6]},
  {'short': [5],          'tall': [8, 6]},
  {'short': [4, 6],       'tall': [7, 9]},
  {'short': [5],          'tall': [8, 4]},
  {'short': [2, 8],       'tall': [0, 3, 9]},
  {'short': [1, 3, 7, 9], 'tall': []},
  {'short': [2, 8],       'tall': [0, 1, 7]},
  {'short': [5, 0],       'tall': [2, 6]},
  {'short': [4, 6],       'tall': [1, 3]},
  {'short': [5, 0],       'tall': [2, 4]}
]

def count_numbers(list):
  sum = 0
  for i in range(0, 10):
    sum += list[i]
  return sum

def get_next_digits(digit_place, digit_value):
  if digit_place % 3 == 0:
    return MOVES[digit_value]['tall']
  else:
    return MOVES[digit_value]['short']

def get_numbers(digits):
  terminal_digits = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  digit_place = 0

  while digit_place < (digits - 1):
    new_terminal_digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for i in range (0, 10):
      next_digits = get_next_digits(digit_place, i)

      for j in range (0, len(next_digits)):
        new_terminal_digits[next_digits[j]] += terminal_digits[i] * 1
        
    terminal_digits = new_terminal_digits
    digit_place += 1

  return count_numbers(new_terminal_digits)

print("7 digit combinations:", get_numbers(7))
print("100 digit combinations:", get_numbers(100))
