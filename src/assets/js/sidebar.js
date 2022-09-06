let btn = document.getElementById('btn');
let sideBar = document.querySelector('.sidebar');
btn.onclick=function(){
    sideBar.classList.toggle('closed')
};
let arrow = document.querySelectorAll('.arrow');
for(var i=0;i<arrow.length;i++){
    arrow[i].addEventListener('click',(e)=>{let arrowParent = e.target.parentElement.parentElement;arrowParent.classList.toggle('showMenu')})
}