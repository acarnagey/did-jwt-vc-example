import { configure } from "enzyme";
// https://github.com/enzymejs/enzyme/issues/2429
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { JSDOM } from "jsdom";

const jsdom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});
const { window } = jsdom;

(global as any).window = window;
(global as any).document = window.document;

configure({ adapter: new Adapter() });
