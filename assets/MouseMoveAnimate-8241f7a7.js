import{d as x,r as m,q as v,g as b,o as h,c as M,a as u,a7 as w,_ as H}from"./index-6ddd7161.js";const _=w('<div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHJhbmRvbSUyMG9iamVjdHN8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div><div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsdWV8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div><div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div><div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZW58ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div><div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHVycGxlfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div><div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div><div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1520338258525-606b90f95b04?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjBibHVlfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div><div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1521127474489-d524412fd439?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fHJhbmRvbSUyMG9iamVjdHN8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div><div class="tile" data-v-3b3793f0><img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=70" data-v-3b3793f0></div>',9),g=[_],D=x({__name:"MouseMoveAnimate",setup(y){const a=m(),t=m(),e=i=>{if(a.value&&t.value){const s=i.clientX,p=i.clientY,f=s/a.value.clientWidth,c=p/a.value.clientHeight,n=t.value.offsetWidth-a.value.clientWidth,d=t.value.offsetHeight-a.value.clientHeight,l=n*f*-1,r=d*c*-1,o=t.value.animate({transform:`translate(${l}px, ${r}px)`},{duration:4e3,fill:"forwards",easing:"ease"});o.onfinish=()=>o.cancel()}};return v(()=>{window.addEventListener("mousemove",e)}),b(()=>{window.removeEventListener("mousemove",e)}),(i,s)=>(h(),M("div",{ref_key:"box",ref:a,class:"animation-box"},[u("div",{ref_key:"gallery",ref:t,class:"gallery"},g,512)],512))}});const W=H(D,[["__scopeId","data-v-3b3793f0"]]);export{W as default};
