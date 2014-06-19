# FishMVC

简单的MVC架构，大幅提高开发效率和减低维护成本。
依赖jquery或zepto

##	目录

*	[特性](#特性)
*	[快速上手](#快速上手)
*	[web新的结构](#web新的结构)


##	特性

1.	元素预绑定
2.	事件预绑定
3.	方法预定义

## 快速上手


### 书写方式
	
	<script type="text/html">
        var IndexController = FishMVC.View.extend({
            init: function () {
            },
            elements: {
                '#country': 'country',
                '#countryCode': 'countryCode',
                '#loginBtn' : 'login',
                '#weidianPhone':'phone'
            },
            events: {
                'change country': 'doCountry',
                'click login':'doLogin'
            },
            doCountry:function(target){
            },
            doLogin: function(){
            }
        });
	var indexController = new IndexController({el: $('.wrapper')});
	</script>

### 使用方法
    <script  type="text/html">
        var indexController = new IndexController({el: $('.wrapper')});
    </script>
实例化IndexController，传递的对象el属性标示元素选择范围，默认为document.body。



    <script type="text/html">
        init: function () {
         },
    </script>
init函数为初始化函数，实例化后立即执行。

    <script type="text/html">
        elements: {
            '#country': 'country',
            '#countryCode': 'countryCode',
            '#loginBtn' : 'login',
            '#weidianPhone':'phone'
        }
    </script>

elements对象的属性为需要绑定的元素，``'#country': 'country'``表明实例化的对象拥有country这个属性，该属性缓存了id为country元素，即：``this.country = $('#country')``

如果是未来元素需要在属性名称后加上_rel,比如：``'#country': 'country_rel'``,未来元素使用的方法为``this['country_rel']()``,调用一次后，下次可以直接使用this.country



	<script type="text/html">
        events: {
            'change country': 'doCountry',
            'click login':'doLogin'
        }
    </script>
events对象集合了所有dom元素要绑定的方法，``'change country': 'doCountry'``，change：事件名称，country：触发事件的元素，这里是this.country，doCountry：绑定的方法



	<script type="text/html">
        doCountry:function(target){
        }
    </script>
doCountry为要绑定的方法，target为事件触发的对象，必须要表明的是，该方法this作用域指向的是实例对象。



### web新的结构

build地址：

	<script type="build/html">
        服务端build地址：meitu-web/build.xml
        静态build地址：meitu-web/web/build/build.xml
    </script>

前端人员需要同时引入两个build文件，服务端开发人员只要引入服务端build

服务端build命令解析

	<script type="build/html">
        dist.product.war  生成线上环境war包
        dist.test.war.and.optimize  生成测试环境war包
        reinstall.product.for.local.dev  本地启动服务器 *将vm虚拟机打开后直接点击此命令开启本地服务器，无须登录虚拟机  链接的是线上数据
        reinstall.test.for.front.dev  本地启动服务器 *将vm虚拟机打开后直接点击此命令开启本地服务器，无须登录虚拟机 链接的是本地数据
        scp.to.test.server.and.deploy 将测试环境war包部署到测试环境
        scp.to.test.server.and.deploy.for.windows  将测试环境war包部署到测试环境 *windows部署命令
    </script>
    
静态build命令解析

	<script type="build/html">
        develep  部署静态资源到测试环境，不优化代码
        test  部署静态资源到测试环境，优化代码
    </script>
    
    
需要修改的服务端build配置

    <script type="build/html">
        <!-- 虚拟机中tomcat路径，请修改 -->
        <property name="vm.tomcat.path" value="/mnt/hgfs/koudai-meitu/branch_4.5.3/tomcat-koudai" /> *虚拟机部署地址
        <!-- 堡垒机账号密码，请修改 -->
        <property name="baolei.user" value="yourname" /> *堡垒机账号
        <property name="baolei.psw" value="yourpassword" /> *堡垒机密码
    </script>
    
    
    
    