//-->forEach：用来遍历数组中的每一项
//1、数组中有几项，那么我们传递进去的匿名回调函数就需要执行几次
//2、每一次执行匿名函数的时候，还给其传递了三个参数值:数组中的当前项item，当前项的索引index，原始的数组input
//3、理论上我们的方法是没哟返回值的，仅仅是遍历数组中的每一项，不对原来的数组进行修改，但是我们可以通过数组的索引来修改原来的数组
var ary = [12, 3, 4, 5, 6];
ary.forEach(function() {
  console.log("ok");
});
var res = ary.forEach(function(item, index, input) {
  input[index] = item * 10;
});

//map方法
//1、map的回调函数中支持return返回值，return是啥，相当于
//2、不管是forEach还是map都在ie6、7、8下不兼容
var ary = [12, 3, 4, 67, 8];
var res = ary.map(function(item, index, input) {
  return item * 10;
});
//匿名回调函数的this是window
var obj = { name: 10 };
var ary = [12, 3, 4, 67, 8];
var res = ary.map(
  function(item, index, input) {
    return this;
  }.call(obj)
); //undefined
var res = ary.map(
  function(item, index, input) {
    return this;
  }.bind(obj)
);

//不管是forEach还是map都支持两个参数，第二个参数是匿名函数的this
var res = ary.map(function(item, index, input) {
  return this;
}, obj);
Array.prototype.myForEach=function(callback,context){
    
}