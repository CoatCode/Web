import react from 'react';

const ProfileDetail = () =>{
    return(
        <div className="infoArea">
            <div className="userInfo">
                <div className="userProfileArea">
                </div>
                <div className="userContent">
                    <div className="userName_And_Follow">
                        <span className="name"></span>
                        <span className="follow follower"></span>
                        <span className="follow following"></span>
                    </div>
                    <div className="userIntroduce">
                        <span className="introduce"></span>
                    </div>
                    <div className="button-4">
                        <div className="eff-4"></div>
                    </div>
                </div>
            </div>
            <div className="disuniteLine">
                <hr></hr>
                <span>내 게시글</span>
            </div>
            <div className="myFeedArea">

            </div>
        </div>
    )
}

export default ProfileDetail;