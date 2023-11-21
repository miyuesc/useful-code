import{a3 as rr,a4 as tr,d as nr,m as er,a as ir,c as ar,O as cr}from"./index-a8b6c4c2.js";var D={exports:{}};(function(S,O){(function(g,_){S.exports=_()})(tr,function(){var g=document,_=g.createTextNode.bind(g);function w(r,t,n){r.style.setProperty(t,n)}function y(r,t){return r.appendChild(t)}function v(r,t,n,e){var i=g.createElement("span");return t&&(i.className=t),n&&(!e&&i.setAttribute("data-"+t,n),i.textContent=n),r&&y(r,i)||i}function C(r,t){return r.getAttribute("data-"+t)}function p(r,t){return!r||r.length==0?[]:r.nodeName?[r]:[].slice.call(r[0].nodeName?r:(t||g).querySelectorAll(r))}function T(r){for(var t=[];r--;)t[r]=[];return t}function m(r,t){r&&r.some(t)}function q(r){return function(t){return r[t]}}function R(r,t,n){var e="--"+t,i=e+"-index";m(n,function(a,c){Array.isArray(a)?m(a,function(o){w(o,i,c)}):w(a,i,c)}),w(r,e+"-total",n.length)}var x={};function A(r,t,n){var e=n.indexOf(r);if(e==-1)n.unshift(r),m(x[r].depends,function(a){A(a,r,n)});else{var i=n.indexOf(t);n.splice(e,1),n.splice(i,0,r)}return n}function u(r,t,n,e){return{by:r,depends:t,key:n,split:e}}function F(r){return A(r,0,[]).map(q(x))}function s(r){x[r.by]=r}function j(r,t,n,e,i){r.normalize();var a=[],c=document.createDocumentFragment();e&&a.push(r.previousSibling);var o=[];return p(r.childNodes).some(function(l){if(l.tagName&&!l.hasChildNodes()){o.push(l);return}if(l.childNodes&&l.childNodes.length){o.push(l),a.push.apply(a,j(l,t,n,e,i));return}var f=l.wholeText||"",L=f.trim();L.length&&(f[0]===" "&&o.push(_(" ")),m(L.split(n),function(Z,W){W&&i&&o.push(v(c,"whitespace"," ",i));var M=v(c,t,Z);a.push(M),o.push(M)}),f[f.length-1]===" "&&o.push(_(" ")))}),m(o,function(l){y(c,l)}),r.innerHTML="",y(r,c),a}var d=0;function H(r,t){for(var n in t)r[n]=t[n];return r}var b="words",k=u(b,d,"word",function(r){return j(r,"word",/\s+/,0,1)}),E="chars",G=u(E,[b],"char",function(r,t,n){var e=[];return m(n[b],function(i,a){e.push.apply(e,j(i,"char","",t.whitespace&&a))}),e});function P(r){r=r||{};var t=r.key;return p(r.target||"[data-splitting]").map(function(n){var e=n["🍌"];if(!r.force&&e)return e;e=n["🍌"]={el:n};var i=F(r.by||C(n,"splitting")||E),a=H({},r);return m(i,function(c){if(c.split){var o=c.by,l=(t?"-"+t:"")+c.key,f=c.split(n,a,e);l&&R(n,l,f),e[o]=f,n.classList.add(o)}}),n.classList.add("splitting"),e})}function I(r){r=r||{};var t=r.target=v();return t.innerHTML=r.content,P(r),t.outerHTML}P.html=I,P.add=s;function N(r,t,n){var e=p(t.matching||r.children,r),i={};return m(e,function(a){var c=Math.round(a[n]);(i[c]||(i[c]=[])).push(a)}),Object.keys(i).map(Number).sort(V).map(q(i))}function V(r,t){return r-t}var z=u("lines",[b],"line",function(r,t,n){return N(r,{matching:n[b]},"offsetTop")}),B=u("items",d,"item",function(r,t){return p(t.matching||r.children,r)}),U=u("rows",d,"row",function(r,t){return N(r,t,"offsetTop")}),Y=u("cols",d,"col",function(r,t){return N(r,t,"offsetLeft")}),$=u("grid",["rows","cols"]),h="layout",J=u(h,d,d,function(r,t){var n=t.rows=+(t.rows||C(r,"rows")||1),e=t.columns=+(t.columns||C(r,"columns")||1);if(t.image=t.image||C(r,"image")||r.currentSrc||r.src,t.image){var i=p("img",r)[0];t.image=i&&(i.currentSrc||i.src)}t.image&&w(r,"background-image","url("+t.image+")");for(var a=n*e,c=[],o=v(d,"cell-grid");a--;){var l=v(o,"cell");v(l,"cell-inner"),c.push(l)}return y(r,o),c}),K=u("cellRows",[h],"row",function(r,t,n){var e=t.rows,i=T(e);return m(n[h],function(a,c,o){i[Math.floor(c/(o.length/e))].push(a)}),i}),Q=u("cellColumns",[h],"col",function(r,t,n){var e=t.columns,i=T(e);return m(n[h],function(a,c){i[c%e].push(a)}),i}),X=u("cells",["cellRows","cellColumns"],"cell",function(r,t,n){return n[h]});return s(k),s(G),s(z),s(B),s(U),s(Y),s($),s(J),s(K),s(Q),s(X),P})})(D);var or=D.exports;const lr=rr(or),sr={class:"splitting-image-cover"},ur=cr('<div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01753453b660de14e9.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01bbd94b90e850d1d3.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t019fd908f724f51900.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t016ad88ddaf2ae2d92.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01cd97ec806b712059.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01a78941bc25ae2cf9.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01028e5f2ec69e423d.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01a7117bbc9683a7eb.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t015d4f327880dddb26.jpg" alt=""></div>',9),mr=[ur],fr=nr({__name:"SplittingImageCover",setup(S){return er(()=>lr({target:".tiler",by:"cells",rows:3,columns:3,image:!0})),(O,g)=>(ir(),ar("div",sr,mr))}});export{fr as default};
