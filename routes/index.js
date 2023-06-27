// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api - The Express application instance to which routes will be injected.
 */
const injectRoutes = (api) => {
  // Setting up routes and handlers

  /**
   * GET /status
   * Handler: AppController.getStatus
   */
  api.get('/status', AppController.getStatus);

  /**
   * GET /stats
   * Handler: AppController.getStats
   */
  api.get('/stats', AppController.getStats);

  /**
   * GET /connect
   * Middleware: basicAuthenticate
   * Handler: AuthController.getConnect
   */
  api.get('/connect', basicAuthenticate, AuthController.getConnect);

  /**
   * GET /disconnect
   * Middleware: xTokenAuthenticate
   * Handler: AuthController.getDisconnect
   */
  api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

  /**
   * POST /users
   * Handler: UsersController.postNew
   */
  api.post('/users', UsersController.postNew);

  /**
   * GET /users/me
   * Middleware: xTokenAuthenticate
   * Handler: UsersController.getMe
   */
  api.get('/users/me', xTokenAuthenticate, UsersController.getMe);

  /**
   * POST /files
   * Middleware: xTokenAuthenticate
   * Handler: FilesController.postUpload
   */
  api.post('/files', xTokenAuthenticate, FilesController.postUpload);

  /**
   * GET /files/:id
   * Middleware: xTokenAuthenticate
   * Handler: FilesController.getShow
   */
  api.get('/files/:id', xTokenAuthenticate, FilesController.getShow);

  /**
   * GET /files
   * Middleware: xTokenAuthenticate
   * Handler: FilesController.getIndex
   */
  api.get('/files', xTokenAuthenticate, FilesController.getIndex);

  /**
   * PUT /files/:id/publish
   * Middleware: xTokenAuthenticate
   * Handler: FilesController.putPublish
   */
  api.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);

  /**
   * PUT /files/:id/unpublish
   * Middleware: xTokenAuthenticate
   * Handler: FilesController.putUnpublish
   */
  api.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);

  /**
   * GET /files/:id/data
   * Handler: FilesController.getFile
   */
  api.get('/files/:id/data', FilesController.getFile);

  /**
   * Wildcard route for unmatched routes
   * Middleware: errorResponse
   * Handler: APIError(404, `Cannot ${req.method} ${req.url}`)
   */
  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });

  // Attaching error handling middleware
  api.use(errorResponse);
};

export default injectRoutes;