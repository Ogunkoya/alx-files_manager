import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

const server = express();

/**
 * Injects the middleware functions into the Express server.
 * @param {Object} server - The Express server instance.
 */
injectMiddlewares(server);

/**
 * Injects the routes into the Express server.
 * @param {Object} server - The Express server instance.
 */
injectRoutes(server);

/**
 * Starts the Express server.
 * @param {Object} server - The Express server instance.
 */
startServer(server);

export default server;