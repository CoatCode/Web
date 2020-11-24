//const log = console.log();

const getDetail = () => {

    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;
    let postId = getParameterByName('id');
    console.log(postId);
    $.ajax({
        // url : `http://10.80.161.202:8080/feed/post/${postId}`,
        url : `https://coatcode.herokuapp.com/feed/post${postId}`,
        type : 'GET',
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum+1;
        },
        success : function(res){
            console.log('게시물 불러오기 성공');
            console.log(res);
            
            const {id, image_urls, title, content, tag, view_count, owner,} = res;

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
                        <div class="disuniteLine">
                            <hr>
                        </div>
                    </div>
                    <div class="iconArea">
                        <div class='LikeIconImg like-${id}' feedId="${id}">
                            <img src="/picture/Icon/heart.png">
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
                        <img src="${owner.profile}" alt="">
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

const getHeartState = (id) => {
    console.log('안녕하세요')
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
            //console.log('down');
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

const getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(() => {
    // functionEXE();
    getDetail();
    heartEvent();

})

