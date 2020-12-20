import { render } from "react-dom";
import NavBar from "../components/NavBar.js"
import UploadFile from "../components/UploadFile.js"

const uploaded = (res) => {
    console.log(res.data);
}

const Upload = () => {
    return(
        <div>
            <NavBar />
            <UploadFile uploaded={uploaded}/>
        </div>
    );
}

export default Upload;