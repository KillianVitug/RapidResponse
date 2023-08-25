import mongoose from "mongoose";

const StationStatSchema = new mongoose.Schema(
    {
        stationId: String,
        yearlyReportsTotal: Number,
        year: Number,
        monthlyData: 
        [
            {
                month: String,
                totalReports: Number,
            }
        ],
        dailyData: 
        [
            {
            date : String,
            totalReports: Number,
            }
        ]
    },
    { timestamps: true }
);

const StationStat = mongoose.model("StationStat", StationStatSchema);

export default StationStat;