import express from "express";
import BlockchainController from "../../controllers/BlockchainController";

const router = express.Router();
router.use((new BlockchainController()).router);

export default router;