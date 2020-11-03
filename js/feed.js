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

const getFeed = () => {

    let ajaxCountNum = 0;
    let ajaxLastNum = ajaxCountNum;

    $.ajax({
        //url : "http://10.80.161.202:8080/user",
        url : 'http://10.80.161.202:8080/feed/post/all',
        //url : 'https://coatcode.herokuapp.com/feed/post/all',
        type : 'GET',
        beforeSend : function(xhr){
            ajaxCountNum = ajaxCountNum+1;
        },
        success : function(res){
            console.log('게시물 불러오기 성공');
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
                        <div class='LikeIconImg'>
                            <img class='likeImg' src="/picture/Icon/heart.png">
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
                        <div class="commenterProfile">
                            <img src="${owner.image}" alt="">
                        </div>
                        <div class="commenter">
                            <div class="name">
                                <span>${owner.username}</span> 
                            </div>
                            <div class="comment">
                                <span>${content}</span>
                            </div>
                        </div>
                    </div>
                </div> 
                `);               
            });
        },
        error : function(err){
            console.log(err);
        }
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

const keyword_search = (keyword) => {
    model.search = keyword;
}

const cho = (str) => {
    let res = "";
    const arr = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

    for (let i in str) {
        code = Math.floor((str[i].charCodeAt() - 44032) / 588)
        res += code >= 0 ? arr[code] : str[i];
    }

    return res;
}

const product_search = () => {
    $('.products > .product').hide();

    let keyword = model.search;
    let res = [];

    keyword = keyword.split('|');
    keyword.forEach((search, t) => {
        keyword = cho(search);
        model.productName.forEach((compare, i) => {
            let compCho = cho(compare); //비교 문자의 초성
            let strIdxs = []; //비교 문자열에서 검색어와 일치하는 부분의 시작 위치
            compare = compare.split(''); //비교 문자

            for (let c in compCho) {
                let idx = compCho.indexOf(keyword, c);
                if (idx != -1 && strIdxs.indexOf(idx) == -1) {
                    strIdxs.push(idx);
                }
            }
            chk = 0;

            strIdxs.forEach((idx, d) => {
                let str = keyword.split('');

                for (let e in search) {
                    if (search[e].charCodeAt() - 44032 >= 0) {
                        str[e] = compare[idx + e * 1];
                    }
                }

                if (str.join('') == search) {
                    chk = 1;
                }
            })

            if (chk) {
                res.push(compare.join(''));
            }
        })

    })

    res.map((el) => {
        const temp = $(".products > .product .product_brand:contains('" + el + "')");
        $(temp).parent().show();
    })
}

const functionEXE = () => {
    getFeed();
    movePage();
    product_search();
}

$(() => {
    functionEXE();
})

