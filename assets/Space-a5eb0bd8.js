import{ai as G,d as R,n as E,v as C,E as j,x as L,U as M,h as w,aw as I,$ as P,ax as T,_ as b}from"./index-9f68446d.js";import{g as A}from"./get-slot-1efb97e5.js";const N={gapSmall:"4px 8px",gapMedium:"8px 12px",gapLarge:"12px 16px"},O=()=>N,U={name:"Space",self:O},W=U;let y;const D=()=>{if(!G)return!0;if(y===void 0){const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e);const a=e.scrollHeight===1;return document.body.removeChild(e),y=a}return y},F=Object.assign(Object.assign({},C.props),{align:String,justify:{type:String,default:"start"},inline:Boolean,vertical:Boolean,reverse:Boolean,size:{type:[String,Number,Array],default:"medium"},wrapItem:{type:Boolean,default:!0},itemClass:String,itemStyle:[String,Object],wrap:{type:Boolean,default:!0},internalUseGap:{type:Boolean,default:void 0}}),J=R({name:"Space",props:F,setup(e){const{mergedClsPrefixRef:a,mergedRtlRef:u}=E(e),d=C("Space","-space",void 0,W,e,a),t=j("Space",u,a);return{useGap:D(),rtlEnabled:t,mergedClsPrefix:a,margin:L(()=>{const{size:n}=e;if(Array.isArray(n))return{horizontal:n[0],vertical:n[1]};if(typeof n=="number")return{horizontal:n,vertical:n};const{self:{[P("gap",n)]:g}}=d.value,{row:r,col:f}=T(g);return{horizontal:b(f),vertical:b(r)}})}},render(){const{vertical:e,reverse:a,align:u,inline:d,justify:t,itemClass:n,itemStyle:g,margin:r,wrap:f,mergedClsPrefix:h,rtlEnabled:v,useGap:o,wrapItem:$,internalUseGap:B}=this,p=M(A(this),!1);if(!p.length)return null;const S=`${r.horizontal}px`,c=`${r.horizontal/2}px`,z=`${r.vertical}px`,i=`${r.vertical/2}px`,l=p.length-1,m=t.startsWith("space-");return w("div",{role:"none",class:[`${h}-space`,v&&`${h}-space--rtl`],style:{display:d?"inline-flex":"flex",flexDirection:(()=>e&&!a?"column":e&&a?"column-reverse":!e&&a?"row-reverse":"row")(),justifyContent:["start","end"].includes(t)?"flex-"+t:t,flexWrap:!f||e?"nowrap":"wrap",marginTop:o||e?"":`-${i}`,marginBottom:o||e?"":`-${i}`,alignItems:u,gap:o?`${r.vertical}px ${r.horizontal}px`:""}},!$&&(o||B)?p:p.map((x,s)=>x.type===I?x:w("div",{role:"none",class:n,style:[g,{maxWidth:"100%"},o?"":e?{marginBottom:s!==l?z:""}:v?{marginLeft:m?t==="space-between"&&s===l?"":c:s!==l?S:"",marginRight:m?t==="space-between"&&s===0?"":c:"",paddingTop:i,paddingBottom:i}:{marginRight:m?t==="space-between"&&s===l?"":c:s!==l?S:"",marginLeft:m?t==="space-between"&&s===0?"":c:"",paddingTop:i,paddingBottom:i}]},x)))}});export{J as N};