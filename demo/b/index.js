/**
 * Created by fudongguang on 14-2-10.
 */

var A={a:'a',b:'b'};
var  AA = Backbone.Model.extend();
var a = new AA(A);

a.on('change:a',function(context,value){
	console.log(value);
});

a.set({a:'ffff'});
var d = a.get('a');

console.log(d);

