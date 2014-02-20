/**
 * Created by fudongguang on 14-2-18.
 */
test("cookieSession", function () {
	equal(111, 111);
});

asyncTest("cookieLocal", function () {
	expect(2);
	setTimeout(function () {
		equal(111, 111);
		equal(1, 1);
		start();
	}, 100)
});


/******** view 测试 start ********/

var IndexController_init;

var IndexController = FishMvc.View.extend({
	init:function(){
		IndexController_init=1;
	},

	elements:{
		'#idSelecter':'idSelecter',
		'.classSelecter':'classSelecter',
		'hr':'tagSelecter',
		'.refreshEl':'refreshEl_rel'
	},

	events:{
		'click idSelecter':'doIdSelecter'
	},

	doIdSelecter:function(){
		this.el.append('<div class="refreshEl">refreshEl</div>');
	}
});

var indexController = new IndexController();
var indexControllera = new IndexController({el:$('#idSelecter')});

//测试初始化函数
test('IndexController_init',function(){
	equal(IndexController_init,1);
});

//测试id选择器
test('idSelecter',function(){
	var t = $('#idSelecter').text();
	equal(indexController.idSelecter.text(),t);
});

//测试类选择器
test('classSelecter',function(){
	var a = $('.classSelecter');
	var b = indexController.classSelecter;

	equal(a.length, b.length);
	equal(a[0].innerText, b[0].innerText);
	equal(a[1].innerText, b[1].innerText);
});

//测试tag选择器
test('tagSelecter',function(){
	var a = $('hr');
	var b = indexController.tagSelecter;

	equal(a.length, b.length);
	equal(a[0].innerText, b[0].innerText);
});

//测试el是否正确
test('testEl',function(){
	var a = indexController.el[0].tagName;
	var b = indexControllera.el[0].tagName;
	equal(a.toLowerCase(),'body');
	equal(b.toLocaleLowerCase(),'div');
});


//测试click 这个和《测试rel元素》的顺序不能反
test('testClickIdSelecter',function(){
	$('.refreshEl').remove();
	indexController.idSelecter.trigger('click');
	equal($('.refreshEl').length,1);
});

//测试rel元素 依赖《测试click》
setTimeout(function(){
	test('testREL',function(){
		console.log(indexController.refreshEl_rel);
		equal({}.toString.call(indexController.refreshEl_rel),'[object Function]');
		equal(indexController.refreshEl,undefined);
		var a = indexController.refreshEl_rel();
		equal(a[0].innerText,'refreshEl');
		equal(indexController.refreshEl[0].innerText,'refreshEl');
	});
},10);

//测试view.include
test('test_view_include',function(){
	var a={testInclude:'d'};
	indexController.include(a);
	equal(indexController.testInclude,'d');
});

/******** view 测试 end ********/




/******** module 测试 start ********/

var TestModule = FishMvc.Module.extend({initTest:'test'});
var testModule = new TestModule();

//测试初始化扩展
test('Module_initTest',function(){
	equal(testModule.initTest,'test');
});

var changSexTest;
testModule.on('change:sex',function(context,val){
	changSexTest=val;
});

//测试change和set和get功能
test('Module_change_and_set',function(){
	testModule.set({sex:'nv'});
	equal(changSexTest,'nv');
	equal(testModule.get('sex'),'nv');
});

//测试del功能
test('Module_del',function(){
	testModule.del('sex');
	equal(testModule.get('sex'),undefined);
});

//测试静默功能
test('Module_silent',function(){
	testModule.set({sex:'nv'});
	equal(testModule.get('sex'),'nv');
	testModule.set({sex:'nan'},{silent:true});
	equal(changSexTest,'nv');
	equal(testModule.get('sex'),'nan');
});

//测试unset功能
test('Module_del',function(){
	testModule.set({sex:'nv'});
	equal(testModule.get('sex'),'nv');
	testModule.set({sex:'nan'},{del:true});
	equal(changSexTest,undefined);
	equal(testModule.get('sex'),undefined);
});

/******** module 测试 end ********/
