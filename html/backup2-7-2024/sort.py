
import random

class Golfer:
    def __init__(self, number, name, handicap, pro=False, buggy=False, criteria1=False, criteria2=False, criteria3=False, criteria4=False):
        self.number = number
        self.name = name
        self.handicap = handicap
        self.played_against = []
        self.flights = [[] for _ in range(5)]  # Initialize a list for each day's flight
        self.pro = pro
        self.buggy = buggy
        self.criteria1 = criteria1
        self.criteria2 = criteria2
        self.criteria3 = criteria3
        self.criteria4 = criteria4

# Create objects for each player
players = []
for i in range(1, 27):
    name = f"Player {i}"
    handicap = 0  # You can set the handicap for each player as needed
    player = Golfer(i, name, handicap)
    players.append(player)

# Example: Set the players each player has played against, the flights they play in each day, and some boolean attributes
# Example of setting played_against
players[0].played_against = [players[1], players[2]]
players[1].played_against = [players[0], players[2], players[3]]

# Example of setting flights for each day
players_per_flight = [
    # Day 1
    [4, 4, 4, 4, 4, 3, 3],  # 5 flights with 4 players each
    # Day 2
    [4, 4, 4, 4, 4, 3, 3],  # 5 flights with 4 players each
    # Day 3
    [4, 4, 4, 4, 4, 3, 3],  # 5 flights with 4 players each
    # Day 4
    [3, 3, 3, 3, 3, 3, 4, 4],  # 5 flights with 4 players each
    # Day 5
    [4, 4, 4, 4, 4, 3, 3]  # 5 flights with 4 players each
]

# Set some boolean attributes for players
# For demonstration purposes, we'll randomly set these attributes

for player in players:
    player.pro = random.choice([True, False])
    player.buggy = random.choice([True, False])
    player.criteria1 = random.choice([True, False])
    player.criteria2 = random.choice([True, False])
    player.criteria3 = random.choice([True, False])
    player.criteria4 = random.choice([True, False])

# Print information for each player
for player in players:
    print(f"Number: {player.number}, Name: {player.name}, Handicap: {player.handicap}")
    print("Flights each day:", player.flights)
    print("Played Against:", [opponent.name for opponent in player.played_against])
    print("Pro:", player.pro)
    print("Buggy:", player.buggy)
    print("Criteria 1:", player.criteria1)
    print("Criteria 2:", player.criteria2)
    print("Criteria 3:", player.criteria3)
    print("Criteria 4:", player.criteria4)
    print()

