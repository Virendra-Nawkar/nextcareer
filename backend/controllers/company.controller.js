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
        
    } catch (error) {
        
    }
}