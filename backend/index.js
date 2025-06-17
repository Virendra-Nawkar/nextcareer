// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// // import connectDB from "../utils/db.js";
// import connectDB from "../backend/utils/db.js";
// // import userRoute from "./routes/user.route.js";
// import userRoute from "../backend/routes/user.route.bak.js";
// import companyRoute from "../routes/company.route.js"
// import jobRoute from "../routes/job.route.js"
// import applicationRoute from "../routes/application.route.js"
// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({});

// const app = express();

// const _dirname = path.resolve();



// app.get("/home", (req, res) => {
//     return res.status(200).json({
//         message: "I am coming from Backend",
//         success: true
//     })
// })

// // MiddleWare
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true
// }

// app.use(cors(corsOptions));

// const PORT = process.env.PORT || 3000;

// // * All the Apis will come here
// app.use("/api/v1/user", userRoute);   //& to ye kyse banega deekh ab --> http://localhost:8000/api/v1/user/register  mtlb ye bs ek link banta hai apis
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// app.use(express.static(path.join(_dirname, "/frontend/dist")))
// app.get('*', (_, res)=>{
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// })

// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server Running on PORT ${PORT}`)
// });



import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Utils and DB
import connectDB from "../backend/utils/db.js";

// Routes
import userRoute from "./routes/user.route.js";
import companyRoute from "../backend/routes/company.route.js";
import jobRoute from "../backend/routes/job.route.js";
import applicationRoute from "../backend/routes/application.route.js";

// Config
dotenv.config();

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://nextcareer.virpages.com",
  credentials: true
}));

// Test route
app.get("/home", (req, res) => {
  res.status(200).json({
    message: "I am coming from Backend",
    success: true
  });
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get('/home', (_, res)=>{
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


// Server start
app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on PORT ${PORT}`);
});
