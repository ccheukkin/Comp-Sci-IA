import React from 'react'
import style from "../styles/UploadFile.module.css"

class Extract extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <UploadFile uploaded={this.props.uploaded} />
                <DisplayExtract />
            </div>
        );
    }
}

class UploadFile extends React.Component{
    constructor(props){
        super(props);
        this.sendFile = this.sendFile.bind(this);
    }
    sendFile(e){
        let decision = confirm("Confirm?");
        if (!decision){return;}
        let fileList = e.target.files;
        let file = fileList["0"]
        let formData = new FormData();
        formData.append("docx", file);
        fetch("http://localhost:4915/upload",{
            method: "POST",
            body: formData
        })
        .then(res=>res.json())
        .then(this.props.uploaded)
        .catch(err=>console.log(err));
    }
    render(){
        return(
            <div className={style.uploadBox}>
                <form>
                    <input id="uploadFile" type="file" accept=".docx" onChange={this.sendFile}></input>
                </form>
            </div>
        );
    }
}

class DisplayExtract extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>

            </div>
        );
    }
}

export default Extract;