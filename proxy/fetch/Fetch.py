import requests
import json
from Order import Order


class Fetch:
    def __init__(self):
        self.arr = []

    def getLength(self):
        data = requests.get('https://storeapi.grocerkey.com/orderview?pagesize=2500', headers={
            'Content-type': 'application/json',
            'storeCode': '67879',
            'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
        })

        result = data.json()

        return result['TotalCount']


    def fetchOrderview(self): # fetch orderview endpoint returns result array
        data = requests.get(f'https://storeapi.grocerkey.com/orderview?pagesize={self.getLength()}', headers={
            'Content-type': 'application/json',
            'storeCode': '67879',
            'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
        })

        result = data.json()

        return result['Result']


    def fetchOrderlines(self): # orderlines of each order, returns self.arr
        results = self.fetchOrderview()
        
        for result in results:
            this_request = requests.get('https://storeapi.grocerkey.com/order/{}'.format(result['OrderID']), headers={
                'Content-type': 'application/json',
                'storeCode': '67879',
                'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
            })

            fullorder = this_request.json()

            if fullorder['Status'] != 'Canceled': #if not canceled, append to array
                print(fullorder['OrderID'], fullorder['Status'])
                self.arr.append(Order(result, fullorder['OrderLines'], fullorder['OrderAttributes']).getOrder())

            else:
                print(fullorder['OrderID'], fullorder['Status'])

        return self.arr


    def writeJSON(self): #writes JSON file of order
        f = open('orders.json', 'w')

        f.write(json.dumps(self.fetchOrderlines(), default=str))

        f.close()

        return

    
    def fetchOne(self, id): # fetch a particular order by id
        f = open('order{}.json'.format(id), 'w')
        
        request = requests.get('https://storeapi.grocerkey.com/order/{}'.format(id), headers={
            'Content-type': 'application/json',
            'storeCode': '67879',
            'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
        })
        
        fullorder = request.json()
        
        f.write(json.dumps(fullorder, default=str))
        
        f.close()

        return




if __name__ == '__main__':
    Fetch().writeJSON()