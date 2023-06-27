/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UsersController {
  /**
   * Creates a new user with the provided email and password.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  static async postNew(req, res) {
    // Method implementation
  }

  /**
   * Retrieves the information of the authenticated user.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  static async getMe(req, res) {
    // Method implementation
  }
}