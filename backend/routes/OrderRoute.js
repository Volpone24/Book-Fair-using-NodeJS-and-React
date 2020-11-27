import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";
import { isAuth } from "../utils";

const router = express.Router();

router.post('/',isAuth, expressAsyncHandler(async(req,res)=>{
    if(req.body.orderItems.length === 0){
        res.status(400).send({ message: 'Cart is empty' });
    }
    else{
        const order = new Order({
            orderItems:req.body.orderItems,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsCost: req.body.itemsCost,
            shippingCost: req.body.shippingCost,
            tax: req.body.tax,
            total: req.body.total,
            user: req.user._id
        });
        const createdOrder = await order.save();
        // status of new item
        res.send(201).send({ message: 'New Order', order:createdOrder});
    }
    
}));

router.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );


export default router;