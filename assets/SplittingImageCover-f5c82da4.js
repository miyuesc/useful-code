import{bL as tr,bM as nr,d as er,V as ir,o as ar,c as or,ay as cr}from"./index-9f68446d.js";var R={exports:{}};(function(q,F){(function(g,w){q.exports=w()})(nr,function(){var g=document,w=g.createTextNode.bind(g);function y(r,t,n){r.style.setProperty(t,n)}function C(r,t){return r.appendChild(t)}function v(r,t,n,i){var e=g.createElement("span");return t&&(e.className=t),n&&(!i&&e.setAttribute("data-"+t,n),e.textContent=n),r&&C(r,e)||e}function P(r,t){return r.getAttribute("data-"+t)}function b(r,t){return!r||r.length==0?[]:r.nodeName?[r]:[].slice.call(r[0].nodeName?r:(t||g).querySelectorAll(r))}function A(r){for(var t=[];r--;)t[r]=[];return t}function m(r,t){r&&r.some(t)}function E(r){return function(t){return r[t]}}function H(r,t,n){var i="--"+t,e=i+"-index";m(n,function(a,o){Array.isArray(a)?m(a,function(c){y(c,e,o)}):y(a,e,o)}),y(r,i+"-total",n.length)}var S={};function L(r,t,n){var i=n.indexOf(r);if(i==-1){n.unshift(r);var e=S[r];if(!e)throw new Error("plugin not loaded: "+r);m(e.depends,function(o){L(o,r,n)})}else{var a=n.indexOf(t);n.splice(i,1),n.splice(a,0,r)}return n}function u(r,t,n,i){return{by:r,depends:t,key:n,split:i}}function I(r){return L(r,0,[]).map(E(S))}function s(r){S[r.by]=r}function j(r,t,n,i,e){r.normalize();var a=[],o=document.createDocumentFragment();i&&a.push(r.previousSibling);var c=[];return b(r.childNodes).some(function(l){if(l.tagName&&!l.hasChildNodes()){c.push(l);return}if(l.childNodes&&l.childNodes.length){c.push(l),a.push.apply(a,j(l,t,n,i,e));return}var f=l.wholeText||"",p=f.trim();if(p.length){f[0]===" "&&c.push(w(" "));var W=n===""&&typeof Intl.Segmenter=="function";m(W?Array.from(new Intl.Segmenter().segment(p)).map(function(T){return T.segment}):p.split(n),function(T,rr){rr&&e&&c.push(v(o,"whitespace"," ",e));var D=v(o,t,T);a.push(D),c.push(D)}),f[f.length-1]===" "&&c.push(w(" "))}}),m(c,function(l){C(o,l)}),r.innerHTML="",C(r,o),a}var d=0;function k(r,t){for(var n in t)r[n]=t[n];return r}var _="words",O=u(_,d,"word",function(r){return j(r,"word",/\s+/,0,1)}),M="chars",V=u(M,[_],"char",function(r,t,n){var i=[];return m(n[_],function(e,a){i.push.apply(i,j(e,"char","",t.whitespace&&a))}),i});function x(r){r=r||{};var t=r.key;return b(r.target||"[data-splitting]").map(function(n){var i=n["🍌"];if(!r.force&&i)return i;i=n["🍌"]={el:n};var e=r.by||P(n,"splitting");(!e||e=="true")&&(e=M);var a=I(e),o=k({},r);return m(a,function(c){if(c.split){var l=c.by,f=(t?"-"+t:"")+c.key,p=c.split(n,o,i);f&&H(n,f,p),i[l]=p,n.classList.add(l)}}),n.classList.add("splitting"),i})}function G(r){r=r||{};var t=r.target=v();return t.innerHTML=r.content,x(r),t.outerHTML}x.html=G,x.add=s;function N(r,t,n){var i=b(t.matching||r.children,r),e={};return m(i,function(a){var o=Math.round(a[n]);(e[o]||(e[o]=[])).push(a)}),Object.keys(e).map(Number).sort(z).map(E(e))}function z(r,t){return r-t}var B=u("lines",[_],"line",function(r,t,n){return N(r,{matching:n[_]},"offsetTop")}),U=u("items",d,"item",function(r,t){return b(t.matching||r.children,r)}),Y=u("rows",d,"row",function(r,t){return N(r,t,"offsetTop")}),$=u("cols",d,"col",function(r,t){return N(r,t,"offsetLeft")}),J=u("grid",["rows","cols"]),h="layout",K=u(h,d,d,function(r,t){var n=t.rows=+(t.rows||P(r,"rows")||1),i=t.columns=+(t.columns||P(r,"columns")||1);if(t.image=t.image||P(r,"image")||r.currentSrc||r.src,t.image){var e=b("img",r)[0];t.image=e&&(e.currentSrc||e.src)}t.image&&y(r,"background-image","url("+t.image+")");for(var a=n*i,o=[],c=v(d,"cell-grid");a--;){var l=v(c,"cell");v(l,"cell-inner"),o.push(l)}return C(r,c),o}),Q=u("cellRows",[h],"row",function(r,t,n){var i=t.rows,e=A(i);return m(n[h],function(a,o,c){e[Math.floor(o/(c.length/i))].push(a)}),e}),X=u("cellColumns",[h],"col",function(r,t,n){var i=t.columns,e=A(i);return m(n[h],function(a,o){e[o%i].push(a)}),e}),Z=u("cells",["cellRows","cellColumns"],"cell",function(r,t,n){return n[h]});return s(O),s(V),s(B),s(U),s(Y),s($),s(J),s(K),s(Q),s(X),s(Z),x})})(R);var lr=R.exports;const sr=tr(lr),ur={class:"splitting-image-cover"},mr=cr('<div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01753453b660de14e9.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01bbd94b90e850d1d3.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t019fd908f724f51900.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t016ad88ddaf2ae2d92.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01cd97ec806b712059.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01a78941bc25ae2cf9.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01028e5f2ec69e423d.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t01a7117bbc9683a7eb.jpg" alt=""></div><div class="tiler"><img src="https://browser9.qhimg.com/bdm/1000_618_85/t015d4f327880dddb26.jpg" alt=""></div>',9),dr=[mr],gr=er({__name:"SplittingImageCover",setup(q){return ir(()=>sr({target:".tiler",by:"cells",rows:3,columns:3,image:!0})),(F,g)=>(ar(),or("div",ur,dr))}});export{gr as default};