import{k as ae,m as L,K as ie,aT as G,r as F,L as de,X as E,ae as O,v as j,_,n as B,q as x,p as s,t as S,R as U,d as M,x as V,z as D,y as N,A as K,h as y,D as se,G as I,V as le,T as ue}from"./index-863aa700.js";import{b as W}from"./cssr-95f8c3f2.js";import{g as ce}from"./get-slot-1efb97e5.js";const be={radioSizeSmall:"14px",radioSizeMedium:"16px",radioSizeLarge:"18px",labelPadding:"0 8px",labelFontWeight:"400"},he=e=>{const{borderColor:o,primaryColor:t,baseColor:a,textColorDisabled:n,inputColorDisabled:f,textColor2:r,opacityDisabled:l,borderRadius:d,fontSizeSmall:v,fontSizeMedium:g,fontSizeLarge:C,heightSmall:b,heightMedium:R,heightLarge:m,lineHeight:w}=e;return Object.assign(Object.assign({},be),{labelLineHeight:w,buttonHeightSmall:b,buttonHeightMedium:R,buttonHeightLarge:m,fontSizeSmall:v,fontSizeMedium:g,fontSizeLarge:C,boxShadow:`inset 0 0 0 1px ${o}`,boxShadowActive:`inset 0 0 0 1px ${t}`,boxShadowFocus:`inset 0 0 0 1px ${t}, 0 0 0 2px ${L(t,{alpha:.2})}`,boxShadowHover:`inset 0 0 0 1px ${t}`,boxShadowDisabled:`inset 0 0 0 1px ${o}`,color:a,colorDisabled:f,colorActive:"#0000",textColor:r,textColorDisabled:n,dotColorActive:t,dotColorDisabled:o,buttonBorderColor:o,buttonBorderColorActive:t,buttonBorderColorHover:o,buttonColor:a,buttonColorActive:a,buttonTextColor:r,buttonTextColorActive:t,buttonTextColorHover:t,opacityDisabled:l,buttonBoxShadowFocus:`inset 0 0 0 1px ${t}, 0 0 0 2px ${L(t,{alpha:.3})}`,buttonBoxShadowHover:"inset 0 0 0 1px #0000",buttonBoxShadow:"inset 0 0 0 1px #0000",buttonBorderRadius:d})},fe={name:"Radio",common:ae,self:he},q=fe,ve={name:String,value:{type:[String,Number,Boolean],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},X=ie("n-radio-group");function ge(e){const o=G(e,{mergedSize(i){const{size:u}=e;if(u!==void 0)return u;if(r){const{mergedSizeRef:{value:h}}=r;if(h!==void 0)return h}return i?i.mergedSize.value:"medium"},mergedDisabled(i){return!!(e.disabled||r!=null&&r.disabledRef.value||i!=null&&i.disabled.value)}}),{mergedSizeRef:t,mergedDisabledRef:a}=o,n=F(null),f=F(null),r=de(X,null),l=F(e.defaultChecked),d=E(e,"checked"),v=W(d,l),g=O(()=>r?r.valueRef.value===e.value:v.value),C=O(()=>{const{name:i}=e;if(i!==void 0)return i;if(r)return r.nameRef.value}),b=F(!1);function R(){if(r){const{doUpdateValue:i}=r,{value:u}=e;_(i,u)}else{const{onUpdateChecked:i,"onUpdate:checked":u}=e,{nTriggerFormInput:h,nTriggerFormChange:c}=o;i&&_(i,!0),u&&_(u,!0),h(),c(),l.value=!0}}function m(){a.value||g.value||R()}function w(){m(),n.value&&(n.value.checked=g.value)}function z(){b.value=!1}function k(){b.value=!0}return{mergedClsPrefix:r?r.mergedClsPrefixRef:j(e).mergedClsPrefixRef,inputRef:n,labelRef:f,mergedName:C,mergedDisabled:a,renderSafeChecked:g,focus:b,mergedSize:t,handleRadioInputChange:w,handleRadioInputBlur:z,handleRadioInputFocus:k}}const pe=B("radio",`
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`,[x("checked",[s("dot",`
 background-color: var(--n-color-active);
 `)]),s("dot-wrapper",`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),B("radio-input",`
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 cursor: pointer;
 `),s("dot",`
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[S("&::before",`
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),x("checked",{boxShadow:"var(--n-box-shadow-active)"},[S("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),s("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),U("disabled",`
 cursor: pointer;
 `,[S("&:hover",[s("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),x("focus",[S("&:not(:active)",[s("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),x("disabled",`
 cursor: not-allowed;
 `,[s("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[S("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),x("checked",`
 opacity: 1;
 `)]),s("label",{color:"var(--n-text-color-disabled)"}),B("radio-input",`
 cursor: not-allowed;
 `)])]),me=Object.assign(Object.assign({},V.props),ve),ke=M({name:"Radio",props:me,setup(e){const o=ge(e),t=V("Radio","-radio",pe,q,e,o.mergedClsPrefix),a=D(()=>{const{mergedSize:{value:v}}=o,{common:{cubicBezierEaseInOut:g},self:{boxShadow:C,boxShadowActive:b,boxShadowDisabled:R,boxShadowFocus:m,boxShadowHover:w,color:z,colorDisabled:k,colorActive:i,textColor:u,textColorDisabled:h,dotColorActive:c,dotColorDisabled:p,labelPadding:$,labelLineHeight:T,labelFontWeight:A,[I("fontSize",v)]:H,[I("radioSize",v)]:P}}=t.value;return{"--n-bezier":g,"--n-label-line-height":T,"--n-label-font-weight":A,"--n-box-shadow":C,"--n-box-shadow-active":b,"--n-box-shadow-disabled":R,"--n-box-shadow-focus":m,"--n-box-shadow-hover":w,"--n-color":z,"--n-color-active":i,"--n-color-disabled":k,"--n-dot-color-active":c,"--n-dot-color-disabled":p,"--n-font-size":H,"--n-radio-size":P,"--n-text-color":u,"--n-text-color-disabled":h,"--n-label-padding":$}}),{inlineThemeDisabled:n,mergedClsPrefixRef:f,mergedRtlRef:r}=j(e),l=N("Radio",r,f),d=n?K("radio",D(()=>o.mergedSize.value[0]),a,e):void 0;return Object.assign(o,{rtlEnabled:l,cssVars:n?void 0:a,themeClass:d==null?void 0:d.themeClass,onRender:d==null?void 0:d.onRender})},render(){const{$slots:e,mergedClsPrefix:o,onRender:t,label:a}=this;return t==null||t(),y("label",{class:[`${o}-radio`,this.themeClass,this.rtlEnabled&&`${o}-radio--rtl`,this.mergedDisabled&&`${o}-radio--disabled`,this.renderSafeChecked&&`${o}-radio--checked`,this.focus&&`${o}-radio--focus`],style:this.cssVars},y("input",{ref:"inputRef",type:"radio",class:`${o}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur}),y("div",{class:`${o}-radio__dot-wrapper`}," ",y("div",{class:[`${o}-radio__dot`,this.renderSafeChecked&&`${o}-radio__dot--checked`]})),se(e.default,n=>!n&&!a?null:y("div",{ref:"labelRef",class:`${o}-radio__label`},n||a)))}}),xe=B("radio-group",`
 display: inline-block;
 font-size: var(--n-font-size);
`,[s("splitor",`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[x("checked",{backgroundColor:"var(--n-button-border-color-active)"}),x("disabled",{opacity:"var(--n-opacity-disabled)"})]),x("button-group",`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[B("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),s("splitor",{height:"var(--n-height)"})]),B("radio-button",`
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `,[B("radio-input",`
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `),s("state-border",`
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `),S("&:first-child",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[s("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),S("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[s("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),U("disabled",`
 cursor: pointer;
 `,[S("&:hover",[s("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),U("checked",{color:"var(--n-button-text-color-hover)"})]),x("focus",[S("&:not(:active)",[s("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),x("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),x("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function Ce(e,o,t){var a;const n=[];let f=!1;for(let r=0;r<e.length;++r){const l=e[r],d=(a=l.type)===null||a===void 0?void 0:a.name;d==="RadioButton"&&(f=!0);const v=l.props;if(d!=="RadioButton"){n.push(l);continue}if(r===0)n.push(l);else{const g=n[n.length-1].props,C=o===g.value,b=g.disabled,R=o===v.value,m=v.disabled,w=(C?2:0)+(b?0:1),z=(R?2:0)+(m?0:1),k={[`${t}-radio-group__splitor--disabled`]:b,[`${t}-radio-group__splitor--checked`]:C},i={[`${t}-radio-group__splitor--disabled`]:m,[`${t}-radio-group__splitor--checked`]:R},u=w<z?i:k;n.push(y("div",{class:[`${t}-radio-group__splitor`,u]}),l)}}return{children:n,isButtonGroup:f}}const Re=Object.assign(Object.assign({},V.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),ye=M({name:"RadioGroup",props:Re,setup(e){const o=F(null),{mergedSizeRef:t,mergedDisabledRef:a,nTriggerFormChange:n,nTriggerFormInput:f,nTriggerFormBlur:r,nTriggerFormFocus:l}=G(e),{mergedClsPrefixRef:d,inlineThemeDisabled:v,mergedRtlRef:g}=j(e),C=V("Radio","-radio-group",xe,q,e,d),b=F(e.defaultValue),R=E(e,"value"),m=W(R,b);function w(c){const{onUpdateValue:p,"onUpdate:value":$}=e;p&&_(p,c),$&&_($,c),b.value=c,n(),f()}function z(c){const{value:p}=o;p&&(p.contains(c.relatedTarget)||l())}function k(c){const{value:p}=o;p&&(p.contains(c.relatedTarget)||r())}le(X,{mergedClsPrefixRef:d,nameRef:E(e,"name"),valueRef:m,disabledRef:a,mergedSizeRef:t,doUpdateValue:w});const i=N("Radio",g,d),u=D(()=>{const{value:c}=t,{common:{cubicBezierEaseInOut:p},self:{buttonBorderColor:$,buttonBorderColorActive:T,buttonBorderRadius:A,buttonBoxShadow:H,buttonBoxShadowFocus:P,buttonBoxShadowHover:Y,buttonColor:J,buttonColorActive:Q,buttonTextColor:Z,buttonTextColorActive:ee,buttonTextColorHover:oe,opacityDisabled:te,[I("buttonHeight",c)]:re,[I("fontSize",c)]:ne}}=C.value;return{"--n-font-size":ne,"--n-bezier":p,"--n-button-border-color":$,"--n-button-border-color-active":T,"--n-button-border-radius":A,"--n-button-box-shadow":H,"--n-button-box-shadow-focus":P,"--n-button-box-shadow-hover":Y,"--n-button-color":J,"--n-button-color-active":Q,"--n-button-text-color":Z,"--n-button-text-color-hover":oe,"--n-button-text-color-active":ee,"--n-height":re,"--n-opacity-disabled":te}}),h=v?K("radio-group",D(()=>t.value[0]),u,e):void 0;return{selfElRef:o,rtlEnabled:i,mergedClsPrefix:d,mergedValue:m,handleFocusout:k,handleFocusin:z,cssVars:v?void 0:u,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender}},render(){var e;const{mergedValue:o,mergedClsPrefix:t,handleFocusin:a,handleFocusout:n}=this,{children:f,isButtonGroup:r}=Ce(ue(ce(this)),o,t);return(e=this.onRender)===null||e===void 0||e.call(this),y("div",{onFocusin:a,onFocusout:n,ref:"selfElRef",class:[`${t}-radio-group`,this.rtlEnabled&&`${t}-radio-group--rtl`,this.themeClass,r&&`${t}-radio-group--button-group`],style:this.cssVars},f)}});export{ye as N,ke as a,q as r};
