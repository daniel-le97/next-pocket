(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[457],{62705:function(e,t,a){var n=a(55639).Symbol;e.exports=n},44239:function(e,t,a){var n=a(62705),s=a(89607),i=a(2333),r=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":r&&r in Object(e)?s(e):i(e)}},27561:function(e,t,a){var n=a(67990),s=/^\s+/;e.exports=function(e){return e?e.slice(0,n(e)+1).replace(s,""):e}},31957:function(e,t,a){var n="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g;e.exports=n},89607:function(e,t,a){var n=a(62705),s=Object.prototype,i=s.hasOwnProperty,r=s.toString,l=n?n.toStringTag:void 0;e.exports=function(e){var t=i.call(e,l),a=e[l];try{e[l]=void 0;var n=!0}catch(e){}var s=r.call(e);return n&&(t?e[l]=a:delete e[l]),s}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},55639:function(e,t,a){var n=a(31957),s="object"==typeof self&&self&&self.Object===Object&&self,i=n||s||Function("return this")();e.exports=i},67990:function(e){var t=/\s/;e.exports=function(e){for(var a=e.length;a--&&t.test(e.charAt(a)););return a}},23279:function(e,t,a){var n=a(13218),s=a(7771),i=a(14841),r=Math.max,l=Math.min;e.exports=function(e,t,a){var o,c,d,u,h,v,m=0,x=!1,p=!1,f=!0;if("function"!=typeof e)throw TypeError("Expected a function");function invokeFunc(t){var a=o,n=c;return o=c=void 0,m=t,u=e.apply(n,a)}function shouldInvoke(e){var a=e-v,n=e-m;return void 0===v||a>=t||a<0||p&&n>=d}function timerExpired(){var e,a,n,i=s();if(shouldInvoke(i))return trailingEdge(i);h=setTimeout(timerExpired,(e=i-v,a=i-m,n=t-e,p?l(n,d-a):n))}function trailingEdge(e){return(h=void 0,f&&o)?invokeFunc(e):(o=c=void 0,u)}function debounced(){var e,a=s(),n=shouldInvoke(a);if(o=arguments,c=this,v=a,n){if(void 0===h)return m=e=v,h=setTimeout(timerExpired,t),x?invokeFunc(e):u;if(p)return clearTimeout(h),h=setTimeout(timerExpired,t),invokeFunc(v)}return void 0===h&&(h=setTimeout(timerExpired,t)),u}return t=i(t)||0,n(a)&&(x=!!a.leading,d=(p="maxWait"in a)?r(i(a.maxWait)||0,t):d,f="trailing"in a?!!a.trailing:f),debounced.cancel=function(){void 0!==h&&clearTimeout(h),m=0,o=v=c=h=void 0},debounced.flush=function(){return void 0===h?u:trailingEdge(s())},debounced}},13218:function(e){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},37005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},33448:function(e,t,a){var n=a(44239),s=a(37005);e.exports=function(e){return"symbol"==typeof e||s(e)&&"[object Symbol]"==n(e)}},7771:function(e,t,a){var n=a(55639);e.exports=function(){return n.Date.now()}},14841:function(e,t,a){var n=a(27561),s=a(13218),i=a(33448),r=0/0,l=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,c=/^0o[0-7]+$/i,d=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return r;if(s(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=s(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=n(e);var a=o.test(e);return a||c.test(e)?d(e.slice(2),a?2:8):l.test(e)?r:+e}},65621:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/server/[id]/channel/[channel]",function(){return a(53768)}])},53768:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return A}});var n=a(85893),s=a(9008),i=a.n(s),r=a(67294),l=a(89583),o=a(50828),c=a(63750),d=a(58444),u=a(61528),h=a(11163),v=a(44080),m=a(84536),x=a(31089),p=a(87536),f=a(19782),j=(0,o.Pi)(e=>{var t,a,s;let{toggleOpen:i}=e,{register:r,handleSubmit:o,formState:{errors:c}}=(0,p.cI)({defaultValues:{members:null===(t=d.a.activeChannel)||void 0===t?void 0:t.members,title:null===(a=d.a.activeChannel)||void 0===a?void 0:a.title,server:null===(s=d.a.activeServer)||void 0===s?void 0:s.id}}),updateChannel=async e=>{try{var t;let a=await f.Z.confirm("update channel?","Are you sure?");if(!a)return;let n=null===(t=d.a.activeChannel)||void 0===t?void 0:t.id;await x.b_.updateChannel(n,e),f.Z.success("Channel Updated"),i()}catch(e){f.Z.error(e)}},deleteChannel=async()=>{try{var e;let t=await f.Z.confirm("Delete channel?","Are you sure?");if(!t)return;await x.b_.deleteChannel(null===(e=d.a.activeChannel)||void 0===e?void 0:e.id),i()}catch(e){f.Z.error(e)}};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("form",{onSubmit:o(updateChannel),children:[(0,n.jsx)("label",{className:" block text-sm font-bold text-zinc-300",children:"Channel Title:"}),(0,n.jsxs)("div",{className:"flex items-center justify-center space-x-2",children:[(0,n.jsx)("input",{className:"my-2",type:"text ",...r("title",{required:!0,minLength:1,maxLength:100})}),(0,n.jsx)("button",{type:"submit",className:"btn-primary",children:"Edit"})]})]}),(0,n.jsxs)("button",{className:" btn mt-2 flex bg-red-600 items-center",onClick:deleteChannel,children:["Delete Channel",(0,n.jsx)(l.Xm5,{size:15,className:"ml-2"})]})]})}),g=a(23279),y=a.n(g),b=(0,o.Pi)(e=>{var t,a,s,i;let{selection:o}=e;d.a.user;let x=(0,h.useRouter)(),{id:p,channel:f}=x.query,[g,b]=(0,r.useState)(!1),changeChannel=async()=>{try{await x.push("/server/".concat(p,"/channel/").concat(o.id)),d.a.messages=[],d.a.messageQuery=""}catch(e){console.error(e)}},N=y()(changeChannel,200);return(0,n.jsxs)("div",{className:" channel-selection ".concat(o.title===(null===(t=d.a.activeChannel)||void 0===t?void 0:t.title)&&" active-channel-selection  "),onClick:(null===(a=d.a.activeChannel)||void 0===a?void 0:a.id)!=o.id?N:()=>{},children:[(0,n.jsx)(c.nvr,{size:"24",className:"text-gray-100"}),(0,n.jsx)("h5",{className:"channel-selection-text ".concat((null===(s=o.title)||void 0===s?void 0:s.length)>=30?" truncate":""),children:o.title}),o.title==(null===(i=d.a.activeChannel)||void 0===i?void 0:i.title)&&"GeneralChat"!=o.title&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.ZP,{content:"Edit Channel",color:"invert",className:" font-bold",children:(0,n.jsx)(l.p4t,{size:15,onClick:()=>b(!0)})}),(0,n.jsx)(v.u,{appear:!0,show:g,as:r.Fragment,children:(0,n.jsxs)(m.V,{as:"div",className:"relative z-10",onClose:()=>b(!1),children:[(0,n.jsx)(v.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,n.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,n.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,n.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,n.jsx)(v.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,n.jsxs)(m.V.Panel,{className:"dialog-modal",children:[(0,n.jsx)(m.V.Title,{as:"h3",className:"dialog-title",children:"Edit Channel"}),(0,n.jsx)(j,{toggleOpen:()=>{b(!1)}}),(0,n.jsx)("div",{className:"mt-4",children:(0,n.jsx)("button",{type:"button",className:"btn-secondary",onClick:()=>b(!1),children:"Cancel"})})]})})})})]})})]})]})}),N=a(93737),w=(0,o.Pi)(e=>{let{toggleOpen:t}=e,a=d.a.user,s=d.a.activeServer,i=(0,h.useRouter)(),handleClose=()=>{t()},leaveServer=async()=>{try{if(!s&&!a){f.Z.error("unable to find server and user ids");return}let e={server:s.id,user:a.id},t=await f.Z.confirm("Leave ".concat(null==s?void 0:s.name),"Are You Sure?","question","Confirm");if(!t)return;await N.C.leaveServer(e),await x.uy.getServersList(d.a.page),i.push("/"),f.Z.success("left Server")}catch(e){f.Z.error(e)}};return(0,n.jsxs)("button",{className:"server-options-selection",onClick:()=>{leaveServer(),handleClose()},children:["Leave Server",(0,n.jsx)(l.dIY,{size:20})]})}),C=a(67838),S=(0,o.Pi)(e=>{let{toggleOpen:t}=e,a=(0,h.useRouter)(),s=a.query.id,i=d.a.activeServer,r=d.a.user,handleClick=async()=>{try{t();let e=await f.Z.confirm();if(!e)return;console.log(null==i?void 0:i.owner,null==i?void 0:i.id),await C.u.DeleteServer(i.owner,s),a.push("/")}catch(e){f.Z.error(e)}};return(0,n.jsx)("div",{className:"w-full",children:(null==r?void 0:r.id)==(null==i?void 0:i.owner)?(0,n.jsxs)("button",{className:" server-options-selection",onClick:handleClick,children:["Delete Server",(0,n.jsx)(l.i1q,{size:20})]}):(0,n.jsx)("div",{className:""})})}),k=(0,o.Pi)(e=>{var t;let{toggleOpen:a}=e,[s,i]=(0,r.useState)(!1),[o,c]=(0,r.useState)(!1),{register:u,handleSubmit:h,reset:f,formState:{errors:j}}=(0,p.cI)({defaultValues:{members:[],title:"",server:null===(t=d.a.activeServer)||void 0===t?void 0:t.id}}),onSubmit=async e=>{try{let t=await x.b_.createChannel(e);await x.lt.getMessagesByChannelId(null==t?void 0:t.id),c(!1),a(),f()}catch(e){console.error(e)}};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{className:" server-options-selection",onClick:()=>{c(!0),a()},children:(0,n.jsxs)("div",{className:"flex w-full  justify-between",children:["Create Channel",(0,n.jsx)(l.EIY,{size:20})]})}),(0,n.jsx)(v.u,{appear:!0,show:o,as:r.Fragment,children:(0,n.jsxs)(m.V,{as:"div",className:"relative z-10",onClose:()=>c(!1),children:[(0,n.jsx)(v.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,n.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,n.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,n.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,n.jsx)(v.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,n.jsxs)(m.V.Panel,{className:"dialog-modal",children:[(0,n.jsx)(m.V.Title,{as:"h3",className:"dialog-title",children:"Create Channel"}),(0,n.jsxs)("div",{className:"mt-4",children:[(0,n.jsxs)("form",{onSubmit:h(onSubmit),className:"",children:[(0,n.jsxs)("div",{className:"relative ",children:[(0,n.jsx)("label",{className:" block text-sm font-bold text-zinc-300",children:"Channel Title:"}),(0,n.jsx)("input",{className:" my-2   ",type:"text",placeholder:"new-channel",...u("title",{required:!0,minLength:1,maxLength:50})})]}),(0,n.jsx)("button",{className:"btn-primary",type:"submit",children:"Submit"})]}),";"]})]})})})})]})})]})}),F=(0,o.Pi)(()=>{let e=(0,h.useRouter)(),handleClick=async()=>{let t=window.location.origin?window.location.origin:"",a="".concat(t,"/").concat(e.asPath,"/join");console.log(e,t),await navigator.clipboard.writeText(a),f.Z.toast("Copied To ClipBoard")};return(0,n.jsxs)("button",{className:" server-options-selection",onClick:handleClick,children:["getLink",(0,n.jsx)(l.GON,{size:20})]})}),Modal=e=>{let{buttonIcon:t,title:a,children:s}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:" flex w-full items-center justify-center"}),(0,n.jsx)(v.u,{appear:!0,show:d.a.modalStatus,as:r.Fragment,children:(0,n.jsxs)(m.V,{as:"div",className:"relative z-10",onClose:()=>d.a.modalStatus=!1,children:[(0,n.jsx)(v.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,n.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,n.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,n.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,n.jsx)(v.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,n.jsxs)(m.V.Panel,{className:"dialog-modal",children:[(0,n.jsx)(m.V.Title,{as:"h3",className:"dialog-title",children:a}),s,(0,n.jsx)("div",{className:"mt-4",children:(0,n.jsx)("button",{type:"button",className:"btn-secondary",onClick:()=>d.a.modalStatus=!1,children:"Cancel"})})]})})})})]})})]})},T=(0,o.Pi)(e=>{var t;let{toggleOpen:a}=e,[s,i]=(0,r.useState)(!1),{register:o,handleSubmit:c,watch:u,setValue:h,reset:v,formState:{errors:m}}=(0,p.cI)({defaultValues:{members:[],messages:[],title:"",server:null===(t=d.a.activeServer)||void 0===t?void 0:t.id}});return(0,n.jsx)("button",{className:" server-options-selection",onClick:a,children:(0,n.jsx)(Modal,{buttonIcon:(0,n.jsxs)("div",{className:"flex w-full  justify-between",children:["Server Guidelines",(0,n.jsx)(l.EIY,{size:18})]}),title:"Server Guidelines",children:(0,n.jsx)("div",{className:" p-2 dark:text-gray-300 text-gray-900 ",children:(0,n.jsxs)("ul",{className:" list-decimal",children:[(0,n.jsx)("li",{children:"Respect others: Treat other users with respect and refrain from using offensive language, hate speech, or any form of harassment or discrimination."}),(0,n.jsx)("li",{children:"Stay on topic: Keep conversations relevant to the chat's purpose and refrain from discussing inappropriate or off-topic subjects."}),(0,n.jsx)("li",{children:"No spamming: Do not flood the chat with repetitive messages or advertising, as this disrupts the flow of conversation."}),(0,n.jsx)("li",{children:"No trolling: Do not intentionally disrupt the chat or provoke others with the intention of causing harm or annoyance."}),(0,n.jsx)("li",{children:"Keep it legal: Do not engage in any illegal activities or discuss any illegal topics, as this could result in consequences for the chat and its users."}),(0,n.jsx)("li",{children:"Follow instructions: Follow the guidelines and instructions set by the chat moderators and administrators."}),(0,n.jsx)("li",{children:"No personal information: Do not share personal information, such as phone numbers, addresses, or passwords, in the chat."}),(0,n.jsx)("li",{children:"Keep it clean: Refrain from posting any explicit or inappropriate content that may be offensive or harmful to others."}),(0,n.jsx)("li",{children:"Use appropriate language: Use appropriate language and avoid excessive use of profanity or vulgar language."}),(0,n.jsx)("li",{children:"Report inappropriate behavior: If you witness any inappropriate behavior or content in the chat, report it to the moderators or administrators immediately."})]})})})})}),O=a(15093);let ServerOptions=e=>{var t,a;let{isOpen:s,toggleOpen:i}=e,r=(null===(t=d.a.activeServer)||void 0===t?void 0:t.owner)===(null===(a=d.a.user)||void 0===a?void 0:a.id);return(0,n.jsx)("div",{className:"server-options ".concat(s?"visible":"hidden"),children:(0,n.jsxs)("div",{className:"server-options-container",children:[(0,n.jsx)(w,{toggleOpen:i}),r&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(S,{toggleOpen:i}),(0,n.jsx)(k,{toggleOpen:i})]}),(0,n.jsx)(F,{}),(0,n.jsx)(T,{toggleOpen:i})]})})};var P=(0,o.Pi)((0,O.k)(()=>{var e;let[t,a]=(0,r.useState)(!1),toggleOpen=()=>{a(!t)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"relative ",children:(0,n.jsxs)("button",{className:"server-options-btn py-[19px]",onClick:toggleOpen,children:[null===(e=d.a.activeServer)||void 0===e?void 0:e.name,t?(0,n.jsx)(l.ZTc,{}):(0,n.jsx)(l.NWQ,{})]})}),(0,n.jsx)(ServerOptions,{isOpen:t,toggleOpen:toggleOpen})]})})),z=a(4445);let ChevronIcon=e=>{let{expanded:t}=e;return t?(0,n.jsx)(l.RiI,{size:"14",className:"chevron-icon "}):(0,n.jsx)(l.Dli,{size:"14",className:"chevron-icon"})};var E=(0,o.Pi)(()=>{var e;let t=d.a.user,a=null===(e=d.a.activeServer)||void 0===e?void 0:e.channels,[s,i]=(0,r.useState)(!0);return(0,n.jsxs)("div",{className:"channel-bar",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)(P,{}),(0,n.jsx)("div",{className:"channel-container",children:(0,n.jsxs)("div",{className:"m-0 w-full px-2 pb-2 transition duration-300 ease-in-out",children:[(0,n.jsxs)("div",{onClick:()=>i(!s),className:" mx-0 mt-3 flex cursor-pointer flex-row items-center  text-gray-500",children:[(0,n.jsx)(ChevronIcon,{expanded:s}),(0,n.jsx)("h5",{className:s?"channel-selection-header-expanded  ":"channel-selection-header ",children:"Text Channels"})]}),s&&a&&a.map(e=>(0,n.jsx)(b,{selection:e},e.id))]})})]}),(0,n.jsx)(z.Z,{user:t})]})}),Z=a(88669);let User=e=>{var t,a;let{user:s}=e;return(0,n.jsxs)("div",{className:"user-container flex gap-x-2  ",children:[(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsx)(Z.Z,{height:"h-8",width:"w-8",avatarUrl:null===(t=s.expand)||void 0===t?void 0:t.user.avatarUrl}),(0,n.jsx)("div",{className:"absolute left-8 top-9",children:"STATUS"})]}),(0,n.jsx)("small",{className:" font-bold text-rose-600",children:null===(a=s.expand)||void 0===a?void 0:a.user.username})]})};var I=(0,o.Pi)(()=>{var e;let t=null===(e=d.a.activeServer)||void 0===e?void 0:e.members,[a,s]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let e;return(async()=>{try{e=await x._A.subscribe()}catch(e){f.Z.error(e)}})(),()=>{null==e||e()}},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:a?"m-0  h-auto  w-64 overflow-hidden bg-gray-200 shadow-lg transition-all duration-300 dark:bg-zinc-800   ":" h-0 w-0 cursor-none overflow-hidden bg-zinc-800  opacity-0 transition-all duration-300 ",children:[(0,n.jsxs)("div",{className:"channel-block",children:[(0,n.jsx)("h5",{className:"channel-block-text",children:"Members"}),(0,n.jsx)("div",{className:" mx-auto my-2 rounded-3xl  text-gray-500",children:a?(0,n.jsx)(c.PxJ,{size:24,onClick:()=>s(!a),className:"cursor-pointer  hover:text-indigo-500 dark:hover:text-emerald-500"}):(0,n.jsx)("div",{className:""})})]}),(0,n.jsx)("div",{className:" flex flex-col gap-y-3 px-3",children:t&&t.map((e,t)=>(0,n.jsx)("div",{className:"relative cursor-pointer rounded-lg p-2 transition-all duration-200 hover:bg-slate-500",children:(0,n.jsx)(User,{user:e})},t))})]}),!a&&(0,n.jsx)("div",{className:" absolute  right-3   top-2 mx-auto my-2 rounded-3xl   text-gray-500 transition-all duration-200",children:(0,n.jsx)(c.RVs,{size:24,onClick:()=>s(!a),className:"cursor-pointer hover:text-indigo-500 dark:hover:text-emerald-500"})})]})}),_=a(85095),D=a(54321),V=a(85826),M=a(68949);let Search=()=>{let[e,t]=(0,r.useState)(""),[a,s]=(0,r.useState)(!0),i=(0,r.useMemo)(()=>async e=>{let t=await _.pb.collection(D.nW.Messages).getList(1,10,{filter:'content ~ "'.concat(e,'"'),expand:"user,likes(message).user"}),a=t.items;(0,M.aD)(()=>{let e=a.map((e,t)=>{let a=new V.v0(e);return d.a.messageLikes[t]=e.expand["likes(message)"]||[],a});d.a.messages=[...d.a.messages,...e],d.a.totalPages=t.totalPages})()},[]);return(0,n.jsxs)("form",{onSubmit:t=>{t.preventDefault(),d.a.messageQuery=e,d.a.messages=[],d.a.page=1,i(e)},className:" relative  flex items-center justify-start  gap-x-2",children:[(0,n.jsx)("input",{className:" pr-10 dark:text-gray-300 transition-all   duration-700 focus:w-72  ".concat(a?"w-full":""),type:"text",placeholder:"Search",value:e,onChange:e=>t(e.target.value)}),(0,n.jsx)("div",{className:"absolute right-2 z-10 ",children:(0,n.jsx)(u.ZP,{content:"Search Message",color:"invert",placement:"bottom",children:(0,n.jsx)("button",{className:"m-0 pt-1 ",children:(0,n.jsx)(l.U41,{size:22,className:"     my-auto text-gray-500  hover:text-indigo-500 dark:hover:text-emerald-500 ".concat(""!==e?"text-emerald-500":"")})})})})]})};var L=(0,o.Pi)(()=>{var e;return(0,n.jsxs)("div",{className:"top-navigation",children:[(0,n.jsx)(l.qc7,{size:"20",className:"title-hashtag"}),(0,n.jsx)("h5",{className:"channel-room-title",children:""===d.a.messageQuery?null===(e=d.a.activeChannel)||void 0===e?void 0:e.title:"Searching Messages Within Server"}),(0,n.jsx)(Search,{})]})}),R=a(27564),U=a(61771),q=a(87313),A=(0,o.Pi)((0,O.Q)(()=>{let e=(0,h.useRouter)();_.pb.authStore.model;let{id:t,channel:a}=e.query;return(0,r.useEffect)(()=>{if(!t||!a)return;let fetchServerData=async()=>{try{await x.uy.getMembers(t)}catch(e){f.Z.error(e)}};fetchServerData()},[t]),(0,r.useEffect)(()=>{let e;if(t&&a)return(async()=>{let t=new U.Z({size:2,color:"#4b60dd",className:"bar-of-progress",delay:100});try{t.start(),await x.b_.joinChannel({memberId:d.a.user.id,channelId:a}),await x.lt.getMessagesByChannelId(a),t.finish(),e=await x.lt.subscribe()}catch(e){t.finish(),f.Z.error(e)}})(),()=>{e&&e()}},[a]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i(),{children:[(0,n.jsx)("title",{children:"next-pocket"}),(0,n.jsx)("meta",{name:"description",content:"Generated by create-t3-app"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsx)("main",{className:"flex min-h-screen flex-col items-center justify-center ",children:(0,n.jsxs)("div",{className:"flex  h-screen w-full  ",children:[(0,n.jsx)(E,{}),(0,n.jsxs)("div",{className:" message-container ",children:[(0,n.jsx)(L,{}),(0,n.jsx)(q.Z,{}),(0,n.jsx)(R.Z,{})]}),(0,n.jsx)(I,{})]})})]})}))},72770:function(e){"use strict";e.exports=next}},function(e){e.O(0,[258,310,774,888,179],function(){return e(e.s=65621)}),_N_E=e.O()}]);