import{p,N as a,e as c}from"./Popover-5f1fd715.js";import{ao as l,af as m,aU as d,d as h,q as u,aj as n,r as g,h as f,m as v}from"./index-a2b652a7.js";function R(e,o="default",t=[]){const r=e.$slots[o];return r===void 0?t:r()}const b={padding:"8px 14px"},O=e=>{const{borderRadius:o,boxShadow2:t,baseColor:s}=e;return Object.assign(Object.assign({},b),{borderRadius:o,boxShadow:t,color:d(s,"rgba(0, 0, 0, .85)"),textColor:s})},x=l({name:"Tooltip",common:m,peers:{Popover:p},self:O}),T=x,j=Object.assign(Object.assign({},c),n.props),S=h({name:"Tooltip",props:j,__popover__:!0,setup(e){const{mergedClsPrefixRef:o}=u(e),t=n("Tooltip","-tooltip",void 0,T,e,o),s=g(null);return Object.assign(Object.assign({},{syncPosition(){s.value.syncPosition()},setShow(i){s.value.setShow(i)}}),{popoverRef:s,mergedTheme:t,popoverThemeOverrides:f(()=>t.value.self)})},render(){const{mergedTheme:e,internalExtraClass:o}=this;return v(a,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:o.concat("tooltip"),ref:"popoverRef"}),this.$slots)}});export{S as N,R as g,T as t};
