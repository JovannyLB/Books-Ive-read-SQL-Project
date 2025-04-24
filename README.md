# Books I've read
A local hosted book notes website that uses PostgreSQL to store, retrieve, edit and delete book notes. There is no hosted version, but you can try it yourself by using the command on the command terminal after navigating to the project's folder: `node .\index.js` or you can use `nodemon .\index.js` if you have the npm package and plan on editing the code youself. Don't forget to run `npm install` before trying to run the project.

The website requires a PostgreSQL database formatted in a specific way, I've added an example table to the project files so you may create a database and a table that works out of the box on the website. Don't forget to add your database's credentials on line 9 of index.js, i.e., `const  db  =  new pg.Client(JSON.parse(readFileSync("./client.json")));`; as you can see, it expects a file called `client.json` in the root folder. This file should be formatted like this:
```json
{
 "user":  "*your postgres user*",
 "host":  "localhost",
 "database":  "*database name*",
 "password":  "*your database password*",
 "port":  5432
}
```
## Showcase
### Home Page
![enter image description here](https://i.postimg.cc/FH7GT4pf/image.png)
### Edit page
![enter image description here](https://i.postimg.cc/4xqPMS2W/image.png)
