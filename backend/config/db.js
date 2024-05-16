import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/nutritrack", {})
  .then(() => console.log("Anslutning till MongoDB lyckades"))
  .catch((err) => console.error("Anslutning till MongoDB misslyckades", err));

export default mongoose;
