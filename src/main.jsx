import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";

import { Slide } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    TransitionComponent={Slide}
    preventDuplicate
  >
    <App />
  </SnackbarProvider>
);
