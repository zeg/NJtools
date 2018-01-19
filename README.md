# NJtools
nga javascript tool lib

NGA论坛使用的超轻量JS工具组合

# 使用
按顺序加载需要的模块

# dom元素操作
NJtools.part2.dom.js

为完全使用js构建页面设计 书写简单

# Ajax
NJtools.part6.http.js

使用JSONP传输数据 方便跨域

请求队列功能 便于设计为先请求静态缓存 再请求动态程序的模式

# 例子
	function test(){
	var x
	var y = $('/div',
		'style','padding:0.5em;border:1px solid #000',
		'输入内容并提交到服务器',
		$('/br'),
		x = $('/input','size',20),
		$('/br'),
		$('/button','innerHTML','提交','type','button','onclick',function(){
				$.doRequest({
					u:{
						u:'http://xxoo.com/test.php',
						a:{'val':x.value}
						},
					b:this,
					n:'data',//服务器返回的数据变量名
					f:function(d){
						console.log('提交成功 服务器返回:')
						console.log(d)
						},
					ff:function(){
						console.log('请求失败')
						}
					})
				}
			)
		)
	document.body.appendChild(y)
	}//f
	test()
	

