def getSize(product, options):
    if len(options) > 0:
        if "Size" in options[0]['Name']:
            return [product[0:len(product) - 2] + options[0]['Value'], [x['Value'] for x in options[1:]]]
        else:
            return [product[0:len(product) - 2], [x['Value'] for x in options]]
    else:
        return product[0:len(product) - 2]




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
    else:
        return False

