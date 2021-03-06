import React from 'react'
import DisplayExtract from "./DisplayExtract.js"
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
        await fetch(`http://localhost:4915/api/categorize/start?docId=${docId}`,{
            method: "GET"
        });
    }
    async getPackets(docId){
        let res = await fetch(`http://localhost:4915/api/query/review?docId=${docId}`,{
            method: "GET"
        });
        let resJson = await res.json();
        return resJson.packets;
    }
    async setCategories(query, categories){
        let param = querystring(query);
        let form = new FormData();
        form.append("categories", JSON.stringify(categories));
        await fetch(`http://localhost:4915/api/categorize/set?${param}`,{
            method: "POST",
            body: form
        });
    }
    render(){
        if (this.state.packets){
            return <DisplayExtract packets={this.state.packets} categorized={true} />;
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

export default CategorizeManager;