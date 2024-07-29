const { ValueError, TypeError } = require("../Errors");
const {
  handleRequest,
  HTTPMETHODS,
  formatJoiErrors,
} = require("../utils/helpers");
const Joi = require("joi");



/**
 * This function gets all the wallets associated with a user
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function list(subAccount = null) {
  const payload = {};

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    path: "/v0.2/wallets/list",
    payload,
  });
}

/**
 * This function gets the details associated with a single user wallet
 * @param {string} id The wallet id
 * @param {string?} subAccount The subAccount of the transaction
 * @returns The response from the Chi Money API
 */
async function details(id, subAccount = null) {
  if (!id) throw new ValueError("id is required");

  if (typeof id !== "string") throw new TypeError("id must be of type string");

  const payload = { walletID: id};

  if (subAccount) payload.subAccount = subAccount;

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/wallets/lookup",
  });
}



/**
 * This function deposits money into the HARX wallet
 * @param {number} amount The amount to deposit
 * @param {string} currency The currency type (e.g., USD)
 * @returns The response from the Chi Money API
 */
async function depositToHarxWallet(amount, currency) {
  const schema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
  });

  const { value, error } = schema.validate(
    { amount, currency },
    { abortEarly: false }
  );

  if (error) throw new ValueError("invalid input(s)", formatJoiErrors(error));

  const payload = { valueInUSD: value.amount,
    currency: value.currency,
    payerEmail: process.env.payer_EMAIL, 
   };

  return handleRequest({
    method: HTTPMETHODS.POST,
    payload,
    path: "/v0.2/payment/initiate",  
  });
}



/**
 * This function sends money to the HARX Chimoney wallet
 * @param {number} amount The amount to send
 * @param {string} currency The currency type (e.g., USD)
 * @returns The response from the Chi Money API
 */
async function sendMoneyToachimoneywallet(amount, currency) {
  // Define validation schema
  const schema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
  });

  // Validate input
  const { value, error } = schema.validate(
    { amount, currency },
    { abortEarly: false }
  );

  if (error) throw new ValueError("invalid input(s)", formatJoiErrors(error));
  const valueInUSD = value.amount;

  const payload = {
    wallets: [
      {
        receiver: process.env.receiver_WALLET_ID, 
        valueInUSD: valueInUSD 
      },
    ],
    subAccount: process.env.HARX_SUBACCOUNT, //optional
  };

  console.log("Payload being sent to Chimoney API for payout:", JSON.stringify(payload));



  try {
    const response = await handleRequest({
      method: HTTPMETHODS.POST,
      payload,
      path: "/v0.2/payouts/wallet",  // Correct endpoint for payout to a Chimoney wallet
    });
    console.log("Response from Chimoney API for payout:", response);
    return response;
  } catch (error) {
    console.error("Error during payout:", error);
    if (error.response && error.response.data) {
      console.error("Chimoney API Error Response during payout:", error.response.data);
    }
    throw error;
  }
}



/**
 * This function sends money to an email address using the Chimoney API
 * @param {number} amount The amount to send
 * @param {string} currency The currency type (e.g., USD)
 * @param {string} email The recipient's email address
 * @returns The response from the Chimoney API
 */
async function sendMoneyToEmail(amount, currency, email) {
  // Define validation schema
  const schema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  // Validate input
  const { value, error } = schema.validate({ amount, currency, email }, { abortEarly: false });

  if (error) throw new ValueError("Invalid input(s)", formatJoiErrors(error));

  // Convert amount to USD if necessary (assuming you need this for the API)
  const valueInUSD = value.amount;

  const payload = {
    chimoneys: [
      {
        email: value.email,
        valueInUSD: valueInUSD, // Ensure correct field name is used
        currency: value.currency,
      },
    ],
    subAccount: process.env.HARX_SUBACCOUNT, // Subaccount from environment variables, if necessary
  };

  console.log("Payload being sent to Chimoney API for payout:", JSON.stringify(payload));

  try {
    const response = await handleRequest({
      method: HTTPMETHODS.POST,
      payload,
      path: "/v0.2/payouts/chimoney",  // Correct endpoint for payout to a Chimoney wallet
    });
    console.log("Response from Chimoney API for payout:", response);
    return response;
  } catch (error) {
    console.error("Error during payout:", error);
    if (error.response && error.response.data) {
      console.error("Chimoney API Error Response during payout:", error.response.data);
    }
    throw error;
  }
}




/**
 * This function sends money to an number  using the Chimoney API
 * @param {number} amount The amount to send
 * @param {string} currency The currency type (e.g., USD)
 * @param {string} number The recipient's number 
 * @returns The response from the Chimoney API
 */
async function sendMoneyTonumber(amount, currency, number) {
  // Define validation schema
  const schema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    number: Joi.string().pattern(/^\+212[0-9]{9}$/).required(),
  });

  // Validate input
  const { value, error } = schema.validate({ amount, currency, number }, { abortEarly: false });

  if (error) throw new ValueError("Invalid input(s)", formatJoiErrors(error));

  // Convert amount to USD if necessary (assuming you need this for the API)
  const valueInUSD = value.amount;

  const payload = {
    chimoneys: [
      {
        number: value.number,
        valueInUSD: valueInUSD, 
        currency: value.currency,
      } ,
    ] ,
    subAccount: process.env.HARX_SUBACCOUNT, // optianal
  } ;

  console.log("Payload being sent to Chimoney API for payout:", JSON.stringify(payload));

  try {
    const response = await handleRequest({
      method: HTTPMETHODS.POST,
      payload,
      path: "/v0.2/payouts/chimoney", 
    }) ;
    console.log("Response from Chimoney API for payout:", response);
    return response;
  }  catch (error) {
    console.error("Error during payout:", error);
    if (error.response && error.response.data) {
      console.error("Chimoney API Error Response during payout:", error.response.data);
    }
    throw error;
  }
}






module.exports = {sendMoneyToEmail,sendMoneyTonumber, sendMoneyToachimoneywallet, depositToHarxWallet, list, details };