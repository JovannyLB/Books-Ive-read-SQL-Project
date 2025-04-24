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
	const rawBooknotes = await db.query("SELECT * FROM booknotes ORDER BY date_added DESC");
	const booknotes = rawBooknotes.rows;

	res.render("home.ejs", { booknotes: booknotes });
});

app.get("/edit", async (req, res) => {
	const rawBooknotes = await db.query("SELECT * FROM booknotes ORDER BY date_added DESC");
	const booknotes = rawBooknotes.rows;

	res.render("edit.ejs", { booknotes: booknotes });
});

app.post("/add-book-note", async (req, res) => {
	await db.query("INSERT INTO booknotes (name, rating, note, cover) VALUES ($1, $2, $3, $4)", [req.body.bookName, req.body.bookRating, req.body.bookNote, req.body.bookCover]);

	res.redirect("/edit");
});

app.post("/edit-book-note", async (req, res) => {
	await db.query("UPDATE booknotes SET name=$1, rating=$2, note=$3, cover=$4, date_added=NOW() WHERE id=$5;", [req.body.bookName, req.body.bookRating, req.body.bookNote, req.body.bookCover, req.body.noteId]);

	res.redirect("/edit");
});

app.post("/delete-book-note", async (req, res) => {
	await db.query("DELETE FROM booknotes WHERE id=$1;", [req.body.noteId]);

	res.redirect("/edit");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
