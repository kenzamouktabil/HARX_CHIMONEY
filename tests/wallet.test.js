const { ValueError, ChiMoneyError, TypeError } = require("../Errors");
require("dotenv").config();
const { wallet } = require("../index")();
const testWalletId ="JEOQzeBano4A5fFkbYbE"; // Place your test wallet id here , type :'chi'
const testPhoneNumber = "+212762341153"; // Place your test phone number here
const testReceiver = "gSMOlrz9QwTk46mI8KEUytUDB1q1"; // Place your test receiver id here
const testCompanyEmail = "testcompany@example.com"; // Place your test company email here


jest.setTimeout(30000); 



describe("Wallet", () => {
  let chiRef; 


  test("list: should successfully return data from Chi Money API", async () => {
    const response = await wallet.list();
    console.log("list:", response); 
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  }); //this functions gives us the wallet id that we r gonna use later 

  test("details: should successfully return data from Chi Money API", async () => {
    const response = await wallet.details(testWalletId);
    console.log("details:", response); 
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });//work 

  test("details: should throw value error", async () => {
    try {
      await wallet.details();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    } 
  });

 //send the amout to the receiver id , (add ammount in receiver wallet  / reduce amount+fees (1$) from sender wallet) +email notification for the receiver 
   
  test("sendMoneyToachimoneywallet: should successfully send money to a chimoney wallet wallet using Chimoney API", async () => {
    try {
      const response = await wallet.sendMoneyToachimoneywallet(1, 'USD');
      console.log("sendMoneyToachimoneywallet:", response);
      expect(response.data).toBeDefined();
      expect(response.status).toBe("success");
    } catch (error) {
      console.error("Error in sendMoneyToachimoneywallet:", error);
    }
 });

  


// test kitl3 mess f log ms wallet makitzad fih walu ; intiate payment
  test("depositToHarxWallet: should successfully deposit money into HARX wallet using Chi Money API", async () => {
    const response = await wallet.depositToHarxWallet(7, 'USD');
    console.log("depositToHarxWallet:", response);
    expect(response.data).toBeDefined();
    expect(response.status).toBe("success");
  });


  test("depositToHarxWallet: should throw value error for invalid inputs", async () => {
    try {
      await wallet.depositToHarxWallet();
    } catch (error) {
      expect(error).toBeInstanceOf(ValueError);
    }
  });


// khdem ktsift money l chi mail ktwslo notif , il peut soit ydkhel flos l comte dialu chimoney or via bank account but banks linked only to airtime countries
  test.only("sendMoneyToEmail: should successfully send money to an email using Chimoney API", async () => {
    try {
      const response = await wallet.sendMoneyToEmail(1, 'USD', 'kenzamouktabil@gmail.com');
      console.log("sendMoneyToEmail:", response);
      expect(response.data).toBeDefined();
      expect(response.status).toBe("success");
    } catch (error) {
      console.error("Error in sendMoneyToEmail test:", error);
    }
  });



  //transaction ktkhdem ; kit9so flos mn comptte ; but aucune notif mktwsl i think because morroco madakhl mea airtime counties
  test("sendMoneyTonumber: should successfully send money to an number using Chimoney API", async () => {
    try {
      const response = await wallet.sendMoneyTonumber(10, 'USD', '+212762341153');
      console.log("sendMoneyTonumber:", response);
      expect(response.data).toBeDefined();
      expect(response.status).toBe("success");
    }  catch (error) {
      console.error("Error in sendMoneyTonumber test:", error);
    }
  });


})
