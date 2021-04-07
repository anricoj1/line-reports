import json
import requests
import os
from flask import Flask, jsonify
from dotenv import load_dotenv
import pandas as pd
load_dotenv()

proxy = Flask(__name__)


@proxy.route('/proxy/orders', methods=['GET'])
def orders():
    with open('order.json') as response:
        thisdata = json.load(response)
        
    return jsonify(thisdata)



if __name__ == '__main__':
    proxy.run(host='0.0.0.0', debug=True)