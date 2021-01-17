// const authMethod = require('./methods');
const Admin = require('../models/Admin')

const dotenv = require('dotenv');

dotenv.config();

// exports.checkAuth = async (req, res, next) => {

// 	// get access token from header
// 	const accessTokenFromHeader = req.headers.authorization;

// 	if (!accessTokenFromHeader) {
// 		return res.status(401).json({message: 'Not found access token!'});
// 	}

// 	const accessTokenSecret = process.env.ACCESSTOKENSECRET;

// 	const verified = await authMethod.verifyToken(
// 		accessTokenFromHeader.replace('Bearer ', ''),
// 		accessTokenSecret,
// 	);

// 	if (! await verified) {
// 		return res
// 			.status(401)
// 			.json({message: 'You are not authorized to access this page!'});
// 	}
// 	// return verified;
// 	res.token = await verified.payload
// 	next()
// };

// exports.isAuth = (req, res) => {

// 	NoteAPI.read_a_user(res.token.id, res, function(err, result) {
// 		if ( res.token.username === result[0].username) {
// 			return res.json(res.token)
// 		}else {
// 			return res
// 			.status(401)
// 			.json({message: 'You are not authorized to access this page!'});			
// 		}
// 	})
// };

// exports.login = async (req, res) => {
// 	// console.log(req);
//     const accessToken = await authMethod.generateToken(
// 		req,
//         process.env.ACCESSTOKENSECRET,
//     );
//     if (!accessToken) {
//         return res
//             .status(401)
// 			.json({message: 'Login failed, please try again.'});
// 	}
// 	res.json({"token": await accessToken})
// };

exports.isAuthAdmin = async (req, res, next) => {

	console.log(req.headers.uid)
	const checkAdmin = await Admin.findOne({uid: `${req.headers.uid}`})
	try {
		if(checkAdmin !== null){
			next()
		}else{
			res.json("Not Found")
		}
	} catch (e) {
		console.log("not JSON");
		res.json("Not Found")
	}
};