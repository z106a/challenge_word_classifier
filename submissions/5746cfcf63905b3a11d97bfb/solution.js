"use strict";
let aa=v=>{let a=2166136261;for(let i=0;i<v.length;i++){let c=v.charCodeAt(i),d=c&0xff00;if(d)a=mu(a^d>>8);a=mu(a^c&0xff);}return mi(a)},mu=a=>a+(a<<1)+(a<<4)+(a<<7)+(a<<8)+(a<<24),ab=a=>mi(mu(a)),mi=a=>{a+=a<<13;a^=a>>>7;a+=a<<3;a^=a>>>17;a+=a<<5;return a & 0xffffffff;},t={},bf=(a,k)=>{let bu=t.bu=[],m=a.length*32,n=a.length,i=-1;t.m=m=n*32;t.k=k;while(++i<n)bu[i]=a[i];t._lo=[];},lo=v=>{let k=t.k,m=t.m,r=t._lo,a=aa(v),b=ab(a),x=a%m;for(let i=0;i<k;i++){r[i]=x<0?(x+m):x;x=(x+b)%m;}return r;},test=v=>{let l=lo(v),k=t.k,bu=t.bu;for(let i=0;i<k;i++){let b=l[i];if((bu[Math.floor(b/32)]&(1<<(b%32)))==0)return 0;}return 1;},fb=b=>{let a=Array(b.length/4);for(let i=0;i<a.length;i++)a[i]=b.readInt32BE(i*4);return a;},LS=5,LE=13,CE="qjvzbwxufp",C=["xy","'jzq","'qj","jqx'","jqx"],r=(w,i)=>C[i].indexOf(w[i]),pw=w=>w.length>=LS&&w.length<=LE&&CE.indexOf(w[w.length-1])+r(w,0)+r(w,1)+r(w,2)+r(w,3)+r(w,4)==-6?w:0;module.exports={init:d=>bf(fb(d),1),test:w=>pw(w)?test(pw(w)):(w.length==1?true:false)}