import { Router } from 'express';

const router = Router();

import { login, register } from '../controllers/userControllers.js';

router.route('/').get((req, res) => {
  res.send(
    '<section><h1>Job Board API</h1><p>Welcome to the Job Board API</p><a href="/api/v1/users/login">Login</a><a href="/api/v1/users/register">Register</a></section>'
  );
});

router.route('/login').post(login);
router.route('/register').post(register);

export default router;
