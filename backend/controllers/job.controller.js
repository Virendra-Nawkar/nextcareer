import { Job } from "../models/job.model.js"
import { Application } from "../models/application.model.js";


// for admin to post job
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experienceLevel,
            position,
            companyId
        } = req.body;

        const userId = req.id;

        // Validate required fields
        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experienceLevel ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "All the information is required, some data is missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(",").map(req => req.trim()),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log("Error in Creating a Job Post", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        const jobs = await Job.find(query).populate({   //*why popluate is used here bcause to get the data of the compnaty
            path: "company"                             //* in the place of the Id of the company
        }).sort({ createdAt: -1 });                     //* this will help to get the data of comany which created the job
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found with this Role",
                success: false
            });
        }

        return res.status(200).json({
            message: "Jobs Founds successfully",
            jobs,
            success: true
        });
    } catch (error) {
        console.log("Error in getting all jobs ", error);
    }
}
// student
// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({
//                 message: "Jobs not found with this ID",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Jobs Founds successfully",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.log("Error in getting Job with ID ", error);
//     }
// }


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id; // from isAuthenticated middleware

        const job = await Job.findById(jobId).populate("company");
        if (!job) {
            return res.status(404).json({
                message: "Job not found with this ID",
                success: false
            });
        }

        // Check if the current user has already applied to this job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        const isApplied = !!existingApplication;

        return res.status(200).json({
            message: "Job found successfully",
            job,
            isApplied,
            success: true
        });
    } catch (error) {
        console.log("Error in getting Job with ID ", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};



// admin , numebers of job created
export const getAdminJobs = async (req, res) => {
    try {
        const amdinId = req.id;
        const jobs = await Job.find({ created_by: amdinId });
        if (!jobs) {
            return res.status(404).json({
                message: "No Jobs are found for this Admin User",
                success: false
            });
        }

        return res.status(200).json({
            message: "Jobs Founds successfully",
            jobs,
            success: true
        });
    } catch (error) {
        console.log("Error in finding jobs published by Admin ", error);
    }
}
