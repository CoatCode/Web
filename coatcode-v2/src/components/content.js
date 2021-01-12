import react from 'react';
import './content.css'

const Content = () => {
    return(
        <div className="contentContainer">
            <div className="profileArea">
                <img></img>
            </div>
            <div className="userNameArea">
                <span className="userName"></span>
            </div>
            <div className="iconArea">
                <img className="heartIcon"></img>
                <img className="commentIcon"></img>
                <img className="moerViewICon"></img>
            </div>
            <div className="titleArea">
                <span></span>
            </div>
            <div className="tagArea">
                <span></span>
            </div>
        </div>
    );
}

export default Content;