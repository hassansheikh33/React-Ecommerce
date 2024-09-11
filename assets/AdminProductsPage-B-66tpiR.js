import{i as a,d as p,r,j as t,e as n,L as u,C as g,O as P,n as y,H as v}from"./index-DP81XDn8.js";import{M as C}from"./Modal-C34jcFjS.js";const B="_productContainer_18cy3_1",N="_heading_18cy3_17",D="_productCard_18cy3_25",b="_flex_18cy3_41",f="_itemImage_18cy3_53",k="_detailsDiv_18cy3_65",A="_btnsDiv_18cy3_73",H="_link_18cy3_83",I="_editProductBtn_18cy3_93",$="_deleteProductBtn_18cy3_101",S="_addProductBtn_18cy3_109",w="_btn_18cy3_73",E="_blue_18cy3_129",L="_textDiv_18cy3_135",M="_stockCount_18cy3_141",Y="_modalHeading_18cy3_151",O="_closeBtn_18cy3_163",e={productContainer:B,heading:N,productCard:D,flex:b,itemImage:f,detailsDiv:k,btnsDiv:A,link:H,editProductBtn:I,deleteProductBtn:$,addProductBtn:S,btn:w,blue:E,textDiv:L,stockCount:M,modalHeading:Y,closeBtn:O};function F(){const m=a(s=>s.admin.products),_=a(s=>s.ui.loading),x=p(),[d,l]=r.useState(""),[o,i]=r.useState(null);if(_)return t.jsx("h2",{children:"Loading..."});const h=s=>{l(s),i("delete")},j=()=>{d!==""&&(x(y(d)),c())},c=()=>{l(""),i(null)};return t.jsxs("div",{children:[o!==null&&t.jsx(C,{onClose:c,children:o==="delete"&&t.jsxs("form",{onSubmit:j,children:[t.jsx("div",{children:t.jsx("h3",{className:e.modalHeading,children:"Are You sure You want to delete this product?"})}),t.jsxs("div",{children:[t.jsx(n,{className:e.closeBtn,type:"button",onClick:c,children:"Close"}),t.jsx(n,{className:e.deleteProductBtn,type:"submit",children:"Yes, Delete"})]})]})}),t.jsxs("div",{className:e.textDiv,children:[t.jsxs("h1",{className:e.heading,children:["All ",t.jsx("span",{className:e.blue,children:"Products"})]}),t.jsx("p",{children:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, nihil."})]}),t.jsxs("div",{className:e.productContainer,children:[t.jsx(n,{className:`${e.btn} ${e.addProductBtn}`,children:t.jsx(u,{className:e.link,to:"/admin/products/new",children:"Add a new product ?"})}),m.map(s=>t.jsxs(g,{className:e.productCard,children:[t.jsx("img",{className:e.itemImage,src:s.image,alt:"Item image"}),t.jsxs("div",{className:`${e.flex} ${e.detailsDiv}`,children:[t.jsxs("h3",{children:[s.title.slice(0,40),s.title.length>40?"...":""]}),t.jsxs("p",{children:["In stock:"," ",t.jsx("span",{className:e.stockCount,children:s.stock})]})]}),t.jsxs("div",{className:`${e.flex} ${e.btnsDiv}`,children:[t.jsx(n,{className:e.editProductBtn,children:t.jsx(u,{to:`/admin/products/edit/${s.id}`,className:e.link,children:"Edit Product"})}),t.jsx(n,{onClick:()=>h(s.id.toString()),className:e.deleteProductBtn,children:"Delete Product"})]})]},s.id))]}),t.jsx(P,{})]})}function q(){return t.jsxs(t.Fragment,{children:[t.jsxs(v,{children:[t.jsx("title",{children:"All Products"}),t.jsx("meta",{name:"description",content:"All products page for admins only"})]}),t.jsx(F,{}),";"]})}export{q as default};
