import mongoose from "mongoose";

const StationSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        category: String,
        rating: Number,
        location: String,
    },
    { timestamps: true }
);

const Station = mongoose.model("Station", StationSchema);

export default Station;