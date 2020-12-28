import React from 'react'
import style from "../styles/UploadFile.module.css"

class ExtractManager extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            q: null,
            a: null,
            uploaded: null
        };
        this.selectA = this.selectA.bind(this);
        this.selectQ = this.selectQ.bind(this);
    }
    selectQ(e){
        let fileList = e.target.files;
        let newState = {
            q: fileList.length == 0 ? null : fileList[0],
            a: this.state.a,
            packets: null
        };
        this.checkUpload(newState);
    }
    selectA(e){
        let fileList = e.target.files;
        let newState = {
            q: this.state.q,
            a: fileList.length == 0 ? null : fileList[0],
            packets: null
        };
        this.checkUpload(newState);
    }
    loading(){
        console.log("Loading");
    }
    async checkUpload(state){
        let packets = state.q && state.a;
        if (packets && confirm("Confirm?")){
            this.loading();
            let docId = await this.sendFiles(state);
            state.packets = await getPackets(docId);
        }
        this.setState(state);
    }
    async sendFiles(state){
        let questionForm = new FormData();
        let answerForm = new FormData();
        questionForm.append("docx", state.q);
        answerForm.append("docx", state.a);
        let url = "http://localhost:4915/api/extract/upload";
        let res = await fetch(`${url}?answer=0`,{
            method: "POST",
            body: questionForm
        });
        let docId = await res.json().docId;
        await fetch(`${url}?answer=1&docId=${docId}`,{
            method: "POST",
            body: answerForm
        });
        return docId;
    }
    async getPackets(docId){
        let res = await fetch(`http://localhost:4915/api/extract/review?docId=${docId}`,{
            method: "GET"
        });
        return await res.json().packets;
    }
    render(){
        if (this.state.packets){
            return <DisplayExtract packets={this.state.packets}/>
        }
        else{
            return <UploadFile uploaded={this.props.uploaded} selectQ={this.selectQ} selectA={this.selectA}/>
        }
    }
}

class UploadFile extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={style.uploadBox}>
                <form className={style.formGrid}>
                    <label htmlFor="uploadQuestion">Question Booklet</label>
                    <input id="uploadQuestion" type="file" accept=".docx" onChange={this.props.selectQ}></input>
                    <label htmlFor="uploadQuestion">Marking Scheme</label>
                    <input id="uploadAnswer" type="file" accept=".docx" onChange={this.props.selectA}></input>
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
                <h1>Sent</h1>
            </div>
        );
    }
}

export default ExtractManager;