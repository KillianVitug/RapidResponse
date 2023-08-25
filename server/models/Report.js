import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
    {
        userId: String,
        location: String,
        category: {
          type: [mongoose.Types.ObjectId],
          of: Number,
        },
      },
      { timestamps: true }
    );

const Report = mongoose.model("Report", ReportSchema);

export default Report;