import{p as c}from"./chunk-3WXPHVZ4-D--FIW4O.js";import{J as s,ag as m,o as e}from"./index-BqQtutl2.js";var u=`.p-auth-header {
  position: sticky;
  z-index: 99;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60px;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: var(--text-color);
  background-color: var(--theme-background-color);
  opacity: 0.97;
}
.p-auth-header .left {
  position: absolute;
  left: 0;
  min-width: 60px;
  height: 100%;
}
.p-auth-header .left .header-back-btn {
  position: absolute;
  z-index: 100;
  top: 16px;
  left: 16px;
  font-size: 28px;
}
.p-auth-header .middle .info-request {
  position: initial;
  width: auto;
}
.p-auth-header .middle .info-title {
  padding-top: 0;
  margin-top: 4px;
}
.p-auth-header .middle .info-address {
  justify-content: center;
  align-items: center;
  width: 140px;
  padding-top: 2px;
  margin: auto;
  margin-top: 10px;
  text-align: center;
}
.p-auth-header .middle .info-address .copy-icon {
  position: relative;
  top: 1px;
}
.p-auth-header .right {
  position: absolute;
  right: 0;
  min-width: 60px;
  height: 100%;
}
@media (min-width: 600px) {
  .p-auth-header {
    width: calc(100 * var(--vw));
  }
}
`,g=i=>{var n,r;let{children:d,leftContent:o,rightContent:p,onBack:t}=i,{displayBackBtn:a=!1}=i,h=s(),{customRouter:l}=m();return t&&(a=!0),(o||((r=(n=l==null?void 0:l.history)==null?void 0:n.length)!=null?r:0)<=1)&&(a=!1),e.createElement("div",{className:"width-100"},e.createElement("style",null,u),e.createElement("div",{className:"p-auth-header"},e.createElement("div",{className:"left"},e.createElement(e.Fragment,null,a&&e.createElement(c,{className:"header-back-btn",name:"circle_back",onClick:()=>{t?t():h(-1)}}),o)),e.createElement("div",{className:"middle"},d),e.createElement("div",{className:"right"},p)))},v=g;export{v as w};
