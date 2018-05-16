/*
========================
NJtools nga javascript tool lib
------------
(c), Zeg, All Rights Reserved
Distributed under MIT license
========================
*/


;(function(NAME){
/*
*Element ԭ����չ
*/
window.domExtPrototype={ 
/*
 *������ʽclass
 */
cls:function(cn){
	this.self.className += ' '+cn
	return this.self 
	},
/*
 *�趨css��ʽ
 *@param name , value , name , value , name , value ...
 *@param (obj)o/{name:value,name:value,name:value...}
 */
css:function(){
	var o = this.self, a=arguments
	if(a.length==1){
		var c = arguments[0]
		for (var k in c){
			if(k.charAt(0)=='-')
				k=this.csn(o.style,k.substr(1))
			o.style[k]=c[k]
			}
		}
	else
		for(var i=0;i<a.length;i+=2){
			if(a[i].charAt(0)=='-')
				a[i]=this.csn(o.style,a[i].substr(1))
			o.style[a[i]]=a[i+1]
			}
	return o
	},
csn:function(s,k,r){
	if( k in s)
		return k
	else{
		var kk = k.substr(0,1).toUpperCase()+k.substr(1)
		if(this.csnp[0]+kk in s)
			return this.csnp[0]+kk
		else{
			for(var i=1;i<this.csnp.length;i++){
				if(this.csnp[i]+kk in s){
					this.csnp[0] = this.csnp[i]
					return this.csnp[i]+kk
					}
				}
			}
		}
	return r?null:k
	},
csnp:[
	'',
	'webkit',
	'ms',
	'moz'
	],
/*
 *���¼�
 *@param �¼���(��on) , callback(��һ��������event)
 */
on:function(type, fn){
	if (window.addEventListener)
		this.self.addEventListener(type, fn, false); 
	else if (window.attachEvent){
		var o = this.self
		o.attachEvent('on'+type, function(){fn.call(o, window.event)} ) 
		}
	return this.self; 
	},
/*
 *�����ӽڵ�
 *@param node , node , node , node , node , node ...
 *nodeΪnullʱ����
 *nodeΪstringʱnode=document.createTextNode(node)
 *nodeΪarrayʱ
 */
add:function(){
	var o = this.self, i=0, a=arguments
	for (;i<a.length;i++){
		if(a[i]===null)
			continue
		else if(typeof a[i] =='object'){
			if(a[i].constructor==Array){
				this.add.apply(this,a[i])
				}
			else
				o.appendChild(a[i])
			}
		else
			o.appendChild(document.createTextNode(a[i].toString()))
		}
	return o
	},

/*
 *�ۺϵ���
 *@param attrName , attrValue , attrName , attrValue ... �������� ����ο�attr����
 *@param {name: value, name: value ...} ������������
 *@param event , callback , event , callback ... ע���¼� ����ο�on����
 *@param domNode , domNode ...  �����ӽڵ� (��nodeType���Ե�object��ΪdomNode) null�����ᱻ���� ����ο�add����
 *���ϲ����ɻ���
 *�趨className����ʱ��valueΪnull�����
 *�趨style����ʱvalueΪ{cssName: value, cssName: value ...}
 */
call:function(){
	for(var i=0;i<arguments.length;++i){
		var a = arguments[i]
		if(a===null)
			continue
		else if(typeof a == 'object'){
			if(a.constructor==Array)
				this.add.apply(this,a)
			else if(a.nodeType)
				this.self.appendChild(a)
			else
				for(var k in a)
					this.attr(k,a[k])
			}
		else
			this.attr(a,arguments[++i])
		}
	return this.self
	},
/*
 *�趨���Ի���ʽ���¼�ע��
 *@param name , value 
 *@param event , callback 
 *@param {name: value, name: value ...}
 *�Զ����������� _ ��ͷ
 *�趨classNameʱ��valueΪnull����� ����Ϊ��ӵ�ԭclassName��β
 *�趨styleʱvalueΪ'cssName:value;cssName:value;...'��{cssName: value, cssName: value ...}
 */
attr:function(k,v){
	if(typeof v == 'function' && k.substr(0,2)=='on')
		return this.on(k.substr(2),v)
	if(arguments.length==1 && typeof k =='object'){
		for(var i in k)
			this.attr(i,k[i])
		return this.self
		}
	var o = this.self
	switch(k){
		case 'className':
			if(v===null)
				o.className=null
			else if(v)
				o.className+=' '+v
			break
		case 'style':
			if(typeof v=='string'){
				var n=0,m=0,c=v.length-2
				while(n>-1 && n<c && (m=v.indexOf(':',n))>0)
					o.style[v.slice(n,m)]=v.slice(m+1,(n=v.indexOf(';',m+1))>-1?n++:undefined)
				//v = v.split(/:|;/)
				//for(var s=0;s<v.length;++s)
				//	o.style[v[s]]=v[++s]
				}
			else
				for(var s in v)
					o.style[s]=v[s]
			break
		case 'id':
		case 'innerHTML':
		case 'title':
		case 'checked':
		case 'accessKey':
		case 'dir':
		case 'disabled':
		case 'lang':
		case 'tabIndex':
		case 'width':
		case 'value':
		case 'height':
			o[k]=v
			break
		default:
			if(k.charAt(0)=='_')
				o[k]=v
			else
				o.setAttribute(k,v)
		}
	return o
	}
}//oe


/*
*Ϊelementԭ�������ۺϵ��ú���$0
*/
if (window.Element)
    window.Element.prototype.$0=function(){return this._.call.apply(this._,arguments)}
else//ie6 ie7
	var $0ie = function(){return this._.call.apply(this._,arguments)}

/*
ȡԪ�ػ��½�Ԫ��
*/
window[NAME] = function (o){//fs
if(typeof o == 'string'){
	if(o.charAt(0)=='/')
		o = document.createElement(o.substr(1))
	else if(o.charAt(0)=='<'){//$('<span>') or $('<span/>') or $('<span>abcd</span>')
		var x
		if(x=o.match(/^<?\/?([a-zA-Z0-9]+)\/?>?$/))
			o = document.createElement(x[1])
		else{
			x = document.createElement('span')
			x.innerHTML = o
			o = x.firstChild
			}
		}
	else
		o = document.getElementById(o)
	}
if(o!==null){
	if(o._==null){
		o._=function(){}
		o._.prototype=domExtPrototype
		o._ = new o._
		o._.self = o
		if(!('$0' in o))//ie6 ie7
			o.$0=$0ie
		}
	if(arguments[1]!==undefined){
		delete arguments[0]
		arguments[0] = null
		o._.call.apply(o._,arguments)
		}
	}
return o
}//fe

})(window.$ ? '_$' : '$');//ָ������������ �����޸�

/**
//����:

//�½�Ԫ��
var x = $('/span')

//��idȡԪ�� 
var x = $('xxoo')

//����
$('/span','id','xxoo','style','width:100%',$('/span'),'className','xxoo')//ʹ��������һ������

$('xxoo').$0('style',{width:'100%'},$('/span'),'onclick',function(e){alert(123)}).$0('className','xxoo')//ʹ��$0���� $0�ο�domExtPrototype.call

$('/span')._.cls('xxxxoooo')._.attr('title','abcd')._.add($('/span'),$('/div'),'test text')//ʹ�ò�ͬ�ķ�����ʽ���� ʹ�òο�domExtPrototype

*/


