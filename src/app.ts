import type { Request, Response } from "express";
import express from "express";
import authRoutes from "./routes/staff/auth_routes";
import staffRoute from "./routes/admin/staff_routes";
import authAdminRoute from "./routes/admin/auth_routes";
import attRoutes from "./routes/staff/attendance_routes";
import dashboardRoutes from "./routes/staff/dashboard_routes";
import profileRoutes from "./routes/staff/profile_rotues";
import utilRoutes from "./routes/utils/utils_routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/attendance', attRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/utils', utilRoutes);
app.use('/api/v1/admin/master', staffRoute);
app.use('/api/v1/admin/auth', authAdminRoute);

app.use((req: Request, res: Response) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
