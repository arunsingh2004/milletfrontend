import milletbread from '../../assets/images/milletbread.jpg';

export const orderHistory = [
    {
        
        "products": [{"productId": "190190290","productName": "Cookies","productImage": milletbread, "quantity": 17, "price": 20},{
            "productId": "PR09812", "productName": "millet", "productImage": "ueiuhjhch", "quantity": 10, "price": 5
        }],
        "orderId": "order09987887",    
        "events": [
            {
                "at": "1719149784.684221", //epoch format
                "name": "Placed"
            },{
                "at": "1819749784.684221",
                "name": "Delivery Partner Assigned"
            },{
                "at": "1919149784.684221",
                "name": "Order Delivered"
            }
        ],
        "details": {
            "deliveredDate": "2009029929",
        "Address":
        {"locality": "hjkshjshjshdhgggggggggggghjjkkkkooiiuiuytwwadcvbnmnmnjjkjlioippipiyrrrdccbmnmnmjijiioiuiiuyyrrreewwsdfggnhhhjhkjkjkjk",
        "landmark": "near abc house",
        "city": "Patna",
        "state": "Bihar",
        "pincode": "789887"
        },
        "amount": 200,
        "status": "delivered",
        "rating": "5",
        "totalPrice": 600,
        "discount": 200,
        "shipping": 40,
        "totalPay": 440,
        }
    },
    {
        "orderId": "order09987787",
        "events": [
            {
                "at": "1719149784.684221", //epoch format
                "name": "Placed"
            },{
                "at": "1819749784.684221",
                "name": "Delivery Partner Assigned"
            },{
                "at": "1919149784.684221",
                "name": "Order Delivered"
            }
        ],
        "products":[{
        "productId": "190190298",
        "productName": "Cookies",
        "productImage": "milletBakes",
        "quantity": 19,
        "price": 9828,
        }],
        "details":{
        "Address":"hjkshjshjsh",
        "amount": 2000,
        "status": "delivered",
        "rating": "5",
        }
    },
    {
        "orderId": "order09937887",
        "products":[{
        "productId": "1501928298",
        "productName": "Millet bake",
        "productImage": "milletBake",
        "quantity": 19,
        "review": 
        {
            "customerId": "CI7889899", 
            "verified": true, 
            "images": [], 
            "video": [], 
            "text": "good product purchased twice", 
            "title": "good",
            "rating": 2.5
        },
        "price": 9828,}],
        "details":{
        "amount": 1000,
        "Address":"hjkshjshjsh",
        "status": "delivered",
        "rating": "5",
    },
}

];
