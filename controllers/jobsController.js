const getAllJobs = async (req, res) => {
  res.send('Get All Jobs');
};

const getJobById = async (req, res) => {
  res.send('Get Job By Id');
};

const createJob = async (req, res) => {
  res.send('Create Job');
};

const updateJob = async (req, res) => {
  res.send('Update Job');
};

const deleteJob = async (req, res) => {
  res.send('Delete Job');
};

export { getAllJobs, getJobById, createJob, updateJob, deleteJob };
