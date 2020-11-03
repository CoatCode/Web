
// const event = () => {
//     $('.img').click

//     // document.onscroll
// }

// let likeId;
// let isLiked;

// const getheartList = () => {

//     let ajaxCountNum = 0;
//     let ajaxLastNum = ajaxCountNum;

//     $.ajax({
//         url : `http://10.80.161.202:8080/feed/post/${likeId}/likes`,
//         type : 'GET',
//         beforeSend : function(xhr){
//             ajaxCountNum = ajaxCountNum+1;
//             xhr.setRequestHeader("Content-type","application/json");
//             xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
//         },
//         success : function(res){
//             if(ajaxLastNum == ajaxCountNum - 1){
//                 console.log(res);
//             }
//         },
//         error : function(err){
//             console.log(err);
//         },
//         dataType : "json",
//         contentType : "charset=utf-8"
//     });
// }

// const getHeartState = () => { //현재 좋아요 상태 가져오기

//     let ajaxCountNum = 0;
//     let ajaxLastNum = ajaxCountNum;

//     let clickCount = 1;

//     $.ajax({
//         url : `http://10.80.161.202:8080/feed/post/${likeId}/like`,
//         type : 'GET',
//         beforeSend : function(xhr){
//             ajaxCountNum = ajaxCountNum+1;
//             xhr.setRequestHeader("Content-type","application/json");
//             xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
//         },
//         success : function(res){
//             $('.LikeIconImg').click(function() {
                
//             });
            
//         },
//         error : function(err){
//             console.log(err);
//         },
//         async: false,
//         dataType : "json",
//         contentType : "charset=utf-8"
//     })
// }

// const heartEvent = () => { //모든 좋아요 이벤트 관리
//     $(document).on('click', '.LikeIconImg', function() {
//         likeId = $(this).attr('feedId');
//         console.log($(this).attr('feedId'));

//         heartUp();
//         // heartDown();
//         // $('.likeImg').html(`<img src="/picture/Icon/heart.png">`);
//         // $('.likeImg').html(`<img src="/picture/Icon/heart (2).png">`);
//     });

//     // $('.likeImg').on('click', function() {
//     //     console.log('helloworld')
//     //     // console.log($(this).attr('feedId'));
//     //     likeId = $(this).attr('feedId');
//     //     clickCount = clickCount + 1;
//     //     //log(clickCount);

//     //     if(clickCount % 2 == 0){ //클릭 되었을때 이벤트
//     //         $.ajax({
//     //             url : "http://10.80.161.202:8080/feed/post/8/like",
//     //             type : 'POST',
//     //             data : JSON,
//     //             beforeSend : function(xhr){
//     //                 xhr.setRequestHeader("Content-type","application/json");
//     //                 xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);                      
//     //             },
//     //             success : function(){
//     //                 console.log(`좋아요 성공 :)`);
//     //                 getHeartSate();
//     //             },
//     //             error: function(err){
//     //                 console.log(err);                    
//     //             },
//     //             dataType : "json",
//     //             contentType : "charset=utf-8"
//     //         });
            
//     //     } else if(clickCount % 2 !== 0){
//     //         //좋아요 취소
//     //         $.ajax({
//     //             url : "http://10.80.161.202:8080/feed/post/8/like",
//     //             type : 'DELETE',
//     //             beforeSend : function(xhr){
//     //                 xhr.setRequestHeader("Content-type","application/json");
//     //                 xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
//     //             },
//     //             success : function(){
//     //                 console.log(`좋아요 취소 :(`);
//     //                 getHeartSate();
//     //             },
//     //             error : function(err){
//     //                 console.log(err);
//     //                 alert(err.responseText);
//     //             },
//     //             dataType : 'JSON',
//     //             contentType : 'charset=utf-8'
//     //         });
//     //     }
//     // });
// }

// const heartUp = () => {
//     $.ajax({
//         url : `http://10.80.161.202:8080/feed/post/${likeId}/like`,
//         type : 'POST',
//         data : JSON,
//         beforeSend : function(xhr){
//             xhr.setRequestHeader("Content-type","application/json");
//             xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);                      
//         },
//         success : function(){
//             console.log(`${likeId}의 좋아요 성공 :)`);
//             getHeartState();
//         },
//         error: function(err){
//             console.log(err);                    
//         },
//         dataType : "json",
//         contentType : "charset=utf-8"
//     });
// }

// const heartDown = () => {
//     $.ajax({
//         url : `http://10.80.161.202:8080/feed/post/${likeId}/like`,
//         type : 'DELETE',
//         beforeSend : function(xhr){
//             xhr.setRequestHeader("Content-type","application/json");
//             xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
//         },
//         success : function(){
//             console.log(`좋아요 취소 :(`);
//             getHeartState();
//         },
//         error : function(err){
//             console.log(err);
//             alert(err.responseText);
//         },
//         dataType : 'JSON',
//         contentType : 'charset=utf-8'
//     });
// }

// const move = () => {
//     $('.postmanProfile').on('click', function(){
//         window.location.assign('detailFeed.html');
//     });
// }

// const functionInit = () => {
//     getHeartState();
//     heartEvent();
//     // getheartList();
//     move();
// }

// $(() => {
//     functionInit();
// })
