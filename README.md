# FishMVC

简单的MVC架构，大幅提高开发效率和减低维护成本。
依赖jquery或zepto

##	目录

*	[特性](#特性)
*	[快速上手](#快速上手)


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
实例化IndexController，传递的对象el属性标示元素选择范围。



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