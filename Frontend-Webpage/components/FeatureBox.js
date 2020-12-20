import React from 'react'
import style from "../styles/FeatureBox.module.css"

class FeatureBox extends React.Component{
    render(){
        let align = this.props.index % 2 == 0 ? "right" : "left";
        let classNames = style.featureBox + " " + style[this.props.name] + " " + style[align];
        return(
            <div className={classNames}>
                <div className={style.column}>
                    <div className={style.big}>{this.props.title}</div>
                    <div className={style.space}></div>
                    <div className={style.small}>{this.props.description}</div>
                    <div className={style.space}></div>
                    <a className={style.link} href={this.props.link}><div className={style.button}>Try it now</div></a>
                </div>
            </div>
        );
    }
}

export default FeatureBox;