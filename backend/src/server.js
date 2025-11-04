import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config();
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is connected at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDb connection failed !!", err);
  });

// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("errror", (error) => {
//             console.log("ERRR: ", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.error("ERROR: ", error)

//     }
// })()
