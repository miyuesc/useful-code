import{q as g,k as y,t as l,l as d,v as h,d as v,n as b,x as a,y as C,aP as $,h as m,Q as _}from"./index-86571271.js";import{f as z}from"./format-length-c9d165c6.js";const x=e=>{const{textColorBase:n,opacity1:i,opacity2:s,opacity3:c,opacity4:o,opacity5:t}=e;return{color:n,opacity1Depth:i,opacity2Depth:s,opacity3Depth:c,opacity4Depth:o,opacity5Depth:t}},D={name:"Icon",common:g,self:x},P=D,R=y("icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,[l("color-transition",{transition:"color .3s var(--n-bezier)"}),l("depth",{color:"var(--n-color)"},[d("svg",{opacity:"var(--n-opacity)",transition:"opacity .3s var(--n-bezier)"})]),d("svg",{height:"1em",width:"1em"})]),S=Object.assign(Object.assign({},h.props),{depth:[String,Number],size:[Number,String],color:String,component:Object}),L=v({_n_icon__:!0,name:"Icon",inheritAttrs:!1,props:S,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:i}=b(e),s=h("Icon","-icon",R,P,e,n),c=a(()=>{const{depth:t}=e,{common:{cubicBezierEaseInOut:r},self:p}=s.value;if(t!==void 0){const{color:u,[`opacity${t}Depth`]:f}=p;return{"--n-bezier":r,"--n-color":u,"--n-opacity":f}}return{"--n-bezier":r,"--n-color":"","--n-opacity":""}}),o=i?C("icon",a(()=>`${e.depth||"d"}`),c,e):void 0;return{mergedClsPrefix:n,mergedStyle:a(()=>{const{size:t,color:r}=e;return{fontSize:z(t),color:r}}),cssVars:i?void 0:c,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e;const{$parent:n,depth:i,mergedClsPrefix:s,component:c,onRender:o,themeClass:t}=this;return!((e=n==null?void 0:n.$options)===null||e===void 0)&&e._n_icon__&&$("icon","don't wrap `n-icon` inside `n-icon`"),o==null||o(),m("i",_(this.$attrs,{role:"img",class:[`${s}-icon`,t,{[`${s}-icon--depth`]:i,[`${s}-icon--color-transition`]:i!==void 0}],style:[this.cssVars,this.mergedStyle]}),c?m(c):this.$slots)}});export{L as N};
