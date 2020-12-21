import axios from "axios";

export const adapter = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default {
  blockchain: {
    createVCOverEighteen: async (name) => {
      const resp = await adapter.post("/blockchain/vc-over-eighteen", { name });
      return resp;
    },
  },
};
