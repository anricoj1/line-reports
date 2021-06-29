class Order:
    def __init__(self, order, orderlines, attributes):
        self.order = order
        self.orderlines = orderlines
        self.attributes = attributes

    

    def getOrderDetails(self):
        return {
            "User": self.order,
            "Attributes": self.getAttributes(self.attributes)
        }


    def getOrder(self):
        return {
            "Order": self.getOrderDetails(),
            "Notes": [x['Note'] for x in self.orderlines],
            "Products": self.getProducts(),
            "Includes": [self.getIncludedItems(x['Product']['UPC']) for x in self.orderlines]
        }



    def getProducts(self):
        return [self.getSize(product['OverallStatus'], product['Product']['Name'], product['Product']['UPC'], product['Price'], product['Options'], product['Count']) for product in self.orderlines]


        
    def getSize(self, productStatus, productName, upc, price, options, count):
        if productStatus == "None":
            if int(count) == 1:
                if len(options) > 0:
                    if "Size" in options[0]['Name']:
                        return [productName[0:len(productName) - 2] + options[0]['Value'], [x['Value'] for x in options[1:]]]
                    elif "Temperature:" in options[0]['Name']:
                        return [productName[0:len(productName) - 2] + options[0]['Value'], [x['Value'] for x in options[1:]]]
                    else:
                        return [productName[0:len(productName) - 2], [x['Value'] for x in options]]
                else:
                    return productName[0:len(productName) - 2]
            else:
                if len(options) > 0:
                    if "Size" in options[0]['Name']:
                        return [productName[0:len(productName) - 2] + options[0]['Value'], [x['Value'] for x in options[1:]]] * int(count)
                    elif "Temperature:" in options[0]['Name']:
                        return [productName[0:len(productName) - 2] + options[0]['Value'], [x['Value'] for x in options[1:]]] * int(count)
                    else:
                        return [productName[0:len(productName) - 2], [x['Value'] for x in options]] * int(count)
                else:
                    return [productName[0:len(productName) - 2]] * int(count)
        else:
            return


    def getAttributes(self, attributes):
        if attributes != None:
            return [attribute['Value'] for attribute in attributes]
        else:
            return []

    def getIncludedItems(self, upc):
        if upc == '07196227537':
            included = ["1 pint of Stew's Red Wine Steak Sauce", "16 Potato Pancakes"]
            return [x for x in included]
        elif upc == '07196227899':
            included = ["1 Extra Large Shrimp Platter", "12 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196227536':
            included = ["12 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196221367':
            included = ["1 Quart of our own Homestyle Turkey Gravy", "1 Pint of our own chef-prepared Cranberry Orange Sauce", "1 Side of Country Style Stuffing", "12 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196229667':
            included = ["1 Extra Large Shrimp Platter", "6 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196229365':
            included = ["Horseradish Sauce and Bordelaise Sauce", "6 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196229612':
            included = ["Country Style Stuffing", "Turkey Gravy", "Cranberry Orange Sauce"]
            return [x for x in included]
        elif upc == '07196229335':
            included = ["16 oz. container of Pineapple Ham Glaze", "6 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196229367':
            included = ["6 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196229681':
            included = ["6 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196229336':
            included = ["16oz. of Au Jus", "8oz. Mint Jelly", "6 Snowball Rolls"]
            return [x for x in included]
        elif upc == '07196229369':
            included = ["1/2 lb. of Smoked Salmon", "Family Size Quiche Lorraine", "6 Assorted Bagels", "8 oz. Vegetable Cream Cheese", "4 Assorted Muffins", "2 lb. Fresh Fruit Bowl", "8 Dark Chocolate Dipped Strawberries"]
            return [x for x in included]
        else:
            return False
