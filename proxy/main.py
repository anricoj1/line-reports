import json
import requests
import os
from flask import Flask, jsonify
from dotenv import load_dotenv
load_dotenv()

proxy = Flask(__name__, static_folder="../build", static_url_path='/')


@proxy.route('/')
def index():
    return proxy.send_static_file('index.html')


@proxy.route('/proxy/orders', methods=['GET'])
def orders():
    with open('./orders.json') as response:
        thisdata = json.load(response)

    return jsonify(thisdata)



if __name__ == '__main__':
    proxy.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 8080))