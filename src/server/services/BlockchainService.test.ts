
import BlockchainService from "./BlockchainService";
describe("vc util", () => {
  it("should create and verify vc", async () => {
    const blockchainService = new BlockchainService();
    const vcJwt = await blockchainService.createOverEighteenVC("firstName lastName");
    console.log(vcJwt);
    const verifiedVC = await blockchainService.verifyVC(vcJwt);
    console.log(verifiedVC);
  }, 60000);
});
