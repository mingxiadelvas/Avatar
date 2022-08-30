import * as React from "react";
//import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { createRoot } from 'react-dom/client';

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

//ReactDOM.render(<App />, document.getElementById("root"));