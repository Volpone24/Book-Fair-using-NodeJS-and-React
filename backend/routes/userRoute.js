import express from "express";
import User from '../models/userModel';
import { isAuth, TokenGeneration } from "../utils";

const router = express.Router();

router.put('/:id', isAuth, async(req, res)=>{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password; 
        const updated = await user.save();
        res.send({
            _id: updated.id,
            name: updated.name,
            email: updated.email,
            isAdmin: updated.isAdmin,
            // token to identify if next request is authenticated or not
            token: TokenGeneration(updated)
        });
    }

    else{
        res.status(404).send({message:'User Not Found'});
    }
})

// Route for Signin


router.post('/signin', async (req, res) => {
    const Acc = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(Acc);
    if (Acc) {
      res.send({
        _id: Acc.id,
        name: Acc.name,
        email: Acc.email,
        isAdmin: Acc.isAdmin,
        token: TokenGeneration(Acc),
        createdAt: Acc.createdAt

      });
    } else {
      res.status(401).send({ message: 'Invalid Email or Password.' });
    }
  });


// Route for Register

router.post('/register', async(req, res)=>{
    // create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const newAcc = await user.save();
    if(newAcc){
        res.send(
            {
                _id: newAcc._id,
                name: newAcc.name,
                email: newAcc.email,
                isAdmin: newAcc.isAdmin,
                // token to identify if next request is authenticated or not
                token: TokenGeneration(newAcc)            
            }
        )
    }else{    
        res.send({message:'Invalid Email or Password'});
    }
    
})







// create admin user
// req - request, res - response
// router.get("/createAdmin", async (req, res) =>{

//     try{
//         const user = new User({
//             name:'Arul',
//             email: 'arul@gmail.c',
//             password: '12345',
//             isAdmin: true
//         });
    
//         const newAcc = await user.save();
//         res.send(user);
//     }catch(error){
//         res.send({msg: error.message});
//     }
    
// })

// Used in server.js
export default router;