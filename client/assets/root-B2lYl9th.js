import{w as o,p as i,o as s,M as l,L as c,S as d,q as u,O as p,s as h}from"./chunk-NL6KNZEE-D7F_7WPz.js";function j({children:e}){return s.jsxs("html",{lang:"en",children:[s.jsxs("head",{children:[s.jsx("meta",{charSet:"utf-8"}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),s.jsx(l,{}),s.jsx(c,{}),s.jsx("script",{dangerouslySetInnerHTML:{__html:`
              (function(l) {
                if (l.search[1] === '/' ) {
                  var decoded = l.search.slice(1).split('&').map(function(s) { 
                    return s.replace(/~and~/g, '&')
                  }).join('?');
                  window.history.replaceState(null, null,
                      l.pathname.slice(0, -1) + decoded + l.hash
                  );
                }
              }(window.location))
            `}})]}),s.jsxs("body",{children:[e,s.jsx(d,{}),s.jsx(u,{})]})]})}const m=o(function(){return s.jsx(p,{})}),f=i(function({error:t}){let r="Oops!",n="An unexpected error occurred.",a;return h(t)&&(r=t.status===404?"404":"Error",n=t.status===404?"The requested page could not be found.":t.statusText||n),s.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[s.jsx("h1",{children:r}),s.jsx("p",{children:n}),a]})});export{f as ErrorBoundary,j as Layout,m as default};
