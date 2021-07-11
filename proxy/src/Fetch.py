from io import TextIOWrapper
import requests
import json
from Order import Order

# All errors from requests inherit from RequestExeception throw this error and retry

class Fetch:
    def __init__(self):
        self.arr = list()

    # get TotalCount key from orderview
    def getLength(self) -> str:
        data = requests.get('https://storeapi.grocerkey.com/orderview', headers={
            'Content-type': 'application/json',
            'storeCode': '67879',
            'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
        }, timeout=20)

        result = data.json()

        return str(result['TotalCount'])

    # get Result list from orderview, returns list
    def orderview(self) -> list:
        # try to send request, timeout after 20s throw error and retry
        try:
            data = requests.get('https://storeapi.grocerkey.com/orderview?pagesize=3500', headers={
                'Content-type': 'application/json',
                'storeCode': '67879',
                'auth_token': 'OOO9ohGBpcRN1YYVMljNYK0sGK/Dvb/mF63EGWzndkNQAjoosr8A99wM2UUSIe6/D2dERzeeAFpJ8ELnoT8xSCsoC33L3I35BYEEzhO1x0ouOfc2sJiHDVIWUUN1lEwTNhQ5uEJJXmJDV7s9X/uhaIOaBakcu4oHAcGERK487eVkDdKILZ0l6eN2ChxQDte/'
            }, timeout=20)

            result = data.json()
            
            return result['Result']

        except requests.RequestException:
            print('request failed, trying again...')
            return self.orderview()
    
     # orderlines for each order, returns list
    def orderlines(self) -> list:
        results = self.orderview()

        # iterate overview list
        for result in results:
            # get order, handles try execept
            order = self.order(result['OrderID'])

            # not canceled append to list else print
            if order['Status'] != 'Canceled':
                self.arr.append(Order(result, order, order['OrderLines']).getOrder())
            else:
                print(order['OrderID'], order['Status'])                
                

        return self.arr

    # get order by id, returns dict
    def order(self, uid) -> dict:
        # try to send request to order id, timeout 20s throw error and try again
        try:
            print(f'sending request to {uid}')
            data = requests.get(f'https://storeapi.grocerkey.com/order/{uid}', headers={
                'Content-type': 'application/json',
                'storeCode': '67879',
                'auth_token': 'OOO9ohGBpcRN1YYVMljNYK0sGK/Dvb/mF63EGWzndkNQAjoosr8A99wM2UUSIe6/D2dERzeeAFpJ8ELnoT8xSCsoC33L3I35BYEEzhO1x0ouOfc2sJiHDVIWUUN1lEwTNhQ5uEJJXmJDV7s9X/uhaIOaBakcu4oHAcGERK487eVkDdKILZ0l6eN2ChxQDte/'
            }, timeout=20)
            
            return data.json()

        except requests.RequestException:
            print(f'request to {uid} failed, trying again')
            return self.order(uid)

    # writes json file
    def write(self) -> TextIOWrapper:
        f = open('orders.json', 'w')

        f.write(json.dumps(self.orderlines(), default=str))

        f.close()

        return f

if __name__ == '__main__':
    Fetch().write()