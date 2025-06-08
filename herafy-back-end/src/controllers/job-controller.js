import Job from '../models/job.js';
import Mongoose from 'mongoose';

export const createJob = async (req, res) => {
  try {
    const { title, description, location, duration, budget, category } =
      req.body;

    const clientId = req.clientId;
    const newJob = new Job({
      title,
      description,
      location,
      duration,
      budget,
      category,
      clientId,
    });

    await newJob.save();

    res.status(200).json({ message: 'Job listing created successfully' });
  } catch (error) {
    if (error instanceof Mongoose.Error.ValidationError) {
      for (const e in error.errors) {
        console.log(error.errors[e].message);
      }
    } else {
      console.log(error.message);
    }
    res.status(500).send({ message: 'Server error' });
  }
};

export const getAllJobsByClientId = async (req, res) => {
  const clientId = req.clientId;

  try {
    const jobs = await Job.find({ clientId: clientId });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error retrieving job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error('Error retrieving job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error('Error retrieving job listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
