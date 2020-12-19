import App from "../universal/components/App";
import React from "react";
import { renderToString } from "react-dom/server";
import template from "./template";

export default function render(_, res) {
  const html = renderToString(<App />);
  res.status(200).send(template(html));
}
