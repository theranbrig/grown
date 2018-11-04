require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const cookieParser = require('cookie-parser');
const db = require('./db');
const jwt = require('jsonwebtoken');

const server = createServer();

server.express.use(cookieParser());

// Express middleware to handle cookies (JWT)

server.express.use((req, res, next) => {
	const { token } = req.cookies;
	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET);
		req.userId = userId;
	}
	next();
});

// Express middleware to populate current user

server.express.use(async (req, res, next) => {
	if (!req.userId) return next();
	const user = await db.query.user({ where: { id: req.userId } }, '{id, permissions, email, name}');
	req.user = user;
	next();
});

server.start(
	//For Production Right Now.  Needs to be fixed later.
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL
		}
	},
	deets => {
		console.log(`Server is now running on port http://localhost:${deets.port}`);
	}
);

// Access to fetch at 'https://grown-yoga-prod.herokuapp.com/' from origin 'https://grown-next.herokuapp.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'https://grown-next.herokuapp.com/' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
