define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    var $page=$("#page");
    var $wrapArea=$page.find(".j-list-wrap");
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
                var searchName = $this.val();    
                if (searchName == "") {
                      $wrapArea.find(".list-item").show();
                } else {
                    $wrapArea.find(".list-item").each(function() {
                        var sourcesData=$(this).data();
                        var short = sourcesData.short;            
                        var list = sourcesData.list+"";
                        var answer=sourcesData.item;  
                        if ( (short.indexOf(searchName) != -1) || (list.indexOf(searchName) != -1) || (answer.indexOf(searchName) != -1) ) {
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
                    '                    <p  class="item-left">'+val.item+'</p>',
                    '                    <p class="item-right">'+val.answer+'</p>',
                    '                </li>'].join("");
                    targetMenu+=tempItemStr;
            });
            $wrapArea.empty().append(targetMenu);
        }
    };
    pageUtility.init();
});


function searchCity() {
    var searchCityName = $("#searchCityName").val();    
    if (searchCityName == "") {
          $("ul li").show();
    } else {
      $("ul li").each(function() {
        var pinyin = $(this).attr("pinyin");            
        var cityName = $(this).attr("cityName");            
        if (pinyin.indexOf(searchCityName) != -1|| cityName.indexOf(searchCityName) != -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
        });
    }
  }
  $('#searchCityName').bind('input propertychange', function() {
    searchCity();
  });