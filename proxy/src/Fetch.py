from io import TextIOWrapper
import requests
import json
from Order import Order


class Fetch:
    def __init__(self):
        self.arr = list()
        self.log = list()

    
    def getLength(self) -> int: # get TotalCount key from orderview returns int
        data = requests.get('https://storeapi.grocerkey.com/orderview', headers={
            'Content-type': 'application/json',
            'storeCode': '67879',
            'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
        }, timeout=20)

        result = data.json()

        return str(result['TotalCount'])

    def orderview(self) -> list: # get Result list from orderview, returns list
        try:
            data = requests.get('https://storeapi.grocerkey.com/orderview?pagesize=3500', headers={
                'Content-type': 'application/json',
                'storeCode': '67879',
                'auth_token': 'OOO9ohGBpcRN1YYVMljNYK0sGK/Dvb/mF63EGWzndkNQAjoosr8A99wM2UUSIe6/D2dERzeeAFpJ8ELnoT8xSCsoC33L3I35BYEEzhO1x0ouOfc2sJiHDVIWUUN1lEwTNhQ5uEJJXmJDV7s9X/uhaIOaBakcu4oHAcGERK487eVkDdKILZ0l6eN2ChxQDte/'
            }, timeout=20)
            
            result = data.json()
            
            return result['Result']

        except requests.RequestException:
            print('Request Failed')
            return self.orderview()

    def orderlines(self) -> list: # orderlines for each order, returns list
        results = self.orderview()

        for result in results:
            try:
                print(f'sending request to {result["OrderID"]}')
                order = self.order(result['OrderID'])

                if order['Status'] != 'Canceled':
                    self.arr.append(Order(result, order, order['OrderLines']).getOrder())
                else:
                    print(order['OrderID'], order['Status'])
            except requests.RequestException:
                print(f'{result["OrderID"]} failed')
                self.log.append(result)

        return self.arr

    def order(self, uid) -> dict: # get order by id, returns dict
        try:
            data = requests.get(f'https://storeapi.grocerkey.com/order/{uid}', headers={
                'Content-type': 'application/json',
                'storeCode': '67879',
                'auth_token': 'OOO9ohGBpcRN1YYVMljNYK0sGK/Dvb/mF63EGWzndkNQAjoosr8A99wM2UUSIe6/D2dERzeeAFpJ8ELnoT8xSCsoC33L3I35BYEEzhO1x0ouOfc2sJiHDVIWUUN1lEwTNhQ5uEJJXmJDV7s9X/uhaIOaBakcu4oHAcGERK487eVkDdKILZ0l6eN2ChxQDte/'
            }, timeout=20)
            
            return data.json()

        except requests.RequestException:
            return self.order(uid)

    def write(self) -> TextIOWrapper: # write json files
        f = open('orders.json', 'w')

        f.write(json.dumps(self.orderlines(), default=str))

        f.close()

        return f

if __name__ == '__main__':
    Fetch().write()
    print(Fetch().log)