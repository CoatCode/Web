let isLoading = true;
let getId = 1;

//feed 관련코드

const getFeed = (id) => {
    //loading();
    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;
    isLoading = true;

    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/all`,
        type : 'GET',
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum+1;
        },
        success : function(res){
            console.log(isLoading)
            
            isLoading = false;
            //loading();

            //console.log('게시물 불러오기 성공');
            console.log(res);
            
            res.map(({id, owner, image_urls, title, content, tag, comment_preview}) => {
                $('.feedArea').append(`
                    <div class='feed'>
                        <div class='feedHead'>
                            <div class='postmanProfile'>
                                    <img src= "${owner.image}">                     
                            </div>
                            <div class='postmanName'>
                                <div class= 'postmanNameText'>${owner.username}</div>
                            </div>
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
                                <img class="likeImg" src="/picture/Icon/heart.png" alt="#">
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
                        <div class='tagWrapper'>
                            <h4>
                                ${tag ? `
                                    <div class="tag">
                                        ${tag}
                                    </div>
                                    `
                                : `<div></div>`}
                            </h4>
                        </div>
                        <div class='feedCommentWrapper'>
                        ${comment_preview ? 
                            comment_preview.map((data) => {
                                return `
                                <div class="feedComment">
                                    <div class="commenterProfile">
                                        <img src="${data.owner.profile}"/>
                                    </div>
                                    <div class="commenter">
                                        <div class="name">
                                            <div>${data.owner.username}</div>
                                        </div>
                                        <div class="comment">
                                        <span>${data.content}</span>
                                        </div>
                                    </div>
                                </div>
                                `
                            })
                            : `<div></div>`}
                        </div>
                    </div> 
                `);
                    
                getHeartState(id);
            });
        },
        error : function(err){
            isLoading = false;
            console.log(err);
        }
    });

    let getId = 1;

    $(window).scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
          console.log(getId);
          getId++;

          $.ajax({
            url : `http://10.80.161.202:8080/feed/post/all?page=${getId}`,
            type : 'GET',
            beforeSend : function(xhr){
                ajaxCountNum = ajaxCountNum+1;
            },
            success : function(res){
                console.log('게시물 불러오기 성공');
                //console.log(res);
                console.log(getId);
                res.map(({id, owner, image_urls, title, content, tag, comment_preview}) => {  
                    console.log(comment_preview);      
                        $('.feedArea').append(`
                        <div class='feed'>
                            <div class='feedHead'>
                                <div class='postmanProfile'>
                                        <img src= "${owner.image}">                     
                                </div>
                                <div class='postmanName'>
                                    <div class= 'postmanNameText'>${owner.username}</div>
                                </div>
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
                                    <img class="likeImg" src="/picture/Icon/heart.png" alt="#">
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
                            <div class='tagWrapper'>
                                <h4>
                                    ${tag ? `
                                        <div class="tag">
                                            ${tag}
                                        </div>
                                        `
                                    : `<div></div>`}
                                </h4>
                            </div>
                            <div class='feedCommentWrapper'>
                            ${comment_preview ? 
                                comment_preview.map((data) => {
                                    return `
                                    <div class="feedComment">
                                        <div class="commenterProfile">
                                            <img src="${data.owner.profile}"/>
                                        </div>
                                        <div class="commenter">
                                            <div class="name">
                                                <div>${data.owner.username}</div>
                                            </div>
                                            <div class="comment">
                                            <span>${data.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                    `
                                })
                                : `<div></div>`}
                            </div>
                        </div> 
                    `);
                    
                    getHeartState(id);
                });
            },
            error : function(err){
                console.log(err);
            }
        });  
        }
    });
}

const getFollowFeed = (id) => {
    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;
    isLoading = true;

    $('.followMenu').click(function(){
        $.ajax({
            url : `http://10.80.161.202:8080/feed/post/follow`,
            type : 'GET',
            beforeSend : function(xhr){
                ajaxCountNum = ajaxCountNum+1;
            },
            success : function(res){
                console.log(isLoading)
                
                isLoading = false;
                //loading();
    
                //console.log('게시물 불러오기 성공');
                console.log(res);
                
                res.map(({id, owner, image_urls, title, content, tag, comment_preview}) => {
                    $('.feedArea').append(`
                        <div class='feed'>
                            <div class='feedHead'>
                                <div class='postmanProfile'>
                                        <img src= "${owner.image}">                     
                                </div>
                                <div class='postmanName'>
                                    <div class= 'postmanNameText'>${owner.username}</div>
                                </div>
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
                                    <img class="likeImg" src="/picture/Icon/heart.png" alt="#">
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
                            <div class='tagWrapper'>
                                <h4>
                                    ${tag ? `
                                        <div class="tag">
                                            ${tag}
                                        </div>
                                        `
                                    : `<div></div>`}
                                </h4>
                            </div>
                            <div class='feedCommentWrapper'>
                            ${comment_preview ? 
                                comment_preview.map((data) => {
                                    return `
                                    <div class="feedComment">
                                        <div class="commenterProfile">
                                            <img src="${data.owner.profile}"/>
                                        </div>
                                        <div class="commenter">
                                            <div class="name">
                                                <div>${data.owner.username}</div>
                                            </div>
                                            <div class="comment">
                                            <span>${data.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                    `
                                })
                                : `<div></div>`}
                            </div>
                        </div> 
                    `);
                        
                    getHeartState(id);
                });
            },
            error : function(err){
                isLoading = false;
                console.log(err);
            }
        });
    
        let getId = 1;
    
        $(window).scroll(function() {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
              console.log(getId);
              getId++;
    
              $.ajax({
                url : `http://10.80.161.202:8080/feed/post/follow?page=${getId}`,
                type : 'GET',
                beforeSend : function(xhr){
                    ajaxCountNum = ajaxCountNum+1;
                },
                success : function(res){
                    console.log('게시물 불러오기 성공');
                    //console.log(res);
                    console.log(getId);
                    res.map(({id, owner, image_urls, title, content, tag, comment_preview}) => {  
                        console.log(comment_preview);      
                            $('.feedArea').append(`
                            <div class='feed'>
                                <div class='feedHead'>
                                    <div class='postmanProfile'>
                                            <img src= "${owner.image}">                     
                                    </div>
                                    <div class='postmanName'>
                                        <div class= 'postmanNameText'>${owner.username}</div>
                                    </div>
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
                                        <img class="likeImg" src="/picture/Icon/heart.png" alt="#">
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
                                <div class='tagWrapper'>
                                    <h4>
                                        ${tag ? `
                                            <div class="tag">
                                                ${tag}
                                            </div>
                                            `
                                        : `<div></div>`}
                                    </h4>
                                </div>
                                <div class='feedCommentWrapper'>
                                ${comment_preview ? 
                                    comment_preview.map((data) => {
                                        return `
                                        <div class="feedComment">
                                            <div class="commenterProfile">
                                                <img src="${data.owner.profile}"/>
                                            </div>
                                            <div class="commenter">
                                                <div class="name">
                                                    <div>${data.owner.username}</div>
                                                </div>
                                                <div class="comment">
                                                <span>${data.content}</span>
                                                </div>
                                            </div>
                                        </div>
                                        `
                                    })
                                    : `<div></div>`}
                                </div>
                            </div> 
                        `);
                        
                        getHeartState(id);
                    });
                },
                error : function(err){
                    console.log(err);
                }
            });  
            }
        });
    });
}

const getPopularFeed = (id) => {
    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;
    isLoading = true;

    $('.followMenu').click(function(){
        $.ajax({
            url : `http://10.80.161.202:8080/feed/post/pop`,
            type : 'GET',
            beforeSend : function(xhr){
                ajaxCountNum = ajaxCountNum+1;
            },
            success : function(res){
                console.log(isLoading)
                
                isLoading = false;
                //loading();
    
                //console.log('게시물 불러오기 성공');
                console.log(res);
                
                res.map(({id, owner, image_urls, title, content, tag, comment_preview}) => {
                    $('.feedArea').append(`
                        <div class='feed'>
                            <div class='feedHead'>
                                <div class='postmanProfile'>
                                        <img src= "${owner.image}">                     
                                </div>
                                <div class='postmanName'>
                                    <div class= 'postmanNameText'>${owner.username}</div>
                                </div>
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
                                    <img class="likeImg" src="/picture/Icon/heart.png" alt="#">
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
                            <div class='tagWrapper'>
                                <h4>
                                    ${tag ? `
                                        <div class="tag">
                                            ${tag}
                                        </div>
                                        `
                                    : `<div></div>`}
                                </h4>
                            </div>
                            <div class='feedCommentWrapper'>
                            ${comment_preview ? 
                                comment_preview.map((data) => {
                                    return `
                                    <div class="feedComment">
                                        <div class="commenterProfile">
                                            <img src="${data.owner.profile}"/>
                                        </div>
                                        <div class="commenter">
                                            <div class="name">
                                                <div>${data.owner.username}</div>
                                            </div>
                                            <div class="comment">
                                            <span>${data.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                    `
                                })
                                : `<div></div>`}
                            </div>
                        </div> 
                    `);
                        
                    getHeartState(id);
                });
            },
            error : function(err){
                isLoading = false;
                console.log(err);
            }
        });
    
        let getId = 1;
    
        $(window).scroll(function() {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
              console.log(getId);
              getId++;
    
              $.ajax({
                url : `http://10.80.161.202:8080/feed/post/pop?page=${getId}`,
                type : 'GET',
                beforeSend : function(xhr){
                    ajaxCountNum = ajaxCountNum+1;
                },
                success : function(res){
                    console.log('게시물 불러오기 성공');
                    //console.log(res);
                    console.log(getId);
                    res.map(({id, owner, image_urls, title, content, tag, comment_preview}) => {  
                        console.log(comment_preview);      
                            $('.feedArea').append(`
                            <div class='feed'>
                                <div class='feedHead'>
                                    <div class='postmanProfile'>
                                            <img src= "${owner.image}">                     
                                    </div>
                                    <div class='postmanName'>
                                        <div class= 'postmanNameText'>${owner.username}</div>
                                    </div>
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
                                        <img class="likeImg" src="/picture/Icon/heart.png" alt="#">
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
                                <div class='tagWrapper'>
                                    <h4>
                                        ${tag ? `
                                            <div class="tag">
                                                ${tag}
                                            </div>
                                            `
                                        : `<div></div>`}
                                    </h4>
                                </div>
                                <div class='feedCommentWrapper'>
                                ${comment_preview ? 
                                    comment_preview.map((data) => {
                                        return `
                                        <div class="feedComment">
                                            <div class="commenterProfile">
                                                <img src="${data.owner.profile}"/>
                                            </div>
                                            <div class="commenter">
                                                <div class="name">
                                                    <div>${data.owner.username}</div>
                                                </div>
                                                <div class="comment">
                                                <span>${data.content}</span>
                                                </div>
                                            </div>
                                        </div>
                                        `
                                    })
                                    : `<div></div>`}
                                </div>
                            </div> 
                        `);
                        
                        getHeartState(id);
                    });
                },
                error : function(err){
                    console.log(err);
                }
            });  
            }
        });
    });
}

//좋아요 관련 코드 

const getHeartState = (id) => {
    //console.log(id);
    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/${id}/like`,
        type : 'GET',
        beforeSend : function(xhr){
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res) {
            //console.log(res);
            $(`.like-${id}`).html(`
                <img src="/picture/Icon/heart (2).png" likeType="true"> 
            `);
        },
        error : function(err){
            //console.log(err);
            $(`.like-${id}`).html(`
                <img src="/picture/Icon/heart.png">
            `);  
        },
        async: false,
        dataType : "json",
        contentType : "charset=utf-8"
    });
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
            //console.log(res);
            console.log(`${likeId}의 좋아요 성공 :)`);
            getHeartState(likeId);
        },
        error: function(err){
            //console.log(err);                    
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
            //console.log(err);
        },
        dataType : 'JSON',
        contentType : 'charset=utf-8'
    });
}

//

const movePage = () => {
    $('.writeImg').click(function(){
        window.location.assign('writeFeed.html');
    });
}

//글쓴시간

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

//함수 실행 코드
const functionEXE = () => {
    getFeed();
    movePage();
    heartEvent();
    //loading();
}

$(() => {
    functionEXE();
})