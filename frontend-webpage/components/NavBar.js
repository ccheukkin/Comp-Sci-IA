import React from 'react'
import style from "../styles/NavBar.module.css"
import Link from 'next/link'

class NavBar extends React.Component{
    render(){
        return(
        <div className={style.main}>
            <div className={style.logo}></div>
            <div className={style.logoWords}>QueCat</div>
            <Link href="/"><a className={style.link}><NavBarButtons name="Home"/></a></Link>
            <Link href="/extraction"><a className={style.link}><NavBarButtons name="Upload"/></a></Link>
            <Link href="/categorizing"><a className={style.link}><NavBarButtons name="Categorize"/></a></Link>
            <Link href="/querying"><a className={style.link}><NavBarButtons name="Search"/></a></Link>
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