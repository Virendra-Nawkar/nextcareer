import { Company } from "../models/company.model.js"
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is Required",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(201).json({
            message: "Company Registered Succussfully",
            company,
            success: true
        });

    } catch (error) {
        console.log("Error in Registering Company : ", error);
    }
}

export const getCompnay = async (req, res) => {
    try {
        const userId = req.id;   //logged in user ID -> uski hi company detial meilgi
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log("Error in getting company", error);
    }
}

// get company by ID
export const getCompnaybyId = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Companies found",
            company,
            success: true
        });
    } catch (error) {
        console.log("Error in getting company by Id ", error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        // cloud innary aayege

        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Failed to update the company data, company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company inforamtion Updated",
            success: true
        });

    } catch (error) {
        console.log("Failed to update company detials ", error);
    }
}