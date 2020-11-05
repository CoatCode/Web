//도움을 주신분들
/*출처: https://lordpark.tistory.com/8 [The World of Web] */

const log = console.log;

const user_Information = () => {
    let ajaxCountNum = 0; //ajax가 몇번 실행되는지 카운트하는 변수
    let ajaxLastNum = ajaxCountNum; //마지막이 몇번인지 확인하는 변수

    $('#btn').click(function(){
        const formData = new FormData();
        const imageData = document.getElementById('upImgFile').files[0];

        if (!imageData) {
            formData.append('email', $('#email').val());
            formData.append('password', hex_sha512($('#pw').val()));
            formData.append('username', $('#name').val());
        } else {
            formData.append('image', imageData);
            formData.append('email', $('#email').val());
            formData.append('password', hex_sha512($('#pw').val()));
            formData.append('username', $('#name').val());
        }

        $.ajax({ //서버로 회원가입 정보 넘기기
            url : "http://10.80.161.202:8080/auth/sign-up",
            //url : 'https://coatcode.herokuapp.com/sign-up',
            type : 'POST',
            data : formData,
            processData : false,
            cache : false,
            beforeSend : function(){
                ajaxCountNum = ajaxCountNum + 1;
            },
            success : function(){
                if(ajaxLastNum == ajaxCountNum -1){
                    log(`회원가입 성공! :)`); //성공시 이메일 받기
                    alert("회원가입이 정상적으로 되었습니다. 이메일을 확인해주세요 :D");
                    setInterval(function(){
                        window.location.replace('signin.html');
                    }, 5000);
                }else{
                    alert("현재 회원가입이 되지않습니다 :( 이용에 불편을 드려서 죄송합니다.");
                }
            },
            error: function(err){
                console.log(err);
                //alert(err.responseText);//회원가입 실패사유 띄우기
            },
            dataType : "", //dataType설정
            //contentType : "application/json; charset=utf-8" //conttentType설정
            contentType : false
        });
    });   
}

$(document).ready(function(){
    user_Information();
});

/*
document.ready와 같은 함수임ㅋㅋ
$(() => {

})
*/