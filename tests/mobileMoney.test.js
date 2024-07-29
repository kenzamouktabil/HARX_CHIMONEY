const { ValueError, ChiMoneyError } = require("../Errors");

require("dotenv").config();
const { mobileMoney } = require("../index")();

describe("MobileMoney", () => {
  test("makePayment: should return throw value error", async () => {
    try {
      await mobileMoney.makePayment();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("makePayment: should return throw Chi Money error", async () => {
    try {
      await mobileMoney.makePayment({
        amount: 2,
        currency: "NGN",
        fullname: "llll",
        email: "email",
        country: "NG",
        phone_number: "num",
        tx_ref: "fakeref",
      });
      
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  }); // transfer money to a mobile number using mobile money services 

  test("getAllTransactions: should get all transactions", async () => {
    const response = await mobileMoney.getAllTransactions();

    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });

  test("verifyPayment: should throw value error", async () => {
    try {
      await mobileMoney.verifyPayment();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("verifyPayment: should throw Chi Money Error", async () => {
    try {
      await mobileMoney.verifyPayment("fakeid");
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });
});
