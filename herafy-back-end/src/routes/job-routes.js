import express from 'express';
import {
  createJob,
  getAllJobsByClientId,
  getAllJobs,
  getJobById,
  deleteJob,
} from '../controllers/job-controller.js';
import checkClientRole from '../middlewares/check-client-role-mw.js';

const router = express.Router();

router.post('/', checkClientRole, createJob);

router.get('/client', checkClientRole, getAllJobsByClientId);

router.get('/', getAllJobs);

router.get('/:id', getJobById);

// router.put('/:id', updateJob);

router.delete('/:id', deleteJob);

export default router;
