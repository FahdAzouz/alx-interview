#!/usr/bin/python3
import sys


def is_safe(board, row, col):
    # Check all columns to the left of the current position
    for i in range(col):
        # Check if there's a queen in the same row
        if board[i] == row:
            return False

        # Check upper-left diagonal
        # This works for any distance because the difference is always the same
        if board[i] - i == row - col:
            return False

        # Check lower-left diagonal
        # This works for any distance because the sum is always the same
        if board[i] + i == row + col:
            return False

    # If we've checked all positions and found no threats, it's safe
    return True


def solve_nqueens(N):
    def backtrack(col):
        if col == N:
            print([[i, board[i]] for i in range(N)])
            return
        for row in range(N):
            if is_safe(board, row, col):
                board[col] = row
                backtrack(col + 1)

    board = [-1] * N
    backtrack(0)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: nqueens N")
        sys.exit(1)
    try:
        N = int(sys.argv[1])
    except ValueError:
        print("N must be a number")
        sys.exit(1)
    if N < 4:
        print("N must be at least 4")
        sys.exit(1)
    solve_nqueens(N)
