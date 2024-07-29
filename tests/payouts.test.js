const { ValueError, ChiMoneyError } = require("../Errors");
require("dotenv").config();
const { payouts } = require("../index")(process.env.TEST_API_KEY);
const Email = "kenza.mouktabil@uit.ac.ma"; // Place your test email here
const { payoutChimoney } = require("../modules/Payouts");



describe("Payouts", () => {
  
  test("payoutChimoney: should successfully initiate a transaction to a recipient's email using Chimoney API", async () => {
    try {
      const response = await payoutChimoney(Email, 'USD', 1);
      console.log("payoutChimoney:", response);
      expect(response.data).toBeDefined();
      expect(response.status).toBe("success");
    } catch (error) {
      console.error("Error during payout:", error);
      throw error;
    }
  });

  test("payoutChimoney: should successfully initiate a transaction to a recipient's phone number using Chimoney API", async () => {
    try {
      const response = await payoutChimoney('+212762341153', 'USD', 1);
      console.log("payoutChimoney:", response);
      expect(response.data).toBeDefined();
      expect(response.status).toBe("success");
    } catch (error) {
      console.error("Error during payout:", error);
      throw error;
    }
  });

  test("payoutChimoney: should throw value error for invalid inputs", async () => {
    try {
      await payoutChimoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });
  test("airtime: should return error from Chi Money", async () => {
    try {
      await payouts.airtime();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("banks: should return error from Chi Money", async () => {
    try {
      await payouts.bank();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("chimoney: should return error from Chi Money", async () => {
    try {
      await payouts.chimoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("giftCard: should return error from Chi Money", async () => {
    try {
      await payouts.giftCard();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("mobileMoney: should return error from Chi Money", async () => {
    try {
      await payouts.mobileMoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("intitiateChimoney: should return error from Chi Money", async () => {
    try {
      await payouts.initiateChimoney();
    } catch (error) {
      expect(error).toBeInstanceOf(ChiMoneyError);
    }
  });

  test("status: should return error from Chi Money", async () => {
    try {
      await payouts.status();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });
});
