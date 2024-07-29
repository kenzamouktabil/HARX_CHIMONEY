// __mocks__/helpers.js
const handleRequest = jest.fn(({ path }) => {
    if (path === "/v0.2/wallets/list") {
      return Promise.resolve({
        data: [
          { id: "test_wallet_id_1", balance: 1000, currency: "USD" },
          { id: "test_wallet_id_2", balance: 500, currency: "EUR" },
        ],
        status: "success",
      });
    }
    return Promise.reject(new Error("Unknown path"));
  });
  
  module.exports = { handleRequest, HTTPMETHODS: { POST: 'POST', GET: 'GET', DELETE: 'DELETE' }, formatJoiErrors: jest.fn() };
  