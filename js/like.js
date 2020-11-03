
const event = () => {
    $('.img').click

    document.onscroll
}

const getheartList = () => {

    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;

    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/${sessionStorage.getItem('postId')}/likes`,
        type : 'GET',
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum+1;
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res){
            if(ajaxLastNum == ajaxCountNum - 1){
                console.log(res);
            }
        },
        error : function(err){
            console.log(err);
        },
        dataType : "json",
        contentType : "charset=utf-8"
    });
}

const getHeartSate = () => { //현재 좋아요 상태 가져오기

    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;

    let clickCount = 1;

    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/${sessionStorage.getItem('postId')}/like`,
        type : 'GET',
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum+1;
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res){
            $('.LikeIconImg').click(function() {
                clickCount = clickCount + 1; 
                if(clickCount > 1){
                    $('.likeImg').html(`<img src="/picture/Icon/heart.png">`); //빈거
                    console.log('좋아요취소');
                    clickCount--;
                } else{
                    $('.likeImg').html(`<img src="/picture/Icon/heart (2).png">`); //채운거
                    console.log('좋아요!');
                }
            });
            
        },
        error : function(err){
            console.log(err);
        },
        dataType : "json",
        contentType : "charset=utf-8"
    })
}

const heartEvent = () => { //모든 좋아요 이벤트 관리

    let clickCount = 1;

    $('.LikeIconImg').on('click', function(){
        clickCount = clickCount + 1;
        //log(clickCount);

        if(clickCount % 2 == 0){ //클릭 되었을때 이벤트
            $.ajax({
                url : "http://10.80.161.202:8080/feed/post/8/like",
                type : 'POST',
                data : JSON,
                beforeSend : function(xhr){
                    xhr.setRequestHeader("Content-type","application/json");
                    xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);                      
                },
                success : function(){
                    console.log(`좋아요 성공 :)`);
                    getHeartSate();
                },
                error: function(err){
                    console.log(err);                    
                },
                dataType : "json",
                contentType : "charset=utf-8"
            });
            
        } else if(clickCount % 2 !== 0){
            //좋아요 취소
            $.ajax({
                url : "http://10.80.161.202:8080/feed/post/8/like",
                type : 'DELETE',
                beforeSend : function(xhr){
                    xhr.setRequestHeader("Content-type","application/json");
                    xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
                },
                success : function(){
                    console.log(`좋아요 취소 :(`);
                    getHeartSate();
                },
                error : function(err){
                    console.log(err);
                    alert(err.responseText);
                },
                dataType : 'JSON',
                contentType : 'charset=utf-8'
            });
        }
    });
}

const move = () => {
    $('.postmanProfile').on('click', function(){
        window.location.assign('detailFeed.html');
    });
}

const functionInit = () => {
    heartEvent();
    getheartList();
    move();
}

$(() => {
    functionInit();
})
