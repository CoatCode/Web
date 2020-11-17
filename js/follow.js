const log = console.log();

let isFollowed = false;

const followClickEvent = () => {

    $('.button-4').click(function() {
        //ajax
        //ui 처리
        changeBtn();
        if (isFollowed === false) {
            userFollow();   
        } else {
            unFollow();
        }
        profileHeader();
    });
}

const changeBtn = () => {
    if (isFollowed === false) {
        $('.button-4').html(`
            <div class="eff-4"></div>
            <a href="#">팔로우 하기</a>
        `);
    } else {
        $('.button-4').html(`
            <div class="eff-4"></div>
            <a href="#">팔로우 취소</a>
        `);
    }
}

const profileHeader = () => {
    $.ajax({
        url : `http://10.80.161.202:8080/user/${getUserId('userId')}/posts`,
        //url : 
        type : 'GET',
        //팔로우가 되었는걸 get하는게 오류뜸
        beforeSend : function(xhr){
            // ajaxCountNum = ajaxCountNum + 1;
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res){
            console.log('성공');
            console.log(res);
            // //getCommentTime(res);
            res.map(({owner}) => {
                $('.userProfileArea').html(`
                    <img class="userProflie" src="${owner.image}" alt="" user-id="${owner.id}">
                `);

                $('.name').html(`
                    <span>${owner.username}</span>
                `);

                $('.follower').html(`
                    <span>팔로워 ${owner.followers}</span>
                `);

                $('.following').html(`
                    <span>팔로잉 ${owner.following}</span>
                `);
            });
        },
        error : function(res){
            console.log(res);
        },
        dataType : 'json',
        contentType : "application/json; charset=utf-8",
    });
}

const profileContent = () => {
    $.ajax({
        url : `http://10.80.161.202:8080/user/${getUserId('userId')}/posts`,
        //url : 
        type : 'GET',
        beforeSend : function(xhr){
            // ajaxCountNum = ajaxCountNum + 1;
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res){
            console.log('성공');
            console.log(res);
            // //getCommentTime(res);
            res.map(({image_urls, id}) => {
                $('.myWriteFeedArea').append(`
                    <div class="feedImg" img-id="$${id}">
                        <img src="${image_urls[0]}">
                    </div>
                `);
            });
        },
        error : function(res){
            console.log(res);
        },
        dataType : 'json',
        contentType : "application/json; charset=utf-8",
    });
}

$(() => {
    followState();
    profileHeader();
    profileContent();
    followClickEvent();
    changeBtn();
})

const getUserId = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const userFollow = () => {
    //팔로우클릭시
    $.ajax({
        url : `http://10.80.161.202:8080/user/${getUserId('userId')}/follow`,
        type : 'post',
        beforeSend : function(xhr){
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res){
            console.log(res);
            isFollowed = true;
            changeBtn();
        },
        error : function(res){
            console.log(res);
        },
        dataType : 'JSON',
        contentType : 'application/json; charset=utf-8'
    });
}

const unFollow = () => {
    $.ajax({
        url : `http://10.80.161.202:8080/user/${getUserId('userId')}/follow`,
        type : 'DELETE',
        beforeSend : function(xhr){
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('userAccessToken')}`);    
        },
        success : function(res){
            console.log(res);
            isFollowed = false;
            changeBtn();
        },
        error : function(err){
            console.log(err);   
        },
        dataType : 'JSON',
        contentType : 'application/json; charset=utf-8'
    });
}

const followState = () => {
    $.ajax({
        url : `http://10.80.161.202:8080/user/${getUserId('userId')}/follow`,
        type : 'GET',
        beforeSend : function(xhr){
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res) {
            console.log(res);
            isFollowed = true;
        },
        error : function(res){
            console.log(res);
            isFollowed = false;
        },
        async: false,
        dataType : 'JSON',
        contentType : 'application/json; charset=utf-8'
    });
}