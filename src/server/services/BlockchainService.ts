import EthrDID from "ethr-did";
import {
  JwtCredentialPayload,
  createVerifiableCredentialJwt,
  verifyCredential,
} from "did-jwt-vc";
import Web3 from "web3";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import dotenv from "dotenv";

dotenv.config();

export default class BlockchainService {
  // https://github.com/decentralized-identity/ethr-did-resolver#multi-network-configuration
  // https://github.com/uport-project/ethr-did-registry#contract-deployments
  providerConfig = {
    name: "ropsten",
    registry: "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b",
    rpcUrl: process.env.INFURA_URI!,
  };
  resolver = new Resolver(getResolver(this.providerConfig));
  web3: Web3 = new Web3(
    new Web3.providers.HttpProvider(this.providerConfig.rpcUrl)
  );

  createAccount() {
    const account = this.web3.eth.accounts.create();
    return account;
  }

  createDID(address, privateKey) {
    const ethrDID = new EthrDID({
      address,
      privateKey,
      registry: this.providerConfig.registry,
      provider: this.web3.givenProvider,
      web3: this.web3,
      rpcUrl: this.providerConfig.rpcUrl,
    });
    return ethrDID;
  }

  createDIDByAccount(account: any) {
    const privKeyWithoutHeader = account.privateKey.substring(2);
    const ethrDID = new EthrDID({
      address: account.address,
      privateKey: privKeyWithoutHeader,
      registry: this.providerConfig.registry,
      provider: this.web3.givenProvider,
      web3: this.web3,
      rpcUrl: this.providerConfig.rpcUrl,
    });
    return ethrDID;
  }

  async createVC(credentialSubject) {
    const issuer: any = this.createDIDByAccount(this.createAccount());
    const subject: any = this.createDIDByAccount(this.createAccount());
    const vcPayload: JwtCredentialPayload = {
      sub: subject.did,
      nbf: Math.floor(Date.now() / 1000),
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential"],
        credentialSubject,
      },
    };
    const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);
    return vcJwt;
  }

  async createOverEighteenVC(name) {
    const credentialSubject = {
      ofAge: {
        type: "OverEighteen",
        name
      },
    };
    return this.createVC(credentialSubject);
  }

  async verifyVC(vcJwt) {
    const verifiedVC = await verifyCredential(vcJwt, this.resolver);
    return verifiedVC;
  }
}
