class LineItem {
    constructor(qty, item) {
        this.qty = qty;
        this.item = item;
        this.dept = this.getDept(item)
    }

    getDept = (item) => {
        if (item.includes('Pie')) return 'Bakery';
        if (item.includes('Rolls')) return 'Bakery';
        if (item.includes('Cheesecake')) return 'Bakery';
        if (item.includes('Cannoli')) return 'Bakery';
        if (item.includes('Mini Cannoli Platter')) return 'Bakery';
        if (item.includes('Brownie')) return 'Bakery';
        if (item.includes('Cookie')) return 'Bakery';
        if (item.includes('Baguette')) return 'Bakery';
        if (item.includes('Peach Blueberry Rustic Tart')) return 'Bakery';
        if (item.includes('Country Hearth Bread')) return 'Bakery';
        if (item.includes('American PU PU')) return 'BBQ';
        if (item.includes('Caprese Skewers')) return 'BBQ';
        if (item.includes('Fresh Mozzarella')) return 'Deli';
        if (item.includes('3 Foot Grinder')) return 'Deli';
        if (item.includes('Wrap Platter')) return 'Deli';
        if (item.includes('Antipasto Platter')) return 'Deli';
        if (item.includes('Cheese and Pepperoni Platter')) return 'Deli';
        if (item.includes('Sandwich Platter')) return 'Deli';
        if (item.includes('Stuffed Mushroom Platter')) return 'Kitchen';
        if (item.includes('Butternut Apple Soup')) return 'Kitchen';
        if (item.includes('Pepperoni Stuffed Loaf')) return 'Kitchen';
        if (item.includes('sauce')) return 'Kitchen';
        if (item.includes('Brussel Sprouts with Bacon')) return 'Kitchen';
        if (item.includes('Broccoli Rabe')) return 'Kitchen';
        if (item.includes('Boneless')) return 'Kitchen';
        if (item.includes('Beef')) return 'Kitchen';
        if (item.includes('Filet Mignon')) return 'Kitchen';
        if (item.includes('Penne')) return 'Kitchen';
        if (item.includes('Brussels')) return 'Kitchen';
        if (item.includes('Sweet Potato Mousse')) return 'Kitchen';
        if (item.includes('Potatoes')) return 'Kitchen';
        if (item.includes('Potato')) return 'Kitchen';
        if (item.includes('Ham Glaze')) return 'Kitchen'
        if (item.includes('Dinner')) return 'Kitchen';
        if (item.includes('Lamb')) return 'Kitchen';
        if (item.includes('Oven')) return 'Kitchen';
        if (item.includes('Ham')) return 'Kitchen';
        if (item.includes('Vegetable Minestrone Soup')) return 'Kitchen';
        if (item.includes('Grilled Salmon')) return 'Kitchen';
        if (item.includes('Lobster Bisque')) return 'Kitchen';
        if (item.includes('Butternut Squash')) return 'Kitchen';
        if (item.includes('Roasted Sliced Turkey Breast')) return 'Kitchen';
        if (item.includes('Stuffing')) return 'Kitchen';
        if ((item.includes('Rugalach')) || item.includes('Rugelach')) return 'Kitchen';
        if (item.includes('Roasted Asparagus')) return 'Kitchen';
        if ((item.includes('Sauce')) || item.includes('Gravy')) return 'Kitchen';
        if (item.includes('Macaroni')) return 'Kitchen';
        if (item.includes('Green Bean')) return 'Kitchen';
        if (item.includes('Organic Roasted Tri-Colored Carrots')) return 'Kitchen';
        if (item.includes('Organic Tri Colored Baby Carrots')) return 'Kitchen';
        if (item.includes('New England Clam Chowder')) return 'Kitchen';
        if (item.includes('Pistachio Crusted Salmon')) return  'Kitchen';
        if (item.includes('Cheese Lasagna')) return 'Kitchen';
        if (item.includes('Chicken')) return 'Kitchen';
        if (item.includes('Meatball')) return 'Kitchen';
        if (item.includes('Salad')) return 'Salbar'
        if (item.includes('Fruit')) return 'Produce';
        if (item.includes('Shrimp')) return 'Seafood';
        if (item.includes('Lobster')) return 'Seafood';
    }
}

export default LineItem;