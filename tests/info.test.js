const { ValueError } = require("../Errors");
const { usdInLocalAmount } = require("../modules/Info");

require("dotenv").config();
const { info } = require("../index")(process.env.TEST_API_KEY);

describe("Info", () => {
  test("assets: should successfully return assests from Chi Money API", async () => {
    const response = await info.assets();
    console.log("assets response :",response);
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });//objet ..

  test("airtimeCountries: should successfully return airtime countries from Chi Money API", async () => {
    const response = await info.airtimeCountries();
    console.log("airtimeCountries response:",response);
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  }); //test reussi

  test.only("banks: should successfully return banks data from Chi Money API", async () => {
    const response = await info.banks();   //country NG
    console.log("banks response:",response);
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });// test reussi 

  test("mobileMoneyCodes: should successfully return mobile money codes from Chi Money API", async () => {
    const response = await info.mobileMoneyCodes();
    console.log("mobileMoneyCodes response :",response);
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  }); //test reussi

  test("localAmountInUSD: should successfully return local amount in usd", async () => {
    const response = await info.localAmountInUSD("NGN", 2000);
    console.log("localAmountInUSD:",response);
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });//test reussi 

  test("localAmountInUSD: should throw error for invalid input", async () => {
    try {
      await info.localAmountInUSD(302, "2000");
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });

  test("usdInLocalAmount: should successfully return usd equivalent of local amount", async () => {
    const response = await info.usdInLocalAmount("NGN", 20);
    console.log("usdInLocalAmount:",response);
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });//test reussi

  test("usdInLocalAmount: should fail with value error for invalid input", async () => {
    try {
      await info.usdInLocalAmount(302, "2000");
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });
});
