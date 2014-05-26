var clona = function (obj) {
	var newObj = {}, self = this;

	if(self.isArray(obj)){
		newObj = [];
	}

	var cloneObject = (function (a, b) {
		if (self.isObject(a)) {
			for (k in a) {
				if (a.hasOwnProperty(k)) {
					if (self.isObject(a[k])) {
						b[k] = {};
						arguments.callee(a[k], b[k]);
					} else if (self.isArray(a[k])) {
						b[k] = [];
						arguments.callee(a[k], b[k]);
					} else {
						b[k] = a[k];
					}
				}
			}
		} else if (self.isArray(a)) {
			for (k in a) {
				if (self.isObject(a[k])) {
					b[k] = {};
					arguments.callee(a[k], b[k]);
				} else if (self.isArray(a[k])) {
					b[k] = [];
					arguments.callee(a[k], b[k]);
				} else {
					b[k] = a[k];
				}
			}
		}
	}(obj, newObj));

	return newObj;
};


function testSort(arr){
	arr.sort(function(a,b){
		return a-b;
	})
}

function testSortA(arr){
	arr.sort(function(a,b){
		return a[1]-b[1];
	})
}

function testSortB(arr){
	arr.sort(function(a,b){
		return a[2]-b[2];
	})
}

//测试unset功能
test('testSort',function(){
	var a=[1,4,3];
	testSort(a);
	equal(1,a[0]);
	equal(3,a[1]);
	equal(4,a[2]);

	var b = [[1,3,1],[2,1,1],[4,5,1],[6,9,0],[7,7,0]];


	testSortA(b);
	testSortB(b);
	console.log(b);


});