const authMethod = require('./methods');

const dotenv = require('dotenv');

dotenv.config();

const NoteAPI = require('../controllers/appController');
const { Note } = require('../models/appModel');

exports.checkAuth = async (req, res, next) => {

	// get access token from header
	const accessTokenFromHeader = req.headers.authorization;

	if (!accessTokenFromHeader) {
		return res.status(401).json({message: 'Not found access token!'});
	}

	const accessTokenSecret = process.env.ACCESSTOKENSECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader.replace('Bearer ', ''),
		accessTokenSecret,
	);

	if (! await verified) {
		return res
			.status(401)
			.json({message: 'You are not authorized to access this page!'});
	}
	// return verified;
	res.token = await verified.payload
	next()
};

exports.isAuth = (req, res) => {

	NoteAPI.read_a_user(res.token.id, res, function(err, result) {
		if ( res.token.username === result[0].username) {
			return res.json(res.token)
		}else {
			return res
			.status(401)
			.json({message: 'You are not authorized to access this page!'});			
		}
	})
};

exports.login = async (req, res) => {
	// console.log(req);
    const accessToken = await authMethod.generateToken(
		req,
        process.env.ACCESSTOKENSECRET,
    );
    if (!accessToken) {
        return res
            .status(401)
			.json({message: 'Login failed, please try again.'});
	}
	res.json({"token": await accessToken})
};

exports.isAuthBoards = (req, res, next) => {

	console.log(res.token)

	NoteAPI.list_all_board(res.token.id, res, function(err, result) {
		const Re = [];
		result.map(r => Re.push(r))
		try {
			const arrayToString = JSON.stringify(Object.assign({}, Re));
			const stringToJsonObject = JSON.parse(arrayToString);
			return res.json(stringToJsonObject)
		} catch (error) {
			return res.json({Error: error})
		}
	})	
};

exports.isAuthUser = (req, res, next) => {
	NoteAPI.update_a_user(res.token, req.body.password, function(err, result) {
		return res.json({})
	})	
};

exports.isAuthUserDelete = (req, res, next) => {

	NoteAPI.delete_a_user(res.token, res, function(err, result) {
		res.json({});
	})	
};

exports.isAuthCheckBoard = (req, res, next) => {
	NoteAPI.check_board(req, res, function(err, result) {
        if (result == null) {
			res.json({message: err})			
		}
		else
			next()
	})	
};