import  ReactDOM  from "react-dom";
import { App } from "./App";
import { Auth } from "./Component/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.render(<GoogleOAuthProvider clientId="422396320187-bcqbenbc960am3k6k8oaifv58ppr1a0v.apps.googleusercontent.com"><Auth><App/></Auth></GoogleOAuthProvider>,document.getElementById("kunal"))