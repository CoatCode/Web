const log = console.log;

const sendUser_Information = () => {
    let ajaxCountNum = 0; //ajax가 몇번 실행되는지 카운트하는 변수
    let ajaxLastNum = ajaxCountNum; //마지막이 몇번인지 확인하는 변수
    let token;
    let expiresAt;
    let refreshExpiresAt;

    $('#joinBtn').click(function(){ //로그인 버튼 눌렀을때
        const userData = {
            email : $('#email').val(),
            password : hex_sha512($('#pw').val()),
            token : sessionStorage.getItem("userAccessToken")
        }
        
        //log(userData);

        $.ajax({
            //url : "http://10.80.161.202:8080/auth/login",
            url : "https://coatcode.herokuapp.com/auth/login",
            type : 'POST',
            data : JSON.stringify(userData),
            beforeSend : function(){
                ajaxCountNum = ajaxCountNum+1;
            },
            success : function(res){
                log(res);
                if(ajaxLastNum == ajaxCountNum -1){
                    token = res.access_token;
                    expiresAt = res.expires_at;
                    log(`로그인 성공! :)`);
                    
                    //로그인 성공시 세션에 유저정보 저장
                    sessionStorage.setItem("userAccessToken", token);
                    sessionStorage.setItem("tokenExpirationPeriod", expiresAt);
                    
                    //로그인시 세션에 있는 토큰을 서버에 보냄

                    $.ajax({
                        url : "http://10.80.161.202:8080/user",
                        //url : "https://coatcode.herokuapp.com/user",
                        type : "GET",
                        beforSend : function(xhr){
                            ajaxCountNum = ajaxCountNum+1;
                            xhr.setRequestHeader("Content-type","application/json");
                            xhr.setRequestHeader("Authorization",`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAzNzkxNTI1LCJqdGkiOiI0ODgzMGRkYjIxM2I0NjZiYjE3OGFmYWE5YzQyOTA4MSIsInVzZXJfaWQiOjR9.s6APXruSnRJdGUiorO3rE8uzMu8bod7Vg-tKlG4v2Qo`);
                        },
                        success : function(res){
                            console.log(res);
                            //saveUserData();
                            saveUserData(res);
                        },
                        error : function(res){
                            console.log(res);
                        }
                    });           

                    //window.location.replace('feedPage.html');  
                }
                else{
                    //엑세스토큰 만료시 리프레시 토큰을 받아옴
                    token = res.refresh_token;
                    refreshExpiresAt = refresh_token_expires_at;
                     
                    //받아온 리프레시 토큰을 세션에 저장함
                    sessionStorage.setItem("userRefreshToken", refresh);
                    sessionStorage.setItem("reTokenExpirationPeriod", refreshExpiresAt);
                    
                    //엑세스토큰 만료시 리프리시 토큰을 보내 엑세스토큰 재발급을 받음
                    $.ajax({
                        url : "http://10.80.161.202:8080/auth/renewal-token",
                        //url : 'https://coatcode.herokuapp.com/renewal-token',
                        type : 'POST',
                        data : sessionStorage.getItem("userRefreshToken"),
                        beforeSend : function(){
                            ajaxCountNum = ajaxCountNum+1;
                        },
                        dataType : 'JSON',
                        contentType : "application/json; charset=utf-8",
                    })

                }
            },
            error: function(err){
                //console.log(err);
                alert("이메일또는 비밀번호를 확인해주세요");
            },
            dataType : 'JSON',
            contentType : "application/json; charset=utf-8",
        });
    })
}

const saveUserData = () => {
    sessionStorage.setItem('id', res.id);
    sessionStorage.setItem('email', res.email);
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('followers', res.followers);
    sessionStorage.setItem('following', res.following);
}

$(function() {
    sendUser_Information();
});