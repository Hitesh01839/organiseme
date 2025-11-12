import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", taskSchema);
export default Task;
