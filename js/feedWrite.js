
const feedWrite = () => {
    //console.log('안녕하세요')
    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;

    $('.submitBtn').click(function() {
        const formData = new FormData();

        const imageData1 = document.getElementById('ImgUpload1').files[0];
        const imageData2 = document.getElementById('ImgUpload2').files[0];
        const imageData3 = document.getElementById('ImgUpload3').files[0];
        const imageData4 = document.getElementById('ImgUpload4').files[0];
        const imageData5 = document.getElementById('ImgUpload5').files[0];

        formData.append('image1', imageData1);
        formData.append('title', 'test1');
        formData.append('content', 'test1');

        // formData.append('image1', imageData1),
        // formData.append('image2', imageData2);
        // formData.append('image3', imageData3);
        // formData.append('image4', imageData4);
        // formData.append('image5', imageData5);

        // formData.append('title', $('#titleBox').val());
        // formData.append('content', $('#commentBox').val());

        // formData.append('title', '안녕하세요');
        // formData.append('content', '안녕하세요');

        // formData.append('tag', $('#writeTag').val());

        // console.log($('#commentBox').val());
        // console.log($('#titleBox').val());   

        $.ajax({
            url : "http://10.80.161.202:8080/feed/post",
            type : 'POST',
            // data : JSON.stringify(formData),
            data : formData, 
            processData : false,
            cache : false,
            beforeSend : function(xhr){
                // ajaxCountNum = ajaxCountNum+1;
                xhr.setRequestHeader("Content-type","application/json");
                xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
            },
            success : function(res){
                console.log('성공')
                console.log(res);
            },
            error: function(err){
                console.log(err);
            },
            // contentType : "application/json; charset=utf-8",
            // dataType : "JSON", //dataType설정
            async: false,
            dataType: "",
            contentType : "charset=utf-8" //conttentType설정
            //contentType : false
        });

        // $.ajax({
        //     url : 'http://10.80.161.202:8080/feed/post',
        //     //url : 'https://coatcode.herokuapp.com/feed/post',
        //     type : 'post',
        //     data : formData,
        //     beforeSend : function(xhr){
        //         ajaxCountNum = ajaxCountNum+1;
        //         xhr.setRequestHeader("Content-type","application/json");
        //         xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        //     },
        //     success : function(){
        //         if(ajaxLastNum == ajaxCountNum -1){
        //             console.log(`글쓰기 성공 :)`);
        //             setInterval(function(){
        //                  window.location.replace('feedPage.html');
        //             }, 2000);
        //         }
        //     },
        //     error : function(err){
        //         console.log(err);
        //     },
        //     dataType : false,
        //     //processData: false,
        //     contentType : false
        // });
    });
}

const feedWriteModify = () => {
    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;

    $('.modifyBtn').click(function(){
        formData();

        $.ajax({
            url : 'http://10.80.161.202:8080/feed/post',
            //url : 'https://coatcode.herokuapp.com/feed/post',
            type : 'put',
            data : formData,
            beforSend : function(xhr){
               ajaxCountNum = ajaxCountNum+1;
               xhr.setRequestHeader("Content-type","application/json");
               xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
            },
            success : function(){
                if(ajaxLastNum == ajaxCountNum -1){
                    log(`수정 성공 :)`);
                    setInterval(function(){
                         window.location.replace('feedPage.html');
                    }, 2000);
                }
            },
        });
    });
}

const feedDelete = () => {
    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;

    $('.delBtn').click(function(){
        formData();

        $.ajax({
            url : 'http://10.80.161.202:8080/feed/post',
            //url : 'https://coatcode.herokuapp.com/feed/post',
            type : 'DELETE',
            beforSend : function(xhr){
               ajaxCountNum = ajaxCountNum+1;
               xhr.setRequestHeader("Content-type","application/json");
               xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
            },
            success : function(){
                if(ajaxLastNum == ajaxCountNum -1){
                    log(`삭제 성공 :)`);
                    setInterval(function(){
                         window.location.replace('feedPage.html');
                    }, 2000);
                }
            },
        });
    });
}

$(() => {
    feedWrite();
    // feedWriteModify();
    // feedDelete();
});
