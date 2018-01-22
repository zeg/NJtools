# NJtools
nga javascript tool lib

NGA论坛使用的超轻量JS工具组合

# 使用
按顺序加载需要的模块

# dom元素操作
NJtools.part2.dom.js

为完全使用js构建页面设计 书写简单

## 例子1
	//简单的写法 使用主函数一次生成 参数参看domExtPrototype.call
	document.body.appendChild(
		$('/div',//斜线加nodeName生成
			'style','padding:0.5em;border:1px solid #000',
			$('/span','style','color:#f00')._.add(
				'戊己',//add方法添加文字或node
				$('/span','style','fontWeight:bold','innerHTML','甲乙丙丁'),
				'庚辛',
				),
			$('/br'),
			$('/a','innerHTML','点击','href','javascript:void(0)','onclick',function(){
				alert('test test 123')
				})
			)
		)

## 例子2
	$('/span')._.cls('xxxxoooo')._.attr('title','abcd')._.add($('/span'),$('/div'),'test text')//使用不同的方法链式调用 使用参看domExtPrototype

	var x = $('xxoo')//不加斜线用来获取node 相当于document.getElementById
	x.$0('className','xxoo','style',{width:'100%'},$('/span'),'onclick',function(e){alert(123)})//使用$0方法一次性设置 $0的参数参看domExtPrototype.call
			
	$('/span').$0('className','xxoo').$0('style','width:100%')//链式调用$0

# Ajax
NJtools.part6.http.js

使用JSONP传输数据 方便跨域

使用了请求队列 多个请求会按照执行的顺序依次处理 适用于对返回数据先后顺序敏感的情况

有多组地址功能 便于设计为先请求静态缓存 再请求动态程序的模式


## 例子1
	function test(){
	var x
	var y = $('/div',
		'style','padding:0.5em;border:1px solid #000',
		$('/br'),
		x = $('/input','size',20,'placeholder','输入内容并提交到服务器'),
		$('/br'),
		$('/button','innerHTML','提交','type','button','onclick',function(){
				$.doRequest({
					u:'http://xxoo.com/test.php'+encodeURIComponent(x.value),//get方式 可以跨域
					b:this,
					n:'data',//服务器返回的数据变量名
					f:function(d){
						console.log('提交成功 服务器返回:')
						console.log(d)
						return true
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

## 例子2
	function test(){
	var x
	var y = $('/div',
		'style','padding:0.5em;border:1px solid #000',
		$('/br'),
		x = $('/input','size',20,'placeholder','输入内容并提交到服务器'),
		$('/br'),
		$('/button','innerHTML','提交','type','button','onclick',function(){
				$.doRequest({
					u:{//post 方式
						u:'http://xxoo.com/test.php',
						a:{'val':x.value}
						},
					b:this,
					n:'data',//服务器返回的数据变量名
					f:function(d){
						console.log('提交成功 服务器返回:')
						console.log(d)
						return true
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


## 例子3
	function test(){
	var x
	var y = $('/div',
		'style','padding:0.5em;border:1px solid #000',
		$('/button','innerHTML','多组地址测试','type','button','onclick',function(){
				$.doRequest({
					u:[//多组地址
						'http://xxoo.com/test.cache.js',//静态缓存地址
						'http://xxoo.com/test.php'//动态程序地址 在返回数据同时刷新静态缓存
						],
					b:this,
					n:'data',//服务器返回的数据变量名
					f:function(d){
						var now = (new Date()).getTime()/1000
						if(d.time<(now-3600)){
							console.log('缓存超时 请求下一个地址')
							return false
							}
						console.log(d)
						return true
						},
					ff:function(){
						console.log('请求失败或缓存超时')
						}
					})
				}
			)
		)
	document.body.appendChild(y)
	}//f
	test()

