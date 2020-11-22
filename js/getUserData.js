
const getUserData = () => {

    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;

    $.ajax({
        // url : "http://10.80.161.202:8080/user",
        url : "https://coatcode.herokuapp.com/user",
        type : "GET",
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum+1;
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res){
            console.log(res);
            saveUserData(res);
            console.log(res.profile);
            // res.map((data) => { 배열형태가 아니라 object 형태임 !
                $('.headContainer').append(`
                    <div class="head">
                        <a href="feedPage.html">
                            <h2>coco</h2>
                        </a>
                        <div class="search">
                            <input type="text" placeholder="  search">
                        </div>
                        <div class="profile">
                            <a href="profileDetail.html?userId=${res.id}">
                                <img src="${res.profile}" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="line">
                        <hr>
                    </div>
                    <nav>
                        <div class="nav">
                            <ul class="navContainer">
                                <li><a class="allMenu" href="#">전체</a></li>
                                <li><a class="popMenu" href="#">인기</a></li>
                                <li><a class="followMenu" href="#">팔로우</a></li>
                                <li><a class="storeMenu" href="#">스토어</a></li>
                            </ul>
                        </div>
                    </nav>
                `);

            // });
        },
        error : function(res){
            console.log(res);
        }
    });
    
}

const saveUserData = (res) => {
    sessionStorage.setItem('description', res.description);
    sessionStorage.setItem('id', res.id);
    sessionStorage.setItem('email', res.email);
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('followers', res.followers);
    sessionStorage.setItem('following', res.following);
}

const functionEX = () => {
    getUserData();
}

$(() => {
    functionEX();
})
