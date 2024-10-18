import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import attendanceHistoryRoutes from "./routes/admin/attendance_history_routes";
import authAdminRoute from "./routes/admin/auth_routes";
import dashboardRoutesAdmin from "./routes/admin/dashboard_routes";
import holidayDateRoutes from "./routes/admin/holiday_date_routes";
import jobPositionRoutes from "./routes/admin/job_position_routes";
import locationRoutes from "./routes/admin/location_routes";
import permitRoutes from "./routes/admin/staff_permit_routes";
import staffRoute from "./routes/admin/staff_routes";
import workHourRoutes from "./routes/admin/work_hour_routes";
import attRoutes from "./routes/staff/attendance_routes";
import authRoutes from "./routes/staff/auth_routes";
import dashboardRoutes from "./routes/staff/dashboard_routes";
import profileRoutes from "./routes/staff/profile_rotues";
import utilRoutes from "./routes/utils/utils_routes";

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
  
})

const corsOptions = {
  origin: "http://localhost:3000", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
    "Authorization", 
  ],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(limiter);
app.use(helmet())
app.use(cors(corsOptions))

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/attendance', attRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/utils', utilRoutes);
app.use('/api/v1/admin/master', staffRoute);
app.use('/api/v1/admin/auth', authAdminRoute);
app.use('/api/v1/admin/master/work-hour', workHourRoutes);
app.use('/api/v1/admin/master/job-position', jobPositionRoutes);
app.use('/api/v1/admin/master/holiday-date', holidayDateRoutes);
app.use('/api/v1/admin/master/location', locationRoutes);
app.use('/api/v1/admin/master/attendance', attendanceHistoryRoutes);
app.use('/api/v1/admin/master/permit', permitRoutes);
app.use('/api/v1/admin/dashboard', dashboardRoutesAdmin);

app.use((req: Request, res: Response) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
