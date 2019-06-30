 /* 页面交互公共效果 */

 // 加载头尾代码片段
 (function(win, $) {

     var Include = function(cfg) {
         this.cfg = cfg;

         this._init();
     };

     Include.prototype = {
         constructor: Include,

         _init: function() {
             var c = this.cfg;

             if (c.async !== false) c.async = true;

             this.$container = $('#' + c.id);
         },

         fetch: function() {
             var c = this.cfg,
                 self = this;

             return $.ajax({
                 url: c.src,
                 type: 'GET',
                 dataType: 'html',
                 async: c.async,
                 success: function(html) {
                     self.$container.html(html);

                     c.onload && c.onload(html);
                 }
             });
         }
     };

     // 需要引入的代码片段
     var includes = [{
         id: 'header',
         src: '/header.inc.html',
         onload: function() {
             // 给具有placeholder属性的元素增加此支持
             $('[placeholder]').placeholder();
             // console.log('...header loaded...');
			HaveWeather();
			HaveDate();
			function HaveWeather(){
				$.ajax({
					type : "get",
					<!-- url : "/js/weather.json", -->
					url : "/EpointWebBuilder_Jxs_Ggzyjyzx/weather/weather.json",
					dataType : "json",
					success : function(data) {
						var msg = $.parseJSON(data['return']);
						var strHtml = msg.result.HeWeather5[0].daily_forecast[0].tmp.min+"~"+msg.result.HeWeather5[0].daily_forecast[0].tmp.max+"℃";
						$("#weatherInfo_sx").append(strHtml);
					}
				});
			}
			function HaveDate(){
				var day=""; var month=""; var ampm=""; var ampmhour=""; var myweekday=""; var year=""; mydate=new Date(); myweekday=mydate.getDay(); mymonth=mydate.getMonth()+1; myday= mydate.getDate(); myyear= mydate.getYear(); year=(myyear > 200) ? myyear : 1900 + myyear; if(myweekday == 0) weekday=" 星期日 "; else if(myweekday == 1) weekday=" 星期一 "; else if(myweekday == 2) weekday=" 星期二 "; else if(myweekday == 3) weekday=" 星期三 "; else if(myweekday == 4) weekday=" 星期四 "; else if(myweekday == 5) weekday=" 星期五 "; else if(myweekday == 6) weekday=" 星期六 "; 
				$("#dateInfo_sx").html(year+"年"+mymonth+"月"+myday+"日");
				$(".ewb-head-date").html(weekday);
			}
         }
     }, {
         id: 'footer',
         src: '/footer.inc.html',
         onload: function() {
             // console.log('...footer loaded...');
         }
     }];

     $.each(includes, function(i, cfg) {
         if ($('#' + cfg.id).length) {
             new Include(cfg).fetch();
         }
     });

 }(this, jQuery));


 //点击图标
function Link(site_code) {
	//获取该站点需要纠错页面的url地址
	var url = getCurrUrl();
	//跳转至纠错系统填写页面 
	window.open("./index.html" + site_code + "&url=" + encodeURIComponent(url));
}
//获取该站点需要纠错页面的url地址
function getCurrUrl() {
	var url = "";
	if (parent !== window) {
		try {
			url = window.top.location.href;
		} catch (e) {
			url = window.top.document.referrer;
		}
	}
	if (url.length == 0)
		url = document.location.href;

	return url;
}


$(document).ready(function(){ 
        $("#qzss").keydown(function(e){ 
            var curKey = e.which; 
            if(curKey == 13){ 
                $("#buttonId").click(); 
                return false; 
            } 
        }); 
    }); 
	
function openss(){ 
        	var text = $("#qzss").val();
        	 	if (text == ""||"请输入关键字"==text){
        	      alert("请输入搜索关键字！");
        	      return;
        	  }
        	 	//text = text.replace(/'/g, '"');  
        		//text = encodeURIComponent(text);
				var url="/index.html?wd="+text;
				window.open(url);
}
 