"use strict";(self["webpackChunkflyticket"]=self["webpackChunkflyticket"]||[]).push([[60],{5060:function(e,n,a){a.r(n),a.d(n,{default:function(){return v}});var t=a(3396),l=a(9242),i=a(7139);const u=e=>((0,t.dD)("data-v-25f1987c"),e=e(),(0,t.Cn)(),e),c={class:"container"},o=u((()=>(0,t._)("div",null,"Type your email here so that we can find your account",-1)));function r(e,n,a,u,r,s){return(0,t.wg)(),(0,t.iD)("div",c,[o,(0,t._)("form",null,[(0,t.wy)((0,t._)("input",{type:"email",name:"",id:"","onUpdate:modelValue":n[0]||(n[0]=e=>u.email=e)},null,512),[[l.nr,u.email]])]),(0,t._)("p",null,(0,i.zw)(u.message),1),(0,t._)("button",{type:"submit",onClick:n[1]||(n[1]=e=>u.findEmail())},"Find My Account")])}var s=a(4870),d=a(8332),f={setup(){let e=(0,s.iH)(""),n=(0,s.iH)("");function a(){d.Z.get("/findEmail/"+n.value).then((n=>{console.log(n.data),e.value=n.data.message,console.log(e.value)})).catch((e=>{console.error(e)}))}return{email:n,findEmail:a,message:e}}},m=a(89);const p=(0,m.Z)(f,[["render",r],["__scopeId","data-v-25f1987c"]]);var v=p}}]);
//# sourceMappingURL=60.6d9dc940.js.map