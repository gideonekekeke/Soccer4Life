import mongoose from "mongoose";

const url = "mongodb://localhost/soccerPreditDB";

mongoose.connect(url).then(() => {
	console.log("database is connected");
});
