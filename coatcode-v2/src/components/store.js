import react from 'react'

const StoreContent = () => {
    return(
        <div className="contentContainer">
            <div className="tumnailArea">
                <img></img>
            </div>
            <div className="contentArea">
                <span className="userName"></span>
                <div iconArea>
                    <div className="titleArea">
                        <span className="title"></span>
                    </div>
                    <div className="iconArea">
                        <span className="icon"></span>
                    </div>
                </div>
                <span className="price"></span>
            </div>
        </div>
    )
}

export default StoreContent;