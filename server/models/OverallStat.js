import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
    {
        totalCustomers: Number,
        yearlyReportsTotal: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalReports: Number,
            }
        ],
        dailyData: [
            {
            date : String,
            totalReports: Number,
            }
        ],
        reportsByCategory: 
            {
            type: Map,
            of: Number,
            }
    },
    { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);

export default OverallStat;