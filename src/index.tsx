import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import reportWebVitals from "reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConfigProvider, App as AntApp } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import Theme, { formConfig } from "theme/index.ts";
import { ContextProvider } from "contexts/ContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
      <StyleProvider hashPriority="high">
        <ContextProvider>
          <ConfigProvider theme={Theme} form={formConfig}>
            <AntApp message={{ maxCount: 1 }} rootClassName="w-full h-full">
              <App />
            </AntApp>
          </ConfigProvider>
        </ContextProvider>
      </StyleProvider>
    </BrowserRouter>
  </HelmetProvider>
);

// Log web vitals to the console or send to an analytics endpoint.
reportWebVitals(console.log);
