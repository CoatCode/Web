const search = () => {
    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;

    const searchData = $(".search").val();

    $.ajax({
        // url : "http://10.80.161.202:8080/user",
        url : "https://coatcode.herokuapp.com/user",
        type : "GET",
        data : JSON.stringify(searchData),
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum+1;
            xhr.setRequestHeader("Content-type","application/json");
            xhr.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem('userAccessToken')}`);
        },
        success : function(res){
           console.log(res);
        //    res.map()
        },
        error : function(res){
            console.log(res);
        }
    });
}