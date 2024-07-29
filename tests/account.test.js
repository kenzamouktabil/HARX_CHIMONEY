const { ValueError } = require("../Errors");
const { deleteUnpaidTransaction } = require("../modules/Account");
require("dotenv").config();
const { account } = require("../index")(process.env.TEST_API_KEY);

const transactionId = "zDPcDHcwOZC2ybBa3RNP";//id de la transaction pour faire le test de get transaction by id

const issuerId = "1865fac3-ce66-48d8-95aa-c548e21312d9_1_1710176763219";//to test getAccountByIssueID

const unpaidTransactionChiRef = "bcb71e77-b33d-4fc2-879e-52adb61e65f0";

const receiverId = "qkCUiLgevEhUYbGenSiZgVisjLc2";

describe("Account", () => {

  test.only("getAllTransactions: should successfully return all transactions on account from Chi Money API", async () => {
    const response = await account.getAllTransactions();
    console.log("getAllTransactions response:", response); 
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });//test reussi

  test("getTransactionByID: should successfully return transaction with Id from Chi Money API", async () => {
    const response = await account.getTransactionByID(transactionId);
    console.log("getTransactionByID response:", response); // Debug log
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });//test reussi

  test("getAccountByIssueID: should successfully return transaction by issueId from Chi Money API", async () => {
    const response = await account.getTransactionsByIssueID(issuerId);
    console.log("getAccountByIssueID response:",response);//Debug log
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });//test reussi

  test("deleteUnpaidTransaction: should successfully delete unpaid transaction", async () => {
    const response = await account.deleteUnpaidTransaction(
      unpaidTransactionChiRef
    );
    console.log("deleteUnpaidTransaction response :",response);
    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  });

  test("accountTransfer: should successfully return transfer transactions on account from Chi Money API", async () => {
    const response = await account.accountTransfer(receiverId, 2, "chi");

    expect(response.status).toBe("success");
    expect(response.data).toBeDefined();
  }); // transfer money usibg id receiver
});
