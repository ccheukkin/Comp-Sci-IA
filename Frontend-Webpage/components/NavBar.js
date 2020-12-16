import React from 'react'
import style from "../styles/NavBar.module.css"

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.href = this.href.bind(this);
    }
    href(name){
        alert(name);
    }
    render(){
        return(
        <div className={style.main}>
            <div className={style.logo}></div>
            <div className={style.logoWords}>Questions Sorter</div>
            <NavBarButtons name="Home" onClick={this.href}/>
            <NavBarButtons name="Upload" onClick={this.href}/>
            <NavBarButtons name="Review" onClick={this.href}/>
            <NavBarButtons name="Search" onClick={this.href}/>
        </div>
        );
    }
}

class NavBarButtons extends React.Component{
    constructor(props){
        super(props);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.state = {
            scale: 0
        };
    }
    handleEnter(){
        this.setState({
            scale: 1
        });
    }
    handleLeave(){
        this.setState({
            scale: 0
        });
    }
    render(){
        return(
            <button className={style.button}
            onClick={()=>{this.props.onClick(this.props.name)}}
            onMouseEnter={this.handleEnter}
            onMouseLeave={this.handleLeave}>
                {this.props.name}
                <NavBarColor scale={this.state.scale}/>
            </button>
        );
    }
}

function NavBarColor(props){
    let widthStyle = {transform: `scale(${props.scale}, 1)`};
    return <div className={style.color} style={widthStyle}></div>
}

export default NavBar;