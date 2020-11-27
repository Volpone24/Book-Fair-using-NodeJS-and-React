export default{
    // use first or if it does not exist use default
    MONGODB_URL: process.env.MONGODB_URL||'mongodb://localhost/BookFair',
    JWT_Token: process.env.JWT_Token || 'secret'
}