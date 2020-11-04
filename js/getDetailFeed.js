//const log = console.log();

const getDetail = () => {

    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;
    let postId = getParameterByName('id');
    console.log(postId);
    $.ajax({
        url : `http://10.80.161.202:8080/feed/post/${postId}`,
        type : 'GET',
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum+1;
        },
        success : function(res){
            console.log('게시물 불러오기 성공');
            console.log(res);
            
            const {image_urls, title, content, tag, view_count, owner, comment_preview} = res;

                $('.feedArea').append(`
                    <div class="feedPicture">
                        <img src="${image_urls[0]}" alt="">
                    </div>
                    <div class="contentArea">
                        <div class="title">
                            <span>${title}</span>
                        </div>
                        <div class="content">
                            <span>${content}</span>
                        </div>
                        <div class="tag">
                            <span>${tag}</span>
                        </div>
                        <div class="disuniteLine">
                            <hr>
                        </div>
                    </div>
                    <div class="iconArea">
                        <div class="likeIcon">
                            <img src="/picture/Icon/heart.png" alt="">
                        </div>
                        <div class="viewIcon">
                            <img src="/picture/Icon/eye (1) 1.png" alt="">
                        </div>
                        <div class="viewCount">
                            <span>${view_count}</span>
                        </div>
                    </div>
                `);

                $('.postManProfileImg').html(`
                    <a href="profileDetail.html?userId=${owner.id}">
                        <img src="${owner.image}" alt="">
                    </a>
                `);
                
                $('.postManName').html(`
                    <span>${owner.username}</span>
                `); 
            
        },
        error : function(err){
            console.log(err);
        }
    });
}

const movePage = () => {
    
}

const getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(() => {
    // functionEXE();
    getDetail();
})

