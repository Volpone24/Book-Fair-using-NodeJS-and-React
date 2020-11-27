import express from "express";
import Faq from '../models/FaqModel';

const router = express.Router();

router.get("/", async (req, res)=>{
    // getting access to book
    const faqs = await Faq.find({});
    res.send(faqs);
});


export default router;