(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[997],{97417:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/DirectMessages/[id]",function(){return a(23826)}])},12997:function(e,s,a){"use strict";var t=a(85893),r=a(67294),l=a(50828),i=a(11163),n=a(87536),c=a(44080),o=a(84536),d=a(79790),u=a(50229),x=a(85699),m=a(37066);let h=()=>{var e;let s=u.a.friends,a=u.a.user,l=(0,i.useRouter)(),n=()=>{l.push("/DirectMessages")};return(0,r.useEffect)(()=>{let e=async()=>{try{if(!a)return;await x.fb.getUserFriendsList()}catch(e){d.Z.error(e)}};e()},[]),(0,t.jsx)("div",{className:"friends-bar",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("h5",{className:"channel-block-text",onClick:()=>n(),children:"Friends"}),(0,t.jsx)("div",{className:"channel-block",children:(0,t.jsx)("h5",{className:"channel-block-text",children:"Direct Messagesssss"})}),(0,t.jsx)("div",{className:"px-3 ",children:s&&(null==s?void 0:null===(e=s.friends)||void 0===e?void 0:e.map((e,s)=>(0,t.jsx)(f,{user:e.user,status:e.onlineStatus},s)))})]})})},f=e=>{let{user:s,status:a}=e,[l,n]=(0,r.useState)(!1),c=(0,i.useRouter)();if(!s)return(0,t.jsx)("div",{children:"NO USER"});let o=()=>{c.push("/DirectMessages/".concat(s.id))};return(0,t.jsxs)("div",{onClick:o,className:"user-container my-3 flex cursor-pointer gap-x-2 rounded-md p-2 transition-all duration-150 ease-in hover:bg-zinc-500 hover:bg-opacity-25  ",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("img",{src:s.avatarUrl,alt:"userIcon",width:30,className:"rounded-full shadow-md shadow-zinc-900"}),(0,t.jsx)("div",{className:"absolute left-8 top-9",children:s&&(0,t.jsx)(m.Z,{isOnline:a.isOnline})})]}),(0,t.jsx)(v,{isOpen:l}),(0,t.jsx)("small",{className:" font-bold text-rose-600",children:s.username})]})},v=e=>{let{isOpen:s}=e,[a,l]=(0,r.useState)(!1),[d,u]=(0,r.useState)("");(0,i.useRouter)();let{register:x,handleSubmit:m,watch:h,setValue:f,reset:v,formState:{errors:g}}=(0,n.cI)({defaultValues:{name:"",image:"",members:[],description:""}});return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(c.u,{appear:!0,show:s,as:r.Fragment,children:(0,t.jsxs)(o.V,{as:"div",className:"relative z-10",onClose:function(){s=!1},children:[(0,t.jsx)(c.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,t.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,t.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,t.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:(0,t.jsx)(c.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,t.jsxs)(o.V.Panel,{className:"w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",children:[(0,t.jsx)(o.V.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900",children:"Payment successful"}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)("p",{className:"text-sm text-gray-500",children:"Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order."})}),(0,t.jsx)("div",{className:"mt-4"})]})})})})]})})})};s.Z=(0,l.Pi)(h)},23826:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return E}});var t=a(85893),r=a(9008),l=a.n(r),i=a(67294),n=a(11163),c=a(50229),o=a(50828),d=a(79790),u=a(12997),x=a(47472),m=a(63750),h=a(60482);let f=()=>{let[e,s]=(0,i.useState)(""),a=(0,n.useRouter)(),{id:r}=a.query,l=async a=>{var t;let l=x.pb.authStore.model,i={text:e,from:null==l?void 0:l.id,channel:null===c.a||void 0===c.a?void 0:null===(t=c.a.activeChannel)||void 0===t?void 0:t.id,to:null==r?void 0:r.toString()};await x.pb.collection("directMessages").create(i,{expand:"from,to"}),s("")};return(0,t.jsx)("div",{className:"bottom-bar",children:(0,t.jsxs)("form",{onSubmit:l,className:"flex w-3/4",children:[(0,t.jsx)(h.Z,{value:e,onChange:s,cleanOnEnter:!0,onEnter:l,placeholder:"Enter message...",className:"bottom-bar-input  "}),(0,t.jsx)(v,{})]})})},v=()=>(0,t.jsx)("button",{type:"submit",children:(0,t.jsx)(m.Kix,{size:"22",className:"dark:text-primary mx-2 text-green-500 dark:shadow-lg"})});var g=(0,o.Pi)(f),j=a(58533),p=a(62230),b=a(85699),y=a(50930),N=a(59719);let w=()=>{let e=(0,n.useRouter)(),s=e.query.id,a=c.a.directMessages.filter(e=>e.id!=s).map(e=>new p.eQ(e));console.log("directMessages",a);let r=async()=>{var e;null===(e=c.a.activeChannel)||void 0===e||e.id,console.log("CurrentPage:",c.a.page,"TotalPages:",c.a.totalPages),await b.bK.getDirectMessages(s)};return(0,t.jsx)("div",{id:"scrollableDiv2",className:" flex h-full flex-col-reverse overflow-auto pb-16 ",children:(0,t.jsx)(j.Z,{dataLength:a.length,next:r,className:"  flex  pt-6 mb-24 flex-col-reverse ",inverse:!0,hasMore:c.a.totalPages!=c.a.page,loader:(0,t.jsx)(y.Z,{show:c.a.totalPages!=c.a.page}),scrollableTarget:"scrollableDiv2",children:a.map((e,s)=>{let r=new Date(e.created).toLocaleDateString(),l=new Date(Date.now()).toLocaleDateString(),i=s>0?new Date(a[s-1].created).toLocaleDateString():null;return(0,t.jsxs)("div",{children:[(0,t.jsx)(N.Z,{message:e,index:s}),(0,t.jsx)("div",{children:r!==i&&r!==l&&(0,t.jsxs)("div",{className:"new-date",children:[(0,t.jsx)("hr",{className:"w-3/6  opacity-40"}),(0,t.jsx)("div",{className:" new-date-text",children:r}),(0,t.jsx)("hr",{className:"w-3/6  opacity-40"})]})})]},s)})})})};var k=(0,o.Pi)(w);let D=()=>{let e=(0,n.useRouter)(),s=e.query.id,a=x.pb.authStore.model;return c.a.directMessages.filter(e=>e.id==s),c.a.activeDirectMessage,(0,i.useRef)(null),(0,i.useEffect)(()=>{if(!a){e.push("/login");return}},[]),(0,t.jsxs)("div",{className:"relative h-full flex-1 items-stretch    overflow-hidden bg-gray-300   dark:bg-zinc-700  ",children:[(0,t.jsx)(k,{}),(0,t.jsx)(g,{})]})};var M=(0,o.Pi)(D),P=a(73560);let S=()=>{let e=(0,n.useRouter)(),s=e.query.id,a=c.a.user;return(0,i.useEffect)(()=>{if(!a){e.push("/login");return}if(s){let e=async()=>{try{if(!0==c.a.dmTracker[s])return;c.a.directMessages=c.a.directMessages.filter(e=>e.id!=s),c.a.dmTracker[s]=!0,c.a.page=1,await b.bK.getDirectMessages(s),console.log(c.a.directMessages[s]),console.log("all",c.a.directMessages)}catch(e){d.Z.error(e)}};e()}return()=>{c.a.dmTracker[s]=!1}},[e.query.id]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(l(),{children:[(0,t.jsx)("title",{children:"next-pocket"}),(0,t.jsx)("meta",{name:"description",content:"Generated by create-t3-app"}),(0,t.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,t.jsx)("main",{className:"flex min-h-screen flex-col items-center justify-center ",children:(0,t.jsxs)("div",{className:"flex  h-screen   w-full ",children:[(0,t.jsx)(u.Z,{}),(0,t.jsx)(M,{})]})})]})};var E=(0,o.Pi)((0,P.Q)(S))},72770:function(e){"use strict";e.exports=next}},function(e){e.O(0,[417,868,568,774,888,179],function(){return e(e.s=97417)}),_N_E=e.O()}]);