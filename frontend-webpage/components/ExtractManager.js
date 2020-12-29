import React from 'react'
import uploadStyle from "../styles/UploadFile.module.css"
import displayStyle from "../styles/DisplayPackets.module.css"
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
    loading(){
        console.log("Loading");
    }
    async checkUpload(state){
        let packets = state.q && state.a;
        if (packets && confirm("Confirm?")){
            this.loading();
            let docId = await this.sendFiles(state);
            state.packets = await this.getPackets(docId);
            cookieCutter.set("docId", docId);
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
        let res = await fetch(`http://localhost:4915/api/extract/review?docId=${docId}`,{
            method: "GET"
        });
        let resJson = await res.json();
        return resJson.packets;
    }
    async setContent(query, object){
        let param = querystring(query);
        let form = new FormData();
        form.append("object", object);
        await fetch(`http://localhost:4915/api/extract/set?${param}`,{
            method: "POST",
            body: form
        });
    }
    render(){
        if (this.state.packets){
            return <DisplayExtract packets={this.state.packets}/>
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

class DisplayExtract extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let packetDisplayers = this.props.packets.map(packet => {
            return <DisplayPacket packet={packet} key={packet.address.packetId}/>
        });
        return(
            <div className={displayStyle.extract}>
                {packetDisplayers}
            </div>
        );
    }
}

class DisplayPacket extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let questionDisplayers = this.props.packet.questions.map(question => {
            return <DisplayQuestion question={question} key={question.address.questionId}/>
        });
        return(
            <div className={displayStyle.packet}>
                {questionDisplayers}
            </div>
        );
    }
}

class DisplayQuestion extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let contentDisplayers = this.props.question.contents.map(content => {
            let key = content.address.answer ? content.address.contentId+"_answer" : content.address.contentId+"_question";
            return <DisplayContent content={content} key={key}/>
        });
        return(
            <div className={displayStyle.question}>
                {contentDisplayers}
            </div>
        );
    }
}

class DisplayContent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let object;
        switch(this.props.content.type){
            case "text":
                object = <p>{this.props.content.object}</p>;
                break;
            case "image":
                object = <img />;
                break;
        }
        let ansStyle = this.props.content.address.answer ? displayStyle.answer : displayStyle.question;
        return(
            <div className={ansStyle + " " + displayStyle.content}>
                {object}
            </div>
        );
    }
}

export default ExtractManager;