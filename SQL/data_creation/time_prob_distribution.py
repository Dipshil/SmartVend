import matplotlib as mpl
mpl.use('TkAgg')
import matplotlib.pyplot as plt
import scipy.stats as stats
import numpy as np
import pandas as pd
from filepaths import PURCHASES

class TimeProbDist: 
    '''Generate probability distribution function from histogram of total sales over time period bins for each item
    '''

    def __init__(self):

        df_purchases = pd.read_csv(open(PURCHASES, 'rb'),
                        names = ["Item ID", "Machine ID", "Timestamp", "Month", "Payment Type"])

        item_details = df_purchases[['Item ID', 'Timestamp']]         
        
        self.item_times = {
            id : item_details.loc[item_details['Item ID'] == id]['Timestamp'].values
            for id in range(1, 15)
                     }   

    def get_dist(self, item):
        
        bins = np.arange(0,24.5,0.5)

        _, x, _ = plt.hist(self.item_times[item], bins)
        density = stats.gaussian_kde(self.item_times[item])

        y_val = density(x)
        x_val = x

        return x_val, y_val