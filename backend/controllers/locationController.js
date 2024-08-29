import fs from 'fs';
import csv from 'csv-parser';

class LocationController {
  static async searchLocation(req, res) {
    try {
      const query = req.query.q.toLowerCase();
      console.log(query);
      const results = [];

      fs.createReadStream("data/output.csv")
        .pipe(csv())
        .on("data", (row) => {
          if (row["Full Address Detail"].toLowerCase().includes(query)) {
            results.push({lng: row["Longitude"], lat: row["Latitude"], addressDetail:row["Full Address Detail"]});
          }
        })
        .on("end", () => {
          res.json(results);
        })
        .on("error", (error) => {
          res
            .status(500)
            .json({
              error: "An error occurred while processing the CSV file.",
            });
        });
    } catch (error) {
      res.sendData(401, { error: `${error}` });
    }
  }
}
export {LocationController}
