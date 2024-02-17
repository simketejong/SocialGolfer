
import random
import argparse
import ast


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

class Golfer:
    def __init__(self, number, name, handicap, pro=False, buggy=False, criteria1=False, criteria2=False, criteria3=False, criteria4=False):
        self.number = number
        self.name = name
        self.handicap = handicap
        self.played_against = []
        self.flights = []  # position is day and value is flight number
        self.pro = pro
        self.buggy = buggy
        self.criteria1 = criteria1
        self.criteria2 = criteria2
        self.criteria3 = criteria3
        self.criteria4 = criteria4

def total_golfers():
    if players_per_flight:
        return sum(players_per_flight[0])
    else:
        return 0  

def organize_flights(players):
    total_days = len(players_per_flight)
    schedule = [[[] for _ in range(max([player.flights[day] for player in players if day < len(player.flights)]) + 1)] for day in range(total_days)]

    # Iterate through each golfer
    for player in players:
        # Iterate through each day in the golfer's flights list
        for day, flight in enumerate(player.flights):
            # Check if the day index exists in the player's flights list
            if day < total_days:
                # Add the player's number (or any other identifier) to the correct flight and day
                schedule[day][flight].append(player.name)
    return schedule

##tempBuggy(players)
'''
for player in players:
    player.criteria1 = random.choice([True, False])
    player.criteria2 = random.choice([True, False])
    player.criteria3 = random.choice([True, False])
    player.criteria4 = random.choice([True, False])
'''
def DoesFlightNeedPlayers(day,flight_nummer):
    terug = []
    for player in players:
        if len(player.flights) == (day + 1): # lente dor index[0] is nl 1
            if player.flights[day] == flight_nummer:
                terug.append(player.name)
    return (terug)

def AlGespeeld(golfer):
    if golfer in golfer.played_against:
        return True
    else:
        return False

def WieNiet(day):
    geenplek=[]
    global dubbels
    for player in players:
        if len(player.flights) != (day + 1): # Is nog niet ingedeeld vandaag
            geenplek.append(player.name)
            dubbels=dubbels+1
    return (geenplek)

def FindPlayerToJoin(day,flight_nummer,flight_indeling):
    kan = True
    gelukt = False
    random.shuffle(players)
    for player in players:
        kan = True
        if len(player.flights) != (day + 1): # Is nog niet ingedeeld vandaag
            if player.name not in flight_indeling: 
                for Persoon in flight_indeling:
                    for player1 in players:
                        if player1.name == Persoon:
                            if player.name in player1.played_against:
                                kan = False
            else:
                kan = False
        else:
            kan = False # Speel al die dag
        if kan:
            # Muteer Spelers in flight
            flight_indeling.append(player.name)
            #player.flights[day]=flight_nummer
            player.flights.append(flight_nummer)
            # Muteer gespeeld bij andere in flight
            for Persoon in flight_indeling:
                for player in players:
                    if player.name == Persoon:
                        for muteer in flight_indeling:
                            if player.name != muteer:
                                player.played_against.append(muteer)
            gelukt=True     
            return(flight_indeling)
    geenplek=WieNiet(day)
#    print(f"poep {flight_indeling} en geenplek {geenplek}")


def ZoekOplossing():
    for day, flights in enumerate(players_per_flight):
        for flight_nummer in range(len(flights)): # dus index 0 is eerste van [4, 4, 4, 4, 4, 3, 3]
            GroteFlight=flights[flight_nummer]
            for FlightSpeler in range(GroteFlight): # flight is 0,1,2,3,4
                flight_indeling=DoesFlightNeedPlayers(day,flight_nummer) # Stel dat er al een indeling is dan 
                if len(flight_indeling) < GroteFlight: # Is flight al vol ?
                    flight_indeling=FindPlayerToJoin(day,flight_nummer,flight_indeling)
 #           print(f"dag {day} indeling {flight_indeling}")
 #   print(organize_flights(players)) # hier nog aantal dagen automatisch doen

def LaatAlleZien():
    for player in players:
        print(f"Number: {player.number}, Name: {player.name}, Handicap: {player.handicap}")
        print("Flights each day:", player.flights)
        print("Played Against:", player.played_against)
        print("Played Against:", player.played_against)
        print("Pro:", player.pro)
        print("Buggy:", player.buggy)
        print("Criteria 1:", player.criteria1)
        print("Criteria 2:", player.criteria2)
        print("Criteria 3:", player.criteria3)
        print("Criteria 4:", player.criteria4)
        print()


def ResetPlayers():
    global players, dubbels
    players = []
    dubbels = 0
    for i in range(1, total_golfers() + 1 ):
        name = f"{chr(i + 64)}" # temp
        handicap = random.randint(0,35)  # temp
        player = Golfer(i, name, handicap)
        players.append(player)

def update_players_and_flights_from_schedule(Given_Array):
    global players_per_flight
    if len(Given_Array) > 0:
        players_per_flight = [[len(flight) for flight in day] for day in Given_Array]
    ResetPlayers()
    for day, flights in enumerate(Given_Array):
        for flight_num, flight in enumerate(flights):
            for player_name in flight:
                # Vind de overeenkomende speler en update zijn/haar flights
                player = next((p for p in players if p.name == player_name), None)
                if player:
                    #player.flights[day] = flight_num
                    player.flights.append(flight_num)
                    # Update played_against voor elke speler in dezelfde flight
                    for other_player_number in flight:
                        if other_player_number != player_name:
                            if other_player_number not in player.played_against:
                                player.played_against.append(other_player_number)
#Given_Array=[]
#Given_Array=[[["A","C","Y","X"],["?","?","B","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?"],["Q","M","W"]],[["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?"],["?","?","?"]],[["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?"],["?","?","?"]],[["?","?","?"],["?","?","?"],["?","?","?"],["?","?","?"],["?","?","?"],["?","?","?"],["?","?","?","?"],["?","?","?","?"]],[["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?","?"],["?","?","?"],["?","?","?"]]]

def parse_array_argument(array_str):
    try:
        # Safely evaluate the string representation of the list
        return ast.literal_eval(array_str)
    except ValueError as e:
        print(f"Error parsing array argument: {e}")
        # Return None to indicate a parsing error
        return None


parser = argparse.ArgumentParser(description="Process the given array.")
parser.add_argument("--GivenArray", type=str, help="Array in string format", default="[]")   
args = parser.parse_args()    
Given_Array = parse_array_argument(args.GivenArray)   
if Given_Array is None:
    Given_Array = []
players = []
AantalPogingen=10000
LaagsteDubbels=1000

while (AantalPogingen > 0):
    if (len(Given_Array) > 0):
        update_players_and_flights_from_schedule(Given_Array)
    else:
        ResetPlayers()
    ZoekOplossing()
    if dubbels < LaagsteDubbels:
        LaagsteDubbels=dubbels
    if dubbels == 0:
        AantalPogingen=0
    else:
        AantalPogingen=AantalPogingen-1

if AantalPogingen == 0 :
    print(organize_flights(players))
#    print(f"Timeout MinDubbels = {LaagsteDubbels}")
#print(f"Dubbels {LaagsteDubbels}")

