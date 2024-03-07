import { config } from "./config";

import app from "./src/app";
import { AppDataSource } from "./src/database/connection";


AppDataSource.initialize()
  .then(() => {
    app.listen(config.API_PORT, () => {
      console.log(`Server is running on port ${config.API_PORT}`);
    });
  })
  .catch((error) => {
    console.error(error)
  });
