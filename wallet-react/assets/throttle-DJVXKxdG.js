import{aB as n}from"./index-DSIv8rOK.js";import{d as o}from"./debounce-DXROggiU.js";import{i as l}from"./isObject-CrIk3fyR.js";var f=o,g=l,c="Expected a function";function d(i,a,r){var t=!0,e=!0;if(typeof i!="function")throw new TypeError(c);return g(r)&&(t="leading"in r?!!r.leading:t,e="trailing"in r?!!r.trailing:e),f(i,a,{leading:t,maxWait:a,trailing:e})}var m=d;const b=n(m);export{b as B};