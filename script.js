// ====== Shopping Cart Logic ======
// Array to hold cart items
let cart = [];
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");

// Event listener for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    // Add item to cart array
    cart.push({ name, price });

    // Update cart display
    updateCart();
  });
});

// Function to update the cart UI
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = `Total: $${total}`;
}

// ====== Form Validation Logic ======
const form = document.getElementById("foodForm");
const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from submitting by default

  // Get form values
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Custom validation
  if (name === "" || address === "" || phone === "") {
    feedback.textContent = "⚠️ All fields are required!";
    feedback.style.color = "red";
    return;
  }

  // Phone number must be 10 digits (basic validation)
  if (!/^\d{10}$/.test(phone)) {
    feedback.textContent = "⚠️ Please enter a valid 10-digit phone number.";
    feedback.style.color = "red";
    return;
  }

  if (cart.length === 0) {
    feedback.textContent = "⚠️ Your cart is empty. Add items before ordering!";
    feedback.style.color = "red";
    return;
  }

  // If validation passes
  feedback.textContent = "✅ Order submitted successfully! Thank you for ordering with FreshEats.";
  feedback.style.color = "green";

  // Reset form + cart
  form.reset();
  cart = [];
  updateCart();
});
