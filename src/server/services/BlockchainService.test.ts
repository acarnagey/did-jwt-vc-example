import BlockchainService from "./BlockchainService";
describe("vc util", () => {
  it("should create and verify vc", async () => {
    const blockchainService = new BlockchainService();
    const issuerDid = this.createDIDByAccount(this.createAccount()).did;
    const subjectDid = this.createDIDByAccount(this.createAccount()).did;
    const vcJwt = await blockchainService.createOverEighteenVC({
      name: "firstName lastName",
      subjectDid,
      issuerDid,
    });
    console.log(vcJwt);
    const verifiedVC = await blockchainService.verifyVC(vcJwt);
    console.log(verifiedVC);
  }, 60000);
});
