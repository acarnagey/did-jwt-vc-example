import axios from "axios";
import VCOverEighteenRequest from "./models/VCOverEighteenRequest";

export const adapter = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});


export default {
  blockchain: {
    createVCOverEighteen: async (req: VCOverEighteenRequest) => {
      const resp = await adapter.post("/blockchain/vc-over-eighteen", req);
      return resp;
    },
    createDID: async () => {
      const resp = await adapter.post("/blockchain/did");
      return resp;
    },
    getIssuerDID: async () => {
      const resp = await adapter.get("/blockchain/issuer-did");
      return resp;
    }
  },
};
