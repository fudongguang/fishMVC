#Gulp 使用教程

####安装node.js

####安装Gulp
    npm install gulp -g
    npm install gulp --save-dev
    
    安装组件
    npm install gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev 
    
gulp只有五个方法： task，run，watch，src，和dest

    gulp.task(name,[], fn) 创建一个新命令 [*]依赖任务
    gulp.run(tasks...) 尽可能多的并行运行多个task,新版run已经被start取代
    gulp.watch(glob, fn) 当文件内容发生改变时，执行fn
    gulp.src(glob) 返回一个可读的glob
    gulp.dest(glob) 返回一个可写的glob
    
* 注：文件或者文件的编号（被称为“glob”）

示例：

	gulp.task('js', function () {
	   return gulp.src('js/*.js')
	      .pipe(jshint())
	      .pipe(jshint.reporter('default'))
	      .pipe(uglify())
	      .pipe(concat('app.js'))
	      .pipe(gulp.dest('build'));
	});
	
其整个过程如下图所示
<img src="http://p0.qhimg.com/t01c6591bd2705a2ee7.png" style="width:550px;"/>

其使用数据流进行构建，读取到穿件创建最终文件一步完成，而Grunt不使用数据流，而是使用文件，对文件执行单个任务然后保存到新的文件中，每个任务都会重复执行所有进程，文件系统频繁的处理任务会导致Grunt的运行速度比Gulp慢。



#####Gulp 配置    
在项目根目录新建一个js文件并命名为 gulpfile.js，把下面的代码粘贴进去：
    
    
gulpfile.js
 
	// 引入 gulp 
	 var gulp = require('gulp'); 
	
	 // 引入组件 
	 var jshint = require('gulp-jshint'); 
	 var sass = require('gulp-sass'); 
	 var concat = require('gulp-concat'); 
	 var uglify = require('gulp-uglify'); 
	 var rename = require('gulp-rename');
	
	 // 检查脚本 
	 gulp.task('lint', function() { 
	     gulp.src('./js/*.js') 
	         .pipe(jshint()) 
	         .pipe(jshint.reporter('default')); 
	 });
	
	 // 合并，压缩文件 
	 gulp.task('scripts', function() { 
	     gulp.src('./js/*.js') 
	         .pipe(concat('all.js')) 
	         .pipe(gulp.dest('./dist')) 
	         .pipe(rename('all.min.js')) 
	         .pipe(uglify()) 
	         .pipe(gulp.dest('./dist')); 
	 });
	
	 // 默认任务 
	 gulp.task('default', function(){ 
	     gulp.run('lint', 'scripts');
	
	     // 监听文件变化 
	     gulp.watch('./js/*.js', function(){ 
	         gulp.run('lint', 'scripts'); 
	     }); 
	 }); 

####Gulp 运行    
gulp
这将执行定义的default任务，换言之，这和以下的命令式同一个意思

gulp default
当然，我们可以运行在gulpfile.js中定义的任意任务，比如，现在运行sass任务：

gulp scripts

##Gulp.src(globs[, options])
####globs
glob文件聚或数组<br/>
type: **String** or **Array**




gulp.src()方法输入一个glob(比如匹配一个或多个文件的字符串)或者glob数组，然后返回一个可以传递给插件的数据流。

Gulp使用node-glob来从你指定的glob里面获取文件，这里列举下面的例子来阐述，方便大家理解：

* js/app.js 精确匹配文件
* js/*.js 仅匹配js目录下的所有后缀为.js的文件
* js/*/.js 匹配js目录及其子目录下所有后缀为.js的文件
* !js/app.js 从匹配结果中排除js/app.js，这种方法在你想要匹配除了特殊文件之外的所有文件时非常管用
* *.+(js|css) 匹配根目录下所有后缀为.js或者.css的文件
* !{build,build/**} 排除文件夹


##Gulp.task(name[, deps], fn)
	gulp.task('greet’,['js','css'] function () {
	   console.log('Hello world!');
	});
	
name: **String**  任务名称<br/>
deps: **Array**  依赖的任务<br/>
fn:	 **Function** 执行的具体内容
	
	
执行gulp greet的结果就是在控制台上打印出“Hello world”

这些任务不是同步进行的，所以你不能认为在js任务开始的时候css任务已经结束了，也可能还没有结束。为了确保一个任务在另一个任务执行前已经结束，可以将函数和任务数组结合起来指定其依赖关系。例如，定义一个greet任务，在执行前需要检查css任务是否已经执行完毕，这样做就是可行的:

	gulp.task('greet', [‘css’], function () {
	   // Deal with CSS here
	});
	
现在，当执行greet任务时，Gulp会先执行css任务，然后在它结束后再调用你定义的函数。



##gulp.dest(path[, options])

指定目标写入<br/>
path: **String** or **Function**  当是Function时候需要返回一个字符串，这个字符串就是写入的目标目录


##gulp.watch(glob[, cb])

监听文件变化<br/>
glob: **String** or **Array** <br/>
cb(event): **Function** 发生变化时候的回调函数

event.type: **String** 发送改变的事件名称，added, changed or deleted<br/>
event.path：**String**	触发事件的文件名称




#常用插件列表
#####gulp-requirejs requirejs优化 依赖r.js
	var gulp = require('gulp'),
	    rjs = require('gulp-requirejs');
	
	
	gulp.task('default', function() {
	    rjs({
	        baseUrl: 'new/js/',
	        name:'app',
	        out: 'cc.js'
	    })
	        .pipe(gulp.dest('dist/'))
	});
#####Del 删除文件或文件夹
install

	$ npm install --save del
usage

	var del = require('del');
	
	del(['tmp/*.js', '!tmp/unicorn.js'], function (err) {
	    console.log('Files deleted');
	});

