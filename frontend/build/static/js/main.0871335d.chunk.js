(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{197:function(e,t,n){},302:function(e,t,n){},303:function(e,t,n){"use strict";n.r(t);var c=n(3),r=n(0),i=n.n(r),a=n(27),s=n.n(a),o=(n(197),n(66)),j=n.n(o),u=n(90),l=n(22),d=n(26),b=n(30),O=n.n(b),h=function(e){return{type:"ALL_PRODUCT",info:e}},p=function(e){return{type:"ALL_PROMO",info:e}},x=function(e){return{type:"ALL_ORDER",info:e}},m=n(88),f=n(33),y=n(24),g=n(309),v=n(59),C=n(308),k=n(311),I=n(313),S=n(46),T=n(106),q=function(e){return{type:"ADD_PRODUCT",info:e}},w=function(e,t){return{type:"EDIT_PRODUCT",id:e,info:t}},_=function(e){return{type:"DELETE_PRODUCT",id:e}},R=function(e){var t=g.a.useForm(),n=Object(l.a)(t,1)[0],i=Object(d.b)();return Object(r.useEffect)((function(){n.setFieldsValue({name:e.product.name,quantity:e.product.quantity,price:e.product.price})}),[e]),Object(c.jsx)(v.a,{span:8,children:Object(c.jsx)(C.a,{size:"small",title:e.product.name,style:{width:300},cover:Object(c.jsx)(k.a,{width:200,src:e.product.image}),children:Object(c.jsxs)(g.a,{onFinish:function(t){var n=[{name:t.name,quantity:t.quantity,price:t.price,image:"/images/ao_1.jpg"}];O.a.put("https://".concat("lixiapi.kaito.ninja","/product/").concat(e.product._id),n[0]).then((function(t){return i(w(e.product._id,t))})).catch((function(e){return console.log(e)}))},form:n,children:[Object(c.jsx)(g.a.Item,{name:"name",label:"Name",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"text"})}),Object(c.jsx)(g.a.Item,{name:"quantity",label:"Quantity",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"number"})}),Object(c.jsx)(g.a.Item,{name:"price",label:"Price",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"number"})}),Object(c.jsxs)(g.a.Item,{children:[Object(c.jsx)(S.a,{type:"primary",htmlType:"submit",children:"Submit"}),Object(c.jsx)(S.a,{htmlType:"button",onClick:function(){n.resetFields()},children:"Reset"}),Object(c.jsx)(S.a,{htmlType:"button",onClick:function(){return t=e.product._id,void O.a.delete("https://".concat("lixiapi.kaito.ninja","/product/").concat(t)).then((function(e){return i(_(e))})).catch((function(e){return console.log(e)}));var t},children:"Delete"})]})]})})})},D={labelCol:{span:8},wrapperCol:{span:16}},E={wrapperCol:{offset:8,span:16}},P=function(){var e=Object(d.c)((function(e){return e.products})),t=Object(d.b)(),n=g.a.useForm(),r=Object(l.a)(n,1)[0];return Object(c.jsxs)("div",{children:[Object(c.jsx)(T.a,{children:e.map((function(e){return Object(c.jsx)(R,{product:e},e._id)}))}),Object(c.jsxs)(g.a,Object(y.a)(Object(y.a)({},D),{},{form:r,name:"control-hooks",onFinish:function(e){var n=[{name:e.Name,quantity:e.Quantity,price:e.Price,image:"/images/ao_1.jpg"}];O.a.post("https://".concat("lixiapi.kaito.ninja","/products"),n[0]).then((function(e){return t(q(e))})).catch((function(e){return console.log(e)})),r.resetFields()},children:[Object(c.jsx)(g.a.Item,{name:"Name",label:"Name",rules:[{required:!0}],children:Object(c.jsx)(I.a,{})}),Object(c.jsx)(g.a.Item,{name:"Quantity",label:"Quantity",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"number"})}),Object(c.jsx)(g.a.Item,{name:"Price",label:"Price",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"number"})}),Object(c.jsxs)(g.a.Item,Object(y.a)(Object(y.a)({},E),{},{children:[Object(c.jsx)(S.a,{type:"primary",htmlType:"submit",children:"Submit"}),Object(c.jsx)(S.a,{htmlType:"button",onClick:function(){r.resetFields()},children:"Reset"})]}))]}))]})},N=n(317),L=n(312),A=n(314),F=n(80),U=n(65),M=function(e){return{type:"ADD_CART",info:e}};function Q(e){if(e=String(e).split(".").join(""),!Number(e))return null;var t=[],n=[],c="",r="",i="",a=Math.floor(String(e).length/3);for(i=3*Number(a)===String(e).length?String(e).slice(0,String(e).length-3*(Number(a)-1)):String(e).slice(0,String(e).length-3*Number(a));String(e).length>3;)c=String(e).slice(String(e).length-3,String(e).length),r=String(e).slice(0,String(e).length-3),e=String(e).slice(0,String(e).length-3),t.push(c),n.push(r);return n=n.reverse(),(t=t.reverse()).length>=n.length?t.forEach((function(e){i=i+"."+e})):n.forEach((function(e){i=i+"."+e})),i}var z=function(e){return Object(c.jsx)(N.a,{message:"Warning",description:"Quantity of ".concat(e.error.name," max is ").concat(e.error.quantity),type:"warning",showIcon:!0,closable:!0})},V=function(e){var t=Object(d.b)(),n=Object(f.g)(),i=Object(r.useState)(!1),a=Object(l.a)(i,2),s=a[0],o=a[1],j={backgroundImage:"url(".concat("").concat(e.product.image,")")},u={backgroundImage:"url(".concat("","'/images/3.jpg')")};return Object(c.jsxs)("div",{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){return o(!1)},className:"col-lg-3 col-md-3 col-sm-6 col-xs-6  ",children:[Object(c.jsxs)("div",{className:"section_content-home",style:Object(y.a)(Object(y.a)({},j),s?u:null),children:[Object(c.jsx)("div",{className:"box_content",style:Object(y.a)(Object(y.a)({},j),s?u:null)}),Object(c.jsxs)("div",{className:"overlay",children:[Object(c.jsx)("div",{className:"icon",children:Object(c.jsx)("i",{className:"far fa-heart"})}),Object(c.jsxs)("div",{className:"botton",children:[Object(c.jsxs)("a",{className:"view",onClick:function(){return e.setVisible(!0)},children:[Object(c.jsx)("div",{className:"view-text",children:"Quick view"}),Object(c.jsx)("div",{className:"view-icon",children:Object(c.jsx)("i",{className:"fas fa-eye"})})]}),Object(c.jsxs)("a",{className:"view",onClick:function(){return function(e){var c=[{id:e.product._id,name:e.product.name,quantity:1}];t(M(c)),n.push("cart")}(e)},children:[Object(c.jsx)("div",{className:"view-text",children:"Quick shop"}),Object(c.jsx)("div",{className:"view-icon",children:Object(c.jsx)("i",{className:"fas fa-cart-plus"})})]})]}),Object(c.jsx)("div",{className:"size",children:"XS, S, M, L, XL"})]})]}),Object(c.jsxs)("div",{className:"price",children:[Object(c.jsx)("h3",{className:"headding",children:e.product.name}),Object(c.jsxs)("span",{className:"price-content",children:[Q(e.product.price)," vn\u0111"]})]})]})};function B(e){var t=Object(r.useState)(0),n=Object(l.a)(t,2),i=n[0],a=n[1],s=Object(r.useState)(!1),o=Object(l.a)(s,2),j=o[0],u=o[1],b=Object(r.useState)(!1),O=Object(l.a)(b,2),h=O[0],p=O[1],x=Object(r.useState)(!1),m=Object(l.a)(x,2),f=m[0],y=m[1],g=Object(d.b)(),C=Object(c.jsx)(N.a,{message:"Warning",description:"Quantity should not be less than 0",type:"warning",showIcon:!0,closable:!0}),k=function(e){g(M(e))};return Object(c.jsxs)("div",{children:[Object(c.jsx)(V,{product:e.product,setVisible:y},e.product.id),j&&C,h&&Object(c.jsx)(z,{error:e.product},e.product.id),Object(c.jsx)(L.a,{title:"Quick view",centered:!0,visible:f,onOk:function(){return y(!1)},onCancel:function(){return y(!1)},width:1e3,children:Object(c.jsxs)(T.a,{children:[Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)(V,{product:e.product,setVisible:y},e.product.id)}),Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)("div",{children:Object(c.jsxs)(T.a,{children:[Object(c.jsx)(v.a,{span:8,children:Object(c.jsx)(S.a,{onClick:function(){!function(){if(0!==i){a(i-1),u(!1);var t=[{id:e.product._id,name:e.product.name,quantity:i-1}];k(t)}else u(!0);p(!1)}()},children:Object(c.jsx)(F.a,{})})}),Object(c.jsx)(v.a,{span:8,children:Object(c.jsx)("p",{children:i})}),Object(c.jsx)(v.a,{span:8,children:Object(c.jsx)(S.a,{onClick:function(){!function(){if(e.product.quantity<i+1)p(!0);else{a(i+1),p(!1);var t=[{id:e.product._id,name:e.product.name,quantity:i+1}];k(t)}u(!1)}()},children:Object(c.jsx)(U.a,{})})}),Object(c.jsx)(v.a,{children:Object(c.jsx)(S.a,{onClick:function(){e.showDrawer(),y(!1)},children:"Add to cart"})})]})})})]})})]})}var W=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],i=t[1],a=Object(r.useState)(!1),s=Object(l.a)(a,2),o=s[0],b=s[1],h=Object(d.c)((function(e){return e})),p=Object(f.g)(),x=function(){b(!0)};return Object(r.useEffect)((function(){function e(){return(e=Object(u.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("https://".concat("lixiapi.kaito.ninja","/products"));case 2:t=e.sent,i(t.data.Products);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("div",{className:"row",children:n.map((function(e,t){return Object(c.jsx)(B,{product:e,showDrawer:x},t)}))})}),Object(c.jsxs)(A.a,{title:"Cart",placement:"right",closable:!1,onClose:function(){b(!1)},visible:o,children:[h.carts.map((function(e){return Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{children:e.name}),Object(c.jsx)("p",{children:e.quantity})]},e.name)})),Object(c.jsx)(S.a,{onClick:function(){return e="cart",void p.push(e);var e},children:"Go to cart"})]})]})},G=n(310),H=n(318),Y=n(319),J=n(307),X=function(e,t){return{type:"EDIT_CART",id:e,count:t}},K=function(e){return{type:"DELETE_CART",id:e}},Z=n(321),$=[],ee={labelCol:{span:8},wrapperCol:{span:16}},te={wrapperCol:{offset:8,span:16}},ne=function(){var e=G.a.Text,t=Object(r.useState)(0),n=Object(l.a)(t,2),a=n[0],s=n[1],o=Object(r.useState)(0),j=Object(l.a)(o,2),u=j[0],b=j[1],O=Object(r.useState)(0),h=Object(l.a)(O,2),p=h[0],x=h[1],m=Object(r.useState)(0),C=Object(l.a)(m,2),q=C[0],w=C[1],_=Object(r.useState)(0),R=Object(l.a)(_,2),D=R[0],E=R[1],P=i.a.useState(),N=Object(l.a)(P,2)[1],A=Object(r.useCallback)((function(){return N({})}),[]),M=g.a.useForm(),z=Object(l.a)(M,1)[0],V=Object(d.b)(),B=Object(d.c)((function(e){return e})),W=[{title:"PRODUCT",dataIndex:"product",responsive:["sm"],render:function(e,t){return Object(c.jsx)(T.a,{type:"flex",align:"middle",children:Object(c.jsxs)(H.b,{size:"middle",children:[Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)(k.a,{src:"".concat(e[1]),alt:e[0],width:120,height:150})}),Object(c.jsx)(v.a,{children:Object(c.jsxs)(T.a,{children:[Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)(Y.a,{color:"green",children:e[0]})}),Object(c.jsx)(v.a,{children:Object(c.jsx)(Y.a,{color:"volcano",children:Object(c.jsx)(Z.a,{onClick:function(){se(t.key)}})})})]})})]})})}},{title:"PRODUCT",dataIndex:"product",responsive:["xs"],render:function(e,t){return Object(c.jsx)(T.a,{type:"flex",align:"middle",children:Object(c.jsxs)(H.b,{size:"middle",children:[Object(c.jsx)(v.a,{children:Object(c.jsx)(k.a,{src:"".concat(e[1]),alt:e[0]})}),Object(c.jsxs)(v.a,{children:[Object(c.jsxs)(T.a,{children:[Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)(Y.a,{color:"green",children:e[0]})}),Object(c.jsx)(v.a,{children:Object(c.jsx)(Y.a,{color:"volcano",children:Object(c.jsx)(Z.a,{onClick:function(){se(t.key)}})})})]}),Object(c.jsx)("div",{style:{marginTop:"0.5em",marginBottom:"0.5em"}}),Object(c.jsx)(T.a,{children:Object(c.jsx)(v.a,{children:Object(c.jsxs)(Y.a,{color:"green",children:[Q(t.price)," vn\u0111"]})})}),Object(c.jsx)("div",{style:{marginTop:"0.5em",marginBottom:"0.5em"}}),Object(c.jsxs)(T.a,{children:[Object(c.jsx)(v.a,{span:6,children:Object(c.jsx)(Y.a,{color:"green",onClick:function(){ne(t.key)},children:Object(c.jsx)(F.a,{})})}),Object(c.jsx)(v.a,{span:8,type:"flex",align:"center",justify:"center",style:{marginLeft:"0.5em"},children:Object(c.jsx)("p",{children:t.quantity})}),Object(c.jsx)(v.a,{span:6,children:Object(c.jsx)(Y.a,{color:"green",onClick:function(){ce(t.key)},children:Object(c.jsx)(U.a,{})})})]})]})]})})}},{title:"PRICE",dataIndex:"price",responsive:["sm"],render:function(e){return Object(c.jsxs)(Y.a,{color:"green",children:[Q(e)," vn\u0111"]})}},{title:"QUANTITY",dataIndex:"quantity",responsive:["sm"],render:function(e,t){return Object(c.jsx)(T.a,{type:"flex",align:"middle",children:Object(c.jsxs)(H.b,{size:"small",children:[Object(c.jsx)(v.a,{span:6,children:Object(c.jsx)(S.a,{onClick:function(){ne(t.key)},children:Object(c.jsx)(F.a,{})})}),Object(c.jsx)(v.a,{span:24,type:"flex",align:"center",justify:"center",style:{marginTop:"1em"},children:Object(c.jsx)("p",{children:e})}),Object(c.jsx)(v.a,{span:6,children:Object(c.jsx)(S.a,{onClick:function(){ce(t.key)},children:Object(c.jsx)(U.a,{})})})]})})}},{title:"TOTAL",dataIndex:"total",render:function(){return Object(c.jsxs)(Y.a,{color:"green",children:[Q(u)," vn\u0111"]})}}];$=[];var ne=function(e){var t=$.findIndex((function(t){return t.key===e}));ae(-$[t].price),V(X(e,-1)),$[t].quantity=B.carts[t].quantity,$[t].total=B.carts[t].quantity*$[t].price,A()},ce=function(e){var t=$.findIndex((function(t){return t.key===e})),n=B.products.findIndex((function(t){return t._id===e}));$[t].quantity>=B.products[n].quantity?re("Quantity of ".concat($[t].name," max is ").concat(B.products[n].quantity)):(ae($[t].price),V(X(e,1)),$[t].quantity=B.carts[t].quantity,$[t].total=B.carts[t].quantity*$[t].price,A())},re=function(e){L.a.error({title:"Login fail",content:"".concat(e,", try again !!!")}),A()},ie=function(){z.resetFields()},ae=function(e){b(u+e)},se=function(e){V(K(e))};return Object(r.useEffect)((function(){var e=0,t=B.carts.map((function(t){var n,c=B.products.filter((function(e){return e.name===t.name}));if(0!==c.length)return n=c[0].quantity<t.quantity?c[0].quantity*c[0].price:t.quantity*c[0].price,e+=n}));return b(e),t}),[B]),Object(c.jsxs)("div",{children:[a?Object(c.jsx)(f.a,{to:{pathname:"/checkout",data:u}}):null,void 0===B.carts||B.carts.map((function(e){var t=B.products.filter((function(t){return t._id===e.id}));t&&$.push({key:e.id,product:[e.name,t[0].image],price:t[0].price,quantity:e.quantity,total:t[0].price*e.quantity})})),Object(c.jsx)(J.a,{columns:W,dataSource:$,pagination:!1}),Object(c.jsxs)(T.a,{justify:"space-around",children:[Object(c.jsx)(v.a,{children:Object(c.jsxs)(g.a,Object(y.a)(Object(y.a)({},ee),{},{form:z,name:"control-hooks",onFinish:function(e){var t=B.promos.filter((function(t){return t.code===e.Code}));0===t.length?(L.a.warning({title:"Warning",content:"Code incorrect, try again !!!"}),A(),ie()):t[0].quantity>0&&(E(t[0].price/u),w(u),u-t[0].price<0?(x(p+1),b(0)):(b(u-t[0].price),x(p+1)),L.a.success({title:"Success",content:"Code correct, happy shoppping !!!"}),A())},children:[Object(c.jsx)(g.a.Item,{name:"Code",label:"Code",rules:[{required:!0}],children:Object(c.jsx)(I.a,{disabled:0!==D&&1==p,type:"text"})}),Object(c.jsx)(g.a.Item,Object(y.a)(Object(y.a)({},te),{},{children:Object(c.jsx)(S.a,{type:"primary",htmlType:"submit",children:"Submit"})}))]}))}),Object(c.jsxs)(v.a,{children:[Object(c.jsxs)("p",{children:["SUBTOTAL: ",0!==D&&1==p&&Object(c.jsxs)("div",{children:[Object(c.jsxs)(e,{delete:!0,type:"secondary",children:[Q(q)," vn\u0111 "]}),Object(c.jsxs)(e,{type:"success",children:["(gi\u1ea3m ",Math.floor(D),"%)"]}),Object(c.jsx)("br",{}),Object(c.jsx)(Y.a,{color:"green",children:Object(c.jsxs)(e,{type:"success",children:[Q(u)," vn\u0111"]})})]})||Object(c.jsx)(Y.a,{color:"green",children:Object(c.jsxs)(e,{type:"success",children:[Q(u)," vn\u0111"]})})]}),Object(c.jsx)(S.a,{type:"primary",onClick:function(){s(1)},children:"Check Out"})]})]})]})},ce=function(e,t){return{type:"EDIT_PROMO",id:e,info:t}},re=function(e){return{type:"DELETE_PROMO",id:e}},ie=function(e){return{type:"ADD_PROMO",info:e}},ae={labelCol:{span:8},wrapperCol:{span:16}},se={wrapperCol:{offset:8,span:16}},oe=function(e){var t=g.a.useForm(),n=Object(l.a)(t,1)[0],i=Object(d.b)();return Object(r.useEffect)((function(){n.setFieldsValue({name:e.promo.name,quantity:e.promo.quantity,price:e.promo.price,code:e.promo.code})}),[e]),Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)(g.a,{form:n,onFinish:function(t){var n=[{name:t.name,quantity:t.quantity,price:t.price,code:t.code}];O.a.put("https://".concat("lixiapi.kaito.ninja","/promotion/").concat(e.promo._id),n[0]).then((function(t){return i(ce(e.promo._id,t))})).catch((function(e){return console.log(e)}))},children:[Object(c.jsx)(g.a.Item,{name:"name",label:"Name",rules:[{required:!0}],children:Object(c.jsx)(I.a,{})}),Object(c.jsx)(g.a.Item,{name:"quantity",label:"Quantity",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"number"})}),Object(c.jsx)(g.a.Item,{name:"price",label:"Price",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"number"})}),Object(c.jsx)(g.a.Item,{name:"code",label:"Code",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"text"})}),Object(c.jsxs)(g.a.Item,Object(y.a)(Object(y.a)({},se),{},{children:[Object(c.jsx)(S.a,{type:"primary",htmlType:"submit",children:"Submit"}),Object(c.jsx)(S.a,{htmlType:"button",onClick:function(){n.resetFields()},children:"Reset"}),Object(c.jsx)(S.a,{htmlType:"button",onClick:function(){return t=e.promo._id,void O.a.delete("https://".concat("lixiapi.kaito.ninja","/promotion/").concat(t)).then((function(e){return i(re(e))})).catch((function(e){return console.log(e)}));var t},children:"Delete"})]}))]})})},je=function(){var e=g.a.useForm(),t=Object(l.a)(e,1)[0],n=Object(d.b)(),r=Object(d.c)((function(e){return e.promos})),i=function(){t.resetFields()};return Object(c.jsxs)("div",{children:[r.map((function(e){return Object(c.jsx)(oe,{promo:e},e._id)})),Object(c.jsxs)(g.a,Object(y.a)(Object(y.a)({},ae),{},{form:t,name:"control-hooks",onFinish:function(e){var t=[{name:e.Name,quantity:e.Quantity,price:e.Price,code:e.Code}];O.a.post("https://".concat("lixiapi.kaito.ninja","/promotions"),t[0]).then((function(e){return n(ie(e))})).catch((function(e){return console.log(e)})),i()},children:[Object(c.jsx)(g.a.Item,{name:"Name",label:"Name",rules:[{required:!0}],children:Object(c.jsx)(I.a,{})}),Object(c.jsx)(g.a.Item,{name:"Quantity",label:"Quantity",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"number"})}),Object(c.jsx)(g.a.Item,{name:"Price",label:"Price",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"number"})}),Object(c.jsx)(g.a.Item,{name:"Code",label:"Code",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"text"})}),Object(c.jsxs)(g.a.Item,Object(y.a)(Object(y.a)({},se),{},{children:[Object(c.jsx)(S.a,{type:"primary",htmlType:"submit",children:"Submit"}),Object(c.jsx)(S.a,{htmlType:"button",onClick:i,children:"Reset"})]}))]}))]})},ue=n(320),le=n(315),de=n(305),be=function(e){return{type:"ADD_ORDER",info:e}},Oe=function(){return{type:"RESET_CART"}},he=[],pe={labelCol:{span:8},wrapperCol:{span:16}},xe={wrapperCol:{offset:8,span:16}},me=function(e){var t=G.a.Text,n=g.a.useForm(),r=Object(l.a)(n,1)[0],i=Object(f.g)(),a=Object(d.b)(),s=Object(d.c)((function(e){return e.carts})),o=Object(d.c)((function(e){return e.users})),j=Object(d.c)((function(e){return e.products}));he=[];return Object(c.jsxs)("div",{children:[s.map((function(e,t){var n=j.filter((function(t){return t._id===e.id}));if(0!==t){var c=he[t-1].total[1];he.push({key:n[0]._id,name:n[0].name,quantity:e.quantity,total:[e.quantity*n[0].price,c+e.quantity*n[0].price],image:n[0].image})}else he.push({key:n[0]._id,name:n[0].name,quantity:e.quantity,total:[e.quantity*n[0].price,e.quantity*n[0].price],image:n[0].image})})),Object(c.jsxs)(T.a,{justify:"space-between",children:[Object(c.jsx)(v.a,{span:12,children:Object(c.jsxs)(g.a,Object(y.a)(Object(y.a)({},pe),{},{form:r,name:"control-hooks",onFinish:function(t){t.cart={stateCart:s},t.subtotal=e.location.data,t.status="processing",t.author=o[0].uid,a(Oe()),O.a.post("https://".concat("lixiapi.kaito.ninja","/orders"),t).then((function(e){return a(be(e))})).catch((function(e){return console.log(e)})),r.resetFields(),i.push("/")},children:[Object(c.jsx)(g.a.Item,{name:"name",label:"Name",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"text",placeholder:"Nguy\u1ec5n V\u0103n A"})}),Object(c.jsx)(g.a.Item,{name:"phone",label:"Phone",rules:[{required:!0,pattern:new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),message:"Wrong phone number!"}],children:Object(c.jsx)(I.a,{type:"text",placeholder:"0909259713"})}),Object(c.jsx)(g.a.Item,{name:"address",label:"Address",rules:[{required:!0}],children:Object(c.jsx)(I.a,{type:"text",placeholder:"139 Xu\xe2n H\u1ed3ng"})}),Object(c.jsx)(g.a.Item,Object(y.a)(Object(y.a)({},xe),{},{children:Object(c.jsx)(S.a,{type:"primary",htmlType:"submit",children:"Order"})}))]}))}),Object(c.jsx)(v.a,{span:1}),Object(c.jsxs)(v.a,{span:11,children:[Object(c.jsx)(ue.b,{itemLayout:"vertical",size:"large",dataSource:he,renderItem:function(e){return Object(c.jsx)(ue.b.Item,{children:Object(c.jsxs)(T.a,{justify:"space-between",align:"middle",children:[Object(c.jsx)(v.a,{span:"8",children:Object(c.jsxs)(T.a,{justify:"space-between",align:"middle",children:[Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)(le.a,{count:e.quantity,children:Object(c.jsx)(k.a,{width:"4.6em",height:"6em",alt:"logo",src:e.image})})}),Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)(t,{children:e.name})})]})}),Object(c.jsx)(v.a,{span:"14",children:Object(c.jsxs)(t,{children:[e.total[0]," vn\u0111"]})})]})},e.key)}}),Object(c.jsx)(de.a,{}),Object(c.jsx)(ue.b,{itemLayout:"vertical",size:"large",dataSource:he,renderItem:function(e,n){if(n===he.length-1)return Object(c.jsx)(ue.b.Item,{children:Object(c.jsxs)(T.a,{justify:"space-between",align:"middle",children:[Object(c.jsx)(v.a,{span:"8",children:Object(c.jsx)(T.a,{justify:"space-between",align:"middle",children:Object(c.jsx)(v.a,{children:Object(c.jsx)(t,{children:"Total:"})})})}),Object(c.jsx)(v.a,{span:"14",children:Object(c.jsxs)(t,{children:[he[he.length-1].total[1]," vn\u0111"]})})]})},e.key)}})]})]})]})},fe=n(113),ye=n(316),ge=function(e,t){return{type:"EDIT_ORDER",id:e,info:t}},ve=[],Ce={wrapperCol:{offset:22,span:24}},ke=function(e){var t=G.a.Text,n=g.a.useForm(),i=Object(l.a)(n,1)[0],a=Object(r.useState)(0),s=Object(l.a)(a,2),o=s[0],j=s[1],u=fe.a.Option,b=Object(r.useRef)(null),h=Object(d.b)(),p=Object(d.c)((function(e){return e.users})),x=Object(d.c)((function(e){return e.products})),m=Object(d.c)((function(e){return e})),f=Object(r.useState)(!1),C=Object(l.a)(f,2),I=C[0],q=C[1],w=[{title:"PRODUCT",dataIndex:"product",responsive:["sm"],render:function(e){return Object(c.jsx)(T.a,{type:"flex",align:"middle",children:Object(c.jsxs)(H.b,{size:"middle",children:[Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)(k.a,{src:"".concat(e[1]),alt:e[0],width:120,height:150})}),Object(c.jsx)(v.a,{children:Object(c.jsx)(T.a,{children:Object(c.jsx)(v.a,{span:12,children:Object(c.jsx)(Y.a,{color:"green",children:e[0]})})})})]})})}},{title:"PRODUCT",dataIndex:"product",responsive:["xs"],render:function(e,t){return Object(c.jsx)(T.a,{type:"flex",align:"middle",children:Object(c.jsxs)(H.b,{size:"middle",children:[Object(c.jsx)(v.a,{children:Object(c.jsx)(le.a,{count:t.quantity,children:Object(c.jsx)(k.a,{src:"".concat(e[1]),alt:e[0]})})}),Object(c.jsxs)(v.a,{children:[Object(c.jsx)(T.a,{children:Object(c.jsx)(v.a,{children:Object(c.jsx)(Y.a,{color:"green",children:e[0]})})}),Object(c.jsx)("div",{style:{marginTop:"0.5em",marginBottom:"0.5em"}}),Object(c.jsx)(T.a,{children:Object(c.jsx)(v.a,{children:Object(c.jsxs)(Y.a,{color:"green",children:[t.price," vn\u0111"]})})}),Object(c.jsx)("div",{style:{marginTop:"0.5em",marginBottom:"0.5em"}})]})]})})}},{title:"PRICE",dataIndex:"price",responsive:["sm"]},{title:"QUANTITY",dataIndex:"quantity",responsive:["sm"],render:function(e){return Object(c.jsx)(T.a,{type:"flex",align:"stretch",children:Object(c.jsx)(v.a,{type:"flex",align:"center",justify:"center",style:{marginTop:"1em"},children:Object(c.jsx)(Y.a,{color:"green",children:e})})})}},{title:"TOTAL",dataIndex:"total",render:function(){return Object(c.jsxs)(Y.a,{color:"green",children:[o," vn\u0111"]})}}];ve=[];O.a.get("https://".concat("lixiapi.kaito.ninja","/admin"),{headers:{uid:p[0].uid}}).then((function(e){return function(e){q(e.data.admin)}(e)})).catch((function(e){return console.log(e)}));return Object(r.useEffect)((function(){setTimeout((function(){i.setFieldsValue({status:e.order.status})}),600);var t=0,n=m.orders.map((function(n){n.author===e.order.author&&n._id===e.order._id&&n.cart.stateCart.map((function(e){var n,c=m.products.filter((function(t){return t.name===e.name}));if(0!==c.length)return n=c[0].quantity<e.quantity?c[0].quantity*c[0].price:e.quantity*c[0].price,t+=n}))}));return j(t),n}),[e,m]),Object(c.jsxs)("div",{style:{padding:"1em"},children:[Object(c.jsxs)(ye.b,{style:{paddingLeft:"1em"},children:[Object(c.jsx)(ye.b.Item,{label:"Name",children:e.order.name}),Object(c.jsx)(ye.b.Item,{label:"Phone",children:e.order.phone}),Object(c.jsx)(ye.b.Item,{label:"Address",children:e.order.address}),Object(c.jsx)(ye.b.Item,{label:"Total",children:e.order.subtotal}),Object(c.jsx)(ye.b.Item,{label:"Status",children:e.order.status})]}),e.order.cart.stateCart.map((function(e){var t=x.filter((function(t){return t._id===e.id}));t&&ve.push({key:e.id,product:[e.name,t[0].image],price:t[0].price,quantity:e.quantity,total:t[0].price*e.quantity})})),Object(c.jsx)(J.a,{columns:w,dataSource:ve,pagination:!1}),Object(c.jsx)(t,{children:"SUBTOTAL: "}),Object(c.jsx)(Y.a,{color:"green",children:Object(c.jsxs)(t,{type:"success",children:[o," vn\u0111"]})}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)(de.a,{}),I&&Object(c.jsxs)(g.a,{form:i,name:"control-hooks",onFinish:function(t){console.log(t);var n=[{status:t.status}];O.a.put("https://".concat("lixiapi.kaito.ninja","/order/").concat(e.order._id),n[0]).then((function(t){return h(ge(e.order._id,t))})).catch((function(e){return console.log(e)}))},ref:b,children:[Object(c.jsx)(g.a.Item,{name:"status",label:"Status",rules:[{required:!0}],children:Object(c.jsxs)(fe.a,{children:[Object(c.jsx)(u,{selected:!0,value:e.order.status,children:e.order.status}),Object(c.jsx)(u,{value:"processing"!==e.order.status?"processing":"delivered",children:"processing"!==e.order.status?"processing":"delivered"})]})}),Object(c.jsx)(g.a.Item,Object(y.a)(Object(y.a)({},Ce),{},{children:Object(c.jsx)(S.a,{type:"primary",htmlType:"submit",children:"Submit"})}))]})]})},Ie=function(){var e=Object(d.c)((function(e){return e.orders})),t=Object(d.c)((function(e){return e.users})),n=Object(r.useState)(!1),i=Object(l.a)(n,2),a=i[0],s=i[1];return O.a.get("https://".concat("lixiapi.kaito.ninja","/admin"),{headers:{uid:t[0].uid}}).then((function(e){return function(e){s(e.data.admin)}(e)})).catch((function(e){return console.log(e)})),Object(c.jsxs)("div",{children:[e.map((function(e){if(e.author===t[0].uid&&!1===a)return Object(c.jsx)(ke,{order:e},e._id)})),e.map((function(e){if(!0===a)return Object(c.jsx)(ke,{order:e},e._id)}))]})},Se=n(158),Te=n(146),qe=(n(300),{apiKey:"AIzaSyDWlnIcNF6jdZHVmonA2HnO-cElIsj8Dyc",authDomain:"lixiv2.firebaseapp.com",projectId:"lixiv2",storageBucket:"lixiv2.appspot.com",messagingSenderId:"71712373613",appId:"1:71712373613:web:482927516e8c76045ef864",measurementId:"G-W7TTRGRXNC"}),we=function(e){return{type:"ADD_USER",info:e}},_e=function(){return{type:"USER_LOGOUT"}},Re=n(64),De={labelCol:{span:8},wrapperCol:{span:16}},Ee={wrapperCol:{offset:8,span:16}},Pe=function(){var e=g.a.useForm(),t=Object(l.a)(e,1)[0],n=g.a.useForm(),a=(Object(l.a)(n,1)[0],Object(d.b)()),s=Object(r.useState)({}),o=Object(l.a)(s,2),j=o[0],u=o[1],b=Object(r.useState)(""),O=Object(l.a)(b,2),h=(O[0],O[1],Object(r.useState)(!1)),p=Object(l.a)(h,2),x=p[0],m=p[1],f=i.a.useState(),v=Object(l.a)(f,2)[1],C=Object(r.useCallback)((function(){return v({})}),[]),k=Object(r.useState)(!1),T=Object(l.a)(k,2),q=T[0],w=T[1],_=Object(r.useState)(!1),R=Object(l.a)(_,2),D=R[0],E=R[1],P=function(e){L.a.success({title:"Login Success",content:"Login with ".concat(e," success, happy shopping !!!")})},N=function(e){L.a.error({title:"Login fail",content:"".concat(e,", try again !!!")}),C()},A=function(e){window.reCaptchaVerifier=new Te.a.auth.RecaptchaVerifier("sign-in-button",{size:"invisible",callback:function(e){L.a.success({title:"Send verify code success",content:"Please wait for an SMS to be delivered to your phone. The SMS will contain a 6-digit verification code, which you can enter on the verification screen."}),m(!0),E(!1)}});var t=e.phone,n=window.reCaptchaVerifier;Te.a.auth().signInWithPhoneNumber(t,n).then((function(e){u(e)})).catch((function(e){N(e)}))},F=function(e){window.confirmationResult=j,window.confirmationResult.confirm(e.code).then((function(e){P("Phone"),E(!1),a(we(e.user))})).catch((function(e){N(e)}))},U=/(\+(84)+(9|3|7|8|5)+([0-9]{8})\b)/g;return Object(c.jsx)("div",{children:Object(c.jsx)(Se.b,Object(y.a)(Object(y.a)({},qe),{},{firebase:Te.a,children:Object(c.jsx)("div",{children:Object(c.jsx)(Se.a,{children:function(e){var n=e.isSignedIn,r=e.firebase,i=e.user;return!0===n&&null!==i?Object(c.jsxs)("div",{children:[Object(c.jsxs)("h2",{children:["You're signed in, welcome ",i.displayName," \ud83c\udf89 "]}),Object(c.jsx)(S.a,{onClick:function(){r.app().auth().signOut(),a(_e())},children:"Sign out"})]}):Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"You're not signed in "}),Object(c.jsx)(S.a,{onClick:function(){var e=new r.auth.FacebookAuthProvider;r.auth().signInWithRedirect(e)},children:"Sign in FB"}),Object(c.jsxs)(S.a,{onClick:function(){w(!0);var e=new r.auth.GoogleAuthProvider;r.auth().signInWithPopup(e).then((function(e){a(we(e.user)),w(!1),P("Google")})).catch((function(e){w(!1),N(e)}))},children:["Sign in with Google ",q&&Object(c.jsx)(Re.a,{})]}),Object(c.jsxs)("div",{id:"recaptcha-container",children:[x&&Object(c.jsxs)(g.a,Object(y.a)(Object(y.a)({},De),{},{form:t,name:"control-hooks",onFinish:F,children:[Object(c.jsx)(g.a.Item,{name:"code",label:"Code",rules:[{required:!0}],children:Object(c.jsx)(I.a,{})}),Object(c.jsx)(g.a.Item,Object(y.a)(Object(y.a)({},Ee),{},{children:Object(c.jsxs)(S.a,{type:"primary",htmlType:"submit",onClick:function(){E(!0)},children:["Login with Phone ",D&&Object(c.jsx)(Re.a,{})]})}))]}))||Object(c.jsxs)(g.a,Object(y.a)(Object(y.a)({},De),{},{form:t,name:"control-hooks",onFinish:A,children:[Object(c.jsx)(g.a.Item,{name:"phone",label:"Phone",rules:[{required:!0,pattern:new RegExp(U),message:"Wrong phone number, format phone number: +84xxxxxxxxx"}],children:Object(c.jsx)(I.a,{type:"text"})}),Object(c.jsx)(g.a.Item,Object(y.a)(Object(y.a)({},Ee),{},{children:Object(c.jsxs)(S.a,{type:"primary",htmlType:"submit",onClick:function(){E(!0)},children:["Send Code ",D&&Object(c.jsx)(Re.a,{})]})}))]})),Object(c.jsx)("div",{id:"sign-in-button"})]})]})}})})}))})},Ne=function(){return Object(c.jsx)("div",{children:Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:"a"}),Object(c.jsx)("li",{children:"b"}),Object(c.jsx)("li",{children:"c"}),Object(c.jsx)("li",{children:"d"})]})})},Le=function(e){var t=Object(d.c)((function(e){return e.users})),n=Object(r.useState)(!1),i=Object(l.a)(n,2),a=i[0],s=i[1],o=Object(f.g)(),b=function(e){o.push(e)};return Object(r.useEffect)((function(){function e(){return(e=Object(u.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("https://".concat("lixiapi.kaito.ninja","/admin"),{headers:{uid:t[0].uid}});case 2:n=e.sent,s(n.data.admin);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[t]),Object(c.jsxs)("div",{children:[Object(c.jsx)(S.a,{onClick:function(){b("/")},children:"Home"}),a&&Object(c.jsx)(S.a,{onClick:function(){b("/products")},children:"Products"}),Object(c.jsx)(S.a,{onClick:function(){b("/cart")},children:"Cart"}),a&&Object(c.jsx)(S.a,{onClick:function(){b("/promotions")},children:"Promo"}),Object(c.jsx)(S.a,{onClick:function(){b("/orders")},children:"Order"}),Object(c.jsx)(S.a,{onClick:function(){b("/login")},children:"Login"}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{}),Object(c.jsx)("br",{})]})},Ae=(n(302),n(306));var Fe=function(){var e=Ae.a.Header,t=Ae.a.Content,n=(Ae.a.Footer,Ae.a.Sider,Object(d.b)()),i=Object(d.c)((function(e){return e.users})),a=Object(r.useState)(!1),s=Object(l.a)(a,2),o=s[0],b=s[1];return Object(r.useEffect)((function(){function e(){return(e=Object(u.a)(j.a.mark((function e(){var t,c,r,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("https://".concat("lixiapi.kaito.ninja","/products"));case 2:return t=e.sent,e.next=5,O.a.get("https://".concat("lixiapi.kaito.ninja","/promotions"));case 5:return c=e.sent,e.next=8,O.a.get("https://".concat("lixiapi.kaito.ninja","/orders"));case 8:return r=e.sent,e.next=11,O.a.get("https://".concat("lixiapi.kaito.ninja","/admin"),{headers:{uid:i[0].uid}});case 11:a=e.sent,b(a.data.admin),n(h(t.data.Products)),n(p(c.data.Promos)),n(x(r.data.Order));case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[i]),Object(c.jsx)(Ae.a,{className:"App",children:Object(c.jsxs)(m.a,{children:[Object(c.jsx)(e,{children:Object(c.jsx)(Le,{})}),Object(c.jsx)(t,{children:Object(c.jsxs)(f.d,{children:[Object(c.jsx)(f.b,{exact:!0,path:"/",component:W}),o&&Object(c.jsx)(f.b,{path:"/products",component:P}),Object(c.jsx)(f.b,{path:"/cart",component:ne}),o&&Object(c.jsx)(f.b,{path:"/promotions",component:je}),Object(c.jsx)(f.b,{path:"/checkout",component:me}),Object(c.jsx)(f.b,{path:"/orders",component:Ie}),Object(c.jsx)(f.b,{path:"/login",component:Pe}),Object(c.jsx)(f.b,{path:"/test",component:Ne})]})})]})})},Ue=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,322)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))},Me=n(91),Qe=[],ze=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Qe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_CART":var n=t.info,c=e.filter((function(e){return e.name!==n[0].name}));return 0===n[0].quantity?c:[].concat(c,n);case"RESET_CART":return[];case"EDIT_CART":var r=e.findIndex((function(e){return e.id===t.id}));if(e[r].quantity=e[r].quantity+t.count,e[r].quantity<=0){var i=e.filter((function(e){return e.id!==t.id}));return i}return e;case"DELETE_CART":var a=e.filter((function(e){return e.id!==t.id}));return a;default:return e}},Ve=[],Be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ALL_PRODUCT":var n=t.info;return n;case"ADD_PRODUCT":var c=[].concat(e,t.info.data.Product);return c;case"EDIT_PRODUCT":var r=e.findIndex((function(e){return e._id===t.id}));return e[r]=t.info.data.Product,e;case"DELETE_PRODUCT":var i=e.filter((function(e){return e._id!==t.id.data.messenge}));return i;default:return e}},We=[],Ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:We,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ALL_PROMO":var n=t.info;return n;case"ADD_PROMO":var c=[].concat(e,t.info.data.Promo);return c;case"EDIT_PROMO":var r=e.findIndex((function(e){return e._id===t.id}));return e[r]=t.info.data.Promo,e;case"DELETE_PROMO":var i=e.filter((function(e){return e._id!==t.id.data.messenge}));return i;case"EMPTY_PROMO":return[];default:return e}},He=[],Ye=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:He,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ALL_ORDER":var n=t.info;return n;case"ADD_ORDER":var c=[].concat(e,t.info.data.Order);return c;case"EDIT_ORDER":var r=e.findIndex((function(e){return e._id===t.id}));return e[r].status=t.info.data.Order.status,e;default:return e}},Je=[{displayName:"",email:"",phoneNumber:"",uid:"",type:""}],Xe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Je,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ALL_USER":var n=t.info;return n;case"ADD_USER":try{var c=t.info,r={displayName:c.displayName,email:c.email,phoneNumber:c.phoneNumber,uid:c.uid},i=[r];return O.a.post("https://".concat("lixiapi.kaito.ninja","/user"),r).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)})),i}catch(a){return console.log(a),e}case"USER_LOGOUT":return Je;default:return e}},Ke=Object(Me.b)({carts:ze,products:Be,promos:Ge,orders:Ye,users:Xe});var Ze=Object(Me.c)(Ke,function(){try{var e=localStorage.getItem("persistantState");if(null===e)return;return JSON.parse(e)}catch(t){return void console.warn(t)}}());Ze.subscribe((function(){return function(e){try{var t=JSON.stringify(e);localStorage.setItem("persistantState",t)}catch(n){console.warn(n)}}(Ze.getState())}));var $e=Ze;s.a.render(Object(c.jsx)(d.a,{store:$e,children:Object(c.jsx)(Fe,{})}),document.getElementById("root")),Ue()}},[[303,1,2]]]);
//# sourceMappingURL=main.0871335d.chunk.js.map