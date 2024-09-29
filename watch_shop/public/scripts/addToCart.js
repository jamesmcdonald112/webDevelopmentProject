// Function to handle adding products to the shopping cart
function addToCart() {
    // Retrieve product details from the page
    let product = document.getElementById("product").innerHTML;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").innerHTML;

    // Create an object to store the product, price, and quantity
    let quantity_price = { price: price, quantity: quantity };

    // Store the product information in localStorage
    // Use JSON.stringify to convert the object into a string for storage
    localStorage.setItem(product, JSON.stringify(quantity_price));
  }