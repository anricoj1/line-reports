import json
import requests
import os
from flask import Flask, jsonify
from dotenv import load_dotenv
load_dotenv()

proxy = Flask(__name__, static_folder="./build", static_url_path='/')

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
json_url = os.path.join(SITE_ROOT, 'order.json')

@proxy.route('/')
def index():
    return proxy.send_static_file('index.html')


@proxy.route('/proxy/orders', methods=['GET'])
def orders():
    data = requests.get('https://raw.githubusercontent.com/anricoj1/line-reports/master/proxy/order.json')

    thisdata = data.json()

    return jsonify(thisdata)



if __name__ == '__main__':
    proxy.run(host='0.0.0.0', debug=False)