from flask import Flask, jsonify
from proxy.ProxyServer import ProxyServer


proxy = Flask(__name__, static_folder="./client/build", static_url_path='/')

@proxy.route('/')
def index():
    return proxy.send_static_file('index.html')


@proxy.route('/api/orders', methods=['GET'])
def orders():
    return ProxyServer().fetchOrders()


@proxy.route('/order/<int:id>')
def order(id):
    return ProxyServer().fetchOne(id)


if __name__ == '__main__':
    proxy.run(host='0.0.0.0', port=80, debug=False)