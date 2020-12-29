import React from 'react'
import displayStyle from "../styles/DisplayPackets.module.css"
import loadingStyle from "../styles/LoadingScreen.module.css"
import cookieCutter from "cookie-cutter"

class CategorizeManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            packets: null
        };
    }
    componentDidMount(){
        this.setUpPage();
    }
    async setUpPage(){
        let docId = parseInt(cookieCutter.get("docId"));
        if (!docId && docId != 0){ return; }
        await this.categorize(docId);
        let packets = await this.getPackets(docId);
        this.setState({packets});
    }
    async categorize(docId){
        await fetch(`http://localhost:4915/api/extract/done?docId=${docId}`,{
            method: "GET"
        });
    }
    async getPackets(docId){
        let res = await fetch(`http://localhost:4915/api/categorize/review?docId=${docId}`,{
            method: "GET"
        });
        let resJson = res.json();
        return resJson.packets();
    }
    render(){
        if (this.state.packets){
            return <DisplayCategory packets={this.state.packets}/>;
        }
        else{
            return <LoadingScreen />;
        }
    }
}

class LoadingScreen extends React.Component{
    render(){
        return(
            <div className={loadingStyle.loadingBox}>
                Loading...
            </div>
        );
    }
}

class DisplayCategory extends React.Component{
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

export default CategorizeManager;