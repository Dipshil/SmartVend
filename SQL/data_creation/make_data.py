from os.path import isfile
from filepaths import *
from timestamp_generator import random_time_gen
from tqdm import tqdm
import random

NUM_VENDING_MACHINES = 1017

def main():

    # Create Item Types
    with open(ITEM_TYPES, 'w') as f:
        f.write('drink\n')
        f.write('chips\n')
        f.write('bar\n')

    # Create Items
    with open(ITEMS, 'w') as f:
        # Drinks
        f.write('coke,1,1.75\n')
        f.write('diet coke,1,1.75\n')
        f.write('sprite,1,1.75\n')
        f.write('root beer,1,1.75\n')
        f.write('v8,1,1.75\n')

        # Chips
        f.write('lays original,2,1.00\n')
        f.write('lays bbq,2,1.00\n')
        f.write('ruffles bacon cheddar,2,1.00\n')
        f.write('vegetable straws,2,1.00\n')

        # Bars
        f.write('hersheys,3,1.00\n')
        f.write('snickers,3,1.00\n')
        f.write('cliff bar,3,2.00\n')
        f.write('fiber one,3,2.00\n')
        f.write('fig bar,3,2.00\n')

    # Create Machines
    with open(MACHINES, 'w') as f:
        f.write('Rice Basement 1\n')
        f.write('Rice Basement 2\n')

        for floor_no in range(1, 4):
            f.write('Rice %s Floor\n' %floor_no)
            f.write('Olsson %s Floor\n' %floor_no)
            f.write('Newcomb %s Floor\n' %floor_no)
            f.write('Thornton %s Floor\n' %floor_no)

        f.write('Olsson Basement 1\n')
        f.write('Olsson Basement 2\n')
        f.write('Newcomb Basement\n')
        f.write('Thornton Basement\n')

        for no in range(1, 1000):
            f.write('Generic Beige Vending Machine %s\n' %no)

    # Create Machine Stocks
    with open(MACHINE_STOCKS, 'w') as f:
        for machine_id in range(1, NUM_VENDING_MACHINES+1):
            for item_id in range(1, 15):
                for number_items in range(random.randint(5, 10)):
                    f.write('%s,%s\n' %(machine_id, item_id))

    # Create Payment Types
    with open(PAYMENT_TYPES, 'w') as f:
        f.write('cash\n')
        f.write('credit\n')
        f.write('nfc\n')

    # Create Purchases
    with open(PURCHASES, 'w') as f:
        for item_id in tqdm(range(1, 15)):
            num = random.randrange(65, 75)
            mean = random.randrange(0, 24)
            sd = random.randrange(2, 4)
            for machine_id in range(1, NUM_VENDING_MACHINES+1):
                timestamps = random_time_gen(num, mean, sd, low= 0, upp=24)
                for timestamp in timestamps:
                    payment_type = random.randint(1,3)
                    f.write('%s,%s,%s,%s\n' %(item_id, machine_id, timestamp, payment_type))

if __name__ == '__main__':
    main()
