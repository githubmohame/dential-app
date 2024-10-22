/* IMPORTANT WE NEED TO USE DIFFERENT PAYPAL_CLIENT_ID AND PAYPAL SECRET, WE CAN USE THOSE BUT THE PAYPMENT WILL FAIL BECAUSE ACCOUNT GOT BANNED FOR SOME REASON
PAYPAL_CLIENT_ID=
PAYPAL_SECRET=
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
BASE_URL=http://localhost:3000
*/
import axios from "axios";

async function generateAccessToken() {
  try {
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
    });

    return response.data.access_token; // Return the access token for later use
  } catch (error) {
    console.error(
      "Error generating access token:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

const createOrder = async (newitems, cost) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Corrected template literal and added space
      },
      data: {
        intent: "CAPTURE", // Define the intent of the payment
        purchase_units: [
          {
            items: newitems,
            // items: [
            //   {
            //     name: "Node.js Complete Course", // Name of the item
            //     description: "Node.js Complete Course with Express and MongoDB", // Description of the item
            //     quantity: 1, // Quantity of the item
            //     unit_amount: {
            //       currency_code: "USD", // Currency
            //       value: "100.00", // Price per unit
            //     },
            //   },
            // ],
            amount: {
              currency_code: "USD",
              value: `${cost}`,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: `${cost}`, // Ensure the item total matches the sum of item prices
                },
              },
            },
          },
        ],
        application_context: {
          return_url: `${process.env.BASE_URL}/complete-order`, // Corrected template literal
          cancel_url: `${process.env.BASE_URL}/cancel-order`, // Corrected template literal
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          brand_name: "EasyReserve.com",
        },
      },
    });

    // Return the response from PayPal's API
    return response.data.links.find((link) => link.rel === "approve").href;
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Could not create order");
  }
};

// Example usage to create an order
// this.createOrder().then((result) => console.log(result));

const capturePayment = async (orderId) => {
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
};

export { generateAccessToken, createOrder, capturePayment };

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
