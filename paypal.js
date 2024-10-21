/* edit: refactored into module type using gpt, included comments as well
MAKE SURE TO USE IMPORTS/EXPORTS TO MATCH THE MODULE TYPE
IMPORTANT WE NEED TO USE DIFFERENT PAYPAL_CLIENT_ID AND PAYPAL SECRET, WE CAN USE THOSE BUT THE PAYPMENT WILL FAIL BECAUSE ACCOUNT GOT BANNED FOR SOME REASON


 PAYPAL_CLIENT_ID=ASHMvfN1N7RjzYGexqI7Tt4z7-J3ZNxmEcwAadXPSDQ89cJznmGYRyTGCjtYNbgZ34N3NSFJ_qHS7Kce
PAYPAL_SECRET=EDweu1v6R-qDohWEnEHfg2JCAOGtN0_Yanvateh240WtPOsm-XdbPe8_XJkwwyQm6qihWLEcaVPAiVua
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
BASE_URL=http://localhost:3000

*/
import axios from "axios";

// Function to generate PayPal access token
export async function generateAccessToken() {
  try {
    // Make a request to PayPal's OAuth endpoint to get the access token
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      method: "post",
      data: "grant_type=client_credentials", // Required payload to get access token
      auth: {
        // PayPal credentials from environment variables
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
    });

    // Log the access token to verify successful retrieval
    console.log("Access Token:", response.data.access_token);
    return response.data.access_token; // Return the access token for further API requests
  } catch (error) {
    // Log the error if there's a problem with getting the token
    console.error(
      "Error generating access token:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error for higher-level handling
  }
}

// Function to create an order with dynamic items and amounts
export async function createOrder(items, totalCost) {
  try {
    // Generate access token before making the order request
    const accessToken = await generateAccessToken();

    // Make the POST request to PayPal's order creation API
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, // PayPal's orders endpoint
      method: "post",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: `Bearer ${accessToken}`, // Include the access token for authorization
      },
      // Order data, now with dynamic items and cost
      data: JSON.stringify({
        intent: "CAPTURE", // The payment intent, specifying that funds will be captured immediately
        purchase_units: [
          {
            items: items, // Dynamically passed items array
            amount: {
              currency_code: "USD", // Set currency, this could be dynamic too
              value: totalCost, // Dynamically passed total cost
              breakdown: {
                item_total: {
                  currency_code: "USD", // Currency for items
                  value: totalCost, // Total price of all items
                },
              },
            },
          },
        ],
        application_context: {
          return_url: `${process.env.BASE_URL}/complete-order`, // Set the return URL
          cancel_url: `${process.env.BASE_URL}/cancel-order`, // Set the cancel URL
          shipping_preference: "NO_SHIPPING", // Indicate no shipping is required
          user_action: "PAY_NOW", // Prompt the user to pay immediately
          brand_name: "EasyReserve.com", // Custom branding
        },
      }),
    });

    // Find the approval link from PayPal's response and return it
    return response.data.links.find((link) => link.rel === "approve").href;
  } catch (error) {
    // Log error details if something goes wrong
    console.error(
      "Error creating order:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Could not create order");
  }
}

// Function to capture payment for a specific order
export async function capturePayment(orderId) {
  try {
    // Generate access token to authorize the capture request
    const accessToken = await generateAccessToken();

    // Make the POST request to capture the payment for the given order ID
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, // PayPal's capture endpoint
      method: "post",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
        Authorization: `Bearer ${accessToken}`, // Include access token for authorization
      },
    });

    // Return the full capture response data for reference or further use
    return response.data;
  } catch (error) {
    // Enhanced logging to capture full response in case of error
    console.error(
      "Error capturing payment:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      "Failed to capture payment: " +
        (error.response ? JSON.stringify(error.response.data) : error.message)
    );
  }
}

// Example call to createOrder, passing dynamic items and total cost
createOrder(
  [
    {
      name: "Node.js Complete Course", // Example item name
      description: "Node.js Complete Course with Express and MongoDB", // Example description
      quantity: 1, // Quantity of the item
      unit_amount: {
        currency_code: "USD", // Currency code
        value: "100.00", // Price per unit
      },
    },
  ],
  "100.00" // Total cost
).then((result) => console.log(result));

//  the payment api is mostly ready but we need another email for paypal sandbox, because for some reason trialmailer no longer works.
// here is the rest of the implementation logic

// app.post("/pay", async (req, res) => {
//   try {
//     const url = await paypal.createOrder();
//     res.redirect(url);
//   } catch (error) {}
// });

// app.get("/complete-order", async (req, res) => {
//   try {
//     console.log(req.query); // Check what PayPal is sending back

//     const result = await paypal.capturePayment(req.query.token);
//     res.send(
//       "Order Completed! Here are the details: " + JSON.stringify(result)
//     );
//   } catch (e) {
//     // Log full error details for debugging
//     console.error(
//       "Error capturing payment: ",
//       e.response ? e.response.data : e.message
//     );

//     res
//       .status(500)
//       .send("There was an error completing your order. Please try again.");
//   }
// });

// app.get("/cancel-order", async (req, res) => {
//   res.redirect("/");
// });
