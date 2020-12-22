import BlockchainService from "./BlockchainService";
import { VerifiedCredential } from "did-jwt-vc";

jest.mock("./BlockchainService");

describe("vc util", () => {
  it("should create and verify vc", async () => {
    const blockchainService = new BlockchainService();
    expect(BlockchainService).toHaveBeenCalledTimes(1);
    // const issuerDid = blockchainService.getIssuerDID().did;
    const issuerDid = "did:ethr:0x0000000000000000000000000000000000000000";
    // console.log(issuerDid);
    // const subjectDid = blockchainService.createDIDByAccount(
    //   blockchainService.createAccount()
    // ).did;
    const subjectDid = "did:ethr:0x0000000000000000000000000000000000000001";
    blockchainService.createVC = jest.fn().mockImplementation((_, _1, _2) => {
      return new Promise((resolve) =>
        resolve(
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJ2YyI6eyJAY29udGV4dCI6Wy" +
            "JodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjp" +
            "bIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im9m" +
            "QWdlIjp7InR5cGUiOiJPdmVyRWlnaHRlZW4iLCJuYW1lIjoiZmlyc3ROYW1lIGxhc" +
            "3ROYW1lIn19fSwic3ViIjoiZGlkOmV0aHI6MHgwOTExMDJlNjFEMDI4Qzk0ZTA4ZT" +
            "VERGNjYUZGNTVCMWUxYzdDN2M2IiwibmJmIjoxNjA4NjU5MzA4LCJpc3MiOiJkaWQ" +
            "6ZXRocjoweGYxMjMyZjg0MGYzYWQ3ZDIzZmNkYWE4NGQ2YzY2ZGFjMjRlZmIxOTgi" +
            "fQ.LTJOaHrARtVxXRLiuJiiXHom0R-5WRztwev9sRcVNZRHAooYE--_Hmg1r2Er7r" +
            "saPnB7z5-YoISU-NoEoHUBiA"
        )
      );
    });
    const vcJwt = await blockchainService.createOverEighteenVC({
      name: "firstName lastName",
      subjectDid,
      issuerDid,
    });
    // expect(blockchainService.createVC).toHaveBeenCalled();
    expect(blockchainService.createOverEighteenVC).toHaveBeenCalled();
    // console.log(vcJwt);
    const vc: VerifiedCredential = {
      payload: null,
      doc: {
        "@context": "https://w3id.org/did/v1",
        id: "",
        publicKey: [
          {
            id: "",
            type: "",
            controller: "",
          },
        ],
      },
      issuer: "",
      signer: {},
      jwt: vcJwt,
      verifiableCredential: {
        credentialSubject: {
          ofAge: {
            type: "OverEighteen",
            name: "firstName lastName"
          },
          id: "did:ethr:0x1Dee80A3ACD835423a9E942606CCcdb0C54255B4",
        },
        issuer: { id: "did:ethr:0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198" },
        type: ["VerifiableCredential"],
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        issuanceDate: "2020-12-22T18:36:49.000Z",
        proof: {
          type: "JwtProof2020",
          jwt: vcJwt,
        },
      },
    };
    blockchainService.verifyVC = jest.fn(
      () => new Promise((resolve) => resolve(vc))
    );
    const verifiedVC = await blockchainService.verifyVC(vcJwt);
    expect(blockchainService.verifyVC).toHaveBeenCalled();
    expect(verifiedVC).toBeDefined();
    // console.log(verifiedVC);
  });
});
