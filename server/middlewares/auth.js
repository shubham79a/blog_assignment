import jwt from 'jsonwebtoken'

const authenticate = async (req, res, next) => {

    const { token } = req.headers;
    console.log("hello");


    if (!token) {
        return res.json({ success: false, message: "Not authorized login  again" })
    }
    try {
        console.log('====================================');
        console.log(token);
        console.log('====================================');
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log('====================================');
        console.log(token_decode);
        console.log('====================================');

        req.user = { id: token_decode.id };
        console.log('====================================');
        console.log(token_decode.id);
        console.log('====================================');
    
        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }


}

export default authenticate