#解决html5设置viewport后页面加载闪烁和跳转闪烁方案

##一、为什么设置viewport会闪烁
viewport的出现是为了解决页面适配问题，其原理是通过缩放页面或者改变viewport dpi来实现，当进行此操作时，必然会出现页面闪烁问题。

##二、解决方案
在html输出的viewport为最终的缩放值，不在页面加载或加载完成后进行viewport操作。那如何实现页面输出的viewport值为正确的缩放比例呢。

#####cookie

先看代码

    <?php
    $viewportContent='';
    
    if(stristr($_SERVER['HTTP_USER_AGENT'],'iPhone') || stristr($_SERVER['HTTP_USER_AGENT'],'iPad')){
        $viewportContent = 'width=640,user-scalable=0';
    }else{
        if($_COOKIE['viewportScale']){
            $viewportScale = $_COOKIE['viewportScale'];
    
            $viewportContent = 'width=device-width, initial-scale='.$viewportScale.',minimum-scale='.$viewportScale.',maximum-scale='.$viewportScale;
        }else{
            header('location:setViewport.html?src='.urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']));
        }
    }
    
    ?>
    
代码解析：

    if(stristr($_SERVER['HTTP_USER_AGENT'],'iPhone') || stristr($_SERVER['HTTP_USER_AGENT'],'iPad')){
        $viewportContent = 'width=640,user-scalable=0';
    }
    如果是iphone或者ipad，直接将width设为ui-width完事。
    
<br/>

    if($_COOKIE['viewportScale']){
        $viewportScale = $_COOKIE['viewportScale'];

        $viewportContent = 'width=device-width, initial-scale='.$viewportScale.',minimum-scale='.$viewportScale.',maximum-scale='.$viewportScale;
    }else{
        header('location:setViewport.html?src='.urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']));
    }
    如果有viewportScale这个值，直接拼接输出给viewport content属性
    如果没有跳转到setViewport.html页面进行设置，src参数为当前页面参数，当设置完成后会自动跳回到该页面，注意encode编码
    
    
下面是setViewport.html代码

    <!DOCTYPE html>
    <html>
    <head lang="en">
        <meta charset="UTF-8">
        <title>viewport设置</title>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <style type="text/css">
            html,body{
                padding:0;
                margin:0;
            }
        </style>
    </head>
    <body>
    
    
    <script type="text/javascript">
    
    
        function getCookie(name) {
            var cookieValue = null;
            var search = name + "=";
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(search);
                if (offset != -1) {
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) end = document.cookie.length;
                    cookieValue = unescape(document.cookie.substring(offset, end))
                }
            }
            return cookieValue;
        }
    
        function setLocal(name, value) {
            var str = this.getCookieValue(name, value) + getExpires(1000);
            document.cookie = str;
        }
    
        function getCookieValue(name, value) {
            return name.trim() + '=' + encodeURIComponent(value);
        }
    
        function getExpires(days) {
            if (days) {
                var date = new Date();
                date.setDate(date.getDate() + days);
    
                return ';expires=' + date.toGMTString();
            } else {
                return;
            }
        }
    
        function getDomain(domain) {
            if (domain) {
                return ';domain=' + domain;
            } else {
                return '';
            }
        }
    
    
        var queryArray=[];
        /**
         * 参数请求分解
         * @param 需要分解的参数名称
         * @param 需要分解的参数 默认是当前地址
         * @returns {*}
         */
        function query(name,href) {
            if (!name) {
                return false;
            }
    
            if (queryArray.length && 1===2) {
                return queryArray[name];
            } else {
                href = href || window.location.href;
                href = href.replace(/#[^&]*$/, '');//去除锚点
    
                var reg = /\?(.+)/,
                        m = href.match(reg);
    
                if (m && m[1]) {
                    var s = m[1].split('&');
                    for (a in s) {
                        var b = s[a].split('='),
                                k = b[0],
                                v = b[1];
    
                        queryArray[k] = v;
                    }
    
                    if(queryArray[name]){
                        return queryArray[name];
                    }else{
                        return '';
                    }
    
    
                } else {
                    return '';
                }
            }
        }
    
    
        var src=decodeURIComponent(query('src'));
    
        if(localStorage.getItem('viewportScale')){
            setLocal('viewportScale', localStorage.getItem('viewportScale'));
            if(src){
                window.location.href=src;
            }
        }else{
            setTimeout(function(){
                var scale = document.body.offsetWidth / 640;
    
                setLocal('viewportScale', scale);
                localStorage.setItem('viewportScale',scale);
    
                if(src){
                    window.location.href=src;
                }
            },300)
        }
    
    </script>
    </body>
    </html>
