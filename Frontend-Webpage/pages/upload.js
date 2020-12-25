import { render } from "react-dom";
import NavBar from "../components/NavBar.js"
import Extract from "../components/Extract.js"

const uploaded = (res) => {
    console.log(res.data);
}

const UploadPage = () => {
    return(
        <div>
            <NavBar />
            <Extract uploaded={uploaded}/>
        </div>
    );
}

export default UploadPage;