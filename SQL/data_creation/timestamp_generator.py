from random import randrange
import datetime 


def random_date(start,l):
    current = start
    while l >= 0:
        curr = current + datetime.timedelta(minutes=randrange(60))
        yield curr
        l-=1


