import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    profilePicture: { type: String, required: true },
    role: { type: String, required: true },
    accessLevel: { type: String, required: true },
    employeeId: { type: String, unique: true },
    department: { type: String },
    designation: { type: String },
    specialization: { type: String },
    workShift: { type: String },
    availability: { type: String },
    accountStatus: { type: String, default: "Active" },
    joiningDate: { type: Date },
  }
);

const Roles = mongoose.model("Roles", rolesSchema);
export default Roles;
