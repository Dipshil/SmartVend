import numpy as np
import pandas as pd
from collections import defaultdict
from filepaths import *
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import normalize


class PurchasePrediction:
    '''Train polyfit model on number of purchases for each item for all previous months. 
       Predict future purchases given month and item id.
    '''
    def __init__(self):
    
        df_purchases = pd.read_csv(open(PURCHASES, 'rb'),
                        names = ["Item ID", "Machine ID", "Timestamp", "Month", "Payment Type"])

        self.item_details = df_purchases[['Item ID', 'Month']]

        self.months = np.unique(df_purchases['Month'].values)

        self.item_purchases_month = defaultdict(list)

        for id in range(1, 15):
            for month in self.months:
                self.item_purchases_month[id].append(len(self.item_details.loc[(self.item_details['Item ID'] == id)
                                                            & (self.item_details['Month'] == month)]['Item ID'].values))

        self.item_poly_model = dict()

        for item in range(1, 15):
            reg = np.polyfit(self.months, self.item_purchases_month[item],4)
            poly = np.poly1d(reg)
            self.item_poly_model[item] = poly

    def get_train_data(self):
        return self.item_details

    def predict_purchases(self, item, month):
        return self.item_poly_model[item](month)

    def evaluate_model(self, start_month, num_test_elements):
        MSE = dict()
        for item in range(1, 15):

            norm_item_purchases_month = normalize(np.asarray(self.item_purchases_month[item]).reshape(1, -1)).ravel()
            train_purchase_data = norm_item_purchases_month[start_month:-num_test_elements]

            test_purchase_ground_truth = norm_item_purchases_month[-num_test_elements:].ravel()

            train_months = self.months[start_month:-num_test_elements] 
            test_months = self.months[-num_test_elements:]
            
            reg = np.polyfit(train_months, train_purchase_data, 4)
            poly = np.poly1d(reg)

            predictions = [poly(month) for month in test_months]

            MSE[item] = mean_squared_error(test_purchase_ground_truth, predictions)

        with open(MSE_SCORES, 'w') as handle:
            for item in range(1,15):
                handle.write("Item ID: %s, MSE: %s \n" %(item, str(MSE[item])))


