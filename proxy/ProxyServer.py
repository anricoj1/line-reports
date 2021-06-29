from flask import jsonify
import json
import requests
import os
from .src.OrderFetch import OrderFetch



class ProxyServer:
    def __init__(self):
        self.arr = []
        self.SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
        self.json_url = os.path.join(self.SITE_ROOT + '\\src\\', 'orders.json')

    
    def fetchOrders(self):
        with open(self.json_url, 'r') as fileName:
            orders = json.load(fileName)

        return jsonify(orders)


    def fetchOne(self, id):
        try:
            request = requests.get(f'https://storeapi.grocerkey.com/order/{id}', headers={
                'Content-type': 'application/json',
                'storeCode': '67879',
                'auth_token': 'A/p4eEWnm3e+G7dnuwFFigTeX4iurSR04JRCHPc2Wl4Qn8rNvKIPJ2zmBCLnMOnbTiVfr6S4D6MBgX9DXzKDh0gUf53HEt3H9M95zzUrNVdgQM6r0BFFP7r8yzh4oziefaVqmj/1wZA81tSmXC5BIABJrWjXGtfXv0wvzR3oi87gRTj+9Jm3g0bzn0RanksLYMnIZT/uU97kJBtWW8IPng=='
            })

            order = request.json()

            return OrderFetch(order, order['OrderLines']).getOrder()

        except json.decoder.JSONDecodeError:
            return jsonify({
                'error': 'No response was returned...This OrderID is most likely invalid'
            })        