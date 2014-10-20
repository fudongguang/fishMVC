#html5定宽适配分享

##一、viewport

#####什么是Viewport


手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，用在pc上就是电脑屏幕，我们所有的操作都是这个屏幕(viewport)上进行的，通常这个虚拟的“窗口”比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分，其默认排版宽度是980px。android和iphone都支持这个属性。

代码：

    <meta content="width=device-width, initial-scale=1,minimum-scale=1,maxmum-scale=1” name="viewport"/>
    
* width：控制 viewport 的大小，可以指定的一个值或者特殊的值，如 device-width,（默认宽度为980:推理） 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
* initial-scale：初始缩放比例
* minimum-scale：最小缩放比例
* maxmum-scale：最大缩放比例
* user-scalable：是否允许缩放 值为[yes | no] | [0 | 1]， no和0为禁止缩放。
* target-densitydpi：设置屏幕像素密度，可以是具体的某个值或者device-dpi，改变其值可以对页面进行缩放。

如果minimum-scale 和 maxmum-scale值相同 则拥有user-scalable=no 想同的功能，不能缩放，此时initial-scale必须和minimum-scale值相同，设置其他值无效。
<br/>反过来如果设置了user-scalable=no 就没必要设置 minimum-scale和maxmum-scale的值。总结下，设置了禁止缩放就没必要设置最大和最小缩放，设置了最大最小缩放就没必要设置user-scalable。


##二、现在主流定宽适配方案
原理是将viewport的width值设置为UI-width,通过修改target-densitydpi值来进行全屏展示，改变屏幕的像素密度，其页面没有进行缩放。

代码

    <meta content="width=640, target-densitydpi=320, user-scalable=0” name="viewport"/>
    
* width=640：ui-width
* target-densitydpi=320：计算后的dpi值
* user-scalable=0：禁止缩放

计算target-densitydpi较复杂

    if (/gt-n7000 build\/gingerbread/.test(navigator.userAgent.toLowerCase())) {
        document.querySelector("meta[name=viewport]").setAttribute('content', 'width=640, target-densitydpi=256, user-scalable=0');
    } else if (document.body.offsetWidth > 0 && /android\s4/.test(navigator.userAgent.toLowerCase())) {
        var standardDpi, dpi, w;
        w = document.body.offsetWidth;
        if (w > 0) {
            if (w < 320) {
                standardDpi = 120;
            } else if (w < 480) {
                standardDpi = 160;
            } else if (w < 640) {
                standardDpi = 240;
            } else if (w < 960) {
                standardDpi = 320;
            } else if (w < 1280) {
                standardDpi = 480;
            } else {
                standardDpi = 640;
            }
        }
        dpi = 640 * standardDpi / w;
        document.querySelector("meta[name=viewport]").setAttribute('content', 'width=640, target-densitydpi=' + dpi + ', user-scalable=0');
    } else {
        document.querySelector("meta[name=viewport]").setAttribute('content', 'width=640, target-densitydpi=320, user-scalable=0');
    }

从代码中可以看出其对gt-n7000即三星n7000手机进行单独适配，已知需要单独适配的手机有meitu和vivo，可以想象，我们很难考虑到所有需要单独适配的手机。并且里面的逻辑判断过多，且较为生硬，需要考虑的意外情况太多，出现错误后页面严重变形，该适配方案不是很理想。

另外一种计算方法为

    target-densitydpi = UI-width / device-width * window.devicePixelRatio * 160;

这不多介绍了，有需求的可以
<a href="http://www.cnblogs.com/plums/archive/2013/01/10/WebApp-fixed-width-layout-of-multi-terminal-adapter-since.html" target="_blank">查看介绍</a>


##三、新的适配方案
#####iPhone适配
因为iphone支持width直接设置为固定值进行适配，代码：

    <meta content="width=640, user-scalable=0” name="viewport"/>

#####Android适配：
从前面的viewport介绍中可以得知，viewport默认排版宽度是980px，此时页面自动缩小到和设备宽度一样，即是如下代码可以适配

    <!DOCTYPE html>
    <html>
    <head lang="en">
        <meta charset="UTF-8">
        <title>默认980</title>
        <style type="text/css">
            html,body{
                margin:0;
                padding:0;
            }
        </style>
    </head>
    <body>
    <div style="width: 980px;background-color: red;height: 60px;">fsdfsdfsdf</div>
    </body>
    </html>

我们何不想象一下，如果我将viewport的宽度固定为设备宽度，将网页缩放岂不是也可以达到我们想要的适配，这个缩放比例该是多少呢？
比如要做一个定宽为640px的页面，将width设置为device-width，假如设备真实的宽度是500px,因为width=device-width，那么document.body.offsetWidth也将会是500px，要将一个宽度640px的页面全屏放在一个500px的屏幕里面，那肯定是将页面缩小到屏幕大小就可以了，
scale = document.body.offsetWidth/640

最终代码：

    <!DOCTYPE html>
    <html>
    <head lang="en">
        <meta charset="UTF-8">
        <title>viewport设置</title>
        <meta content="width=device-width, initial-scale=1" name="viewport"/> //先设置width为设备宽度，这样document.body.offsetWidth获得的值将是设备宽度
        <style type="text/css">
            html,body{
                padding:0;
                margin:0;
            }
         </style>
    </head>
    <body>
         var scale = document.body.offsetWidth / 640;
         
         //重设viewport的content值
         document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, minimum-scale=' + scale + ', maximum-scale=' + scale + ',initial-scale=' + scale);
    </body>
    </html>


##四、真实手机测试


<table>
    <tr>
        <td><img src="http://guxunzixun.com/images/xiaomi1.png" alt="xiaomi1" style="width:200px;"/><br/>小米1 (2.3.5)</td>
        <td><img src="http://guxunzixun.com/images/xiaomi2.jpg" alt="xiaomi2" style="width:200px;"/><br/>小米2 (4.1)</td>
        <td><img src="http://guxunzixun.com/images/vivo.png" alt="vivo" style="width:200px;"/><br/>vivo x3t (4.2.1)</td>
   </tr><tr>
        <td><img src="http://guxunzixun.com/images/htc.png" alt="htc" style="width:200px;"/><br/>htc Desire s510e (2.3.5)</td>
        <td><img src="http://guxunzixun.com/images/sanxingi905.jpg" alt="htc" style="width:200px;"/><br/>三星i905 (2.3)</td>
    </tr>
</table>

<br/>
另外测试小米1s(4.0)、三星note3(4.3)，美图手机,在测试中发现vivo手机所有浏览器两边有1px的白边，这是因为在计算比例的时候会有很多位小数，而一些手机缩放只能支持到2位小数，2位小数后的值被忽略造成的结果。

处理白边有一个简单粗暴的方法就是将body的背景设设为黑色，和手机边色融合，这样就看不出有白边了，这样处理就是浏览器刚进入的时候会黑一下，其实也可以设置一张背景图片，该图片中间640px白色，两边为黑色，也可以处理该问题，或者有更好的方法处理白边问题。


---------
以上