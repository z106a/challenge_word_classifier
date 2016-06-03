'use strict';const MAX_DEEP=3;const ALPHABET="abcdefghijklmnopqrstuvwxyz'$";const ALPHABET_LENGTH=ALPHABET.length;function normalize(word){return word.toLowerCase()+'$'}class HuffmanTree{constructor(scheme){this.root=[,];Object.keys(scheme).forEach(char=>this.insert(char,scheme[char]))}insert(char,path){let cur=this.root;const l=path.length-1;path.split('').forEach((dir,idx)=>{if(dir==='0'){if(idx===l){cur[0]=char}else{cur=cur[0]||(cur[0]=[])}}else{if(idx===l){cur[1]=char}else{cur=cur[1]||(cur[1]=[])}}})}read(reader){let cur=this.root;function readMore(){if(reader.bit()){if(Array.isArray(cur[1])){cur=cur[1];return readMore()}else{return cur[1]}}else{if(Array.isArray(cur[0])){cur=cur[0];return readMore()}else{return cur[0]}}}return readMore()}}class BitReader{constructor(buffer){this.buffer=new Uint8Array(buffer);this.cursor=0}get(idx){const bufferIdx=Math.floor(idx/8);const bitIdx=7-(idx-bufferIdx*8);const byte=this.buffer[bufferIdx];return(byte&(1<<bitIdx))>>bitIdx}bit(){return this.get(this.cursor++)}char(){return ALPHABET[(this.bit()<<4)|(this.bit()<<3)|(this.bit()<<2)|(this.bit()<<1)|this.bit()]}chars(n,codes){if(n<5){const res=[];for(let i=0;i<n;i+=1){res.push(codes[n+':'+i].read(this))}return res}let i=0;const chars=[];while(i++ <n){chars.push(this.char())}return chars}}function test(tree,word){const normalized=normalize(word);let current=tree;for(let i=0,l=normalized.length;i<l;i+=1){const char=normalized[i];if('prob'in current){const prob=parseInt(current['prob'],10);const deep=current.deep==='18+'?18:parseInt(current.deep,10);if(normalized.length-i>parseInt(current.deep,10)){return false}return Math.random()<(1-Math.pow(1/prob,2)-Math.pow(1/deep,Math.E))}if(!(char in current)){return false}current=current[char]}return true}function deserialize(buffer,tables,maxDeep){const codes=Object.keys(tables).reduce((all,group)=>{all[group]=new HuffmanTree(tables[group]);return all},{});if(!maxDeep){maxDeep=MAX_DEEP}const reader=new BitReader(buffer);function readNode(level){const result={};let chars=[];const length=codes.length.read(reader);switch(length){case '0':{chars=['$'];break}case '1':case '2':case '3':case '4':{chars=reader.chars(parseInt(length,10),codes);break}default:{for(let i=0;i<ALPHABET_LENGTH;i+=1){if(reader.bit()){chars.push(ALPHABET[i])}}}}for(let i=0,l=chars.length;i<l;i+=1){const char=chars[i];if(char!=='$'){if(level<maxDeep){result[char]=readNode(level+1)}else{const deep=codes.deep.read(reader);if(deep==='1'){result[char]={'$':{}}}else{const prob=codes.prob.read(reader);result[char]={'deep':deep,'prob':prob}}}}else{result[char]={}}}return result}return readNode(0)}const tables={"1:0":{"a":"100","b":"001100","c":"00111","d":"111100","e":"1110","f":"101100","g":"110100","h":"00001","i":"1010","j":"1101011101","k":"1101010","l":"11011","m":"00000","n":"11111","o":"0001","p":"111101","q":"1101011100","r":"0010","s":"01","t":"10111","u":"1100","v":"0011011","w":"0011010","x":"110101111","y":"101101","z":"11010110"},"2:0":{"'":"100","a":"111","b":"00000","c":"0100","d":"11010","e":"101","f":"110110","g":"00100","h":"01010","i":"0111","j":"000111110","k":"000110","l":"11000","m":"00101","n":"0011","o":"11001","p":"00010","q":"000111000","r":"01011","s":"0110","t":"110111","u":"00001","v":"00011110","w":"0001111111","x":"000111001","y":"00011101","z":"0001111110"},"2:1":{"$":"1","'":"0101011101","b":"01010111111","c":"01010111110","d":"0011111","e":"01011","f":"01111111","g":"01010110","h":"001110","i":"0001","k":"0111100","l":"00110","m":"0111110","n":"01101","o":"0100","p":"01111110","q":"0101011100","r":"01100","s":"0000","t":"01110","u":"0010","v":"0101010","w":"0011110","x":"0101011110","y":"010100","z":"0111101"},"3:0":{"a":"10","b":"01100","c":"000","d":"11011","e":"111","f":"01010","g":"001111","h":"01110","i":"1100","k":"110100","l":"0100","m":"01101","n":"00110","o":"110101","p":"011111","q":"0111101110","r":"01011","s":"0010","t":"001110","u":"0111100","v":"011110100","x":"011110110","y":"0111101111","z":"011110101"},"3:1":{"'":"110","b":"101000111","c":"1110010","d":"1110011","e":"100","f":"1110110","g":"111000","h":"11111","i":"011","j":"10100010","k":"111010","l":"0011","m":"10101","n":"0101","o":"1011","p":"01001","q":"101000110","r":"0010","s":"000","t":"11110","u":"01000","v":"1010010","w":"1110111","y":"1010011","z":"1010000"},"3:2":{"$":"0","'":"10011010","h":"1110000","i":"1000","k":"11100010","l":"110010","m":"1001100","n":"11000","o":"1111","p":"110011","r":"11101","s":"1011","t":"1010","u":"1101","v":"11100011","w":"100111","x":"10011011","y":"10010","z":"111001"},"4:0":{"a":"0","b":"1000","c":"1011","d":"11110","e":"110","f":"100101","g":"10101","h":"10011","i":"11100","j":"10010010","k":"1001000","l":"10100","m":"111010","n":"111110","o":"1110110","p":"1110111","r":"1111110","s":"1111111","t":"100100110","v":"100100111"},"4:1":{"b":"111100","c":"110110","d":"11000","e":"00","f":"110011","g":"110010","h":"11111","i":"100","j":"11110110","k":"01110","l":"1110","m":"01111","n":"1010","o":"1011","p":"110111","r":"11010","s":"010","t":"01100","u":"01101","v":"111101010","w":"111101011","x":"11110100","y":"111101111","z":"111101110"},"4:2":{"'":"01","d":"1110001","e":"0011101","f":"0010010","g":"0010011","h":"0011100","i":"110","k":"001010","l":"11101","m":"111001","n":"11110","o":"100","p":"10101","r":"1011","s":"000","t":"11111","u":"10100","v":"001011","w":"1110000","x":"001000","y":"00110","z":"001111"},"4:3":{"$":"1","e":"00000111","f":"00000110","h":"00001110","i":"01011111","k":"0101110","l":"01011110","m":"0000110","n":"000010","o":"0111","p":"000000","q":"00001111","r":"0011","s":"0001","t":"0100","u":"0110","v":"0000010","w":"010110","y":"0010","z":"01010"},"deep":{"1":"1100","10":"1000","11":"11110","12":"10011","13":"111111","14":"111110","15":"100100","16":"1001010","17":"10010110","18+":"10010111","2":"1110","3":"1011","4":"000","5":"010","6":"011","7":"001","8":"1101","9":"1010"},"length":{"0":"110","1":"111","2":"101","3":"1001","4":"1000","5+":"0"},"prob":{"10":"100001","11":"1000001","12":"1000000","2":"1110","3":"00","4":"01","5":"110","6":"101","7":"1111","8":"1001","9":"10001"}};var tree=null;module.exports={init:function(data){tree=deserialize(new Uint8Array(data).buffer,tables)},test:function(word){return test(tree,word)}};