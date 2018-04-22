import numpy as np
import pandas as pd
from collections import defaultdict
from filepaths import PURCHASES

class PurchasePrediction:
    '''Train polyfit model on number of purchases for each item for all previous months. 
       Predict future purchases given month and item id.
    '''
    def __init__(self):
    
        df_purchases = pd.read_csv(open(PURCHASES, 'rb'),
                        names = ["Item ID", "Machine ID", "Timestamp", "Month", "Payment Type"])

        self.item_details = df_purchases[['Item ID', 'Month']]

        months = np.unique(df_purchases['Month'].values)

        item_purchases_month = defaultdict(list)

        for id in range(1, 15):
            for month in months:
                item_purchases_month[id].append(len(self.item_details.loc[(self.item_details['Item ID'] == id)
                                                            & (self.item_details['Month'] == month)]['Item ID'].values))

        self.item_poly_model = dict()

        for item in range(1, 15):
            reg = np.polyfit(months,item_purchases_month[item],4)
            poly = np.poly1d(reg)
            self.item_poly_model[item] = poly

    def get_train_data(self):
        return self.item_details

    def predict_purchases(self, item, month):
        return self.item_poly_model[item](month)






            