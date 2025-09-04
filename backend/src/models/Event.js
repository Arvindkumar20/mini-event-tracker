import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Event owner is required"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    dateTime: {
      type: Date,
      required: [true, "Event date & time is required"],
      index: true,
      validate: {
        validator: function (value) {
          return value > new Date(); // future date only
        },
        message: "Event date must be in the future",
      },
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
      minlength: [3, "Location must be at least 3 characters long"],
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    shareId: {
      type: String,
      unique: true,
      sparse: true, // allows null/undefined
      match: [/^[a-zA-Z0-9-_]+$/, "Share ID must be alphanumeric or -/_ only"],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
