import{d as u,z as s,o as c,c as p,a8 as _,B as x,aj as h,b as n,O as f,a as o}from"./index-863aa700.js";const m=u({__name:"HighlightText",props:{text:{type:[String,Number],default:""},color:{type:String,default:"#010101"},size:{type:[String,Number],default:12},separator:{type:Boolean,default:!0},bolder:{type:Boolean,default:!0},lighting:{type:Boolean,default:!0},unit:{type:String,default:""}},setup(e){const t=e,r=s(()=>typeof t.text=="number"&&t.separator?t.text.toLocaleString():t.text),d=s(()=>{let i=t.size,a="normal";const g=t.color;return typeof t.size=="number"&&(i+="px"),t.bolder&&(a="bold"),{fontSize:i,fontWeight:a,color:g,lineHeight:i}});return(i,a)=>(c(),p("span",x({class:["highlight-text",{"with-unit":!!e.unit,lighting:e.lighting}]},{"data-attr-unit":!!e.text&&e.unit},{style:d.value}),_(r.value),17))}});const l=h(m,[["__scopeId","data-v-0ec57c75"]]),b=o("br",null,null,-1),y=o("br",null,null,-1),z=o("br",null,null,-1),S=o("br",null,null,-1),B=o("br",null,null,-1),H=u({__name:"HighlightTextModule",setup(e){return(t,r)=>(c(),p(f,null,[n(l,{text:"这是高亮文本",size:"24px",unit:"unit"}),b,n(l,{text:89721836711762e-4,size:"32px",unit:"%"}),y,n(l,{text:"这是高亮文本2",size:"32px",color:"#ea28bc"}),z,n(l,{text:"这是高亮文本3，没有单位",size:"48px",color:"#8b5fda"}),S,n(l,{text:"这是高亮文本4",size:"64px",color:"#ea28bc",unit:"%",lighting:!1}),B],64))}});export{H as default};
