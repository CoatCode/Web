import react from 'react';
import './detail.js';

const Detail = () => {
    return (
        <div className="DetailContainer">
            <div className="contentImg">
                <img></img>
            </div>
            <imput/>
            <div className="contentArea">
                <div className="title_And_IconArea">
                    <div className="title"></div>
                    <div className="icon">
                        <img></img>
                    </div>  
                </div>
                <div className="explanationArea">
                    <span></span>
                </div>
                <div className="tagArea">
                    <span></span>
                </div>
            </div>
            <div className="commentArea">
                <div className="userProfileArea">
                    <img></img>
                </div>
                <div className="userInfoArea">
                    <div className="userName">
                        <span></span>
                    </div>
                    <div className="comment">
                        <span></span>
                    </div>
                </div>
                <div className="icon">
                    <img/>
                </div>
            </div>
        </div>
    )
}

export default Detail;