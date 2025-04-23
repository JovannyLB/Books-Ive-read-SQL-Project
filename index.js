import express from "express";
import bodyParser from "body-parser";
import { readFileSync } from "fs";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client(JSON.parse(readFileSync("./client.json")));
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
	const rawBooknotes = await db.query("select * from BookNotes");
	const booknotes = rawBooknotes.rows;

	res.render("index.ejs", { booknotes: booknotes });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
