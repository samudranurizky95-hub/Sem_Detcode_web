function createStars(){
const c=document.getElementById('stars');
for(let i=0;i<200;i++){
let s=document.createElement('div');
s.className='star';
s.style.width=(Math.random()*3)+'px';
s.style.height=s.style.width;
s.style.left=Math.random()*100+'%';
s.style.top=Math.random()*100+'%';
c.appendChild(s);
}
}

async function generateCode(){
const url=document.getElementById('urlInput').value.trim();
if(!url.startsWith('https://')){alert('URL wajib https://');return;}

document.getElementById('loading').classList.add('active');
document.getElementById('resultSection').classList.remove('active');

try{
let res=await fetch('https://api.resellergaming.my.id/tools/getcode?url='+encodeURIComponent(url));
let data=await res.json();

if(data.status){
document.getElementById('creator').textContent='Creator: '+data.creator;
document.getElementById('status').textContent='Status: Success';
document.getElementById('codeOutput').textContent=data.result.html;
document.getElementById('loading').classList.remove('active');
document.getElementById('resultSection').classList.add('active');
}
}catch(e){
alert('error');
}
}

function copyCode(){
navigator.clipboard.writeText(document.getElementById('codeOutput').textContent);
}

function downloadCode(){
let code=document.getElementById('codeOutput').textContent;
let blob=new Blob([code],{type:'text/html'});
let a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download='hasil-code.html';
a.click();
}

createStars();
