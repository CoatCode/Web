const search = () => {
    const count = 1;
    $(document).on('keypress', '#searchbar', function(e) {
        if(e.keyCode == 13) {
            const searchItem = $('#searchbar').val();
            const base = searchItem + '/' + count;
            $.ajax({
                url : 'http://localhost:8080/api/v1/movies/' + base,
                type : 'GET',
                beforeSend : function() {

                },
                success : function(res) {
                    console.log(res);
                    $('.slideLayout').hide();
                    $('.popularMovie').empty();
                    let alt;
                    res.items.map((item, index) => {
                        item.title = item.title.replace('<b>','');
                        item.title = item.title.replace('</b>','');
                        item.director = item.director.replace('|', '');
                        alt = base + '/' + index;
                        $('.popularMovie').append(`    
                            <div class="popImg">
                                <img src="${item.image}" title="${alt}" alt="${item.title}" onclick="getMovieInfo();" class="movieImg">
                            </div>
                        `);
                    });
                }
            });
        }
    })
}
