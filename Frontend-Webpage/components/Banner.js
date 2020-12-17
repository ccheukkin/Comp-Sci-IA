import React from 'react'
import style from "../styles/Banner.module.css"

class Banner extends React.Component{
    render(){
        return(
            <div className={style.bannerBox}>
                <div class="container"><div class="logoBig"></div></div>
                <div class="big">Questions Sorter</div>
                <div class="small">Scroll down to know what you can do in this website</div>
                <div class="container"><a href="#jump"><div class="arrow"></div></a></div>
            </div>
        );
    }
}

export default Banner;