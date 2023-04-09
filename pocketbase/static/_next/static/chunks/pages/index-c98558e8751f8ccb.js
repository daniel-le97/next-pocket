(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{48312:function(e,a,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(59763)}])},59763:function(e,a,s){"use strict";s.r(a),s.d(a,{default:function(){return z}});var t=s(85893),r=s(50828),n=s(9008),i=s.n(n),l=s(11163),c=s(67294),o=s(50229),d=s(47472),u=s(89583),m=s(79790),x=s(64879),p=s(63750),v=s(44080);let g=e=>{var a,s;let{server:r}=e,[n,i]=(0,c.useState)([]),o=d.pb.authStore.model,g=(0,l.useRouter)(),[h,f]=(0,c.useState)(!1);async function j(){try{if(!o)return;let e={server:r.id,user:o.id},a=await m.Z.confirm("Join ".concat(r.name,"?"),"you will be directed to the server page","Join","question");if(!a)return;let s=await x.C.joinServer(e);s&&!0==s.new&&m.Z.success("Welcome to ".concat(r.name)),g.push("/server/".concat(r.id))}catch(e){m.Z.error(e,"Join Server")}}let b=()=>{var e;(null===(e=r.members)||void 0===e?void 0:e.includes(null==o?void 0:o.id))&&f(!0)};return(0,c.useEffect)(()=>{b()},[]),(0,t.jsx)(v.u,{as:c.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,t.jsxs)("div",{className:"server-card group  ".concat(h?"bg-gray-300 from-zinc-900 to-green-400 hover:from-zinc-900 hover:to-green-500":"bg-gray-300 from-zinc-900 to-gray-600"),children:[(0,t.jsx)("img",{src:null===(a=r.expand)||void 0===a?void 0:a.image.url,alt:"",className:"server-image"}),(0,t.jsxs)("div",{className:"mt-2 p-3",children:[(0,t.jsxs)("div",{className:" flex w-full justify-between ",children:[(0,t.jsx)("div",{className:" server-name ",children:r.name}),h?(0,t.jsx)(u.TZR,{size:20,className:"text-green-400"}):(0,t.jsxs)("button",{className:"group/join relative  ",onClick:j,children:[(0,t.jsx)(u.Bj$,{size:20}),(0,t.jsx)("span",{className:" join-button-tooltip",children:"Join"})]})]}),(0,t.jsx)("p",{className:"mt-2 pb-10",children:r.description})]}),(0,t.jsxs)("div",{className:"server-members-count  ",children:[(0,t.jsx)(p.KC7,{size:10,className:"text-gray-300"}),null===(s=r.members)||void 0===s?void 0:s.length,(0,t.jsx)("small",{children:"Members"})]})]})})};var h=(0,r.Pi)(g),f=s(55726),j=s(62230),b=s(96486);let y=()=>{let[e,a]=(0,c.useState)(""),[s,r]=(0,c.useState)(!0),n=(0,b.debounce)(async e=>{let a=await d.pb.collection(j.nW.Servers).getList(1,9,{filter:'name ~ "'.concat(e,'"  '),expand:"image,members"});o.a.servers=a.items},1e3),i=e=>{let s=e.target.value;a(s),n(s)};return(0,t.jsx)("div",{className:" container  relative mt-5 flex items-center justify-center",children:(0,t.jsxs)("div",{className:"relative w-full flex justify-center",children:[(0,t.jsx)("input",{className:" w-1/2 transition-all duration-700 dark:text-gray-300 ",type:"text",placeholder:"Search Server By Name",value:e,onChange:i}),(0,t.jsx)(u.U41,{size:32,className:"text-secondary absolute  right-64 top-1.5 z-10 my-auto ml-2 text-gray-500 "})]})})};var N=(0,r.Pi)(y);let w=e=>{let{onPageChange:a,totalPages:s}=e,r=(0,c.useCallback)((0,b.debounce)(e=>{let s=e?o.a.page+1:o.a.page-1;a(s)},500),[a]);return(0,t.jsxs)("div",{className:"my-3 flex items-center justify-center gap-x-6",children:[(0,t.jsx)("button",{className:"btn-primary disabled:cursor-not-allowed",disabled:1===o.a.page,onClick:()=>r(!1),children:(0,t.jsx)(u.MZt,{size:32})}),(0,t.jsxs)("div",{className:"mx-3 flex gap-x-2",children:[Array.from({length:s>3?3:s},(e,a)=>{let s=o.a.page<=2?a+1:o.a.page-2+a;return s}).map(e=>(0,t.jsx)("div",{className:"cursor-pointer px-2 text-gray-300 transition-all  hover:rounded-full hover:bg-indigo-500 ".concat(e===o.a.page?" rounded-full bg-indigo-500 px-2  ":""),onClick:()=>{a(e)},children:e},e)),s>3&&o.a.page!=s&&(0,t.jsxs)("div",{className:"text-gray-300",children:["...",s]})]}),(0,t.jsx)("button",{className:"btn-primary disabled:cursor-not-allowed",disabled:o.a.page===s,onClick:()=>r(!0),children:(0,t.jsx)(u.Wgy,{size:32})})]})};var k=(0,r.Pi)(w);let S=()=>{let e=(0,l.useRouter)(),a=o.a.servers;return(0,c.useEffect)(()=>{let a=d.pb.authStore.model;a||e.push("/login")},[e]),(0,c.useEffect)(()=>{let e=async()=>{o.a.page=1,await f.u.getServersList(o.a.page)};e()},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(i(),{children:[(0,t.jsx)("title",{children:"next-pocket"}),(0,t.jsx)("meta",{name:"description",content:"Generated by create-t3-app"}),(0,t.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,t.jsxs)("main",{className:"  dark flex min-h-screen  w-full flex-col bg-gray-300  dark:bg-zinc-800 ",children:[(0,t.jsx)(_,{}),(0,t.jsx)(N,{}),(0,t.jsx)(k,{onPageChange:e=>{o.a.page=e,f.u.getServersList(e)},totalPages:o.a.totalPages}),(0,t.jsx)("div",{className:"mb-4  flex  flex-wrap    justify-center ",children:a&&a.map(e=>(0,t.jsx)(h,{server:e},e.id))})]})]})},_=()=>(0,t.jsx)("div",{className:"explore-banner  ",children:(0,t.jsxs)("div",{className:"relative  ",children:[(0,t.jsx)("img",{src:"https://img.freepik.com/free-vector/telescope-science-discovery-watching-stars-planets-outer-space_107791-4920.jpg?w=900&t=st=1677706310~exp=1677706910~hmac=1f7b435bec55558f1de8b5bc54632ee088625c1772d5eb3c102107da67f9327a",alt:"",className:"rounded-xl shadow-md shadow-zinc-900  "}),(0,t.jsx)("div",{className:" absolute top-24 left-80 text-2xl  font-bold text-white",children:"Find your community"})]})});var z=(0,r.Pi)(S)},9008:function(e,a,s){e.exports=s(42636)}},function(e){e.O(0,[662,774,888,179],function(){return e(e.s=48312)}),_N_E=e.O()}]);