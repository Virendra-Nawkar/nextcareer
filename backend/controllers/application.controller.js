import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is Required",
                success: false
            });
        }

        // check if the user is already applied to this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: "You have Already applied for this Job",
                success: false
            });
        }

        // check if the job exist or not
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not Found",
                success: false
            });
        }

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied Successfully",
            success: true
        });

    } catch (error) {
        console.log("Failed to apply the job ", error);

    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "You have not applied to any jobs",
                success: false
            });
        }
        return res.status(200).json({
            message: "Job fetched Successfully",
            application,
            success: true
        });

    } catch (error) {
        console.log("Failed to get applied Jobs ", error);
    }
}
// for admin to check hwo many candidates have applited to job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Jobs not Found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job Applicants Fetch Successfully",
            job,
            success: true
        });

    } catch (error) {
        console.log("Error in getApplicants ", error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicaitonId = req.params.id;
        if (!status) {
            return res.status(404).json({
                message: "Job status is Required",
                success: false
            });
        }

        // find the application by Application ID
        const application = await Application.findOne({ _id: applicaitonId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found -> udpatestatus",
                success: false
            });
        }

        // update the stutus
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated Successfully",
            success: true
        });

    } catch (error) {
        console.log("Error in updateStatus ", error);
    }
}


