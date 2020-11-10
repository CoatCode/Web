//const log = console.log();
//owner.img(글쓴사람 프로필) 안나옴, commentPreview(댓글 미리보기) 이상함
//글쓰기에서 파라미터가 없다고뜨거나 / 오류가 안뜸;; (글쓰기가 안됨)
//map 으로 해더쪽 띄우기 안됨 (사용자 프로필 띄우기)
//res(json값)에서 id만 때오기 (서버에 보낼 url 에 넣을 postid 를 받아오기 위함)
//이미지 업로드후 미리보기 띄우기 // 글쓰기 & 회원가입
const model = {
    products: [],
    search: "",
    productName: []
}

let getId = 1;

const getFeed = (id) => {
    $.ajax({
        url: `http://10.80.161.202:8080/feed/post/all?${id}`,
        type: 'GET',
        success: function(res) {            res.map(({id, owner, image_urls, title, content, tag, comment_preview}) => {  
                $('.feedArea').append(`
                 <div class='feed'>
                     <div class='feedHead'>
                         <div class='postmanProfile'>
                                 <img src= "${owner.image}">                     
                         </div>
                         <div class='postmanName'>
                             <div class= 'postmanNameText'>${owner.username}</div>
                         </div                     
                    </div>
                     <div class='disuniteLine'>
                         <hr>
                     </div>
                     <div class="feedThumbanil">
                         <div class="thumbanilImg">
                             <a href="detailFeed.html?id=${id}">
                                 <img class="ImgArea" src="${image_urls}" alt="">
                             </a>
                         </div>
                     </div>
                     <div class="disuniteLine">
                         <hr>
                     </div>
                     <div class='feedLike_And_Comment'>
                         <div class='LikeIconImg like-${id}' feedId="${id}">

                         </div>
                         <div class="CommentIconImg">
                             <img class="commentImg" src="/picture/Icon/chat-box.png" alt="#">
                         </div>
                         <div class="viewMoreArea">
                             <img class="view_more" src="/picture/Icon/more.png">
                         </div>
                     </div>
                     <div class='title'>
                         <h2>
                             ${title}
                         </h2>
                     </div>
                     <div class='content'>
                         <span>
                             ${content}
                         </span>
                     </div>
                     <div class='tag'>
                         <h4>
                             ${tag}
                         </h4>
                     </div>
                     <div class="feedComment">
                        ${Object.keys(comment_preview[0].owner)   
                            .map(key => (key+":"+comment_preview[0].owner[key]))
                        }    
                    </div> 
                `);
            })   
        },
        error : function(err){
            console.log(err);
        },
        async: false    
    })
}

// const getFeed = () => {

//     let ajaxCountNum = 0;
//     let ajaxLastNum = ajaxCountNum;

//     $.ajax({
//         url : `http://10.80.161.202:8080/feed/post/all?${getId}`,
//         type : 'GET',
//         beforeSend : function(xhr){
//             ajaxCountNum = ajaxCountNum+1;
//         },
//         success : function(res){
//             console.log('게시물 불러오기 성공');
//             console.log(res);
        
//             res.map(({id, owner, image_urls, title, content, tag, comment_preview}) => {  
//                 console.log(comment_preview);      
//                 $('.feedArea').append(`
//                 <div class='feed'>
//                     <div class='feedHead'>
//                         <div class='postmanProfile'>
//                                 <img src= "${owner.image}">                     
//                         </div>
//                         <div class='postmanName'>
//                             <div class= 'postmanNameText'>${owner.username}</div>
//                         </div>
//                     </div>
//                     <div class='disuniteLine'>
//                         <hr>
//                     </div>
//                     <div class="feedThumbanil">
//                         <div class="thumbanilImg">
//                             <a href="detailFeed.html?id=${id}">
//                                 <img class="ImgArea" src="${image_urls}" alt="">
//                             </a>
//                         </div>
//                     </div>
//                     <div class="disuniteLine">
//                         <hr>
//                     </div>
//                     <div class='feedLike_And_Comment'>
//                         <div class='LikeIconImg like-${id}' feedId="${id}">

//                         </div>
//                         <div class="CommentIconImg">
//                             <img class="commentImg" src="/picture/Icon/chat-box.png" alt="#">
//                         </div>
//                         <div class="viewMoreArea">
//                             <img class="view_more" src="/picture/Icon/more.png">
//                         </div>
//                     </div>
//                     <div class='title'>
//                         <h2>
//                             ${title}
//                         </h2>
//                     </div>
//                     <div class='content'>
//                         <span>
//                             ${content}
//                         </span>
//                     </div>
//                     <div class='tag'>
//                         <h4>
//                             ${tag}
//                         </h4>
//                     </div>
//                     <div class="feedComment">
//                         ${commentLayout(comment_preview)}
//                     </div>
//                 </div> 
//                 `);
                
//                 getHeartState(id);
//             });
//         },
//         error : function(err){
//             console.log(err);
//         }
//     });

//     getId++; //2
 
//     // $(window).scroll(function(){
//     //     let $window = $(this);
//     //     let scrollTop = $window.scrollTop();
//     //     let windowHeight = $window.height();
//     //     let documentHeight = $(document).height();
        
//     //     //getId++;
//     //     //console.log("documentHeight:" + documentHeight + " | scrollTop:" + scrollTop + " | windowHeight: " + windowHeight );
        
//     //     if( scrollTop + windowHeight + 5 > documentHeight ){
//     //         getFeed();  
//     //     }
//     // })
// }

const commentLayout = (data, length) => {
    // console.log(length);
    let html = ``;
    console.log(data);
    for (let i = 0; i < 2; i++) {
        console.log(data[i]);
        // html += `

        // `;
    }

    // $('.feedComment').html(html);
}

const getHeartState = (id) => {
    console.log(id);
    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/${id}/like`,
        type : 'GET',
        beforeSend : function(xhr){
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res) {
            console.log(res);
            $(`.like-${id}`).html(`
                <img src="/picture/Icon/heart (2).png" likeType="true"> 
            `);
        },
        error : function(err){
            console.log(err);
            $(`.like-${id}`).html(`
                <img src="/picture/Icon/heart.png">
            `);  
        },
        async: false,
        dataType : "json",
        contentType : "charset=utf-8"
    })
}

const heartEvent = () => { //모든 좋아요 이벤트 관리
    $(document).on('click', '.LikeIconImg', function() {
        likeId = $(this).attr('feedId');
        console.log($(`.like-${likeId} > img`).attr('likeType'));
        
        if (!$(`.like-${likeId} > img`).attr('likeType')) {
            heartUp();
            getHeartState(likeId);
        } else {
            console.log('down');
            heartDown();
            getHeartState(likeId);
        }
        // heartDown();
        // $('.likeImg').html(`<img src="/picture/Icon/heart.png">`);
        // $('.likeImg').html(`<img src="/picture/Icon/heart (2).png">`);
    });
}

const heartUp = () => {
    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/${likeId}/like`,
        type : 'POST',
        data : JSON,
        beforeSend : function(xhr){
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);                      
        },
        success : function(res) {
            console.log(res);
            console.log(`${likeId}의 좋아요 성공 :)`);
            getHeartState(likeId);
        },
        error: function(err){
            console.log(err);                    
        },
        dataType : "json",
        contentType : "charset=utf-8"
    });
}

const heartDown = () => {
    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/${likeId}/like`,
        type : 'DELETE',
        beforeSend : function(xhr){
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(){
            console.log(`좋아요 취소 :(`);
            getHeartState(likeId);
        },
        error : function(err){
            console.log(err);
        },
        dataType : 'JSON',
        contentType : 'charset=utf-8'
    });
}

const movePage = () => {
    $('.writeImg').click(function(){
        window.location.assign('writeFeed.html');
    });
}

const getWriteFeedTime = (timeValue) => {
    const today = new Date();
    const gap = today.getTime();
    const testYear = today.getFullYear(); // 년도
    const testMonth = today.getMonth() + 1;  // 월

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

    //log('과연?', testVal, val ,testVal === val);

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

const functionEXE = () => {
    getFeed();
    movePage();
    heartEvent();
}

$(() => {
    functionEXE();
})

