# NJtools
nga javascript tool lib

NGA��̳ʹ�õĳ�����JS�������

# ʹ��
��˳�������Ҫ��ģ��

# domԪ�ز���
NJtools.part2.dom.js

Ϊ��ȫʹ��js����ҳ����� ��д��

## ����1
	//�򵥵�д�� ʹ��������һ������ �����ο�domExtPrototype.call
	document.body.appendChild(
		$('/div',//б�߼�nodeName����
			'style','padding:0.5em;border:1px solid #000',
			$('/span','style','color:#f00')._.add(
				'�켺',//add����������ֻ�node
				$('/span','style','fontWeight:bold','innerHTML','���ұ���'),
				'����',
				),
			$('/br'),
			$('/a','innerHTML','���','href','javascript:void(0)','onclick',function(){
				alert('test test 123')
				})
			)
		)

## ����2
	$('/span')._.cls('xxxxoooo')._.attr('title','abcd')._.add($('/span'),$('/div'),'test text')//ʹ�ò�ͬ�ķ�����ʽ���� ʹ�òο�domExtPrototype

	var x = $('xxoo')//����б��������ȡnode �൱��document.getElementById
	x.$0('className','xxoo','style',{width:'100%'},$('/span'),'onclick',function(e){alert(123)})//ʹ��$0����һ�������� $0�Ĳ����ο�domExtPrototype.call
			
	$('/span').$0('className','xxoo').$0('style','width:100%')//��ʽ����$0

# Ajax
NJtools.part6.http.js

ʹ��JSONP�������� �������

ʹ����������� �������ᰴ��ִ�е�˳�����δ��� �����ڶԷ��������Ⱥ�˳�����е����

�ж����ַ���� �������Ϊ������̬���� ������̬�����ģʽ


## ����1
	function test(){
	var x
	var y = $('/div',
		'style','padding:0.5em;border:1px solid #000',
		$('/br'),
		x = $('/input','size',20,'placeholder','�������ݲ��ύ��������'),
		$('/br'),
		$('/button','innerHTML','�ύ','type','button','onclick',function(){
				$.doRequest({
					u:'http://xxoo.com/test.php'+encodeURIComponent(x.value),//get��ʽ ���Կ���
					b:this,
					n:'data',//���������ص����ݱ�����
					f:function(d){
						console.log('�ύ�ɹ� ����������:')
						console.log(d)
						return true
						},
					ff:function(){
						console.log('����ʧ��')
						}
					})
				}
			)
		)
	document.body.appendChild(y)
	}//f
	test()

## ����2
	function test(){
	var x
	var y = $('/div',
		'style','padding:0.5em;border:1px solid #000',
		$('/br'),
		x = $('/input','size',20,'placeholder','�������ݲ��ύ��������'),
		$('/br'),
		$('/button','innerHTML','�ύ','type','button','onclick',function(){
				$.doRequest({
					u:{//post ��ʽ
						u:'http://xxoo.com/test.php',
						a:{'val':x.value}
						},
					b:this,
					n:'data',//���������ص����ݱ�����
					f:function(d){
						console.log('�ύ�ɹ� ����������:')
						console.log(d)
						return true
						},
					ff:function(){
						console.log('����ʧ��')
						}
					})
				}
			)
		)
	document.body.appendChild(y)
	}//f
	test()


## ����3
	function test(){
	var x
	var y = $('/div',
		'style','padding:0.5em;border:1px solid #000',
		$('/button','innerHTML','�����ַ����','type','button','onclick',function(){
				$.doRequest({
					u:[//�����ַ
						'http://xxoo.com/test.cache.js',//��̬�����ַ
						'http://xxoo.com/test.php'//��̬�����ַ �ڷ�������ͬʱˢ�¾�̬����
						],
					b:this,
					n:'data',//���������ص����ݱ�����
					f:function(d){
						var now = (new Date()).getTime()/1000
						if(d.time<(now-3600)){
							console.log('���泬ʱ ������һ����ַ')
							return false
							}
						console.log(d)
						return true
						},
					ff:function(){
						console.log('����ʧ�ܻ򻺴泬ʱ')
						}
					})
				}
			)
		)
	document.body.appendChild(y)
	}//f
	test()

