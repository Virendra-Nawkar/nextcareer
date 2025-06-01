import multer from "multer";

const storage = multer.memoryStorage();
export const singleUplaod = multer({storage}).single("file");