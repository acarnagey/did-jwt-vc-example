import express from "express";
import BlockchainService from "../services/BlockchainService";

export default class BlockchainController {
  path = "/blockchain";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.route(`${this.path}/vc-over-eighteen`).post(this.createOverEighteenVC);
  }

  createOverEighteenVC = async (req, res, next) => {
    try {
      const blockchainService = new BlockchainService();
      const jwt = await blockchainService.createOverEighteenVC(req.body.name);
      const response = await blockchainService.verifyVC(jwt);
      res.status(200).json(response);
    } catch (err) {
      next(err); // Pass errors to Express.
    }
  };
}
