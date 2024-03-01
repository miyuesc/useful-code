import{aj as g,ak as y,au as l,am as d,X as h,d as v,m as b,f as a,ao as C,aZ as $,k as m,y as _}from"./index-b2fc3795.js";import{f as z}from"./format-length-c9d165c6.js";const D=e=>{const{textColorBase:n,opacity1:i,opacity2:s,opacity3:c,opacity4:o,opacity5:t}=e;return{color:n,opacity1Depth:i,opacity2Depth:s,opacity3Depth:c,opacity4Depth:o,opacity5Depth:t}},x={name:"Icon",common:g,self:D},R=x,S=y("icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,[l("color-transition",{transition:"color .3s var(--n-bezier)"}),l("depth",{color:"var(--n-color)"},[d("svg",{opacity:"var(--n-opacity)",transition:"opacity .3s var(--n-bezier)"})]),d("svg",{height:"1em",width:"1em"})]),I=Object.assign(Object.assign({},h.props),{depth:[String,Number],size:[Number,String],color:String,component:Object}),w=v({_n_icon__:!0,name:"Icon",inheritAttrs:!1,props:I,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:i}=b(e),s=h("Icon","-icon",S,R,e,n),c=a(()=>{const{depth:t}=e,{common:{cubicBezierEaseInOut:r},self:p}=s.value;if(t!==void 0){const{color:u,[`opacity${t}Depth`]:f}=p;return{"--n-bezier":r,"--n-color":u,"--n-opacity":f}}return{"--n-bezier":r,"--n-color":"","--n-opacity":""}}),o=i?C("icon",a(()=>`${e.depth||"d"}`),c,e):void 0;return{mergedClsPrefix:n,mergedStyle:a(()=>{const{size:t,color:r}=e;return{fontSize:z(t),color:r}}),cssVars:i?void 0:c,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e;const{$parent:n,depth:i,mergedClsPrefix:s,component:c,onRender:o,themeClass:t}=this;return!((e=n==null?void 0:n.$options)===null||e===void 0)&&e._n_icon__&&$("icon","don't wrap `n-icon` inside `n-icon`"),o==null||o(),m("i",_(this.$attrs,{role:"img",class:[`${s}-icon`,t,{[`${s}-icon--depth`]:i,[`${s}-icon--color-transition`]:i!==void 0}],style:[this.cssVars,this.mergedStyle]}),c?m(c):this.$slots)}});export{w as N};
