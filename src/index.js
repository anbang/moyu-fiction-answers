define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    var $page=$("#page");
    var $wrapArea=$page.find(".j-list-wrap");
    $page.find(".j-total").text(problem.length);
    var pageUtility={
        init:function(){
            this.initLeftRightNavigation();
            this.bind();
        },
        bind:function(){
            var self=this;
            $page.on("keyup","#search",function(e){
                var $this=$(this);
                if(e.keyCode==8){
                    $this.val("");
                }
                var searchName = $this.val().toLowerCase();
                if (searchName == "") {
                      $wrapArea.find(".list-item").show();
                } else {
                    $wrapArea.find(".list-item").each(function() {
                        var sourcesData=$(this).data();
                        var short = sourcesData.short;            
                        var list = sourcesData.list+"";
                        var answer=sourcesData.item;  
                        // if ( (short.indexOf(searchName) != -1) || (list.indexOf(searchName) != -1) || (answer.indexOf(searchName) != -1) ) {
                        if ( list.indexOf(searchName) != -1 ) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                }
            })
        },
        initLeftRightNavigation:function(){
            var targetMenu="";
            $.each(problem,function(index,val){
                var tempItemStr=[
                    '                <li class="list-item clearfix" data-short='+val.short+' data-list='+val.list+' data-item='+val.item+'>',
                    // '                    <p  class="list-leftcon">'+val.item+'</p>',
                    '                    <p class="list-con">'+val.item+'</p>',
                    '                    <p class="list-arrow"><span class="mui-txt-danger">'+val.answer+'</span></p>',
                    '                </li>'].join("");
                    targetMenu+=tempItemStr;
            });
            $wrapArea.empty().append(targetMenu);
        }
    };
    pageUtility.init();
});