import { Router } from 'express';

import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from '../controllers/jobsController.js';

const router = Router();

router.route('/').get(getAllJobs).post(createJob);

router.route('/:id').get(getJobById).put(updateJob).delete(deleteJob);

export default router;
