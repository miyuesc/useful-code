import{p as i,N as n,e as a}from"./Popover-40d896d2.js";import{aq as c,aj as m,aV as l,d as h,m as d,X as r,r as v,f as g,k as u}from"./index-6ddd7161.js";const f={padding:"8px 14px"},b=e=>{const{borderRadius:s,boxShadow2:t,baseColor:o}=e;return Object.assign(Object.assign({},f),{borderRadius:s,boxShadow:t,color:l(o,"rgba(0, 0, 0, .85)"),textColor:o})},O=c({name:"Tooltip",common:m,peers:{Popover:i},self:b}),x=O,T=Object.assign(Object.assign({},a),r.props),R=h({name:"Tooltip",props:T,__popover__:!0,setup(e){const{mergedClsPrefixRef:s}=d(e),t=r("Tooltip","-tooltip",void 0,x,e,s),o=v(null);return Object.assign(Object.assign({},{syncPosition(){o.value.syncPosition()},setShow(p){o.value.setShow(p)}}),{popoverRef:o,mergedTheme:t,popoverThemeOverrides:g(()=>t.value.self)})},render(){const{mergedTheme:e,internalExtraClass:s}=this;return u(n,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:s.concat("tooltip"),ref:"popoverRef"}),this.$slots)}});export{R as N,x as t};
