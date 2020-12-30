import React from 'react'
import uploadStyle from "../styles/UploadFile.module.css"
import DisplayExtract from "./DisplayExtract.js"
import querystring from "querystring"
import cookieCutter from "cookie-cutter"

class ExtractManager extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            q: null,
            a: null,
            packets: null
        };
        this.selectA = this.selectA.bind(this);
        this.selectQ = this.selectQ.bind(this);
        this.setContent = this.setContent.bind(this);
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
    loading(bool){
        console.log("Loading = "+bool.toString());
    }
    async checkUpload(state){
        let packets = state.q && state.a;
        if (packets && confirm("Confirm?")){
            this.loading(true);
            let docId = await this.sendFiles(state);
            state.packets = await this.getPackets(docId);
            cookieCutter.set("docId", docId);
            this.loading(false);
        }
        this.setState(state);
    }
    async sendFiles(state){
        let questionForm = new FormData();
        let answerForm = new FormData();
        questionForm.append("doc", state.q);
        answerForm.append("doc", state.a);
        let url = "http://localhost:4915/api/extract/upload";
        let res = await fetch(`${url}?answer=0`,{
            method: "POST",
            body: questionForm
        });
        let resJson = await res.json();
        let docId = resJson.docId;
        await fetch(`${url}?answer=1&docId=${docId}`,{
            method: "POST",
            body: answerForm
        });
        return docId;
    }
    async getPackets(docId){
        let res = await fetch(`http://localhost:4915/api/query/review?docId=${docId}`,{
            method: "GET"
        });
        let resJson = await res.json();
        return resJson.packets;
    }
    async setContent(query, object){
        let param = querystring(query);
        let form = new FormData();
        form.append("object", JSON.stringify(object));
        await fetch(`http://localhost:4915/api/extract/set?${param}`,{
            method: "POST",
            body: form
        });
    }
    async fetchPackets(docId){
        this.loading(true);
        let packets = await this.getPackets(docId);

        this.setState({
            q: this.state.q,
            a: this.state.a,
            packets: packets
        });
        this.loading(false);
    }
    componentDidMount(){
        let docId = parseInt(cookieCutter.get("docId"));
        if (docId == 0 || docId){
            this.fetchPackets(docId);
        }
    }
    render(){
        if (this.state.packets){
            return <DisplayExtract packets={this.state.packets} categorized={false}/>
        }
        else{
            return <UploadFile selectQ={this.selectQ} selectA={this.selectA}/>
        }
    }
}

class UploadFile extends React.Component{
    render(){
        return(
            <div className={uploadStyle.uploadBox}>
                <form className={uploadStyle.formGrid}>
                    <label htmlFor="uploadQuestion">Question Booklet</label>
                    <input id="uploadQuestion" type="file" accept=".docx" onChange={this.props.selectQ}></input>
                    <label htmlFor="uploadQuestion">Marking Scheme</label>
                    <input id="uploadAnswer" type="file" accept=".docx" onChange={this.props.selectA}></input>
                </form>
            </div>
        );
    }
}
export default ExtractManager;