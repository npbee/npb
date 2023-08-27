var xr=Object.create;var yt=Object.defineProperty;var Fr=Object.getOwnPropertyDescriptor;var kr=Object.getOwnPropertyNames;var Cr=Object.getPrototypeOf,Ir=Object.prototype.hasOwnProperty;var h=(e,t)=>()=>(e&&(t=e(e=0)),t);var ue=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),f=(e,t)=>{for(var s in t)yt(e,s,{get:t[s],enumerable:!0})},Sr=(e,t,s,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of kr(t))!Ir.call(e,a)&&a!==s&&yt(e,a,{get:()=>t[a],enumerable:!(n=Fr(t,a))||n.enumerable});return e};var y=(e,t,s)=>(s=e!=null?xr(Cr(e)):{},Sr(t||!e||!e.__esModule?yt(s,"default",{value:e,enumerable:!0}):s,e));var ft=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)};var d=(e,t,s)=>(ft(e,t,"read from private field"),s?s.call(e):t.get(e)),B=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},G=(e,t,s,n)=>(ft(e,t,"write to private field"),n?n.call(e,s):t.set(e,s),s);var J=(e,t,s)=>(ft(e,t,"access private method"),s);var _=ue(gt=>{"use strict";gt.parse=Ar;gt.serialize=Tr;var Br=Object.prototype.toString,Ve=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function Ar(e,t){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var s={},n=t||{},a=n.decode||jr,o=0;o<e.length;){var i=e.indexOf("=",o);if(i===-1)break;var p=e.indexOf(";",o);if(p===-1)p=e.length;else if(p<i){o=e.lastIndexOf(";",i-1)+1;continue}var l=e.slice(o,i).trim();if(s[l]===void 0){var c=e.slice(i+1,p).trim();c.charCodeAt(0)===34&&(c=c.slice(1,-1)),s[l]=Pr(c,a)}o=p+1}return s}function Tr(e,t,s){var n=s||{},a=n.encode||Mr;if(typeof a!="function")throw new TypeError("option encode is invalid");if(!Ve.test(e))throw new TypeError("argument name is invalid");var o=a(t);if(o&&!Ve.test(o))throw new TypeError("argument val is invalid");var i=e+"="+o;if(n.maxAge!=null){var p=n.maxAge-0;if(isNaN(p)||!isFinite(p))throw new TypeError("option maxAge is invalid");i+="; Max-Age="+Math.floor(p)}if(n.domain){if(!Ve.test(n.domain))throw new TypeError("option domain is invalid");i+="; Domain="+n.domain}if(n.path){if(!Ve.test(n.path))throw new TypeError("option path is invalid");i+="; Path="+n.path}if(n.expires){var l=n.expires;if(!_r(l)||isNaN(l.valueOf()))throw new TypeError("option expires is invalid");i+="; Expires="+l.toUTCString()}if(n.httpOnly&&(i+="; HttpOnly"),n.secure&&(i+="; Secure"),n.priority){var c=typeof n.priority=="string"?n.priority.toLowerCase():n.priority;switch(c){case"low":i+="; Priority=Low";break;case"medium":i+="; Priority=Medium";break;case"high":i+="; Priority=High";break;default:throw new TypeError("option priority is invalid")}}if(n.sameSite){var r=typeof n.sameSite=="string"?n.sameSite.toLowerCase():n.sameSite;switch(r){case!0:i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"strict":i+="; SameSite=Strict";break;case"none":i+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return i}function jr(e){return e.indexOf("%")!==-1?decodeURIComponent(e):e}function Mr(e){return encodeURIComponent(e)}function _r(e){return Br.call(e)==="[object Date]"||e instanceof Date}function Pr(e,t){try{return t(e)}catch{return e}}});function I(e,t){let s=new RegExp(`\\x1b\\[${t}m`,"g"),n=`\x1B[${e}m`,a=`\x1B[${t}m`;return function(o){return!Rr.enabled||o==null?o:n+(~(""+o).indexOf(a)?o.replace(s,a+n):o)+a}}var Et,Fn,kn,Cn,In,Rr,Sn,Se,Bn,gm,Em,bm,wm,Dm,vm,An,xm,bt,Fm,km,Tn,Cm,Im,Sm,Bm,Am,Tm,jm,Mm,_m,Pm,Rm,P=h(()=>{In=!0;typeof process<"u"&&({FORCE_COLOR:Et,NODE_DISABLE_COLORS:Fn,NO_COLOR:kn,TERM:Cn}=process.env||{},In=process.stdout&&process.stdout.isTTY);Rr={enabled:!Fn&&kn==null&&Cn!=="dumb"&&(Et!=null&&Et!=="0"||In)};Sn=I(0,0),Se=I(1,22),Bn=I(2,22),gm=I(3,23),Em=I(4,24),bm=I(7,27),wm=I(8,28),Dm=I(9,29),vm=I(30,39),An=I(31,39),xm=I(32,39),bt=I(33,39),Fm=I(34,39),km=I(35,39),Tn=I(36,39),Cm=I(37,39),Im=I(90,39),Sm=I(90,39),Bm=I(40,49),Am=I(41,49),Tm=I(42,49),jm=I(43,49),Mm=I(44,49),_m=I(45,49),Pm=I(46,49),Rm=I(47,49)});function Lr(e){for(var t=[],s=0;s<e.length;){var n=e[s];if(n==="*"||n==="+"||n==="?"){t.push({type:"MODIFIER",index:s,value:e[s++]});continue}if(n==="\\"){t.push({type:"ESCAPED_CHAR",index:s++,value:e[s++]});continue}if(n==="{"){t.push({type:"OPEN",index:s,value:e[s++]});continue}if(n==="}"){t.push({type:"CLOSE",index:s,value:e[s++]});continue}if(n===":"){for(var a="",o=s+1;o<e.length;){var i=e.charCodeAt(o);if(i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122||i===95){a+=e[o++];continue}break}if(!a)throw new TypeError("Missing parameter name at ".concat(s));t.push({type:"NAME",index:s,value:a}),s=o;continue}if(n==="("){var p=1,l="",o=s+1;if(e[o]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(o));for(;o<e.length;){if(e[o]==="\\"){l+=e[o++]+e[o++];continue}if(e[o]===")"){if(p--,p===0){o++;break}}else if(e[o]==="("&&(p++,e[o+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(o));l+=e[o++]}if(p)throw new TypeError("Unbalanced pattern at ".concat(s));if(!l)throw new TypeError("Missing pattern at ".concat(s));t.push({type:"PATTERN",index:s,value:l}),s=o;continue}t.push({type:"CHAR",index:s,value:e[s++]})}return t.push({type:"END",index:s,value:""}),t}function Nr(e,t){t===void 0&&(t={});for(var s=Lr(e),n=t.prefixes,a=n===void 0?"./":n,o="[^".concat(Or(t.delimiter||"/#?"),"]+?"),i=[],p=0,l=0,c="",r=function(Q){if(l<s.length&&s[l].type===Q)return s[l++].value},u=function(Q){var te=r(Q);if(te!==void 0)return te;var Ye=s[l],g=Ye.type,k=Ye.index;throw new TypeError("Unexpected ".concat(g," at ").concat(k,", expected ").concat(Q))},m=function(){for(var Q="",te;te=r("CHAR")||r("ESCAPED_CHAR");)Q+=te;return Q};l<s.length;){var S=r("CHAR"),D=r("NAME"),C=r("PATTERN");if(D||C){var F=S||"";a.indexOf(F)===-1&&(c+=F,F=""),c&&(i.push(c),c=""),i.push({name:D||p++,prefix:F,suffix:"",pattern:C||o,modifier:r("MODIFIER")||""});continue}var U=S||r("ESCAPED_CHAR");if(U){c+=U;continue}c&&(i.push(c),c="");var z=r("OPEN");if(z){var F=m(),V=r("NAME")||"",w=r("PATTERN")||"",ee=m();u("CLOSE"),i.push({name:V||(w?p++:""),pattern:V&&!w?o:w,prefix:F,suffix:ee,modifier:r("MODIFIER")||""});continue}u("END")}return i}function jn(e,t){return Hr(Nr(e,t),t)}function Hr(e,t){t===void 0&&(t={});var s=$r(t),n=t.encode,a=n===void 0?function(l){return l}:n,o=t.validate,i=o===void 0?!0:o,p=e.map(function(l){if(typeof l=="object")return new RegExp("^(?:".concat(l.pattern,")$"),s)});return function(l){for(var c="",r=0;r<e.length;r++){var u=e[r];if(typeof u=="string"){c+=u;continue}var m=l?l[u.name]:void 0,S=u.modifier==="?"||u.modifier==="*",D=u.modifier==="*"||u.modifier==="+";if(Array.isArray(m)){if(!D)throw new TypeError('Expected "'.concat(u.name,'" to not repeat, but got an array'));if(m.length===0){if(S)continue;throw new TypeError('Expected "'.concat(u.name,'" to not be empty'))}for(var C=0;C<m.length;C++){var F=a(m[C],u);if(i&&!p[r].test(F))throw new TypeError('Expected all "'.concat(u.name,'" to match "').concat(u.pattern,'", but got "').concat(F,'"'));c+=u.prefix+F+u.suffix}continue}if(typeof m=="string"||typeof m=="number"){var F=a(String(m),u);if(i&&!p[r].test(F))throw new TypeError('Expected "'.concat(u.name,'" to match "').concat(u.pattern,'", but got "').concat(F,'"'));c+=u.prefix+F+u.suffix;continue}if(!S){var U=D?"an array":"a string";throw new TypeError('Expected "'.concat(u.name,'" to be ').concat(U))}}return c}}function Or(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function $r(e){return e&&e.sensitive?"":"i"}var Mn=h(()=>{});var Pn=ue((Hm,_n)=>{"use strict";function Ke(){this._types=Object.create(null),this._extensions=Object.create(null);for(let e=0;e<arguments.length;e++)this.define(arguments[e]);this.define=this.define.bind(this),this.getType=this.getType.bind(this),this.getExtension=this.getExtension.bind(this)}Ke.prototype.define=function(e,t){for(let s in e){let n=e[s].map(function(a){return a.toLowerCase()});s=s.toLowerCase();for(let a=0;a<n.length;a++){let o=n[a];if(o[0]!=="*"){if(!t&&o in this._types)throw new Error('Attempt to change mapping for "'+o+'" extension from "'+this._types[o]+'" to "'+s+'". Pass `force=true` to allow this, otherwise remove "'+o+'" from the list of extensions for "'+s+'".');this._types[o]=s}}if(t||!this._extensions[s]){let a=n[0];this._extensions[s]=a[0]!=="*"?a:a.substr(1)}}};Ke.prototype.getType=function(e){e=String(e);let t=e.replace(/^.*[/\\]/,"").toLowerCase(),s=t.replace(/^.*\./,"").toLowerCase(),n=t.length<e.length;return(s.length<t.length-1||!n)&&this._types[s]||null};Ke.prototype.getExtension=function(e){return e=/^\s*([^;\s]*)/.test(e)&&RegExp.$1,e&&this._extensions[e.toLowerCase()]||null};_n.exports=Ke});var Ln=ue((Om,Rn)=>{Rn.exports={"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["es","ecma"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/express":["exp"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/trig":["trig"],"application/ttml+xml":["ttml"],"application/ubjson":["ubj"],"application/urc-ressheet+xml":["rsheet"],"application/urc-targetdesc+xml":["td"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["*xsl","xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/amr":["amr"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx","opus"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/avif":["avif"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/ktx2":["ktx2"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/step+xml":["stpx"],"model/step+zip":["stpz"],"model/step-xml+zip":["stpxz"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/spdx":["spdx"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/iso.segment":["m4s"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]}});var Hn=ue(($m,Nn)=>{Nn.exports={"application/prs.cww":["cww"],"application/vnd.1000minds.decision-model+xml":["1km"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.keynote":["key"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.numbers":["numbers"],"application/vnd.apple.pages":["pages"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.balsamiq.bmml+xml":["bmml"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.citationstyles.style+xml":["csl"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dbf":["dbf"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mapbox-vector-tile":["mvt"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["*stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.ac+xml":["*ac"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openblox.game+xml":["obgx"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openstreetmap.data+xml":["osm"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.rar":["rar"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.software602.filler.form+xml":["fo"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.syncml.dmddf+xml":["ddf"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["*dmg"],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":["*bdoc"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["*deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["*iso"],"application/x-iwork-keynote-sffkey":["*key"],"application/x-iwork-numbers-sffnumbers":["*numbers"],"application/x-iwork-pages-sffpages":["*pages"],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-keepass2":["kdbx"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":["*exe"],"application/x-msdownload":["*exe","*dll","com","bat","*msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["*wmf","*wmz","*emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":["*prc","*pdb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["*rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["*obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["*xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":["*m4a"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":["*ra"],"audio/x-wav":["*wav"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"image/prs.btif":["btif"],"image/prs.pti":["pti"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.airzip.accelerator.azv":["azv"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["*sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.microsoft.icon":["ico"],"image/vnd.ms-dds":["dds"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.pco.b16":["b16"],"image/vnd.tencent.tap":["tap"],"image/vnd.valve.source.texture":["vtf"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/vnd.zbrush.pcx":["pcx"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["*ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":["*bmp"],"image/x-pcx":["*pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/vnd.wfa.wsc":["wsc"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.opengex":["ogex"],"model/vnd.parasolid.transmit.binary":["x_b"],"model/vnd.parasolid.transmit.text":["x_t"],"model/vnd.sap.vds":["vds"],"model/vnd.usdz+zip":["usdz"],"model/vnd.valve.source.compiled-map":["bsp"],"model/vnd.vtu":["vtu"],"text/prs.lines.tag":["dsc"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":["*org"],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]}});var R=ue((qm,On)=>{"use strict";var qr=Pn();On.exports=new qr(Ln(),Hn())});function wt({onlyFirst:e=!1}={}){let t=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(t,e?void 0:"g")}var $n=h(()=>{});var Wm,qn=h(()=>{$n();Wm=wt()});var zn=ue((Jm,Dt)=>{var ie={};typeof Dt>"u"?window.eastasianwidth=ie:Dt.exports=ie;ie.eastAsianWidth=function(e){var t=e.charCodeAt(0),s=e.length==2?e.charCodeAt(1):0,n=t;return 55296<=t&&t<=56319&&56320<=s&&s<=57343&&(t&=1023,s&=1023,n=t<<10|s,n+=65536),n==12288||65281<=n&&n<=65376||65504<=n&&n<=65510?"F":n==8361||65377<=n&&n<=65470||65474<=n&&n<=65479||65482<=n&&n<=65487||65490<=n&&n<=65495||65498<=n&&n<=65500||65512<=n&&n<=65518?"H":4352<=n&&n<=4447||4515<=n&&n<=4519||4602<=n&&n<=4607||9001<=n&&n<=9002||11904<=n&&n<=11929||11931<=n&&n<=12019||12032<=n&&n<=12245||12272<=n&&n<=12283||12289<=n&&n<=12350||12353<=n&&n<=12438||12441<=n&&n<=12543||12549<=n&&n<=12589||12593<=n&&n<=12686||12688<=n&&n<=12730||12736<=n&&n<=12771||12784<=n&&n<=12830||12832<=n&&n<=12871||12880<=n&&n<=13054||13056<=n&&n<=19903||19968<=n&&n<=42124||42128<=n&&n<=42182||43360<=n&&n<=43388||44032<=n&&n<=55203||55216<=n&&n<=55238||55243<=n&&n<=55291||63744<=n&&n<=64255||65040<=n&&n<=65049||65072<=n&&n<=65106||65108<=n&&n<=65126||65128<=n&&n<=65131||110592<=n&&n<=110593||127488<=n&&n<=127490||127504<=n&&n<=127546||127552<=n&&n<=127560||127568<=n&&n<=127569||131072<=n&&n<=194367||177984<=n&&n<=196605||196608<=n&&n<=262141?"W":32<=n&&n<=126||162<=n&&n<=163||165<=n&&n<=166||n==172||n==175||10214<=n&&n<=10221||10629<=n&&n<=10630?"Na":n==161||n==164||167<=n&&n<=168||n==170||173<=n&&n<=174||176<=n&&n<=180||182<=n&&n<=186||188<=n&&n<=191||n==198||n==208||215<=n&&n<=216||222<=n&&n<=225||n==230||232<=n&&n<=234||236<=n&&n<=237||n==240||242<=n&&n<=243||247<=n&&n<=250||n==252||n==254||n==257||n==273||n==275||n==283||294<=n&&n<=295||n==299||305<=n&&n<=307||n==312||319<=n&&n<=322||n==324||328<=n&&n<=331||n==333||338<=n&&n<=339||358<=n&&n<=359||n==363||n==462||n==464||n==466||n==468||n==470||n==472||n==474||n==476||n==593||n==609||n==708||n==711||713<=n&&n<=715||n==717||n==720||728<=n&&n<=731||n==733||n==735||768<=n&&n<=879||913<=n&&n<=929||931<=n&&n<=937||945<=n&&n<=961||963<=n&&n<=969||n==1025||1040<=n&&n<=1103||n==1105||n==8208||8211<=n&&n<=8214||8216<=n&&n<=8217||8220<=n&&n<=8221||8224<=n&&n<=8226||8228<=n&&n<=8231||n==8240||8242<=n&&n<=8243||n==8245||n==8251||n==8254||n==8308||n==8319||8321<=n&&n<=8324||n==8364||n==8451||n==8453||n==8457||n==8467||n==8470||8481<=n&&n<=8482||n==8486||n==8491||8531<=n&&n<=8532||8539<=n&&n<=8542||8544<=n&&n<=8555||8560<=n&&n<=8569||n==8585||8592<=n&&n<=8601||8632<=n&&n<=8633||n==8658||n==8660||n==8679||n==8704||8706<=n&&n<=8707||8711<=n&&n<=8712||n==8715||n==8719||n==8721||n==8725||n==8730||8733<=n&&n<=8736||n==8739||n==8741||8743<=n&&n<=8748||n==8750||8756<=n&&n<=8759||8764<=n&&n<=8765||n==8776||n==8780||n==8786||8800<=n&&n<=8801||8804<=n&&n<=8807||8810<=n&&n<=8811||8814<=n&&n<=8815||8834<=n&&n<=8835||8838<=n&&n<=8839||n==8853||n==8857||n==8869||n==8895||n==8978||9312<=n&&n<=9449||9451<=n&&n<=9547||9552<=n&&n<=9587||9600<=n&&n<=9615||9618<=n&&n<=9621||9632<=n&&n<=9633||9635<=n&&n<=9641||9650<=n&&n<=9651||9654<=n&&n<=9655||9660<=n&&n<=9661||9664<=n&&n<=9665||9670<=n&&n<=9672||n==9675||9678<=n&&n<=9681||9698<=n&&n<=9701||n==9711||9733<=n&&n<=9734||n==9737||9742<=n&&n<=9743||9748<=n&&n<=9749||n==9756||n==9758||n==9792||n==9794||9824<=n&&n<=9825||9827<=n&&n<=9829||9831<=n&&n<=9834||9836<=n&&n<=9837||n==9839||9886<=n&&n<=9887||9918<=n&&n<=9919||9924<=n&&n<=9933||9935<=n&&n<=9953||n==9955||9960<=n&&n<=9983||n==10045||n==10071||10102<=n&&n<=10111||11093<=n&&n<=11097||12872<=n&&n<=12879||57344<=n&&n<=63743||65024<=n&&n<=65039||n==65533||127232<=n&&n<=127242||127248<=n&&n<=127277||127280<=n&&n<=127337||127344<=n&&n<=127386||917760<=n&&n<=917999||983040<=n&&n<=1048573||1048576<=n&&n<=1114109?"A":"N"};ie.characterLength=function(e){var t=this.eastAsianWidth(e);return t=="F"||t=="W"||t=="A"?2:1};function Un(e){return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)||[]}ie.length=function(e){for(var t=Un(e),s=0,n=0;n<t.length;n++)s=s+this.characterLength(t[n]);return s};ie.slice=function(e,t,s){textLen=ie.length(e),t=t||0,s=s||1,t<0&&(t=textLen+t),s<0&&(s=textLen+s);for(var n="",a=0,o=Un(e),i=0;i<o.length;i++){var p=o[i],l=ie.length(p);if(a>=t-(l==2?1:0))if(a+l<=s)n+=p;else break;a+=l}return n}});var Gn=ue((Ym,Wn)=>{"use strict";Wn.exports=function(){return/\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g}});var Ur,zr,L=h(()=>{qn();Ur=y(zn(),1),zr=y(Gn(),1)});var Wr,Gr,Jr,Yr,Jn,N=h(()=>{({replace:Wr}=""),Gr=/[&<>'"]/g,Jr={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},Yr=e=>Jr[e],Jn=e=>Wr.call(e,Gr,Yr)});function el(e){return e.replace(/\r\n|\r(?!\n)|\n/g,`
`)}function tl(e,t){if(!t||t.line===void 0||t.column===void 0)return"";let s=el(e).split(`
`).map(i=>i.replace(/\t/g,"  ")),n=[];for(let i=-2;i<=2;i++)s[t.line+i]&&n.push(t.line+i);let a=0;for(let i of n){let p=`> ${i}`;p.length>a&&(a=p.length)}let o="";for(let i of n){let p=i===t.line-1;o+=p?"> ":"  ",o+=`${i+1} | ${s[i]}
`,p&&(o+=`${Array.from({length:a}).join(" ")}  | ${Array.from({length:t.column}).join(" ")}^
`)}return o}function nl(e){return!(e.length!==3||!e[0]||typeof e[0]!="object")}function _s(e,t,s){var n;let a=((n=t?.split("/").pop())==null?void 0:n.replace(".astro",""))??"",o=(...i)=>{if(!nl(i))throw new E({...es,message:es.message(a)});return e(...i)};return Object.defineProperty(o,"name",{value:a,writable:!1}),o.isAstroComponentFactory=!0,o.moduleId=t,o.propagation=s,o}function sl(e){return _s(e.factory,e.moduleId,e.propagation)}function O(e,t,s){return typeof e=="function"?_s(e,t,s):sl(e)}function al(){return t=>{if(typeof t=="string")throw new E({...ns,message:ns.message(JSON.stringify(t))});let s=[...Object.values(t)];if(s.length===0)throw new E({...ss,message:ss.message(JSON.stringify(t))});return Promise.all(s.map(n=>n()))}}function q(e){return{site:e?new URL(e):void 0,generator:`Astro v${Ps}`,glob:al()}}function ol(e,t){if(e[t])return e[t];if(t==="delete"&&e.del)return e.del;if(e.all)return e.all}async function os(e,t,s){var n;let{request:a,params:o}=t,i=(n=a.method)==null?void 0:n.toLowerCase(),p=ol(e,i);if(!s&&s===!1&&i&&i!=="get"&&console.warn(`
${i} requests are not available when building a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` with an \`export const prerender = false\` to handle ${i} requests.`),!p||typeof p!="function")return new Response(null,{status:404,headers:{"X-Astro-Response":"Not-Found"}});p.length>1&&console.warn(`
API routes with 2 arguments have been deprecated. Instead they take a single argument in the form of:

export function get({ params, request }) {
	//...
}

Update your code to remove this warning.`);let l=new Proxy(t,{get(c,r){return r in c?Reflect.get(c,r):r in o?(console.warn(`
API routes no longer pass params as the first argument. Instead an object containing a params property is provided in the form of:

export function get({ params }) {
	// ...
}

Update your code to remove this warning.`),Reflect.get(o,r)):void 0}});return p.call(e,l,a)}function Rs(e){let t={};return s(e),Object.keys(t).join(" ");function s(n){n&&typeof n.forEach=="function"?n.forEach(s):n===Object(n)?Object.keys(n).forEach(a=>{n[a]&&s(a)}):(n=n===!1||n==null?"":String(n).trim(),n&&n.split(/\s+/).forEach(a=>{t[a]=!0}))}}function en(e){return!!e&&typeof e=="object"&&typeof e.then=="function"}async function*Pt(e){let t=e.getReader();try{for(;;){let{done:s,value:n}=await t.read();if(s)return;yield n}}finally{t.releaseLock()}}function il(e){return Object.prototype.toString.call(e)==="[object HTMLString]"}function rl(e){return new Ze(e)}function Ls(e){return typeof e.getReader=="function"}async function*is(e){if(Ls(e))for await(let t of Pt(e))yield Pe(t);else for await(let t of e)yield Pe(t)}function*ll(e){for(let t of e)yield Pe(t)}function Pe(e){if(e&&typeof e=="object"){if(e instanceof Uint8Array)return rl(e);if(e instanceof Response&&e.body){let t=e.body;return is(t)}else{if(typeof e.then=="function")return Promise.resolve(e).then(t=>Pe(t));if(Symbol.iterator in e)return ll(e);if(Symbol.asyncIterator in e||Ls(e))return is(e)}}return v(e)}function Hs(e){return Object.defineProperty(e,Ns,{value:!0})}function pl(e){return e&&typeof e=="object"&&e[Ns]}function It(e,t={},s=new WeakSet){if(s.has(e))throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);s.add(e);let n=e.map(a=>$s(a,t,s));return s.delete(e),n}function Os(e,t={},s=new WeakSet){if(s.has(e))throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);s.add(e);let n=Object.fromEntries(Object.entries(e).map(([a,o])=>[a,$s(o,t,s)]));return s.delete(e),n}function $s(e,t={},s=new WeakSet){switch(Object.prototype.toString.call(e)){case"[object Date]":return[K.Date,e.toISOString()];case"[object RegExp]":return[K.RegExp,e.source];case"[object Map]":return[K.Map,It(Array.from(e),t,s)];case"[object Set]":return[K.Set,It(Array.from(e),t,s)];case"[object BigInt]":return[K.BigInt,e.toString()];case"[object URL]":return[K.URL,e.toString()];case"[object Array]":return[K.JSON,It(e,t,s)];case"[object Uint8Array]":return[K.Uint8Array,Array.from(e)];case"[object Uint16Array]":return[K.Uint16Array,Array.from(e)];case"[object Uint32Array]":return[K.Uint32Array,Array.from(e)];default:return e!==null&&typeof e=="object"?[K.Value,Os(e,t,s)]:e===void 0?[K.Value]:[K.Value,e]}}function qs(e,t){return JSON.stringify(Os(e,t))}function ul(e,t){let s={isPage:!1,hydration:null,props:{}};for(let[n,a]of Object.entries(e))if(n.startsWith("server:")&&n==="server:root"&&(s.isPage=!0),n.startsWith("client:"))switch(s.hydration||(s.hydration={directive:"",value:"",componentUrl:"",componentExport:{value:""}}),n){case"client:component-path":{s.hydration.componentUrl=a;break}case"client:component-export":{s.hydration.componentExport.value=a;break}case"client:component-hydration":break;case"client:display-name":break;default:{if(s.hydration.directive=n.split(":")[1],s.hydration.value=a,!t.has(s.hydration.directive)){let o=Array.from(t.keys()).map(i=>`client:${i}`).join(", ");throw new Error(`Error: invalid hydration directive "${n}". Supported hydration methods: ${o}`)}if(s.hydration.directive==="media"&&typeof s.hydration.value!="string")throw new E(Vr);break}}else n==="class:list"?a&&(s.props[n.slice(0,-5)]=Rs(a)):s.props[n]=a;for(let n of Object.getOwnPropertySymbols(e))s.props[n]=e[n];return s}async function dl(e,t){let{renderer:s,result:n,astroId:a,props:o,attrs:i}=e,{hydrate:p,componentUrl:l,componentExport:c}=t;if(!c.value)throw new Error(`Unable to resolve a valid export for "${t.displayName}"! Please open an issue at https://astro.build/issues!`);let r={children:"",props:{uid:a}};if(i)for(let[m,S]of Object.entries(i))r.props[m]=Ae(S);r.props["component-url"]=await n.resolve(decodeURI(l)),s.clientEntrypoint&&(r.props["component-export"]=c.value,r.props["renderer-url"]=await n.resolve(decodeURI(s.clientEntrypoint)),r.props.props=Ae(qs(o,t))),r.props.ssr="",r.props.client=p;let u=await n.resolve("astro:scripts/before-hydration.js");return u.length&&(r.props["before-hydration-url"]=u),r.props.opts=Ae(JSON.stringify({name:t.displayName,value:t.hydrateArgs||""})),cl.forEach(m=>{o[m]&&(r.props[m]=o[m])}),r}function hl(e){let t=0;if(e.length===0)return t;for(let s=0;s<e.length;s++){let n=e.charCodeAt(s);t=(t<<5)-t+n,t=t&t}return t}function ml(e){let t,s="",n=hl(e),a=n<0?"Z":"";for(n=Math.abs(n);n>=St;)t=n%St,n=Math.floor(n/St),s=Rt[t]+s;return n>0&&(s=Rt[n]+s),a+s}function Us(e){return e==null?!1:e.isAstroComponentFactory===!0}function yl(e,t){let s=t.propagation||"none";return t.moduleId&&e.componentMetadata.has(t.moduleId)&&s==="none"&&(s=e.componentMetadata.get(t.moduleId).propagation),s==="in-tree"||s==="self"}function tn(e){return typeof e=="object"&&!!e[zs]}function fl(e,t){return{[zs]:!0,head:e,content:t}}function bl(e){return e._metadata.hasHydrationScript?!1:e._metadata.hasHydrationScript=!0}function wl(e,t){return e._metadata.hasDirectives.has(t)?!1:(e._metadata.hasDirectives.add(t),!0)}function rs(e,t){let n=e.clientDirectives.get(t);if(!n)throw new Error(`Unknown directive: ${t}`);return n}function Dl(e,t,s){switch(t){case"both":return`${El}<script>${rs(e,s)};${gl}<\/script>`;case"directive":return`<script>${rs(e,s)}<\/script>`}return""}function Il(e){var t;let s="";for(let[n,a]of Object.entries(e))s+=`const ${Cl(n)} = ${(t=JSON.stringify(a))==null?void 0:t.replace(/<\/script>/g,"\\x3C/script>")};
`;return v(s)}function ps(e){return e.length===1?e[0]:`${e.slice(0,-1).join(", ")} or ${e[e.length-1]}`}function Y(e,t,s=!0){if(e==null)return"";if(e===!1)return xl.test(t)||Fl.test(t)?v(` ${t}="false"`):"";if(kl.has(t))return console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`),"";if(t==="class:list"){let n=we(Rs(e),s);return n===""?"":v(` ${t.slice(0,-5)}="${n}"`)}if(t==="style"&&!(e instanceof me)){if(Array.isArray(e)&&e.length===2)return v(` ${t}="${we(`${ls(e[0])};${e[1]}`,s)}"`);if(typeof e=="object")return v(` ${t}="${we(ls(e),s)}"`)}return t==="className"?v(` class="${we(e,s)}"`):e===!0&&(t.startsWith("data-")||vl.test(t))?v(` ${t}`):v(` ${t}="${we(e,s)}"`)}function Lt(e,t=!0){let s="";for(let[n,a]of Object.entries(e))s+=Y(a,n,t);return v(s)}function le(e,{props:t,children:s=""},n=!0){let{lang:a,"data-astro-id":o,"define:vars":i,...p}=t;return i&&(e==="style"&&(delete p["is:global"],delete p["is:scoped"]),e==="script"&&(delete p.hoist,s=Il(i)+`
`+s)),(s==null||s=="")&&nn.test(e)?`<${e}${Lt(p,n)} />`:`<${e}${Lt(p,n)}>${s}</${e}>`}function Ws(e){let t=[],s={write:a=>t.push(a)},n=e(s);return{async renderToFinalDestination(a){for(let o of t)a.write(o);s.write=o=>a.write(o),await n}}}function cs(e){e._metadata.hasRenderedHead=!0;let t=Array.from(e.styles).filter(At).map(o=>o.props.rel==="stylesheet"?le("link",o):le("style",o));e.styles.clear();let s=Array.from(e.scripts).filter(At).map(o=>le("script",o,!1)),a=Array.from(e.links).filter(At).map(o=>le("link",o,!1)).join(`
`)+t.join(`
`)+s.join(`
`);if(e._metadata.extraHead.length>0)for(let o of e._metadata.extraHead)a+=o;return v(a)}function*$(){yield Hs({type:"maybe-head"})}function Sl(e){return!!e[Gs]}function ge(e,t,s){return!t&&s?ge(e,s):{async render(n){await De(n,typeof t=="function"?t(e):t)}}}async function Ce(e,t,s){let n="",a=null,o={write(p){p instanceof Response||(typeof p=="object"&&"type"in p&&typeof p.type=="string"?(a===null&&(a=[]),a.push(p)):n+=ye(e,p))}};return await ge(e,t,s).render(o),v(new et(n,a))}async function Js(e,t={}){let s=null,n={};return t&&await Promise.all(Object.entries(t).map(([a,o])=>Ce(e,o).then(i=>{i.instructions&&(s===null&&(s=[]),s.push(...i.instructions)),n[a]=i}))),{slotInstructions:s,children:n}}function sn(e,t){if(pl(t)){let s=t;switch(s.type){case"directive":{let{hydration:n}=s,a=n&&bl(e),o=n&&wl(e,n.directive),i=a?"both":o?"directive":null;if(i){let p=Dl(e,i,n.directive);return v(p)}else return""}case"head":return e._metadata.hasRenderedHead?"":cs(e);case"maybe-head":return e._metadata.hasRenderedHead||e._metadata.headInTree?"":cs(e);default:throw new Error(`Unknown chunk type: ${t.type}`)}}else{if(t instanceof Response)return"";if(Sl(t)){let s="",n=t;if(n.instructions)for(let a of n.instructions)s+=sn(e,a);return s+=t.toString(),s}}return t.toString()}function ye(e,t){return ArrayBuffer.isView(t)?Bl.decode(t):sn(e,t)}function Al(e,t){if(ArrayBuffer.isView(t))return t;{let s=sn(e,t);return tt.encode(s.toString())}}function Tl(e){return!!e&&typeof e=="object"&&"render"in e&&typeof e.render=="function"}async function De(e,t){if(t=await t,t instanceof et)e.write(t);else if(il(t))e.write(t);else if(Array.isArray(t)){let s=t.map(n=>Ws(a=>De(a,n)));for(let n of s)await n.renderToFinalDestination(e)}else if(typeof t=="function")await De(e,t());else if(typeof t=="string")e.write(v(Ae(t)));else if(!(!t&&t!==0))if(Tl(t))await t.render(e);else if(Qs(t))await t.render(e);else if(_l(t))await t.render(e);else if(ArrayBuffer.isView(t))e.write(t);else if(typeof t=="object"&&(Symbol.asyncIterator in t||Symbol.iterator in t))for await(let s of t)await De(e,s);else e.write(t)}function jl(e,t){if(e!=null)for(let s of Object.keys(e))s.startsWith("client:")&&console.warn(`You are attempting to render <${t} ${s} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`)}function Ml(e,t,s,n,a={}){jl(n,t);let o=new Ht(e,n,a,s);return yl(e,s)&&!e._metadata.propagators.has(s)&&e._metadata.propagators.set(s,o),o}function _l(e){return typeof e=="object"&&!!e[Vs]}function Qs(e){return typeof e=="object"&&!!e[Xs]}function b(e,...t){return new Ot(e,t)}async function Zs(e,t,s,n,a=!1,o){let i=await ea(e,t,s,n,o);if(i instanceof Response)return i;let p="",l=!1,c={write(r){if(a&&!l&&(l=!0,!/<!doctype html/i.test(String(r)))){let u=e.compressHTML?"<!DOCTYPE html>":`<!DOCTYPE html>
`;p+=u}r instanceof Response||(p+=ye(e,r))}};return await i.render(c),p}async function Pl(e,t,s,n,a=!1,o){let i=await ea(e,t,s,n,o);if(i instanceof Response)return i;let p=!1;return a&&await Rl(e),new ReadableStream({start(l){let c={write(r){if(a&&!p&&(p=!0,!/<!doctype html/i.test(String(r)))){let m=e.compressHTML?"<!DOCTYPE html>":`<!DOCTYPE html>
`;l.enqueue(tt.encode(m))}if(r instanceof Response)throw new E({...Zt});let u=Al(e,r);l.enqueue(u)}};(async()=>{try{await i.render(c),l.close()}catch(r){E.is(r)&&!r.loc&&r.setLocation({file:o?.component}),setTimeout(()=>l.error(r),0)}})()}})}async function ea(e,t,s,n,a){let o=await t(e,s,n);if(o instanceof Response)return o;if(!Qs(o))throw new E({...Yn,message:Yn.message(a?.route,typeof o),location:{file:a?.component}});return tn(o)?o.content:o}async function Rl(e){let t=e._metadata.propagators.values();for(;;){let{value:s,done:n}=t.next();if(n)break;let a=await s.init(e);tn(a)&&e._metadata.extraHead.push(a.head)}}function Ll(e){return typeof HTMLElement<"u"&&HTMLElement.isPrototypeOf(e)}async function Nl(e,t,s,n){let a=Hl(t),o="";for(let i in s)o+=` ${i}="${we(await s[i])}"`;return v(`<${a}${o}>${await Ce(e,n?.default)}</${a}>`)}function Hl(e){let t=customElements.getName(e);return t||e.name.replace(/^HTML|Element$/g,"").replace(/[A-Z]/g,"-$&").toLowerCase().replace(/^-/,"html-")}function $l(e){switch(e?.split(".").pop()){case"svelte":return["@astrojs/svelte"];case"vue":return["@astrojs/vue"];case"jsx":case"tsx":return["@astrojs/react","@astrojs/preact","@astrojs/solid-js","@astrojs/vue (jsx)"];default:return["@astrojs/react","@astrojs/preact","@astrojs/solid-js","@astrojs/vue","@astrojs/svelte","@astrojs/lit"]}}function ql(e){return e===A}function Ul(e){return e&&e["astro:html"]===!0}function Gl(e,t){let s=t?Wl:zl;return e.replace(s,"")}async function Jl(e,t,s,n,a={}){var o,i,p;if(!s&&!n["client:only"])throw new Error(`Unable to render ${t} because it is ${s}!
Did you forget to import the component or is it possible there is a typo?`);let{renderers:l,clientDirectives:c}=e,r={astroStaticSlot:!0,displayName:t},{hydration:u,isPage:m,props:S}=ul(n,c),D="",C;u&&(r.hydrate=u.directive,r.hydrateArgs=u.value,r.componentExport=u.componentExport,r.componentUrl=u.componentUrl);let F=$l(r.componentUrl),U=l.filter(g=>g.name!=="astro:jsx"),{children:z,slotInstructions:V}=await Js(e,a),w;if(r.hydrate!=="only"){let g=!1;try{g=s&&s[Nt]}catch{}if(g){let k=s[Nt];w=l.find(({name:W})=>W===k)}if(!w){let k;for(let W of l)try{if(await W.ssr.check.call({result:e},s,S,z)){w=W;break}}catch(mt){k??(k=mt)}if(!w&&k)throw k}if(!w&&typeof HTMLElement=="function"&&Ll(s)){let k=await Nl(e,s,n,a);return{render(W){W.write(k)}}}}else{if(r.hydrateArgs){let g=r.hydrateArgs,k=us.has(g)?us.get(g):g;w=l.find(({name:W})=>W===`@astrojs/${k}`||W===k)}if(!w&&U.length===1&&(w=U[0]),!w){let g=(o=r.componentUrl)==null?void 0:o.split(".").pop();w=l.filter(({name:k})=>k===`@astrojs/${g}`||k===g)[0]}}if(w)r.hydrate==="only"?D=await Ce(e,a?.fallback):{html:D,attrs:C}=await w.ssr.renderToStaticMarkup.call({result:e},s,S,z,r);else{if(r.hydrate==="only")throw new E({...Ft,message:Ft.message(r.displayName),hint:Ft.hint(F.map(g=>g.replace("@astrojs/","")).join("|"))});if(typeof s!="string"){let g=U.filter(W=>F.includes(W.name)),k=U.length>1;if(g.length===0)throw new E({...xt,message:xt.message(r.displayName,(i=r?.componentUrl)==null?void 0:i.split(".").pop(),k,U.length),hint:xt.hint(ps(F.map(W=>"`"+W+"`")))});if(g.length===1)w=g[0],{html:D,attrs:C}=await w.ssr.renderToStaticMarkup.call({result:e},s,S,z,r);else throw new Error(`Unable to render ${r.displayName}!

This component likely uses ${ps(F)},
but Astro encountered an error during server-side rendering.

Please ensure that ${r.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`)}}if(w&&!w.clientEntrypoint&&w.name!=="@astrojs/lit"&&r.hydrate)throw new E({...Vn,message:Vn.message(t,r.hydrate,w.name)});if(!D&&typeof s=="string"){let g=Yl(s),k=Object.values(z).join(""),W=b`<${g}${Lt(S)}${v(k===""&&nn.test(g)?"/>":`>${k}</${g}>`)}`;D="";let mt={write(xn){xn instanceof Response||(D+=ye(e,xn))}};await W.render(mt)}if(!u)return{render(g){var k;if(V)for(let W of V)g.write(W);m||w?.name==="astro:jsx"?g.write(D):D&&D.length>0&&g.write(v(Gl(D,((k=w?.ssr)==null?void 0:k.supportsAstroStaticSlot)??!1)))}};let ee=ml(`<!--${r.componentExport.value}:${r.componentUrl}-->
${D}
${qs(S,r)}`),Q=await dl({renderer:w,result:e,astroId:ee,props:S,attrs:C},r),te=[];if(D){if(Object.keys(z).length>0)for(let g of Object.keys(z)){let k=(p=w?.ssr)!=null&&p.supportsAstroStaticSlot?r.hydrate?"astro-slot":"astro-static-slot":"astro-slot",W=g==="default"?`<${k}>`:`<${k} name="${g}">`;D.includes(W)||te.push(g)}}else te=Object.keys(z);let Ye=te.length>0?te.map(g=>`<template data-astro-template${g!=="default"?`="${g}"`:""}>${z[g]}</template>`).join(""):"";return Q.children=`${D??""}${Ye}`,Q.children&&(Q.props["await-children"]=""),{render(g){if(V)for(let k of V)g.write(k);g.write(Hs({type:"directive",hydration:u})),g.write(v(le("astro-island",Q,!1)))}}}function Yl(e){let t=/[&<>'"\s]+/g;return t.test(e)?e.trim().split(t)[0].trim():e}async function Vl(e,t={}){let s=await Ce(e,t?.default);return{render(n){s!=null&&n.write(s)}}}async function Kl(e,t,s,n={}){let{slotInstructions:a,children:o}=await Js(e,n),i=t({slots:o}),p=a?a.map(l=>ye(e,l)).join(""):"";return{render(l){l.write(v(p+i))}}}function Xl(e,t,s,n,a={}){let o=Ml(e,t,s,n,a);return{async render(i){await o.render(i)}}}async function x(e,t,s,n,a={}){return en(s)&&(s=await s),ql(s)?await Vl(e,a):Ul(s)?await Kl(e,s,n,a):Us(s)?Xl(e,t,s,n,a):await Jl(e,t,s,n,a)}async function $t(e,t,s,n,a={},o=!1,i){let p="",l=!1,c="";if(Ql(s))for(let r of $())c+=ye(e,r);try{let r={write(m){if(o&&!l&&(l=!0,!/<!doctype html/i.test(String(m)))){let S=e.compressHTML?"<!DOCTYPE html>":`<!DOCTYPE html>
`;p+=S+c}m instanceof Response||(p+=ye(e,m))}};await(await x(e,t,s,n,a)).render(r)}catch(r){throw E.is(r)&&!r.loc&&r.setLocation({file:i?.component}),r}return p}function Ql(e){return!!e?.[Ol]}async function ce(e,t){switch(!0){case t instanceof me:return t.toString().trim()===""?"":t;case typeof t=="string":return v(Ae(t));case typeof t=="function":return t;case(!t&&t!==0):return"";case Array.isArray(t):return v((await Promise.all(t.map(n=>ce(e,n)))).join(""))}let s;return t.props?t.props[pe.symbol]?s=t.props[pe.symbol]:s=new pe(t):s=new pe(t),Ut(e,t,s)}async function Ut(e,t,s){if(je(t)){switch(!0){case!t.type:throw new Error(`Unable to render ${e.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);case t.type===Symbol.for("astro:fragment"):return ce(e,t.props.children);case t.type.isAstroComponentFactory:{let n={},a={};for(let[p,l]of Object.entries(t.props??{}))p==="children"||l&&typeof l=="object"&&l.$$slot?a[p==="children"?"default":p]=()=>ce(e,l):n[p]=l;let o=await Zs(e,t.type,n,a);if(o instanceof Response)throw o;return v(o)}case(!t.type&&t.type!==0):return"";case(typeof t.type=="string"&&t.type!==ds):return v(await Zl(e,t.type,t.props??{}))}if(t.type){let n=function(r){if(Array.isArray(r))return r.map(u=>n(u));if(!je(r)){i.default.push(r);return}if("slot"in r.props){i[r.props.slot]=[...i[r.props.slot]??[],r],delete r.props.slot;return}i.default.push(r)};if(typeof t.type=="function"&&t.type["astro:renderer"]&&s.increment(),typeof t.type=="function"&&t.props["server:root"]){let r=await t.type(t.props??{});return await ce(e,r)}if(typeof t.type=="function")if(s.haveNoTried()||s.isCompleted()){tp();try{let r=await t.type(t.props??{}),u;if(r?.[ct])return u=await Ut(e,r,s),u;if(!r)return u=await Ut(e,r,s),u}catch(r){if(s.isCompleted())throw r;s.increment()}finally{np()}}else s.increment();let{children:a=null,...o}=t.props??{},i={default:[]};n(a);for(let[r,u]of Object.entries(o))u.$$slot&&(i[r]=u,delete o[r]);let p=[],l={};for(let[r,u]of Object.entries(i))p.push(ce(e,u).then(m=>{m.toString().trim().length!==0&&(l[r]=()=>m)}));await Promise.all(p),o[pe.symbol]=s;let c;return t.type===ds&&t.props["client:only"]?c=await $t(e,t.props["client:display-name"]??"",null,o,l):c=await $t(e,typeof t.type=="function"?t.type.name:t.type,t.type,o,l),v(c)}}return v(`${t}`)}async function Zl(e,t,{children:s,...n}){return v(`<${t}${T(n)}${v((s==null||s=="")&&nn.test(t)?"/>":`>${s==null?"":await ce(e,ep(t,s))}</${t}>`)}`)}function ep(e,t){return typeof t=="string"&&(e==="style"||e==="script")?v(t):t}function tp(){if(an++,!qt){qt=console.error;try{console.error=sp}catch{}}}function np(){an--}function sp(e,...t){an>0&&typeof e=="string"&&e.includes("Warning: Invalid hook call.")&&e.includes("https://reactjs.org/link/invalid-hook-call")||qt(e,...t)}function ap(){var e,t,s;return Te=(s=class extends Response{constructor(a,o){let i=a instanceof ReadableStream;super(i?null:a,o);B(this,e,void 0);B(this,t,void 0);G(this,e,i),G(this,t,a)}get body(){return d(this,t)}async text(){if(d(this,e)&&zt){let a=new TextDecoder,o=d(this,t),i="";for await(let p of Pt(o))i+=a.decode(p);return i}return super.text()}async arrayBuffer(){if(d(this,e)&&zt){let a=d(this,t),o=[],i=0;for await(let c of Pt(a))o.push(c),i+=c.length;let p=new Uint8Array(i),l=0;for(let c of o)p.set(c,l),l+=c.length;return p}return super.arrayBuffer()}clone(){return new Te(d(this,t),{status:this.status,statusText:this.statusText,headers:this.headers})}},e=new WeakMap,t=new WeakMap,s),Te}async function ip(e,t,s,n,a,o){var i,p;if(!Us(t)){e._metadata.headInTree=((i=e.componentMetadata.get(t.moduleId))==null?void 0:i.containsHead)??!1;let m={...s??{},"server:root":!0},S=await $t(e,t.name,t,m,null,!0,o),D=tt.encode(S);return new Response(D,{headers:new Headers([["Content-Type","text/html; charset=utf-8"],["Content-Length",D.byteLength.toString()]])})}e._metadata.headInTree=((p=e.componentMetadata.get(t.moduleId))==null?void 0:p.containsHead)??!1;let l;if(a?l=await Pl(e,t,s,n,!0,o):l=await Zs(e,t,s,n,!0,o),l instanceof Response)return l;let c=e.response,r=new Headers(c.headers);return!a&&typeof l=="string"&&(l=tt.encode(l),r.set("Content-Length",l.byteLength.toString())),op(l,{...c,headers:r})}function rp({props:e,children:t}){return le("script",{props:e,children:t})}function hs(e,t){if(t.type==="external")return Array.from(e.styles).some(s=>s.props.href===t.src)?"":le("link",{props:{rel:"stylesheet",href:t.src},children:""});if(t.type==="inline")return Array.from(e.styles).some(s=>s.children.includes(t.content))?"":le("style",{props:{type:"text/css"},children:t.content})}function T(e={},t,{class:s}={}){let n="";s&&(typeof e.class<"u"?e.class+=` ${s}`:typeof e["class:list"]<"u"?e["class:list"]=[e["class:list"],s]:e.class=s);for(let[a,o]of Object.entries(e))n+=Y(o,a,!0);return v(n)}function je(e){return e&&typeof e=="object"&&e[ct]}function lp(e){if(typeof e.type=="string")return e;let t={};if(je(e.props.children)){let s=e.props.children;if(!je(s)||!("slot"in s.props))return;let n=ys(s.props.slot);t[n]=[s],t[n].$$slot=!0,delete s.props.slot,delete e.props.children}Array.isArray(e.props.children)&&(e.props.children=e.props.children.map(s=>{if(!je(s)||!("slot"in s.props))return s;let n=ys(s.props.slot);return Array.isArray(t[n])?t[n].push(s):(t[n]=[s],t[n].$$slot=!0),delete s.props.slot,ms}).filter(s=>s!==ms)),Object.assign(e.props,t)}function ta(e){return typeof e=="string"?v(e):Array.isArray(e)?e.map(t=>ta(t)):e}function pp(e){if("set:html"in e.props||"set:text"in e.props){if("set:html"in e.props){let t=ta(e.props["set:html"]);delete e.props["set:html"],Object.assign(e.props,{children:t});return}if("set:text"in e.props){let t=e.props["set:text"];delete e.props["set:text"],Object.assign(e.props,{children:t});return}}}function j(e,t){let s={[Nt]:"astro:jsx",[ct]:!0,type:e,props:t??{}};return pp(s),lp(s),s}async function cp(e,t,{default:s=null,...n}={}){if(typeof e!="function")return!1;let a={};for(let[o,i]of Object.entries(n)){let p=na(o);a[p]=i}try{return(await e({...t,...a,children:s}))[ct]}catch(o){let i=o;if(e[Symbol.for("mdx-component")])throw dp({message:i.message,title:i.name,hint:"This issue often occurs when your MDX component encounters runtime errors.",name:i.name,stack:i.stack})}return!1}async function up(e,t={},{default:s=null,...n}={}){let a={};for(let[p,l]of Object.entries(n)){let c=na(p);a[c]=l}let{result:o}=this;return{html:await ce(o,j(e,{...t,...a,children:s}))}}function dp({message:e,name:t,stack:s,hint:n}){let a=new Error(e);return a.name=t,a.stack=s,a.hint=n,a}function on(e,t){Reflect.set(e,oa,t)}function yp(e){let t=Reflect.get(e,oa);if(t!=null)return t}function*fp(e){let t=yp(e);if(!t)return[];for(let s of t.headers())yield s;return[]}function ia(e,t,s,n){let a=e.level,o=e.dest,i={type:s,level:t,message:n};st[a]>st[t]||o.write(i)}function fe(e,t,s){return ia(e,"warn",t,s)}function Ep(e,t,s){return ia(e,"error",t,s)}function bp(...e){"_astroGlobalDebug"in globalThis&&globalThis._astroGlobalDebug(...e)}function at(e){return e[0]==="/"?e:"/"+e}function Es(e){return e.replace(/(?<!:)\/\/+/g,"/")}function Jt(e){return e.endsWith("/")?e.slice(0,e.length-1):e}function Dp(e){return e.startsWith("/")?e.substring(1):e}function vp(e){return e.replace(/^\/|\/$/g,"")}function xp(e){return typeof e=="string"||e instanceof String}function bs(...e){return e.filter(xp).map((t,s)=>s===0?Jt(t):s===e.length-1?Dp(t):vp(t)).join("/")}function ws(e){return e.replace(/\\/g,"/")}function Cp(e){return e?.type==="redirect"}function Ip(e,t){let s=e.redirectRoute,n=e.redirect;return typeof s<"u"?s?.generate(t)||s?.pathname||"/":typeof n=="string"?n:typeof n>"u"?"/":n.destination}function Sp(e,t="GET"){let s=e.redirectRoute;return typeof s?.redirect=="object"?s.redirect.status:t!=="GET"?308:301}async function ra(e,t,s,n){let a=!1,o,p=t(s,async()=>(a=!0,o=n(),o));return await Promise.resolve(p).then(async l=>{if(Bp(l)&&fe(e,"middleware",`Using simple endpoints can cause unexpected issues in the chain of middleware functions.
It's strongly suggested to use full ${Se("Response")} objects.`),a)if(typeof l<"u"){if(!(l instanceof Response))throw new E(Ct);return l}else{if(o)return o;throw new E(Ct)}else{if(typeof l>"u")throw new E(Zr);if(l instanceof Response)return l;throw new E(Ct)}})}function Bp(e){return!(e instanceof Response)&&typeof e=="object"&&typeof e.body=="string"}function la({request:e,params:t,site:s,props:n,adapterName:a}){let o={cookies:new nt(e),request:e,params:t,site:s?new URL(s):void 0,generator:`Astro v${Ps}`,props:n,redirect(i,p){return new Response(null,{status:p||302,headers:{Location:i}})},url:new URL(e.url),get clientAddress(){if(!(Ds in e))throw a?new E({...Qe,message:Qe.message(a)}):new E(Ts);return Reflect.get(e,Ds)}};return Object.defineProperty(o,"locals",{enumerable:!0,get(){return Reflect.get(e,vs)},set(i){if(typeof i!="object")throw new E(js);Reflect.set(e,vs,i)}}),o}async function Ap(e,t,s,n){var a;let o=la({request:s.request,params:s.params,props:s.props,site:t.site,adapterName:t.adapterName}),i;return n?i=await ra(t.logging,n,o,async()=>await os(e,o,t.ssr)):i=await os(e,o,t.ssr),i instanceof Response?(on(i,o.cookies),{type:"response",response:i}):(t.ssr&&!((a=s.route)!=null&&a.prerender)&&(i.hasOwnProperty("headers")&&fe(t.logging,"ssr","Setting headers is not supported when returning an object. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."),i.encoding&&fe(t.logging,"ssr","`encoding` is ignored in SSR. To return a charset other than UTF-8, please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information.")),{...i,type:"simple",cookies:o.cookies})}function jp(e){var t;if(e&&((t=e.expressions)==null?void 0:t.length)===1)return e.expressions[0]}function Mp(e){let{markdown:t,params:s,request:n,resolve:a,locals:o}=e,i=new URL(n.url),p=new Headers;p.set("Content-Type","text/html");let l={status:e.status,statusText:"OK",headers:p};Object.defineProperty(l,"headers",{value:l.headers,enumerable:!0,writable:!1});let c=e.cookies,r={styles:e.styles??new Set,scripts:e.scripts??new Set,links:e.links??new Set,componentMetadata:e.componentMetadata??new Map,renderers:e.renderers,clientDirectives:e.clientDirectives,compressHTML:e.compressHTML,pathname:e.pathname,cookies:c,createAstro(u,m,S){let D=new Yt(r,S,e.logging),C={__proto__:u,get clientAddress(){if(!(xs in n))throw e.adapterName?new E({...Qe,message:Qe.message(e.adapterName)}):new E(Ts);return Reflect.get(n,xs)},get cookies(){return c||(c=new nt(n),r.cookies=c,c)},params:s,props:m,locals:o,request:n,url:i,redirect(F,U){if(n[Tp])throw new E({...Zt});return new Response(null,{status:U||302,headers:{Location:F}})},response:l,slots:D};return Object.defineProperty(C,"__renderMarkdown",{enumerable:!1,writable:!1,value:async function(F,U){if(typeof Deno<"u")throw new Error("Markdown is not supported in Deno SSR");if(!jt){let V="@astrojs/";V+="markdown-remark",jt=(await import(V)).renderMarkdown}let{code:z}=await jt(F,{...t,...U??{}});return z}}),C},resolve:a,response:l,_metadata:{hasHydrationScript:!1,hasRenderedHead:!1,hasDirectives:new Set,headInTree:!1,extraHead:[],propagators:new Map}};return r}async function Fs({mod:e,renderContext:t,env:s,cookies:n}){if(Cp(t.route))return new Response(null,{status:Sp(t.route,t.request.method),headers:{location:Ip(t.route,t.params)}});let a=e.default;if(!a)throw new Error(`Expected an exported Astro component but received typeof ${typeof a}`);let o=Mp({adapterName:s.adapterName,links:t.links,styles:t.styles,logging:s.logging,markdown:s.markdown,params:t.params,pathname:t.pathname,componentMetadata:t.componentMetadata,resolve:s.resolve,renderers:s.renderers,clientDirectives:s.clientDirectives,compressHTML:s.compressHTML,request:t.request,site:s.site,scripts:t.scripts,ssr:s.ssr,status:t.status??200,cookies:n,locals:t.locals??{}});typeof e.components=="object"&&Object.assign(t.props,{components:e.components});let i=await ip(o,a,t.props,null,s.streaming,t.route);return o.cookies&&on(i,o.cookies),i}async function ks(e,t,s,n,a){let o=la({request:t.request,params:t.params,props:t.props,site:s.site,adapterName:s.adapterName});switch(e){case"page":case"redirect":return a?await ra(s.logging,a,o,()=>Fs({mod:n,renderContext:t,env:s,cookies:o.cookies})):await Fs({mod:n,renderContext:t,env:s,cookies:o.cookies});case"endpoint":return await Ap(n,s,t,a);default:throw new Error(`Couldn't find route of type [${e}]`)}}function _p(e,t){return e instanceof Response&&(t==="page"||t==="redirect")}function Rp([e,t],s){if(!Pp.includes(typeof t))throw new E({...Qn,message:Qn.message(e,t,typeof t),location:{file:s}})}function Lp(e,{ssr:t,route:s}){if((!t||s.prerender)&&!e.getStaticPaths)throw new E({...Qr,location:{file:s.component}})}function Np(e,t,s){if(!Array.isArray(e))throw new E({...Xn,message:Xn.message(typeof e),location:{file:s.component}});e.forEach(n=>{if(n.params===void 0||n.params===null||n.params&&Object.keys(n.params).length===0)throw new E({...Xr,location:{file:s.component}});if(typeof n.params!="object")throw new E({...Kn,message:Kn.message(typeof n.params),location:{file:s.component}});for(let[a,o]of Object.entries(n.params))typeof o>"u"||typeof o=="string"||typeof o=="number"||fe(t,"getStaticPaths",`invalid path param: ${a}. A string, number or undefined value was expected, but got \`${JSON.stringify(o)}\`.`),typeof o=="string"&&o===""&&fe(t,"getStaticPaths",`invalid path param: ${a}. \`undefined\` expected for an optional param, but got empty string.`)})}function Hp(e){return s=>{let n={};return e.forEach((a,o)=>{a.startsWith("...")?n[a.slice(3)]=s[o+1]?decodeURIComponent(s[o+1]):void 0:n[a]=decodeURIComponent(s[o+1])}),n}}function pa(e,t){let s=Object.entries(e).reduce((n,a)=>{Rp(a,t.component);let[o,i]=a;return n[o]=i?.toString(),n},{});return JSON.stringify(t.generate(s))}function Op(e){return function(s,n={}){let{pageSize:a,params:o,props:i}=n,p=a||10,l="page",c=o||{},r=i||{},u;if(e.params.includes(`...${l}`))u=!1;else if(e.params.includes(`${l}`))u=!0;else throw new E({...ts,message:ts.message(l)});let m=Math.max(1,Math.ceil(s.length/p));return[...Array(m).keys()].map(D=>{let C=D+1,F=p===1/0?0:(C-1)*p,U=Math.min(F+p,s.length),z={...c,[l]:u||C>1?String(C):void 0},V=Mt(e.generate({...z})),w=C===m?void 0:Mt(e.generate({...z,page:String(C+1)})),ee=C===1?void 0:Mt(e.generate({...z,page:!u&&C-1===1?void 0:String(C-1)}));return{params:z,props:{...r,page:{data:s.slice(F,U),start:F,end:U-1,size:p,total:s.length,currentPage:C,lastPage:m,url:{current:V,next:w,prev:ee}}}}})}}function Mt(e){return e===""?"/":e}async function $p({mod:e,route:t,routeCache:s,isValidate:n,logging:a,ssr:o}){let i=s.get(t);if(i?.staticPaths)return i.staticPaths;if(Lp(e,{ssr:o,route:t}),o&&!t.prerender){let c=Object.assign([],{keyed:new Map});return s.set(t,{...i,staticPaths:c}),c}if(!e.getStaticPaths)throw new Error("Unexpected Error.");let p=[];p=await e.getStaticPaths({paginate:Op(t),rss(){throw new E(Kr)}}),Array.isArray(p)&&(p=p.flat()),n&&Np(p,a,t);let l=p;l.keyed=new Map;for(let c of l){let r=pa(c.params,t);l.keyed.set(r,c)}return s.set(t,{...i,staticPaths:l}),l}function qp(e,t,s){let n=pa(t,s),a=e.keyed.get(n);if(a)return a;bp("findPathItemByKey",`Unexpected cache miss looking for ${n}`)}async function Up(e){let{logging:t,mod:s,route:n,routeCache:a,pathname:o,ssr:i}=e;if(!n||n.pathname)return[{},{}];let p=zp(n,o)??{};Wp(n,s,p);let l=await $p({mod:s,route:n,routeCache:a,isValidate:!0,logging:t,ssr:i}),c=qp(l,p,n);if(!c&&(!i||n.prerender))throw new E({...vt,message:vt.message(o),hint:vt.hint([n.component])});let r=c?.props?{...c.props}:{};return[p,r]}function zp(e,t){if(e.params.length){let s=e.pattern.exec(decodeURIComponent(t));if(s)return Hp(e.params)(s)}}function Wp(e,t,s){if(e.type==="endpoint"&&t.getStaticPaths){let n=e.segments[e.segments.length-1],a=Object.values(s),o=a[a.length-1];if(n.length===1&&n[0].dynamic&&o===void 0)throw new E({...kt,message:kt.message(e.route),hint:kt.hint(e.component),location:{file:e.component}})}}async function Is(e){let t=e.request,s=e.pathname??new URL(t.url).pathname,[n,a]=await Up({mod:e.mod,route:e.route,routeCache:e.env.routeCache,pathname:s,logging:e.env.logging,ssr:e.env.ssr}),o={...e,pathname:s,params:n,props:a};return Object.defineProperty(o,"locals",{enumerable:!0,get(){return Reflect.get(t,Cs)},set(i){if(typeof i!="object")throw new E(js);Reflect.set(t,Cs,i)}}),o}function rn(e,t,s){return s?bs(s,ws(e)):t?at(bs(t,ws(e))):e}function Gp(e,t,s){return e.type==="inline"?{props:{type:"text/css"},children:e.content}:{props:{rel:"stylesheet",href:rn(e.src,t,s)},children:""}}function Jp(e,t,s){return new Set(e.map(n=>Gp(n,t,s)))}function Yp(e,t,s){return e.type==="external"?Vp(e.value,t,s):{props:{type:"module"},children:e.value}}function Vp(e,t,s){return{props:{type:"module",src:rn(e,t,s)},children:""}}function Ss(e,t){return t.routes.find(s=>s.pattern.test(decodeURI(e)))}function Kp(e,t){let s=e.map(o=>"/"+o.map(i=>i.spread?`:${i.content.slice(3)}(.*)?`:i.dynamic?`:${i.content}`:i.content.normalize().replace(/\?/g,"%3F").replace(/#/g,"%23").replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("")).join(""),n="";return t==="always"&&e.length&&(n="/"),jn(s+n)}function Kt(e){return{route:e.route,type:e.type,pattern:new RegExp(e.pattern),params:e.params,component:e.component,generate:Kp(e.segments,e._meta.trailingSlash),pathname:e.pathname||void 0,segments:e.segments,prerender:e.prerender,redirect:e.redirect,redirectRoute:e.redirectRoute?Kt(e.redirectRoute):void 0}}function ca(e){let t=[];for(let o of e.routes){t.push({...o,routeData:Kt(o.routeData)});let i=o;i.routeData=Kt(o.routeData)}let s=new Set(e.assets),n=new Map(e.componentMetadata),a=new Map(e.clientDirectives);return{...e,assets:s,componentMetadata:n,clientDirectives:a,routes:t}}function Ue({globResult:e,contentDir:t}){let s={};for(let n in e){let o=n.replace(new RegExp(`^${t}`),"").split("/");if(o.length<=1)continue;let i=o[0];s[i]??(s[i]={}),s[i][n]=e[n]}return s}function ha({contentCollectionToEntryMap:e,dataCollectionToEntryMap:t,getRenderEntryImport:s}){return async function(a,o){let i;if(a in e)i="content";else if(a in t)i="data";else throw new E({...as,message:as.message(a)});let p=Object.values(i==="content"?e[a]:t[a]),l=[];return _t.has(a)?l=[..._t.get(a)]:(l=await Promise.all(p.map(async c=>{let r=await c();return i==="content"?{id:r.id,slug:r.slug,body:r.body,collection:r.collection,data:r.data,async render(){return ya({collection:r.collection,id:r.id,renderEntryImport:await s(a,r.slug)})}}:{id:r.id,collection:r.collection,data:r.data}})),_t.set(a,l)),typeof o=="function"?l.filter(o):l}}function ma({getEntryImport:e,getRenderEntryImport:t}){return async function(n,a){let o,i;if(typeof n=="string"){if(o=n,!a)throw new E({...Ms,message:"`getEntry()` requires an entry identifier as the second argument."});i=a}else o=n.collection,i="id"in n?n.id:n.slug;let p=await e(o,i);if(typeof p!="function")return;let l=await p();if(l._internal.type==="content")return{id:l.id,slug:l.slug,body:l.body,collection:l.collection,data:l.data,async render(){return ya({collection:l.collection,id:l.id,renderEntryImport:await t(o,i)})}};if(l._internal.type==="data")return{id:l.id,collection:l.collection,data:l.data}}}async function ya({collection:e,id:t,renderEntryImport:s}){var n,a;let o=new E({...Ms,message:`Unexpected error while rendering ${String(e)} \u2192 ${String(t)}.`});if(typeof s!="function")throw o;let i=await s();if(i==null||typeof i!="object")throw o;let{default:p}=i;if(Zp(p)){let{collectedStyles:l,collectedLinks:c,collectedScripts:r,getMod:u}=p;if(typeof u!="function")throw o;let m=await u();if(m==null||typeof m!="object")throw o;return{Content:O({factory(D,C,F){let U="",z="",V="";Array.isArray(l)&&(U=l.map(ee=>hs(D,{type:"inline",content:ee})).join("")),Array.isArray(c)&&(z=c.map(ee=>hs(D,{type:"external",src:at(ee)})).join("")),Array.isArray(r)&&(V=r.map(ee=>rp(ee)).join(""));let w=C;return t.endsWith("mdx")&&(w={components:m.components??{},...C}),fl(Pe(U+z+V),b`${x(D,"Content",m.Content,w,F)}`)},propagation:"self"}),headings:((n=m.getHeadings)==null?void 0:n.call(m))??[],remarkPluginFrontmatter:m.frontmatter??{}}}else{if(i.Content&&typeof i.Content=="function")return{Content:i.Content,headings:((a=i.getHeadings)==null?void 0:a.call(i))??[],remarkPluginFrontmatter:i.frontmatter??{}};throw o}}function Zp(e){return typeof e=="object"&&e!=null&&"__astroPropagation"in e}var _e,As,Qe,Ts,vt,Yn,Vr,xt,Vn,Ft,Kn,Xn,Kr,Xr,Qn,Qr,Zn,es,ts,kt,Zt,Zr,Ct,js,ns,ss,Ms,as,E,Ps,Ae,Ze,me,v,Ns,K,cl,Rt,St,zs,gl,El,nn,vl,xl,Fl,kl,Cl,we,Bt,ls,At,Gs,et,A,Nt,tt,Bl,Ys,Vs,Ht,Ks,Xs,Ot,Ol,us,zl,Wl,ds,pe,qt,an,zt,Te,op,ct,ms,ys,na,sa,hp,fs,mp,Me,ve,ae,X,Re,Wt,Le,Gt,it,aa,nt,oa,gp,st,gs,Tt,wp,Fp,kp,Ds,vs,xs,Tp,Ne,oe,He,Yt,jt,Pp,Vt,Cs,Xp,Bs,Qp,re,H,de,Oe,rt,xe,Fe,lt,ua,$e,Xt,he,Be,ke,Xe,pt,da,qe,Qt,ot,_t,M=h(()=>{_e=y(_(),1);P();Mn();As=y(R(),1);L();N();Qe={name:"ClientAddressNotAvailable",title:"`Astro.clientAddress` is not available in current adapter.",message:e=>`\`Astro.clientAddress\` is not available in the \`${e}\` adapter. File an issue with the adapter to add support.`},Ts={name:"StaticClientAddressNotAvailable",title:"`Astro.clientAddress` is not available in static mode.",message:"`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.",hint:"See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."},vt={name:"NoMatchingStaticPathFound",title:"No static path found for requested path.",message:e=>`A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e}\`.`,hint:e=>`Possible dynamic routes being matched: ${e.join(", ")}.`},Yn={name:"OnlyResponseCanBeReturned",title:"Invalid type returned by Astro page.",message:(e,t)=>`Route \`${e||""}\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,hint:"See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."},Vr={name:"MissingMediaQueryDirective",title:"Missing value for `client:media` directive.",message:'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'},xt={name:"NoMatchingRenderer",title:"No matching renderer found.",message:(e,t,s,n)=>`Unable to render \`${e}\`.

${n>0?`There ${s?"are":"is"} ${n} renderer${s?"s":""} configured in your \`astro.config.mjs\` file,
but ${s?"none were":"it was not"} able to server-side render \`${e}\`.`:`No valid renderer was found ${t?`for the \`.${t}\` file extension.`:"for this file extension."}`}`,hint:e=>`Did you mean to enable the ${e} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`},Vn={name:"NoClientEntrypoint",title:"No client entrypoint specified in renderer.",message:(e,t,s)=>`\`${e}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${s}\`.`,hint:"See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."},Ft={name:"NoClientOnlyHint",title:"Missing hint on client:only directive.",message:e=>`Unable to render \`${e}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,hint:e=>`Did you mean to pass \`client:only="${e}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`},Kn={name:"InvalidGetStaticPathParam",title:"Invalid value returned by a `getStaticPaths` path.",message:e=>`Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${e}\``,hint:"See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."},Xn={name:"InvalidGetStaticPathsReturn",title:"Invalid value returned by getStaticPaths.",message:e=>`Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e}\``,hint:"See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."},Kr={name:"GetStaticPathsRemovedRSSHelper",title:"getStaticPaths RSS helper is not available anymore.",message:"The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",hint:"See https://docs.astro.build/en/guides/rss/ for more information."},Xr={name:"GetStaticPathsExpectedParams",title:"Missing params property on `getStaticPaths` route.",message:"Missing or empty required `params` property on `getStaticPaths` route.",hint:"See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."},Qn={name:"GetStaticPathsInvalidRouteParam",title:"Invalid value for `getStaticPaths` route parameter.",message:(e,t,s)=>`Invalid getStaticPaths route parameter for \`${e}\`. Expected undefined, a string or a number, received \`${s}\` (\`${t}\`)`,hint:"See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."},Qr={name:"GetStaticPathsRequired",title:"`getStaticPaths()` function required for dynamic routes.",message:"`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",hint:'See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` or `output: "hybrid"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.'},Zn={name:"ReservedSlotName",title:"Invalid slot name.",message:e=>`Unable to create a slot named \`${e}\`. \`${e}\` is a reserved slot name. Please update the name of this slot.`},es={name:"InvalidComponentArgs",title:"Invalid component arguments.",message:e=>`Invalid arguments passed to${e?` <${e}>`:""} component.`,hint:"Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."},ts={name:"PageNumberParamNotFound",title:"Page number param not found.",message:e=>`[paginate()] page number param \`${e}\` not found in your filepath.`,hint:"Rename your file to `[page].astro` or `[...page].astro`."},kt={name:"PrerenderDynamicEndpointPathCollide",title:"Prerendered dynamic endpoint has path collision.",message:e=>`Could not render \`${e}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`,hint:e=>`Rename \`${e}\` to \`${e.replace(/\.(js|ts)/,t=>".json"+t)}\``},Zt={name:"ResponseSentError",title:"Unable to set response.",message:"The response has already been sent to the browser and cannot be altered."},Zr={name:"MiddlewareNoDataOrNextCalled",title:"The middleware didn't return a response or call `next`.",message:"The middleware needs to either return a `Response` object or call the `next` function."},Ct={name:"MiddlewareNotAResponse",title:"The middleware returned something that is not a `Response` object.",message:"Any data returned from middleware must be a valid `Response` object."},js={name:"LocalsNotAnObject",title:"Value assigned to `locals` is not accepted.",message:"`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.",hint:"If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`."},ns={name:"AstroGlobUsedOutside",title:"Astro.glob() used outside of an Astro file.",message:e=>`\`Astro.glob(${e})\` can only be used in \`.astro\` files. \`import.meta.glob(${e})\` can be used instead to achieve a similar result.`,hint:"See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import"},ss={name:"AstroGlobNoMatch",title:"Astro.glob() did not match any files.",message:e=>`\`Astro.glob(${e})\` did not return any matching files. Check the pattern for typos.`},Ms={name:"UnknownContentCollectionError",title:"Unknown Content Collection Error."},as={name:"CollectionDoesNotExistError",title:"Collection does not exist",message:e=>`The collection **${e}** does not exist. Ensure a collection directory with this name exists.`,hint:"See https://docs.astro.build/en/guides/content-collections/ for more on creating collections."};E=class extends Error{constructor(t,...s){super(...s),this.type="AstroError";let{name:n,title:a,message:o,stack:i,location:p,hint:l,frame:c}=t;this.title=a,this.name=n,o&&(this.message=o),this.stack=i||this.stack,this.loc=p,this.hint=l,this.frame=c}setLocation(t){this.loc=t}setName(t){this.name=t}setMessage(t){this.message=t}setHint(t){this.hint=t}setFrame(t,s){this.frame=tl(t,s)}static is(t){return t.type==="AstroError"}};Ps="2.10.14";Ae=Jn,Ze=class extends Uint8Array{};Object.defineProperty(Ze.prototype,Symbol.toStringTag,{get(){return"HTMLBytes"}});me=class extends String{get[Symbol.toStringTag](){return"HTMLString"}},v=e=>e instanceof me?e:typeof e=="string"?new me(e):e;Ns=Symbol.for("astro:render");K={Value:0,JSON:1,RegExp:2,Date:3,Map:4,Set:5,BigInt:6,URL:7,Uint8Array:8,Uint16Array:9,Uint32Array:10};cl=Object.freeze(["data-astro-transition-scope","data-astro-transition-persist"]);Rt="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY",St=Rt.length;zs=Symbol.for("astro.headAndContent");gl='(()=>{var d;{let p={0:t=>u(t),1:t=>l(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(l(t)),5:t=>new Set(l(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},h=t=>{let[e,n]=t;return e in p?p[e](n):void 0},l=t=>t.map(h),u=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([e,n])=>[e,h(n)]));customElements.get("astro-island")||customElements.define("astro-island",(d=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=async()=>{var i;if(!this.hydrator||!this.isConnected)return;let e=(i=this.parentElement)==null?void 0:i.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let n=this.querySelectorAll("astro-slot"),o={},a=this.querySelectorAll("template[data-astro-template]");for(let r of a){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(o[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(let r of n){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(o[r.getAttribute("name")||"default"]=r.innerHTML)}let c;try{c=this.hasAttribute("props")?u(JSON.parse(this.getAttribute("props"))):{}}catch(r){let s=this.getAttribute("component-url")||"<unknown>",y=this.getAttribute("component-export");throw y&&(s+=` (export ${y})`),console.error(`[hydrate] Error parsing props for component ${s}`,this.getAttribute("props"),r),r}await this.hydrator(this)(this.Component,c,o,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((e,n)=>{n.disconnect(),setTimeout(()=>this.childrenConnectedCallback(),0)}).observe(this,{childList:!0})}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}start(){let e=JSON.parse(this.getAttribute("opts")),n=this.getAttribute("client");if(Astro[n]===void 0){window.addEventListener(`astro:${n}`,()=>this.start(),{once:!0});return}Astro[n](async()=>{let o=this.getAttribute("renderer-url"),[a,{default:c}]=await Promise.all([import(this.getAttribute("component-url")),o?import(o):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(let r of i.split("."))this.Component=this.Component[r]}return this.hydrator=c,this.hydrate},e,this)}attributeChangedCallback(){this.hydrate()}},d.observedAttributes=["props"],d))}})();',El="<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>";nn=/^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i,vl=/^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i,xl=/^(contenteditable|draggable|spellcheck|value)$/i,Fl=/^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i,kl=new Set(["set:html","set:text"]),Cl=e=>e.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g,(t,s)=>/[^\w]|\s/.test(t)?"":s===0?t:t.toUpperCase()),we=(e,t=!0)=>t?String(e).replace(/&/g,"&#38;").replace(/"/g,"&#34;"):e,Bt=e=>e.toLowerCase()===e?e:e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`),ls=e=>Object.entries(e).map(([t,s])=>t[0]!=="-"&&t[1]!=="-"?`${Bt(t)}:${s}`:Bt(t)!==t?`${Bt(t)}:var(${t});${t}:${s}`:`${t}:${s}`).join(";");At=(e,t,s)=>{let n=JSON.stringify(e.props),a=e.children;return t===s.findIndex(o=>JSON.stringify(o.props)===n&&o.children==a)};Gs=Symbol.for("astro:slot-string"),et=class extends me{constructor(t,s){super(t),this.instructions=s,this[Gs]=!0}};A=Symbol.for("astro:fragment"),Nt=Symbol.for("astro:renderer"),tt=new TextEncoder,Bl=new TextDecoder;Vs=Symbol.for("astro.componentInstance"),Ht=class{constructor(t,s,n,a){this[Ys]=!0,this.result=t,this.props=s,this.factory=a,this.slotValues={};for(let o in n){let i=n[o](t);this.slotValues[o]=()=>i}}async init(t){return this.returnValue!==void 0?this.returnValue:(this.returnValue=this.factory(t,this.props,this.slotValues),this.returnValue)}async render(t){this.returnValue===void 0&&await this.init(this.result);let s=this.returnValue;en(s)&&(s=await s),tn(s)?await s.content.render(t):await De(t,s)}};Ys=Vs;Xs=Symbol.for("astro.renderTemplateResult"),Ot=class{constructor(t,s){this[Ks]=!0,this.htmlParts=t,this.error=void 0,this.expressions=s.map(n=>en(n)?Promise.resolve(n).catch(a=>{if(!this.error)throw this.error=a,a}):n)}async render(t){let s=this.expressions.map(n=>Ws(a=>{if(n||n===0)return De(a,n)}));for(let n=0;n<this.htmlParts.length;n++){let a=this.htmlParts[n],o=s[n];t.write(v(a)),o&&await o.renderToFinalDestination(t)}}};Ks=Xs;Ol=Symbol.for("astro.needsHeadRendering"),us=new Map([["solid","solid-js"]]);zl=/\<\/?astro-slot\b[^>]*>/g,Wl=/\<\/?astro-static-slot\b[^>]*>/g;ds="astro-client-only",pe=class{constructor(t){this.vnode=t,this.count=0}increment(){this.count++}haveNoTried(){return this.count===0}isCompleted(){return this.count>2}};pe.symbol=Symbol("astro:jsx:skip");an=0;zt=typeof process=="object"&&Object.prototype.toString.call(process)==="[object process]";op=zt?(e,t)=>typeof e=="string"||ArrayBuffer.isView(e)?new Response(e,t):typeof Te>"u"?new(ap())(e,t):new Te(e,t):(e,t)=>new Response(e,t);ct="astro:jsx",ms=Symbol("empty"),ys=e=>e;na=e=>e.trim().replace(/[-_]([a-z])/g,(t,s)=>s.toUpperCase());sa={check:cp,renderToStaticMarkup:up},hp=new Date(0),fs="deleted",mp=Symbol.for("astro.responseSent"),Me=class{constructor(t){this.value=t}json(){if(this.value===void 0)throw new Error("Cannot convert undefined to an object.");return JSON.parse(this.value)}number(){return Number(this.value)}boolean(){return this.value==="false"||this.value==="0"?!1:!!this.value}},nt=class{constructor(t){B(this,Re);B(this,Le);B(this,it);B(this,ve,void 0);B(this,ae,void 0);B(this,X,void 0);G(this,ve,t),G(this,ae,null),G(this,X,null)}delete(t,s){let n={expires:hp};s?.domain&&(n.domain=s.domain),s?.path&&(n.path=s.path),J(this,Le,Gt).call(this).set(t,[fs,(0,_e.serialize)(t,fs,n),!1])}get(t){var s;if((s=d(this,X))!=null&&s.has(t)){let[o,,i]=d(this,X).get(t);return i?new Me(o):new Me(void 0)}let a=J(this,Re,Wt).call(this)[t];return new Me(a)}has(t){var s;if((s=d(this,X))!=null&&s.has(t)){let[,,a]=d(this,X).get(t);return a}return!!J(this,Re,Wt).call(this)[t]}set(t,s,n){let a;if(typeof s=="string")a=s;else{let i=s.toString();i===Object.prototype.toString.call(s)?a=JSON.stringify(s):a=i}let o={};if(n&&Object.assign(o,n),J(this,Le,Gt).call(this).set(t,[a,(0,_e.serialize)(t,a,o),!0]),d(this,ve)[mp])throw new E({...Zt})}*headers(){if(d(this,X)!=null)for(let[,t]of d(this,X))yield t[1]}};ve=new WeakMap,ae=new WeakMap,X=new WeakMap,Re=new WeakSet,Wt=function(){return d(this,ae)||J(this,it,aa).call(this),d(this,ae)||G(this,ae,{}),d(this,ae)},Le=new WeakSet,Gt=function(){return d(this,X)||G(this,X,new Map),d(this,X)},it=new WeakSet,aa=function(){let t=d(this,ve).headers.get("cookie");t&&G(this,ae,(0,_e.parse)(t))};oa=Symbol.for("astro.cookies");gp=new Intl.DateTimeFormat([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),st={debug:20,info:30,warn:40,error:50,silent:90};if(typeof process<"u"){let e=process;"argv"in e&&Array.isArray(e.argv)&&(e.argv.includes("--verbose")||e.argv.includes("--silent"))}Tt=1,wp={write(e){let t=console.error;st[e.level]<st.error&&(t=console.log);function s(){let o="",i=e.type;return i&&(o+=Bn(gp.format(new Date)+" "),e.level==="info"?i=Se(Tn(`[${i}]`)):e.level==="warn"?i=Se(bt(`[${i}]`)):e.level==="error"&&(i=Se(An(`[${i}]`))),o+=`${i} `),Sn(o)}let n=e.message;n===gs?(Tt++,n=`${n} ${bt(`(x${Tt})`)}`):(gs=n,Tt=1);let a=s()+n;return t(a),!0}};Fp={default(){return new Response(null,{status:301})}},kp={page:()=>Promise.resolve(Fp),onRequest:(e,t)=>t(),renderers:[]};Ds=Symbol.for("astro.clientAddress"),vs=Symbol.for("astro.locals");xs=Symbol.for("astro.clientAddress"),Tp=Symbol.for("astro.responseSent");Yt=class{constructor(t,s,n){B(this,Ne,void 0);B(this,oe,void 0);B(this,He,void 0);if(G(this,Ne,t),G(this,oe,s),G(this,He,n),s)for(let a of Object.keys(s)){if(this[a]!==void 0)throw new E({...Zn,message:Zn.message(a)});Object.defineProperty(this,a,{get(){return!0},enumerable:!0})}}has(t){return d(this,oe)?!!d(this,oe)[t]:!1}async render(t,s=[]){if(!d(this,oe)||!this.has(t))return;let n=d(this,Ne);if(!Array.isArray(s))fe(d(this,He),"Astro.slots.render",`Expected second parameter to be an array, received a ${typeof s}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);else if(s.length>0){let i=d(this,oe)[t],p=typeof i=="function"?await i(n):await i,l=jp(p);if(l)return await Ce(n,async()=>typeof l=="function"?l(...s):l).then(r=>r!=null?String(r):r);if(typeof p=="function")return await ce(n,p(...s)).then(c=>c!=null?String(c):c)}let a=await Ce(n,d(this,oe)[t]);return ye(n,a)}};Ne=new WeakMap,oe=new WeakMap,He=new WeakMap;jt=null;Pp=["string","number","undefined"];Vt=class{constructor(t,s="production"){this.cache={},this.logging=t,this.mode=s}clearAll(){this.cache={}}set(t,s){var n;this.mode==="production"&&((n=this.cache[t.component])!=null&&n.staticPaths)&&fe(this.logging,"routeCache",`Internal Warning: route cache overwritten. (${t.component})`),this.cache[t.component]=s}get(t){return this.cache[t.component]}};Cs=Symbol.for("astro.locals");Xp=Symbol.for("astro.locals"),Bs=Symbol.for("astro.responseSent"),Qp=new Set([404,500]),ot=class{constructor(t,s=!0){B(this,lt);B(this,$e);B(this,he);B(this,ke);B(this,pt);B(this,qe);B(this,re,void 0);B(this,H,void 0);B(this,de,void 0);B(this,Oe,void 0);B(this,rt,new TextEncoder);B(this,xe,{dest:wp,level:"info"});B(this,Fe,void 0);G(this,H,t),G(this,de,{routes:t.routes.map(n=>n.routeData)}),G(this,Oe,new Map(t.routes.map(n=>[n.routeData,n]))),G(this,Fe,Jt(d(this,H).base)),G(this,re,J(this,lt,ua).call(this,s))}set setManifest(t){G(this,H,t)}set setManifestData(t){G(this,de,t)}removeBase(t){return t.startsWith(d(this,H).base)?t.slice(d(this,Fe).length+1):t}match(t,s={}){let n=new URL(t.url);if(d(this,H).assets.has(n.pathname))return;let a=at(this.removeBase(n.pathname)),o=Ss(a,d(this,de));if(!(!o||o.prerender))return o}async render(t,s,n){if(t.url!==Es(t.url)&&(t=new Request(Es(t.url),t)),s||(s=this.match(t)),!s)return J(this,he,Be).call(this,t,{status:404});Reflect.set(t,Xp,n??{});let a=J(this,pt,da).call(this,s.route),o=await J(this,qe,Qt).call(this,s),i=await o.page(),p=new URL(t.url),l=await J(this,$e,Xt).call(this,p,t,s,o,a),c;try{c=await ks(s.type,l,d(this,re),i,o.onRequest)}catch(r){return Ep(d(this,xe),"ssr",r.stack||r.message||String(r)),J(this,he,Be).call(this,t,{status:500})}if(_p(c,s.type))return Qp.has(c.status)?J(this,he,Be).call(this,t,{response:c,status:c.status}):(Reflect.set(c,Bs,!0),c);if(c.type==="response")return c.response.headers.get("X-Astro-Response")==="Not-Found"?J(this,he,Be).call(this,t,{response:c.response,status:404}):c.response;{let r=new Headers,u=As.default.getType(p.pathname);u?r.set("Content-Type",`${u};charset=utf-8`):r.set("Content-Type","text/plain;charset=utf-8");let m=c.encoding!=="binary"?d(this,rt).encode(c.body):c.body;r.set("Content-Length",m.byteLength.toString());let S=new Response(m,{status:200,headers:r});return on(S,c.cookies),S}}setCookieHeaders(t){return fp(t)}};re=new WeakMap,H=new WeakMap,de=new WeakMap,Oe=new WeakMap,rt=new WeakMap,xe=new WeakMap,Fe=new WeakMap,lt=new WeakSet,ua=function(t=!1){return{adapterName:d(this,H).adapterName,logging:d(this,xe),markdown:d(this,H).markdown,mode:"production",compressHTML:d(this,H).compressHTML,renderers:d(this,H).renderers,clientDirectives:d(this,H).clientDirectives,resolve:async s=>{if(!(s in d(this,H).entryModules))throw new Error(`Unable to resolve [${s}]`);let n=d(this,H).entryModules[s];switch(!0){case n.startsWith("data:"):case n.length===0:return n;default:return rn(n,d(this,H).base,d(this,H).assetsPrefix)}},routeCache:new Vt(d(this,xe)),site:d(this,H).site,ssr:!0,streaming:t}},$e=new WeakSet,Xt=async function(t,s,n,a,o=200){if(n.type==="endpoint"){let i="/"+this.removeBase(t.pathname),l=await a.page();return await Is({request:s,pathname:i,route:n,status:o,env:d(this,re),mod:l})}else{let i=at(this.removeBase(t.pathname)),p=d(this,Oe).get(n),l=new Set,c=Jp(p.styles),r=new Set;for(let m of p.scripts)"stage"in m?m.stage==="head-inline"&&r.add({props:{},children:m.children}):r.add(Yp(m));let u=await a.page();return await Is({request:s,pathname:i,componentMetadata:d(this,H).componentMetadata,scripts:r,styles:c,links:l,route:n,status:o,mod:u,env:d(this,re)})}},he=new WeakSet,Be=async function(t,{status:s,response:n}){let a=Ss("/"+s,d(this,de)),o=new URL(t.url);if(a){if(a.prerender){let l=a.route.endsWith(`/${s}`)?".html":"",c=new URL(`${d(this,Fe)}/${s}${l}`,o),r=await fetch(c.toString()),u={status:s};return J(this,ke,Xe).call(this,r,n,u)}let p=await J(this,qe,Qt).call(this,a);try{let l=await J(this,$e,Xt).call(this,o,t,a,p,s),c=await p.page(),r=await ks("page",l,d(this,re),c);return J(this,ke,Xe).call(this,r,n)}catch{}}let i=J(this,ke,Xe).call(this,new Response(null,{status:s}),n);return Reflect.set(i,Bs,!0),i},ke=new WeakSet,Xe=function(t,s,n){if(!s)return n!==void 0?new Response(t.body,{status:n.status,statusText:t.statusText,headers:t.headers}):t;let{statusText:a,headers:o}=s,i=n?.status?n.status:s.status===200?t.status:s.status;return new Response(t.body,{status:i,statusText:i===200?t.statusText:a,headers:new Headers(Array.from(o))})},pt=new WeakSet,da=function(t){return t=Jt(t),t.endsWith("/404")?404:t.endsWith("/500")?500:200},qe=new WeakSet,Qt=async function(t){if(t.type==="redirect")return kp;if(d(this,H).pageMap){let s=d(this,H).pageMap.get(t.component);if(!s)throw new Error(`Unexpectedly unable to find a component instance for route ${t.route}`);return await s()}else{if(d(this,H).pageModule)return d(this,H).pageModule;throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.")}};_t=new Map});var ry,py,Z,Ee=h(()=>{M();ry=y(_(),1);P();py=y(R(),1);L();N();Z=[Object.assign({name:"astro:jsx",serverEntrypoint:"astro/jsx/server.js",jsxImportSource:"astro"},{ssr:sa})]});var ne,Ie=h(()=>{ne=void 0});var fa={};f(fa,{_internal:()=>oc,body:()=>sc,collection:()=>tc,data:()=>ac,id:()=>ec,slug:()=>nc});var ec,tc,nc,sc,ac,oc,ga=h(()=>{ec="css-grid-double-overflow.md",tc="blog",nc="css-grid-double-overflow",sc=`
Here's a deceptively tricky layout I encountered at work recently:

<div class="not-prose full-width flex justify-center">
<img alt="Sketch of layout" src="/posts/css-grid-double-overflow-sketch.svg" />
</div>

<h3>It has:</h3>

- Flex and grid layouts combined
- Multiple overflow containers
- Set and variable width columns

Here's how I solved it!

<div class="not-prose full-width w-75">
<p class="codepen" data-height="700" data-default-tab="css,result" data-slug-hash="ExLLRaQ" data-user="npbee" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ExLLRaQ">
  Double Overflowing Columns with CSS Grid</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>
</div>
`,ac={title:"Double overflow with CSS grid",date:new Date(16646688e5),description:"A deceptively tricky layout"},oc={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/css-grid-double-overflow.md",rawData:`
title: Double overflow with CSS grid
date: 2022-10-02
description: A deceptively tricky layout`}});var Ea={};f(Ea,{_internal:()=>uc,body:()=>pc,collection:()=>rc,data:()=>cc,id:()=>ic,slug:()=>lc});var ic,rc,lc,pc,cc,uc,ba=h(()=>{ic="eleventy-datocms-netlify.md",rc="blog",lc="eleventy-datocms-netlify",pc=`
As a web developer I get the occasional ask from friends to help them build a
website. I generally don't mind and am happy to help out my buddies, but lately
as I've been limited on spare time, I've been more and more upfront with some requirements:

- I will only build _static_ sites. I don't want to be building anyone's custom
  CMS or billing system.
- I will only work with my preferred development workflow: Git / GitHub + Netlify
  and continuous deployment. I'd rather not hand off code in a zip file or
  configure anyone's _phpMyAdmin_ console.

As long as my friends are OK with my snobby requirements, I'm happy to oblige.
One missing piece from this workflow is the ability for people to update the
content after the site has been deployed. Historically the solution to that
has either been use a CMS like Wordpress or just update the content manually
everytime a change is needed. But recently there's been a surge of tools that
provide a new option: use a headless CMS. A headless CMS allows for content
owners to update the content in a third-party admin console and for me to
pull in that data at build time so I can continue to use my favorite static-site
tools. One of the new headless CMS options is [DatoCMS](https://datocms.com),
and I recently had a great experience working with it alongside [Eleventy](https://11ty.io),
my current static-site generator of choice. In this post I'll go through the
setup and experience.

I've set up an example respository here if you'd like to skip to the code:
[Eleventy-DatoCMS-Netlify](https://github.com/npbee/Eleventy-DatoCMS-Netlify).

## What is a Headless CMS Anyway?

First, a quick primer on headless CMS systems. A typical Content Management
System (CMS) loads content from a database and renders that content to a
template of some sort. Updating the content involves logging into an adminstration
console and changing the content. So in this world,
the content, administration, and display logic are all together in one codebase.
A headless CMS on the other hand, separates the content and adminstration of the
content from the view layer. Data is maintained and updated in one system and
the view layer pulls in that data at build time to create the static site. If
you've ever built a static site that had local data files of some sort, it's
just like that except your data files live on a third-party server somewhere.

There are lots of headless CMS options out there, but for my project I chose
[DatoCMS](https://datocms.com). The interface was simple, pricing was reasonable,
and they have a GraphQL API interface, of which I'm a big fan.

## The Data Flow

Since Netlify is the point at which the updated data is fetched from DatoCMS, a
new site build can happen either when new site code is pushed to GitHub _or_ when
the content is udpated through the Dato admin interface. In the case of data
updates, Dato tells Netlify that a new build needs to happen. Netlify then
starts the build and asks Dato for the new data.

![Image describing data flow between Github, DatoCMS, and Netlify](/posts/dato-1.png)

## Fetching Data from DatoCMS

To actually start building a site, we need to be able to get data from DatoCMS.
The example we'll work with is a restaurant building a menu (which was the
actual original use case).

Each headless CMS service will have different details, but fundamentally in each
one you describe how your content is structured by telling the service what
kind of data you're working with and what each of the properties are. In DatoCMS,
these are "models" and "fields" so you may have a model called "Menu Item"
that is made of up of a "name" field that is a string and a "price" field that
is a number.

![DatoCMS Model structure](/posts/dato-model.png)

This configuration ties directly to the GraphQL query that you make to DatoCMS:

\`\`\`graphql
query Site {
  allMenuItems {
    name
    price
  }
}
\`\`\`

DatoCMS offers an "API Explorer" on the site which allows you to query your
data:

![DatoCMS API Explorer](/posts/dato-api-explorer.png)

The API Explorer is great because you can tinker with your query until you get
it just right and then copy the query and paste it into a file in your
codebase. This makes for a really nice workflow where updating the data on the
site is a matter of pasting in a new query to a file.

Finally, to actually fetch the data we can use a rather plain \`fetch\` call;

\`\`\`js
const fetch = require("node-fetch");
const path = require("path");

// The DatoCMS token available fro the DatoCMS dashboard
// More on this later...
const token = process.env.DATO_API_TOKEN;

async function fetchData(token) {
  // Read the query from the file. A bit nicer to work with once the query
  // gets bigger. You can also copy and paste directly from the Dato API
  // explorer into the file.
  const query = await readFile(path.join(__dirname, "query.graphql"));
  const response = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify({
      query: query.toString(),
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Aborting: DatoCMS request failed with " + res.status);
    }
  });

  if (response.errors) {
    for (let error of response.errors) {
      console.error(error.message);
    }
    throw new Error("Aborting: DatoCMS errors");
  } else {
    return response.data;
  }
}
\`\`\`

As you can see above, we need a token from DatoCMS in order have the authorization
necessary to query our site. This is secret, so it lives in an environment
variable. For development, that means doing something like setting the
variable with in a \`.env\` file and using something like [\`dotenv\`](https://github.com/motdotla/dotenv) to pull in the variables. In production, we'll have to set the
variable within the Netlify dashboard. More on that soon.

## Fetching Data with Eleventy

Above we showed how to fetch data from DatoCMS using a \`fetch\` call, but how
does that work with Eleventy? The answer is Eleventy's [JS data files](https://www.11ty.dev/docs/data-js/). With JS data files, you can use JS to do anything you need
to do to get your data, including making a network call. By placing a
file within the special \`_data\` directory, Eleventy will expose whatever you
return to your template files:

\`\`\`js
// _data/cms.js
module.exports = async function Cms() {
  const token = process.env.DATO_API_TOKEN;
  const cachePath = path.join(__dirname, "cms.cache.json");
  return await fetchData(token);
};
\`\`\`

Then in your templates:

\`\`\`html
<!-- \`cms\` because that's what we named the file in the \`_data\` directory -->
{% for item in cms.allMenuItems %}
<p>
  <strong>Name</strong> {{ item.name }} <strong>Price</strong> {{ item.price }}
</p>
{% endfor %}
\`\`\`

That's it! We now have an Eleventy site fetching data from DatoCMS and building a
static site.

## Caching Data

The current setup works, but you may see this in your console output:

\`\`\`js
Writing _site/index.html from ./index.njk.
Benchmark (Data): \`./_data/cms.js\` took 581ms (66.0%)
Processed 2 files in 0.82 seconds (v0.9.0)
\`\`\`

Eleventy is noting that it took a noticeable amount of time to to handle our
\`_data/cms.js\` file. We can avoid going over the network each time by writing the DatoCMS response
to a file and using that file if it exists:

\`\`\`js
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

module.exports = async function Cms() {
  const token = process.env.DATO_API_TOKEN;
  const cachePath = path.join(__dirname, "cms.cache.json");
  const cache = await getCache(cachePath);

  if (cache) {
    console.log(">> Using cached data");
    return cache;
  } else {
    console.log(">> Fetching data from DatoCMS");
    const data = await fetchData(token);
    await writeFile(cachePath, JSON.stringify(data, null, 2));
    return data;
  }
};

async function getCache(cachePath) {
  try {
    const cache = await readFile(cachePath);
    return JSON.parse(cache);
  } catch (err) {
    // If this fails, that means there is no cache. Return \`undefined\` to
    // fetch from the network
  }
}
\`\`\`

Make sure ignore the cache file in the \`.gitignore\` file:

\`\`\`bash
# Cached data
_data/cms.cache.json
\`\`\`

This will only fetch fresh data if the \`_data/cms.cache.json\` does not exist.
In development, this is usually preferrable as your developing the site as you
probably don't need to fetch new data every time. In production, there will
never be any cache so we'll always fetch fresh data.

## Deployment

Assuming you have Netlify and GitHub integrated, the only missing piece for
being able to deploy our site is telling Netlify what our DatoCMS token is.
This is easily done via the Netlify admin dashboard:

![DatoCMS token in Netlify dashboard](/posts/dato-netlify-token.png)

Once that is in place, pushing new code to GitHub will trigger a build in Netlify,
which will fetch fresh data from DatoCMS!

## Integrating DatoCMS with Netlify

Almost done! The only missing piece left is to be able to deploy a new version
of our site whenever the data content changes. To do that, we need to a
"Deployment Environment" in DatoCMS. A deployment environment in Dato is how you
configure DatoCMS to re-build your site based on the services you're using.
After you've set up a deployment environment, you'll see these notifications
in the top right:

![DatoCMS deployment environment status displaying "Up to date"](/posts/dato-up-to-date.png)
![DatoCMS deployment environment status displaying "Out of date"](/posts/dato-out-of-date.png)
![DatoCMS deployment environment status displaying "In progress"](/posts/dato-in-progress.png)

DatoCMS has a great integration with Netlify that essentially makes this a one-click
setup. You authorize DatoCMS to your Netlify site, and it will more-or-less
do the rest. That said, I actually had some issues with that because at the
time it seemed that outgoing webhooks were not allowed on the free plan of
Netlify. This meant that I could trigger a build from DatoCMS, but Dato would
never be notified of the status of the build. This looks to not be an issue
anymore so if the integration works for you, then you should use it! Regardless,
I thought it would be interesting to see how to set up a custom deployment
environment using Netlify functions.

### Custom Deployment Environment with Netlify Functions

At the end of the day, communication between services is usually just each
service sending \`POST\` requests to each other. By utilizing Netlify's [functions
and event triggers](https://docs.netlify.com/functions/trigger-on-events/), we
can set up our own custom deployment environment.

First, we need to set up a build hook in Netlify:

![Netlify build hook](/posts/dato-build-hook.png)

This is the URL that we want DatoCMS to \`POST\` whenever it wants to trigger a
new build.

Then, within DatoCMS, choose "Custom webhook" to set up the custom deployment
environment:

![DatoCMS custom webhook](/posts/dato-custom-webhook.png)

Paste in the build hook from Netlify in the "Trigger URL" input. In the "Status notifications"
section, Dato is displaying the information that we need to send _back_ to
Dato from Netlify when the builds are complete. This is how Dato knows what
happened from Netlify. We'll need to create a new environment variable in
Netlify with this info:

![Netlify status URL environment variable](/posts/dato-status-url.png)

Lastly, we need to create two new functions: one named \`deploy-succeeded.js\`
and one named \`deploy-failed.js\`. The names are significant as they indicate
to Netlify that these are functions to be triggered when those specific
deploy events happened. In a \`functions\` folder:

\`\`\`js
// functions/deploy-succeeded.js
const fetch = require("node-fetch");

const { DATO_STATUS_URL } = process.env;

const data = JSON.stringify({ status: "success" });

exports.handler = async function (_event, _context) {
  let response;

  try {
    response = await fetch(DATO_STATUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response,
    }),
  };
};
\`\`\`

I'll leave the \`deploy-failed.js\` out, but it's pretty much the same except
with a different payload.

## Conclusion

Phew! After typing all of this out, I can definitely see how this type of
setup may seem overly complicated and you may be thinking that you might as
well just deploy a Wordpress site. In my case, I highly value a workflow that
allows me to iterate fast and also minimizes my overall maintenance cost.
Static sites are extremely low maintenance since there are no databases or
servers to deal with.

I can say that this set up has been running smoothly for months now and my
friends love their new CMS setup. They previously _had_ a custom Wordpress
site built for them by someone who had since abandoned them, leaving them
with an out-of-date Wordpress deployment and a pretty horrible editing experience.
If you enjoy building static site and want to extend your offering to allow
for dynamic content, I highly recommend giving this setup a try!
`,cc={title:"Eleventy + DatoCMS + Netlify",date:new Date(15768864e5),description:"Building a static site with a headless CMS"},uc={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/eleventy-datocms-netlify.md",rawData:`
title: Eleventy + DatoCMS + Netlify
date: 2019-12-21
description: Building a static site with a headless CMS`}});var wa={};f(wa,{_internal:()=>gc,body:()=>yc,collection:()=>hc,data:()=>fc,id:()=>dc,slug:()=>mc});var dc,hc,mc,yc,fc,gc,Da=h(()=>{dc="in-search-of-mocks.md",hc="blog",mc="in-search-of-mocks",yc=`
An obsession of mine lately has been figuring out a good way for my teammates and I test React components that rely on server requests.
Specifically, I'm looking for ways to:

- Setup a test with the _least_ amount of ceremony possible. Less ceremony means less friction for choosing to write a test or not.
- When doing that setup, be able to only specify specifically which pieces of data I need for that test and nothing more so it's clear what's important for the test.
- Assert what was sent to the server during my test. In some cases, this is the only way to really verify that something worked as expected.
- Easily mock one-off errors in tests.
- Have a good base of mocks with realistic data that can be overridden per test as needed

We're full in on the testing philosophies of [React Testing Library](We've already gone full ahead with the
) and [Kent C. Dodds](https://kentcdodds.com), but how far do you take it?

This will be a brain dump of some of my learnings along the way for my specific scenarios, so I don't expect it to apply to everyone but I wanted to write it down anyways.
Some things I'll be talking about:

- **Mocking abstraction layers** - At which layer do you apply the mock?
- **Mocked _data_ vs. mocked \\_responses\\_\\_** - What's the difference?
- **Mocking your entire backend in tests _and_ the browser** - E.g. [MSW](https://mswjs.io/) or [MirageJS](https://miragejs.com/)

At the end of the day, I've concluded that a tool like [MirageJS](https://miragejs.com/) or [Mock Service Worker](https://mswjs.io/), plus some sort of in-memory database really capture everything I need.

## Mocking Layers

> See: [Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch) by Kent C. Dodds.

As I mentioned above, I very much subscribe to the [Kent C. Dodds](https://kentcdodds.com/) method of testing React components.
Specifically, I like to test as few implementation details as possible and minimize mocking so that I can have high confidence that things are working and easily swap out implementation details.
In my position at work, we're constantly rebuilding and trying new experiments, so it's important to me to be able to write tests that will survive those changes.
I'm generally less concerned with what "kind" of test I'm writing (unit, integration, etc.).

So knowing that, my first point of research was around figuring out which point to start mocking out server responses.
And at this point I've (again) agreed with Kent that mocking at the _network_ layer is the way to go.
Kent's article above lays out a lot of this really well, but here's my own take.

Let's use this code for all of the examples:

\`\`\`jsx
function CreateLabel(props) {
  let { api } = props;
  let [value, setValue] = React.useState("");
  let [msg, setMsg] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    // Simplified for the sake of the example
    api
      .post("/label", {
        data: value,
      })
      .then(id => {
        setMsg(\`Success! Created label with id \${id}\`);
      }, err => {
        setMsg("Error!")
      }));
  }

  return (
    <div>
      {msg}
      <form onSubmit={handleSubmit}>
        <label htmlForm="label">Label</label>
        <input
          id="label"
          value={value}
          onChange={evt => setValue(evt.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
\`\`\`

A pseudo-component that shows an input and a submit button, posts to a theoretical API on submit, and then prints a message to the screen.
And we'll that the theoretical API looks like this:

\`\`\`js
export let api = {
  post(url, config) {
    // Does some manipulation and then calls out to \`fetch\`
    return fetch(url, config);
  },
};
\`\`\`

There are different points at which we could mock out the network call for this component.
I see them roughly like this:

- **Dependency Injection** - Test injects a mock \`api\` value. Network client is never hit
- **Mocked Client** - Test mocks the network client. Environment call is never hit (\`fetch\` or \`xhr\`)
- **Mocked Environment** - Test mocks at the environment level. Client is hit but the real \`fetch\` is never called
- **Network Intercept** - Test intercepts actual network requests and allows for custom response. Real \`fetch\` is called and the test asserts on custom responses. (Example: Nock, MSW, Mirage)
- **Network Intercept + Mocked data layer** - Test intercepts network requests, but requests are handled with actual logic mimicking production code and write to an in-memory database. Tests assert on the database. (Example: Mirage JS)

![Mocking layer](/posts/mock-layer.png)

### Dependency Injection / Mocking \`fetch\`

For a long time I really only considered two ways of mocking this component: Dependency injection or mocking the client.
Dependency injection would look like this:

> I'm using [React Testing Library](https://testing-library.com/docs/react-testing-library) here.

\`\`\`jsx
test("CreateLabel can create a label", async () => {
  // In a test
  let mockApi = {
    post: jest.fn(() => Promise.resolve(123)),
  };
  render(<CreateLabel api={mockApi} />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(mockApi.post).toHaveBeenCalledTimes(1));

  // Assert we called our mocked API _with_ the value we typed
  expect(mockApi.post).toHaveBeenCalledWith("/label", { data: "Home" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
\`\`\`

We're passing in a mocked API so that we can make a direct assertion on what was called.
This is kind of nice because everything is in one spot and there aren't many abstraction layers, so things are easy to follow.

However, as stated in Kent's article above, this strategy has some downsides as well:

- It doesn't exercise the logic in the \`api\` at all. A separate test is needed for that.
- It ties your API implementation details to your component. In your test, you have to know that your component calls \`api.post\`. If you later change this logic, you'll have to update your test.
- Further on the last point, your response from your mock API is hard-coded. If you later change your API response to return an object like \`{ id: 1}\`, you'll have to update your test.

A closely related strategy to this is mocking one level up at the \`fetch\` level.
That might look like this:

\`\`\`jsx
test("CreateLabel can create a label", async () => {
  fetch.mockImplementationOnce(() => Promise.resolve(123))

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  // Assert we called our mocked API _with_ the value we typed
  expect(fetch).toHaveBeenCalledWith("/label", { data: "Home" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
\`\`\`

This is better than dependency injection because we're now excercising our \`api\` logic and removing some implementation details in our test.
But, we still have the issue of hard-coding the response from the API _and_ we can also see another implementation detail: \`fetch\`!
The fact that we're mocking \`fetch\` means that we're not actually testing that we're calling \`fetch\` with the correct arguments.

To move further up the mocking layer, let's talk about some other things first.

## Mocked Responses vs. Mocked Data

So let's say you're convinced that mocking at the \`environment\` isn't the best solution.
The next layer for mocking would be to call the APIs in the environment that make network calls, but intercept those calls so they don't actually hit the network.
This is where something like [\`msw\`](https://mswjs.io/) comes in:

\`\`\`jsx
import { rest } from 'msw';
import { server } from './test/server';

test("CreateLabel can create a label", async () => {

  // Tell our "server" to intercept POST requests to \`/label\` and respond
  // with this specific response
  server.use(
    rest.post('/label', (req, res, ctx) => res(ctx.text(123)))
  )

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
\`\`\`

This is interesting because there's no mocking of \`fetch\` anywhere.
We could theoretically switch our entire client layer to use \`xhr\` if we wanted and this test would still pass.

You may have noticed that we're no longer asserting what we called our API with.
We could still do that here by making the response a mocked function.

\`\`\`jsx
import { rest } from 'msw';
import { server } from './test/server';

test("CreateLabel can create a label", async () => {

  // Tell our "server" to intercept POST requests to \`/label\` and respond
  // with this specific response

  // Use a mock function that we can assert on later
  let handler = jest.fn((req, res, ctx) => res(ctx.text(123)))

  server.use(rest.post('/label', handler))

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));

  // Assert things about the last call. This will be a bit cumbersome because
  // it's the full request. Likely could create a helper like:
  expect(getLastRequestBody(handler)).toHaveBeenCalledWith({
    data: "Home"
  })

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
\`\`\`

This is pretty good!
But, there are still a few short-comings with this:

- The test is still coupled to the network API details through the URL of the request. If we want to change the endpoint this component hits, we'll have to update our test. This could be a perfectly fine trade-off depending on your needs.
- We're still hard-coding the response payload in the test. If we have other tests that hit this endpoint, we'd be hard-coding that data there as well. If the payload changes, we'd need to update all places that use it.

Another interesting short-coming is that as things get more complicated in your app, you essentially have to implicitly implement your backend logic through your mocks.
Here's an example of what I mean:

Say that our example above actually makes _two_ network calls: One that posts to create the label, and then another that refetches all labels to get the latest data:

\`\`\`jsx
function CreateLabel(props) {
  /* ... */

  function handleSubmit(evt) {
    evt.preventDefault();

    // This is simplified for the sake of the example
    api
      .post("/label", {
        data: value,
      })
      .then(id => {
        setMsg(\`Success! Created label with id \${id}\`);

        // Refetch all labels so we have the latest data
        return refetchAllLabels()
      }, err => {
        setMsg("Error!")
      }));
  }

  /* ... */
}
\`\`\`

Assuming we want to assert something about that refetching in our tests, we have to set that up in our mocks;

\`\`\`jsx
import { rest } from "msw";
import { server } from "./test/server";

test("CreateLabel can create a label", async () => {
  // Tell our "server" to intercept POST requests to \`/label\` and respond
  // with this specific response

  // Use a mock function that we can assert on later
  let handler = jest.fn((req, res, ctx) => res(ctx.text(123)));

  server.use(
    rest.post("/label", handler),

    // Intercept this request too and ensure we're returning the same data
    // that our mocked post handler did
    rest.get("/labels", (req, res, ctx) => res(ctx.data([123])))
  );

  render(<CreateLabel />);

  // ...
});
\`\`\`

We have to intercept two requests now and line up each response so that they return related data, so in a sense we're doing what our backend would be doing with these requests.
You could say that this is unnecessary to do because the tests don't _really_ care that the same data exists in both responses, they just care that your response is what you said it would be.
This is fair, but in my opinion I think it also dilutes the readability of the test.
I think it's helpful to see in my test that, yes, this the endpoint returns the data that was created in this other endpoint because they are related and that's how the real thing works.
By encoding this information into mocks, you have this info spread through all of your tests.

So let's go one step further...

## Mocking Your Entire Backend

Instead of mocking individual requests, we can actual mock the _handlers_ of those requests and write to a mocked in-memory database.
The difference here is subtle, but interesting.
It's mostly easily demonstrated in the udpated test:

\`\`\`jsx
import { rest } from 'msw';
import { server, db } from './test/server';

test("CreateLabel can create a label", async () => {
  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(db.getLabels()).toHaveLength(1))

  let label = db.getLabels()[0]

  expect(label.title).toBe('Home')

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText(\`Success! Created label with id \${label.id}\`)).toBeInTheDocument()
});
\`\`\`

A couple of interesting things to point out:

- We don't mock each individual response, so the test is a lot shorter.
- We don't assert the arguments of the request, we _assert_ the result of the database.
- We're asserting _less_ about our implementation details. This may feel uncomfortable.

If you've ever written or peered into a backend test, it probably looks a lot like this.
You set up some things for the tests, perform an action, and then assert on the database.
The fact that our frontend test does this same thing is nice because I think it helps solidify the mental model of what's actually happening.

Setting this up with \`msw\` would depend on how you're making requests.
In my case, I'm typically using GraphQL so I'll show that as an example.
GraphQL is especially interesting because there's really only one endpoint and all of the logic is in the resolvers.

\`\`\`js
// test/server.js
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import schema from './my-schema.graphql';

let db = /* ... */

let root = {
  createPost(args, { db }) {
    let { title } = args;

    // Make a new 'post' in our database
    let newPost = db.create('post', { title })
    return newPost;
  },
  posts(_args, { db }) {
    // Return all of the posts in our db
    return db.get('post');
  }
}

export let server = setupServer(
  rest.post('/api/graphql', async (req, res, ctx) => {
    // Get the query and variables from the body
    let { query, variables } = req.body;
    let context = { db };

    // Make a real query against our schema!
    let response = await graphql(schema, query, root, context, variables);

    return res(ctx.delay(500), ctx.status(200), ctx.json(response));
  })
)
\`\`\`

As for the "database", it can be just about as simple or complicated as you want.

\`\`\`js
let data = {
  post: {},
};

export let db = {
  create(model, attrs) {
    let id = makeId();

    let thing = {
      id,
      ...attrs,
    };

    data[model][id] = thing;

    return thing;
  },
};
\`\`\`

Positives of this type of test are:

- All of your 'backend' mocking logic lives in one spot. It can be updated here and all tests will get the udpates.
- It removes _all_ implementation details from your test. Not even which endpoints you are calling are part of the test.
- It's (in theory) very close to how the real system works
- In the case of GraphQL, it's making a real query against your real schema. It can catch if you are returning responses that don't match the schema, which ensures your test data always resembles production.

Downsides are:

- There's a lot more abstraction. It's now harder to see in your test everything that's in your component under test
- More test logic in the request handlers. The test is actually asserting on the test database logic, which can have its own bugs.

All together, this pattern essentially does what [MirageJS](https://miragejs.com/) does but I wanted to show that it can be done with msw as well.
The interesting thing about both of these tools, is that you can use both of them in the browser as well!
So you now have a way to develop new features against real data using the same production-like data you use in your tests.

## Slippery Slope

One argument I'm primed to take on with my co-workers is that this is essentially rebuilding our backend on the frontend.
In this simple example, the resolvers are easy, but in a real app things are complicated.
There are relationships between models and service calls to be made, etc.
That's all true and I think a trade off to be made for each team.
But at the end of the day, I think if you think of it as a development tool first, it will always be helpful.
The point is not to faithfully recreate exactly what your backend is doing, but to give an approximation of it and to have all of the logic in one place.
Remember, it's only a slight extension of doing this at the request level.
And ultimately, being able to hop down to mock out the request level should be the escape hatch.
If you have a test that's asserting on a complicated backend response, write a one-off request mock.
Use your shared database for mocks that are easy and can be reused across tests.
Writing my tests like a backend test with a database feels very strange at first, but I've found that it actually solidifies my understading of features _more_.

## Wrap Up

I'm still exploring all of this, but so far I'm pretty happy with this setup.
It ticks all of my boxes and feels like the right trade offs have been made...for now.
To sum up my current ideal setup, I've created a repo: [https://github.com/npbee/msw-jest-graphql](https://github.com/npbee/msw-jest-graphql).
`,fc={title:"In Search of Mocks",date:new Date(15921792e5),description:"A journey through various data mocking techniques for testing React apps (and GraphQL)"},gc={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/in-search-of-mocks.md",rawData:`
title: In Search of Mocks
date: 2020-06-15
description: A journey through various data mocking techniques for testing React apps (and GraphQL)`}});var va={};f(va,{_internal:()=>xc,body:()=>Dc,collection:()=>bc,data:()=>vc,id:()=>Ec,slug:()=>wc});var Ec,bc,wc,Dc,vc,xc,xa=h(()=>{Ec="learning-elixir.md",bc="blog",wc="learning-elixir",Dc=`
> This is a post in a series of posts about learning back-end topics as a front-end developer.

Along with learning full-stack topics recently, I've also been learning [Elixir](https://elixir-lang.org/). I'll be honest, I'm not sure I would have been so interested in learning about back-end things if it weren't for the added bonus of getting to use Elixir to do so. I've always had an interest in functional programming and other functional languages. I typically write JavaScript in a functional fashion and I've toyed with other specifically functional languages like Elm, Clojure, and even Haskell. In the little time that I've spent venturing outside the comfortable world of JavaScript, I've found that learning other languages can unlock patterns and paradigms that I may not have otherwise grasped. Even though these patterns may not be directly usable in JavaScript, they can still give perspective and sometimes even make the patterns that _do_ exist more understandable. It feels a little like "leveling up."

## First Impressions

Overall: fantastic. A few specific things that I enjoyed immediately:

**Documentation**

Docs are a first-class concept in Elixir and it shows. Packages can easily build docs from code and they all follow a [similar](https://hexdocs.pm/elixir/Kernel.html) design layout. This makes browsing documentation familiar regardless of the package. And bonus, the documentation works in the REPL!

![iex docs](https://s3-us-west-2.amazonaws.com/npbee/2017/learning-elixir/iex-docs.png)

**Testing**

This is another first-class topic that has built-in support in Elixir. I've found testing to be simple and intuitive for most cases.

**Mix**

Mix is the build tool for Elixir that allows you to run tasks, compile, fetch dependencies, etc. As a front-end developer, it's similar to \`npm\` so it quickly made sense.

**Community**

I've found the community to be very friendly and inclusive. I even submitted a [pull request](https://github.com/elixir-lang/elixir/pull/6310) to the language!

**Functional Goodness**

And of course, I love that it's a functional language. Writing in a functional style is one thing, but writing functional code in a functional language is another. Being able to write lots of concise functions and combine them into a larger applications is my preferred way to write applications and Elixir seems to be designed just for that.

And [pattern matching](https://elixir-lang.org/getting-started/pattern-matching.html) is \u{1F60D}.

## Second Impressions

Overall: still great. A few things that I started to struggle with:

**Composing Functions**

One thing that I love about writing functional code is composing functions together. By that I mean:

\`\`\`javascript
// In pseudo-javascript
const add1 = (x) => x + 1;
const times2 = (x) => x * 2;
const math = compose(add1, times2);

math(2);
//=> 5
\`\`\`

But surprisingly, this way of composing functions is not really used much that I've seen. The Elixir way of doing this might instead use the [pipe operator](https://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator).

\`\`\`elixir
defmodule Math do
	def add1(x) do
	  x + 1
	end

	def times(x) do
	  x * 2
	end

	def math(x) do
	  x
	  |> times2
	  |> add1
	end
end

Math.math(2)
#=> 5
\`\`\`

While everything you can do with compose can be accomplished by just defining functions, I do miss the \`compose\` function. The pipe operator is great, though!

**Pragmatism**

The pragmatic approach to the language is something that I've seen referred to a number of times. Pragmatism may have a different meaning to other people, but for me it mostly just means it can help you get things done. Elixir is a functional language, but it's not _pure_ functional language. That means you can do things like perform side effects in functions. While I generally try my darnedest to _not_ rely on side effects, I will say that it's nice to be use them on occasion. Writing completely side-effect free code takes diligence from an entire team and I can understand how that may be a hinderance to small teams trying to push out features. Overall I've found Elixir to have a nice balance of strictness and pragmatism that's resulted in some really maintainable code.

## Similarities / Differences

As I've gone through learning Elixir and implementing various features, I've started to notice how things _somewhat_ relate to familiar front-end concepts for me. Most of these comparisons are definitely not one-to-one, but I think they have helped me solidify a few things in my mind.

**Elixir Compiler ~ Babel**

Elixir is a compiled language, so that means before you can do anything with it, you have to transform it into something else. In the case of Elixir, your source code is compiled into Erlang. In the case of most modern JavaScript, your source code is compiled into...well, different JavaScript. Elixir is compiling into a completely different language whereas JavaScript is just compiling into a different version of itself. It might be an even closer comparison if you happen to be using experimental JavaScript syntax, like maybe the [pipe operator](https://github.com/tc39/proposal-pipeline-operator). In that case, you're using syntax that _must_ be transformed into code that the browser can understand, so you're essentially writing a different language.

**Pattern Matching ~ Destructuring**

This comparison is a bit of a stretch, but I can't help but note the syntactical similarities. In Elixir, you can use pattern matching to do something like:

\`\`\`elixir
# pattern matching
%{a: a, b: b} = %{a: 1, b: 2}
#=> a == 1
#=> b == 2
\`\`\`

In JavaScript, you could do:

\`\`\`javascript
// Destructuring
const { a, b } = { a: 1, b: 2 };
//=> a === 1
//=> b === 2
\`\`\`

These two things are definitely _not_ the same, but somehow I think learning about restructuring first gave me a head start on pattern matching. The downside is that it can be a little sad when you try to write an Elixir pattern match in JavaScript and realize you can't!

**OTP ~ Redux**

[OTP](https://elixirschool.com/en/lessons/advanced/otp-concurrency/) is one of the core principles of Elixir and Erlang. I can't say that I've mastered it yet, but I can almost see similarities with [Redux](http://redux.js.org/). When you use a [GenServer](https://elixir-lang.org/getting-started/mix-otp/genserver.html) in Elixir, there's this idea of functions that handle specific calls by receiving the state, doing something with it, and returning a new state:

\`\`\`elixir
defmodule SimpleGenServer do
  use GenServer

  ### ...

  def handle_call({:add, value}, _from, state) do
    {:reply, value, state + 1}
  end

  ### ...
end
\`\`\`

This could be seen as a type of reducer from Redux:

\`\`\`js
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    default:
      return state;
  }
}
\`\`\`

Of course, OTP is much more robust.

**Macros ~ Babel Transforms?**

[Macros](https://elixir-lang.org/getting-started/meta/macros.html) are the sort of thing that can really break your brain the first time you try to learn about them. Using macros, you can write code that _writes_ code. Because Elixir is compiled, it allows you to hook into that compilation step and use it to your advantage to write things like custom syntax or help with code reuse. In JavaScript land, Babel transforms could be potentially thought of as macros. For example, [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) turns this:

\`\`\`javascript
<div>hello</div>
\`\`\`

...into this when Babel compiles it:

\`\`\`javascript
React.createElement("div", {}, "hello");
\`\`\`

There's nothing stopping you from writing the compiled version, but using the Babel transform can make things clearer or faster to write (if you're into JSX).

## Conclusion

I've really enjoyed learning Elixir and I'm excited to keep going with it. Besides JavaScript, it's the only other language I've really taken a deep dive on and I think it's been a great second language to learn. Topics like macros and concurrency are challenging in any language, but I think learning them with Elixir has been very approachable.
`,vc={title:"Learning Elixir",date:new Date(15031872e5),description:"Some thoughts on learning the Elixir language."},xc={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/learning-elixir.md",rawData:`
title: Learning Elixir
date: 2017-08-20
description: Some thoughts on learning the Elixir language.`}});var Fa={};f(Fa,{_internal:()=>Bc,body:()=>Ic,collection:()=>kc,data:()=>Sc,id:()=>Fc,slug:()=>Cc});var Fc,kc,Cc,Ic,Sc,Bc,ka=h(()=>{Fc="local-first-challenges.md",kc="blog",Cc="local-first-challenges",Ic=`
Recently I've been getting excited about [local-first](https://www.inkandswitch.com/local-first/) applications so I thought I would try my hand at building one.
The app will be a personal songwriting tool for organizing, versioning, and making notes on in-progress songs. Sort of a personal Soundcloud app of sorts.
I think I've finally settled on a decent architecture, but the process has forced me to rethink some of my go-to patterns that I use to build on cloud-based software.

## Am I the Client or the Server?

In my normal day-to-day work I'm almost always writing code for the _client_.
You want data? Make an HTTP request from the _server_ to get it.
You need a file? Make an HTTP request from the _server_.
In a local-first app those boundaries aren't as clear.
I can write a SQL query right next to my React component!

\`\`\`tsx
function SomeComponent({ db, id }) {

  async function updateName(name) {
    await db.execute(\`
      UPDATE songs
      SET name = ?
      WHERE id = ?
    \`,
    [name, id]
  }

  return (
    <input
      onChange={evt => updateName(evt.target.value)}
    />
  );
}
\`\`\`

## Storage? Also Syncing. And undo/redo. Oh also searching?

So far I've found it challenging to get all of these features out of the box.
Like anything in software, the architecture needs to be based on the needs of the application.
One of the best parts about local-first apps is that your data is truly local.
But that also means that if you _want_ that data to be available elsewhere (like on a phone perhaps), then you have to figure out how to sync the data.
Additionally, if you want multiple people to interact with that data you need to think about merging and conflict resolution.
Tying in undo/redo into syncing and conflict resolution makes all of that a _hard_ application to build.

The rage right now for local-first apps is [CRDTs](https://crdt.tech/).
I'm still wrapping my head around it, but I understand enough to know that I don't want to build this myself.
There are a couple of libraries out there that do this like [Automerge](https://automerge.org/) and [Y.js](https://yjs.dev/).
Y.js in particular seems pretty darn good as it has syncing and undo/redo out of the box.

The last challenge that relates here is searching.
For a local-first app, it feels strange to _not_ choose SQLite since it can easily and efficiently search and query.
Using a CRDT library feels like it forces data into a document-based storage format which conflicts a little with how one might typically structure a SQLite database.

Can you have a CRDT data structure that supports undo/redo and store that in SQLite?
Probably, but I haven't figured it out yet.
`,Sc={title:"Challenges of a Local-first App",date:new Date(16579296e5),description:"Blurring the lines of client and server"},Bc={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/local-first-challenges.md",rawData:`
title: Challenges of a Local-first App
date: 2022-07-16
description: Blurring the lines of client and server`}});var Ca={};f(Ca,{_internal:()=>Pc,body:()=>Mc,collection:()=>Tc,data:()=>_c,id:()=>Ac,slug:()=>jc});var Ac,Tc,jc,Mc,_c,Pc,Ia=h(()=>{Ac="on-full-stack.md",Tc="blog",jc="on-full-stack",Mc=`
In the past few months I've had the chance to work on features that required back-end work. While the features may have been typical tasks for a back-end developer, they were new territory for me. As a front-end developer, I've generally been able to get pretty far only knowing the minimal amount of back-end subjects to get my front-end work done. As I mention below, I think there is some merit in being blissfully ignorant in some areas so that you can focus more on your specialty areas. But, I also think this approach can lead to knowledge gaps, which has definitely been the case for me. Black holes of web development topics that I _sort of_ understand, but not quite enough to explain. Getting out of my comfort zone has allowed me to explore those unknown areas and remove some amount of "magic" from my understanding.

## Background

To give some context, I have had _some_ experience touching back-end areas, but this experience was limited to basic CRUD operations using Ruby and PHP. I do think this experience contributed in some way to my overall understanding, but not in a significant way. I might say up until a few months ago, I understood things like:

- The basics of HTTP and communication between the front-end and back-end (e.g. \`GET\`, \`POST\`, etc.)
- Primitive database knowledge. I knew that there were tables of "things" that may have columns that point to other tables of other things.
- The gist of authorization and authentication. I understood as much as I needed to about session cookies and authentication to get by as a front-end developer.

## Specialist Vs. Generalist

I've always considered myself more of a specialist than a generalist. I enjoy going deep on topics and really trying to become an expert on them. I'm of the opinion that there are just too many topics to cover in web development to ever really _know_ all of them. Being a "full-stack" engineer was never something I aspired to because I felt like I'd be overwhelmed trying to become an expert in too many topics. My experience working with full-stack engineers has been that most are closer to back-end engineers than front-end engineers. I also feel that a specialist may be a better career choice in the long-term, though I don't have any actual data to back that up.

Despite my tendency towards being a specialist, I still love learning things and find it hard to turn down opportunities to do so. I've found that learning opportunities that come up at my job are especially beneficial because they have _true_ business use cases. It's not a todo list tutorial, but something that might bring real value to the business. Not that todo list tutorials don't have their place, but the real-life context of learning things on the job adds an amount of motivation they may otherwise be hard to muster on your own.

## Conclusion

I've dubbed 2017 as "the year of learning back end" for me and I've had a great experience so far. While I don't see myself transitioning to a full on back-end developer anytime soon, I think that becoming a better overall developer can absolutely help me become a better front-end developer. Who knows? Maybe I'll transition to a seemingly-rare full-stack engineer that leans towards the front-end instead of the back-end. I often look at web development as a big puzzle where I'm just learning how different pieces fit together. These new back-end bits are just a few of those stubborn, oddly-shaped pieces that help me see the whole picture a little bit better.
`,_c={title:"On Becoming Full Stack",date:new Date(15031008e5),description:"Taking on new roles as a front-end engineer"},Pc={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/on-full-stack.md",rawData:`
title: On Becoming Full Stack
date: 2017-08-19
description: Taking on new roles as a front-end engineer`}});var Sa={};f(Sa,{_internal:()=>$c,body:()=>Hc,collection:()=>Lc,data:()=>Oc,id:()=>Rc,slug:()=>Nc});var Rc,Lc,Nc,Hc,Oc,$c,Ba=h(()=>{Rc="rich-text-2018.md",Lc="blog",Nc="rich-text-2018",Hc=`
If you're building a web app that allows users to write free-form text in 2018,
it's very likely that you'll come upon the need to present that text with
various formatting options like **bold** or _italic_, so called [_rich text_](https://techterms.com/definition/richtext).
In fact, I'd wager to say that it's almost a requirement to have some kind of
rich text editing interface for any kind of business-user-facing web app because
it's such a universally needed feature.

Dealing with rich text on the web is an interesting problem, but it's interesting
because it's...well, uninteresting. Users have been inputting rich text for years
in word processors like Microsoft Word, so the interaction details are somewhat known
and established. There's not much in the way of exciting, modern UX to build here,
so in that sense it's a little uninteresting. In that same sense, though, it's also
a _win_. Anytime you can build a web experience that users already know how to
use and lets them get stuff done is a good thing in my opinion.

However, just because it's fairly established as a UX pattern doesn't mean it's
completely solved as an implementation. It's been my personal mission the last
few weeks to solve this problem for an app we're building at [HelloSign](https://www.hellosign.com),
so I've been deep in the weeds of this topic. During my research I found lots
of good content on the surface-level implementation details, like which libraries
are out there and the various techniques for building a rich text editor component.
But I found it difficult to find information on some of the deeper, more practical
problems that I was facing, like:

- How do I store this in my database?
- How do I handle both the editing _and_ displaying of the rich text in different contexts? Are those two concepts the same thing?
- What about things like "mentions" that's not really just text?
- What about security?

So I thought I'd write a bit about those particular aspects. This won't be an
article about the specifics of building a rich text editor, although I may add
one of those next!

## What is rich text and why is it difficult?

Before going further it's probably best to give some context on what exactly I mean
when referring to rich text. Here's a quick screen shot of a rich text editor
from [Atlassian's component library](https://atlaskit.atlassian.com/examples/editor/editor-core/full-page):

![Example of a rich text editor](/posts/rich-text.png)

The way I think about rich text is that it's plain text with additional structural
and formatting information attached directly to it. I also think of rich text as
having a few different vantage points:

- From the perspective of the user, it's just text that's visually displayed with the chosen formatting (we'll get to things like "mentions" later).
- From the perspective of the browser, it's HTML. This may seem obvious, but I find it helpful to call it out in order to distinguish this point of view from the next one.
- From the perspective of the developer, it's data. Ultimately, rich text cannot be represented with just text, so it needs to be represented as some
  sort of data structure. This _could_ also be HTML but it could also be another format, like JSON or markdown. More on that later.

Having these three perspectives helped me work towards a solution that fit my
needs but it also highlights why this problem can be a difficult one to solve. Like most
problems in web development, I found that there was really no one "correct"
solution. Each piece of the solution relied on various aspects of my own
particular needs. Trade offs were made.

For me, I found a few of the core considerations for the problem to be:

- What kind of content will users be allowed to enter?
- What are all of the rendering contexts that need to be supported?
- How will security be handled?
- What other processes need to interact with the rich text content?

Continuing to ask these core questions along the way in my research helped me
work towards a reasonable (_I hope_ \u{1F62C}) solution.

## Database storage

Before moving forward with much else, I wanted to have an idea of the kinds of
inputs and outputs I'd be dealing with and how I'd store and retrieve those
values from the database. There were a few options that I'd found being used
in the community.

### HTML

Most WYSIWYG (_what-you-see-is-what-you-get_) editors of the past worked strictly with
HTML. Meaning, you start with a blob of HTML and you get out a blob of HTML.
An example would be an editor like [TinyMCE](https://www.tinymce.com/) or [CKEditor](https://ckeditor.com/).
This makes plenty of sense and existing libraries still do this today. After all,
HTML is the language of the web. It's a standardized, familiar syntax that's
easily interoperable with anything that can understand HTML.

Storing the rich text value as HTML would mean storing a text value like this:

\`\`\`html
<p>Open the console to see the <em>html.get</em> method working.</p>
<p><span style="font-size: 18px;">HELLO</span></p>
<p>
  <span style="font-size: 18px;"
    ><a href="https://google.com">GOOGLE LINK</a></span
  >
</p>
<p><br /></p>
\`\`\`

If you're at all security-minded, storing user-generated HTML probably sets
off some red flags. Anytime you are storing user-generated content with the intent
of rendering that content back out on the screen, you are vulnerable to [XSS](<https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)>) (Cross-site-scripting)
attacks. Technically while any user-generated content is vulnerable to this, I
feel it's particularly relevant when dealing with rich text stored as HTML because
it's likely that it will be rendered back out _as_ HTML (e.g. \`element.innerHTML = storedHTML\`) which is where XSS usually
comes in to play.

That said, storing HTML is perfectly valid and is still used today. There is a way to handle it that's
reasonable safe. A general strategy could be to sanitize the generated HTML for XSS concerns
and use a whitelist approached to strip out anything that you deem not appropriate.
There are plenty of libraries that do this ([DOMPurify](https://github.com/cure53/DOMPurify) is one).
And note that you usually want to do this on _both_ inputs and outputs, so sanitize
on the server before saving to the database and before rendering to the screen. This will give you a
reasonably safe implementation, but some security devs may still not love it.
Storing HTML in the database can feel a bit like a ticking time bomb that can blow
up some point way in the future if you forget to follow one of the security steps
when saving or rendering.

A few interesting points I noticed about using HTML to store rich text values:

**It's very powerful for styling options**

This can be seen as either a good thing or bad thing. In the example above, to
be able to display a custom font size the \`font-size\` property is added:

\`\`\`html
<span style="font-size: 18px">words</span>
\`\`\`

This gives the client a pretty powerful mechanism for generating the exact
visual representation that it wants without much room for interpretation. This
could be a good thing if you need users to be able to expressive lots of
different visual formatting and you just want to retrieve this value from the
database and drop into an HTML page. However, there could be a case to be made
that it's _too_ powerful. The client could generate this:

\`\`\`html
<span style="font-size: 3000px">words</span>
\`\`\`

It's unlikely clients need the power to render font sizes at 3000 pixels!

**It's a more literal representation of the contents**

The HTML generated in the example above is a very literal representation of the
contents. Meaning, it represents text with _exactly_ a font size of 18 pixels.
If you're only rendering within the context of web browsers and you want to be able to
stick the generated content on a page and be done with it, this can be a good
option. However I find that in some cases it can be better to leave yourself
with room to evolve your UI. For example, instead of saving a literal font size
value maybe you save something like this:

\`\`\`html
<span class="f-1">words</span>
\`\`\`

In most cases, that's probably not what you want. Sure you can validate this
on both the client and the server, but it may become difficult to keep up with
all of the different ways HTML can make for some horrible looking web pages.

Similar to how you might style a regular webpage, you likely don't style with
exact pixel values but instead style with classes that represent relative values
that you can evolve and change over time. It also could allow you to represent
that text differently for different rendering contexts if you need to. For example,
maybe you're rendering to a PDF that uses a different font family so the pixel
value needs to be slightly different.

Exploring the idea of storing my rich text as HTML began to highlight the fact that
there is a difference between storing the literal content of the rich text and
storing a _description_ of the rich text. For my use case, I wanted pretty tight
control over how my rich text rendered and even had different eventual rendering
targets (more on that later), so I realized that if I were to use HTML I would
essentially be using HTML as a data format. Meaning, I likely wouldn't allow
just _any_ HTML to be stored, it would be a controlled subset with a specific
structure that I could potentially render in different ways to different targets.
In fact, there's a good article by one of the project leads for CKEditor that
describes using HTML as the data format for rich text: [A Standard for Rich-Text Data](https://medium.com/content-uneditable/a-standard-for-rich-text-data-4b3a507af552).

### Markdown

To take a step back from HTML, my first thought for an MVP-like solution to this problem was to support [Markdown](https://daringfireball.net/projects/markdown/syntax).
Markdown is a fairly well-known syntax for doing basic formatting. It's used on
developer-centric sites like Github and StackOverflow. Markdown is a nice solution
because it avoids a few of the security issues (but not all!) with HTML and doesn't require any
kind of special client-side components to work with. It's still plain text when
it's entered by the user and only turned into HTML when saved to the database or
rendered to the browser. The syntax is small and relatively standardized so it's
likely there will be plenty of existing libraries to choose from that can take
Markdown and spit out HTML.

The issue with Markdown is that, by design, only supports a very limited set of
formatting. If you're just doing bold and italic formatting, then Markdown will
work just fine. If you're doing anything more complex, like colors or font families,
then vanilla Markdown won't help you. There are some extensions and "flavors" to
Markdown for extending the syntax, but at that point I think Markdown starts to
lose a little bit of its original value. Markdown is not really meant to do
much more than basic formatting. Anything outside of basic formatting and Markdown
yields to just allowing arbitrary HTML, in which case you're back to dealing
with all of the points mentioned in the above section.

I like the idea of Markdown and I think it makes sense if you're able to stick with
basic formatting.

### JSON

If you've decided that you want to store a description of your rich text data to
your database, JSON seems like a natural choice. In fact, many modern rich text
editors represent their contents not with HTML but with a custom data structure
that can be easily serialized to JSON. QuillJS has a [Delta](https://quilljs.com/docs/delta/)
format, ProseMirror has a [Document](https://prosemirror.net/docs/ref/#model.Document_Structure),
and DraftJS has its own [EditorState](https://draftjs.org/docs/api-reference-editor-state.html).

Based on what we've discussed so far, here are some good things about storing rich
text as JSON:

- It's more secure against XSS by default. You can't just pass a string of JSON
  and render it as HTML.
- It can represent any kind of content and formatting you might need
- It can be easily parsed, validated, and manipluated by almost any system
- It's a description of the content, so it can be rendered differently to different targets

Those good things also come with some downsides:

- No standardization. There is no _one_ JSON format for rich text. Each library
  implements their own version which can lead to lock-in
- More code. Because you can't just render JSON to HTML, that means you need to
  write code that knows how to do that.

JSON can be a good option for any reasonably complex rich text editor needs if you're
willing to write more code. A way of dealing with library and JSON format
lock-in is to make sure you a strategy for migrating and making changes over time.
Using a [JSON Schema](http://json-schema.org/) definition with a version number
is a good way to do that.

There are also explorations into standard-ish formats for representing rich text.
[Mobiledoc](https://github.com/bustle/mobiledoc-kit) and [Portable Text](https://github.com/portabletext/portabletext) are two that I've seen in this area.

## Rendering outside of the editor

Another interesting consideration when thinking about rich text is where you're
going to need to render that rich text. In some cases, you only need it in the
context of an editor. Something like Dropbox Paper or Google docs is an example.
You only ever pull that rich text up in the editor so you can be free to optimize
for that rendering target. But in some cases you have both the editing context
_and_ the rendering context. For example, you may be editing rich text in the
admin section of a blog, saving it to the database, and then rendering it back
out on a completely separate page. In those cases, you need a way to render that
rich text to the screen directly from the database. HTML has an advantage here
because it can just be rendered directly. JSON must be encoded to HTML somehow
first. Some solutions to this require that a read-only instance of a rich text
editor be loaded up to render the custom JSON format. I've found most rich text
libraries to be pretty heavy so in my opinion this is not ideal. However, a
JSON format that is simple enough can be fairly easily encoded into HTML without
the need for the entire editor library. This also can help negate some of the
security issues with rendering user-generated content. A controlled "renderer"
will only render the things it knows about and likely will be rendering actual
user content as text, not HTML.

## Summary

There's probably a lot more I could say about rich text.
I found it to be a deep, challenging, and, at times, overwhelming topic for a seemingly universal need for most web apps.
For my own use, I ended up going with [ProseMirror](https://prosemirror.net/) but it's not without its own tradeoffs.

## Thanks

Big thanks to Atlassian for their open-source code in [AtlasKit](https://atlaskit.atlassian.com/) which was a great help in seeing how a real-world rich text eidtor could be built.
`,Oc={title:"Rich Text on the Web in 2018",date:new Date(15306624e5),description:"Thoughts on building a rich text editor"},$c={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/rich-text-2018.md",rawData:`
title: Rich Text on the Web in 2018
date: 2018-07-04
description: Thoughts on building a rich text editor`}});var Aa={};f(Aa,{_internal:()=>Jc,body:()=>Wc,collection:()=>Uc,data:()=>Gc,id:()=>qc,slug:()=>zc});var qc,Uc,zc,Wc,Gc,Jc,Ta=h(()=>{qc="sentry-for-single-page-apps.md",Uc="blog",zc="sentry-for-single-page-apps",Wc=`
[Sentry](https://sentry.io) is an error-monitoring service that helps log, track, and resolve runtime issues in your applications.
I've used it for quite a while to manage errors in front-end apps that I've built and I thought I'd run through some tips and tricks that I've found to help make Sentry most useful.
We'll start with some basics and then increase the level of integration, ending with a fully automated Sentry setup with GitHub actions, source maps, and Sentry releases.

You can check an [example repo](https://github.com/npbee/sentry-releases-example) with working examples.

## What You'll Need

- A Sentry account and project
- A Sentry [Internal Integration](https://docs.sentry.io/workflow/integrations/integration-platform/#internal-integrations) set up with \`project:read\` and \`releases\` permissions.
- A continuous integration tool like Netlify or GitHub Actions
- The [\`sentry-cli\`](https://github.com/getsentry/sentry-cli) package

EXAMPLE REPO:

## The Basics

Assuming you have an account with Sentry and a project setup, the basics to get up and running with Sentry is to use the browser SDK to initialize it as soon as possible in your app:

\`\`\`js
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: /* your DSN */
});
\`\`\`

You can think of the 'DSN' as the client key for your particular project.
This value is how Sentry ties errors in your runtime to a particular project in the Sentry dashboard.
Even with this basic setup you can get some good information about runtime errors.
Sentry does a good just wrangling stack traces across browsers to give you as much information as possible without much setup.
But, if you're using any sort of build process where your final asset output is not the same as your original source, you'll have a hard time diagnosing the rrors reports in Sentry.

<p class="full-bleed">
  <img alt="Sentry error without source maps" src="/posts/sentry-no-sourcemaps.png" />
</p>

To be able to show the original location of the error from your _source_ files, Sentry needs to access to the source maps of the application.
Before we get to sourcemaps, though, we need to talk about Sentry releases.

## Releases

A _release_ in Sentry is a particular build of your app.
It's how Sentry associates errors to distinct releases of your app.
Typically, any time you build your single-page app you'll create a new release.
Every release must have a distinct _version_ or identifier so that it can be differentiated from other releases.
This identifier is up to you to create, but typically it will likely be the Git hash of the commit your building, or perhaps the \`version\` from the \`package.json\`.

\`\`\`js
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: /* your DSN */,
  release: /* your release */
});
\`\`\`

Since you won't want to manually type out your \`dsn\` or \`release\` value each time, you'll want to set those up as environment variables that can be read at build time when you're application is being assembled for release.
The way you include these variables will change depending your toolchain, but most popular bundlers include ways to do this.
For Webpack, you can use the \`DefinePlugin\` plugin to make these values available at build time:

\`\`\`js
new webpack.DefinePlugin({
  SENTRY_DSN: /* However you're including your DSN */,
  SENTRY_RELEASE: /* read from git hash or package.json */,
});
\`\`\`

For my example, I'm going to use [Parcel](https://parceljs.org/) because it's a bit simpler for smaller apps, but the concept is the same.

\`\`\`js
import * as Sentry from "@sentry/browser";

Sentry.init({
  release: \`releases-example@\${process.env.npm_package_version}\`,
  dsn: /* the dsn */
});
\`\`\`

Here I'm using the special \`process.env.npm_package_version\` value that Parcel makes available by default.
It will replace the value with the \`version\` value from my \`package.json\`.

By including the release version in the SDK setup, Sentry will now show this as a 'release' and start to associate errors to it:

![Sentry releases panel](/posts/sentry-release.png)

Ok, back to source maps.

## Source Maps

In order to show the original source location for errors, Sentry needs to be able find the source maps for your app.
There are two ways to do that: public source maps or direct upload.
Public source maps means that Sentry will try to infer the public URL of your source map for the file related to the error, and the fetch that file and use it for the source mapping.
Using public source maps is the simplest because it requires the least amount of work on your end and in fact I've run apps perfectly fine this way without many issues.
However, public source maps can be brittle and have multiple opportunities for something to go wrong, leaving you without source maps for your error logs.
Sentry recommends uploading source maps directly and I think it's a good idea as well.
Making the source map upload an explicit part of your build step ensures that you'll always have source maps for your error logs _before_ you deploy your app.

### Building & Uploading Source Maps

Building source maps is another common setting for popular bundlers, and is enabled by default for Parcel.
Running \`parcel build\` will automatically create source maps.

The recommended way to upload source maps is to use the \`@sentry/cli\` package.
In order to properly associate the source maps with the correct release, we have to use the \`version\` identifier we created earlier.

## Continuous Integration

Now let's take what we know and start setting up the commands needed to automate the Sentry workflow we have so far.
Assuming you have some way of running commands for a particular commit or build, we can set up a \`build\` command that does what we need so far.
In general, the workflow will be:

1. Create a 'release' in Sentry
1. Build our assets, using the release version from step 1
1. Upload the source maps created from step 2, again using the release version
1. Finalize the release in Sentry
1. Deploy the app

To make all of this happen, we also need at least the following environment variables available:

\`\`\`bash
SENTRY_ORG=xxx
SENTRY_PROJECT=xxx
SENTRY_AUTH_TOKEN=xxx
\`\`\`

The way you provide these variables depends on your continuous integration tooling.
For the \`SENTRY_AUTH_TOKEN\`, you'll need to create an [Internal Integration](https://docs.sentry.io/workflow/integrations/integration-platform/#internal-integrations) within Sentry which will provide you with an authorization token for use with the Sentry CLI.

Here's an example of how to create the CI command:

\`\`\`js
// In package.json
{
  "scripts": {
    "build": "./scripts/sentry"
  }
}
\`\`\`

\`\`\`bash
#!/bin/bash

VERSION=$(node scripts/get-version.js)

echo "Building version: $VERSION"

npx sentry-cli releases new $VERSION
npx parcel build src/index.html
npx sentry-cli releases files $VERSION upload-sourcemaps dist --rewrite
\`\`\`

You'll notice I've created a little helper file for getting the correct version:

\`\`\`js
console.log(require("../package.json").version);
\`\`\`

Also notice that I'm using [\`npx\`](https://www.npmjs.com/package/npx) to run the Sentry CLI commands.
This makes it easy to install and use the \`@sentry/cli\` package that's installed locally to your project rather than relying on it being installed globally.

After build and uploading source maps, we can then 'finalize' the release and, if deploying immediately, mark it as deployed:

\`\`\`bash
# Finalize the release and mark it deployed
npx sentry-cli releases finalize $VERSION
npx sentry-cli releases deploys $VERSION new -e prod
\`\`\`

You should now be able to run this on your continuous integration tool and automatically create new Sentry releases with source maps.

## Git Integration

There's more we can do!
Sentry can now tell us which location our errors are coming from in our original source, but with a bit more work Sentry can also tell us which _commits_ an error came from.
To gain this power, you need to tell Sentry about the commit information associated with each release.
Sentry has integrations built for common providers like GitHub that ease the pain of this, but also provides a finer-grained approach which I'll go through as well.
For the GitHub example, after authorizing your GitHub account with Sentry, GitHub will begin sending commit data to Sentry.
The step you need to do is tell Sentry which of those commits are associated with the release you're building.
The Sentry CLI has a command to figure this out for you:

\`\`\`bash
npx sentry-cli releases set-commits --auto $VERSION
\`\`\`

Best I can tell, this essentially grabs all of the commits between now and the time you last released.
With this in, you'll start seeing commits associated with your release, as well as "suspect" commits in issues:

![Image of a 'Suspect commit' in Sentry](/posts/sentry-suspect-commit.png)

## Alt Git Integration

The Sentry GitHub integration works well and I'd recommend using it if possible.
However, you may in a situation where you cannot use Sentry's integration.
For example, if you're not keen on authorizing Sentry to your GitHub repo.
If that's the case, you can still tell Sentry about commit information, but you're responsible for finding the right commits, formatting them, and sending them to Sentry's API.
I've outlined a quick-and-dirty example of how to do that in the [example repo](https://github.com/npbee/sentry-releases-example) for this post, but essentially it involes what I listed above:

- Fetch the latest release for your project
- From the latest release, find the last commit hash
- Find all of the commits since that commit hash and \`HEAD\`
- Format each commit into a "patch set"
- Send all of this info to Sentry's API when creating the release

Unfortunately this is not straightforward and involves some parsing of the Git log to get the commits in the exact format Sentry's expects.

## Conclusion

Getting fully up and running with Sentry is no easy task, but I think it highly increases the value you can get out of the service.
`,Gc={title:"Sentry for Single-Page Apps",date:new Date(15818112e5),description:"Effectively using Sentry for single-page, JavaScript apps"},Jc={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/sentry-for-single-page-apps.md",rawData:`
title: Sentry for Single-Page Apps
date: 2020-02-16
description: Effectively using Sentry for single-page, JavaScript apps`}});var ja={};f(ja,{_internal:()=>Zc,body:()=>Xc,collection:()=>Vc,data:()=>Qc,id:()=>Yc,slug:()=>Kc});var Yc,Vc,Kc,Xc,Qc,Zc,Ma=h(()=>{Yc="ux-case-study-google-inbox.md",Vc="blog",Kc="ux-case-study-google-inbox",Xc=`
At work we\u2019ve been in the process of building a queue-like component for helping our admins deal with various tasks. As fans of Google Inbox we decided to use it as a reference for many of our UX decisions. It was for this reason that I started down the long and treacherous path of trying to figure out exactly how Google Inbox works. I spent more time than I care to admit wading through compressed and mangle code, so I thought I share the small bits that I learned along the way.

> Disclaimer: I\u2019m sure there are things that I\u2019ve misunderstood or missed, so please don\u2019t take each explanation as the complete truth.

## The Setup

First, I just want to do a quick run-through of the kind of environment we\u2019re dealing with here. Unfortunately, there is no \u201Cone weird trick\u201D to emulate what I saw. It\u2019s a complex choreography of time, CSS keyframes, and a bunch of Javascript.

Like any old site, when you first load the page you\u2019ll get a base payload of CSS and Javascript to get things started. The magic comes when you actually open a message. When this occurs, a new \`style\` tag is injected into the page. This \`style\` tag has the very specific responsibility of animating each messages on screen to its next position. The exact rules that are supplied will change depending various other bits of information: which message is being open or closed, the dimensions of each message, how many other messages are on the screen, etc. And practically as soon as the \`style\` tag is injected, it\u2019s gone.

<figure>
<img alt="Style Injection" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/style_injection.gif" />
  <figcaption><strong>Figure 1:</strong> Notice the flashing style tag right before the body</figcaption>
</figure>

Here\u2019s a sampling of the kind of style rules that are injected:

\`\`\`css
.t
  .top-level-item[data-item-id-qs="qs-gmail-thread-f-1526179305444074125-0"]
  > .V {
  display: block;
  height: 50px;
  left: 0px;
  opacity: 0.9999;
  -webkit-transform-origin: center top;
  width: 889px;
  will-change: -webkit-transform;
  -webkit-animation-name: swap-close-placeholder-fake-shadow-var-84,
    animation-placeholder-fake-shadow-swap;
}

@-webkit-keyframes swap-close-placeholder-fake-shadow-var-84 {
  0% {
    -webkit-transform: translate(0px, 0px) scale(1.0517435320584927, 27.34);
  }

  80%,
  100% {
    -webkit-transform: translate(0px, 0px) scale(1.0022497187851518, 1.00001);
  }
}

.t
  .top-level-item[data-item-id-qs="qs-gmail-thread-f-1526179305444074125-0"]
  > .U {
  display: block;
  height: 48px;
  left: 0px;
  opacity: 0.9999;
  -webkit-transform-origin: center top;
  width: 889px;
  will-change: -webkit-transform;
  -webkit-animation-name: swap-close-placeholder-var-84;
}

@-webkit-keyframes swap-close-placeholder-var-84 {
  0% {
    -webkit-transform: translate(0px, 0px) scale(
        1.044994375703037,
        28.354166666666668
      );
  }

  80%,
  100% {
    -webkit-transform: translate(0px, 0px) scale(1.00001, 1.00001);
  }
}
\`\`\`

Notice that the CSS is targeting specific elements with extremely precise animation measurements. These are not rules that a human would write. These are rules that are most likely generated by an application of some sort. The rules are also armed with exact width and height measurements. If you\u2019ve ever tried to animate height, you\u2019ve no doubt felt some pain as it\u2019s not easy. Knowing the exact height of the element you\u2019re trying to animate makes a huge difference and Google Inbox takes full advantage.

## A Few Examples

Now that we have a general idea of the kind of setup we\u2019re dealing with, let\u2019s dive into a few examples.

### The Fixed Header

We\u2019ll start with the simplest of the three: the fixed message header. This one is not particularly novel, but has a slight twist to make it interesting. The basic idea is that when a message is open, it\u2019s header sticks to the top of the page as you scroll past it:

<figure>
<img alt="Fixed Header A" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_a.gif" />
</figure>

This is done pretty much as you might expect. Javascript listens for the position of the top of the header message and once it\u2019s been scrolled past the top the of the viewport, its position is fixed. A small detail here is that there is also a \u201Cpusher\u201D div that makes sure to push the message contents down once the message header is fixed. This is needed because a fixed element removes it from the flow of the page, so the contents below it would have otherwise popped up. Here\u2019s what I mean:

<figure>
<img alt="Fixed Header - No Pusher" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_b.gif" />
	<figcaption><strong>Figure 2:</strong> Notice how the messages contents jump when the header becomes fixed.</figcaption>
</figure>

The twist is that the header will also switch to absolute positioning once you get to the point where the bottom of the header is the same as the bottom of the message. This gives a nice transition between fixed back to static, rather than just jumping straight back to static.

<img alt="Fixed Header - Absolute" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_c.gif" />

I\u2019ve put together an example implementation on Codepen:

<div className='embed'>
<div data-height="520" data-theme-id="0" data-slug-hash="bpGrmm" data-default-tab="result" data-user="npbee" data-embed-version="2" data-pen-title="Google Inbox -  Fixed Header" className="codepen">See the Pen <a href="https://codepen.io/npbee/pen/bpGrmm/">Google Inbox -  Fixed Header</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>) on <a href="https://codepen.io">CodePen</a>.</div>
</div>

### The Message Open

Now things get a bit trickier. First, a quick visual of the animation:

<figure>
<img alt="Message Open" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_open.gif" />
</figure>

While this might look like a simple height and width animation, I assure you it\u2019s not. What\u2019s happening here involves timing a few different keyframe animations together as one. Keep in mind that the actual contents of the messages are completely hidden while the message is closed, as in \`display: none\`.

First, there is a \`div\` in the markup that\u2019s sole purpose is to do a [scale](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale) animation when the message is opening. A scale animation is an interesting choice because it has no effect on the document flow, meaning that you can scale an element to 200% and the elements around won\u2019t budge. So in order to give the effect that the height of the message is increasing as the message is opening, you have to actually translate any messages below it _down_ the page. This will be more relevant in the next section. The scale animation is also interesting because it\u2019s essentially emulating a height animation of sorts. The \u201Cpusher\u201D \`div\` scales to the point where its height is exactly the height of the incoming message content. This is where knowing the exact dimensions comes in handy.

Once the \u201Cscaler\u201D div has done its thing, the content is brought into the DOM and begins to fade in. At this point, the flow of the document is restored and since everything was done to exact specificity, there\u2019s not jumpiness with any other \`div\`\u2019s that had been moved out of the way for the scale animation.

I\u2019ll be going into more detail next about the translating, but here\u2019s a sample implantation on Codepen:

<p class="codepen" data-height="520" data-default-tab="result" data-slug-hash="ZWEJRg" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ZWEJRg">
  Google Inbox -  Open Message</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>

<div data-height="520" data-theme-id="0" data-slug-hash="ZWEJRg" data-default-tab="result" data-user="npbee" className='codepen'>See the Pen <a href='http://codepen.io/npbee/pen/ZWEJRg/'>Google Inbox -  Open Message</a> by Nick Ball (<a href='http://codepen.io/npbee'>@npbee</a>) on <a href='http://codepen.io'>CodePen</a>.</div>

## The Message Swap

Now we get to the wild and crazy stuff, the message swap:

<figure>
<img alt="message swap" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_swap.gif" />
</figure>

So, why is this interesting? To be honest, I wasn\u2019t sure it was all that interesting myself until I actually tried implementing it. The first thing to notice is that it looks as if the opening message is animating its height in reverse. This is the what a natural height animation would look like. If you were to animate the second message\u2019s height normally, it flow downwards increase the overall height of the page. The second interesting thing that\u2019s not very visible in the above gif, is the scroll position.

Take a look at this one (I have to speed up the animations for this to work):

<figure>
<img alt="scroll position" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_swap_b.gif" />
</figure>

In this gif, I\u2019ve already scrolled way down the page and I\u2019m now opening the second message. If you imagine what would happen in the normal document flow, the first message would close and the page\u2019s height would be substantially decreased, bringing the element below with it up the page. We\u2019d open to somewhere in the middle of the second message. Instead, the scroll position appears to stay the exactly the same, the first messages closes, and the second message opens right in place. This is an example of a completely natural feeling animation that is extremely _unnatural_ to implement.

So how\u2019s it done? In short, the CSS \`translate\` transform. But this is also another example of multiple animations being coordinated together to appear as one smooth interaction. As the first message is closing, it\u2019s \`translateY\` position is being animated from 0 up to the point where it would be visible on the screen at the current scroll position. Meaning, if the first message were above the viewport by 200px, we\u2019d animate from \`translateY(0px)\` to \`translateY(200px)\` to bring it in view. Simultaneously, the second message\u2019s \`translateY\` property is animated from the offset created from the first message closing _down_ to the point where it needs to end up on the screen. All the while each message\u2019s \u201Cscaler\u201D divs are doing their thing. All of this put together makes it look these divs are basically animating their height without the page moving at all.

But just those animations wouldn\u2019t be enough. The last missing piece here is the scroll position. In this scenario, once we\u2019re done animating we\u2019ve actually translated all of the content forward with the \`translateY\` property. So technically you could scroll up in the page and see a bunch of blank space. And since these animations are only temporary (remember the style is injected and then removed once the animations are done), the page contents will jump up once styles are removed because they don\u2019t have the \`translateY\` values that were applied. This is obviously no good. The solution is to manually set the scroll position forward the _exact_ amount that the page contents were translated. Because we\u2019re dealing with exact calculations, doing this immediately before the injected styles are removed does not result in any page jumps and essentially resets the page to a fresh state.

I\u2019ve tried to narrow down the concepts to an implementation here (click the second message):

<p class="codepen" data-height="395" data-default-tab="result" data-slug-hash="wMLgRY" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/wMLgRY">
  Google Inbox -  Message Swap</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>

Notice the two messages translating up and down and the scroll bar hopping up at the very last second once the animations are done.

In attempt to make this more clear, I\u2019ve made a step-able version here:

<p class="codepen" data-height="554" data-default-tab="result" data-slug-hash="ONJQMa" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ONJQMa">
  Google Inbox -  Message Swap Stepper</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>

Note that I\u2019m calling these \u201Csteps\u201D but really these all happen pretty much simultaneously.

## Takeaways

I\u2019m sure you\u2019re wondering why I wasted so much time on this. I wondered that myself plenty of times, but came away with a few solid learnings:

**Debugging Google code is hard.**

Like any quality production app, Google Inbox\u2019s output code is not meant to be readable. But Google really seems to go the extra mile with minified class names and injected style. They are building for scale and not for people like me to be able to decipher what\u2019s happening in their web apps.

**Subtlety is king.**

Most of the animations are incredibly subtle. Like _really_ subtle. They are the sort of animations that you don\u2019t really know are there until you do. Additionally, many of these animations have a very fast duration. So after all of the work to achieve these animations, they\u2019re gone in an instant. I think it\u2019s a nice display of restraint by the designers. In the same situation, I could see myself wanting to show off all of these wonderful animations I had built.

On the flip side of the above, I did see a bunch of injected code that was essentially worthless. I doubt that animating a div from \`translateY(0, 0.000122)\` to \`translateY(0, 0.00011)\` is actually perceivable to a real person. The amount of times where these extremely small animations are introduced, I\u2019m not sure, but there is probably a tradeoff there somewhere.

**Google takes their animations seriously.**

I don\u2019t consider myself well-versed in UX design, but it was quite fascinating to see just a glimpse of the amount of work it takes to get the level of polish that Google Inbox has. As I mentioned earlier, there are probably some non-humans writing at least part of the actual code that makes the animations run, but there are definitely humans _designing_ the animations. The interactions seemed to be envisioned first with the implementation details worked out later in whatever way was necessary, which is opposite of how I usually think about these things. I\u2019m not sure I\u2019ll ever have the resources at my disposal to build animations at this level of detail, but it was an impressive reminder that user experience is the ultimate goal and we should do whatever it takes to make it great.
`,Qc={title:"UX Case Study: Google Inbox",date:new Date(14565312e5),description:"A hard look at one of my favorite interaction patterns"},Zc={type:"content",filePath:"/Users/nickball/code/npb/src/content/blog/ux-case-study-google-inbox.md",rawData:`
title: "UX Case Study: Google Inbox"
date: 2016-02-27
description: A hard look at one of my favorite interaction patterns`}});var _a={};f(_a,{_internal:()=>ou,body:()=>su,collection:()=>tu,data:()=>au,id:()=>eu,slug:()=>nu});var eu,tu,nu,su,au,ou,Pa=h(()=>{eu="helloworks-demo.md",tu="projects",nu="helloworks-demo",su=`
An interactive demo page for the product I built at Dropbox, Dropbox Forms. Built with [Preact](https://preactjs.com/).
`,au={title:"Dropbox Forms Demo",graphic:"helloworks.png",link:"https://www.hellosign.com/products/dropbox-forms#demo"},ou={type:"content",filePath:"/Users/nickball/code/npb/src/content/projects/helloworks-demo.md",rawData:`
title: Dropbox Forms Demo
graphic: helloworks.png
link: https://www.hellosign.com/products/dropbox-forms#demo`}});var Ra={};f(Ra,{_internal:()=>uu,body:()=>pu,collection:()=>ru,data:()=>cu,id:()=>iu,slug:()=>lu});var iu,ru,lu,pu,cu,uu,La=h(()=>{iu="the-air-on-earth.md",ru="projects",lu="the-air-on-earth",pu=`
A personal site for my musical alias, _The Air on Earth_. Optimized images, a site-wide audio player, and lots of custom style flourishes. Built with [SvelteKit](https://kit.svelte.dev/).
`,cu={title:"theaironearth.com",graphic:"the-air-on-earth.svg",link:"https://theaironearth.com"},uu={type:"content",filePath:"/Users/nickball/code/npb/src/content/projects/the-air-on-earth.md",rawData:`
title: theaironearth.com
graphic: the-air-on-earth.svg
link: https://theaironearth.com`}});var Na={};f(Na,{_internal:()=>gu,body:()=>yu,collection:()=>hu,data:()=>fu,id:()=>du,slug:()=>mu});var du,hu,mu,yu,fu,gu,Ha=h(()=>{du="waveformr.md",hu="projects",mu="waveformr",yu=`
A tool for building SVG audio waveforms. Built with [Astro](https://astro.build/), [React](https://react.dev/), and [Deno Deploy](https://deno.com/deploy).
`,fu={title:"waveformr.com",graphic:"waveformr.png",link:"https://waveformr.com"},gu={type:"content",filePath:"/Users/nickball/code/npb/src/content/projects/waveformr.md",rawData:`
title: waveformr.com
graphic: waveformr.png
link: https://waveformr.com`}});var Wa={};f(Wa,{Content:()=>za,compiledContent:()=>wu,default:()=>za,file:()=>qa,frontmatter:()=>$a,getHeadings:()=>Du,images:()=>ln,rawContent:()=>bu,url:()=>Ua});function Eu(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:ln[s].src,...ln[s].attributes}))}function bu(){return`
Here's a deceptively tricky layout I encountered at work recently:

<div class="not-prose full-width flex justify-center">
<img alt="Sketch of layout" src="/posts/css-grid-double-overflow-sketch.svg" />
</div>

<h3>It has:</h3>

- Flex and grid layouts combined
- Multiple overflow containers
- Set and variable width columns

Here's how I solved it!

<div class="not-prose full-width w-75">
<p class="codepen" data-height="700" data-default-tab="css,result" data-slug-hash="ExLLRaQ" data-user="npbee" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ExLLRaQ">
  Double Overflowing Columns with CSS Grid</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>
</div>
`}function wu(){return Oa}function Du(){return[]}async function za(){let{layout:e,...t}=$a;return t.file=qa,t.url=Ua,j(A,{"set:html":Oa})}var yy,gy,ln,Oa,$a,qa,Ua,Ga=h(()=>{M();yy=y(_(),1);P();gy=y(R(),1);L();N();ln={};Oa=Eu(`<p>Here\u2019s a deceptively tricky layout I encountered at work recently:</p>
<div class="not-prose full-width flex justify-center">
<img alt="Sketch of layout" src="/posts/css-grid-double-overflow-sketch.svg">
</div>
<h3>It has:</h3>
<ul>
<li>Flex and grid layouts combined</li>
<li>Multiple overflow containers</li>
<li>Set and variable width columns</li>
</ul>
<p>Here\u2019s how I solved it!</p>
<div class="not-prose full-width w-75">
<p class="codepen" data-height="700" data-default-tab="css,result" data-slug-hash="ExLLRaQ" data-user="npbee" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ExLLRaQ">
  Double Overflowing Columns with CSS Grid</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>
</div>`),$a={title:"Double overflow with CSS grid",date:"2022-10-02T00:00:00.000Z",description:"A deceptively tricky layout"},qa="/Users/nickball/code/npb/src/content/blog/css-grid-double-overflow.md",Ua=void 0;za[Symbol.for("astro.needsHeadRendering")]=!0});var Ja={};f(Ja,{default:()=>Cu});async function vu(){return Promise.resolve().then(()=>(Ga(),Wa))}var xu,Fu,ku,Cu,Ya=h(()=>{xu="@@ASTRO-LINKS@@",Fu="@@ASTRO-STYLES@@",ku="@@ASTRO-SCRIPTS@@",Cu={__astroPropagation:!0,getMod:vu,collectedLinks:xu,collectedStyles:Fu,collectedScripts:ku}});var eo={};f(eo,{Content:()=>Za,compiledContent:()=>Bu,default:()=>Za,file:()=>Xa,frontmatter:()=>Ka,getHeadings:()=>Au,images:()=>pn,rawContent:()=>Su,url:()=>Qa});function Iu(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:pn[s].src,...pn[s].attributes}))}function Su(){return`
As a web developer I get the occasional ask from friends to help them build a
website. I generally don't mind and am happy to help out my buddies, but lately
as I've been limited on spare time, I've been more and more upfront with some requirements:

- I will only build _static_ sites. I don't want to be building anyone's custom
  CMS or billing system.
- I will only work with my preferred development workflow: Git / GitHub + Netlify
  and continuous deployment. I'd rather not hand off code in a zip file or
  configure anyone's _phpMyAdmin_ console.

As long as my friends are OK with my snobby requirements, I'm happy to oblige.
One missing piece from this workflow is the ability for people to update the
content after the site has been deployed. Historically the solution to that
has either been use a CMS like Wordpress or just update the content manually
everytime a change is needed. But recently there's been a surge of tools that
provide a new option: use a headless CMS. A headless CMS allows for content
owners to update the content in a third-party admin console and for me to
pull in that data at build time so I can continue to use my favorite static-site
tools. One of the new headless CMS options is [DatoCMS](https://datocms.com),
and I recently had a great experience working with it alongside [Eleventy](https://11ty.io),
my current static-site generator of choice. In this post I'll go through the
setup and experience.

I've set up an example respository here if you'd like to skip to the code:
[Eleventy-DatoCMS-Netlify](https://github.com/npbee/Eleventy-DatoCMS-Netlify).

## What is a Headless CMS Anyway?

First, a quick primer on headless CMS systems. A typical Content Management
System (CMS) loads content from a database and renders that content to a
template of some sort. Updating the content involves logging into an adminstration
console and changing the content. So in this world,
the content, administration, and display logic are all together in one codebase.
A headless CMS on the other hand, separates the content and adminstration of the
content from the view layer. Data is maintained and updated in one system and
the view layer pulls in that data at build time to create the static site. If
you've ever built a static site that had local data files of some sort, it's
just like that except your data files live on a third-party server somewhere.

There are lots of headless CMS options out there, but for my project I chose
[DatoCMS](https://datocms.com). The interface was simple, pricing was reasonable,
and they have a GraphQL API interface, of which I'm a big fan.

## The Data Flow

Since Netlify is the point at which the updated data is fetched from DatoCMS, a
new site build can happen either when new site code is pushed to GitHub _or_ when
the content is udpated through the Dato admin interface. In the case of data
updates, Dato tells Netlify that a new build needs to happen. Netlify then
starts the build and asks Dato for the new data.

![Image describing data flow between Github, DatoCMS, and Netlify](/posts/dato-1.png)

## Fetching Data from DatoCMS

To actually start building a site, we need to be able to get data from DatoCMS.
The example we'll work with is a restaurant building a menu (which was the
actual original use case).

Each headless CMS service will have different details, but fundamentally in each
one you describe how your content is structured by telling the service what
kind of data you're working with and what each of the properties are. In DatoCMS,
these are "models" and "fields" so you may have a model called "Menu Item"
that is made of up of a "name" field that is a string and a "price" field that
is a number.

![DatoCMS Model structure](/posts/dato-model.png)

This configuration ties directly to the GraphQL query that you make to DatoCMS:

\`\`\`graphql
query Site {
  allMenuItems {
    name
    price
  }
}
\`\`\`

DatoCMS offers an "API Explorer" on the site which allows you to query your
data:

![DatoCMS API Explorer](/posts/dato-api-explorer.png)

The API Explorer is great because you can tinker with your query until you get
it just right and then copy the query and paste it into a file in your
codebase. This makes for a really nice workflow where updating the data on the
site is a matter of pasting in a new query to a file.

Finally, to actually fetch the data we can use a rather plain \`fetch\` call;

\`\`\`js
const fetch = require("node-fetch");
const path = require("path");

// The DatoCMS token available fro the DatoCMS dashboard
// More on this later...
const token = process.env.DATO_API_TOKEN;

async function fetchData(token) {
  // Read the query from the file. A bit nicer to work with once the query
  // gets bigger. You can also copy and paste directly from the Dato API
  // explorer into the file.
  const query = await readFile(path.join(__dirname, "query.graphql"));
  const response = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify({
      query: query.toString(),
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Aborting: DatoCMS request failed with " + res.status);
    }
  });

  if (response.errors) {
    for (let error of response.errors) {
      console.error(error.message);
    }
    throw new Error("Aborting: DatoCMS errors");
  } else {
    return response.data;
  }
}
\`\`\`

As you can see above, we need a token from DatoCMS in order have the authorization
necessary to query our site. This is secret, so it lives in an environment
variable. For development, that means doing something like setting the
variable with in a \`.env\` file and using something like [\`dotenv\`](https://github.com/motdotla/dotenv) to pull in the variables. In production, we'll have to set the
variable within the Netlify dashboard. More on that soon.

## Fetching Data with Eleventy

Above we showed how to fetch data from DatoCMS using a \`fetch\` call, but how
does that work with Eleventy? The answer is Eleventy's [JS data files](https://www.11ty.dev/docs/data-js/). With JS data files, you can use JS to do anything you need
to do to get your data, including making a network call. By placing a
file within the special \`_data\` directory, Eleventy will expose whatever you
return to your template files:

\`\`\`js
// _data/cms.js
module.exports = async function Cms() {
  const token = process.env.DATO_API_TOKEN;
  const cachePath = path.join(__dirname, "cms.cache.json");
  return await fetchData(token);
};
\`\`\`

Then in your templates:

\`\`\`html
<!-- \`cms\` because that's what we named the file in the \`_data\` directory -->
{% for item in cms.allMenuItems %}
<p>
  <strong>Name</strong> {{ item.name }} <strong>Price</strong> {{ item.price }}
</p>
{% endfor %}
\`\`\`

That's it! We now have an Eleventy site fetching data from DatoCMS and building a
static site.

## Caching Data

The current setup works, but you may see this in your console output:

\`\`\`js
Writing _site/index.html from ./index.njk.
Benchmark (Data): \`./_data/cms.js\` took 581ms (66.0%)
Processed 2 files in 0.82 seconds (v0.9.0)
\`\`\`

Eleventy is noting that it took a noticeable amount of time to to handle our
\`_data/cms.js\` file. We can avoid going over the network each time by writing the DatoCMS response
to a file and using that file if it exists:

\`\`\`js
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

module.exports = async function Cms() {
  const token = process.env.DATO_API_TOKEN;
  const cachePath = path.join(__dirname, "cms.cache.json");
  const cache = await getCache(cachePath);

  if (cache) {
    console.log(">> Using cached data");
    return cache;
  } else {
    console.log(">> Fetching data from DatoCMS");
    const data = await fetchData(token);
    await writeFile(cachePath, JSON.stringify(data, null, 2));
    return data;
  }
};

async function getCache(cachePath) {
  try {
    const cache = await readFile(cachePath);
    return JSON.parse(cache);
  } catch (err) {
    // If this fails, that means there is no cache. Return \`undefined\` to
    // fetch from the network
  }
}
\`\`\`

Make sure ignore the cache file in the \`.gitignore\` file:

\`\`\`bash
# Cached data
_data/cms.cache.json
\`\`\`

This will only fetch fresh data if the \`_data/cms.cache.json\` does not exist.
In development, this is usually preferrable as your developing the site as you
probably don't need to fetch new data every time. In production, there will
never be any cache so we'll always fetch fresh data.

## Deployment

Assuming you have Netlify and GitHub integrated, the only missing piece for
being able to deploy our site is telling Netlify what our DatoCMS token is.
This is easily done via the Netlify admin dashboard:

![DatoCMS token in Netlify dashboard](/posts/dato-netlify-token.png)

Once that is in place, pushing new code to GitHub will trigger a build in Netlify,
which will fetch fresh data from DatoCMS!

## Integrating DatoCMS with Netlify

Almost done! The only missing piece left is to be able to deploy a new version
of our site whenever the data content changes. To do that, we need to a
"Deployment Environment" in DatoCMS. A deployment environment in Dato is how you
configure DatoCMS to re-build your site based on the services you're using.
After you've set up a deployment environment, you'll see these notifications
in the top right:

![DatoCMS deployment environment status displaying "Up to date"](/posts/dato-up-to-date.png)
![DatoCMS deployment environment status displaying "Out of date"](/posts/dato-out-of-date.png)
![DatoCMS deployment environment status displaying "In progress"](/posts/dato-in-progress.png)

DatoCMS has a great integration with Netlify that essentially makes this a one-click
setup. You authorize DatoCMS to your Netlify site, and it will more-or-less
do the rest. That said, I actually had some issues with that because at the
time it seemed that outgoing webhooks were not allowed on the free plan of
Netlify. This meant that I could trigger a build from DatoCMS, but Dato would
never be notified of the status of the build. This looks to not be an issue
anymore so if the integration works for you, then you should use it! Regardless,
I thought it would be interesting to see how to set up a custom deployment
environment using Netlify functions.

### Custom Deployment Environment with Netlify Functions

At the end of the day, communication between services is usually just each
service sending \`POST\` requests to each other. By utilizing Netlify's [functions
and event triggers](https://docs.netlify.com/functions/trigger-on-events/), we
can set up our own custom deployment environment.

First, we need to set up a build hook in Netlify:

![Netlify build hook](/posts/dato-build-hook.png)

This is the URL that we want DatoCMS to \`POST\` whenever it wants to trigger a
new build.

Then, within DatoCMS, choose "Custom webhook" to set up the custom deployment
environment:

![DatoCMS custom webhook](/posts/dato-custom-webhook.png)

Paste in the build hook from Netlify in the "Trigger URL" input. In the "Status notifications"
section, Dato is displaying the information that we need to send _back_ to
Dato from Netlify when the builds are complete. This is how Dato knows what
happened from Netlify. We'll need to create a new environment variable in
Netlify with this info:

![Netlify status URL environment variable](/posts/dato-status-url.png)

Lastly, we need to create two new functions: one named \`deploy-succeeded.js\`
and one named \`deploy-failed.js\`. The names are significant as they indicate
to Netlify that these are functions to be triggered when those specific
deploy events happened. In a \`functions\` folder:

\`\`\`js
// functions/deploy-succeeded.js
const fetch = require("node-fetch");

const { DATO_STATUS_URL } = process.env;

const data = JSON.stringify({ status: "success" });

exports.handler = async function (_event, _context) {
  let response;

  try {
    response = await fetch(DATO_STATUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response,
    }),
  };
};
\`\`\`

I'll leave the \`deploy-failed.js\` out, but it's pretty much the same except
with a different payload.

## Conclusion

Phew! After typing all of this out, I can definitely see how this type of
setup may seem overly complicated and you may be thinking that you might as
well just deploy a Wordpress site. In my case, I highly value a workflow that
allows me to iterate fast and also minimizes my overall maintenance cost.
Static sites are extremely low maintenance since there are no databases or
servers to deal with.

I can say that this set up has been running smoothly for months now and my
friends love their new CMS setup. They previously _had_ a custom Wordpress
site built for them by someone who had since abandoned them, leaving them
with an out-of-date Wordpress deployment and a pretty horrible editing experience.
If you enjoy building static site and want to extend your offering to allow
for dynamic content, I highly recommend giving this setup a try!
`}function Bu(){return Va}function Au(){return[{depth:2,slug:"what-is-a-headless-cms-anyway",text:"What is a Headless CMS Anyway?"},{depth:2,slug:"the-data-flow",text:"The Data Flow"},{depth:2,slug:"fetching-data-from-datocms",text:"Fetching Data from DatoCMS"},{depth:2,slug:"fetching-data-with-eleventy",text:"Fetching Data with Eleventy"},{depth:2,slug:"caching-data",text:"Caching Data"},{depth:2,slug:"deployment",text:"Deployment"},{depth:2,slug:"integrating-datocms-with-netlify",text:"Integrating DatoCMS with Netlify"},{depth:3,slug:"custom-deployment-environment-with-netlify-functions",text:"Custom Deployment Environment with Netlify Functions"},{depth:2,slug:"conclusion",text:"Conclusion"}]}async function Za(){let{layout:e,...t}=Ka;return t.file=Xa,t.url=Qa,j(A,{"set:html":Va})}var Dy,xy,pn,Va,Ka,Xa,Qa,to=h(()=>{M();Dy=y(_(),1);P();xy=y(R(),1);L();N();pn={};Va=Iu(`<p>As a web developer I get the occasional ask from friends to help them build a
website. I generally don\u2019t mind and am happy to help out my buddies, but lately
as I\u2019ve been limited on spare time, I\u2019ve been more and more upfront with some requirements:</p>
<ul>
<li>I will only build <em>static</em> sites. I don\u2019t want to be building anyone\u2019s custom
CMS or billing system.</li>
<li>I will only work with my preferred development workflow: Git / GitHub + Netlify
and continuous deployment. I\u2019d rather not hand off code in a zip file or
configure anyone\u2019s <em>phpMyAdmin</em> console.</li>
</ul>
<p>As long as my friends are OK with my snobby requirements, I\u2019m happy to oblige.
One missing piece from this workflow is the ability for people to update the
content after the site has been deployed. Historically the solution to that
has either been use a CMS like Wordpress or just update the content manually
everytime a change is needed. But recently there\u2019s been a surge of tools that
provide a new option: use a headless CMS. A headless CMS allows for content
owners to update the content in a third-party admin console and for me to
pull in that data at build time so I can continue to use my favorite static-site
tools. One of the new headless CMS options is <a href="https://datocms.com">DatoCMS</a>,
and I recently had a great experience working with it alongside <a href="https://11ty.io">Eleventy</a>,
my current static-site generator of choice. In this post I\u2019ll go through the
setup and experience.</p>
<p>I\u2019ve set up an example respository here if you\u2019d like to skip to the code:
<a href="https://github.com/npbee/Eleventy-DatoCMS-Netlify">Eleventy-DatoCMS-Netlify</a>.</p>
<h2 id="what-is-a-headless-cms-anyway">What is a Headless CMS Anyway?</h2>
<p>First, a quick primer on headless CMS systems. A typical Content Management
System (CMS) loads content from a database and renders that content to a
template of some sort. Updating the content involves logging into an adminstration
console and changing the content. So in this world,
the content, administration, and display logic are all together in one codebase.
A headless CMS on the other hand, separates the content and adminstration of the
content from the view layer. Data is maintained and updated in one system and
the view layer pulls in that data at build time to create the static site. If
you\u2019ve ever built a static site that had local data files of some sort, it\u2019s
just like that except your data files live on a third-party server somewhere.</p>
<p>There are lots of headless CMS options out there, but for my project I chose
<a href="https://datocms.com">DatoCMS</a>. The interface was simple, pricing was reasonable,
and they have a GraphQL API interface, of which I\u2019m a big fan.</p>
<h2 id="the-data-flow">The Data Flow</h2>
<p>Since Netlify is the point at which the updated data is fetched from DatoCMS, a
new site build can happen either when new site code is pushed to GitHub <em>or</em> when
the content is udpated through the Dato admin interface. In the case of data
updates, Dato tells Netlify that a new build needs to happen. Netlify then
starts the build and asks Dato for the new data.</p>
<p><img src="/posts/dato-1.png" alt="Image describing data flow between Github, DatoCMS, and Netlify"></p>
<h2 id="fetching-data-from-datocms">Fetching Data from DatoCMS</h2>
<p>To actually start building a site, we need to be able to get data from DatoCMS.
The example we\u2019ll work with is a restaurant building a menu (which was the
actual original use case).</p>
<p>Each headless CMS service will have different details, but fundamentally in each
one you describe how your content is structured by telling the service what
kind of data you\u2019re working with and what each of the properties are. In DatoCMS,
these are \u201Cmodels\u201D and \u201Cfields\u201D so you may have a model called \u201CMenu Item\u201D
that is made of up of a \u201Cname\u201D field that is a string and a \u201Cprice\u201D field that
is a number.</p>
<p><img src="/posts/dato-model.png" alt="DatoCMS Model structure"></p>
<p>This configuration ties directly to the GraphQL query that you make to DatoCMS:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">query</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">Site</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #FFAB70">allMenuItems</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #FFAB70">name</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #FFAB70">price</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<p>DatoCMS offers an \u201CAPI Explorer\u201D on the site which allows you to query your
data:</p>
<p><img src="/posts/dato-api-explorer.png" alt="DatoCMS API Explorer"></p>
<p>The API Explorer is great because you can tinker with your query until you get
it just right and then copy the query and paste it into a file in your
codebase. This makes for a really nice workflow where updating the data on the
site is a matter of pasting in a new query to a file.</p>
<p>Finally, to actually fetch the data we can use a rather plain <code>fetch</code> call;</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">fetch</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">require</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"node-fetch"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">path</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">require</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"path"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #6A737D">// The DatoCMS token available fro the DatoCMS dashboard</span></span>
<span class="line"><span style="color: #6A737D">// More on this later...</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">token</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> process.env.</span><span style="color: #79B8FF">DATO_API_TOKEN</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">async</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">fetchData</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">token</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Read the query from the file. A bit nicer to work with once the query</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// gets bigger. You can also copy and paste directly from the Dato API</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// explorer into the file.</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">query</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">readFile</span><span style="color: #E1E4E8">(path.</span><span style="color: #B392F0">join</span><span style="color: #E1E4E8">(__dirname, </span><span style="color: #9ECBFF">"query.graphql"</span><span style="color: #E1E4E8">));</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">response</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">fetch</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"https://graphql.datocms.com/"</span><span style="color: #E1E4E8">, {</span></span>
<span class="line"><span style="color: #E1E4E8">    method: </span><span style="color: #9ECBFF">"POST"</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">    headers: {</span></span>
<span class="line"><span style="color: #E1E4E8">      </span><span style="color: #9ECBFF">"Content-Type"</span><span style="color: #E1E4E8">: </span><span style="color: #9ECBFF">"application/json"</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">      Accept: </span><span style="color: #9ECBFF">"application/json"</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">      Authorization: </span><span style="color: #9ECBFF">\`Bearer \${</span><span style="color: #E1E4E8">token</span><span style="color: #9ECBFF">}\`</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">    },</span></span>
<span class="line"><span style="color: #E1E4E8">    body: </span><span style="color: #79B8FF">JSON</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">stringify</span><span style="color: #E1E4E8">({</span></span>
<span class="line"><span style="color: #E1E4E8">      query: query.</span><span style="color: #B392F0">toString</span><span style="color: #E1E4E8">(),</span></span>
<span class="line"><span style="color: #E1E4E8">    }),</span></span>
<span class="line"><span style="color: #E1E4E8">  }).</span><span style="color: #B392F0">then</span><span style="color: #E1E4E8">((</span><span style="color: #FFAB70">res</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">if</span><span style="color: #E1E4E8"> (res.ok) {</span></span>
<span class="line"><span style="color: #E1E4E8">      </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> res.</span><span style="color: #B392F0">json</span><span style="color: #E1E4E8">();</span></span>
<span class="line"><span style="color: #E1E4E8">    } </span><span style="color: #F97583">else</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">      </span><span style="color: #F97583">throw</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">new</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">Error</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Aborting: DatoCMS request failed with "</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">+</span><span style="color: #E1E4E8"> res.status);</span></span>
<span class="line"><span style="color: #E1E4E8">    }</span></span>
<span class="line"><span style="color: #E1E4E8">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">if</span><span style="color: #E1E4E8"> (response.errors) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">for</span><span style="color: #E1E4E8"> (</span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> error </span><span style="color: #F97583">of</span><span style="color: #E1E4E8"> response.errors) {</span></span>
<span class="line"><span style="color: #E1E4E8">      console.</span><span style="color: #B392F0">error</span><span style="color: #E1E4E8">(error.message);</span></span>
<span class="line"><span style="color: #E1E4E8">    }</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">throw</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">new</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">Error</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Aborting: DatoCMS errors"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">  } </span><span style="color: #F97583">else</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> response.data;</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<p>As you can see above, we need a token from DatoCMS in order have the authorization
necessary to query our site. This is secret, so it lives in an environment
variable. For development, that means doing something like setting the
variable with in a <code>.env</code> file and using something like <a href="https://github.com/motdotla/dotenv"><code>dotenv</code></a> to pull in the variables. In production, we\u2019ll have to set the
variable within the Netlify dashboard. More on that soon.</p>
<h2 id="fetching-data-with-eleventy">Fetching Data with Eleventy</h2>
<p>Above we showed how to fetch data from DatoCMS using a <code>fetch</code> call, but how
does that work with Eleventy? The answer is Eleventy\u2019s <a href="https://www.11ty.dev/docs/data-js/">JS data files</a>. With JS data files, you can use JS to do anything you need
to do to get your data, including making a network call. By placing a
file within the special <code>_data</code> directory, Eleventy will expose whatever you
return to your template files:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D">// _data/cms.js</span></span>
<span class="line"><span style="color: #79B8FF">module</span><span style="color: #E1E4E8">.</span><span style="color: #79B8FF">exports</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">Cms</span><span style="color: #E1E4E8">() {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">token</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> process.env.</span><span style="color: #79B8FF">DATO_API_TOKEN</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">cachePath</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> path.</span><span style="color: #B392F0">join</span><span style="color: #E1E4E8">(__dirname, </span><span style="color: #9ECBFF">"cms.cache.json"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">fetchData</span><span style="color: #E1E4E8">(token);</span></span>
<span class="line"><span style="color: #E1E4E8">};</span></span></code></pre>
<p>Then in your templates:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D">&#x3C;!-- \`cms\` because that's what we named the file in the \`_data\` directory --></span></span>
<span class="line"><span style="color: #E1E4E8">{% for item in cms.allMenuItems %}</span></span>
<span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">  &#x3C;</span><span style="color: #85E89D">strong</span><span style="color: #E1E4E8">>Name&#x3C;/</span><span style="color: #85E89D">strong</span><span style="color: #E1E4E8">> {{ item.name }} &#x3C;</span><span style="color: #85E89D">strong</span><span style="color: #E1E4E8">>Price&#x3C;/</span><span style="color: #85E89D">strong</span><span style="color: #E1E4E8">> {{ item.price }}</span></span>
<span class="line"><span style="color: #E1E4E8">&#x3C;/</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">{% endfor %}</span></span></code></pre>
<p>That\u2019s it! We now have an Eleventy site fetching data from DatoCMS and building a
static site.</p>
<h2 id="caching-data">Caching Data</h2>
<p>The current setup works, but you may see this in your console output:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">Writing _site</span><span style="color: #F97583">/</span><span style="color: #E1E4E8">index.html from .</span><span style="color: #F97583">/</span><span style="color: #E1E4E8">index.njk.</span></span>
<span class="line"><span style="color: #B392F0">Benchmark</span><span style="color: #E1E4E8"> (Data): </span><span style="color: #9ECBFF">\`./_data/cms.js\`</span><span style="color: #E1E4E8"> took 581</span><span style="color: #B392F0">ms</span><span style="color: #E1E4E8"> (</span><span style="color: #79B8FF">66.0</span><span style="color: #F97583">%</span><span style="color: #E1E4E8">)</span></span>
<span class="line"><span style="color: #E1E4E8">Processed </span><span style="color: #79B8FF">2</span><span style="color: #E1E4E8"> files </span><span style="color: #F97583">in</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">0.82</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">seconds</span><span style="color: #E1E4E8"> (v0.</span><span style="color: #79B8FF">9.0</span><span style="color: #E1E4E8">)</span></span></code></pre>
<p>Eleventy is noting that it took a noticeable amount of time to to handle our
<code>_data/cms.js</code> file. We can avoid going over the network each time by writing the DatoCMS response
to a file and using that file if it exists:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> { </span><span style="color: #79B8FF">promisify</span><span style="color: #E1E4E8"> } </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">require</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"util"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">path</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">require</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"path"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">fs</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">require</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"fs"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">writeFile</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">promisify</span><span style="color: #E1E4E8">(fs.writeFile);</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">readFile</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">promisify</span><span style="color: #E1E4E8">(fs.readFile);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #79B8FF">module</span><span style="color: #E1E4E8">.</span><span style="color: #79B8FF">exports</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">Cms</span><span style="color: #E1E4E8">() {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">token</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> process.env.</span><span style="color: #79B8FF">DATO_API_TOKEN</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">cachePath</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> path.</span><span style="color: #B392F0">join</span><span style="color: #E1E4E8">(__dirname, </span><span style="color: #9ECBFF">"cms.cache.json"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">cache</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">getCache</span><span style="color: #E1E4E8">(cachePath);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">if</span><span style="color: #E1E4E8"> (cache) {</span></span>
<span class="line"><span style="color: #E1E4E8">    console.</span><span style="color: #B392F0">log</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">">> Using cached data"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> cache;</span></span>
<span class="line"><span style="color: #E1E4E8">  } </span><span style="color: #F97583">else</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    console.</span><span style="color: #B392F0">log</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">">> Fetching data from DatoCMS"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">data</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">fetchData</span><span style="color: #E1E4E8">(token);</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">writeFile</span><span style="color: #E1E4E8">(cachePath, </span><span style="color: #79B8FF">JSON</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">stringify</span><span style="color: #E1E4E8">(data, </span><span style="color: #79B8FF">null</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">2</span><span style="color: #E1E4E8">));</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> data;</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">};</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">async</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">getCache</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">cachePath</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">try</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">cache</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">readFile</span><span style="color: #E1E4E8">(cachePath);</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">JSON</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">parse</span><span style="color: #E1E4E8">(cache);</span></span>
<span class="line"><span style="color: #E1E4E8">  } </span><span style="color: #F97583">catch</span><span style="color: #E1E4E8"> (err) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// If this fails, that means there is no cache. Return \`undefined\` to</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// fetch from the network</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<p>Make sure ignore the cache file in the <code>.gitignore</code> file:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D"># Cached data</span></span>
<span class="line"><span style="color: #B392F0">_data/cms.cache.json</span></span></code></pre>
<p>This will only fetch fresh data if the <code>_data/cms.cache.json</code> does not exist.
In development, this is usually preferrable as your developing the site as you
probably don\u2019t need to fetch new data every time. In production, there will
never be any cache so we\u2019ll always fetch fresh data.</p>
<h2 id="deployment">Deployment</h2>
<p>Assuming you have Netlify and GitHub integrated, the only missing piece for
being able to deploy our site is telling Netlify what our DatoCMS token is.
This is easily done via the Netlify admin dashboard:</p>
<p><img src="/posts/dato-netlify-token.png" alt="DatoCMS token in Netlify dashboard"></p>
<p>Once that is in place, pushing new code to GitHub will trigger a build in Netlify,
which will fetch fresh data from DatoCMS!</p>
<h2 id="integrating-datocms-with-netlify">Integrating DatoCMS with Netlify</h2>
<p>Almost done! The only missing piece left is to be able to deploy a new version
of our site whenever the data content changes. To do that, we need to a
\u201CDeployment Environment\u201D in DatoCMS. A deployment environment in Dato is how you
configure DatoCMS to re-build your site based on the services you\u2019re using.
After you\u2019ve set up a deployment environment, you\u2019ll see these notifications
in the top right:</p>
<p><img src="/posts/dato-up-to-date.png" alt="DatoCMS deployment environment status displaying &#x22;Up to date&#x22;">
<img src="/posts/dato-out-of-date.png" alt="DatoCMS deployment environment status displaying &#x22;Out of date&#x22;">
<img src="/posts/dato-in-progress.png" alt="DatoCMS deployment environment status displaying &#x22;In progress&#x22;"></p>
<p>DatoCMS has a great integration with Netlify that essentially makes this a one-click
setup. You authorize DatoCMS to your Netlify site, and it will more-or-less
do the rest. That said, I actually had some issues with that because at the
time it seemed that outgoing webhooks were not allowed on the free plan of
Netlify. This meant that I could trigger a build from DatoCMS, but Dato would
never be notified of the status of the build. This looks to not be an issue
anymore so if the integration works for you, then you should use it! Regardless,
I thought it would be interesting to see how to set up a custom deployment
environment using Netlify functions.</p>
<h3 id="custom-deployment-environment-with-netlify-functions">Custom Deployment Environment with Netlify Functions</h3>
<p>At the end of the day, communication between services is usually just each
service sending <code>POST</code> requests to each other. By utilizing Netlify\u2019s <a href="https://docs.netlify.com/functions/trigger-on-events/">functions
and event triggers</a>, we
can set up our own custom deployment environment.</p>
<p>First, we need to set up a build hook in Netlify:</p>
<p><img src="/posts/dato-build-hook.png" alt="Netlify build hook"></p>
<p>This is the URL that we want DatoCMS to <code>POST</code> whenever it wants to trigger a
new build.</p>
<p>Then, within DatoCMS, choose \u201CCustom webhook\u201D to set up the custom deployment
environment:</p>
<p><img src="/posts/dato-custom-webhook.png" alt="DatoCMS custom webhook"></p>
<p>Paste in the build hook from Netlify in the \u201CTrigger URL\u201D input. In the \u201CStatus notifications\u201D
section, Dato is displaying the information that we need to send <em>back</em> to
Dato from Netlify when the builds are complete. This is how Dato knows what
happened from Netlify. We\u2019ll need to create a new environment variable in
Netlify with this info:</p>
<p><img src="/posts/dato-status-url.png" alt="Netlify status URL environment variable"></p>
<p>Lastly, we need to create two new functions: one named <code>deploy-succeeded.js</code>
and one named <code>deploy-failed.js</code>. The names are significant as they indicate
to Netlify that these are functions to be triggered when those specific
deploy events happened. In a <code>functions</code> folder:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D">// functions/deploy-succeeded.js</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">fetch</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">require</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"node-fetch"</span><span style="color: #E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> { </span><span style="color: #79B8FF">DATO_STATUS_URL</span><span style="color: #E1E4E8"> } </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> process.env;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">data</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">JSON</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">stringify</span><span style="color: #E1E4E8">({ status: </span><span style="color: #9ECBFF">"success"</span><span style="color: #E1E4E8"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #79B8FF">exports</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">handler</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">function</span><span style="color: #E1E4E8"> (</span><span style="color: #FFAB70">_event</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">_context</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> response;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">try</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    response </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">fetch</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">DATO_STATUS_URL</span><span style="color: #E1E4E8">, {</span></span>
<span class="line"><span style="color: #E1E4E8">      method: </span><span style="color: #9ECBFF">"POST"</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">      headers: {</span></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #9ECBFF">"Content-Type"</span><span style="color: #E1E4E8">: </span><span style="color: #9ECBFF">"application/json"</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">      },</span></span>
<span class="line"><span style="color: #E1E4E8">      body: data,</span></span>
<span class="line"><span style="color: #E1E4E8">    });</span></span>
<span class="line"><span style="color: #E1E4E8">  } </span><span style="color: #F97583">catch</span><span style="color: #E1E4E8"> (err) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">      statusCode: err.statusCode </span><span style="color: #F97583">||</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">500</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">      body: </span><span style="color: #79B8FF">JSON</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">stringify</span><span style="color: #E1E4E8">({</span></span>
<span class="line"><span style="color: #E1E4E8">        error: err.message,</span></span>
<span class="line"><span style="color: #E1E4E8">      }),</span></span>
<span class="line"><span style="color: #E1E4E8">    };</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    statusCode: </span><span style="color: #79B8FF">200</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">    body: </span><span style="color: #79B8FF">JSON</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">stringify</span><span style="color: #E1E4E8">({</span></span>
<span class="line"><span style="color: #E1E4E8">      data: response,</span></span>
<span class="line"><span style="color: #E1E4E8">    }),</span></span>
<span class="line"><span style="color: #E1E4E8">  };</span></span>
<span class="line"><span style="color: #E1E4E8">};</span></span></code></pre>
<p>I\u2019ll leave the <code>deploy-failed.js</code> out, but it\u2019s pretty much the same except
with a different payload.</p>
<h2 id="conclusion">Conclusion</h2>
<p>Phew! After typing all of this out, I can definitely see how this type of
setup may seem overly complicated and you may be thinking that you might as
well just deploy a Wordpress site. In my case, I highly value a workflow that
allows me to iterate fast and also minimizes my overall maintenance cost.
Static sites are extremely low maintenance since there are no databases or
servers to deal with.</p>
<p>I can say that this set up has been running smoothly for months now and my
friends love their new CMS setup. They previously <em>had</em> a custom Wordpress
site built for them by someone who had since abandoned them, leaving them
with an out-of-date Wordpress deployment and a pretty horrible editing experience.
If you enjoy building static site and want to extend your offering to allow
for dynamic content, I highly recommend giving this setup a try!</p>`),Ka={title:"Eleventy + DatoCMS + Netlify",date:"2019-12-21T00:00:00.000Z",description:"Building a static site with a headless CMS"},Xa="/Users/nickball/code/npb/src/content/blog/eleventy-datocms-netlify.md",Qa=void 0;Za[Symbol.for("astro.needsHeadRendering")]=!0});var no={};f(no,{default:()=>Pu});async function Tu(){return Promise.resolve().then(()=>(to(),eo))}var ju,Mu,_u,Pu,so=h(()=>{ju="@@ASTRO-LINKS@@",Mu="@@ASTRO-STYLES@@",_u="@@ASTRO-SCRIPTS@@",Pu={__astroPropagation:!0,getMod:Tu,collectedLinks:ju,collectedStyles:Mu,collectedScripts:_u}});var po={};f(po,{Content:()=>lo,compiledContent:()=>Nu,default:()=>lo,file:()=>io,frontmatter:()=>oo,getHeadings:()=>Hu,images:()=>cn,rawContent:()=>Lu,url:()=>ro});function Ru(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:cn[s].src,...cn[s].attributes}))}function Lu(){return`
An obsession of mine lately has been figuring out a good way for my teammates and I test React components that rely on server requests.
Specifically, I'm looking for ways to:

- Setup a test with the _least_ amount of ceremony possible. Less ceremony means less friction for choosing to write a test or not.
- When doing that setup, be able to only specify specifically which pieces of data I need for that test and nothing more so it's clear what's important for the test.
- Assert what was sent to the server during my test. In some cases, this is the only way to really verify that something worked as expected.
- Easily mock one-off errors in tests.
- Have a good base of mocks with realistic data that can be overridden per test as needed

We're full in on the testing philosophies of [React Testing Library](We've already gone full ahead with the
) and [Kent C. Dodds](https://kentcdodds.com), but how far do you take it?

This will be a brain dump of some of my learnings along the way for my specific scenarios, so I don't expect it to apply to everyone but I wanted to write it down anyways.
Some things I'll be talking about:

- **Mocking abstraction layers** - At which layer do you apply the mock?
- **Mocked _data_ vs. mocked \\_responses\\_\\_** - What's the difference?
- **Mocking your entire backend in tests _and_ the browser** - E.g. [MSW](https://mswjs.io/) or [MirageJS](https://miragejs.com/)

At the end of the day, I've concluded that a tool like [MirageJS](https://miragejs.com/) or [Mock Service Worker](https://mswjs.io/), plus some sort of in-memory database really capture everything I need.

## Mocking Layers

> See: [Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch) by Kent C. Dodds.

As I mentioned above, I very much subscribe to the [Kent C. Dodds](https://kentcdodds.com/) method of testing React components.
Specifically, I like to test as few implementation details as possible and minimize mocking so that I can have high confidence that things are working and easily swap out implementation details.
In my position at work, we're constantly rebuilding and trying new experiments, so it's important to me to be able to write tests that will survive those changes.
I'm generally less concerned with what "kind" of test I'm writing (unit, integration, etc.).

So knowing that, my first point of research was around figuring out which point to start mocking out server responses.
And at this point I've (again) agreed with Kent that mocking at the _network_ layer is the way to go.
Kent's article above lays out a lot of this really well, but here's my own take.

Let's use this code for all of the examples:

\`\`\`jsx
function CreateLabel(props) {
  let { api } = props;
  let [value, setValue] = React.useState("");
  let [msg, setMsg] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    // Simplified for the sake of the example
    api
      .post("/label", {
        data: value,
      })
      .then(id => {
        setMsg(\`Success! Created label with id \${id}\`);
      }, err => {
        setMsg("Error!")
      }));
  }

  return (
    <div>
      {msg}
      <form onSubmit={handleSubmit}>
        <label htmlForm="label">Label</label>
        <input
          id="label"
          value={value}
          onChange={evt => setValue(evt.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
\`\`\`

A pseudo-component that shows an input and a submit button, posts to a theoretical API on submit, and then prints a message to the screen.
And we'll that the theoretical API looks like this:

\`\`\`js
export let api = {
  post(url, config) {
    // Does some manipulation and then calls out to \`fetch\`
    return fetch(url, config);
  },
};
\`\`\`

There are different points at which we could mock out the network call for this component.
I see them roughly like this:

- **Dependency Injection** - Test injects a mock \`api\` value. Network client is never hit
- **Mocked Client** - Test mocks the network client. Environment call is never hit (\`fetch\` or \`xhr\`)
- **Mocked Environment** - Test mocks at the environment level. Client is hit but the real \`fetch\` is never called
- **Network Intercept** - Test intercepts actual network requests and allows for custom response. Real \`fetch\` is called and the test asserts on custom responses. (Example: Nock, MSW, Mirage)
- **Network Intercept + Mocked data layer** - Test intercepts network requests, but requests are handled with actual logic mimicking production code and write to an in-memory database. Tests assert on the database. (Example: Mirage JS)

![Mocking layer](/posts/mock-layer.png)

### Dependency Injection / Mocking \`fetch\`

For a long time I really only considered two ways of mocking this component: Dependency injection or mocking the client.
Dependency injection would look like this:

> I'm using [React Testing Library](https://testing-library.com/docs/react-testing-library) here.

\`\`\`jsx
test("CreateLabel can create a label", async () => {
  // In a test
  let mockApi = {
    post: jest.fn(() => Promise.resolve(123)),
  };
  render(<CreateLabel api={mockApi} />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(mockApi.post).toHaveBeenCalledTimes(1));

  // Assert we called our mocked API _with_ the value we typed
  expect(mockApi.post).toHaveBeenCalledWith("/label", { data: "Home" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
\`\`\`

We're passing in a mocked API so that we can make a direct assertion on what was called.
This is kind of nice because everything is in one spot and there aren't many abstraction layers, so things are easy to follow.

However, as stated in Kent's article above, this strategy has some downsides as well:

- It doesn't exercise the logic in the \`api\` at all. A separate test is needed for that.
- It ties your API implementation details to your component. In your test, you have to know that your component calls \`api.post\`. If you later change this logic, you'll have to update your test.
- Further on the last point, your response from your mock API is hard-coded. If you later change your API response to return an object like \`{ id: 1}\`, you'll have to update your test.

A closely related strategy to this is mocking one level up at the \`fetch\` level.
That might look like this:

\`\`\`jsx
test("CreateLabel can create a label", async () => {
  fetch.mockImplementationOnce(() => Promise.resolve(123))

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  // Assert we called our mocked API _with_ the value we typed
  expect(fetch).toHaveBeenCalledWith("/label", { data: "Home" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
\`\`\`

This is better than dependency injection because we're now excercising our \`api\` logic and removing some implementation details in our test.
But, we still have the issue of hard-coding the response from the API _and_ we can also see another implementation detail: \`fetch\`!
The fact that we're mocking \`fetch\` means that we're not actually testing that we're calling \`fetch\` with the correct arguments.

To move further up the mocking layer, let's talk about some other things first.

## Mocked Responses vs. Mocked Data

So let's say you're convinced that mocking at the \`environment\` isn't the best solution.
The next layer for mocking would be to call the APIs in the environment that make network calls, but intercept those calls so they don't actually hit the network.
This is where something like [\`msw\`](https://mswjs.io/) comes in:

\`\`\`jsx
import { rest } from 'msw';
import { server } from './test/server';

test("CreateLabel can create a label", async () => {

  // Tell our "server" to intercept POST requests to \`/label\` and respond
  // with this specific response
  server.use(
    rest.post('/label', (req, res, ctx) => res(ctx.text(123)))
  )

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
\`\`\`

This is interesting because there's no mocking of \`fetch\` anywhere.
We could theoretically switch our entire client layer to use \`xhr\` if we wanted and this test would still pass.

You may have noticed that we're no longer asserting what we called our API with.
We could still do that here by making the response a mocked function.

\`\`\`jsx
import { rest } from 'msw';
import { server } from './test/server';

test("CreateLabel can create a label", async () => {

  // Tell our "server" to intercept POST requests to \`/label\` and respond
  // with this specific response

  // Use a mock function that we can assert on later
  let handler = jest.fn((req, res, ctx) => res(ctx.text(123)))

  server.use(rest.post('/label', handler))

  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));

  // Assert things about the last call. This will be a bit cumbersome because
  // it's the full request. Likely could create a helper like:
  expect(getLastRequestBody(handler)).toHaveBeenCalledWith({
    data: "Home"
  })

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText("Success! Created label with id 123")).toBeInTheDocument()
});
\`\`\`

This is pretty good!
But, there are still a few short-comings with this:

- The test is still coupled to the network API details through the URL of the request. If we want to change the endpoint this component hits, we'll have to update our test. This could be a perfectly fine trade-off depending on your needs.
- We're still hard-coding the response payload in the test. If we have other tests that hit this endpoint, we'd be hard-coding that data there as well. If the payload changes, we'd need to update all places that use it.

Another interesting short-coming is that as things get more complicated in your app, you essentially have to implicitly implement your backend logic through your mocks.
Here's an example of what I mean:

Say that our example above actually makes _two_ network calls: One that posts to create the label, and then another that refetches all labels to get the latest data:

\`\`\`jsx
function CreateLabel(props) {
  /* ... */

  function handleSubmit(evt) {
    evt.preventDefault();

    // This is simplified for the sake of the example
    api
      .post("/label", {
        data: value,
      })
      .then(id => {
        setMsg(\`Success! Created label with id \${id}\`);

        // Refetch all labels so we have the latest data
        return refetchAllLabels()
      }, err => {
        setMsg("Error!")
      }));
  }

  /* ... */
}
\`\`\`

Assuming we want to assert something about that refetching in our tests, we have to set that up in our mocks;

\`\`\`jsx
import { rest } from "msw";
import { server } from "./test/server";

test("CreateLabel can create a label", async () => {
  // Tell our "server" to intercept POST requests to \`/label\` and respond
  // with this specific response

  // Use a mock function that we can assert on later
  let handler = jest.fn((req, res, ctx) => res(ctx.text(123)));

  server.use(
    rest.post("/label", handler),

    // Intercept this request too and ensure we're returning the same data
    // that our mocked post handler did
    rest.get("/labels", (req, res, ctx) => res(ctx.data([123])))
  );

  render(<CreateLabel />);

  // ...
});
\`\`\`

We have to intercept two requests now and line up each response so that they return related data, so in a sense we're doing what our backend would be doing with these requests.
You could say that this is unnecessary to do because the tests don't _really_ care that the same data exists in both responses, they just care that your response is what you said it would be.
This is fair, but in my opinion I think it also dilutes the readability of the test.
I think it's helpful to see in my test that, yes, this the endpoint returns the data that was created in this other endpoint because they are related and that's how the real thing works.
By encoding this information into mocks, you have this info spread through all of your tests.

So let's go one step further...

## Mocking Your Entire Backend

Instead of mocking individual requests, we can actual mock the _handlers_ of those requests and write to a mocked in-memory database.
The difference here is subtle, but interesting.
It's mostly easily demonstrated in the udpated test:

\`\`\`jsx
import { rest } from 'msw';
import { server, db } from './test/server';

test("CreateLabel can create a label", async () => {
  render(<CreateLabel />);

  // Type a value into the input, then submit
  type(screen.getByLabelText("Label"), "Home"));
  click(screen.getByRole('button', { name: "Submit" });

  // Assert we called our mocked API
  await waitFor(() => expect(db.getLabels()).toHaveLength(1))

  let label = db.getLabels()[0]

  expect(label.title).toBe('Home')

  // Assert that we used the value returned from our API and printed it to the screen
  expect(screen.queryByText(\`Success! Created label with id \${label.id}\`)).toBeInTheDocument()
});
\`\`\`

A couple of interesting things to point out:

- We don't mock each individual response, so the test is a lot shorter.
- We don't assert the arguments of the request, we _assert_ the result of the database.
- We're asserting _less_ about our implementation details. This may feel uncomfortable.

If you've ever written or peered into a backend test, it probably looks a lot like this.
You set up some things for the tests, perform an action, and then assert on the database.
The fact that our frontend test does this same thing is nice because I think it helps solidify the mental model of what's actually happening.

Setting this up with \`msw\` would depend on how you're making requests.
In my case, I'm typically using GraphQL so I'll show that as an example.
GraphQL is especially interesting because there's really only one endpoint and all of the logic is in the resolvers.

\`\`\`js
// test/server.js
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import schema from './my-schema.graphql';

let db = /* ... */

let root = {
  createPost(args, { db }) {
    let { title } = args;

    // Make a new 'post' in our database
    let newPost = db.create('post', { title })
    return newPost;
  },
  posts(_args, { db }) {
    // Return all of the posts in our db
    return db.get('post');
  }
}

export let server = setupServer(
  rest.post('/api/graphql', async (req, res, ctx) => {
    // Get the query and variables from the body
    let { query, variables } = req.body;
    let context = { db };

    // Make a real query against our schema!
    let response = await graphql(schema, query, root, context, variables);

    return res(ctx.delay(500), ctx.status(200), ctx.json(response));
  })
)
\`\`\`

As for the "database", it can be just about as simple or complicated as you want.

\`\`\`js
let data = {
  post: {},
};

export let db = {
  create(model, attrs) {
    let id = makeId();

    let thing = {
      id,
      ...attrs,
    };

    data[model][id] = thing;

    return thing;
  },
};
\`\`\`

Positives of this type of test are:

- All of your 'backend' mocking logic lives in one spot. It can be updated here and all tests will get the udpates.
- It removes _all_ implementation details from your test. Not even which endpoints you are calling are part of the test.
- It's (in theory) very close to how the real system works
- In the case of GraphQL, it's making a real query against your real schema. It can catch if you are returning responses that don't match the schema, which ensures your test data always resembles production.

Downsides are:

- There's a lot more abstraction. It's now harder to see in your test everything that's in your component under test
- More test logic in the request handlers. The test is actually asserting on the test database logic, which can have its own bugs.

All together, this pattern essentially does what [MirageJS](https://miragejs.com/) does but I wanted to show that it can be done with msw as well.
The interesting thing about both of these tools, is that you can use both of them in the browser as well!
So you now have a way to develop new features against real data using the same production-like data you use in your tests.

## Slippery Slope

One argument I'm primed to take on with my co-workers is that this is essentially rebuilding our backend on the frontend.
In this simple example, the resolvers are easy, but in a real app things are complicated.
There are relationships between models and service calls to be made, etc.
That's all true and I think a trade off to be made for each team.
But at the end of the day, I think if you think of it as a development tool first, it will always be helpful.
The point is not to faithfully recreate exactly what your backend is doing, but to give an approximation of it and to have all of the logic in one place.
Remember, it's only a slight extension of doing this at the request level.
And ultimately, being able to hop down to mock out the request level should be the escape hatch.
If you have a test that's asserting on a complicated backend response, write a one-off request mock.
Use your shared database for mocks that are easy and can be reused across tests.
Writing my tests like a backend test with a database feels very strange at first, but I've found that it actually solidifies my understading of features _more_.

## Wrap Up

I'm still exploring all of this, but so far I'm pretty happy with this setup.
It ticks all of my boxes and feels like the right trade offs have been made...for now.
To sum up my current ideal setup, I've created a repo: [https://github.com/npbee/msw-jest-graphql](https://github.com/npbee/msw-jest-graphql).
`}function Nu(){return ao}function Hu(){return[{depth:2,slug:"mocking-layers",text:"Mocking Layers"},{depth:3,slug:"dependency-injection--mocking-fetch",text:"Dependency Injection / Mocking fetch"},{depth:2,slug:"mocked-responses-vs-mocked-data",text:"Mocked Responses vs. Mocked Data"},{depth:2,slug:"mocking-your-entire-backend",text:"Mocking Your Entire Backend"},{depth:2,slug:"slippery-slope",text:"Slippery Slope"},{depth:2,slug:"wrap-up",text:"Wrap Up"}]}async function lo(){let{layout:e,...t}=oo;return t.file=io,t.url=ro,j(A,{"set:html":ao})}var Iy,By,cn,ao,oo,io,ro,co=h(()=>{M();Iy=y(_(),1);P();By=y(R(),1);L();N();cn={};ao=Ru(`<p>An obsession of mine lately has been figuring out a good way for my teammates and I test React components that rely on server requests.
Specifically, I\u2019m looking for ways to:</p>
<ul>
<li>Setup a test with the <em>least</em> amount of ceremony possible. Less ceremony means less friction for choosing to write a test or not.</li>
<li>When doing that setup, be able to only specify specifically which pieces of data I need for that test and nothing more so it\u2019s clear what\u2019s important for the test.</li>
<li>Assert what was sent to the server during my test. In some cases, this is the only way to really verify that something worked as expected.</li>
<li>Easily mock one-off errors in tests.</li>
<li>Have a good base of mocks with realistic data that can be overridden per test as needed</li>
</ul>
<p>We\u2019re full in on the testing philosophies of [React Testing Library](We\u2019ve already gone full ahead with the
) and <a href="https://kentcdodds.com">Kent C. Dodds</a>, but how far do you take it?</p>
<p>This will be a brain dump of some of my learnings along the way for my specific scenarios, so I don\u2019t expect it to apply to everyone but I wanted to write it down anyways.
Some things I\u2019ll be talking about:</p>
<ul>
<li><strong>Mocking abstraction layers</strong> - At which layer do you apply the mock?</li>
<li><strong>Mocked <em>data</em> vs. mocked _responses__</strong> - What\u2019s the difference?</li>
<li><strong>Mocking your entire backend in tests <em>and</em> the browser</strong> - E.g. <a href="https://mswjs.io/">MSW</a> or <a href="https://miragejs.com/">MirageJS</a></li>
</ul>
<p>At the end of the day, I\u2019ve concluded that a tool like <a href="https://miragejs.com/">MirageJS</a> or <a href="https://mswjs.io/">Mock Service Worker</a>, plus some sort of in-memory database really capture everything I need.</p>
<h2 id="mocking-layers">Mocking Layers</h2>
<blockquote>
<p>See: <a href="https://kentcdodds.com/blog/stop-mocking-fetch">Stop Mocking Fetch</a> by Kent C. Dodds.</p>
</blockquote>
<p>As I mentioned above, I very much subscribe to the <a href="https://kentcdodds.com/">Kent C. Dodds</a> method of testing React components.
Specifically, I like to test as few implementation details as possible and minimize mocking so that I can have high confidence that things are working and easily swap out implementation details.
In my position at work, we\u2019re constantly rebuilding and trying new experiments, so it\u2019s important to me to be able to write tests that will survive those changes.
I\u2019m generally less concerned with what \u201Ckind\u201D of test I\u2019m writing (unit, integration, etc.).</p>
<p>So knowing that, my first point of research was around figuring out which point to start mocking out server responses.
And at this point I\u2019ve (again) agreed with Kent that mocking at the <em>network</em> layer is the way to go.
Kent\u2019s article above lays out a lot of this really well, but here\u2019s my own take.</p>
<p>Let\u2019s use this code for all of the examples:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">CreateLabel</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">props</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> { api } </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> props;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> [value, setValue] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> React.</span><span style="color: #B392F0">useState</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">""</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> [msg, setMsg] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> React.</span><span style="color: #B392F0">useState</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">""</span><span style="color: #E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">handleSubmit</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">evt</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">    evt.</span><span style="color: #B392F0">preventDefault</span><span style="color: #E1E4E8">();</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// Simplified for the sake of the example</span></span>
<span class="line"><span style="color: #E1E4E8">    api</span></span>
<span class="line"><span style="color: #E1E4E8">      .</span><span style="color: #B392F0">post</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"/label"</span><span style="color: #E1E4E8">, {</span></span>
<span class="line"><span style="color: #E1E4E8">        data: value,</span></span>
<span class="line"><span style="color: #E1E4E8">      })</span></span>
<span class="line"><span style="color: #E1E4E8">      .</span><span style="color: #B392F0">then</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">id</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #B392F0">setMsg</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">\`Success! Created label with id \${</span><span style="color: #E1E4E8">id</span><span style="color: #9ECBFF">}\`</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">      }, </span><span style="color: #FFAB70">err</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #B392F0">setMsg</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Error!"</span><span style="color: #E1E4E8">)</span></span>
<span class="line"><span style="color: #E1E4E8">      }));</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> (</span></span>
<span class="line"><span style="color: #E1E4E8">    &#x3C;</span><span style="color: #85E89D">div</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">      {msg}</span></span>
<span class="line"><span style="color: #E1E4E8">      &#x3C;</span><span style="color: #85E89D">form</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">onSubmit</span><span style="color: #F97583">=</span><span style="color: #E1E4E8">{handleSubmit}></span></span>
<span class="line"><span style="color: #E1E4E8">        &#x3C;</span><span style="color: #85E89D">label</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">htmlForm</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"label"</span><span style="color: #E1E4E8">>Label&#x3C;/</span><span style="color: #85E89D">label</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">        &#x3C;</span><span style="color: #85E89D">input</span></span>
<span class="line"><span style="color: #E1E4E8">          </span><span style="color: #B392F0">id</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"label"</span></span>
<span class="line"><span style="color: #E1E4E8">          </span><span style="color: #B392F0">value</span><span style="color: #F97583">=</span><span style="color: #E1E4E8">{value}</span></span>
<span class="line"><span style="color: #E1E4E8">          </span><span style="color: #B392F0">onChange</span><span style="color: #F97583">=</span><span style="color: #E1E4E8">{</span><span style="color: #FFAB70">evt</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">setValue</span><span style="color: #E1E4E8">(evt.target.value)}</span></span>
<span class="line"><span style="color: #E1E4E8">        /></span></span>
<span class="line"><span style="color: #E1E4E8">        &#x3C;</span><span style="color: #85E89D">button</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">type</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"submit"</span><span style="color: #E1E4E8">>Submit&#x3C;/</span><span style="color: #85E89D">button</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">      &#x3C;/</span><span style="color: #85E89D">form</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">    &#x3C;/</span><span style="color: #85E89D">div</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">  );</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<p>A pseudo-component that shows an input and a submit button, posts to a theoretical API on submit, and then prints a message to the screen.
And we\u2019ll that the theoretical API looks like this:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">export</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> api </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">post</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">url</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">config</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// Does some manipulation and then calls out to \`fetch\`</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">fetch</span><span style="color: #E1E4E8">(url, config);</span></span>
<span class="line"><span style="color: #E1E4E8">  },</span></span>
<span class="line"><span style="color: #E1E4E8">};</span></span></code></pre>
<p>There are different points at which we could mock out the network call for this component.
I see them roughly like this:</p>
<ul>
<li><strong>Dependency Injection</strong> - Test injects a mock <code>api</code> value. Network client is never hit</li>
<li><strong>Mocked Client</strong> - Test mocks the network client. Environment call is never hit (<code>fetch</code> or <code>xhr</code>)</li>
<li><strong>Mocked Environment</strong> - Test mocks at the environment level. Client is hit but the real <code>fetch</code> is never called</li>
<li><strong>Network Intercept</strong> - Test intercepts actual network requests and allows for custom response. Real <code>fetch</code> is called and the test asserts on custom responses. (Example: Nock, MSW, Mirage)</li>
<li><strong>Network Intercept + Mocked data layer</strong> - Test intercepts network requests, but requests are handled with actual logic mimicking production code and write to an in-memory database. Tests assert on the database. (Example: Mirage JS)</li>
</ul>
<p><img src="/posts/mock-layer.png" alt="Mocking layer"></p>
<h3 id="dependency-injection--mocking-fetch">Dependency Injection / Mocking <code>fetch</code></h3>
<p>For a long time I really only considered two ways of mocking this component: Dependency injection or mocking the client.
Dependency injection would look like this:</p>
<blockquote>
<p>I\u2019m using <a href="https://testing-library.com/docs/react-testing-library">React Testing Library</a> here.</p>
</blockquote>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #B392F0">test</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"CreateLabel can create a label"</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> () </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// In a test</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> mockApi </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    post: jest.</span><span style="color: #B392F0">fn</span><span style="color: #E1E4E8">(() </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">Promise</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">resolve</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">123</span><span style="color: #E1E4E8">)),</span></span>
<span class="line"><span style="color: #E1E4E8">  };</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(&#x3C;</span><span style="color: #79B8FF">CreateLabel</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">api</span><span style="color: #F97583">=</span><span style="color: #E1E4E8">{mockApi} />);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Type a value into the input, then submit</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">type</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByLabelText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Label"</span><span style="color: #E1E4E8">), </span><span style="color: #9ECBFF">"Home"</span><span style="color: #E1E4E8">));</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">click</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByRole</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'button'</span><span style="color: #E1E4E8">, { name: </span><span style="color: #9ECBFF">"Submit"</span><span style="color: #E1E4E8"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert we called our mocked API</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">waitFor</span><span style="color: #E1E4E8">(() </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(mockApi.post).</span><span style="color: #B392F0">toHaveBeenCalledTimes</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">));</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert we called our mocked API _with_ the value we typed</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(mockApi.post).</span><span style="color: #B392F0">toHaveBeenCalledWith</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"/label"</span><span style="color: #E1E4E8">, { data: </span><span style="color: #9ECBFF">"Home"</span><span style="color: #E1E4E8"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert that we used the value returned from our API and printed it to the screen</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">queryByText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Success! Created label with id 123"</span><span style="color: #E1E4E8">)).</span><span style="color: #B392F0">toBeInTheDocument</span><span style="color: #E1E4E8">()</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>We\u2019re passing in a mocked API so that we can make a direct assertion on what was called.
This is kind of nice because everything is in one spot and there aren\u2019t many abstraction layers, so things are easy to follow.</p>
<p>However, as stated in Kent\u2019s article above, this strategy has some downsides as well:</p>
<ul>
<li>It doesn\u2019t exercise the logic in the <code>api</code> at all. A separate test is needed for that.</li>
<li>It ties your API implementation details to your component. In your test, you have to know that your component calls <code>api.post</code>. If you later change this logic, you\u2019ll have to update your test.</li>
<li>Further on the last point, your response from your mock API is hard-coded. If you later change your API response to return an object like <code>{ id: 1}</code>, you\u2019ll have to update your test.</li>
</ul>
<p>A closely related strategy to this is mocking one level up at the <code>fetch</code> level.
That might look like this:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #B392F0">test</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"CreateLabel can create a label"</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> () </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  fetch.</span><span style="color: #B392F0">mockImplementationOnce</span><span style="color: #E1E4E8">(() </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">Promise</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">resolve</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">123</span><span style="color: #E1E4E8">))</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(&#x3C;</span><span style="color: #79B8FF">CreateLabel</span><span style="color: #E1E4E8"> />);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Type a value into the input, then submit</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">type</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByLabelText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Label"</span><span style="color: #E1E4E8">), </span><span style="color: #9ECBFF">"Home"</span><span style="color: #E1E4E8">));</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">click</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByRole</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'button'</span><span style="color: #E1E4E8">, { name: </span><span style="color: #9ECBFF">"Submit"</span><span style="color: #E1E4E8"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert we called our mocked API</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">waitFor</span><span style="color: #E1E4E8">(() </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(fetch).</span><span style="color: #B392F0">toHaveBeenCalledTimes</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">));</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert we called our mocked API _with_ the value we typed</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(fetch).</span><span style="color: #B392F0">toHaveBeenCalledWith</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"/label"</span><span style="color: #E1E4E8">, { data: </span><span style="color: #9ECBFF">"Home"</span><span style="color: #E1E4E8"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert that we used the value returned from our API and printed it to the screen</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">queryByText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Success! Created label with id 123"</span><span style="color: #E1E4E8">)).</span><span style="color: #B392F0">toBeInTheDocument</span><span style="color: #E1E4E8">()</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>This is better than dependency injection because we\u2019re now excercising our <code>api</code> logic and removing some implementation details in our test.
But, we still have the issue of hard-coding the response from the API <em>and</em> we can also see another implementation detail: <code>fetch</code>!
The fact that we\u2019re mocking <code>fetch</code> means that we\u2019re not actually testing that we\u2019re calling <code>fetch</code> with the correct arguments.</p>
<p>To move further up the mocking layer, let\u2019s talk about some other things first.</p>
<h2 id="mocked-responses-vs-mocked-data">Mocked Responses vs. Mocked Data</h2>
<p>So let\u2019s say you\u2019re convinced that mocking at the <code>environment</code> isn\u2019t the best solution.
The next layer for mocking would be to call the APIs in the environment that make network calls, but intercept those calls so they don\u2019t actually hit the network.
This is where something like <a href="https://mswjs.io/"><code>msw</code></a> comes in:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { rest } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'msw'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { server } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'./test/server'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #B392F0">test</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"CreateLabel can create a label"</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> () </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Tell our "server" to intercept POST requests to \`/label\` and respond</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// with this specific response</span></span>
<span class="line"><span style="color: #E1E4E8">  server.</span><span style="color: #B392F0">use</span><span style="color: #E1E4E8">(</span></span>
<span class="line"><span style="color: #E1E4E8">    rest.</span><span style="color: #B392F0">post</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'/label'</span><span style="color: #E1E4E8">, (</span><span style="color: #FFAB70">req</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">res</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">ctx</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">res</span><span style="color: #E1E4E8">(ctx.</span><span style="color: #B392F0">text</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">123</span><span style="color: #E1E4E8">)))</span></span>
<span class="line"><span style="color: #E1E4E8">  )</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(&#x3C;</span><span style="color: #79B8FF">CreateLabel</span><span style="color: #E1E4E8"> />);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Type a value into the input, then submit</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">type</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByLabelText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Label"</span><span style="color: #E1E4E8">), </span><span style="color: #9ECBFF">"Home"</span><span style="color: #E1E4E8">));</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">click</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByRole</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'button'</span><span style="color: #E1E4E8">, { name: </span><span style="color: #9ECBFF">"Submit"</span><span style="color: #E1E4E8"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert that we used the value returned from our API and printed it to the screen</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">queryByText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Success! Created label with id 123"</span><span style="color: #E1E4E8">)).</span><span style="color: #B392F0">toBeInTheDocument</span><span style="color: #E1E4E8">()</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>This is interesting because there\u2019s no mocking of <code>fetch</code> anywhere.
We could theoretically switch our entire client layer to use <code>xhr</code> if we wanted and this test would still pass.</p>
<p>You may have noticed that we\u2019re no longer asserting what we called our API with.
We could still do that here by making the response a mocked function.</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { rest } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'msw'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { server } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'./test/server'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #B392F0">test</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"CreateLabel can create a label"</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> () </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Tell our "server" to intercept POST requests to \`/label\` and respond</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// with this specific response</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Use a mock function that we can assert on later</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> handler </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> jest.</span><span style="color: #B392F0">fn</span><span style="color: #E1E4E8">((</span><span style="color: #FFAB70">req</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">res</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">ctx</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">res</span><span style="color: #E1E4E8">(ctx.</span><span style="color: #B392F0">text</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">123</span><span style="color: #E1E4E8">)))</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  server.</span><span style="color: #B392F0">use</span><span style="color: #E1E4E8">(rest.</span><span style="color: #B392F0">post</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'/label'</span><span style="color: #E1E4E8">, handler))</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(&#x3C;</span><span style="color: #79B8FF">CreateLabel</span><span style="color: #E1E4E8"> />);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Type a value into the input, then submit</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">type</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByLabelText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Label"</span><span style="color: #E1E4E8">), </span><span style="color: #9ECBFF">"Home"</span><span style="color: #E1E4E8">));</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">click</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByRole</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'button'</span><span style="color: #E1E4E8">, { name: </span><span style="color: #9ECBFF">"Submit"</span><span style="color: #E1E4E8"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert we called our mocked API</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">waitFor</span><span style="color: #E1E4E8">(() </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(handler).</span><span style="color: #B392F0">toHaveBeenCalledTimes</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">));</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert things about the last call. This will be a bit cumbersome because</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// it's the full request. Likely could create a helper like:</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(</span><span style="color: #B392F0">getLastRequestBody</span><span style="color: #E1E4E8">(handler)).</span><span style="color: #B392F0">toHaveBeenCalledWith</span><span style="color: #E1E4E8">({</span></span>
<span class="line"><span style="color: #E1E4E8">    data: </span><span style="color: #9ECBFF">"Home"</span></span>
<span class="line"><span style="color: #E1E4E8">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert that we used the value returned from our API and printed it to the screen</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">queryByText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Success! Created label with id 123"</span><span style="color: #E1E4E8">)).</span><span style="color: #B392F0">toBeInTheDocument</span><span style="color: #E1E4E8">()</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>This is pretty good!
But, there are still a few short-comings with this:</p>
<ul>
<li>The test is still coupled to the network API details through the URL of the request. If we want to change the endpoint this component hits, we\u2019ll have to update our test. This could be a perfectly fine trade-off depending on your needs.</li>
<li>We\u2019re still hard-coding the response payload in the test. If we have other tests that hit this endpoint, we\u2019d be hard-coding that data there as well. If the payload changes, we\u2019d need to update all places that use it.</li>
</ul>
<p>Another interesting short-coming is that as things get more complicated in your app, you essentially have to implicitly implement your backend logic through your mocks.
Here\u2019s an example of what I mean:</p>
<p>Say that our example above actually makes <em>two</em> network calls: One that posts to create the label, and then another that refetches all labels to get the latest data:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">CreateLabel</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">props</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">/* ... */</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">handleSubmit</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">evt</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">    evt.</span><span style="color: #B392F0">preventDefault</span><span style="color: #E1E4E8">();</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// This is simplified for the sake of the example</span></span>
<span class="line"><span style="color: #E1E4E8">    api</span></span>
<span class="line"><span style="color: #E1E4E8">      .</span><span style="color: #B392F0">post</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"/label"</span><span style="color: #E1E4E8">, {</span></span>
<span class="line"><span style="color: #E1E4E8">        data: value,</span></span>
<span class="line"><span style="color: #E1E4E8">      })</span></span>
<span class="line"><span style="color: #E1E4E8">      .</span><span style="color: #B392F0">then</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">id</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #B392F0">setMsg</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">\`Success! Created label with id \${</span><span style="color: #E1E4E8">id</span><span style="color: #9ECBFF">}\`</span><span style="color: #E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #6A737D">// Refetch all labels so we have the latest data</span></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">refetchAllLabels</span><span style="color: #E1E4E8">()</span></span>
<span class="line"><span style="color: #E1E4E8">      }, </span><span style="color: #FFAB70">err</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #B392F0">setMsg</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Error!"</span><span style="color: #E1E4E8">)</span></span>
<span class="line"><span style="color: #E1E4E8">      }));</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">/* ... */</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<p>Assuming we want to assert something about that refetching in our tests, we have to set that up in our mocks;</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { rest } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">"msw"</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { server } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">"./test/server"</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #B392F0">test</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"CreateLabel can create a label"</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> () </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Tell our "server" to intercept POST requests to \`/label\` and respond</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// with this specific response</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Use a mock function that we can assert on later</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> handler </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> jest.</span><span style="color: #B392F0">fn</span><span style="color: #E1E4E8">((</span><span style="color: #FFAB70">req</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">res</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">ctx</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">res</span><span style="color: #E1E4E8">(ctx.</span><span style="color: #B392F0">text</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">123</span><span style="color: #E1E4E8">)));</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  server.</span><span style="color: #B392F0">use</span><span style="color: #E1E4E8">(</span></span>
<span class="line"><span style="color: #E1E4E8">    rest.</span><span style="color: #B392F0">post</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"/label"</span><span style="color: #E1E4E8">, handler),</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// Intercept this request too and ensure we're returning the same data</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// that our mocked post handler did</span></span>
<span class="line"><span style="color: #E1E4E8">    rest.</span><span style="color: #B392F0">get</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"/labels"</span><span style="color: #E1E4E8">, (</span><span style="color: #FFAB70">req</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">res</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">ctx</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">res</span><span style="color: #E1E4E8">(ctx.</span><span style="color: #B392F0">data</span><span style="color: #E1E4E8">([</span><span style="color: #79B8FF">123</span><span style="color: #E1E4E8">])))</span></span>
<span class="line"><span style="color: #E1E4E8">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(&#x3C;</span><span style="color: #79B8FF">CreateLabel</span><span style="color: #E1E4E8"> />);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// ...</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>We have to intercept two requests now and line up each response so that they return related data, so in a sense we\u2019re doing what our backend would be doing with these requests.
You could say that this is unnecessary to do because the tests don\u2019t <em>really</em> care that the same data exists in both responses, they just care that your response is what you said it would be.
This is fair, but in my opinion I think it also dilutes the readability of the test.
I think it\u2019s helpful to see in my test that, yes, this the endpoint returns the data that was created in this other endpoint because they are related and that\u2019s how the real thing works.
By encoding this information into mocks, you have this info spread through all of your tests.</p>
<p>So let\u2019s go one step further\u2026</p>
<h2 id="mocking-your-entire-backend">Mocking Your Entire Backend</h2>
<p>Instead of mocking individual requests, we can actual mock the <em>handlers</em> of those requests and write to a mocked in-memory database.
The difference here is subtle, but interesting.
It\u2019s mostly easily demonstrated in the udpated test:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { rest } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'msw'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { server, db } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'./test/server'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #B392F0">test</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"CreateLabel can create a label"</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> () </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(&#x3C;</span><span style="color: #79B8FF">CreateLabel</span><span style="color: #E1E4E8"> />);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Type a value into the input, then submit</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">type</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByLabelText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"Label"</span><span style="color: #E1E4E8">), </span><span style="color: #9ECBFF">"Home"</span><span style="color: #E1E4E8">));</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">click</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">getByRole</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'button'</span><span style="color: #E1E4E8">, { name: </span><span style="color: #9ECBFF">"Submit"</span><span style="color: #E1E4E8"> });</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert we called our mocked API</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">waitFor</span><span style="color: #E1E4E8">(() </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(db.</span><span style="color: #B392F0">getLabels</span><span style="color: #E1E4E8">()).</span><span style="color: #B392F0">toHaveLength</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">))</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  let label </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> db.</span><span style="color: #B392F0">getLabels</span><span style="color: #E1E4E8">()[</span><span style="color: #79B8FF">0</span><span style="color: #E1E4E8">]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(label.title).</span><span style="color: #B392F0">toBe</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'Home'</span><span style="color: #E1E4E8">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">// Assert that we used the value returned from our API and printed it to the screen</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">expect</span><span style="color: #E1E4E8">(screen.</span><span style="color: #B392F0">queryByText</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">\`Success! Created label with id \${</span><span style="color: #E1E4E8">label</span><span style="color: #9ECBFF">.</span><span style="color: #E1E4E8">id</span><span style="color: #9ECBFF">}\`</span><span style="color: #E1E4E8">)).</span><span style="color: #B392F0">toBeInTheDocument</span><span style="color: #E1E4E8">()</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>A couple of interesting things to point out:</p>
<ul>
<li>We don\u2019t mock each individual response, so the test is a lot shorter.</li>
<li>We don\u2019t assert the arguments of the request, we <em>assert</em> the result of the database.</li>
<li>We\u2019re asserting <em>less</em> about our implementation details. This may feel uncomfortable.</li>
</ul>
<p>If you\u2019ve ever written or peered into a backend test, it probably looks a lot like this.
You set up some things for the tests, perform an action, and then assert on the database.
The fact that our frontend test does this same thing is nice because I think it helps solidify the mental model of what\u2019s actually happening.</p>
<p>Setting this up with <code>msw</code> would depend on how you\u2019re making requests.
In my case, I\u2019m typically using GraphQL so I\u2019ll show that as an example.
GraphQL is especially interesting because there\u2019s really only one endpoint and all of the logic is in the resolvers.</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D">// test/server.js</span></span>
<span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { rest } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'msw'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> { setupServer } </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'msw/node'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> schema </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">'./my-schema.graphql'</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">let</span><span style="color: #E1E4E8"> db </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #6A737D">/* ... */</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">let</span><span style="color: #E1E4E8"> root </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">createPost</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">args</span><span style="color: #E1E4E8">, { </span><span style="color: #FFAB70">db</span><span style="color: #E1E4E8"> }) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> { title } </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> args;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// Make a new 'post' in our database</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> newPost </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> db.</span><span style="color: #B392F0">create</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'post'</span><span style="color: #E1E4E8">, { title })</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> newPost;</span></span>
<span class="line"><span style="color: #E1E4E8">  },</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">posts</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">_args</span><span style="color: #E1E4E8">, { </span><span style="color: #FFAB70">db</span><span style="color: #E1E4E8"> }) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// Return all of the posts in our db</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> db.</span><span style="color: #B392F0">get</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'post'</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">export</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> server </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">setupServer</span><span style="color: #E1E4E8">(</span></span>
<span class="line"><span style="color: #E1E4E8">  rest.</span><span style="color: #B392F0">post</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">'/api/graphql'</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> (</span><span style="color: #FFAB70">req</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">res</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">ctx</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// Get the query and variables from the body</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> { query, variables } </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> req.body;</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> context </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> { db };</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #6A737D">// Make a real query against our schema!</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> response </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">graphql</span><span style="color: #E1E4E8">(schema, query, root, context, variables);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">res</span><span style="color: #E1E4E8">(ctx.</span><span style="color: #B392F0">delay</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">500</span><span style="color: #E1E4E8">), ctx.</span><span style="color: #B392F0">status</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">200</span><span style="color: #E1E4E8">), ctx.</span><span style="color: #B392F0">json</span><span style="color: #E1E4E8">(response));</span></span>
<span class="line"><span style="color: #E1E4E8">  })</span></span>
<span class="line"><span style="color: #E1E4E8">)</span></span></code></pre>
<p>As for the \u201Cdatabase\u201D, it can be just about as simple or complicated as you want.</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">let</span><span style="color: #E1E4E8"> data </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  post: {},</span></span>
<span class="line"><span style="color: #E1E4E8">};</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">export</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> db </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">create</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">model</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">attrs</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> id </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">makeId</span><span style="color: #E1E4E8">();</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">let</span><span style="color: #E1E4E8"> thing </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">      id,</span></span>
<span class="line"><span style="color: #E1E4E8">      </span><span style="color: #F97583">...</span><span style="color: #E1E4E8">attrs,</span></span>
<span class="line"><span style="color: #E1E4E8">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    data[model][id] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> thing;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> thing;</span></span>
<span class="line"><span style="color: #E1E4E8">  },</span></span>
<span class="line"><span style="color: #E1E4E8">};</span></span></code></pre>
<p>Positives of this type of test are:</p>
<ul>
<li>All of your \u2018backend\u2019 mocking logic lives in one spot. It can be updated here and all tests will get the udpates.</li>
<li>It removes <em>all</em> implementation details from your test. Not even which endpoints you are calling are part of the test.</li>
<li>It\u2019s (in theory) very close to how the real system works</li>
<li>In the case of GraphQL, it\u2019s making a real query against your real schema. It can catch if you are returning responses that don\u2019t match the schema, which ensures your test data always resembles production.</li>
</ul>
<p>Downsides are:</p>
<ul>
<li>There\u2019s a lot more abstraction. It\u2019s now harder to see in your test everything that\u2019s in your component under test</li>
<li>More test logic in the request handlers. The test is actually asserting on the test database logic, which can have its own bugs.</li>
</ul>
<p>All together, this pattern essentially does what <a href="https://miragejs.com/">MirageJS</a> does but I wanted to show that it can be done with msw as well.
The interesting thing about both of these tools, is that you can use both of them in the browser as well!
So you now have a way to develop new features against real data using the same production-like data you use in your tests.</p>
<h2 id="slippery-slope">Slippery Slope</h2>
<p>One argument I\u2019m primed to take on with my co-workers is that this is essentially rebuilding our backend on the frontend.
In this simple example, the resolvers are easy, but in a real app things are complicated.
There are relationships between models and service calls to be made, etc.
That\u2019s all true and I think a trade off to be made for each team.
But at the end of the day, I think if you think of it as a development tool first, it will always be helpful.
The point is not to faithfully recreate exactly what your backend is doing, but to give an approximation of it and to have all of the logic in one place.
Remember, it\u2019s only a slight extension of doing this at the request level.
And ultimately, being able to hop down to mock out the request level should be the escape hatch.
If you have a test that\u2019s asserting on a complicated backend response, write a one-off request mock.
Use your shared database for mocks that are easy and can be reused across tests.
Writing my tests like a backend test with a database feels very strange at first, but I\u2019ve found that it actually solidifies my understading of features <em>more</em>.</p>
<h2 id="wrap-up">Wrap Up</h2>
<p>I\u2019m still exploring all of this, but so far I\u2019m pretty happy with this setup.
It ticks all of my boxes and feels like the right trade offs have been made\u2026for now.
To sum up my current ideal setup, I\u2019ve created a repo: <a href="https://github.com/npbee/msw-jest-graphql">https://github.com/npbee/msw-jest-graphql</a>.</p>`),oo={title:"In Search of Mocks",date:"2020-06-15T00:00:00.000Z",description:"A journey through various data mocking techniques for testing React apps (and GraphQL)"},io="/Users/nickball/code/npb/src/content/blog/in-search-of-mocks.md",ro=void 0;lo[Symbol.for("astro.needsHeadRendering")]=!0});var uo={};f(uo,{default:()=>zu});async function Ou(){return Promise.resolve().then(()=>(co(),po))}var $u,qu,Uu,zu,ho=h(()=>{$u="@@ASTRO-LINKS@@",qu="@@ASTRO-STYLES@@",Uu="@@ASTRO-SCRIPTS@@",zu={__astroPropagation:!0,getMod:Ou,collectedLinks:$u,collectedStyles:qu,collectedScripts:Uu}});var bo={};f(bo,{Content:()=>Eo,compiledContent:()=>Ju,default:()=>Eo,file:()=>fo,frontmatter:()=>yo,getHeadings:()=>Yu,images:()=>un,rawContent:()=>Gu,url:()=>go});function Wu(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:un[s].src,...un[s].attributes}))}function Gu(){return`
> This is a post in a series of posts about learning back-end topics as a front-end developer.

Along with learning full-stack topics recently, I've also been learning [Elixir](https://elixir-lang.org/). I'll be honest, I'm not sure I would have been so interested in learning about back-end things if it weren't for the added bonus of getting to use Elixir to do so. I've always had an interest in functional programming and other functional languages. I typically write JavaScript in a functional fashion and I've toyed with other specifically functional languages like Elm, Clojure, and even Haskell. In the little time that I've spent venturing outside the comfortable world of JavaScript, I've found that learning other languages can unlock patterns and paradigms that I may not have otherwise grasped. Even though these patterns may not be directly usable in JavaScript, they can still give perspective and sometimes even make the patterns that _do_ exist more understandable. It feels a little like "leveling up."

## First Impressions

Overall: fantastic. A few specific things that I enjoyed immediately:

**Documentation**

Docs are a first-class concept in Elixir and it shows. Packages can easily build docs from code and they all follow a [similar](https://hexdocs.pm/elixir/Kernel.html) design layout. This makes browsing documentation familiar regardless of the package. And bonus, the documentation works in the REPL!

![iex docs](https://s3-us-west-2.amazonaws.com/npbee/2017/learning-elixir/iex-docs.png)

**Testing**

This is another first-class topic that has built-in support in Elixir. I've found testing to be simple and intuitive for most cases.

**Mix**

Mix is the build tool for Elixir that allows you to run tasks, compile, fetch dependencies, etc. As a front-end developer, it's similar to \`npm\` so it quickly made sense.

**Community**

I've found the community to be very friendly and inclusive. I even submitted a [pull request](https://github.com/elixir-lang/elixir/pull/6310) to the language!

**Functional Goodness**

And of course, I love that it's a functional language. Writing in a functional style is one thing, but writing functional code in a functional language is another. Being able to write lots of concise functions and combine them into a larger applications is my preferred way to write applications and Elixir seems to be designed just for that.

And [pattern matching](https://elixir-lang.org/getting-started/pattern-matching.html) is \u{1F60D}.

## Second Impressions

Overall: still great. A few things that I started to struggle with:

**Composing Functions**

One thing that I love about writing functional code is composing functions together. By that I mean:

\`\`\`javascript
// In pseudo-javascript
const add1 = (x) => x + 1;
const times2 = (x) => x * 2;
const math = compose(add1, times2);

math(2);
//=> 5
\`\`\`

But surprisingly, this way of composing functions is not really used much that I've seen. The Elixir way of doing this might instead use the [pipe operator](https://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator).

\`\`\`elixir
defmodule Math do
	def add1(x) do
	  x + 1
	end

	def times(x) do
	  x * 2
	end

	def math(x) do
	  x
	  |> times2
	  |> add1
	end
end

Math.math(2)
#=> 5
\`\`\`

While everything you can do with compose can be accomplished by just defining functions, I do miss the \`compose\` function. The pipe operator is great, though!

**Pragmatism**

The pragmatic approach to the language is something that I've seen referred to a number of times. Pragmatism may have a different meaning to other people, but for me it mostly just means it can help you get things done. Elixir is a functional language, but it's not _pure_ functional language. That means you can do things like perform side effects in functions. While I generally try my darnedest to _not_ rely on side effects, I will say that it's nice to be use them on occasion. Writing completely side-effect free code takes diligence from an entire team and I can understand how that may be a hinderance to small teams trying to push out features. Overall I've found Elixir to have a nice balance of strictness and pragmatism that's resulted in some really maintainable code.

## Similarities / Differences

As I've gone through learning Elixir and implementing various features, I've started to notice how things _somewhat_ relate to familiar front-end concepts for me. Most of these comparisons are definitely not one-to-one, but I think they have helped me solidify a few things in my mind.

**Elixir Compiler ~ Babel**

Elixir is a compiled language, so that means before you can do anything with it, you have to transform it into something else. In the case of Elixir, your source code is compiled into Erlang. In the case of most modern JavaScript, your source code is compiled into...well, different JavaScript. Elixir is compiling into a completely different language whereas JavaScript is just compiling into a different version of itself. It might be an even closer comparison if you happen to be using experimental JavaScript syntax, like maybe the [pipe operator](https://github.com/tc39/proposal-pipeline-operator). In that case, you're using syntax that _must_ be transformed into code that the browser can understand, so you're essentially writing a different language.

**Pattern Matching ~ Destructuring**

This comparison is a bit of a stretch, but I can't help but note the syntactical similarities. In Elixir, you can use pattern matching to do something like:

\`\`\`elixir
# pattern matching
%{a: a, b: b} = %{a: 1, b: 2}
#=> a == 1
#=> b == 2
\`\`\`

In JavaScript, you could do:

\`\`\`javascript
// Destructuring
const { a, b } = { a: 1, b: 2 };
//=> a === 1
//=> b === 2
\`\`\`

These two things are definitely _not_ the same, but somehow I think learning about restructuring first gave me a head start on pattern matching. The downside is that it can be a little sad when you try to write an Elixir pattern match in JavaScript and realize you can't!

**OTP ~ Redux**

[OTP](https://elixirschool.com/en/lessons/advanced/otp-concurrency/) is one of the core principles of Elixir and Erlang. I can't say that I've mastered it yet, but I can almost see similarities with [Redux](http://redux.js.org/). When you use a [GenServer](https://elixir-lang.org/getting-started/mix-otp/genserver.html) in Elixir, there's this idea of functions that handle specific calls by receiving the state, doing something with it, and returning a new state:

\`\`\`elixir
defmodule SimpleGenServer do
  use GenServer

  ### ...

  def handle_call({:add, value}, _from, state) do
    {:reply, value, state + 1}
  end

  ### ...
end
\`\`\`

This could be seen as a type of reducer from Redux:

\`\`\`js
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    default:
      return state;
  }
}
\`\`\`

Of course, OTP is much more robust.

**Macros ~ Babel Transforms?**

[Macros](https://elixir-lang.org/getting-started/meta/macros.html) are the sort of thing that can really break your brain the first time you try to learn about them. Using macros, you can write code that _writes_ code. Because Elixir is compiled, it allows you to hook into that compilation step and use it to your advantage to write things like custom syntax or help with code reuse. In JavaScript land, Babel transforms could be potentially thought of as macros. For example, [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) turns this:

\`\`\`javascript
<div>hello</div>
\`\`\`

...into this when Babel compiles it:

\`\`\`javascript
React.createElement("div", {}, "hello");
\`\`\`

There's nothing stopping you from writing the compiled version, but using the Babel transform can make things clearer or faster to write (if you're into JSX).

## Conclusion

I've really enjoyed learning Elixir and I'm excited to keep going with it. Besides JavaScript, it's the only other language I've really taken a deep dive on and I think it's been a great second language to learn. Topics like macros and concurrency are challenging in any language, but I think learning them with Elixir has been very approachable.
`}function Ju(){return mo}function Yu(){return[{depth:2,slug:"first-impressions",text:"First Impressions"},{depth:2,slug:"second-impressions",text:"Second Impressions"},{depth:2,slug:"similarities--differences",text:"Similarities / Differences"},{depth:2,slug:"conclusion",text:"Conclusion"}]}async function Eo(){let{layout:e,...t}=yo;return t.file=fo,t.url=go,j(A,{"set:html":mo})}var My,Py,un,mo,yo,fo,go,wo=h(()=>{M();My=y(_(),1);P();Py=y(R(),1);L();N();un={};mo=Wu(`<blockquote>
<p>This is a post in a series of posts about learning back-end topics as a front-end developer.</p>
</blockquote>
<p>Along with learning full-stack topics recently, I\u2019ve also been learning <a href="https://elixir-lang.org/">Elixir</a>. I\u2019ll be honest, I\u2019m not sure I would have been so interested in learning about back-end things if it weren\u2019t for the added bonus of getting to use Elixir to do so. I\u2019ve always had an interest in functional programming and other functional languages. I typically write JavaScript in a functional fashion and I\u2019ve toyed with other specifically functional languages like Elm, Clojure, and even Haskell. In the little time that I\u2019ve spent venturing outside the comfortable world of JavaScript, I\u2019ve found that learning other languages can unlock patterns and paradigms that I may not have otherwise grasped. Even though these patterns may not be directly usable in JavaScript, they can still give perspective and sometimes even make the patterns that <em>do</em> exist more understandable. It feels a little like \u201Cleveling up.\u201D</p>
<h2 id="first-impressions">First Impressions</h2>
<p>Overall: fantastic. A few specific things that I enjoyed immediately:</p>
<p><strong>Documentation</strong></p>
<p>Docs are a first-class concept in Elixir and it shows. Packages can easily build docs from code and they all follow a <a href="https://hexdocs.pm/elixir/Kernel.html">similar</a> design layout. This makes browsing documentation familiar regardless of the package. And bonus, the documentation works in the REPL!</p>
<p><img src="https://s3-us-west-2.amazonaws.com/npbee/2017/learning-elixir/iex-docs.png" alt="iex docs"></p>
<p><strong>Testing</strong></p>
<p>This is another first-class topic that has built-in support in Elixir. I\u2019ve found testing to be simple and intuitive for most cases.</p>
<p><strong>Mix</strong></p>
<p>Mix is the build tool for Elixir that allows you to run tasks, compile, fetch dependencies, etc. As a front-end developer, it\u2019s similar to <code>npm</code> so it quickly made sense.</p>
<p><strong>Community</strong></p>
<p>I\u2019ve found the community to be very friendly and inclusive. I even submitted a <a href="https://github.com/elixir-lang/elixir/pull/6310">pull request</a> to the language!</p>
<p><strong>Functional Goodness</strong></p>
<p>And of course, I love that it\u2019s a functional language. Writing in a functional style is one thing, but writing functional code in a functional language is another. Being able to write lots of concise functions and combine them into a larger applications is my preferred way to write applications and Elixir seems to be designed just for that.</p>
<p>And <a href="https://elixir-lang.org/getting-started/pattern-matching.html">pattern matching</a> is \u{1F60D}.</p>
<h2 id="second-impressions">Second Impressions</h2>
<p>Overall: still great. A few things that I started to struggle with:</p>
<p><strong>Composing Functions</strong></p>
<p>One thing that I love about writing functional code is composing functions together. By that I mean:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D">// In pseudo-javascript</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">add1</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> (</span><span style="color: #FFAB70">x</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> x </span><span style="color: #F97583">+</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">times2</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> (</span><span style="color: #FFAB70">x</span><span style="color: #E1E4E8">) </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> x </span><span style="color: #F97583">*</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">2</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">math</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">compose</span><span style="color: #E1E4E8">(add1, times2);</span></span>
<span class="line"></span>
<span class="line"><span style="color: #B392F0">math</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">2</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #6A737D">//=> 5</span></span></code></pre>
<p>But surprisingly, this way of composing functions is not really used much that I\u2019ve seen. The Elixir way of doing this might instead use the <a href="https://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator">pipe operator</a>.</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">defmodule</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">Math</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">do</span></span>
<span class="line"><span style="color: #E1E4E8">	</span><span style="color: #F97583">def</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">add1</span><span style="color: #E1E4E8">(x) </span><span style="color: #F97583">do</span></span>
<span class="line"><span style="color: #E1E4E8">	  x </span><span style="color: #F97583">+</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">1</span></span>
<span class="line"><span style="color: #E1E4E8">	</span><span style="color: #F97583">end</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">	</span><span style="color: #F97583">def</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">times</span><span style="color: #E1E4E8">(x) </span><span style="color: #F97583">do</span></span>
<span class="line"><span style="color: #E1E4E8">	  x </span><span style="color: #F97583">*</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">2</span></span>
<span class="line"><span style="color: #E1E4E8">	</span><span style="color: #F97583">end</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">	</span><span style="color: #F97583">def</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">math</span><span style="color: #E1E4E8">(x) </span><span style="color: #F97583">do</span></span>
<span class="line"><span style="color: #E1E4E8">	  x</span></span>
<span class="line"><span style="color: #E1E4E8">	  </span><span style="color: #F97583">|></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">times2</span></span>
<span class="line"><span style="color: #E1E4E8">	  </span><span style="color: #F97583">|></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">add1</span></span>
<span class="line"><span style="color: #E1E4E8">	</span><span style="color: #F97583">end</span></span>
<span class="line"><span style="color: #F97583">end</span></span>
<span class="line"></span>
<span class="line"><span style="color: #B392F0">Math</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">math</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">2</span><span style="color: #E1E4E8">)</span></span>
<span class="line"><span style="color: #6A737D">#=> 5</span></span></code></pre>
<p>While everything you can do with compose can be accomplished by just defining functions, I do miss the <code>compose</code> function. The pipe operator is great, though!</p>
<p><strong>Pragmatism</strong></p>
<p>The pragmatic approach to the language is something that I\u2019ve seen referred to a number of times. Pragmatism may have a different meaning to other people, but for me it mostly just means it can help you get things done. Elixir is a functional language, but it\u2019s not <em>pure</em> functional language. That means you can do things like perform side effects in functions. While I generally try my darnedest to <em>not</em> rely on side effects, I will say that it\u2019s nice to be use them on occasion. Writing completely side-effect free code takes diligence from an entire team and I can understand how that may be a hinderance to small teams trying to push out features. Overall I\u2019ve found Elixir to have a nice balance of strictness and pragmatism that\u2019s resulted in some really maintainable code.</p>
<h2 id="similarities--differences">Similarities / Differences</h2>
<p>As I\u2019ve gone through learning Elixir and implementing various features, I\u2019ve started to notice how things <em>somewhat</em> relate to familiar front-end concepts for me. Most of these comparisons are definitely not one-to-one, but I think they have helped me solidify a few things in my mind.</p>
<p><strong>Elixir Compiler ~ Babel</strong></p>
<p>Elixir is a compiled language, so that means before you can do anything with it, you have to transform it into something else. In the case of Elixir, your source code is compiled into Erlang. In the case of most modern JavaScript, your source code is compiled into\u2026well, different JavaScript. Elixir is compiling into a completely different language whereas JavaScript is just compiling into a different version of itself. It might be an even closer comparison if you happen to be using experimental JavaScript syntax, like maybe the <a href="https://github.com/tc39/proposal-pipeline-operator">pipe operator</a>. In that case, you\u2019re using syntax that <em>must</em> be transformed into code that the browser can understand, so you\u2019re essentially writing a different language.</p>
<p><strong>Pattern Matching ~ Destructuring</strong></p>
<p>This comparison is a bit of a stretch, but I can\u2019t help but note the syntactical similarities. In Elixir, you can use pattern matching to do something like:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D"># pattern matching</span></span>
<span class="line"><span style="color: #E1E4E8">%{</span><span style="color: #79B8FF">a:</span><span style="color: #E1E4E8"> a, </span><span style="color: #79B8FF">b:</span><span style="color: #E1E4E8"> b} </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> %{</span><span style="color: #79B8FF">a:</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">b:</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">2</span><span style="color: #E1E4E8">}</span></span>
<span class="line"><span style="color: #6A737D">#=> a == 1</span></span>
<span class="line"><span style="color: #6A737D">#=> b == 2</span></span></code></pre>
<p>In JavaScript, you could do:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D">// Destructuring</span></span>
<span class="line"><span style="color: #F97583">const</span><span style="color: #E1E4E8"> { </span><span style="color: #79B8FF">a</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">b</span><span style="color: #E1E4E8"> } </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> { a: </span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">, b: </span><span style="color: #79B8FF">2</span><span style="color: #E1E4E8"> };</span></span>
<span class="line"><span style="color: #6A737D">//=> a === 1</span></span>
<span class="line"><span style="color: #6A737D">//=> b === 2</span></span></code></pre>
<p>These two things are definitely <em>not</em> the same, but somehow I think learning about restructuring first gave me a head start on pattern matching. The downside is that it can be a little sad when you try to write an Elixir pattern match in JavaScript and realize you can\u2019t!</p>
<p><strong>OTP ~ Redux</strong></p>
<p><a href="https://elixirschool.com/en/lessons/advanced/otp-concurrency/">OTP</a> is one of the core principles of Elixir and Erlang. I can\u2019t say that I\u2019ve mastered it yet, but I can almost see similarities with <a href="http://redux.js.org/">Redux</a>. When you use a <a href="https://elixir-lang.org/getting-started/mix-otp/genserver.html">GenServer</a> in Elixir, there\u2019s this idea of functions that handle specific calls by receiving the state, doing something with it, and returning a new state:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">defmodule</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">SimpleGenServer</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">do</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">use</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">GenServer</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">### ...</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">def</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">handle_call</span><span style="color: #E1E4E8">({</span><span style="color: #79B8FF">:add</span><span style="color: #E1E4E8">, value}, </span><span style="color: #6A737D">_from</span><span style="color: #E1E4E8">, state) </span><span style="color: #F97583">do</span></span>
<span class="line"><span style="color: #E1E4E8">    {</span><span style="color: #79B8FF">:reply</span><span style="color: #E1E4E8">, value, state </span><span style="color: #F97583">+</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">}</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">end</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #6A737D">### ...</span></span>
<span class="line"><span style="color: #F97583">end</span></span></code></pre>
<p>This could be seen as a type of reducer from Redux:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">reducer</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">state</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">action</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">switch</span><span style="color: #E1E4E8"> (action.type) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">case</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">"ADD"</span><span style="color: #E1E4E8">:</span></span>
<span class="line"><span style="color: #E1E4E8">      </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> state </span><span style="color: #F97583">+</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">default</span><span style="color: #E1E4E8">:</span></span>
<span class="line"><span style="color: #E1E4E8">      </span><span style="color: #F97583">return</span><span style="color: #E1E4E8"> state;</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<p>Of course, OTP is much more robust.</p>
<p><strong>Macros ~ Babel Transforms?</strong></p>
<p><a href="https://elixir-lang.org/getting-started/meta/macros.html">Macros</a> are the sort of thing that can really break your brain the first time you try to learn about them. Using macros, you can write code that <em>writes</em> code. Because Elixir is compiled, it allows you to hook into that compilation step and use it to your advantage to write things like custom syntax or help with code reuse. In JavaScript land, Babel transforms could be potentially thought of as macros. For example, <a href="https://facebook.github.io/react/docs/jsx-in-depth.html">JSX</a> turns this:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">div</span><span style="color: #E1E4E8">>hello&#x3C;/</span><span style="color: #85E89D">div</span><span style="color: #E1E4E8">></span></span></code></pre>
<p>\u2026into this when Babel compiles it:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">React.</span><span style="color: #B392F0">createElement</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"div"</span><span style="color: #E1E4E8">, {}, </span><span style="color: #9ECBFF">"hello"</span><span style="color: #E1E4E8">);</span></span></code></pre>
<p>There\u2019s nothing stopping you from writing the compiled version, but using the Babel transform can make things clearer or faster to write (if you\u2019re into JSX).</p>
<h2 id="conclusion">Conclusion</h2>
<p>I\u2019ve really enjoyed learning Elixir and I\u2019m excited to keep going with it. Besides JavaScript, it\u2019s the only other language I\u2019ve really taken a deep dive on and I think it\u2019s been a great second language to learn. Topics like macros and concurrency are challenging in any language, but I think learning them with Elixir has been very approachable.</p>`),yo={title:"Learning Elixir",date:"2017-08-20T00:00:00.000Z",description:"Some thoughts on learning the Elixir language."},fo="/Users/nickball/code/npb/src/content/blog/learning-elixir.md",go=void 0;Eo[Symbol.for("astro.needsHeadRendering")]=!0});var Do={};f(Do,{default:()=>Zu});async function Vu(){return Promise.resolve().then(()=>(wo(),bo))}var Ku,Xu,Qu,Zu,vo=h(()=>{Ku="@@ASTRO-LINKS@@",Xu="@@ASTRO-STYLES@@",Qu="@@ASTRO-SCRIPTS@@",Zu={__astroPropagation:!0,getMod:Vu,collectedLinks:Ku,collectedStyles:Xu,collectedScripts:Qu}});var So={};f(So,{Content:()=>Io,compiledContent:()=>nd,default:()=>Io,file:()=>ko,frontmatter:()=>Fo,getHeadings:()=>sd,images:()=>dn,rawContent:()=>td,url:()=>Co});function ed(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:dn[s].src,...dn[s].attributes}))}function td(){return`
Recently I've been getting excited about [local-first](https://www.inkandswitch.com/local-first/) applications so I thought I would try my hand at building one.
The app will be a personal songwriting tool for organizing, versioning, and making notes on in-progress songs. Sort of a personal Soundcloud app of sorts.
I think I've finally settled on a decent architecture, but the process has forced me to rethink some of my go-to patterns that I use to build on cloud-based software.

## Am I the Client or the Server?

In my normal day-to-day work I'm almost always writing code for the _client_.
You want data? Make an HTTP request from the _server_ to get it.
You need a file? Make an HTTP request from the _server_.
In a local-first app those boundaries aren't as clear.
I can write a SQL query right next to my React component!

\`\`\`tsx
function SomeComponent({ db, id }) {

  async function updateName(name) {
    await db.execute(\`
      UPDATE songs
      SET name = ?
      WHERE id = ?
    \`,
    [name, id]
  }

  return (
    <input
      onChange={evt => updateName(evt.target.value)}
    />
  );
}
\`\`\`

## Storage? Also Syncing. And undo/redo. Oh also searching?

So far I've found it challenging to get all of these features out of the box.
Like anything in software, the architecture needs to be based on the needs of the application.
One of the best parts about local-first apps is that your data is truly local.
But that also means that if you _want_ that data to be available elsewhere (like on a phone perhaps), then you have to figure out how to sync the data.
Additionally, if you want multiple people to interact with that data you need to think about merging and conflict resolution.
Tying in undo/redo into syncing and conflict resolution makes all of that a _hard_ application to build.

The rage right now for local-first apps is [CRDTs](https://crdt.tech/).
I'm still wrapping my head around it, but I understand enough to know that I don't want to build this myself.
There are a couple of libraries out there that do this like [Automerge](https://automerge.org/) and [Y.js](https://yjs.dev/).
Y.js in particular seems pretty darn good as it has syncing and undo/redo out of the box.

The last challenge that relates here is searching.
For a local-first app, it feels strange to _not_ choose SQLite since it can easily and efficiently search and query.
Using a CRDT library feels like it forces data into a document-based storage format which conflicts a little with how one might typically structure a SQLite database.

Can you have a CRDT data structure that supports undo/redo and store that in SQLite?
Probably, but I haven't figured it out yet.
`}function nd(){return xo}function sd(){return[{depth:2,slug:"am-i-the-client-or-the-server",text:"Am I the Client or the Server?"},{depth:2,slug:"storage-also-syncing-and-undoredo-oh-also-searching",text:"Storage? Also Syncing. And undo/redo. Oh also searching?"}]}async function Io(){let{layout:e,...t}=Fo;return t.file=ko,t.url=Co,j(A,{"set:html":xo})}var Hy,$y,dn,xo,Fo,ko,Co,Bo=h(()=>{M();Hy=y(_(),1);P();$y=y(R(),1);L();N();dn={};xo=ed(`<p>Recently I\u2019ve been getting excited about <a href="https://www.inkandswitch.com/local-first/">local-first</a> applications so I thought I would try my hand at building one.
The app will be a personal songwriting tool for organizing, versioning, and making notes on in-progress songs. Sort of a personal Soundcloud app of sorts.
I think I\u2019ve finally settled on a decent architecture, but the process has forced me to rethink some of my go-to patterns that I use to build on cloud-based software.</p>
<h2 id="am-i-the-client-or-the-server">Am I the Client or the Server?</h2>
<p>In my normal day-to-day work I\u2019m almost always writing code for the <em>client</em>.
You want data? Make an HTTP request from the <em>server</em> to get it.
You need a file? Make an HTTP request from the <em>server</em>.
In a local-first app those boundaries aren\u2019t as clear.
I can write a SQL query right next to my React component!</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">SomeComponent</span><span style="color: #E1E4E8">({ </span><span style="color: #FFAB70">db</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">id</span><span style="color: #E1E4E8"> }) {</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">async</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">function</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">updateName</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">name</span><span style="color: #E1E4E8">) {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #F97583">await</span><span style="color: #E1E4E8"> db.</span><span style="color: #B392F0">execute</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">\`</span></span>
<span class="line"><span style="color: #9ECBFF">      UPDATE songs</span></span>
<span class="line"><span style="color: #9ECBFF">      SET name = ?</span></span>
<span class="line"><span style="color: #9ECBFF">      WHERE id = ?</span></span>
<span class="line"><span style="color: #9ECBFF">    \`</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">    [name, id]</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">return</span><span style="color: #E1E4E8"> (</span></span>
<span class="line"><span style="color: #E1E4E8">    &#x3C;</span><span style="color: #85E89D">input</span></span>
<span class="line"><span style="color: #E1E4E8">      </span><span style="color: #B392F0">onChange</span><span style="color: #F97583">=</span><span style="color: #E1E4E8">{</span><span style="color: #FFAB70">evt</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">updateName</span><span style="color: #E1E4E8">(evt.target.value)}</span></span>
<span class="line"><span style="color: #E1E4E8">    /></span></span>
<span class="line"><span style="color: #E1E4E8">  );</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<h2 id="storage-also-syncing-and-undoredo-oh-also-searching">Storage? Also Syncing. And undo/redo. Oh also searching?</h2>
<p>So far I\u2019ve found it challenging to get all of these features out of the box.
Like anything in software, the architecture needs to be based on the needs of the application.
One of the best parts about local-first apps is that your data is truly local.
But that also means that if you <em>want</em> that data to be available elsewhere (like on a phone perhaps), then you have to figure out how to sync the data.
Additionally, if you want multiple people to interact with that data you need to think about merging and conflict resolution.
Tying in undo/redo into syncing and conflict resolution makes all of that a <em>hard</em> application to build.</p>
<p>The rage right now for local-first apps is <a href="https://crdt.tech/">CRDTs</a>.
I\u2019m still wrapping my head around it, but I understand enough to know that I don\u2019t want to build this myself.
There are a couple of libraries out there that do this like <a href="https://automerge.org/">Automerge</a> and <a href="https://yjs.dev/">Y.js</a>.
Y.js in particular seems pretty darn good as it has syncing and undo/redo out of the box.</p>
<p>The last challenge that relates here is searching.
For a local-first app, it feels strange to <em>not</em> choose SQLite since it can easily and efficiently search and query.
Using a CRDT library feels like it forces data into a document-based storage format which conflicts a little with how one might typically structure a SQLite database.</p>
<p>Can you have a CRDT data structure that supports undo/redo and store that in SQLite?
Probably, but I haven\u2019t figured it out yet.</p>`),Fo={title:"Challenges of a Local-first App",date:"2022-07-16T00:00:00.000Z",description:"Blurring the lines of client and server"},ko="/Users/nickball/code/npb/src/content/blog/local-first-challenges.md",Co=void 0;Io[Symbol.for("astro.needsHeadRendering")]=!0});var Ao={};f(Ao,{default:()=>ld});async function ad(){return Promise.resolve().then(()=>(Bo(),So))}var od,id,rd,ld,To=h(()=>{od="@@ASTRO-LINKS@@",id="@@ASTRO-STYLES@@",rd="@@ASTRO-SCRIPTS@@",ld={__astroPropagation:!0,getMod:ad,collectedLinks:od,collectedStyles:id,collectedScripts:rd}});var Lo={};f(Lo,{Content:()=>Ro,compiledContent:()=>ud,default:()=>Ro,file:()=>_o,frontmatter:()=>Mo,getHeadings:()=>dd,images:()=>hn,rawContent:()=>cd,url:()=>Po});function pd(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:hn[s].src,...hn[s].attributes}))}function cd(){return`
In the past few months I've had the chance to work on features that required back-end work. While the features may have been typical tasks for a back-end developer, they were new territory for me. As a front-end developer, I've generally been able to get pretty far only knowing the minimal amount of back-end subjects to get my front-end work done. As I mention below, I think there is some merit in being blissfully ignorant in some areas so that you can focus more on your specialty areas. But, I also think this approach can lead to knowledge gaps, which has definitely been the case for me. Black holes of web development topics that I _sort of_ understand, but not quite enough to explain. Getting out of my comfort zone has allowed me to explore those unknown areas and remove some amount of "magic" from my understanding.

## Background

To give some context, I have had _some_ experience touching back-end areas, but this experience was limited to basic CRUD operations using Ruby and PHP. I do think this experience contributed in some way to my overall understanding, but not in a significant way. I might say up until a few months ago, I understood things like:

- The basics of HTTP and communication between the front-end and back-end (e.g. \`GET\`, \`POST\`, etc.)
- Primitive database knowledge. I knew that there were tables of "things" that may have columns that point to other tables of other things.
- The gist of authorization and authentication. I understood as much as I needed to about session cookies and authentication to get by as a front-end developer.

## Specialist Vs. Generalist

I've always considered myself more of a specialist than a generalist. I enjoy going deep on topics and really trying to become an expert on them. I'm of the opinion that there are just too many topics to cover in web development to ever really _know_ all of them. Being a "full-stack" engineer was never something I aspired to because I felt like I'd be overwhelmed trying to become an expert in too many topics. My experience working with full-stack engineers has been that most are closer to back-end engineers than front-end engineers. I also feel that a specialist may be a better career choice in the long-term, though I don't have any actual data to back that up.

Despite my tendency towards being a specialist, I still love learning things and find it hard to turn down opportunities to do so. I've found that learning opportunities that come up at my job are especially beneficial because they have _true_ business use cases. It's not a todo list tutorial, but something that might bring real value to the business. Not that todo list tutorials don't have their place, but the real-life context of learning things on the job adds an amount of motivation they may otherwise be hard to muster on your own.

## Conclusion

I've dubbed 2017 as "the year of learning back end" for me and I've had a great experience so far. While I don't see myself transitioning to a full on back-end developer anytime soon, I think that becoming a better overall developer can absolutely help me become a better front-end developer. Who knows? Maybe I'll transition to a seemingly-rare full-stack engineer that leans towards the front-end instead of the back-end. I often look at web development as a big puzzle where I'm just learning how different pieces fit together. These new back-end bits are just a few of those stubborn, oddly-shaped pieces that help me see the whole picture a little bit better.
`}function ud(){return jo}function dd(){return[{depth:2,slug:"background",text:"Background"},{depth:2,slug:"specialist-vs-generalist",text:"Specialist Vs. Generalist"},{depth:2,slug:"conclusion",text:"Conclusion"}]}async function Ro(){let{layout:e,...t}=Mo;return t.file=_o,t.url=Po,j(A,{"set:html":jo})}var Wy,Jy,hn,jo,Mo,_o,Po,No=h(()=>{M();Wy=y(_(),1);P();Jy=y(R(),1);L();N();hn={};jo=pd(`<p>In the past few months I\u2019ve had the chance to work on features that required back-end work. While the features may have been typical tasks for a back-end developer, they were new territory for me. As a front-end developer, I\u2019ve generally been able to get pretty far only knowing the minimal amount of back-end subjects to get my front-end work done. As I mention below, I think there is some merit in being blissfully ignorant in some areas so that you can focus more on your specialty areas. But, I also think this approach can lead to knowledge gaps, which has definitely been the case for me. Black holes of web development topics that I <em>sort of</em> understand, but not quite enough to explain. Getting out of my comfort zone has allowed me to explore those unknown areas and remove some amount of \u201Cmagic\u201D from my understanding.</p>
<h2 id="background">Background</h2>
<p>To give some context, I have had <em>some</em> experience touching back-end areas, but this experience was limited to basic CRUD operations using Ruby and PHP. I do think this experience contributed in some way to my overall understanding, but not in a significant way. I might say up until a few months ago, I understood things like:</p>
<ul>
<li>The basics of HTTP and communication between the front-end and back-end (e.g. <code>GET</code>, <code>POST</code>, etc.)</li>
<li>Primitive database knowledge. I knew that there were tables of \u201Cthings\u201D that may have columns that point to other tables of other things.</li>
<li>The gist of authorization and authentication. I understood as much as I needed to about session cookies and authentication to get by as a front-end developer.</li>
</ul>
<h2 id="specialist-vs-generalist">Specialist Vs. Generalist</h2>
<p>I\u2019ve always considered myself more of a specialist than a generalist. I enjoy going deep on topics and really trying to become an expert on them. I\u2019m of the opinion that there are just too many topics to cover in web development to ever really <em>know</em> all of them. Being a \u201Cfull-stack\u201D engineer was never something I aspired to because I felt like I\u2019d be overwhelmed trying to become an expert in too many topics. My experience working with full-stack engineers has been that most are closer to back-end engineers than front-end engineers. I also feel that a specialist may be a better career choice in the long-term, though I don\u2019t have any actual data to back that up.</p>
<p>Despite my tendency towards being a specialist, I still love learning things and find it hard to turn down opportunities to do so. I\u2019ve found that learning opportunities that come up at my job are especially beneficial because they have <em>true</em> business use cases. It\u2019s not a todo list tutorial, but something that might bring real value to the business. Not that todo list tutorials don\u2019t have their place, but the real-life context of learning things on the job adds an amount of motivation they may otherwise be hard to muster on your own.</p>
<h2 id="conclusion">Conclusion</h2>
<p>I\u2019ve dubbed 2017 as \u201Cthe year of learning back end\u201D for me and I\u2019ve had a great experience so far. While I don\u2019t see myself transitioning to a full on back-end developer anytime soon, I think that becoming a better overall developer can absolutely help me become a better front-end developer. Who knows? Maybe I\u2019ll transition to a seemingly-rare full-stack engineer that leans towards the front-end instead of the back-end. I often look at web development as a big puzzle where I\u2019m just learning how different pieces fit together. These new back-end bits are just a few of those stubborn, oddly-shaped pieces that help me see the whole picture a little bit better.</p>`),Mo={title:"On Becoming Full Stack",date:"2017-08-19T00:00:00.000Z",description:"Taking on new roles as a front-end engineer"},_o="/Users/nickball/code/npb/src/content/blog/on-full-stack.md",Po=void 0;Ro[Symbol.for("astro.needsHeadRendering")]=!0});var Ho={};f(Ho,{default:()=>gd});async function hd(){return Promise.resolve().then(()=>(No(),Lo))}var md,yd,fd,gd,Oo=h(()=>{md="@@ASTRO-LINKS@@",yd="@@ASTRO-STYLES@@",fd="@@ASTRO-SCRIPTS@@",gd={__astroPropagation:!0,getMod:hd,collectedLinks:md,collectedStyles:yd,collectedScripts:fd}});var Go={};f(Go,{Content:()=>Wo,compiledContent:()=>wd,default:()=>Wo,file:()=>Uo,frontmatter:()=>qo,getHeadings:()=>Dd,images:()=>mn,rawContent:()=>bd,url:()=>zo});function Ed(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:mn[s].src,...mn[s].attributes}))}function bd(){return`
If you're building a web app that allows users to write free-form text in 2018,
it's very likely that you'll come upon the need to present that text with
various formatting options like **bold** or _italic_, so called [_rich text_](https://techterms.com/definition/richtext).
In fact, I'd wager to say that it's almost a requirement to have some kind of
rich text editing interface for any kind of business-user-facing web app because
it's such a universally needed feature.

Dealing with rich text on the web is an interesting problem, but it's interesting
because it's...well, uninteresting. Users have been inputting rich text for years
in word processors like Microsoft Word, so the interaction details are somewhat known
and established. There's not much in the way of exciting, modern UX to build here,
so in that sense it's a little uninteresting. In that same sense, though, it's also
a _win_. Anytime you can build a web experience that users already know how to
use and lets them get stuff done is a good thing in my opinion.

However, just because it's fairly established as a UX pattern doesn't mean it's
completely solved as an implementation. It's been my personal mission the last
few weeks to solve this problem for an app we're building at [HelloSign](https://www.hellosign.com),
so I've been deep in the weeds of this topic. During my research I found lots
of good content on the surface-level implementation details, like which libraries
are out there and the various techniques for building a rich text editor component.
But I found it difficult to find information on some of the deeper, more practical
problems that I was facing, like:

- How do I store this in my database?
- How do I handle both the editing _and_ displaying of the rich text in different contexts? Are those two concepts the same thing?
- What about things like "mentions" that's not really just text?
- What about security?

So I thought I'd write a bit about those particular aspects. This won't be an
article about the specifics of building a rich text editor, although I may add
one of those next!

## What is rich text and why is it difficult?

Before going further it's probably best to give some context on what exactly I mean
when referring to rich text. Here's a quick screen shot of a rich text editor
from [Atlassian's component library](https://atlaskit.atlassian.com/examples/editor/editor-core/full-page):

![Example of a rich text editor](/posts/rich-text.png)

The way I think about rich text is that it's plain text with additional structural
and formatting information attached directly to it. I also think of rich text as
having a few different vantage points:

- From the perspective of the user, it's just text that's visually displayed with the chosen formatting (we'll get to things like "mentions" later).
- From the perspective of the browser, it's HTML. This may seem obvious, but I find it helpful to call it out in order to distinguish this point of view from the next one.
- From the perspective of the developer, it's data. Ultimately, rich text cannot be represented with just text, so it needs to be represented as some
  sort of data structure. This _could_ also be HTML but it could also be another format, like JSON or markdown. More on that later.

Having these three perspectives helped me work towards a solution that fit my
needs but it also highlights why this problem can be a difficult one to solve. Like most
problems in web development, I found that there was really no one "correct"
solution. Each piece of the solution relied on various aspects of my own
particular needs. Trade offs were made.

For me, I found a few of the core considerations for the problem to be:

- What kind of content will users be allowed to enter?
- What are all of the rendering contexts that need to be supported?
- How will security be handled?
- What other processes need to interact with the rich text content?

Continuing to ask these core questions along the way in my research helped me
work towards a reasonable (_I hope_ \u{1F62C}) solution.

## Database storage

Before moving forward with much else, I wanted to have an idea of the kinds of
inputs and outputs I'd be dealing with and how I'd store and retrieve those
values from the database. There were a few options that I'd found being used
in the community.

### HTML

Most WYSIWYG (_what-you-see-is-what-you-get_) editors of the past worked strictly with
HTML. Meaning, you start with a blob of HTML and you get out a blob of HTML.
An example would be an editor like [TinyMCE](https://www.tinymce.com/) or [CKEditor](https://ckeditor.com/).
This makes plenty of sense and existing libraries still do this today. After all,
HTML is the language of the web. It's a standardized, familiar syntax that's
easily interoperable with anything that can understand HTML.

Storing the rich text value as HTML would mean storing a text value like this:

\`\`\`html
<p>Open the console to see the <em>html.get</em> method working.</p>
<p><span style="font-size: 18px;">HELLO</span></p>
<p>
  <span style="font-size: 18px;"
    ><a href="https://google.com">GOOGLE LINK</a></span
  >
</p>
<p><br /></p>
\`\`\`

If you're at all security-minded, storing user-generated HTML probably sets
off some red flags. Anytime you are storing user-generated content with the intent
of rendering that content back out on the screen, you are vulnerable to [XSS](<https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)>) (Cross-site-scripting)
attacks. Technically while any user-generated content is vulnerable to this, I
feel it's particularly relevant when dealing with rich text stored as HTML because
it's likely that it will be rendered back out _as_ HTML (e.g. \`element.innerHTML = storedHTML\`) which is where XSS usually
comes in to play.

That said, storing HTML is perfectly valid and is still used today. There is a way to handle it that's
reasonable safe. A general strategy could be to sanitize the generated HTML for XSS concerns
and use a whitelist approached to strip out anything that you deem not appropriate.
There are plenty of libraries that do this ([DOMPurify](https://github.com/cure53/DOMPurify) is one).
And note that you usually want to do this on _both_ inputs and outputs, so sanitize
on the server before saving to the database and before rendering to the screen. This will give you a
reasonably safe implementation, but some security devs may still not love it.
Storing HTML in the database can feel a bit like a ticking time bomb that can blow
up some point way in the future if you forget to follow one of the security steps
when saving or rendering.

A few interesting points I noticed about using HTML to store rich text values:

**It's very powerful for styling options**

This can be seen as either a good thing or bad thing. In the example above, to
be able to display a custom font size the \`font-size\` property is added:

\`\`\`html
<span style="font-size: 18px">words</span>
\`\`\`

This gives the client a pretty powerful mechanism for generating the exact
visual representation that it wants without much room for interpretation. This
could be a good thing if you need users to be able to expressive lots of
different visual formatting and you just want to retrieve this value from the
database and drop into an HTML page. However, there could be a case to be made
that it's _too_ powerful. The client could generate this:

\`\`\`html
<span style="font-size: 3000px">words</span>
\`\`\`

It's unlikely clients need the power to render font sizes at 3000 pixels!

**It's a more literal representation of the contents**

The HTML generated in the example above is a very literal representation of the
contents. Meaning, it represents text with _exactly_ a font size of 18 pixels.
If you're only rendering within the context of web browsers and you want to be able to
stick the generated content on a page and be done with it, this can be a good
option. However I find that in some cases it can be better to leave yourself
with room to evolve your UI. For example, instead of saving a literal font size
value maybe you save something like this:

\`\`\`html
<span class="f-1">words</span>
\`\`\`

In most cases, that's probably not what you want. Sure you can validate this
on both the client and the server, but it may become difficult to keep up with
all of the different ways HTML can make for some horrible looking web pages.

Similar to how you might style a regular webpage, you likely don't style with
exact pixel values but instead style with classes that represent relative values
that you can evolve and change over time. It also could allow you to represent
that text differently for different rendering contexts if you need to. For example,
maybe you're rendering to a PDF that uses a different font family so the pixel
value needs to be slightly different.

Exploring the idea of storing my rich text as HTML began to highlight the fact that
there is a difference between storing the literal content of the rich text and
storing a _description_ of the rich text. For my use case, I wanted pretty tight
control over how my rich text rendered and even had different eventual rendering
targets (more on that later), so I realized that if I were to use HTML I would
essentially be using HTML as a data format. Meaning, I likely wouldn't allow
just _any_ HTML to be stored, it would be a controlled subset with a specific
structure that I could potentially render in different ways to different targets.
In fact, there's a good article by one of the project leads for CKEditor that
describes using HTML as the data format for rich text: [A Standard for Rich-Text Data](https://medium.com/content-uneditable/a-standard-for-rich-text-data-4b3a507af552).

### Markdown

To take a step back from HTML, my first thought for an MVP-like solution to this problem was to support [Markdown](https://daringfireball.net/projects/markdown/syntax).
Markdown is a fairly well-known syntax for doing basic formatting. It's used on
developer-centric sites like Github and StackOverflow. Markdown is a nice solution
because it avoids a few of the security issues (but not all!) with HTML and doesn't require any
kind of special client-side components to work with. It's still plain text when
it's entered by the user and only turned into HTML when saved to the database or
rendered to the browser. The syntax is small and relatively standardized so it's
likely there will be plenty of existing libraries to choose from that can take
Markdown and spit out HTML.

The issue with Markdown is that, by design, only supports a very limited set of
formatting. If you're just doing bold and italic formatting, then Markdown will
work just fine. If you're doing anything more complex, like colors or font families,
then vanilla Markdown won't help you. There are some extensions and "flavors" to
Markdown for extending the syntax, but at that point I think Markdown starts to
lose a little bit of its original value. Markdown is not really meant to do
much more than basic formatting. Anything outside of basic formatting and Markdown
yields to just allowing arbitrary HTML, in which case you're back to dealing
with all of the points mentioned in the above section.

I like the idea of Markdown and I think it makes sense if you're able to stick with
basic formatting.

### JSON

If you've decided that you want to store a description of your rich text data to
your database, JSON seems like a natural choice. In fact, many modern rich text
editors represent their contents not with HTML but with a custom data structure
that can be easily serialized to JSON. QuillJS has a [Delta](https://quilljs.com/docs/delta/)
format, ProseMirror has a [Document](https://prosemirror.net/docs/ref/#model.Document_Structure),
and DraftJS has its own [EditorState](https://draftjs.org/docs/api-reference-editor-state.html).

Based on what we've discussed so far, here are some good things about storing rich
text as JSON:

- It's more secure against XSS by default. You can't just pass a string of JSON
  and render it as HTML.
- It can represent any kind of content and formatting you might need
- It can be easily parsed, validated, and manipluated by almost any system
- It's a description of the content, so it can be rendered differently to different targets

Those good things also come with some downsides:

- No standardization. There is no _one_ JSON format for rich text. Each library
  implements their own version which can lead to lock-in
- More code. Because you can't just render JSON to HTML, that means you need to
  write code that knows how to do that.

JSON can be a good option for any reasonably complex rich text editor needs if you're
willing to write more code. A way of dealing with library and JSON format
lock-in is to make sure you a strategy for migrating and making changes over time.
Using a [JSON Schema](http://json-schema.org/) definition with a version number
is a good way to do that.

There are also explorations into standard-ish formats for representing rich text.
[Mobiledoc](https://github.com/bustle/mobiledoc-kit) and [Portable Text](https://github.com/portabletext/portabletext) are two that I've seen in this area.

## Rendering outside of the editor

Another interesting consideration when thinking about rich text is where you're
going to need to render that rich text. In some cases, you only need it in the
context of an editor. Something like Dropbox Paper or Google docs is an example.
You only ever pull that rich text up in the editor so you can be free to optimize
for that rendering target. But in some cases you have both the editing context
_and_ the rendering context. For example, you may be editing rich text in the
admin section of a blog, saving it to the database, and then rendering it back
out on a completely separate page. In those cases, you need a way to render that
rich text to the screen directly from the database. HTML has an advantage here
because it can just be rendered directly. JSON must be encoded to HTML somehow
first. Some solutions to this require that a read-only instance of a rich text
editor be loaded up to render the custom JSON format. I've found most rich text
libraries to be pretty heavy so in my opinion this is not ideal. However, a
JSON format that is simple enough can be fairly easily encoded into HTML without
the need for the entire editor library. This also can help negate some of the
security issues with rendering user-generated content. A controlled "renderer"
will only render the things it knows about and likely will be rendering actual
user content as text, not HTML.

## Summary

There's probably a lot more I could say about rich text.
I found it to be a deep, challenging, and, at times, overwhelming topic for a seemingly universal need for most web apps.
For my own use, I ended up going with [ProseMirror](https://prosemirror.net/) but it's not without its own tradeoffs.

## Thanks

Big thanks to Atlassian for their open-source code in [AtlasKit](https://atlaskit.atlassian.com/) which was a great help in seeing how a real-world rich text eidtor could be built.
`}function wd(){return $o}function Dd(){return[{depth:2,slug:"what-is-rich-text-and-why-is-it-difficult",text:"What is rich text and why is it difficult?"},{depth:2,slug:"database-storage",text:"Database storage"},{depth:3,slug:"html",text:"HTML"},{depth:3,slug:"markdown",text:"Markdown"},{depth:3,slug:"json",text:"JSON"},{depth:2,slug:"rendering-outside-of-the-editor",text:"Rendering outside of the editor"},{depth:2,slug:"summary",text:"Summary"},{depth:2,slug:"thanks",text:"Thanks"}]}async function Wo(){let{layout:e,...t}=qo;return t.file=Uo,t.url=zo,j(A,{"set:html":$o})}var Xy,Zy,mn,$o,qo,Uo,zo,Jo=h(()=>{M();Xy=y(_(),1);P();Zy=y(R(),1);L();N();mn={};$o=Ed(`<p>If you\u2019re building a web app that allows users to write free-form text in 2018,
it\u2019s very likely that you\u2019ll come upon the need to present that text with
various formatting options like <strong>bold</strong> or <em>italic</em>, so called <a href="https://techterms.com/definition/richtext"><em>rich text</em></a>.
In fact, I\u2019d wager to say that it\u2019s almost a requirement to have some kind of
rich text editing interface for any kind of business-user-facing web app because
it\u2019s such a universally needed feature.</p>
<p>Dealing with rich text on the web is an interesting problem, but it\u2019s interesting
because it\u2019s\u2026well, uninteresting. Users have been inputting rich text for years
in word processors like Microsoft Word, so the interaction details are somewhat known
and established. There\u2019s not much in the way of exciting, modern UX to build here,
so in that sense it\u2019s a little uninteresting. In that same sense, though, it\u2019s also
a <em>win</em>. Anytime you can build a web experience that users already know how to
use and lets them get stuff done is a good thing in my opinion.</p>
<p>However, just because it\u2019s fairly established as a UX pattern doesn\u2019t mean it\u2019s
completely solved as an implementation. It\u2019s been my personal mission the last
few weeks to solve this problem for an app we\u2019re building at <a href="https://www.hellosign.com">HelloSign</a>,
so I\u2019ve been deep in the weeds of this topic. During my research I found lots
of good content on the surface-level implementation details, like which libraries
are out there and the various techniques for building a rich text editor component.
But I found it difficult to find information on some of the deeper, more practical
problems that I was facing, like:</p>
<ul>
<li>How do I store this in my database?</li>
<li>How do I handle both the editing <em>and</em> displaying of the rich text in different contexts? Are those two concepts the same thing?</li>
<li>What about things like \u201Cmentions\u201D that\u2019s not really just text?</li>
<li>What about security?</li>
</ul>
<p>So I thought I\u2019d write a bit about those particular aspects. This won\u2019t be an
article about the specifics of building a rich text editor, although I may add
one of those next!</p>
<h2 id="what-is-rich-text-and-why-is-it-difficult">What is rich text and why is it difficult?</h2>
<p>Before going further it\u2019s probably best to give some context on what exactly I mean
when referring to rich text. Here\u2019s a quick screen shot of a rich text editor
from <a href="https://atlaskit.atlassian.com/examples/editor/editor-core/full-page">Atlassian\u2019s component library</a>:</p>
<p><img src="/posts/rich-text.png" alt="Example of a rich text editor"></p>
<p>The way I think about rich text is that it\u2019s plain text with additional structural
and formatting information attached directly to it. I also think of rich text as
having a few different vantage points:</p>
<ul>
<li>From the perspective of the user, it\u2019s just text that\u2019s visually displayed with the chosen formatting (we\u2019ll get to things like \u201Cmentions\u201D later).</li>
<li>From the perspective of the browser, it\u2019s HTML. This may seem obvious, but I find it helpful to call it out in order to distinguish this point of view from the next one.</li>
<li>From the perspective of the developer, it\u2019s data. Ultimately, rich text cannot be represented with just text, so it needs to be represented as some
sort of data structure. This <em>could</em> also be HTML but it could also be another format, like JSON or markdown. More on that later.</li>
</ul>
<p>Having these three perspectives helped me work towards a solution that fit my
needs but it also highlights why this problem can be a difficult one to solve. Like most
problems in web development, I found that there was really no one \u201Ccorrect\u201D
solution. Each piece of the solution relied on various aspects of my own
particular needs. Trade offs were made.</p>
<p>For me, I found a few of the core considerations for the problem to be:</p>
<ul>
<li>What kind of content will users be allowed to enter?</li>
<li>What are all of the rendering contexts that need to be supported?</li>
<li>How will security be handled?</li>
<li>What other processes need to interact with the rich text content?</li>
</ul>
<p>Continuing to ask these core questions along the way in my research helped me
work towards a reasonable (<em>I hope</em> \u{1F62C}) solution.</p>
<h2 id="database-storage">Database storage</h2>
<p>Before moving forward with much else, I wanted to have an idea of the kinds of
inputs and outputs I\u2019d be dealing with and how I\u2019d store and retrieve those
values from the database. There were a few options that I\u2019d found being used
in the community.</p>
<h3 id="html">HTML</h3>
<p>Most WYSIWYG (<em>what-you-see-is-what-you-get</em>) editors of the past worked strictly with
HTML. Meaning, you start with a blob of HTML and you get out a blob of HTML.
An example would be an editor like <a href="https://www.tinymce.com/">TinyMCE</a> or <a href="https://ckeditor.com/">CKEditor</a>.
This makes plenty of sense and existing libraries still do this today. After all,
HTML is the language of the web. It\u2019s a standardized, familiar syntax that\u2019s
easily interoperable with anything that can understand HTML.</p>
<p>Storing the rich text value as HTML would mean storing a text value like this:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">>Open the console to see the &#x3C;</span><span style="color: #85E89D">em</span><span style="color: #E1E4E8">>html.get&#x3C;/</span><span style="color: #85E89D">em</span><span style="color: #E1E4E8">> method working.&#x3C;/</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">>&#x3C;</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">style</span><span style="color: #E1E4E8">=</span><span style="color: #9ECBFF">"font-size: 18px;"</span><span style="color: #E1E4E8">>HELLO&#x3C;/</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8">>&#x3C;/</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">  &#x3C;</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">style</span><span style="color: #E1E4E8">=</span><span style="color: #9ECBFF">"font-size: 18px;"</span></span>
<span class="line"><span style="color: #E1E4E8">    >&#x3C;</span><span style="color: #85E89D">a</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">href</span><span style="color: #E1E4E8">=</span><span style="color: #9ECBFF">"https://google.com"</span><span style="color: #E1E4E8">>GOOGLE LINK&#x3C;/</span><span style="color: #85E89D">a</span><span style="color: #E1E4E8">>&#x3C;/</span><span style="color: #85E89D">span</span></span>
<span class="line"><span style="color: #E1E4E8">  ></span></span>
<span class="line"><span style="color: #E1E4E8">&#x3C;/</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">></span></span>
<span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">>&#x3C;</span><span style="color: #85E89D">br</span><span style="color: #E1E4E8"> />&#x3C;/</span><span style="color: #85E89D">p</span><span style="color: #E1E4E8">></span></span></code></pre>
<p>If you\u2019re at all security-minded, storing user-generated HTML probably sets
off some red flags. Anytime you are storing user-generated content with the intent
of rendering that content back out on the screen, you are vulnerable to <a href="https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)">XSS</a> (Cross-site-scripting)
attacks. Technically while any user-generated content is vulnerable to this, I
feel it\u2019s particularly relevant when dealing with rich text stored as HTML because
it\u2019s likely that it will be rendered back out <em>as</em> HTML (e.g. <code>element.innerHTML = storedHTML</code>) which is where XSS usually
comes in to play.</p>
<p>That said, storing HTML is perfectly valid and is still used today. There is a way to handle it that\u2019s
reasonable safe. A general strategy could be to sanitize the generated HTML for XSS concerns
and use a whitelist approached to strip out anything that you deem not appropriate.
There are plenty of libraries that do this (<a href="https://github.com/cure53/DOMPurify">DOMPurify</a> is one).
And note that you usually want to do this on <em>both</em> inputs and outputs, so sanitize
on the server before saving to the database and before rendering to the screen. This will give you a
reasonably safe implementation, but some security devs may still not love it.
Storing HTML in the database can feel a bit like a ticking time bomb that can blow
up some point way in the future if you forget to follow one of the security steps
when saving or rendering.</p>
<p>A few interesting points I noticed about using HTML to store rich text values:</p>
<p><strong>It\u2019s very powerful for styling options</strong></p>
<p>This can be seen as either a good thing or bad thing. In the example above, to
be able to display a custom font size the <code>font-size</code> property is added:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">style</span><span style="color: #E1E4E8">=</span><span style="color: #9ECBFF">"font-size: 18px"</span><span style="color: #E1E4E8">>words&#x3C;/</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8">></span></span></code></pre>
<p>This gives the client a pretty powerful mechanism for generating the exact
visual representation that it wants without much room for interpretation. This
could be a good thing if you need users to be able to expressive lots of
different visual formatting and you just want to retrieve this value from the
database and drop into an HTML page. However, there could be a case to be made
that it\u2019s <em>too</em> powerful. The client could generate this:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">style</span><span style="color: #E1E4E8">=</span><span style="color: #9ECBFF">"font-size: 3000px"</span><span style="color: #E1E4E8">>words&#x3C;/</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8">></span></span></code></pre>
<p>It\u2019s unlikely clients need the power to render font sizes at 3000 pixels!</p>
<p><strong>It\u2019s a more literal representation of the contents</strong></p>
<p>The HTML generated in the example above is a very literal representation of the
contents. Meaning, it represents text with <em>exactly</em> a font size of 18 pixels.
If you\u2019re only rendering within the context of web browsers and you want to be able to
stick the generated content on a page and be done with it, this can be a good
option. However I find that in some cases it can be better to leave yourself
with room to evolve your UI. For example, instead of saving a literal font size
value maybe you save something like this:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">&#x3C;</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">class</span><span style="color: #E1E4E8">=</span><span style="color: #9ECBFF">"f-1"</span><span style="color: #E1E4E8">>words&#x3C;/</span><span style="color: #85E89D">span</span><span style="color: #E1E4E8">></span></span></code></pre>
<p>In most cases, that\u2019s probably not what you want. Sure you can validate this
on both the client and the server, but it may become difficult to keep up with
all of the different ways HTML can make for some horrible looking web pages.</p>
<p>Similar to how you might style a regular webpage, you likely don\u2019t style with
exact pixel values but instead style with classes that represent relative values
that you can evolve and change over time. It also could allow you to represent
that text differently for different rendering contexts if you need to. For example,
maybe you\u2019re rendering to a PDF that uses a different font family so the pixel
value needs to be slightly different.</p>
<p>Exploring the idea of storing my rich text as HTML began to highlight the fact that
there is a difference between storing the literal content of the rich text and
storing a <em>description</em> of the rich text. For my use case, I wanted pretty tight
control over how my rich text rendered and even had different eventual rendering
targets (more on that later), so I realized that if I were to use HTML I would
essentially be using HTML as a data format. Meaning, I likely wouldn\u2019t allow
just <em>any</em> HTML to be stored, it would be a controlled subset with a specific
structure that I could potentially render in different ways to different targets.
In fact, there\u2019s a good article by one of the project leads for CKEditor that
describes using HTML as the data format for rich text: <a href="https://medium.com/content-uneditable/a-standard-for-rich-text-data-4b3a507af552">A Standard for Rich-Text Data</a>.</p>
<h3 id="markdown">Markdown</h3>
<p>To take a step back from HTML, my first thought for an MVP-like solution to this problem was to support <a href="https://daringfireball.net/projects/markdown/syntax">Markdown</a>.
Markdown is a fairly well-known syntax for doing basic formatting. It\u2019s used on
developer-centric sites like Github and StackOverflow. Markdown is a nice solution
because it avoids a few of the security issues (but not all!) with HTML and doesn\u2019t require any
kind of special client-side components to work with. It\u2019s still plain text when
it\u2019s entered by the user and only turned into HTML when saved to the database or
rendered to the browser. The syntax is small and relatively standardized so it\u2019s
likely there will be plenty of existing libraries to choose from that can take
Markdown and spit out HTML.</p>
<p>The issue with Markdown is that, by design, only supports a very limited set of
formatting. If you\u2019re just doing bold and italic formatting, then Markdown will
work just fine. If you\u2019re doing anything more complex, like colors or font families,
then vanilla Markdown won\u2019t help you. There are some extensions and \u201Cflavors\u201D to
Markdown for extending the syntax, but at that point I think Markdown starts to
lose a little bit of its original value. Markdown is not really meant to do
much more than basic formatting. Anything outside of basic formatting and Markdown
yields to just allowing arbitrary HTML, in which case you\u2019re back to dealing
with all of the points mentioned in the above section.</p>
<p>I like the idea of Markdown and I think it makes sense if you\u2019re able to stick with
basic formatting.</p>
<h3 id="json">JSON</h3>
<p>If you\u2019ve decided that you want to store a description of your rich text data to
your database, JSON seems like a natural choice. In fact, many modern rich text
editors represent their contents not with HTML but with a custom data structure
that can be easily serialized to JSON. QuillJS has a <a href="https://quilljs.com/docs/delta/">Delta</a>
format, ProseMirror has a <a href="https://prosemirror.net/docs/ref/#model.Document_Structure">Document</a>,
and DraftJS has its own <a href="https://draftjs.org/docs/api-reference-editor-state.html">EditorState</a>.</p>
<p>Based on what we\u2019ve discussed so far, here are some good things about storing rich
text as JSON:</p>
<ul>
<li>It\u2019s more secure against XSS by default. You can\u2019t just pass a string of JSON
and render it as HTML.</li>
<li>It can represent any kind of content and formatting you might need</li>
<li>It can be easily parsed, validated, and manipluated by almost any system</li>
<li>It\u2019s a description of the content, so it can be rendered differently to different targets</li>
</ul>
<p>Those good things also come with some downsides:</p>
<ul>
<li>No standardization. There is no <em>one</em> JSON format for rich text. Each library
implements their own version which can lead to lock-in</li>
<li>More code. Because you can\u2019t just render JSON to HTML, that means you need to
write code that knows how to do that.</li>
</ul>
<p>JSON can be a good option for any reasonably complex rich text editor needs if you\u2019re
willing to write more code. A way of dealing with library and JSON format
lock-in is to make sure you a strategy for migrating and making changes over time.
Using a <a href="http://json-schema.org/">JSON Schema</a> definition with a version number
is a good way to do that.</p>
<p>There are also explorations into standard-ish formats for representing rich text.
<a href="https://github.com/bustle/mobiledoc-kit">Mobiledoc</a> and <a href="https://github.com/portabletext/portabletext">Portable Text</a> are two that I\u2019ve seen in this area.</p>
<h2 id="rendering-outside-of-the-editor">Rendering outside of the editor</h2>
<p>Another interesting consideration when thinking about rich text is where you\u2019re
going to need to render that rich text. In some cases, you only need it in the
context of an editor. Something like Dropbox Paper or Google docs is an example.
You only ever pull that rich text up in the editor so you can be free to optimize
for that rendering target. But in some cases you have both the editing context
<em>and</em> the rendering context. For example, you may be editing rich text in the
admin section of a blog, saving it to the database, and then rendering it back
out on a completely separate page. In those cases, you need a way to render that
rich text to the screen directly from the database. HTML has an advantage here
because it can just be rendered directly. JSON must be encoded to HTML somehow
first. Some solutions to this require that a read-only instance of a rich text
editor be loaded up to render the custom JSON format. I\u2019ve found most rich text
libraries to be pretty heavy so in my opinion this is not ideal. However, a
JSON format that is simple enough can be fairly easily encoded into HTML without
the need for the entire editor library. This also can help negate some of the
security issues with rendering user-generated content. A controlled \u201Crenderer\u201D
will only render the things it knows about and likely will be rendering actual
user content as text, not HTML.</p>
<h2 id="summary">Summary</h2>
<p>There\u2019s probably a lot more I could say about rich text.
I found it to be a deep, challenging, and, at times, overwhelming topic for a seemingly universal need for most web apps.
For my own use, I ended up going with <a href="https://prosemirror.net/">ProseMirror</a> but it\u2019s not without its own tradeoffs.</p>
<h2 id="thanks">Thanks</h2>
<p>Big thanks to Atlassian for their open-source code in <a href="https://atlaskit.atlassian.com/">AtlasKit</a> which was a great help in seeing how a real-world rich text eidtor could be built.</p>`),qo={title:"Rich Text on the Web in 2018",date:"2018-07-04T00:00:00.000Z",description:"Thoughts on building a rich text editor"},Uo="/Users/nickball/code/npb/src/content/blog/rich-text-2018.md",zo=void 0;Wo[Symbol.for("astro.needsHeadRendering")]=!0});var Yo={};f(Yo,{default:()=>Cd});async function vd(){return Promise.resolve().then(()=>(Jo(),Go))}var xd,Fd,kd,Cd,Vo=h(()=>{xd="@@ASTRO-LINKS@@",Fd="@@ASTRO-STYLES@@",kd="@@ASTRO-SCRIPTS@@",Cd={__astroPropagation:!0,getMod:vd,collectedLinks:xd,collectedStyles:Fd,collectedScripts:kd}});var ti={};f(ti,{Content:()=>ei,compiledContent:()=>Bd,default:()=>ei,file:()=>Qo,frontmatter:()=>Xo,getHeadings:()=>Ad,images:()=>yn,rawContent:()=>Sd,url:()=>Zo});function Id(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:yn[s].src,...yn[s].attributes}))}function Sd(){return`
[Sentry](https://sentry.io) is an error-monitoring service that helps log, track, and resolve runtime issues in your applications.
I've used it for quite a while to manage errors in front-end apps that I've built and I thought I'd run through some tips and tricks that I've found to help make Sentry most useful.
We'll start with some basics and then increase the level of integration, ending with a fully automated Sentry setup with GitHub actions, source maps, and Sentry releases.

You can check an [example repo](https://github.com/npbee/sentry-releases-example) with working examples.

## What You'll Need

- A Sentry account and project
- A Sentry [Internal Integration](https://docs.sentry.io/workflow/integrations/integration-platform/#internal-integrations) set up with \`project:read\` and \`releases\` permissions.
- A continuous integration tool like Netlify or GitHub Actions
- The [\`sentry-cli\`](https://github.com/getsentry/sentry-cli) package

EXAMPLE REPO:

## The Basics

Assuming you have an account with Sentry and a project setup, the basics to get up and running with Sentry is to use the browser SDK to initialize it as soon as possible in your app:

\`\`\`js
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: /* your DSN */
});
\`\`\`

You can think of the 'DSN' as the client key for your particular project.
This value is how Sentry ties errors in your runtime to a particular project in the Sentry dashboard.
Even with this basic setup you can get some good information about runtime errors.
Sentry does a good just wrangling stack traces across browsers to give you as much information as possible without much setup.
But, if you're using any sort of build process where your final asset output is not the same as your original source, you'll have a hard time diagnosing the rrors reports in Sentry.

<p class="full-bleed">
  <img alt="Sentry error without source maps" src="/posts/sentry-no-sourcemaps.png" />
</p>

To be able to show the original location of the error from your _source_ files, Sentry needs to access to the source maps of the application.
Before we get to sourcemaps, though, we need to talk about Sentry releases.

## Releases

A _release_ in Sentry is a particular build of your app.
It's how Sentry associates errors to distinct releases of your app.
Typically, any time you build your single-page app you'll create a new release.
Every release must have a distinct _version_ or identifier so that it can be differentiated from other releases.
This identifier is up to you to create, but typically it will likely be the Git hash of the commit your building, or perhaps the \`version\` from the \`package.json\`.

\`\`\`js
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: /* your DSN */,
  release: /* your release */
});
\`\`\`

Since you won't want to manually type out your \`dsn\` or \`release\` value each time, you'll want to set those up as environment variables that can be read at build time when you're application is being assembled for release.
The way you include these variables will change depending your toolchain, but most popular bundlers include ways to do this.
For Webpack, you can use the \`DefinePlugin\` plugin to make these values available at build time:

\`\`\`js
new webpack.DefinePlugin({
  SENTRY_DSN: /* However you're including your DSN */,
  SENTRY_RELEASE: /* read from git hash or package.json */,
});
\`\`\`

For my example, I'm going to use [Parcel](https://parceljs.org/) because it's a bit simpler for smaller apps, but the concept is the same.

\`\`\`js
import * as Sentry from "@sentry/browser";

Sentry.init({
  release: \`releases-example@\${process.env.npm_package_version}\`,
  dsn: /* the dsn */
});
\`\`\`

Here I'm using the special \`process.env.npm_package_version\` value that Parcel makes available by default.
It will replace the value with the \`version\` value from my \`package.json\`.

By including the release version in the SDK setup, Sentry will now show this as a 'release' and start to associate errors to it:

![Sentry releases panel](/posts/sentry-release.png)

Ok, back to source maps.

## Source Maps

In order to show the original source location for errors, Sentry needs to be able find the source maps for your app.
There are two ways to do that: public source maps or direct upload.
Public source maps means that Sentry will try to infer the public URL of your source map for the file related to the error, and the fetch that file and use it for the source mapping.
Using public source maps is the simplest because it requires the least amount of work on your end and in fact I've run apps perfectly fine this way without many issues.
However, public source maps can be brittle and have multiple opportunities for something to go wrong, leaving you without source maps for your error logs.
Sentry recommends uploading source maps directly and I think it's a good idea as well.
Making the source map upload an explicit part of your build step ensures that you'll always have source maps for your error logs _before_ you deploy your app.

### Building & Uploading Source Maps

Building source maps is another common setting for popular bundlers, and is enabled by default for Parcel.
Running \`parcel build\` will automatically create source maps.

The recommended way to upload source maps is to use the \`@sentry/cli\` package.
In order to properly associate the source maps with the correct release, we have to use the \`version\` identifier we created earlier.

## Continuous Integration

Now let's take what we know and start setting up the commands needed to automate the Sentry workflow we have so far.
Assuming you have some way of running commands for a particular commit or build, we can set up a \`build\` command that does what we need so far.
In general, the workflow will be:

1. Create a 'release' in Sentry
1. Build our assets, using the release version from step 1
1. Upload the source maps created from step 2, again using the release version
1. Finalize the release in Sentry
1. Deploy the app

To make all of this happen, we also need at least the following environment variables available:

\`\`\`bash
SENTRY_ORG=xxx
SENTRY_PROJECT=xxx
SENTRY_AUTH_TOKEN=xxx
\`\`\`

The way you provide these variables depends on your continuous integration tooling.
For the \`SENTRY_AUTH_TOKEN\`, you'll need to create an [Internal Integration](https://docs.sentry.io/workflow/integrations/integration-platform/#internal-integrations) within Sentry which will provide you with an authorization token for use with the Sentry CLI.

Here's an example of how to create the CI command:

\`\`\`js
// In package.json
{
  "scripts": {
    "build": "./scripts/sentry"
  }
}
\`\`\`

\`\`\`bash
#!/bin/bash

VERSION=$(node scripts/get-version.js)

echo "Building version: $VERSION"

npx sentry-cli releases new $VERSION
npx parcel build src/index.html
npx sentry-cli releases files $VERSION upload-sourcemaps dist --rewrite
\`\`\`

You'll notice I've created a little helper file for getting the correct version:

\`\`\`js
console.log(require("../package.json").version);
\`\`\`

Also notice that I'm using [\`npx\`](https://www.npmjs.com/package/npx) to run the Sentry CLI commands.
This makes it easy to install and use the \`@sentry/cli\` package that's installed locally to your project rather than relying on it being installed globally.

After build and uploading source maps, we can then 'finalize' the release and, if deploying immediately, mark it as deployed:

\`\`\`bash
# Finalize the release and mark it deployed
npx sentry-cli releases finalize $VERSION
npx sentry-cli releases deploys $VERSION new -e prod
\`\`\`

You should now be able to run this on your continuous integration tool and automatically create new Sentry releases with source maps.

## Git Integration

There's more we can do!
Sentry can now tell us which location our errors are coming from in our original source, but with a bit more work Sentry can also tell us which _commits_ an error came from.
To gain this power, you need to tell Sentry about the commit information associated with each release.
Sentry has integrations built for common providers like GitHub that ease the pain of this, but also provides a finer-grained approach which I'll go through as well.
For the GitHub example, after authorizing your GitHub account with Sentry, GitHub will begin sending commit data to Sentry.
The step you need to do is tell Sentry which of those commits are associated with the release you're building.
The Sentry CLI has a command to figure this out for you:

\`\`\`bash
npx sentry-cli releases set-commits --auto $VERSION
\`\`\`

Best I can tell, this essentially grabs all of the commits between now and the time you last released.
With this in, you'll start seeing commits associated with your release, as well as "suspect" commits in issues:

![Image of a 'Suspect commit' in Sentry](/posts/sentry-suspect-commit.png)

## Alt Git Integration

The Sentry GitHub integration works well and I'd recommend using it if possible.
However, you may in a situation where you cannot use Sentry's integration.
For example, if you're not keen on authorizing Sentry to your GitHub repo.
If that's the case, you can still tell Sentry about commit information, but you're responsible for finding the right commits, formatting them, and sending them to Sentry's API.
I've outlined a quick-and-dirty example of how to do that in the [example repo](https://github.com/npbee/sentry-releases-example) for this post, but essentially it involes what I listed above:

- Fetch the latest release for your project
- From the latest release, find the last commit hash
- Find all of the commits since that commit hash and \`HEAD\`
- Format each commit into a "patch set"
- Send all of this info to Sentry's API when creating the release

Unfortunately this is not straightforward and involves some parsing of the Git log to get the commits in the exact format Sentry's expects.

## Conclusion

Getting fully up and running with Sentry is no easy task, but I think it highly increases the value you can get out of the service.
`}function Bd(){return Ko}function Ad(){return[{depth:2,slug:"what-youll-need",text:"What You\u2019ll Need"},{depth:2,slug:"the-basics",text:"The Basics"},{depth:2,slug:"releases",text:"Releases"},{depth:2,slug:"source-maps",text:"Source Maps"},{depth:3,slug:"building--uploading-source-maps",text:"Building & Uploading Source Maps"},{depth:2,slug:"continuous-integration",text:"Continuous Integration"},{depth:2,slug:"git-integration",text:"Git Integration"},{depth:2,slug:"alt-git-integration",text:"Alt Git Integration"},{depth:2,slug:"conclusion",text:"Conclusion"}]}async function ei(){let{layout:e,...t}=Xo;return t.file=Qo,t.url=Zo,j(A,{"set:html":Ko})}var sf,of,yn,Ko,Xo,Qo,Zo,ni=h(()=>{M();sf=y(_(),1);P();of=y(R(),1);L();N();yn={};Ko=Id(`<p><a href="https://sentry.io">Sentry</a> is an error-monitoring service that helps log, track, and resolve runtime issues in your applications.
I\u2019ve used it for quite a while to manage errors in front-end apps that I\u2019ve built and I thought I\u2019d run through some tips and tricks that I\u2019ve found to help make Sentry most useful.
We\u2019ll start with some basics and then increase the level of integration, ending with a fully automated Sentry setup with GitHub actions, source maps, and Sentry releases.</p>
<p>You can check an <a href="https://github.com/npbee/sentry-releases-example">example repo</a> with working examples.</p>
<h2 id="what-youll-need">What You\u2019ll Need</h2>
<ul>
<li>A Sentry account and project</li>
<li>A Sentry <a href="https://docs.sentry.io/workflow/integrations/integration-platform/#internal-integrations">Internal Integration</a> set up with <code>project:read</code> and <code>releases</code> permissions.</li>
<li>A continuous integration tool like Netlify or GitHub Actions</li>
<li>The <a href="https://github.com/getsentry/sentry-cli"><code>sentry-cli</code></a> package</li>
</ul>
<p>EXAMPLE REPO:</p>
<h2 id="the-basics">The Basics</h2>
<p>Assuming you have an account with Sentry and a project setup, the basics to get up and running with Sentry is to use the browser SDK to initialize it as soon as possible in your app:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">*</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">as</span><span style="color: #E1E4E8"> Sentry </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">"@sentry/browser"</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">Sentry.</span><span style="color: #B392F0">init</span><span style="color: #E1E4E8">({</span></span>
<span class="line"><span style="color: #E1E4E8">  dsn: </span><span style="color: #6A737D">/* your DSN */</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>You can think of the \u2018DSN\u2019 as the client key for your particular project.
This value is how Sentry ties errors in your runtime to a particular project in the Sentry dashboard.
Even with this basic setup you can get some good information about runtime errors.
Sentry does a good just wrangling stack traces across browsers to give you as much information as possible without much setup.
But, if you\u2019re using any sort of build process where your final asset output is not the same as your original source, you\u2019ll have a hard time diagnosing the rrors reports in Sentry.</p>
<p class="full-bleed">
  <img alt="Sentry error without source maps" src="/posts/sentry-no-sourcemaps.png">
</p>
<p>To be able to show the original location of the error from your <em>source</em> files, Sentry needs to access to the source maps of the application.
Before we get to sourcemaps, though, we need to talk about Sentry releases.</p>
<h2 id="releases">Releases</h2>
<p>A <em>release</em> in Sentry is a particular build of your app.
It\u2019s how Sentry associates errors to distinct releases of your app.
Typically, any time you build your single-page app you\u2019ll create a new release.
Every release must have a distinct <em>version</em> or identifier so that it can be differentiated from other releases.
This identifier is up to you to create, but typically it will likely be the Git hash of the commit your building, or perhaps the <code>version</code> from the <code>package.json</code>.</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">*</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">as</span><span style="color: #E1E4E8"> Sentry </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">"@sentry/browser"</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">Sentry.</span><span style="color: #B392F0">init</span><span style="color: #E1E4E8">({</span></span>
<span class="line"><span style="color: #E1E4E8">  dsn: </span><span style="color: #6A737D">/* your DSN */</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">  release: </span><span style="color: #6A737D">/* your release */</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>Since you won\u2019t want to manually type out your <code>dsn</code> or <code>release</code> value each time, you\u2019ll want to set those up as environment variables that can be read at build time when you\u2019re application is being assembled for release.
The way you include these variables will change depending your toolchain, but most popular bundlers include ways to do this.
For Webpack, you can use the <code>DefinePlugin</code> plugin to make these values available at build time:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">new</span><span style="color: #E1E4E8"> webpack.</span><span style="color: #B392F0">DefinePlugin</span><span style="color: #E1E4E8">({</span></span>
<span class="line"><span style="color: #E1E4E8">  SENTRY_DSN: </span><span style="color: #6A737D">/* However you're including your DSN */</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">  SENTRY_RELEASE: </span><span style="color: #6A737D">/* read from git hash or package.json */</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>For my example, I\u2019m going to use <a href="https://parceljs.org/">Parcel</a> because it\u2019s a bit simpler for smaller apps, but the concept is the same.</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #F97583">import</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">*</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">as</span><span style="color: #E1E4E8"> Sentry </span><span style="color: #F97583">from</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">"@sentry/browser"</span><span style="color: #E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">Sentry.</span><span style="color: #B392F0">init</span><span style="color: #E1E4E8">({</span></span>
<span class="line"><span style="color: #E1E4E8">  release: </span><span style="color: #9ECBFF">\`releases-example@\${</span><span style="color: #E1E4E8">process</span><span style="color: #9ECBFF">.</span><span style="color: #E1E4E8">env</span><span style="color: #9ECBFF">.</span><span style="color: #E1E4E8">npm_package_version</span><span style="color: #9ECBFF">}\`</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">  dsn: </span><span style="color: #6A737D">/* the dsn */</span></span>
<span class="line"><span style="color: #E1E4E8">});</span></span></code></pre>
<p>Here I\u2019m using the special <code>process.env.npm_package_version</code> value that Parcel makes available by default.
It will replace the value with the <code>version</code> value from my <code>package.json</code>.</p>
<p>By including the release version in the SDK setup, Sentry will now show this as a \u2018release\u2019 and start to associate errors to it:</p>
<p><img src="/posts/sentry-release.png" alt="Sentry releases panel"></p>
<p>Ok, back to source maps.</p>
<h2 id="source-maps">Source Maps</h2>
<p>In order to show the original source location for errors, Sentry needs to be able find the source maps for your app.
There are two ways to do that: public source maps or direct upload.
Public source maps means that Sentry will try to infer the public URL of your source map for the file related to the error, and the fetch that file and use it for the source mapping.
Using public source maps is the simplest because it requires the least amount of work on your end and in fact I\u2019ve run apps perfectly fine this way without many issues.
However, public source maps can be brittle and have multiple opportunities for something to go wrong, leaving you without source maps for your error logs.
Sentry recommends uploading source maps directly and I think it\u2019s a good idea as well.
Making the source map upload an explicit part of your build step ensures that you\u2019ll always have source maps for your error logs <em>before</em> you deploy your app.</p>
<h3 id="building--uploading-source-maps">Building &#x26; Uploading Source Maps</h3>
<p>Building source maps is another common setting for popular bundlers, and is enabled by default for Parcel.
Running <code>parcel build</code> will automatically create source maps.</p>
<p>The recommended way to upload source maps is to use the <code>@sentry/cli</code> package.
In order to properly associate the source maps with the correct release, we have to use the <code>version</code> identifier we created earlier.</p>
<h2 id="continuous-integration">Continuous Integration</h2>
<p>Now let\u2019s take what we know and start setting up the commands needed to automate the Sentry workflow we have so far.
Assuming you have some way of running commands for a particular commit or build, we can set up a <code>build</code> command that does what we need so far.
In general, the workflow will be:</p>
<ol>
<li>Create a \u2018release\u2019 in Sentry</li>
<li>Build our assets, using the release version from step 1</li>
<li>Upload the source maps created from step 2, again using the release version</li>
<li>Finalize the release in Sentry</li>
<li>Deploy the app</li>
</ol>
<p>To make all of this happen, we also need at least the following environment variables available:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">SENTRY_ORG</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">xxx</span></span>
<span class="line"><span style="color: #E1E4E8">SENTRY_PROJECT</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">xxx</span></span>
<span class="line"><span style="color: #E1E4E8">SENTRY_AUTH_TOKEN</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">xxx</span></span></code></pre>
<p>The way you provide these variables depends on your continuous integration tooling.
For the <code>SENTRY_AUTH_TOKEN</code>, you\u2019ll need to create an <a href="https://docs.sentry.io/workflow/integrations/integration-platform/#internal-integrations">Internal Integration</a> within Sentry which will provide you with an authorization token for use with the Sentry CLI.</p>
<p>Here\u2019s an example of how to create the CI command:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D">// In package.json</span></span>
<span class="line"><span style="color: #E1E4E8">{</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #9ECBFF">"scripts"</span><span style="color: #E1E4E8">: {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #9ECBFF">"build"</span><span style="color: #E1E4E8">: </span><span style="color: #9ECBFF">"./scripts/sentry"</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">VERSION</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">$(</span><span style="color: #B392F0">node</span><span style="color: #9ECBFF"> scripts/get-version.js)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #79B8FF">echo</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">"Building version: </span><span style="color: #E1E4E8">$VERSION</span><span style="color: #9ECBFF">"</span></span>
<span class="line"></span>
<span class="line"><span style="color: #B392F0">npx</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">sentry-cli</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">releases</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">new</span><span style="color: #E1E4E8"> $VERSION</span></span>
<span class="line"><span style="color: #B392F0">npx</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">parcel</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">build</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">src/index.html</span></span>
<span class="line"><span style="color: #B392F0">npx</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">sentry-cli</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">releases</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">files</span><span style="color: #E1E4E8"> $VERSION </span><span style="color: #9ECBFF">upload-sourcemaps</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">dist</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">--rewrite</span></span></code></pre>
<p>You\u2019ll notice I\u2019ve created a little helper file for getting the correct version:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">console.</span><span style="color: #B392F0">log</span><span style="color: #E1E4E8">(</span><span style="color: #B392F0">require</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">"../package.json"</span><span style="color: #E1E4E8">).version);</span></span></code></pre>
<p>Also notice that I\u2019m using <a href="https://www.npmjs.com/package/npx"><code>npx</code></a> to run the Sentry CLI commands.
This makes it easy to install and use the <code>@sentry/cli</code> package that\u2019s installed locally to your project rather than relying on it being installed globally.</p>
<p>After build and uploading source maps, we can then \u2018finalize\u2019 the release and, if deploying immediately, mark it as deployed:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #6A737D"># Finalize the release and mark it deployed</span></span>
<span class="line"><span style="color: #B392F0">npx</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">sentry-cli</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">releases</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">finalize</span><span style="color: #E1E4E8"> $VERSION</span></span>
<span class="line"><span style="color: #B392F0">npx</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">sentry-cli</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">releases</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">deploys</span><span style="color: #E1E4E8"> $VERSION </span><span style="color: #9ECBFF">new</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">-e</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">prod</span></span></code></pre>
<p>You should now be able to run this on your continuous integration tool and automatically create new Sentry releases with source maps.</p>
<h2 id="git-integration">Git Integration</h2>
<p>There\u2019s more we can do!
Sentry can now tell us which location our errors are coming from in our original source, but with a bit more work Sentry can also tell us which <em>commits</em> an error came from.
To gain this power, you need to tell Sentry about the commit information associated with each release.
Sentry has integrations built for common providers like GitHub that ease the pain of this, but also provides a finer-grained approach which I\u2019ll go through as well.
For the GitHub example, after authorizing your GitHub account with Sentry, GitHub will begin sending commit data to Sentry.
The step you need to do is tell Sentry which of those commits are associated with the release you\u2019re building.
The Sentry CLI has a command to figure this out for you:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #B392F0">npx</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">sentry-cli</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">releases</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">set-commits</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">--auto</span><span style="color: #E1E4E8"> $VERSION</span></span></code></pre>
<p>Best I can tell, this essentially grabs all of the commits between now and the time you last released.
With this in, you\u2019ll start seeing commits associated with your release, as well as \u201Csuspect\u201D commits in issues:</p>
<p><img src="/posts/sentry-suspect-commit.png" alt="Image of a &#x27;Suspect commit&#x27; in Sentry"></p>
<h2 id="alt-git-integration">Alt Git Integration</h2>
<p>The Sentry GitHub integration works well and I\u2019d recommend using it if possible.
However, you may in a situation where you cannot use Sentry\u2019s integration.
For example, if you\u2019re not keen on authorizing Sentry to your GitHub repo.
If that\u2019s the case, you can still tell Sentry about commit information, but you\u2019re responsible for finding the right commits, formatting them, and sending them to Sentry\u2019s API.
I\u2019ve outlined a quick-and-dirty example of how to do that in the <a href="https://github.com/npbee/sentry-releases-example">example repo</a> for this post, but essentially it involes what I listed above:</p>
<ul>
<li>Fetch the latest release for your project</li>
<li>From the latest release, find the last commit hash</li>
<li>Find all of the commits since that commit hash and <code>HEAD</code></li>
<li>Format each commit into a \u201Cpatch set\u201D</li>
<li>Send all of this info to Sentry\u2019s API when creating the release</li>
</ul>
<p>Unfortunately this is not straightforward and involves some parsing of the Git log to get the commits in the exact format Sentry\u2019s expects.</p>
<h2 id="conclusion">Conclusion</h2>
<p>Getting fully up and running with Sentry is no easy task, but I think it highly increases the value you can get out of the service.</p>`),Xo={title:"Sentry for Single-Page Apps",date:"2020-02-16T00:00:00.000Z",description:"Effectively using Sentry for single-page, JavaScript apps"},Qo="/Users/nickball/code/npb/src/content/blog/sentry-for-single-page-apps.md",Zo=void 0;ei[Symbol.for("astro.needsHeadRendering")]=!0});var si={};f(si,{default:()=>Pd});async function Td(){return Promise.resolve().then(()=>(ni(),ti))}var jd,Md,_d,Pd,ai=h(()=>{jd="@@ASTRO-LINKS@@",Md="@@ASTRO-STYLES@@",_d="@@ASTRO-SCRIPTS@@",Pd={__astroPropagation:!0,getMod:Td,collectedLinks:jd,collectedStyles:Md,collectedScripts:_d}});var ci={};f(ci,{Content:()=>pi,compiledContent:()=>Nd,default:()=>pi,file:()=>ri,frontmatter:()=>ii,getHeadings:()=>Hd,images:()=>fn,rawContent:()=>Ld,url:()=>li});function Rd(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:fn[s].src,...fn[s].attributes}))}function Ld(){return`
At work we\u2019ve been in the process of building a queue-like component for helping our admins deal with various tasks. As fans of Google Inbox we decided to use it as a reference for many of our UX decisions. It was for this reason that I started down the long and treacherous path of trying to figure out exactly how Google Inbox works. I spent more time than I care to admit wading through compressed and mangle code, so I thought I share the small bits that I learned along the way.

> Disclaimer: I\u2019m sure there are things that I\u2019ve misunderstood or missed, so please don\u2019t take each explanation as the complete truth.

## The Setup

First, I just want to do a quick run-through of the kind of environment we\u2019re dealing with here. Unfortunately, there is no \u201Cone weird trick\u201D to emulate what I saw. It\u2019s a complex choreography of time, CSS keyframes, and a bunch of Javascript.

Like any old site, when you first load the page you\u2019ll get a base payload of CSS and Javascript to get things started. The magic comes when you actually open a message. When this occurs, a new \`style\` tag is injected into the page. This \`style\` tag has the very specific responsibility of animating each messages on screen to its next position. The exact rules that are supplied will change depending various other bits of information: which message is being open or closed, the dimensions of each message, how many other messages are on the screen, etc. And practically as soon as the \`style\` tag is injected, it\u2019s gone.

<figure>
<img alt="Style Injection" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/style_injection.gif" />
  <figcaption><strong>Figure 1:</strong> Notice the flashing style tag right before the body</figcaption>
</figure>

Here\u2019s a sampling of the kind of style rules that are injected:

\`\`\`css
.t
  .top-level-item[data-item-id-qs="qs-gmail-thread-f-1526179305444074125-0"]
  > .V {
  display: block;
  height: 50px;
  left: 0px;
  opacity: 0.9999;
  -webkit-transform-origin: center top;
  width: 889px;
  will-change: -webkit-transform;
  -webkit-animation-name: swap-close-placeholder-fake-shadow-var-84,
    animation-placeholder-fake-shadow-swap;
}

@-webkit-keyframes swap-close-placeholder-fake-shadow-var-84 {
  0% {
    -webkit-transform: translate(0px, 0px) scale(1.0517435320584927, 27.34);
  }

  80%,
  100% {
    -webkit-transform: translate(0px, 0px) scale(1.0022497187851518, 1.00001);
  }
}

.t
  .top-level-item[data-item-id-qs="qs-gmail-thread-f-1526179305444074125-0"]
  > .U {
  display: block;
  height: 48px;
  left: 0px;
  opacity: 0.9999;
  -webkit-transform-origin: center top;
  width: 889px;
  will-change: -webkit-transform;
  -webkit-animation-name: swap-close-placeholder-var-84;
}

@-webkit-keyframes swap-close-placeholder-var-84 {
  0% {
    -webkit-transform: translate(0px, 0px) scale(
        1.044994375703037,
        28.354166666666668
      );
  }

  80%,
  100% {
    -webkit-transform: translate(0px, 0px) scale(1.00001, 1.00001);
  }
}
\`\`\`

Notice that the CSS is targeting specific elements with extremely precise animation measurements. These are not rules that a human would write. These are rules that are most likely generated by an application of some sort. The rules are also armed with exact width and height measurements. If you\u2019ve ever tried to animate height, you\u2019ve no doubt felt some pain as it\u2019s not easy. Knowing the exact height of the element you\u2019re trying to animate makes a huge difference and Google Inbox takes full advantage.

## A Few Examples

Now that we have a general idea of the kind of setup we\u2019re dealing with, let\u2019s dive into a few examples.

### The Fixed Header

We\u2019ll start with the simplest of the three: the fixed message header. This one is not particularly novel, but has a slight twist to make it interesting. The basic idea is that when a message is open, it\u2019s header sticks to the top of the page as you scroll past it:

<figure>
<img alt="Fixed Header A" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_a.gif" />
</figure>

This is done pretty much as you might expect. Javascript listens for the position of the top of the header message and once it\u2019s been scrolled past the top the of the viewport, its position is fixed. A small detail here is that there is also a \u201Cpusher\u201D div that makes sure to push the message contents down once the message header is fixed. This is needed because a fixed element removes it from the flow of the page, so the contents below it would have otherwise popped up. Here\u2019s what I mean:

<figure>
<img alt="Fixed Header - No Pusher" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_b.gif" />
	<figcaption><strong>Figure 2:</strong> Notice how the messages contents jump when the header becomes fixed.</figcaption>
</figure>

The twist is that the header will also switch to absolute positioning once you get to the point where the bottom of the header is the same as the bottom of the message. This gives a nice transition between fixed back to static, rather than just jumping straight back to static.

<img alt="Fixed Header - Absolute" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_c.gif" />

I\u2019ve put together an example implementation on Codepen:

<div className='embed'>
<div data-height="520" data-theme-id="0" data-slug-hash="bpGrmm" data-default-tab="result" data-user="npbee" data-embed-version="2" data-pen-title="Google Inbox -  Fixed Header" className="codepen">See the Pen <a href="https://codepen.io/npbee/pen/bpGrmm/">Google Inbox -  Fixed Header</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>) on <a href="https://codepen.io">CodePen</a>.</div>
</div>

### The Message Open

Now things get a bit trickier. First, a quick visual of the animation:

<figure>
<img alt="Message Open" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_open.gif" />
</figure>

While this might look like a simple height and width animation, I assure you it\u2019s not. What\u2019s happening here involves timing a few different keyframe animations together as one. Keep in mind that the actual contents of the messages are completely hidden while the message is closed, as in \`display: none\`.

First, there is a \`div\` in the markup that\u2019s sole purpose is to do a [scale](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale) animation when the message is opening. A scale animation is an interesting choice because it has no effect on the document flow, meaning that you can scale an element to 200% and the elements around won\u2019t budge. So in order to give the effect that the height of the message is increasing as the message is opening, you have to actually translate any messages below it _down_ the page. This will be more relevant in the next section. The scale animation is also interesting because it\u2019s essentially emulating a height animation of sorts. The \u201Cpusher\u201D \`div\` scales to the point where its height is exactly the height of the incoming message content. This is where knowing the exact dimensions comes in handy.

Once the \u201Cscaler\u201D div has done its thing, the content is brought into the DOM and begins to fade in. At this point, the flow of the document is restored and since everything was done to exact specificity, there\u2019s not jumpiness with any other \`div\`\u2019s that had been moved out of the way for the scale animation.

I\u2019ll be going into more detail next about the translating, but here\u2019s a sample implantation on Codepen:

<p class="codepen" data-height="520" data-default-tab="result" data-slug-hash="ZWEJRg" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ZWEJRg">
  Google Inbox -  Open Message</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>

<div data-height="520" data-theme-id="0" data-slug-hash="ZWEJRg" data-default-tab="result" data-user="npbee" className='codepen'>See the Pen <a href='http://codepen.io/npbee/pen/ZWEJRg/'>Google Inbox -  Open Message</a> by Nick Ball (<a href='http://codepen.io/npbee'>@npbee</a>) on <a href='http://codepen.io'>CodePen</a>.</div>

## The Message Swap

Now we get to the wild and crazy stuff, the message swap:

<figure>
<img alt="message swap" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_swap.gif" />
</figure>

So, why is this interesting? To be honest, I wasn\u2019t sure it was all that interesting myself until I actually tried implementing it. The first thing to notice is that it looks as if the opening message is animating its height in reverse. This is the what a natural height animation would look like. If you were to animate the second message\u2019s height normally, it flow downwards increase the overall height of the page. The second interesting thing that\u2019s not very visible in the above gif, is the scroll position.

Take a look at this one (I have to speed up the animations for this to work):

<figure>
<img alt="scroll position" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_swap_b.gif" />
</figure>

In this gif, I\u2019ve already scrolled way down the page and I\u2019m now opening the second message. If you imagine what would happen in the normal document flow, the first message would close and the page\u2019s height would be substantially decreased, bringing the element below with it up the page. We\u2019d open to somewhere in the middle of the second message. Instead, the scroll position appears to stay the exactly the same, the first messages closes, and the second message opens right in place. This is an example of a completely natural feeling animation that is extremely _unnatural_ to implement.

So how\u2019s it done? In short, the CSS \`translate\` transform. But this is also another example of multiple animations being coordinated together to appear as one smooth interaction. As the first message is closing, it\u2019s \`translateY\` position is being animated from 0 up to the point where it would be visible on the screen at the current scroll position. Meaning, if the first message were above the viewport by 200px, we\u2019d animate from \`translateY(0px)\` to \`translateY(200px)\` to bring it in view. Simultaneously, the second message\u2019s \`translateY\` property is animated from the offset created from the first message closing _down_ to the point where it needs to end up on the screen. All the while each message\u2019s \u201Cscaler\u201D divs are doing their thing. All of this put together makes it look these divs are basically animating their height without the page moving at all.

But just those animations wouldn\u2019t be enough. The last missing piece here is the scroll position. In this scenario, once we\u2019re done animating we\u2019ve actually translated all of the content forward with the \`translateY\` property. So technically you could scroll up in the page and see a bunch of blank space. And since these animations are only temporary (remember the style is injected and then removed once the animations are done), the page contents will jump up once styles are removed because they don\u2019t have the \`translateY\` values that were applied. This is obviously no good. The solution is to manually set the scroll position forward the _exact_ amount that the page contents were translated. Because we\u2019re dealing with exact calculations, doing this immediately before the injected styles are removed does not result in any page jumps and essentially resets the page to a fresh state.

I\u2019ve tried to narrow down the concepts to an implementation here (click the second message):

<p class="codepen" data-height="395" data-default-tab="result" data-slug-hash="wMLgRY" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/wMLgRY">
  Google Inbox -  Message Swap</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>

Notice the two messages translating up and down and the scroll bar hopping up at the very last second once the animations are done.

In attempt to make this more clear, I\u2019ve made a step-able version here:

<p class="codepen" data-height="554" data-default-tab="result" data-slug-hash="ONJQMa" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ONJQMa">
  Google Inbox -  Message Swap Stepper</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>

Note that I\u2019m calling these \u201Csteps\u201D but really these all happen pretty much simultaneously.

## Takeaways

I\u2019m sure you\u2019re wondering why I wasted so much time on this. I wondered that myself plenty of times, but came away with a few solid learnings:

**Debugging Google code is hard.**

Like any quality production app, Google Inbox\u2019s output code is not meant to be readable. But Google really seems to go the extra mile with minified class names and injected style. They are building for scale and not for people like me to be able to decipher what\u2019s happening in their web apps.

**Subtlety is king.**

Most of the animations are incredibly subtle. Like _really_ subtle. They are the sort of animations that you don\u2019t really know are there until you do. Additionally, many of these animations have a very fast duration. So after all of the work to achieve these animations, they\u2019re gone in an instant. I think it\u2019s a nice display of restraint by the designers. In the same situation, I could see myself wanting to show off all of these wonderful animations I had built.

On the flip side of the above, I did see a bunch of injected code that was essentially worthless. I doubt that animating a div from \`translateY(0, 0.000122)\` to \`translateY(0, 0.00011)\` is actually perceivable to a real person. The amount of times where these extremely small animations are introduced, I\u2019m not sure, but there is probably a tradeoff there somewhere.

**Google takes their animations seriously.**

I don\u2019t consider myself well-versed in UX design, but it was quite fascinating to see just a glimpse of the amount of work it takes to get the level of polish that Google Inbox has. As I mentioned earlier, there are probably some non-humans writing at least part of the actual code that makes the animations run, but there are definitely humans _designing_ the animations. The interactions seemed to be envisioned first with the implementation details worked out later in whatever way was necessary, which is opposite of how I usually think about these things. I\u2019m not sure I\u2019ll ever have the resources at my disposal to build animations at this level of detail, but it was an impressive reminder that user experience is the ultimate goal and we should do whatever it takes to make it great.
`}function Nd(){return oi}function Hd(){return[{depth:2,slug:"the-setup",text:"The Setup"},{depth:2,slug:"a-few-examples",text:"A Few Examples"},{depth:3,slug:"the-fixed-header",text:"The Fixed Header"},{depth:3,slug:"the-message-open",text:"The Message Open"},{depth:2,slug:"the-message-swap",text:"The Message Swap"},{depth:2,slug:"takeaways",text:"Takeaways"}]}async function pi(){let{layout:e,...t}=ii;return t.file=ri,t.url=li,j(A,{"set:html":oi})}var cf,df,fn,oi,ii,ri,li,ui=h(()=>{M();cf=y(_(),1);P();df=y(R(),1);L();N();fn={};oi=Rd(`<p>At work we\u2019ve been in the process of building a queue-like component for helping our admins deal with various tasks. As fans of Google Inbox we decided to use it as a reference for many of our UX decisions. It was for this reason that I started down the long and treacherous path of trying to figure out exactly how Google Inbox works. I spent more time than I care to admit wading through compressed and mangle code, so I thought I share the small bits that I learned along the way.</p>
<blockquote>
<p>Disclaimer: I\u2019m sure there are things that I\u2019ve misunderstood or missed, so please don\u2019t take each explanation as the complete truth.</p>
</blockquote>
<h2 id="the-setup">The Setup</h2>
<p>First, I just want to do a quick run-through of the kind of environment we\u2019re dealing with here. Unfortunately, there is no \u201Cone weird trick\u201D to emulate what I saw. It\u2019s a complex choreography of time, CSS keyframes, and a bunch of Javascript.</p>
<p>Like any old site, when you first load the page you\u2019ll get a base payload of CSS and Javascript to get things started. The magic comes when you actually open a message. When this occurs, a new <code>style</code> tag is injected into the page. This <code>style</code> tag has the very specific responsibility of animating each messages on screen to its next position. The exact rules that are supplied will change depending various other bits of information: which message is being open or closed, the dimensions of each message, how many other messages are on the screen, etc. And practically as soon as the <code>style</code> tag is injected, it\u2019s gone.</p>
<figure>
<img alt="Style Injection" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/style_injection.gif">
  <figcaption><strong>Figure 1:</strong> Notice the flashing style tag right before the body</figcaption>
</figure>
<p>Here\u2019s a sampling of the kind of style rules that are injected:</p>
<pre is:raw="" class="astro-code github-dark" style="background-color: #24292e; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color: #B392F0">.t</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">.top-level-item</span><span style="color: #E1E4E8">[</span><span style="color: #B392F0">data-item-id-qs</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"qs-gmail-thread-f-1526179305444074125-0"</span><span style="color: #E1E4E8">]</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">.V</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">display</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">block</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">height</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">50</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">left</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">opacity</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">0.9999</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">-webkit-transform-origin</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">center</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">top</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">width</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">889</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">will-change</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">-webkit-transform</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">-webkit-animation-name</span><span style="color: #E1E4E8">: swap-close-placeholder-fake-shadow-var-84,</span></span>
<span class="line"><span style="color: #E1E4E8">    animation-placeholder-fake-shadow-swap;</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">@-webkit-keyframes</span><span style="color: #E1E4E8"> </span><span style="color: #FFAB70">swap-close-placeholder-fake-shadow-var-84</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">0%</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #79B8FF">-webkit-transform</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">translate</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">) </span><span style="color: #79B8FF">scale</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">1.0517435320584927</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">27.34</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">80%</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">100%</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #79B8FF">-webkit-transform</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">translate</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">) </span><span style="color: #79B8FF">scale</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">1.0022497187851518</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">1.00001</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #B392F0">.t</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">.top-level-item</span><span style="color: #E1E4E8">[</span><span style="color: #B392F0">data-item-id-qs</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"qs-gmail-thread-f-1526179305444074125-0"</span><span style="color: #E1E4E8">]</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #F97583">></span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">.U</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">display</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">block</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">height</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">48</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">left</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">opacity</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">0.9999</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">-webkit-transform-origin</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">center</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">top</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">width</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">889</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">will-change</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">-webkit-transform</span><span style="color: #E1E4E8">;</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #79B8FF">-webkit-animation-name</span><span style="color: #E1E4E8">: swap-close-placeholder-var-84;</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F97583">@-webkit-keyframes</span><span style="color: #E1E4E8"> </span><span style="color: #FFAB70">swap-close-placeholder-var-84</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">0%</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #79B8FF">-webkit-transform</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">translate</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">) </span><span style="color: #79B8FF">scale</span><span style="color: #E1E4E8">(</span></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #79B8FF">1.044994375703037</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #79B8FF">28.354166666666668</span></span>
<span class="line"><span style="color: #E1E4E8">      );</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">80%</span><span style="color: #E1E4E8">,</span></span>
<span class="line"><span style="color: #E1E4E8">  </span><span style="color: #B392F0">100%</span><span style="color: #E1E4E8"> {</span></span>
<span class="line"><span style="color: #E1E4E8">    </span><span style="color: #79B8FF">-webkit-transform</span><span style="color: #E1E4E8">: </span><span style="color: #79B8FF">translate</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">0</span><span style="color: #F97583">px</span><span style="color: #E1E4E8">) </span><span style="color: #79B8FF">scale</span><span style="color: #E1E4E8">(</span><span style="color: #79B8FF">1.00001</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">1.00001</span><span style="color: #E1E4E8">);</span></span>
<span class="line"><span style="color: #E1E4E8">  }</span></span>
<span class="line"><span style="color: #E1E4E8">}</span></span></code></pre>
<p>Notice that the CSS is targeting specific elements with extremely precise animation measurements. These are not rules that a human would write. These are rules that are most likely generated by an application of some sort. The rules are also armed with exact width and height measurements. If you\u2019ve ever tried to animate height, you\u2019ve no doubt felt some pain as it\u2019s not easy. Knowing the exact height of the element you\u2019re trying to animate makes a huge difference and Google Inbox takes full advantage.</p>
<h2 id="a-few-examples">A Few Examples</h2>
<p>Now that we have a general idea of the kind of setup we\u2019re dealing with, let\u2019s dive into a few examples.</p>
<h3 id="the-fixed-header">The Fixed Header</h3>
<p>We\u2019ll start with the simplest of the three: the fixed message header. This one is not particularly novel, but has a slight twist to make it interesting. The basic idea is that when a message is open, it\u2019s header sticks to the top of the page as you scroll past it:</p>
<figure>
<img alt="Fixed Header A" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_a.gif">
</figure>
<p>This is done pretty much as you might expect. Javascript listens for the position of the top of the header message and once it\u2019s been scrolled past the top the of the viewport, its position is fixed. A small detail here is that there is also a \u201Cpusher\u201D div that makes sure to push the message contents down once the message header is fixed. This is needed because a fixed element removes it from the flow of the page, so the contents below it would have otherwise popped up. Here\u2019s what I mean:</p>
<figure>
<img alt="Fixed Header - No Pusher" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_b.gif">
	<figcaption><strong>Figure 2:</strong> Notice how the messages contents jump when the header becomes fixed.</figcaption>
</figure>
<p>The twist is that the header will also switch to absolute positioning once you get to the point where the bottom of the header is the same as the bottom of the message. This gives a nice transition between fixed back to static, rather than just jumping straight back to static.</p>
<img alt="Fixed Header - Absolute" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/fixed_header_c.gif">
<p>I\u2019ve put together an example implementation on Codepen:</p>
<div class="embed">
<div data-height="520" data-theme-id="0" data-slug-hash="bpGrmm" data-default-tab="result" data-user="npbee" data-embed-version="2" data-pen-title="Google Inbox -  Fixed Header" class="codepen">See the Pen <a href="https://codepen.io/npbee/pen/bpGrmm/">Google Inbox -  Fixed Header</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>) on <a href="https://codepen.io">CodePen</a>.</div>
</div>
<h3 id="the-message-open">The Message Open</h3>
<p>Now things get a bit trickier. First, a quick visual of the animation:</p>
<figure>
<img alt="Message Open" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_open.gif">
</figure>
<p>While this might look like a simple height and width animation, I assure you it\u2019s not. What\u2019s happening here involves timing a few different keyframe animations together as one. Keep in mind that the actual contents of the messages are completely hidden while the message is closed, as in <code>display: none</code>.</p>
<p>First, there is a <code>div</code> in the markup that\u2019s sole purpose is to do a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale">scale</a> animation when the message is opening. A scale animation is an interesting choice because it has no effect on the document flow, meaning that you can scale an element to 200% and the elements around won\u2019t budge. So in order to give the effect that the height of the message is increasing as the message is opening, you have to actually translate any messages below it <em>down</em> the page. This will be more relevant in the next section. The scale animation is also interesting because it\u2019s essentially emulating a height animation of sorts. The \u201Cpusher\u201D <code>div</code> scales to the point where its height is exactly the height of the incoming message content. This is where knowing the exact dimensions comes in handy.</p>
<p>Once the \u201Cscaler\u201D div has done its thing, the content is brought into the DOM and begins to fade in. At this point, the flow of the document is restored and since everything was done to exact specificity, there\u2019s not jumpiness with any other <code>div</code>\u2019s that had been moved out of the way for the scale animation.</p>
<p>I\u2019ll be going into more detail next about the translating, but here\u2019s a sample implantation on Codepen:</p>
<p class="codepen" data-height="520" data-default-tab="result" data-slug-hash="ZWEJRg" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ZWEJRg">
  Google Inbox -  Open Message</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>
<div data-height="520" data-theme-id="0" data-slug-hash="ZWEJRg" data-default-tab="result" data-user="npbee" class="codepen">See the Pen <a href="http://codepen.io/npbee/pen/ZWEJRg/">Google Inbox -  Open Message</a> by Nick Ball (<a href="http://codepen.io/npbee">@npbee</a>) on <a href="http://codepen.io">CodePen</a>.</div>
<h2 id="the-message-swap">The Message Swap</h2>
<p>Now we get to the wild and crazy stuff, the message swap:</p>
<figure>
<img alt="message swap" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_swap.gif">
</figure>
<p>So, why is this interesting? To be honest, I wasn\u2019t sure it was all that interesting myself until I actually tried implementing it. The first thing to notice is that it looks as if the opening message is animating its height in reverse. This is the what a natural height animation would look like. If you were to animate the second message\u2019s height normally, it flow downwards increase the overall height of the page. The second interesting thing that\u2019s not very visible in the above gif, is the scroll position.</p>
<p>Take a look at this one (I have to speed up the animations for this to work):</p>
<figure>
<img alt="scroll position" src="https://s3-us-west-2.amazonaws.com/npbee/2016/ux-case-study-google-inbox/message_swap_b.gif">
</figure>
<p>In this gif, I\u2019ve already scrolled way down the page and I\u2019m now opening the second message. If you imagine what would happen in the normal document flow, the first message would close and the page\u2019s height would be substantially decreased, bringing the element below with it up the page. We\u2019d open to somewhere in the middle of the second message. Instead, the scroll position appears to stay the exactly the same, the first messages closes, and the second message opens right in place. This is an example of a completely natural feeling animation that is extremely <em>unnatural</em> to implement.</p>
<p>So how\u2019s it done? In short, the CSS <code>translate</code> transform. But this is also another example of multiple animations being coordinated together to appear as one smooth interaction. As the first message is closing, it\u2019s <code>translateY</code> position is being animated from 0 up to the point where it would be visible on the screen at the current scroll position. Meaning, if the first message were above the viewport by 200px, we\u2019d animate from <code>translateY(0px)</code> to <code>translateY(200px)</code> to bring it in view. Simultaneously, the second message\u2019s <code>translateY</code> property is animated from the offset created from the first message closing <em>down</em> to the point where it needs to end up on the screen. All the while each message\u2019s \u201Cscaler\u201D divs are doing their thing. All of this put together makes it look these divs are basically animating their height without the page moving at all.</p>
<p>But just those animations wouldn\u2019t be enough. The last missing piece here is the scroll position. In this scenario, once we\u2019re done animating we\u2019ve actually translated all of the content forward with the <code>translateY</code> property. So technically you could scroll up in the page and see a bunch of blank space. And since these animations are only temporary (remember the style is injected and then removed once the animations are done), the page contents will jump up once styles are removed because they don\u2019t have the <code>translateY</code> values that were applied. This is obviously no good. The solution is to manually set the scroll position forward the <em>exact</em> amount that the page contents were translated. Because we\u2019re dealing with exact calculations, doing this immediately before the injected styles are removed does not result in any page jumps and essentially resets the page to a fresh state.</p>
<p>I\u2019ve tried to narrow down the concepts to an implementation here (click the second message):</p>
<p class="codepen" data-height="395" data-default-tab="result" data-slug-hash="wMLgRY" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/wMLgRY">
  Google Inbox -  Message Swap</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>
<p>Notice the two messages translating up and down and the scroll bar hopping up at the very last second once the animations are done.</p>
<p>In attempt to make this more clear, I\u2019ve made a step-able version here:</p>
<p class="codepen" data-height="554" data-default-tab="result" data-slug-hash="ONJQMa" data-user="npbee" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/npbee/pen/ONJQMa">
  Google Inbox -  Message Swap Stepper</a> by Nick Ball (<a href="https://codepen.io/npbee">@npbee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"><\/script>
<p>Note that I\u2019m calling these \u201Csteps\u201D but really these all happen pretty much simultaneously.</p>
<h2 id="takeaways">Takeaways</h2>
<p>I\u2019m sure you\u2019re wondering why I wasted so much time on this. I wondered that myself plenty of times, but came away with a few solid learnings:</p>
<p><strong>Debugging Google code is hard.</strong></p>
<p>Like any quality production app, Google Inbox\u2019s output code is not meant to be readable. But Google really seems to go the extra mile with minified class names and injected style. They are building for scale and not for people like me to be able to decipher what\u2019s happening in their web apps.</p>
<p><strong>Subtlety is king.</strong></p>
<p>Most of the animations are incredibly subtle. Like <em>really</em> subtle. They are the sort of animations that you don\u2019t really know are there until you do. Additionally, many of these animations have a very fast duration. So after all of the work to achieve these animations, they\u2019re gone in an instant. I think it\u2019s a nice display of restraint by the designers. In the same situation, I could see myself wanting to show off all of these wonderful animations I had built.</p>
<p>On the flip side of the above, I did see a bunch of injected code that was essentially worthless. I doubt that animating a div from <code>translateY(0, 0.000122)</code> to <code>translateY(0, 0.00011)</code> is actually perceivable to a real person. The amount of times where these extremely small animations are introduced, I\u2019m not sure, but there is probably a tradeoff there somewhere.</p>
<p><strong>Google takes their animations seriously.</strong></p>
<p>I don\u2019t consider myself well-versed in UX design, but it was quite fascinating to see just a glimpse of the amount of work it takes to get the level of polish that Google Inbox has. As I mentioned earlier, there are probably some non-humans writing at least part of the actual code that makes the animations run, but there are definitely humans <em>designing</em> the animations. The interactions seemed to be envisioned first with the implementation details worked out later in whatever way was necessary, which is opposite of how I usually think about these things. I\u2019m not sure I\u2019ll ever have the resources at my disposal to build animations at this level of detail, but it was an impressive reminder that user experience is the ultimate goal and we should do whatever it takes to make it great.</p>`),ii={title:"UX Case Study: Google Inbox",date:"2016-02-27T00:00:00.000Z",description:"A hard look at one of my favorite interaction patterns"},ri="/Users/nickball/code/npb/src/content/blog/ux-case-study-google-inbox.md",li=void 0;pi[Symbol.for("astro.needsHeadRendering")]=!0});var di={};f(di,{default:()=>zd});async function Od(){return Promise.resolve().then(()=>(ui(),ci))}var $d,qd,Ud,zd,hi=h(()=>{$d="@@ASTRO-LINKS@@",qd="@@ASTRO-STYLES@@",Ud="@@ASTRO-SCRIPTS@@",zd={__astroPropagation:!0,getMod:Od,collectedLinks:$d,collectedStyles:qd,collectedScripts:Ud}});var bi={};f(bi,{Content:()=>Ei,compiledContent:()=>Jd,default:()=>Ei,file:()=>fi,frontmatter:()=>yi,getHeadings:()=>Yd,images:()=>gn,rawContent:()=>Gd,url:()=>gi});function Wd(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:gn[s].src,...gn[s].attributes}))}function Gd(){return`
An interactive demo page for the product I built at Dropbox, Dropbox Forms. Built with [Preact](https://preactjs.com/).
`}function Jd(){return mi}function Yd(){return[]}async function Ei(){let{layout:e,...t}=yi;return t.file=fi,t.url=gi,j(A,{"set:html":mi})}var ff,Ef,gn,mi,yi,fi,gi,wi=h(()=>{M();ff=y(_(),1);P();Ef=y(R(),1);L();N();gn={};mi=Wd('<p>An interactive demo page for the product I built at Dropbox, Dropbox Forms. Built with <a href="https://preactjs.com/">Preact</a>.</p>'),yi={title:"Dropbox Forms Demo",graphic:"helloworks.png",link:"https://www.hellosign.com/products/dropbox-forms#demo"},fi="/Users/nickball/code/npb/src/content/projects/helloworks-demo.md",gi=void 0;Ei[Symbol.for("astro.needsHeadRendering")]=!0});var Di={};f(Di,{default:()=>Zd});async function Vd(){return Promise.resolve().then(()=>(wi(),bi))}var Kd,Xd,Qd,Zd,vi=h(()=>{Kd="@@ASTRO-LINKS@@",Xd="@@ASTRO-STYLES@@",Qd="@@ASTRO-SCRIPTS@@",Zd={__astroPropagation:!0,getMod:Vd,collectedLinks:Kd,collectedStyles:Xd,collectedScripts:Qd}});var Si={};f(Si,{Content:()=>Ii,compiledContent:()=>nh,default:()=>Ii,file:()=>ki,frontmatter:()=>Fi,getHeadings:()=>sh,images:()=>En,rawContent:()=>th,url:()=>Ci});function eh(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:En[s].src,...En[s].attributes}))}function th(){return`
A personal site for my musical alias, _The Air on Earth_. Optimized images, a site-wide audio player, and lots of custom style flourishes. Built with [SvelteKit](https://kit.svelte.dev/).
`}function nh(){return xi}function sh(){return[]}async function Ii(){let{layout:e,...t}=Fi;return t.file=ki,t.url=Ci,j(A,{"set:html":xi})}var vf,Ff,En,xi,Fi,ki,Ci,Bi=h(()=>{M();vf=y(_(),1);P();Ff=y(R(),1);L();N();En={};xi=eh('<p>A personal site for my musical alias, <em>The Air on Earth</em>. Optimized images, a site-wide audio player, and lots of custom style flourishes. Built with <a href="https://kit.svelte.dev/">SvelteKit</a>.</p>'),Fi={title:"theaironearth.com",graphic:"the-air-on-earth.svg",link:"https://theaironearth.com"},ki="/Users/nickball/code/npb/src/content/projects/the-air-on-earth.md",Ci=void 0;Ii[Symbol.for("astro.needsHeadRendering")]=!0});var Ai={};f(Ai,{default:()=>lh});async function ah(){return Promise.resolve().then(()=>(Bi(),Si))}var oh,ih,rh,lh,Ti=h(()=>{oh="@@ASTRO-LINKS@@",ih="@@ASTRO-STYLES@@",rh="@@ASTRO-SCRIPTS@@",lh={__astroPropagation:!0,getMod:ah,collectedLinks:oh,collectedStyles:ih,collectedScripts:rh}});var Li={};f(Li,{Content:()=>Ri,compiledContent:()=>uh,default:()=>Ri,file:()=>_i,frontmatter:()=>Mi,getHeadings:()=>dh,images:()=>bn,rawContent:()=>ch,url:()=>Pi});function ph(e){return e.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm,(t,s)=>T({src:bn[s].src,...bn[s].attributes}))}function ch(){return`
A tool for building SVG audio waveforms. Built with [Astro](https://astro.build/), [React](https://react.dev/), and [Deno Deploy](https://deno.com/deploy).
`}function uh(){return ji}function dh(){return[]}async function Ri(){let{layout:e,...t}=Mi;return t.file=_i,t.url=Pi,j(A,{"set:html":ji})}var Sf,Af,bn,ji,Mi,_i,Pi,Ni=h(()=>{M();Sf=y(_(),1);P();Af=y(R(),1);L();N();bn={};ji=ph('<p>A tool for building SVG audio waveforms. Built with <a href="https://astro.build/">Astro</a>, <a href="https://react.dev/">React</a>, and <a href="https://deno.com/deploy">Deno Deploy</a>.</p>'),Mi={title:"waveformr.com",graphic:"waveformr.png",link:"https://waveformr.com"},_i="/Users/nickball/code/npb/src/content/projects/waveformr.md",Pi=void 0;Ri[Symbol.for("astro.needsHeadRendering")]=!0});var Hi={};f(Hi,{default:()=>gh});async function hh(){return Promise.resolve().then(()=>(Ni(),Li))}var mh,yh,fh,gh,Oi=h(()=>{mh="@@ASTRO-LINKS@@",yh="@@ASTRO-STYLES@@",fh="@@ASTRO-SCRIPTS@@",gh={__astroPropagation:!0,getMod:hh,collectedLinks:mh,collectedStyles:yh,collectedScripts:fh}});var Qi={};f(Qi,{$:()=>se,_:()=>Rh,a:()=>ze,b:()=>We,g:()=>be});function wn(e){return async(t,s)=>{let n=Wi[t]?.entries[s];if(n)return e[t][n]}}var dt,Ui,Eh,zi,bh,wh,Wi,Dh,Gi,be,vh,xh,Ji,Fh,ut,kh,Yi,Ch,ze,Ih,We,$i,Sh,Bh,qi,Ah,Vi,Th,Ki,jh,se,Mh,Xi,_h,Ph,Rh,Ge=h(()=>{M();dt="/src/content/",Ui=Object.assign({"/src/content/blog/css-grid-double-overflow.md":()=>Promise.resolve().then(()=>(ga(),fa)),"/src/content/blog/eleventy-datocms-netlify.md":()=>Promise.resolve().then(()=>(ba(),Ea)),"/src/content/blog/in-search-of-mocks.md":()=>Promise.resolve().then(()=>(Da(),wa)),"/src/content/blog/learning-elixir.md":()=>Promise.resolve().then(()=>(xa(),va)),"/src/content/blog/local-first-challenges.md":()=>Promise.resolve().then(()=>(ka(),Fa)),"/src/content/blog/on-full-stack.md":()=>Promise.resolve().then(()=>(Ia(),Ca)),"/src/content/blog/rich-text-2018.md":()=>Promise.resolve().then(()=>(Ba(),Sa)),"/src/content/blog/sentry-for-single-page-apps.md":()=>Promise.resolve().then(()=>(Ta(),Aa)),"/src/content/blog/ux-case-study-google-inbox.md":()=>Promise.resolve().then(()=>(Ma(),ja)),"/src/content/projects/helloworks-demo.md":()=>Promise.resolve().then(()=>(Pa(),_a)),"/src/content/projects/the-air-on-earth.md":()=>Promise.resolve().then(()=>(La(),Ra)),"/src/content/projects/waveformr.md":()=>Promise.resolve().then(()=>(Ha(),Na))}),Eh=Ue({globResult:Ui,contentDir:dt}),zi=Object.assign({}),bh=Ue({globResult:zi,contentDir:dt}),wh=Ue({globResult:{...Ui,...zi},contentDir:dt}),Wi={};Wi={blog:{type:"content",entries:{"css-grid-double-overflow":"/src/content/blog/css-grid-double-overflow.md","on-full-stack":"/src/content/blog/on-full-stack.md","eleventy-datocms-netlify":"/src/content/blog/eleventy-datocms-netlify.md","in-search-of-mocks":"/src/content/blog/in-search-of-mocks.md","ux-case-study-google-inbox":"/src/content/blog/ux-case-study-google-inbox.md","sentry-for-single-page-apps":"/src/content/blog/sentry-for-single-page-apps.md","learning-elixir":"/src/content/blog/learning-elixir.md","local-first-challenges":"/src/content/blog/local-first-challenges.md","rich-text-2018":"/src/content/blog/rich-text-2018.md"}},projects:{type:"content",entries:{"helloworks-demo":"/src/content/projects/helloworks-demo.md","the-air-on-earth":"/src/content/projects/the-air-on-earth.md",waveformr:"/src/content/projects/waveformr.md"}}};Dh=Object.assign({"/src/content/blog/css-grid-double-overflow.md":()=>Promise.resolve().then(()=>(Ya(),Ja)),"/src/content/blog/eleventy-datocms-netlify.md":()=>Promise.resolve().then(()=>(so(),no)),"/src/content/blog/in-search-of-mocks.md":()=>Promise.resolve().then(()=>(ho(),uo)),"/src/content/blog/learning-elixir.md":()=>Promise.resolve().then(()=>(vo(),Do)),"/src/content/blog/local-first-challenges.md":()=>Promise.resolve().then(()=>(To(),Ao)),"/src/content/blog/on-full-stack.md":()=>Promise.resolve().then(()=>(Oo(),Ho)),"/src/content/blog/rich-text-2018.md":()=>Promise.resolve().then(()=>(Vo(),Yo)),"/src/content/blog/sentry-for-single-page-apps.md":()=>Promise.resolve().then(()=>(ai(),si)),"/src/content/blog/ux-case-study-google-inbox.md":()=>Promise.resolve().then(()=>(hi(),di)),"/src/content/projects/helloworks-demo.md":()=>Promise.resolve().then(()=>(vi(),Di)),"/src/content/projects/the-air-on-earth.md":()=>Promise.resolve().then(()=>(Ti(),Ai)),"/src/content/projects/waveformr.md":()=>Promise.resolve().then(()=>(Oi(),Hi))}),Gi=Ue({globResult:Dh,contentDir:dt}),be=ha({contentCollectionToEntryMap:Eh,dataCollectionToEntryMap:bh,getRenderEntryImport:wn(Gi)}),vh=ma({getEntryImport:wn(wh),getRenderEntryImport:wn(Gi)}),xh=q(),Ji=O(async(e,t,s)=>{let n=e.createAstro(xh,t,s);return n.self=Ji,b`${$()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="-104.542 2.396 72.542 80.104" xml:space="preserve" width="25px" fill="currentColor"><g><path d="M-70.792 56.307c0 1.402 1.294 2.895 2.588 2.895s2.329-1.229 2.329-2.895V29.396c0-1.666-1.035-2.894-2.329-2.894-1.208 0-2.588 1.228-2.588 2.894v26.911zm13.631-28.752v39.272h-13.631v16.479h-8.713V18.875h22.344v8.68zM-98.722 18.877l16.523-.001M-82.198 18.876v47.951h-8.713V28.87c0-1.841-1.036-2.104-2.071-2.104-1.725 0-2.847 2.278-2.847 2.278v37.782h-8.713V27.556c.041-1.296.012-.859.041-1.296.234-3.613 1.547-7.382 5.779-7.382l16.524-.002zM-37.82 66.827l-16.524.001V2.396h8.713v16.479H-32V58.147c0 3.945-1.076 8.68-5.82 8.68m-5.223-7.626c1.294 0 2.329-1.227 2.329-2.893V29.396c0-1.666-1.035-2.894-2.329-2.894s-2.588 1.49-2.588 2.894v26.913c0 1.666 1.38 2.892 2.588 2.892z"></path></g></svg>`},"/Users/nickball/code/npb/src/components/Logo.astro",void 0),Fh=q(),ut=O(async(e,t,s)=>{let n=e.createAstro(Fh,t,s);n.self=ut;let{href:a}=n.props,o=new URL(n.request.url).pathname;return b`${$()}<a${Y(o.includes(a)?"text-accent-12 underline":"text","class")}${Y(a,"href")}>${ge(e,s.default)}</a>`},"/Users/nickball/code/npb/src/components/NavLink.astro",void 0),kh=q(),Yi=O(async(e,t,s)=>{let n=e.createAstro(kh,t,s);return n.self=Yi,b`${$()}<header class="container mx-auto flex max-w-2xl items-center justify-between p-8">
  <a href="/" class="text hover:text-accent-10 dark:hover:text-accent-dark-10">
    ${x(e,"Logo",Ji,{})}
  </a>
  <ul class="flex gap-4 text-sm text-gray-11">
    <li>${x(e,"NavLink",ut,{href:"/about"},{default:a=>b`About`})}</li>
    <li>${x(e,"NavLink",ut,{href:"/projects"},{default:a=>b`Projects`})}</li>
    <li>${x(e,"NavLink",ut,{href:"/posts"},{default:a=>b`Posts`})}</li>
  </ul>
</header>`},"/Users/nickball/code/npb/src/components/Header.astro",void 0),Ch=q(),ze=O(async(e,t,s)=>{let n=e.createAstro(Ch,t,s);return n.self=ze,b`${$()}<a href="https://github.com/npbee" class="text-light flex items-center gap-2 text-xs">
  <span class="w-4">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
  </span>
  <span>GitHub</span>
</a>`},"/Users/nickball/code/npb/src/components/GithubLink.astro",void 0),Ih=q(),We=O(async(e,t,s)=>{let n=e.createAstro(Ih,t,s);return n.self=We,b`${$()}<a href="https://twitter.com/_nickball" class="text-light flex items-center gap-2 text-xs">
  <span class="w-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
  </span>
  <span>Twitter</span>
</a>`},"/Users/nickball/code/npb/src/components/TwitterLink.astro",void 0),$i=Object.freeze,Sh=Object.defineProperty,Bh=(e,t)=>$i(Sh(e,"raw",{value:$i(t||e.slice())})),Ah=q(),Vi=O(async(e,t,s)=>{let n=e.createAstro(Ah,t,s);return n.self=Vi,b(qi||(qi=Bh(["",`<button id="themeToggle" class="text-light hover:text astro-X3PJSKD3">
  <svg id="sun" class="hidden w-5 dark:block astro-X3PJSKD3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4" class="astro-X3PJSKD3"></circle><path d="M12 2v2" class="astro-X3PJSKD3"></path><path d="M12 20v2" class="astro-X3PJSKD3"></path><path d="m4.93 4.93 1.41 1.41" class="astro-X3PJSKD3"></path><path d="m17.66 17.66 1.41 1.41" class="astro-X3PJSKD3"></path><path d="M2 12h2" class="astro-X3PJSKD3"></path><path d="M20 12h2" class="astro-X3PJSKD3"></path><path d="m6.34 17.66-1.41 1.41" class="astro-X3PJSKD3"></path><path d="m19.07 4.93-1.41 1.41" class="astro-X3PJSKD3"></path></svg>
  <svg id="moon" class="visible w-5 dark:hidden astro-X3PJSKD3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" class="astro-X3PJSKD3"></path></svg>
</button>


<script>
const theme = (() => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
})();

if (theme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
}

window.localStorage.setItem("theme", theme);

const handleToggleClick = () => {
  const element = document.documentElement;
  element.classList.toggle("dark");

  const isDark = element.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

document
  .getElementById("themeToggle")
  .addEventListener("click", handleToggleClick);
<\/script>`])),$())},"/Users/nickball/code/npb/src/components/ThemeToggle.astro",void 0),Th=q(),Ki=O(async(e,t,s)=>{let n=e.createAstro(Th,t,s);return n.self=Ki,b`${$()}<footer class="bg-gray-2 px-8 py-8 dark:bg-gray-dark-1">
  <div class="container mx-auto flex max-w-2xl items-center justify-between px-8">
    <ul class="flex gap-8 text-base">
      <li>${x(e,"GithubLink",ze,{})}</li>
      <li>${x(e,"TwitterLink",We,{})}</li>
    </ul>
    ${x(e,"ThemeToggle",Vi,{})}
  </div>
</footer>`},"/Users/nickball/code/npb/src/components/Footer.astro",void 0),jh=q(),se=O(async(e,t,s)=>{let n=e.createAstro(jh,t,s);n.self=se;let{title:a,description:o}=n.props,i=n.url;return b`<html lang="en" class="dark">
  <!-- Global Metadata -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">

  <!-- Primary Meta Tags -->
  <title>${a}</title>
  <meta name="title"${Y(a,"content")}>
  <!-- <meta name="description" content={description} /> -->

  <!-- Google / Search Engine Tags -->
  <meta itemprop="image" content="https://npbee.me/images/me.jpeg">
  <meta itemprop="name"${Y(a,"content")}>
  <meta itemprop="description"${Y(o,"content")}>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://npbee.me/images/me.jpeg">
  <meta property="og:url"${Y(i,"content")}>
  <meta property="og:title"${Y(a,"content")}>
  <meta property="og:description"${Y(o,"content")}>

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://npbee.me/images/me.jpeg">
  <meta name="twitter:title"${Y(a,"content")}>
  <meta name="twitter:description"${Y(o,"content")}>
  <meta name="twitter:creator" content="_nickball">

  <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/favicon/android-chrome-192x192.png" sizes="192x192">
  <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96">
  <link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16">

  ${$()}<body class="text flex h-full flex-col">
    ${x(e,"Header",Yi,{})}
    <div class="container mx-auto mb-48 max-w-2xl flex-1 px-8">
      ${ge(e,s.default)}
    </div>
    ${x(e,"Footer",Ki,{})}
  </body></html>`},"/Users/nickball/code/npb/src/layouts/Base.astro",void 0),Mh=q(),Xi=O(async(e,t,s)=>{let n=e.createAstro(Mh,t,s);n.self=Xi;let{slug:a}=n.params;if(!a)throw new Error("Not found");let o=await vh("blog",a);if(o===void 0)return n.redirect("/404");let{Content:i}=await o.render(),p=new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric"}).format(new Date(o.data.date));return b`${x(e,"BaseLayout",se,{title:o.data.title,description:o.data.description},{default:l=>b`
  ${$()}<main class="prose max-w-none flex-1 dark:prose-invert prose-headings:text-2xl">
    <div class="space-y-1 text-left">
      <h1 class="mb-0 leading-none">
        ${o.data.title}
      </h1>
      <p class="text-light text-sm">${p}</p>
    </div>
    ${x(l,"Content",i,{})}
  </main>
`})}`},"/Users/nickball/code/npb/src/pages/posts/[...slug].astro",void 0),_h="/Users/nickball/code/npb/src/pages/posts/[...slug].astro",Ph="/posts/[...slug]",Rh=Object.freeze(Object.defineProperty({__proto__:null,default:Xi,file:_h,url:Ph},Symbol.toStringTag,{value:"Module"}))});var vn={};f(vn,{$:()=>Je,a:()=>Yh,i:()=>zh});var Lh,Zi,Nh,Je,Hh,er,Oh,Dn,$h,tr,qh,Uh,zh,Wh,nr,Gh,Jh,Yh,ht=h(()=>{M();Ge();Lh=q(),Zi=O(async(e,t,s)=>{let n=e.createAstro(Lh,t,s);return n.self=Zi,b`${$()}<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>`},"/Users/nickball/code/npb/src/components/ExternalWindowIcon.astro",void 0),Nh=q(),Je=O(async(e,t,s)=>{let n=e.createAstro(Nh,t,s);n.self=Je;let{project:a}=n.props,{title:o,link:i}=a.data,{Content:p}=await a.render();return b`${$()}<article class="">
  <h3 class="text-xl font-semibold leading-loose">
    <a class="text flex gap-2 font-semibold no-underline hover:text-accent-10 hover:underline dark:hover:text-accent-dark-10"${Y(i,"href")} target="_blank" rel="noreferrer nofollow">
      ${o}
      <span class="text-light flex w-3">${x(e,"ExternalWindowIcon",Zi,{})}</span></a>
  </h3>
  <div class="prose dark:prose-invert">
    ${x(e,"Content",p,{})}
  </div>
</article>`},"/Users/nickball/code/npb/src/components/ProjectPreview.astro",void 0),Hh=q(),er=O(async(e,t,s)=>{let n=e.createAstro(Hh,t,s);return n.self=er,b`${$()}<div class="intro prose max-w-none">
  <h1 class="text text-xl font-semibold md:text-2xl">Hi, I'm Nick —</h1>
  <p class="text-light lead text-lg font-medium md:text-xl">
    A web developer based out of Portland, Oregon.
  </p>
  <p class="text">
    I work at <a href="https://dropbox.com">Dropbox</a> as a software engineer
    building the <a href="https://helloworks.com">Forms</a> web application. I
    help teams build web apps of all shapes and sizes. I love shipping
    practical, accessible experiences that help people get things done. <a href="/about">More about me</a>
  </p>
  <ul class="not-prose m-0 flex list-none space-x-8 p-0 py-1">
    <li>
      ${x(e,"GithubLink",ze,{})}
    </li>
    <li>${x(e,"TwitterLink",We,{})}</li>
  </ul>
</div>`},"/Users/nickball/code/npb/src/components/Intro.astro",void 0),Oh=q(),Dn=O(async(e,t,s)=>{let n=e.createAstro(Oh,t,s);n.self=Dn;let{href:a}=n.props;return b`${$()}<a${Y(a,"href")} class="text-accent font-semibold underline">
  ${ge(e,s.default)}
</a>`},"/Users/nickball/code/npb/src/components/PageHeading.astro",void 0),$h=q(),tr=O(async(e,t,s)=>{let n=e.createAstro($h,t,s);n.self=tr;let a=await be("blog"),o=await be("projects"),i=a.sort((p,l)=>new Date(l.data.date).valueOf()-new Date(p.data.date).valueOf());return b`${x(e,"BaseLayout",se,{title:"Nick Ball",description:"Web developer based in Portland, OR."},{default:p=>b`
  ${$()}<div class="space-y-16">
    ${x(p,"Intro",er,{})}

    <hr class="h-px w-4 border-none bg-gray-10">

    <section class="space-y-2">
      ${x(p,"PageHeading",Dn,{href:"/projects"},{default:l=>b`<h2>Projects</h2>`})}
      <div class="space-y-8">
        ${o.map(l=>b`${x(p,"ProjectPreview",Je,{project:l})}`)}
      </div>
    </section>

    <section class="space-y-4">
      ${x(p,"PageHeading",Dn,{href:"/posts"},{default:l=>b`Posts`})}
      <div class="space-y-8">
        <ul class="space-y-1">
          ${i.map(l=>b`<li>
                <a class="xno-underline group flex items-center gap-4 text-lg hover:text-accent-12 hover:underline dark:hover:text-accent-dark-12"${Y(`/posts/${l.slug}`,"href")}>
                  <span class="text-light">
                    ${new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(l.data.date)}
                  </span>
                  <span class="text">${l.data.title}</span>
                </a>
              </li>`)}
        </ul>
      </div>
    </section>
  </div>
`})}`},"/Users/nickball/code/npb/src/pages/index.astro",void 0),qh="/Users/nickball/code/npb/src/pages/index.astro",Uh="",zh=Object.freeze(Object.defineProperty({__proto__:null,default:tr,file:qh,url:Uh},Symbol.toStringTag,{value:"Module"})),Wh=q(),nr=O(async(e,t,s)=>{let n=e.createAstro(Wh,t,s);n.self=nr;let o=(await be("blog")).sort((i,p)=>new Date(p.data.date).valueOf()-new Date(i.data.date).valueOf());return b`${x(e,"BaseLayout",se,{title:"Posts | Nick Ball",description:"Posts by Nick Ball, Web developer based in Portland, OR."},{default:i=>b`
  ${$()}<main class="space-y-4">
    <h1 class="text-xl font-semibold">Posts</h1>
    <ul class="space-y-1">
      ${o.map(p=>b`<li>
            <a class="group flex items-center gap-4 text-lg"${Y(`/posts/${p.slug}`,"href")}>
              <span class="text-light group-hover:text-accent-10 dark:group-hover:text-accent-dark-10">
                ${new Intl.DateTimeFormat("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}).format(p.data.date)}
              </span>
              <span class="text group-hover:text-accent-10 dark:group-hover:text-accent-dark-10">
                ${p.data.title}
              </span>
            </a>
          </li>`)}
    </ul>
  </main>
`})}`},"/Users/nickball/code/npb/src/pages/posts/index.astro",void 0),Gh="/Users/nickball/code/npb/src/pages/posts/index.astro",Jh="/posts",Yh=Object.freeze(Object.defineProperty({__proto__:null,default:nr,file:Gh,url:Jh},Symbol.toStringTag,{value:"Module"}))});var sr={};f(sr,{onRequest:()=>ne,page:()=>Vh,renderers:()=>Z});var Lf,Hf,Vh,ar=h(()=>{Ee();Ie();M();Lf=y(_(),1);P();Hf=y(R(),1);L();N();Vh=()=>Promise.resolve().then(()=>(ht(),vn)).then(e=>e.i)});var ir={};f(ir,{default:()=>or,file:()=>Xh,url:()=>Qh});var Jf,Vf,Kh,or,Xh,Qh,rr=h(()=>{M();Ge();ht();Jf=y(_(),1);P();Vf=y(R(),1);L();N();Kh=q(),or=O(async(e,t,s)=>{let n=e.createAstro(Kh,t,s);n.self=or;let a=await be("projects");return b`${x(e,"BaseLayout",se,{title:"Posts | Nick Ball",description:"Projects by Nick Ball, Web developer based in Portland, OR."},{default:o=>b`
  ${$()}<main class="space-y-4">
    <h1 class="text-accent text-xl font-semibold">Projects</h1>
    <div class="space-y-8">
      ${a.map(i=>b`${x(o,"ProjectPreview",Je,{project:i})}`)}
    </div>
  </main>
`})}`},"/Users/nickball/code/npb/src/pages/projects.astro",void 0),Xh="/Users/nickball/code/npb/src/pages/projects.astro",Qh="/projects"});var lr={};f(lr,{onRequest:()=>ne,page:()=>Zh,renderers:()=>Z});var Zf,tg,Zh,pr=h(()=>{Ee();Ie();M();Zf=y(_(),1);P();tg=y(R(),1);L();N();Zh=()=>Promise.resolve().then(()=>(rr(),ir))});var ur={};f(ur,{default:()=>cr,file:()=>tm,url:()=>nm});var lg,cg,em,cr,tm,nm,dr=h(()=>{M();Ge();lg=y(_(),1);P();cg=y(R(),1);L();N();em=q(),cr=O(async(e,t,s)=>{let n=e.createAstro(em,t,s);return n.self=cr,b`${x(e,"BaseLayout",se,{title:"Nick Ball | About",description:"About Nick Ball, Web developer based in Portland, OR"},{default:a=>b`
  ${$()}<div class="text prose max-w-none dark:prose-invert">
    <img src="/images/me.jpeg" alt="Nick Ball" class="w-24 rounded-full">
    <h1 class="text text-xl font-semibold md:text-2xl">About me —</h1>
    <p class="text-light text-lg font-medium md:text-xl">
      I help teams build web apps of all shapes and sizes. I love shipping
      practical, accessible experiences that improve people's lives.
    </p>
    <p class="text">
      I'm a web developer based out of Portland, Oregon. I work at Dropbox as a
      software engineer building the Forms web application. I work heavily with
      technologies like <strong>React</strong>, <strong>GraphQL</strong>,
      <strong>Elixir</strong>, and <strong>Phoenix</strong>. I'm particularly
      interested in component-driven architecture, testing, and developer
      tooling. I love focusing on small details to get the user experience just
      right.
    </p>
    <p>In the past I've built things such as:</p>
    <ul class="my-0">
      <li>Drag-and-drop heavy interfaces with <strong>React</strong></li>
      <li>Rich text editors with <strong>Prosemirror</strong></li>
      <li>
        Component libraries with <strong>React</strong> and <strong>CSS</strong>
      </li>
      <li>
        Build and test pipelines with <strong>Webpack</strong> and <strong>continuous integration</strong>
      </li>
      <li>Interactive flow charts</li>
      <li>Undo / redo implementations</li>
    </ul>
    <p>
      I was previously at
      <a href="https://loudr.fm/" target="_blank" rel="noopener noreferrer nofollow" class="font-medium">Loudr</a> (acquired by Spotify). I have a B.S. in Management Science from UC San
      Diego.
    </p>
  </div>
`})}`},"/Users/nickball/code/npb/src/pages/about.astro",void 0),tm="/Users/nickball/code/npb/src/pages/about.astro",nm="/about"});var hr={};f(hr,{onRequest:()=>ne,page:()=>sm,renderers:()=>Z});var mg,fg,sm,mr=h(()=>{Ee();Ie();M();mg=y(_(),1);P();fg=y(R(),1);L();N();sm=()=>Promise.resolve().then(()=>(dr(),ur))});var yr={};f(yr,{onRequest:()=>ne,page:()=>am,renderers:()=>Z});var vg,Fg,am,fr=h(()=>{Ee();Ie();M();vg=y(_(),1);P();Fg=y(R(),1);L();N();am=()=>Promise.resolve().then(()=>(ht(),vn)).then(e=>e.a)});var gr={};f(gr,{onRequest:()=>ne,page:()=>om,renderers:()=>Z});var Ag,jg,om,Er=h(()=>{Ee();Ie();M();Ag=y(_(),1);P();jg=y(R(),1);L();N();om=()=>Promise.resolve().then(()=>(Ge(),Qi)).then(e=>e._)});M();Ee();var Hg=y(R(),1),Og=y(_(),1);P();L();N();process.argv=[];var im=Symbol.for("astro.clientAddress");function Dr(e){let t=new ot(e);return{default:async n=>{let a=t.match(n);Reflect.set(n,im,n.headers.get("x-forwarded-for"));let o=await t.render(n,a);if(t.setCookieHeaders)for(let i of t.setCookieHeaders(o))o.headers.append("Set-Cookie",i);return o}}}var br=Object.freeze(Object.defineProperty({__proto__:null,createExports:Dr},Symbol.toStringTag,{value:"Module"})),rm=()=>Promise.resolve().then(()=>(ar(),sr)),lm=()=>Promise.resolve().then(()=>(pr(),lr)),pm=()=>Promise.resolve().then(()=>(mr(),hr)),cm=()=>Promise.resolve().then(()=>(fr(),yr)),um=()=>Promise.resolve().then(()=>(Er(),gr)),dm=new Map([["src/pages/index.astro",rm],["src/pages/projects.astro",lm],["src/pages/about.astro",pm],["src/pages/posts/index.astro",cm],["src/pages/posts/[...slug].astro",um]]),vr=Object.assign(ca({adapterName:"@astrojs/vercel/edge",routes:[{file:"",links:[],scripts:[{type:"external",value:"/_astro/page.d7d8fe59.js"}],styles:[{type:"external",src:"/_astro/about.c23a700b.css"}],routeData:{route:"/",type:"page",pattern:"^\\/$",segments:[],params:[],component:"src/pages/index.astro",pathname:"/",prerender:!1,_meta:{trailingSlash:"ignore"}}},{file:"",links:[],scripts:[{type:"external",value:"/_astro/page.d7d8fe59.js"}],styles:[{type:"external",src:"/_astro/about.c23a700b.css"}],routeData:{route:"/projects",type:"page",pattern:"^\\/projects\\/?$",segments:[[{content:"projects",dynamic:!1,spread:!1}]],params:[],component:"src/pages/projects.astro",pathname:"/projects",prerender:!1,_meta:{trailingSlash:"ignore"}}},{file:"",links:[],scripts:[{type:"external",value:"/_astro/page.d7d8fe59.js"}],styles:[{type:"external",src:"/_astro/about.c23a700b.css"}],routeData:{route:"/about",type:"page",pattern:"^\\/about\\/?$",segments:[[{content:"about",dynamic:!1,spread:!1}]],params:[],component:"src/pages/about.astro",pathname:"/about",prerender:!1,_meta:{trailingSlash:"ignore"}}},{file:"",links:[],scripts:[{type:"external",value:"/_astro/page.d7d8fe59.js"}],styles:[{type:"external",src:"/_astro/about.c23a700b.css"}],routeData:{route:"/posts",type:"page",pattern:"^\\/posts\\/?$",segments:[[{content:"posts",dynamic:!1,spread:!1}]],params:[],component:"src/pages/posts/index.astro",pathname:"/posts",prerender:!1,_meta:{trailingSlash:"ignore"}}},{file:"",links:[],scripts:[{type:"external",value:"/_astro/page.d7d8fe59.js"}],styles:[{type:"external",src:"/_astro/about.c23a700b.css"}],routeData:{route:"/posts/[...slug]",type:"page",pattern:"^\\/posts(?:\\/(.*?))?\\/?$",segments:[[{content:"posts",dynamic:!1,spread:!1}],[{content:"...slug",dynamic:!0,spread:!0}]],params:["...slug"],component:"src/pages/posts/[...slug].astro",prerender:!1,_meta:{trailingSlash:"ignore"}}}],base:"/",compressHTML:!1,markdown:{drafts:!1,syntaxHighlight:"shiki",shikiConfig:{langs:[],theme:"github-dark",wrap:!1},remarkPlugins:[],rehypePlugins:[],remarkRehype:{},gfm:!0,smartypants:!0},componentMetadata:[["\0astro:content",{propagation:"in-tree",containsHead:!1}],["/Users/nickball/code/npb/src/pages/index.astro",{propagation:"in-tree",containsHead:!1}],["\0@astro-page:src/pages/index@_@astro",{propagation:"in-tree",containsHead:!1}],["\0@astrojs-ssr-virtual-entry",{propagation:"in-tree",containsHead:!1}],["/Users/nickball/code/npb/src/pages/posts/[...slug].astro",{propagation:"in-tree",containsHead:!1}],["\0@astro-page:src/pages/posts/[...slug]@_@astro",{propagation:"in-tree",containsHead:!1}],["/Users/nickball/code/npb/src/pages/posts/index.astro",{propagation:"in-tree",containsHead:!1}],["\0@astro-page:src/pages/posts/index@_@astro",{propagation:"in-tree",containsHead:!1}],["/Users/nickball/code/npb/src/pages/projects.astro",{propagation:"in-tree",containsHead:!1}],["\0@astro-page:src/pages/projects@_@astro",{propagation:"in-tree",containsHead:!1}]],renderers:[],clientDirectives:[["idle",'(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();'],["load",'(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'],["media",'(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'],["only",'(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'],["visible",'(()=>{var r=(i,c,n)=>{let s=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),s();break}});for(let e of n.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event("astro:visible"));})();']],entryModules:{"\0@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","\0@astro-renderers":"renderers.mjs","\0empty-middleware":"_empty-middleware.mjs","/src/pages/about.astro":"chunks/pages/about.astro.9b1a6eca.mjs","/src/pages/projects.astro":"chunks/pages/projects.astro.02eb4c3e.mjs","\0@astro-page:src/pages/index@_@astro":"chunks/index@_@astro.977de243.mjs","\0@astro-page:src/pages/projects@_@astro":"chunks/projects@_@astro.e8fcfad0.mjs","\0@astro-page:src/pages/about@_@astro":"chunks/about@_@astro.9bad81e1.mjs","\0@astro-page:src/pages/posts/index@_@astro":"chunks/index@_@astro.6d564f25.mjs","\0@astro-page:src/pages/posts/[...slug]@_@astro":"chunks/_...2802fa0a.mjs","/Users/nickball/code/npb/src/content/blog/css-grid-double-overflow.md?astroContentCollectionEntry=true":"chunks/css-grid-double-overflow.e64d15c1.mjs","/Users/nickball/code/npb/src/content/blog/eleventy-datocms-netlify.md?astroContentCollectionEntry=true":"chunks/eleventy-datocms-netlify.d6ee065c.mjs","/Users/nickball/code/npb/src/content/blog/in-search-of-mocks.md?astroContentCollectionEntry=true":"chunks/in-search-of-mocks.c078f9a8.mjs","/Users/nickball/code/npb/src/content/blog/learning-elixir.md?astroContentCollectionEntry=true":"chunks/learning-elixir.905eb369.mjs","/Users/nickball/code/npb/src/content/blog/local-first-challenges.md?astroContentCollectionEntry=true":"chunks/local-first-challenges.22171ccb.mjs","/Users/nickball/code/npb/src/content/blog/on-full-stack.md?astroContentCollectionEntry=true":"chunks/on-full-stack.702c54f7.mjs","/Users/nickball/code/npb/src/content/blog/rich-text-2018.md?astroContentCollectionEntry=true":"chunks/rich-text-2018.15f89095.mjs","/Users/nickball/code/npb/src/content/blog/sentry-for-single-page-apps.md?astroContentCollectionEntry=true":"chunks/sentry-for-single-page-apps.de1fe2f8.mjs","/Users/nickball/code/npb/src/content/blog/ux-case-study-google-inbox.md?astroContentCollectionEntry=true":"chunks/ux-case-study-google-inbox.009daba2.mjs","/Users/nickball/code/npb/src/content/projects/helloworks-demo.md?astroContentCollectionEntry=true":"chunks/helloworks-demo.bed630f9.mjs","/Users/nickball/code/npb/src/content/projects/the-air-on-earth.md?astroContentCollectionEntry=true":"chunks/the-air-on-earth.1a1d376d.mjs","/Users/nickball/code/npb/src/content/projects/waveformr.md?astroContentCollectionEntry=true":"chunks/waveformr.ecc7dbd5.mjs","/Users/nickball/code/npb/src/content/blog/css-grid-double-overflow.md?astroPropagatedAssets":"chunks/css-grid-double-overflow.1a2c9412.mjs","/Users/nickball/code/npb/src/content/blog/eleventy-datocms-netlify.md?astroPropagatedAssets":"chunks/eleventy-datocms-netlify.68490297.mjs","/Users/nickball/code/npb/src/content/blog/in-search-of-mocks.md?astroPropagatedAssets":"chunks/in-search-of-mocks.0624125e.mjs","/Users/nickball/code/npb/src/content/blog/learning-elixir.md?astroPropagatedAssets":"chunks/learning-elixir.568c2aee.mjs","/Users/nickball/code/npb/src/content/blog/local-first-challenges.md?astroPropagatedAssets":"chunks/local-first-challenges.9c2a7b11.mjs","/Users/nickball/code/npb/src/content/blog/on-full-stack.md?astroPropagatedAssets":"chunks/on-full-stack.bff03691.mjs","/Users/nickball/code/npb/src/content/blog/rich-text-2018.md?astroPropagatedAssets":"chunks/rich-text-2018.e49fcc98.mjs","/Users/nickball/code/npb/src/content/blog/sentry-for-single-page-apps.md?astroPropagatedAssets":"chunks/sentry-for-single-page-apps.aeaff89c.mjs","/Users/nickball/code/npb/src/content/blog/ux-case-study-google-inbox.md?astroPropagatedAssets":"chunks/ux-case-study-google-inbox.dd7a7b30.mjs","/Users/nickball/code/npb/src/content/projects/helloworks-demo.md?astroPropagatedAssets":"chunks/helloworks-demo.cc526746.mjs","/Users/nickball/code/npb/src/content/projects/the-air-on-earth.md?astroPropagatedAssets":"chunks/the-air-on-earth.fbf88dc4.mjs","/Users/nickball/code/npb/src/content/projects/waveformr.md?astroPropagatedAssets":"chunks/waveformr.b3cb07cd.mjs","/Users/nickball/code/npb/src/content/blog/css-grid-double-overflow.md":"chunks/css-grid-double-overflow.a5b2ecc5.mjs","/Users/nickball/code/npb/src/content/blog/eleventy-datocms-netlify.md":"chunks/eleventy-datocms-netlify.9d81da8b.mjs","/Users/nickball/code/npb/src/content/blog/in-search-of-mocks.md":"chunks/in-search-of-mocks.8e640ce5.mjs","/Users/nickball/code/npb/src/content/blog/learning-elixir.md":"chunks/learning-elixir.0a535cb0.mjs","/Users/nickball/code/npb/src/content/blog/local-first-challenges.md":"chunks/local-first-challenges.ae45d602.mjs","/Users/nickball/code/npb/src/content/blog/on-full-stack.md":"chunks/on-full-stack.eed56b8c.mjs","/Users/nickball/code/npb/src/content/blog/rich-text-2018.md":"chunks/rich-text-2018.511c55b5.mjs","/Users/nickball/code/npb/src/content/blog/sentry-for-single-page-apps.md":"chunks/sentry-for-single-page-apps.56db4bb2.mjs","/Users/nickball/code/npb/src/content/blog/ux-case-study-google-inbox.md":"chunks/ux-case-study-google-inbox.7b3dcee4.mjs","/Users/nickball/code/npb/src/content/projects/helloworks-demo.md":"chunks/helloworks-demo.4103d4d5.mjs","/Users/nickball/code/npb/src/content/projects/the-air-on-earth.md":"chunks/the-air-on-earth.71f3d3ed.mjs","/Users/nickball/code/npb/src/content/projects/waveformr.md":"chunks/waveformr.6e99cd9d.mjs","astro:scripts/page.js":"_astro/page.d7d8fe59.js","astro:scripts/before-hydration.js":""},assets:["/_astro/about.c23a700b.css","/robots.txt","/_astro/page.d7d8fe59.js","/favicon/favicon-16x16.png","/favicon/favicon-32x32.png","/favicon/favicon-96x96.png","/favicon/favicon.ico","/images/light-wool.png","/images/me.jpeg","/posts/css-grid-double-overflow-sketch.svg","/posts/dato-1.png","/posts/dato-api-explorer.png","/posts/dato-build-hook.png","/posts/dato-custom-webhook.png","/posts/dato-in-progress.png","/posts/dato-model.png","/posts/dato-netlify-token.png","/posts/dato-out-of-date.png","/posts/dato-status-url.png","/posts/dato-up-to-date.png","/posts/mock-layer.excalidraw","/posts/mock-layer.png","/posts/rich-text.png","/posts/sentry-no-sourcemaps.png","/posts/sentry-release.png","/posts/sentry-suspect-commit.png","/projects/helloworks.png","/projects/the-air-on-earth.svg","/projects/waveformr.png","/fonts/Inconsolata/Inconsolata-VariableFont_wdth,wght.ttf","/fonts/Inconsolata/OFL.txt","/fonts/Inconsolata/README.txt","/fonts/Inconsolata/static/Inconsolata-Black.ttf","/fonts/Inconsolata/static/Inconsolata-Bold.ttf","/fonts/Inconsolata/static/Inconsolata-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata-Light.ttf","/fonts/Inconsolata/static/Inconsolata-Medium.ttf","/fonts/Inconsolata/static/Inconsolata-Regular.ttf","/fonts/Inconsolata/static/Inconsolata-SemiBold.ttf","/fonts/Inconsolata/static/Inconsolata_Condensed-Black.ttf","/fonts/Inconsolata/static/Inconsolata_Condensed-Bold.ttf","/fonts/Inconsolata/static/Inconsolata_Condensed-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata_Condensed-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata_Condensed-Light.ttf","/fonts/Inconsolata/static/Inconsolata_Condensed-Medium.ttf","/fonts/Inconsolata/static/Inconsolata_Condensed-Regular.ttf","/fonts/Inconsolata/static/Inconsolata_Condensed-SemiBold.ttf","/fonts/Inconsolata/static/Inconsolata_Expanded-Black.ttf","/fonts/Inconsolata/static/Inconsolata_Expanded-Bold.ttf","/fonts/Inconsolata/static/Inconsolata_Expanded-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata_Expanded-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata_Expanded-Light.ttf","/fonts/Inconsolata/static/Inconsolata_Expanded-Medium.ttf","/fonts/Inconsolata/static/Inconsolata_Expanded-Regular.ttf","/fonts/Inconsolata/static/Inconsolata_Expanded-SemiBold.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraCondensed-Black.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraCondensed-Bold.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraCondensed-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraCondensed-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraCondensed-Light.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraCondensed-Medium.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraCondensed-Regular.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraCondensed-SemiBold.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraExpanded-Black.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraExpanded-Bold.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraExpanded-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraExpanded-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraExpanded-Light.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraExpanded-Medium.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraExpanded-Regular.ttf","/fonts/Inconsolata/static/Inconsolata_ExtraExpanded-SemiBold.ttf","/fonts/Inconsolata/static/Inconsolata_SemiCondensed-Black.ttf","/fonts/Inconsolata/static/Inconsolata_SemiCondensed-Bold.ttf","/fonts/Inconsolata/static/Inconsolata_SemiCondensed-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata_SemiCondensed-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata_SemiCondensed-Light.ttf","/fonts/Inconsolata/static/Inconsolata_SemiCondensed-Medium.ttf","/fonts/Inconsolata/static/Inconsolata_SemiCondensed-Regular.ttf","/fonts/Inconsolata/static/Inconsolata_SemiCondensed-SemiBold.ttf","/fonts/Inconsolata/static/Inconsolata_SemiExpanded-Black.ttf","/fonts/Inconsolata/static/Inconsolata_SemiExpanded-Bold.ttf","/fonts/Inconsolata/static/Inconsolata_SemiExpanded-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata_SemiExpanded-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata_SemiExpanded-Light.ttf","/fonts/Inconsolata/static/Inconsolata_SemiExpanded-Medium.ttf","/fonts/Inconsolata/static/Inconsolata_SemiExpanded-Regular.ttf","/fonts/Inconsolata/static/Inconsolata_SemiExpanded-SemiBold.ttf","/fonts/Inconsolata/static/Inconsolata_UltraCondensed-Black.ttf","/fonts/Inconsolata/static/Inconsolata_UltraCondensed-Bold.ttf","/fonts/Inconsolata/static/Inconsolata_UltraCondensed-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata_UltraCondensed-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata_UltraCondensed-Light.ttf","/fonts/Inconsolata/static/Inconsolata_UltraCondensed-Medium.ttf","/fonts/Inconsolata/static/Inconsolata_UltraCondensed-Regular.ttf","/fonts/Inconsolata/static/Inconsolata_UltraCondensed-SemiBold.ttf","/fonts/Inconsolata/static/Inconsolata_UltraExpanded-Black.ttf","/fonts/Inconsolata/static/Inconsolata_UltraExpanded-Bold.ttf","/fonts/Inconsolata/static/Inconsolata_UltraExpanded-ExtraBold.ttf","/fonts/Inconsolata/static/Inconsolata_UltraExpanded-ExtraLight.ttf","/fonts/Inconsolata/static/Inconsolata_UltraExpanded-Light.ttf","/fonts/Inconsolata/static/Inconsolata_UltraExpanded-Medium.ttf","/fonts/Inconsolata/static/Inconsolata_UltraExpanded-Regular.ttf","/fonts/Inconsolata/static/Inconsolata_UltraExpanded-SemiBold.ttf","/_astro/page.d7d8fe59.js"]}),{pageMap:dm,renderers:Z}),hm=void 0,mm=Dr(vr),zg=mm.default,wr="start";wr in br&&br[wr](vr,hm);export{zg as default,dm as pageMap};
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
