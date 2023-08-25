import Station from "../models/Station.js"
import StationStat from "../models/StationStat.js"
import User from "../models/User.js"
import Report from "../models/Report.js";

export const getStations = async (req, res) => {
    try {
        const stations = await Station.find();
        const stationsWithStats = await Promise.all(
            stations.map(async (station) => {
                const stat = await StationStat.find({
                    stationId: station._id
                })
                return {
                    ...station._doc,
                    stat,
                }
            })
        );
        res.status(200).json(stationsWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message}); /* EDIT FOR FINAL PRODUCT */
    }
};

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user"}).select("-password")
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message}); /* EDIT FOR FINAL PRODUCT */
    }
};

export const getReports = async (req, res) => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    
        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
          const sortParsed = JSON.parse(sort);
          const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
          };
    
          return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};
    
        const reports = await Report.find({
          $or: [
            { location: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
          ],
        })
          .sort(sortFormatted)
          .skip(page * pageSize)
          .limit(pageSize);
    
        const total = await Report.countDocuments({
          name: { $regex: search, $options: "i" },
        });
    
        res.status(200).json({
          reports,
          total,
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };
