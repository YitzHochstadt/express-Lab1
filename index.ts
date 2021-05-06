import express from 'express';
import cartItemRoutes from './cart-item-routes';
const app = express();
const port = 3000;
app.use(express.json());
app.use("/", cartItemRoutes);




app.listen(port, () => console.log(`Listening on port: ${port}.`));