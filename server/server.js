const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Endpoint for getting paginated products
app.get("/api/products", (req, res) => {
  // Read the products data from the JSON file
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
  );

  // Get the page and limit query parameters from the request
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  // Calculate the start and end index for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Create the paginated results object
  const results = {
    products: products.slice(startIndex, endIndex),
    total: products.length,
  };

  // Add next and previous page information if applicable
  if (endIndex < products.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  // Send the paginated results as JSON response
  res.json(results);
});

// Endpoint for getting users
app.get("/api/users", (_req, res) => {
  // Read the users data from the JSON file
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
  );

  // Send the users data as JSON response
  res.json(users);
});

app.get("/api/users/:username/wishlist", (req, res) => {
  // Load user data from JSON file
  const userDataPath = path.join(__dirname, "users.json");
  const userData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"));
  const userId = req.params.username;
  const user = userData.find(user => user.username === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user.wishlist);
});

app.put("/api/users/:username/wishlist", (req, res) => {
  // Load user data from JSON file
  const userDataPath = path.join(__dirname, "users.json");
  const userData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"));
  const userId = req.params.username;
  console.log(req.body);
  
  const updatedWishlist = req.body.wishlist;

  let userUpdated = false;
  const updatedUserData = userData.map((user) => {
    if (user.username === userId) {
      userUpdated = true;
      return { ...user, wishlist: updatedWishlist };
    }
    return user;
  });

  if (!userUpdated) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update JSON file with new data
  fs.writeFileSync(userDataPath, JSON.stringify(updatedUserData, null, 2));

  res.json(updatedWishlist);
});

// Endpoint for getting paginated products from the wishlist
app.get("/api/wishlist", (req, res) => {
  // Read the users and products data from the JSON files
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
  );
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
  );

  // Get the username, page, and limit from the query parameters
  const username = req.query.username;
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  // Find the user by username
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Get the product IDs from the user's wishlist
  const wishlistProductIds = user.wishlist;

  // Filter the products based on the wishlist
  const wishlistProducts = products.filter((product) =>
    wishlistProductIds.includes(product.id)
  );

  // Calculate the start and end index for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Create the paginated results object
  const paginatedResults = {
    products: wishlistProducts.slice(startIndex, endIndex),
    total: wishlistProducts.length,
  };

  // Add next and previous page information if applicable
  if (endIndex < wishlistProducts.length) {
    paginatedResults.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    paginatedResults.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  // Send the paginated results as JSON response
  res.json(paginatedResults);
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
