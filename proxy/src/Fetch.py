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
        })

        result = data.json()

        return result['TotalCount']

    def orderview(self) -> list: # get Result list from orderview, returns list
        data = requests.get(f'https://storeapi.grocerkey.com/orderview?pagesize={self.getLength()}', headers={
            'Content-type': 'application/json',
            'storeCode': '67879',
            'auth_token': 'OOO9ohGBpcRN1YYVMljNYK0sGK/Dvb/mF63EGWzndkNQAjoosr8A99wM2UUSIe6/D2dERzeeAFpJ8ELnoT8xSCsoC33L3I35BYEEzhO1x0ouOfc2sJiHDVIWUUN1lEwTNhQ5uEJJXmJDV7s9X/uhaIOaBakcu4oHAcGERK487eVkDdKILZ0l6eN2ChxQDte/'
        })
        
        result = data.json()
        
        return result['Result']

    def orderlines(self) -> list: # orderlines for each order, returns list
        results = self.orderview()

        for result in results:
            try:
                this_request = requests.get(f'https://storeapi.grocerkey.com/order/{result["OrderID"]}', headers={
                    'Content-type': 'application/json',
                    'storeCode': '67879',
                    'auth_token': 'OOO9ohGBpcRN1YYVMljNYK0sGK/Dvb/mF63EGWzndkNQAjoosr8A99wM2UUSIe6/D2dERzeeAFpJ8ELnoT8xSCsoC33L3I35BYEEzhO1x0ouOfc2sJiHDVIWUUN1lEwTNhQ5uEJJXmJDV7s9X/uhaIOaBakcu4oHAcGERK487eVkDdKILZ0l6eN2ChxQDte/'
                }, timeout=20)

                order = this_request.json()


                if order['Status'] != 'Canceled':
                    print(order['OrderID'], order['Status'])
                    self.arr.append(Order(result, order, order['OrderLines']).getOrder())
                else:
                    print(order['OrderID'], order['Status'])
            except requests.RequestException:
                self.log.append(result)

        return self.arr

    def order(self, id, ) -> dict: # get order by id, returns dict
        data = requests.get(f'https://storeapi.grocerkey.com/order/{id}', headers={
                'Content-type': 'application/json',
                'storeCode': '67879',
                'auth_token': 'OOO9ohGBpcRN1YYVMljNYK0sGK/Dvb/mF63EGWzndkNQAjoosr8A99wM2UUSIe6/D2dERzeeAFpJ8ELnoT8xSCsoC33L3I35BYEEzhO1x0ouOfc2sJiHDVIWUUN1lEwTNhQ5uEJJXmJDV7s9X/uhaIOaBakcu4oHAcGERK487eVkDdKILZ0l6eN2ChxQDte/'
            })

        order = data.json()

        return Order(order, order['OrderLines']).getOrder() # need another order Obj to handle order Requests

    def write(self, fileName, method) -> TextIOWrapper: # write json files
        f = open(fileName, 'w')

        f.write(json.dumps(method, default=str))

        f.close()

        return f


if __name__ == '__main__':
    Fetch().write('orders.json', Fetch().orderlines())
    print(Fetch().log)