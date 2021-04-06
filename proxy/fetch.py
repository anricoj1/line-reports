import requests
import json
from functools import cache
from methods import getIncludedItems, getSize





f = open('orders.json', 'w')

main = []



data = requests.get('https://storeapi.grocerkey.com/orderview?pagesize=2000', headers={
    'Content-type': 'application/json',
    'storeCode': '67879',
    'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
})

responses = data.json()



for response in responses['Result']:
    request = requests.get('https://storeapi.grocerkey.com/order/{}'.format(response['OrderID']), headers={
        'Content-type': 'application/json',
        'storeCode': '67879',
        'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
    })
    
    fullorder = request.json()

    if response['Status'] != 'Canceled':
        if len(fullorder['OrderLines']) > 0:
            products = [getSize(x['Product']['Name'], x['Options']) for x in fullorder['OrderLines']]
            included = [getIncludedItems(x['Product']['UPC']) for x in fullorder['OrderLines']]
            
            
            main.extend([{
                "Order": response,
                "Products": products,
                "Includes": included
            }])


f.write(json.dumps(main, default=str))

f.close()