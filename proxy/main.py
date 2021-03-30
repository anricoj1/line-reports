import json
import requests
from flask import Flask, jsonify
from dotenv import load_dotenv
load_dotenv()

proxy = Flask(__name__)

arr = []

def getIncludedItems(upc):
    if upc == '07196227537':
        included = ["1 pint of Stew's Red Wine Steak Sauce", "16 Potato Pancakes"]
        return [x for x in included]
    elif upc == '07196227899':
        included = ["1 Extra Large Shrimp Platter", "12 Snowball Rolls"]
        return [x for x in included]
    elif upc == '07196227536':
        included = ["12 Snowball Rolls"]
        return [x for x in included]
    elif upc == '7196221367':
        included = ["1 Quart of our own Homestyle Turkey Gravy", "1 Pint of our own chef-prepared Cranberry Orange Sauce", "1 Side of Country Style Stuffing", "12 Snowball Rolls"]
        return [x for x in included]
    elif upc == '7196229667':
        included = ["1 Extra Large Shrimp Platter", "6 Snowball Rolls"]
        return [x for x in included]
    elif upc == '7196229365':
        included = ["Horseradish Sauce and Bordelaise Sauce", "6 Snowball Rolls"]
        return [x for x in included]
    elif upc == '7196229612':
        included = ["Country Style Stuffing", "Turkey Gravy", "Cranberry Orange Sauce"]
        return [x for x in included]
    elif upc == '7196229335':
        included = ["16 oz. container of Pineapple Ham Glaze", "6 Snowball Rolls"]
        return [x for x in included]
    elif upc == '7196229367':
        included = ["6 Snowball Rolls"]
        return [x for x in included]
    elif upc == '7196229681':
        included = ["6 Snowball Rolls"]
        return [x for x in included]
    elif upc == '7196229336':
        included = ["16oz. of Au Jus", "8oz. Mint Jelly", "6 Snowball Rolls"]
        return [x for x in included]
    else:
        return False


data = requests.get('https://storeapi.grocerkey.com/orderview?pagesize=600', headers={
    'Content-type': 'application/json',
    'storeCode': '67879',
    'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
})

results = data.json()


for result in results['Result']:
    if result['Status'] != 'Canceled':
        request = requests.get('https://storeapi.grocerkey.com/order/{}'.format(result['OrderID']), headers={
            'Content-type': 'application/json',
            'storeCode': '67879',
            'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
        })

        fullorder = request.json()

        orderData = {
            "Order": result,
            "Main":  fullorder['OrderLines'][0]['Product']['Name'],
            "Options": [x['Value'] for x in fullorder['OrderLines'][0]['Options']],
            "Included": getIncludedItems(fullorder['OrderLines'][0]['Product']['UPC'])
        }


        arr.append(orderData)



@proxy.route('/orders', methods=['GET'])
def orders():
    return jsonify(arr)




if __name__ == '__main__':
    proxy.run(debug=True)