import React from "react";
import displayStyle from "../styles/DisplayPackets.module.css"

class DisplayExtract extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let packetDisplayers = this.props.packets.map(packet => {
            return <DisplayPacket packet={packet} key={packet.address.packetId} categorized={this.props.categorized}/>
        });
        return(
            <div className={displayStyle.extract}>
                {packetDisplayers}
            </div>
        );
    }
}

class DisplayPacket extends React.Component{
    render(){
        let questionDisplayers = this.props.packet.questions.map(question => {
            return <DisplayQuestion question={question} key={question.address.questionId} categorized={this.props.categorized}/>
        });
        return(
            <div className={displayStyle.packet}>
                {questionDisplayers}
            </div>
        );
    }
}

class DisplayQuestion extends React.Component{
    render(){
        let contentDisplayers = this.props.question.contents.map(content => {
            let key = content.address.answer ? content.address.contentId+"_answer" : content.address.contentId+"_question";
            return <DisplayContent content={content} key={key}/>
        });
        let categories = this.props.categorized ? <DisplayCategories categories={this.props.question.categories} /> : null;
        return(
            <div className={displayStyle.question}>
                {contentDisplayers}
                {categories}
            </div>
        );
    }
}

class DisplayContent extends React.Component{
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
        let ansStyle = this.props.content.address.answer ? displayStyle.a : displayStyle.q;
        return(
            <div className={ansStyle + " " + displayStyle.content}>
                {object}
            </div>
        );
    }
}

class DisplayCategories extends React.Component{
    render(){
        let categories = this.props.categories.map(category=>{
            return <li key={category}>{category}</li>
        });
        return(
            <div className={displayStyle.categories}>
                <ul>
                    {categories}
                </ul>
            </div>
        );
    }
}
export {DisplayExtract as default, DisplayPacket as DisplayPacket };