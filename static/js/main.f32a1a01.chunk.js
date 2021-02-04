(this["webpackJsonpapra-coding-challenge"]=this["webpackJsonpapra-coding-challenge"]||[]).push([[0],{164:function(e,t,n){},302:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),l=n(30),i=n.n(l),o=(n(164),n(39)),r=n(153),s=n(34),j=n(66),u=n(158),d=n(157),b=n(45),h=n(38),O=n(31),x=n(65),v=n(61),p=n(159),m=n(154),f=n.n(m),g=n(7);var C=function(e){var t=e.photo,n=e.onSelect,a=Object(c.useCallback)((function(){return n(t)}),[n,t]);return Object(g.jsxs)("tr",{onClick:a,children:[Object(g.jsx)("td",{children:t.id}),Object(g.jsx)("td",{children:t.title}),Object(g.jsx)("td",{children:Object(g.jsx)(v.a,{src:t.thumbnailUrl,rounded:!0,fluid:!0})})]})};var k=function(e){var t=e.page,n=e.active,a=e.onSelect,l=Object(c.useCallback)((function(){return a(t)}),[t,a]);return Object(g.jsx)(O.a.Item,{active:n,onClick:l,children:t},t)};var S,y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=Object(c.useState)(e),a=Object(o.a)(n,2),l=a[0],i=a[1];return Object(c.useEffect)((function(){var n=setTimeout((function(){i(e)}),t);return function(){clearTimeout(n)}}),[e,t]),l},I=Object(s.gql)(S||(S=Object(r.a)(["\n  query Photos($q: String, $page: Int, $limit: Int) {\n    photos(\n      options: { paginate: { page: $page, limit: $limit }, search: { q: $q } }\n    ) {\n      data {\n        id\n        title\n        url\n        thumbnailUrl\n      }\n      meta {\n        totalCount\n      }\n    }\n  }\n"])));var q=function(){var e,t,n,a,l,i,r,m=Object(c.useState)(""),S=Object(o.a)(m,2),q=S[0],w=S[1],N=Object(c.useState)(1),T=Object(o.a)(N,2),$=T[0],F=T[1],M=Object(c.useState)(null),P=Object(o.a)(M,2),B=P[0],L=P[1],E=y(q,500),A=Object(s.useQuery)(I,{variables:{q:E,page:$,limit:5}}),D=A.loading,H=A.error,J=A.data,U=Object(c.useCallback)((function(e){w(e.target.value),F(1)}),[w,F]),z=Object(c.useCallback)((function(e){return L(e)}),[L]),G=Object(c.useCallback)((function(){return L(null)}),[L]),Q=Object(c.useCallback)((function(){return F(1)}),[F]),K=(null===J||void 0===J||null===(e=J.photos)||void 0===e||null===(t=e.meta)||void 0===t?void 0:t.totalCount)?Math.ceil((null===J||void 0===J||null===(n=J.photos)||void 0===n||null===(a=n.meta)||void 0===a?void 0:a.totalCount)/5):0,R=Object(c.useCallback)((function(){return F(K)}),[F,K]),V=Object(c.useCallback)((function(){return F($-1)}),[F,$]),W=Object(c.useCallback)((function(){return F($+1)}),[F,$]);return H?Object(g.jsx)("p",{children:"Error"}):Object(g.jsxs)("div",{children:[Object(g.jsxs)(d.a,{className:"mt-5",children:[Object(g.jsx)(j.a,{as:b.a,children:Object(g.jsx)(j.a.Group,{controlId:"search",as:h.a,children:Object(g.jsx)(j.a.Control,{type:"text",placeholder:"Search keywords on title",value:q,onChange:U})})}),Object(g.jsxs)(u.a,{striped:!0,bordered:!0,hover:!0,as:b.a,children:[Object(g.jsx)("thead",{children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"ID"}),Object(g.jsx)("th",{children:"Title"}),Object(g.jsx)("th",{children:"Thumbnail"})]})}),Object(g.jsx)("tbody",{children:(null===J||void 0===J||null===(l=J.photos)||void 0===l?void 0:l.data)&&J.photos.data.map((function(e){return Object(g.jsx)(C,{photo:e,onSelect:z},e.id)}))})]}),D&&Object(g.jsx)(b.a,{children:Object(g.jsx)(h.a,{children:Object(g.jsx)(p.a,{animation:"border",role:"status",children:Object(g.jsx)("span",{className:"sr-only",children:"Loading..."})})})}),Object(g.jsx)(b.a,{children:Object(g.jsx)(h.a,{className:"clearfix",children:(null===J||void 0===J||null===(i=J.photos)||void 0===i||null===(r=i.meta)||void 0===r?void 0:r.totalCount)?Object(g.jsxs)(O.a,{className:"float-right",children:[Object(g.jsx)(O.a.First,{onClick:Q,disabled:1===$}),Object(g.jsx)(O.a.Prev,{onClick:V,disabled:1===$}),f()(Math.max(1,$-2),Math.min(K+1,$+3)).map((function(e){return Object(g.jsx)(k,{page:e,active:e===$,onSelect:F},e)})),Object(g.jsx)(O.a.Next,{onClick:W,disabled:$===K}),Object(g.jsx)(O.a.Last,{onClick:R,disabled:$===K})]}):null})})]}),Object(g.jsxs)(x.a,{show:!!B,onHide:G,animation:!1,children:[Object(g.jsx)(x.a.Header,{closeButton:!0}),Object(g.jsx)(x.a.Body,{children:Object(g.jsx)(v.a,{src:null===B||void 0===B?void 0:B.url,className:"w-100"})})]})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,304)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,l=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),l(e),i(e)}))},N=(n(300),new s.ApolloClient({uri:"https://graphqlzero.almansi.me/api",cache:new s.InMemoryCache}));i.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(s.ApolloProvider,{client:N,children:Object(g.jsx)(q,{})})}),document.getElementById("root")),w()}},[[302,1,2]]]);
//# sourceMappingURL=main.f32a1a01.chunk.js.map