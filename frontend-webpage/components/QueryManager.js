import React from 'react'
import {DisplayPacket as DisplayPacket} from "./DisplayExtract.js"
import queryStyle from "../styles/QueryStyle.module.css"

class QueryManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            questions: []
        }
        this.search = this.search.bind(this);
    }
    async search(categories, mode){
        let questions = await this.getQuestions(categories, mode);
        this.setState({questions});
    }
    async getQuestions(categories, mode){
        let options = {categories, mode};
        console.log({options});
        let res = await fetch("http://localhost:4915/api/query/get",{
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({options})
        });
        let resJson = await res.json();
        return resJson.questions;
    }
    render(){
        let list = null;
        if (this.state.questions && this.state.questions.length != 0){
            let fakePacket = {questions: this.state.questions};
            list = <DisplayPacket packet={fakePacket} categorized={false}/>;
        }
        return(
            <div className={queryStyle.page}>
                <QueryBox categories={this.props.categories} search={this.search}/>
                {list}
            </div>
        );
    }
}
class QueryBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            topic: {
                hovered: null,
                selected: []
            },
            mode: {
                hovered: null,
                selected: "OR"
            }
        }
        this.handleTopicEnter = this.handleTopicEnter.bind(this);
        this.handleTopicExit = this.handleTopicExit.bind(this);
        this.handleTopicClick = this.handleTopicClick.bind(this);
        this.handleModeEnter = this.handleModeEnter.bind(this);
        this.handleModeExit = this.handleModeExit.bind(this);
        this.handleModeClick = this.handleModeClick.bind(this);
    }
    handleTopicEnter(cat){
        this.setState({
            topic:{
                hovered: cat,
                selected: this.state.topic.selected,
            },
            mode: this.state.mode
        });
    }
    handleTopicExit(cat){
        if (this.state.topic.hovered == cat){
            this.setState({
                topic: {
                    hovered: null,
                    selected: this.state.topic.selected,
                },
                mode: this.state.mode
            });
        }
    }
    handleTopicClick(cat){
        let delIndex = this.state.topic.selected.indexOf(cat);
        if (delIndex >= 0){
            this.setState({
                topic: {
                    hovered: this.state.topic.hovered,
                    selected: [...this.state.topic.selected.slice(0,delIndex), ...this.state.topic.selected.slice(delIndex+1)],
                },
                mode: this.state.mode
            });
        }
        else{
            this.setState({
                topic: {
                    hovered: this.state.topic.hovered,
                    selected: this.state.topic.selected.concat([cat]),
                },
                mode: this.state.mode
            });
        }
    }
    handleModeEnter(mode){
        this.setState({
            topic: this.state.topic,
            mode: {
                hovered: mode,
                selected: this.state.mode.selected
            }
        });
    }
    handleModeExit(mode){
        if (mode == this.state.mode.hovered){
            this.setState({
                topic: this.state.topic,
                mode: {
                    hovered: null,
                    selected: this.state.mode.selected
                }
            });
        }
    }
    handleModeClick(mode){
        this.setState({
            topic: this.state.topic,
            mode: {
                hovered: this.state.mode.hovered,
                selected: mode
            }
        });
    }
    render(){
        return(
            <div className={queryStyle.queryBox}>
                <div className={queryStyle.title}>Topic:</div>
                <Criteria
                    categories={this.props.categories}
                    state={this.state.topic}
                    color="green"
                    handleClick={this.handleTopicClick}
                    handleEnter={this.handleTopicEnter}
                    handleExit={this.handleTopicExit}
                />
                <div className={queryStyle.title}>Mode:</div>
                <Criteria
                    categories={["OR", "AND"]}
                    state={this.state.mode}
                    color="blue"
                    handleClick={this.handleModeClick}
                    handleEnter={this.handleModeEnter}
                    handleExit={this.handleModeExit}
                />
                <div className={queryStyle.center}>
                    <button className={queryStyle.search} onClick={()=>this.props.search(this.state.topic.selected, this.state.mode.selected)}>
                        Search
                    </button>
                </div>
            </div>
        );
    }
}
class Criteria extends React.Component{
    render(){
        let selections = this.props.categories.map(cat => {
            let selected = this.props.state.selected.includes(cat);
            let hovered = this.props.state.hovered == cat;
            let buttonState = selected ? "selected" : hovered ? "hovered" : "normal";
            return(
                <Select
                    name={cat}
                    color={this.props.color}
                    onClick={()=>this.props.handleClick(cat)}
                    onEnter={()=>this.props.handleEnter(cat)}
                    onExit={()=>this.props.handleExit(cat)}
                    buttonState={buttonState}
                    key={cat}
                />
            );
        });
        return(
            <div className={queryStyle.criteriaRow}>
                {selections}
            </div>
        );
    }
}
class Select extends React.Component{
    render(){
        let stateStyle = queryStyle[this.props.buttonState];
        let backColor = queryStyle[this.props.color];
        return(
            <div className={queryStyle.mainBox}>
                <div className={queryStyle.frontBox+" "+stateStyle} onClick={this.props.onClick} onMouseEnter={this.props.onEnter} onMouseLeave={this.props.onExit}>{this.props.name}</div>
                <div className={queryStyle.backContainer}>
                    <div className={queryStyle.backBox+" "+stateStyle+" "+backColor}></div>
                </div>
            </div>
        );
    }
}
export default QueryManager;