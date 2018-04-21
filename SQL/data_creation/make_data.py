from os.path import isfile
from filepaths import *
from timestamp_generator import random_date
import random

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
        f.write('Olsson Basement 1\n')
        f.write('Olsson Basement 2\n')
        f.write('Newcomb Basement\n')
        f.write('Newcomb 1st Floor\n')
        f.write('Thornton Basement\n')
        f.write('Thornton 1st Floor\n')

    # Create Machine Stocks
    with open(MACHINE_STOCKS, 'w') as f:
        for machine_id in range(1, 9):
            for item_id in range(1, 15):
                for number_items in range(random.randint(10, 100)):
                    f.write('%s,%s\n' %(machine_id, item_id))

    # Create Payment Types
    with open(PAYMENT_TYPES, 'w') as f:
        f.write('cash\n')
        f.write('credit\n')
        f.write('nfc\n')

    # Create Purchases
   # startDate = datetime.datetime(2018, 4, 20, ,00)



if __name__ == '__main__':
    main()
