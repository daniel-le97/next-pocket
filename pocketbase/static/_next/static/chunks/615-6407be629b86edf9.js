(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[615],{9008:function(e,t,n){e.exports=n(42636)},3688:function(e,t,n){"use strict";n.d(t,{Z:function(){return E}});var r,a=n(67294),o=["second","minute","hour","day","week","month","year"],l=["秒","分钟","小时","天","周","个月","年"],u={},i=function(e,t){u[e]=t},s=function(e){return u[e]||u.en_US},c=[60,60,24,7,365/7/12,12];function d(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}function p(e,t){for(var n=e<0?1:0,r=e=Math.abs(e),a=0;e>=c[a]&&a<c.length;a++)e/=c[a];return a*=2,(e=Math.floor(e))>(0===a?9:1)&&(a+=1),t(e,a,r)[n].replace("%s",e.toString())}function f(e,t){return(+(t?d(t):new Date)-+d(e))/1e3}var b="timeago-id";function m(e){return parseInt(e.getAttribute(b))}var v={},h=function(e){clearTimeout(e),delete v[e]};function g(e){e?h(m(e)):Object.keys(v).forEach(h)}i("en_US",function(e,t){if(0===t)return["just now","right now"];var n=o[Math.floor(t/2)];return e>1&&(n+="s"),[e+" "+n+" ago","in "+e+" "+n]}),i("zh_CN",function(e,t){if(0===t)return["刚刚","片刻后"];var n=l[~~(t/2)];return[e+" "+n+"前",e+" "+n+"后"]});var x=(r=function(e,t){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),y=function(){return(y=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},T=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)0>t.indexOf(r[a])&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n},E=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.dom=null,t}return x(t,e),t.prototype.componentDidMount=function(){this.renderTimeAgo()},t.prototype.componentDidUpdate=function(){this.renderTimeAgo()},t.prototype.renderTimeAgo=function(){var e,t=this.props,n=t.live,r=t.datetime,a=t.locale,o=t.opts;g(this.dom),!1!==n&&(this.dom.setAttribute("datetime",""+(r instanceof Date?r.getTime():r)),((e=this.dom).length?e:[e]).forEach(function(e){!function e(t,n,r,a){h(m(t));var o=a.relativeDate,l=a.minInterval,u=f(n,o);t.innerText=p(u,r);var i=setTimeout(function(){e(t,n,r,a)},Math.min(1e3*Math.max(function(e){for(var t=1,n=0,r=Math.abs(e);e>=c[n]&&n<c.length;n++)e/=c[n],t*=c[n];return r%=t,Math.ceil(r=r?t-r:t)}(u),l||1),2147483647));v[i]=0,function(e,t){e.setAttribute(b,t)}(t,i)}(e,e.getAttribute("datetime"),s(a),o||{})}))},t.prototype.componentWillUnmount=function(){g(this.dom)},t.prototype.render=function(){var e=this,t=this.props,n=t.datetime,r=(t.live,t.locale),o=t.opts,l=T(t,["datetime","live","locale","opts"]);return a.createElement("time",y({ref:function(t){e.dom=t}},l),p(f(n,o&&o.relativeDate),s(r)))},t.defaultProps={live:!0,className:""},t}(a.PureComponent)},9211:function(e,t,n){"use strict";n.d(t,{O:function(){return j}});var r,a,o,l=n(67294),u=n(12351),i=n(19946),s=n(32984),c=n(61363),d=n(84575),p=n(16723),f=n(23784);function b(e){var t;if(e.type)return e.type;let n=null!=(t=e.as)?t:"button";if("string"==typeof n&&"button"===n.toLowerCase())return"button"}var m=n(3855),v=n(46045);function h({onFocus:e}){let[t,n]=(0,l.useState)(!0);return t?l.createElement(v._,{as:"button",type:"button",features:v.A.Focusable,onFocus:t=>{t.preventDefault();let r,a=50;r=requestAnimationFrame(function t(){if(a--<=0){r&&cancelAnimationFrame(r);return}if(e()){n(!1),cancelAnimationFrame(r);return}r=requestAnimationFrame(t)})}}):null}var g=n(73781),x=n(81021),y=n(15466);let T=l.createContext(null);function E({children:e}){let t=l.useRef({groups:new Map,get(e,t){var n;let r=this.groups.get(e);r||(r=new Map,this.groups.set(e,r));let a=null!=(n=r.get(t))?n:0;return r.set(t,a+1),[Array.from(r.keys()).indexOf(t),function(){let e=r.get(t);e>1?r.set(t,e-1):r.delete(t)}]}});return l.createElement(T.Provider,{value:t},e)}function O(e){let t=l.useContext(T);if(!t)throw Error("You must wrap your component in a <StableCollection>");let n=function(){var e,t,n;let r=null!=(n=null==(t=null==(e=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)?void 0:e.ReactCurrentOwner)?void 0:t.current)?n:null;if(!r)return Symbol();let a=[],o=r;for(;o;)a.push(o.index),o=o.return;return"$."+a.join(".")}(),[r,a]=t.current.get(e,n);return l.useEffect(()=>a,[]),r}var P=((r=P||{})[r.Forwards=0]="Forwards",r[r.Backwards=1]="Backwards",r),I=((a=I||{})[a.Less=-1]="Less",a[a.Equal=0]="Equal",a[a.Greater=1]="Greater",a),w=((o=w||{})[o.SetSelectedIndex=0]="SetSelectedIndex",o[o.RegisterTab=1]="RegisterTab",o[o.UnregisterTab=2]="UnregisterTab",o[o.RegisterPanel=3]="RegisterPanel",o[o.UnregisterPanel=4]="UnregisterPanel",o);let A={0(e,t){var n;let r=(0,d.z2)(e.tabs,e=>e.current),a=(0,d.z2)(e.panels,e=>e.current),o=r.filter(e=>{var t;return!(null!=(t=e.current)&&t.hasAttribute("disabled"))}),l={...e,tabs:r,panels:a};if(t.index<0||t.index>r.length-1){let n=(0,s.E)(Math.sign(t.index-e.selectedIndex),{[-1]:()=>1,0:()=>(0,s.E)(Math.sign(t.index),{[-1]:()=>0,0:()=>0,1:()=>1}),1:()=>0});return 0===o.length?l:{...l,selectedIndex:(0,s.E)(n,{0:()=>r.indexOf(o[0]),1:()=>r.indexOf(o[o.length-1])})}}let u=r.slice(0,t.index),i=[...r.slice(t.index),...u].find(e=>o.includes(e));if(!i)return l;let c=null!=(n=r.indexOf(i))?n:e.selectedIndex;return -1===c&&(c=e.selectedIndex),{...l,selectedIndex:c}},1(e,t){var n;if(e.tabs.includes(t.tab))return e;let r=e.tabs[e.selectedIndex],a=(0,d.z2)([...e.tabs,t.tab],e=>e.current),o=null!=(n=a.indexOf(r))?n:e.selectedIndex;return -1===o&&(o=e.selectedIndex),{...e,tabs:a,selectedIndex:o}},2:(e,t)=>({...e,tabs:e.tabs.filter(e=>e!==t.tab)}),3:(e,t)=>e.panels.includes(t.panel)?e:{...e,panels:(0,d.z2)([...e.panels,t.panel],e=>e.current)},4:(e,t)=>({...e,panels:e.panels.filter(e=>e!==t.panel)})},_=(0,l.createContext)(null);function R(e){let t=(0,l.useContext)(_);if(null===t){let t=Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,R),t}return t}_.displayName="TabsDataContext";let S=(0,l.createContext)(null);function D(e){let t=(0,l.useContext)(S);if(null===t){let t=Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,D),t}return t}function M(e,t){return(0,s.E)(t.type,A,e,t)}S.displayName="TabsActionsContext";let k=l.Fragment,C=u.AN.RenderStrategy|u.AN.Static,j=Object.assign((0,u.yV)(function(e,t){var n,r;let a=(0,i.M)(),{id:o=`headlessui-tabs-tab-${a}`,...m}=e,{orientation:v,activation:h,selectedIndex:T,tabs:E,panels:P}=R("Tab"),I=D("Tab"),w=R("Tab"),A=(0,l.useRef)(null),_=(0,f.T)(A,t);(0,p.e)(()=>I.registerTab(A),[I,A]);let S=O("tabs"),M=E.indexOf(A);-1===M&&(M=S);let k=M===T,C=(0,g.z)(e=>{var t;let n=e();if(n===d.fE.Success&&"auto"===h){let e=null==(t=(0,y.r)(A))?void 0:t.activeElement,n=w.tabs.findIndex(t=>t.current===e);-1!==n&&I.change(n)}return n}),j=(0,g.z)(e=>{let t=E.map(e=>e.current).filter(Boolean);if(e.key===c.R.Space||e.key===c.R.Enter){e.preventDefault(),e.stopPropagation(),I.change(M);return}switch(e.key){case c.R.Home:case c.R.PageUp:return e.preventDefault(),e.stopPropagation(),C(()=>(0,d.jA)(t,d.TO.First));case c.R.End:case c.R.PageDown:return e.preventDefault(),e.stopPropagation(),C(()=>(0,d.jA)(t,d.TO.Last))}if(C(()=>(0,s.E)(v,{vertical:()=>e.key===c.R.ArrowUp?(0,d.jA)(t,d.TO.Previous|d.TO.WrapAround):e.key===c.R.ArrowDown?(0,d.jA)(t,d.TO.Next|d.TO.WrapAround):d.fE.Error,horizontal:()=>e.key===c.R.ArrowLeft?(0,d.jA)(t,d.TO.Previous|d.TO.WrapAround):e.key===c.R.ArrowRight?(0,d.jA)(t,d.TO.Next|d.TO.WrapAround):d.fE.Error}))===d.fE.Success)return e.preventDefault()}),z=(0,l.useRef)(!1),N=(0,g.z)(()=>{var e;z.current||(z.current=!0,null==(e=A.current)||e.focus(),I.change(M),(0,x.Y)(()=>{z.current=!1}))}),F=(0,g.z)(e=>{e.preventDefault()}),U=(0,l.useMemo)(()=>({selected:k}),[k]),L={ref:_,onKeyDown:j,onMouseDown:F,onClick:N,id:o,role:"tab",type:function(e,t){let[n,r]=(0,l.useState)(()=>b(e));return(0,p.e)(()=>{r(b(e))},[e.type,e.as]),(0,p.e)(()=>{n||t.current&&t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&r("button")},[n,t]),n}(e,A),"aria-controls":null==(r=null==(n=P[M])?void 0:n.current)?void 0:r.id,"aria-selected":k,tabIndex:k?0:-1};return(0,u.sY)({ourProps:L,theirProps:m,slot:U,defaultTag:"button",name:"Tabs.Tab"})}),{Group:(0,u.yV)(function(e,t){let{defaultIndex:n=0,vertical:r=!1,manual:a=!1,onChange:o,selectedIndex:i=null,...s}=e,c=r?"vertical":"horizontal",b=a?"manual":"auto",v=null!==i,x=(0,f.T)(t),[y,T]=(0,l.useReducer)(M,{selectedIndex:null!=i?i:n,tabs:[],panels:[]}),O=(0,l.useMemo)(()=>({selectedIndex:y.selectedIndex}),[y.selectedIndex]),P=(0,m.E)(o||(()=>{})),I=(0,m.E)(y.tabs),w=(0,l.useMemo)(()=>({orientation:c,activation:b,...y}),[c,b,y]),A=(0,g.z)(e=>(T({type:1,tab:e}),()=>T({type:2,tab:e}))),R=(0,g.z)(e=>(T({type:3,panel:e}),()=>T({type:4,panel:e}))),D=(0,g.z)(e=>{C.current!==e&&P.current(e),v||T({type:0,index:e})}),C=(0,m.E)(v?e.selectedIndex:y.selectedIndex),j=(0,l.useMemo)(()=>({registerTab:A,registerPanel:R,change:D}),[]);return(0,p.e)(()=>{T({type:0,index:null!=i?i:n})},[i]),(0,p.e)(()=>{if(void 0===C.current||y.tabs.length<=0)return;let e=(0,d.z2)(y.tabs,e=>e.current);e.some((e,t)=>y.tabs[t]!==e)&&D(e.indexOf(y.tabs[C.current]))}),l.createElement(E,null,l.createElement(S.Provider,{value:j},l.createElement(_.Provider,{value:w},w.tabs.length<=0&&l.createElement(h,{onFocus:()=>{var e,t;for(let n of I.current)if((null==(e=n.current)?void 0:e.tabIndex)===0)return null==(t=n.current)||t.focus(),!0;return!1}}),(0,u.sY)({ourProps:{ref:x},theirProps:s,slot:O,defaultTag:k,name:"Tabs"}))))}),List:(0,u.yV)(function(e,t){let{orientation:n,selectedIndex:r}=R("Tab.List"),a=(0,f.T)(t);return(0,u.sY)({ourProps:{ref:a,role:"tablist","aria-orientation":n},theirProps:e,slot:{selectedIndex:r},defaultTag:"div",name:"Tabs.List"})}),Panels:(0,u.yV)(function(e,t){let{selectedIndex:n}=R("Tab.Panels"),r=(0,f.T)(t),a=(0,l.useMemo)(()=>({selectedIndex:n}),[n]);return(0,u.sY)({ourProps:{ref:r},theirProps:e,slot:a,defaultTag:"div",name:"Tabs.Panels"})}),Panel:(0,u.yV)(function(e,t){var n,r,a,o;let s=(0,i.M)(),{id:c=`headlessui-tabs-panel-${s}`,tabIndex:d=0,...b}=e,{selectedIndex:m,tabs:h,panels:g}=R("Tab.Panel"),x=D("Tab.Panel"),y=(0,l.useRef)(null),T=(0,f.T)(y,t);(0,p.e)(()=>x.registerPanel(y),[x,y]);let E=O("panels"),P=g.indexOf(y);-1===P&&(P=E);let I=P===m,w=(0,l.useMemo)(()=>({selected:I}),[I]),A={ref:T,id:c,role:"tabpanel","aria-labelledby":null==(r=null==(n=h[P])?void 0:n.current)?void 0:r.id,tabIndex:I?d:-1};return I||null!=(a=b.unmount)&&!a||null!=(o=b.static)&&o?(0,u.sY)({ourProps:A,theirProps:b,slot:w,defaultTag:"div",features:C,visible:I,name:"Tabs.Panel"}):l.createElement(v._,{as:"span",...A})})})}}]);