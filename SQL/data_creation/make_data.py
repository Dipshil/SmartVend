from os.path import isfile
from filepaths import *
import random

def main():

    # Create Item Types
    with open(ITEM_TYPES, 'w') as f:
        f.write('1,drink\n')
        f.write('2,chips\n')
        f.write('2,bar\n')

    # Create Items
    with open(ITEMS, 'w') as f:
        # Drinks
        f.write('1,coke,1,1.75\n')
        f.write('2,diet coke,1,1.75\n')
        f.write('3,sprite,1,1.75\n')
        f.write('4,root beer,1,1.75\n')
        f.write('5,v8,1,1.75\n')

        # Chips
        f.write('6,lays original,2,1.00\n')
        f.write('7,lays bbq,2,1.00\n')
        f.write('8,ruffles bacon cheddar,2,1.00\n')
        f.write('9,vegetable straws,2,1.00\n')

        # Bars
        f.write('10,hersheys,3,1.00\n')
        f.write('11,snickers,3,1.00\n')
        f.write('12,cliff bar,3,2.00\n')
        f.write('13,fiber one,3,2.00\n')
        f.write('14,fig bar,3,2.00\n')

    # Create Machines
    with open(MACHINES, 'w') as f:
        f.write('1,Rice Basement 1\n')
        f.write('2,Rice Basement 2\n')
        f.write('3,Olsson Basement 1\n')
        f.write('4,Olsson Basement 2\n')
        f.write('5,Newcomb Basement\n')
        f.write('6,Newcomb 1st Floor\n')
        f.write('7,Thornton Basement\n')
        f.write('8,Thornton 1st Floor\n')

    # Create Machine Stocks
    with open(MACHINE_STOCKS, 'w') as f:
        stock_id = 1
        for machine_id in range(1, 9):
            for item_id in range(1, 14):
                for number_items in range(random.randint(10, 100)):
                    f.write('%s,%s,%s\n' %(stock_id, machine_id, item_id))
                    stock_id += 1

    # Create Payment Types
    with open(PAYMENT_TYPES, 'w') as f:
        f.write('1,cash\n')
        f.write('2,credit\n')
        f.write('3,nfc\n')

    # Create Purchases


if __name__ == '__main__':
    main()
