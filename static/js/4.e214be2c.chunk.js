(this["webpackJsonpsocial-network-ts"]=this["webpackJsonpsocial-network-ts"]||[]).push([[4],{107:function(e,t,a){e.exports={pagination:"Pagination_pagination__2Fuks",slider:"Pagination_slider__2cFTK",pageNumber:"Pagination_pageNumber__21Eo1",currentPageNumber:"Pagination_currentPageNumber__hHrXk",form:"Pagination_form__1f6z1",error:"Pagination_error__gZEJX"}},134:function(e,t,a){e.exports={userCard:"UserCard_userCard__3ynex",leftPart:"UserCard_leftPart__3N1L6",rightPart:"UserCard_rightPart__3oltd",name:"UserCard_name__1H9K5",status:"UserCard_status__1vqrh"}},246:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(33),s=a(26),i=a(11);var o=a(107),u=a.n(o),l=a(4),b=a(5),d=a(15),j=function(e,t){return"".concat(u.a.pageNumber," ").concat(e===t?u.a.currentPageNumber:"")},m=a(1),f=r.a.memo((function(e){!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e);var t=Object(l.c)(b.o),a=Object(l.c)(b.a),r=Object(l.b)(),s=Object(n.useState)(a),o=Object(i.a)(s,2),f=o[0],O=o[1],g=function(e){r(Object(c.d)(e))},h=function(e){e.preventDefault();var t=+e.currentTarget.id;g(t),O(t)},_=function(e,t,a,n){for(var r=[],c=t-a;c<=t+n;c++)c>=1&&c<=e&&(r=[].concat(Object(d.a)(r),[{name:c.toString(),id:c}]));return r[0]&&+r[0].id>1&&(r=[{name:"First Page",id:1}].concat(Object(d.a)(r))),r[0]&&+r[r.length-1].id<e&&(r=[].concat(Object(d.a)(r),[{name:"Last Page",id:e}])),r}(t,a,2,5).map((function(e){return Object(m.jsx)("a",{href:e.name,id:e.id.toString(),className:j(e.id,a),onClick:h,children:e.name},e.id)}));return Object(m.jsxs)("div",{className:u.a.pagination,children:[Object(m.jsx)("div",{className:u.a.slider,children:_}),Object(m.jsxs)("form",{onSubmit:function(e){e.preventDefault(),g(f)},className:u.a.form,children:[Object(m.jsx)("input",{value:f,onChange:function(e){var a=+e.currentTarget.value;O(function(e){return e<1?1:e>t?t:e}(a))},type:"number"}),Object(m.jsx)("button",{children:"Go"})]})]})})),O=a(134),g=a.n(O),h=a(14),_=r.a.memo((function(e){var t=e.id,a=e.name,r=e.photos,s=e.status,o=e.followed,u=o?"UnFollow":"Follow",b=r.small?r.small:r.large?r.large:"https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png",d=Object(n.useState)(!1),j=Object(i.a)(d,2),f=j[0],O=j[1],_=Object(l.b)();return Object(n.useEffect)((function(){O(!1)}),[o]),Object(m.jsxs)("div",{className:g.a.userCard,children:[Object(m.jsxs)("div",{className:g.a.leftPart,children:[Object(m.jsx)(h.b,{to:"/profile/"+t,children:Object(m.jsx)("img",{src:b,alt:""})}),Object(m.jsx)("button",{disabled:f,onClick:function(){O(!0),_(o?Object(c.e)(t):Object(c.b)(t))},children:u})]}),Object(m.jsxs)("div",{className:g.a.rightPart,children:[Object(m.jsx)("div",{className:"name",children:a}),Object(m.jsxs)("div",{className:g.a.status,children:["status: ",s]})]})]})}));t.default=function(){var e=Object(l.c)(b.i),t=Object(l.c)(b.a),a=Object(l.b)();Object(n.useEffect)((function(){a(Object(c.c)(t))}),[t]);var r=Object(n.useMemo)((function(){return e.map((function(e){return Object(m.jsx)(_,{id:e.id,name:e.name,photos:e.photos,status:e.status,followed:e.followed},e.id)}))}),[e]);return e.length?Object(m.jsxs)("div",{children:[Object(m.jsx)(f,{}),Object(m.jsx)("div",{children:r})]}):Object(m.jsx)(s.a,{})}}}]);
//# sourceMappingURL=4.e214be2c.chunk.js.map