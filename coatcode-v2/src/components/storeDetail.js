import react from 'react'

const StoreDetail = () => {
    return(
        <div className="contentContainer">
            <div className="imgContainer">
                <img className="tumnailPicture"></img>
            </div>
            <div className="additionalImg_Area">
                <img className="additionalImg"></img>
                <img className="additionalImg"></img>
                <img className="additionalImg"></img>
                <img className="additionalImg"></img>
                <img className="additionalImg"></img>
            </div>
            <div className="userInfo">
                <div className="profileArea">
                    <img className="profile"></img>
                </div>
                <div className="userNameArea">
                    <span className="userName"></span>
                </div>
            </div>
            <div className="goodsInfo">
                <span className="goodsName"></span>
                <span className="price"></span>
            </div>
            <div className="iconArea">
                <img className="heartIcon"></img>
                <img className="pokeIcon"></img>
            </div>
            <div className="btnArea">
                <button className="purchaseBtn"></button>
            </div>
        </div>
    );
}