import express from 'express';
import CartItem from './model/CartItem'
const routes = express.Router();

const cartItems:CartItem[] = [
    {id: 1, product: "Mike & Ikes", price: 3, quantity: 10},
    {id: 2, product: "Jolly Ranchers", price: 4, quantity: 15},
    {id: 3, product: "Twizzlers", price: 2, quantity: 10},
    {id: 4, product: "Zours", price: 5, quantity: 50},
];
let nextId:number = 5;

routes.get("/cartItems", (req, res) => {
    let maxPrice:number = Number(req.query.maxPrice as string);
    let prefix:string = req.query.prefix as string;
    let pageSize:number = Number(req.query.pageSize as string);
    
    let results = cartItems;
    if (maxPrice){
        results = results.filter(cartItem => cartItem.price <= maxPrice);
    }
    if (prefix){
        results = results.filter(cartItem => cartItem.product.startsWith(prefix));
    }
    if (pageSize){
        results = results.filter(cartItem => cartItem.id <= pageSize);
    }
    res.status(200);
    res.json(results);
});

routes.get("/cartItems/:id", (req, res) => {
    const id:number = Number(req.params.id);
    const cartItem:CartItem|undefined = cartItems.find(cartItem => cartItem.id === id);
    if (cartItem){
        res.json(cartItem);
        res.status(200);
    } else {
        res.status(404);
        res.send("ID Not Found")
    }
});

routes.post("/cartItems", (req, res) => {
    let cartItem:CartItem = req.body;
    cartItem.id = nextId;
    nextId++;
    cartItems.push(cartItem);
    res.status(201);
    res.json(cartItem);
});

routes.put("/cartItems/:id", (req, res) => {
    const id:number = Number(req.params.id);
    let cartItem:CartItem = req.body;
    const itemIndex:number = cartItems.findIndex(cartItem => cartItem.id === id);
    if (itemIndex !== -1){
        cartItems[itemIndex] = cartItem;
        res.json(cartItem);
        res.status(200);
    }
});

routes.delete("/cartItems/:id", (req, res) => {
    const id:number = Number(req.params.id);
    const itemIndex:number = cartItems.findIndex(cartItem => cartItem.id === id);
    if (itemIndex !== -1){
        cartItems.splice(itemIndex, 1);
    }
    res.status(204);
    res.send();
});

export default routes;