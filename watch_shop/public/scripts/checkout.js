// Variable to store total coast of all items
let cost_all_items = 0;

// Iterate over each item stored in localStorage
for (let i = 0; i < localStorage.length; i++) {
  let product = localStorage.key(i);
  let content;
  try {
    // Try to parse the product details stored as a JSON string localStorage
    content = JSON.parse(localStorage.getItem(product));
    console.log(product, content);
  } catch (e) {
    console.error(
      "Error parsing JSON from localStorage for key:",
      product,
      e
    );
    // Skip to the next iteration if parsing fails
    continue; 
  }

// Check if the product data includes quantity and price
  if (content && content.quantity && content.price) {
    let quantity = parseInt(content.quantity, 10);
    let price = parseFloat(content.price.replace("€", ""));
    let total_cost = quantity * price;
    cost_all_items += total_cost;

    // Update the HTML to display each item and its total cost
    if (!isNaN(total_cost) && total_cost > 0) {
      let cartItemsElement = document.getElementById("cart_items");
      if (cartItemsElement) {
        cartItemsElement.innerHTML += `${product} x ${
          content.quantity
        } = €${total_cost.toFixed(2)} <br/>`;
      }
    }
    // Update the total price display in the HTML
    document.getElementById(
      "final_price"
    ).innerHTML = `Total: €${cost_all_items.toFixed(2)}`;
  }
}