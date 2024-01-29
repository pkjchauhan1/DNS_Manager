const mongoose = require("mongoose");

exports.databaseRun = (connectionString) => {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log(`Database Connected`);
    })
    .catch((error) => {
      console.log(`Database failed to connect! ${error.message}`);
    });
};
