const log = console.log;

let ajaxCountNum = 0; //ajax가 몇번 실행되는지 카운트하는 변수
let ajaxLastNum = ajaxCountNum; //마지막이 몇번인지 확인하는 변수
let clickCount = 1;

const writeComment = () => {
    let postId = getCommentPar('id');

    $('.submitBtn').click(function(){
        const comment = {
            content : $('#commentBox').val(),
        };

        $.ajax({
            url : `http://10.80.161.202:8080/feed/post/${postId}/comment`,
            type : 'POST',
            data : JSON.stringify(comment),
            beforeSend : function(xhr){
                ajaxCountNum = ajaxCountNum+1;
                xhr.setRequestHeader("Content-type","application/json");
                xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
            },
            success : function(){
                log('성공');
            },
            error : function(res){
                log(res);
            },
            dataType : 'JSON',
            contentType : "application/json; charset=utf-8",
        });

        log(comment);

        window.location.reload();
    });   
}

const showPostmanInfo = () => {
    $.ajax({
        url : ``,
        success : function(res){
            res.map((data) => {
                $('.commentArea').append(`
                <div class="postManProfileInfo">
                    <div class="postManProfileImg">
                        <img src="" alt="">
                    </div>
                    <div class="postManName">
                        <span></span>
                    </div>
                </div>
                <div class="disuniteLine">
                    <hr>
                </div>
                `);
            });
        }
    });
}

const showComment = () => {
    let postId = getCommentPar('id');

    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/${postId}/comments`,
        tpye : 'GET',
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum + 1;
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res){
            console.log('성공');
            console.log(res);
            //getCommentTime(res);
            res.map((data) => {
                $('.viewCommentArea').append(`
                    <div>
                        <div class="commenterProfile">
                            <img src="${data.owner.profile}">
                        </div>
                        <div class="commenter">
                            <div class="name">
                                <span>${data.owner.username}</span> 
                            </div>
                            <div class="comment">
                                <span>${data.content} ${getCommentTime(data.created_at)}</span>
                            </div>
                            </div>
                        <div class="commetMoreView">
                            <img class="moreView" src="/picture/Icon/more.png" alt="">
                        </div>
                    </div>
                `
                );
            });
        },
        error : function(res){
            console.log(res);
        },
        dataType : 'json',
        contentType : "application/json; charset=utf-8",
    });
}

// const modifyComment = () => {

//     $('.modifyCommentBtn').click(function(){
//         const comment = {
//             content : $('#commentBox').val(),
//         };

//             $.ajax({
//                 //url : 'BASE_URL/feed/post/{post-id}/comment/{comment-id}'
//                 url : `http://10.80.161.202:8080/feed/post/${postId}/comment/${commentId}`,
//                 type : 'PUT',
//                 data : JSON.stringify(comment),
//                 beforeSend : function(xhr){
//                     ajaxCountNum = ajaxCountNum + 1;
//                     xhr.setRequestHeader('Content-type', 'application/json');
//                     xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('userAccessToken')}`);    
//                 },
//                 success : function(){
//                     console.log('성공');
//                 },
//                 error : function(res){
//                     console.log(res);
//                 },
//                 dataType : 'JSON',
//                 contentType : 'application/json; charset=utf-8'
//             });
//     });
// }

const deleteComment = () => {
    let postId = getCommentPar('id');
    let commentId = getCommentPar('comment_id');

    $('.deleteCommentBtn').click(function(){        
        $.ajax({
            url : `http://10.80.161.202:8080/feed/post/${postId}/comment/${commentId}`,
            type : 'DELETE',
            beforeSend : function(xhr){
                ajaxCountNum = ajaxCountNum + 1;
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('userAccessToken')}`);    
            },
            success : function(){
                console.log('성공');
            },
            error : function(res){
                console.log(res);
            },
            dataType : 'JSON',
            contentType : 'application/json; charset=utf-8'
        });
    });
}

const getCommentTime = (timeValue) => {
    const today = new Date();
    const gap = today.getTime();
    const testYear = today.getFullYear(); // 년도
    const testMonth = today.getMonth() + 1;  // 월
    const testDate = today.getDate();  // 날짜

    const testVal = [ testYear, '.', 
    (testMonth > 9 ? '' : '0') + testMonth, '.',
    (testDate > 9 ? '' : '0') + testDate].join('');

    const dateObject = new Date(timeValue);
    const year = dateObject.getFullYear();
    const mount = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    
    const val = [ year, '.', 
    (mount > 9 ? '' : '0') + mount, '.',
    (day > 9 ? '' : '0') + day].join('');

    log('과연?', testVal, val ,testVal === val);

    if(testVal === val) {
        const hour = dateObject.getHours();
        const min = dateObject.getMinutes();
        const second = dateObject.getDate();

        return [(hour > 9 ? '' : '0') + hour, ':' , 
        (min > 9 ? '' : '0') + min, ':', 
        (second > 9 ? '' : '0') + second].join('');
    } else {
        return val;
    }
}

const getCommentPar = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const functionEXE = () => {
    writeComment();
    showComment();
    //modifyComment();
    deleteComment();
}

functionEXE();