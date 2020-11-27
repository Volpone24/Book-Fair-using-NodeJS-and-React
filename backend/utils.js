import jwt from 'jsonwebtoken';
import config from './config';

// Used in UserRoute
const TokenGeneration = (user) => {
    // first is payload, second is for encryption, third is time
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    
    },
    config.JWT_Token,
    {
      expiresIn: '48h',
    }
  )
}

// Authentication of User
// next is like middleware for express
const isAuth  = (req, res, next) =>{
  // get token
  const authorization = req.headers.authorization;
  if(authorization){
    // get only token part, remove bearier part
    const token = authorization.slice(7, authorization.length); //Bearer XXXXXX

    jwt.verify(token, config.JWT_Token, (err, decode)=>{
      if(err){
        return res.status(401).send({msg: 'Invalid Token'});
      }
      else{
      req.user = decode;
      // for next step
      next();
      } 
    });
  }
  else{
  return res.status(401).send({msg: 'Token is not supplied'});
  }
}


// Authentication of Admin
const isAdmin = (req, res, next) =>{
  // Comes from line 34
  if(req.user && req.user.isAdmin){
    return next();
  }
  return res.status(401).send({msg: 'Admin Token not Valid'})
}

export { TokenGeneration, isAdmin, isAuth };