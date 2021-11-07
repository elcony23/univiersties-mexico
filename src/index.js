import ReactDOM from "react-dom";
import App from "./App";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function ReactRoot() {
    return <App />;
}

ReactDOM.render(<ReactRoot />, document.getElementById("root"));
