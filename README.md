# NJtools
nga javascript tool lib

NGA��̳ʹ�õĳ�����JS�������

# ʹ��
��˳�������Ҫ��ģ��

# domԪ�ز���
NJtools.part2.dom.js

Ϊ��ȫʹ��js����ҳ����� ��д��

# Ajax
NJtools.part6.http.js

ʹ��JSONP�������� �������

������й��� �������Ϊ������̬���� ������̬�����ģʽ

# ����
	function test(){
	var x
	var y = $('/div',
		'style','padding:0.5em;border:1px solid #000',
		'�������ݲ��ύ��������',
		$('/br'),
		x = $('/input','size',20),
		$('/br'),
		$('/button','innerHTML','�ύ','type','button','onclick',function(){
				$.doRequest({
					u:{
						u:'http://xxoo.com/test.php',
						a:{'val':x.value}
						},
					b:this,
					n:'data',//���������ص����ݱ�����
					f:function(d){
						console.log('�ύ�ɹ� ����������:')
						console.log(d)
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
	

