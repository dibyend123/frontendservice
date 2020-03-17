// Include the cluster module 
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster){
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    console.log('cpuCount '+cpuCount);
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // Listen for terminating workers
    cluster.on('exit', function (worker) {
        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });
}else{
	
	const express = require('express');
	const bodyParser = require('body-parser');
	const dotenv = require('dotenv');
	const session = require('express-session');
	const redis = require('redis');
	const redisStore = require('connect-redis')(session);
	const cookieParser = require('cookie-parser');

	global.fetch = require('node-fetch');
	dotenv.config();
	global.navigator = () => null;

	const app = express();
	
	
	//const redisClient = redis.createClient({host: process.env.REDIS_HOST});
	/*redisClient.on('connect', () => {
		console.log('connected to redis');
	});
	
	redisClient.on('error', err => {
		console.log(`Error: ${err}`);
	});*/
	
	app.use(cookieParser());
	/*app.use(session({
			secret: process.env.SECRET,
			resave: true,
			rolling: true,
			saveUninitialized: false,
			cookie: {secure: false, maxAge: 20 * 60 * 1000},
			store: new redisStore({
				host: process.env.REDIS_HOST,
				port: process.env.REDIS_PORT,
				client: redisClient,
				ttl: 20 * 60
			}),
		}));*/
		
	const browserCacheControl = require('./services/browserCacheControl/browserCacheControl');
	
	app.use(browserCacheControl);
	
	app.set('views', __dirname + '/views');
	
	app.set('view engine', 'ejs');

	app.use(bodyParser.urlencoded({extended: false}));
	
	app.use('/static', express.static(__dirname + '/static'));
	
	//app.use('/', require('./routes/routes')(redisClient));
	app.use('/', require('./routes/routes')());
	
	const PORT = process.env.PORT || 8080;
	

	app.listen(PORT, () => 
		console.log(`Server started on port ${PORT}`)
	);
	
	
	
}