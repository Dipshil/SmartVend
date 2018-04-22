'''import random
import time

def strTimeProp(start, end, format, prop):
    """Get a time at a proportion of a range of two formatted times.

    start and end should be strings specifying times formated in the
    given format (strftime-style), giving an interval [start, end].
    prop specifies how a proportion of the interval to be taken after
    start.  The returned time will be in the specified format.
    """

    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(format, time.localtime(ptime))


def randomDate(start, end, prop):
    return strTimeProp(start, end, '%Y/%m/%d %H:%M', prop)

#print(randomDate("2018/04/20 04:20", "2018/04/21 04:20", random.random()))
'''

'''import time
import numpy

_EMPIRICAL_SCALE_RATIO = 0.15

def randomDate(date_range, num_purchases, var_mean_factor):

    _DATE_FORMAT = '%Y/%m/%d %H:%M'

    time_range = tuple(time.mktime(time.strptime(d, _DATE_FORMAT))
                       for d in date_range)
                           
    distribution = numpy.random.normal(
        loc=(time_range[0] + time_range[1]) * var_mean_factor,
        scale=(time_range[1] - time_range[0]) * _EMPIRICAL_SCALE_RATIO,
        size=num_purchases
    )

    date_range = tuple(time.strftime(_DATE_FORMAT, time.localtime(t))
                       for t in numpy.sort(distribution))
    return date_range'''

from scipy.stats import truncnorm


def random_time_gen(num, mean, sd, low, upp):
    gen = truncnorm(
        (low - mean) / sd, (upp - mean) / sd, loc=mean, scale=sd)

    return gen.rvs(num)
