'use strict';
(function(){
 const element=document.getElementById('checkout-service-config');const config=element?JSON.parse(element.textContent):{};
 let endpoint='';try{const url=new URL(config.endpoint);if(url.protocol==='https:'&&!url.username&&!url.password&&!url.search&&!url.hash)endpoint=url.origin}catch{}
 const subscribers=new Set();let snapshot=null,inflight=null,started=false;
 function validate(data){if(!data||!Number.isSafeInteger(data.revision)||data.revision<0||!Array.isArray(data.active_loans))throw Error('Invalid shared checkout status.');const seen=new Set();for(const loan of data.active_loans){if(!Number.isSafeInteger(loan.catalog_id)||seen.has(loan.catalog_id)||typeof loan.loan_id!=='string'||typeof loan.borrower!=='string'||typeof loan.checked_out_on!=='string')throw Error('Invalid shared checkout status.');seen.add(loan.catalog_id)}return data}
 function notify(data,error){for(const callback of subscribers)callback(data,error)}
 function accept(data){data=validate(data);if(snapshot&&data.revision<snapshot.revision)return snapshot;snapshot=data;notify(snapshot,null);return snapshot}
 async function refresh(){
  if(!endpoint)throw Error('Shared checkout saving is not connected yet.');if(inflight)return inflight;
  inflight=(async()=>{try{const response=await fetch(endpoint+'/api/status',{cache:'no-store',credentials:'omit',headers:{Accept:'application/json'}});const data=await response.json();if(!response.ok)throw Error(data.error||'Could not refresh checkout status.');return accept(data)}catch(error){notify(null,error);throw error}finally{inflight=null}})();return inflight;
 }
 async function mutate(plan){
  if(!endpoint)throw Error('Shared checkout saving is not connected yet.');
  const path=plan.operation==='checkin'?'checkin':plan.operation==='checkout'?'checkout':null;if(!path)throw Error('Choose check out or check in.');
  let response;try{response=await fetch(endpoint+'/api/'+path,{method:'POST',credentials:'omit',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify(plan)})}catch{throw Error('The save could not be confirmed. Refresh checkout status before retrying.')}
  let data;try{data=await response.json()}catch{throw Error('The save could not be confirmed. Refresh the checkout status before retrying.');}
  if(!response.ok)throw Error(data.error||'The save could not be confirmed.');return accept(data);
 }
 function start(callback){subscribers.add(callback);if(snapshot)callback(snapshot,null);if(!endpoint){callback(null,Error('Shared checkout saving is not connected yet.'));return}
  if(!started){started=true;refresh().catch(()=>{});window.addEventListener('focus',()=>refresh().catch(()=>{}));document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh().catch(()=>{})});setInterval(()=>{if(!document.hidden)refresh().catch(()=>{})},30000)}
 }
 window.FamilyCheckoutService={configured:!!endpoint,refresh,mutate,start,current:()=>snapshot};
 if(window.FamilyCheckoutUI)start(window.FamilyCheckoutUI.update);
})();
