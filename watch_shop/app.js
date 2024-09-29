// Import Express framework and create an instance of it
const express = require('express');
const app = express();

// Import body-parser middleware to handle form data in POST requests
const bodyParser = require('body-parser');

// Apply bodyParser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Import authentication module
const auth = require('./public/scripts/auth.js');

// Create user and password
auth.createUser("user", "pass");

// authenticate username and password
console.log(auth.authenticateUser("user", "pass"));
console.log(auth.authenticateUser("user", "passs"));

//Connect to database:
const mysql = require('mysql');
//Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'G00425765'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to database!');
  }
});

// Serve static files from the public directory
app.use(express.static("public"));

// Default pafe route
app.get("/", function(req, res) {
  res.render("index");
});



// Route to handle login form submission
app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const authenticated = auth.authenticateUser(username, password);
  console.log(authenticated);

  if(authenticated) {
    console.log("Authentication was successful!");
    res.redirect("/home");
  } else {
    console.log("Authentication was NOT successful!");
    res.render("failed");
  }

});

// Retrieve specific products by there ids from the 'products' table
app.get("/shop", function(req, res) {
    const id = req.query.rec; 
    // Execute a SQL query to select the product with the specified ID.
    connection.query("SELECT * FROM products WHERE id = ?", [id], function(err, rows, fields) {
        if(err) {
            // Log and send an error response if the database query fails.
            console.error("Error retrieving data from the database:", err);
            res.status(500).send("Error retrieving data from the database")
        } else if(rows.length === 0) {
            // Handle the case where no product is found for the given ID.
            console.error("No rows found for id $[id]");
        } else {
            // Log the retrieved data and render a page to display the product details.
            console.log("Data retrieved from the Database!");
            console.log(rows[0].name);
            console.log(rows[0].description);
            console.log(rows[0].price);
            console.log(rows[0].category);
            console.log(rows[0].image_url);

            const prodName = rows[0].name;
            const description = rows[0].description;
            const price = rows[0].price;
            const category = rows[0].category;
            const image_url = rows[0].image_url;
            

            res.render("product.ejs", {prodName: prodName, description: description, price: price, category: category, image_url: image_url});
        }
    })
});


app.post("/shop", function(req, res) {
  const id = req.body.rec2; 
  // Query database for a product with the given ID.
  connection.query("SELECT * FROM products WHERE id = ?", [id], function(err, rows, fields) {
      if(err) {
          // Log and respond with an error if the database operation fails.
          console.error("Error retrieving data from the database:", err);
          res.status(500).send("Error retrieving data from the database")
      } else if(rows.length === 0) {
          // Check if no product was found and respond accordingly.
          console.error("No rows found for id $[id]");
      } else {
        // For a successful retrieval, log the data and render the 'product.ejs' view with the product data.
          console.log("Data retrieved from the Database!");
          console.log(rows[0].name);
          console.log(rows[0].description);
          console.log(rows[0].price);
          console.log(rows[0].category);
          console.log(rows[0].image_url);

          const prodName = rows[0].name;
          const description = rows[0].description;
          const price = rows[0].price;
          const category = rows[0].category;
          const image_url = rows[0].image_url;
          

          res.render("product.ejs", {prodName: prodName, description: description, price: price, category: category, image_url: image_url});
      }

  })
});

// Retrieve products for the carousel and render the home page
app.get("/home", function(req, res) {
  // SQL query to randomly select products.
  const query = "SELECT * FROM products ORDER BY RAND()";
  connection.query(query, (err, results) => {
      if (err) {
          // Log and handle database errors.
          console.error('Error retrieving products from database:', err);
          res.status(500).send("Error retrieving products from database");
          return;
      }
      if (results.length === 0) {
          // Handle the situation where no products are found.
          console.error('No products found');
          res.status(404).send("No products found");
          return;
      }
      // Render the 'home' view with the results to display in the carousel.
      res.render("home", { products: results });
  });
});


// Render the checkout page when checkout is accessed by GET
app.get("/checkout", function(req, res) {
  res.render("checkout.ejs");
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});