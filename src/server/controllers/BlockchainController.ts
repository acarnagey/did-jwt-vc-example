import express from "express";
import BlockchainService from "../services/BlockchainService";

export default class BlockchainController {
  path = "/blockchain";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .route(`${this.path}/vc-over-eighteen`)
      .post(this.createOverEighteenVC);
    this.router.route(`${this.path}/did`).post(this.createDID);
    this.router.route(`${this.path}/issuer-did`).get(this.getIssuerDid);
  }

  createOverEighteenVC = async (req, res, next) => {
    try {
      const blockchainService = new BlockchainService();
      const jwt = await blockchainService.createOverEighteenVC({ ...req.body });
      const response = await blockchainService.verifyVC(jwt);
      res.status(200).json(response);
    } catch (err) {
      next(err); // Pass errors to Express.
    }
  };

  createDID = (_, res, next) => {
    try {
      const blockchainService = new BlockchainService();
      const account = blockchainService.createAccount();
      const did = blockchainService.createDIDByAccount(account);
      res.status(200).json(did);
    } catch (err) {
      next(err);
    }
  };

  getIssuerDid = (_, res, next) => {
    try {
      const blockchainService = new BlockchainService();
      const did = blockchainService.getIssuerDID().did;
      res.status(200).json(did);
    } catch (err) {
      next(err);
    }
  };
}
