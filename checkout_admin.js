'use strict';
(function(){
const $=id=>document.getElementById(id),cards=JSON.parse($('checkout-admin-data').textContent),service=window.FamilyCheckoutService;
let mode='checkout',request=null,selects=[],loanChecks=[],plan=null,reading=0,saving=false,snapshot=null,liveReady=false;
function feedback(message,error=false){$('import-feedback').textContent=message;$('import-feedback').setAttribute('data-error',String(error))}
function invalidate(){plan=null;$('checkout-approval').hidden=true}
function today(){const now=new Date();return now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0')}
$('checkout-date').value=today();
function lookup(id){return cards.find(c=>(c.catalog_ids??[c.id]).includes(id))}
function copyFormat(id){const card=lookup(id);return card?.copies?.find(c=>c.id===id)?.format??card?.format??'Unknown format'}
function drawCheckout(){
 if(!request){$('checkout-review').hidden=true;return}
 const previous=selects.map(s=>s.value);selects=[];$('checkout-review').hidden=false;$('import-request-id').textContent='Request '+request.request_id;
 const list=$('checkout-titles');list.replaceChildren();
 for(const [index,row] of CheckoutImport.reviewRows(request,cards).entries()){
  const li=document.createElement('li'),title=document.createElement('strong'),id=document.createElement('small'),label=document.createElement('label'),select=document.createElement('select');
  title.textContent=row.title;id.textContent='Requested catalog #'+row.requested_id;label.textContent='PHYSICAL COPY';select.required=true;select.setAttribute('aria-label','Copy of '+row.title);
  const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Choose a copy…';select.append(placeholder);
  for(const copy of row.copies){const option=document.createElement('option');option.value=String(copy.id);option.disabled=!copy.available;option.textContent='#'+copy.id+' · '+copy.format+(copy.available?' · Available':' · Out to '+(copy.borrower||'another borrower'));select.append(option)}
  select.value=row.copies.some(c=>String(c.id)===previous[index]&&c.available)?previous[index]:row.copies.length===1&&row.copies[0].available?String(row.copies[0].id):'';
  select.addEventListener('change',invalidate);label.append(select);li.append(title,id,label);list.append(li);selects.push(select);
 }
}
function returnLoans(){let loans=snapshot?.active_loans??[];if(request){const allowed=new Set(request.ids.flatMap(id=>lookup(id)?.catalog_ids??[id]));loans=loans.filter(l=>allowed.has(l.catalog_id))}return loans}
function drawCheckin(){
 const checked=new Set(loanChecks.filter(c=>c.input.checked).map(c=>c.loan.loan_id));loanChecks=[];$('checkout-review').hidden=false;
 $('import-request-id').textContent=request?'Filtering by request '+request.request_id:'Current checked-out copies';const list=$('checkout-titles');list.replaceChildren();
 const loans=returnLoans();
 if(!loans.length){const li=document.createElement('li');li.textContent=liveReady?'No checked-out copies in this list.':'Current loans will appear when shared status is connected.';list.append(li)}
 for(const loan of loans){const li=document.createElement('li'),label=document.createElement('label'),input=document.createElement('input'),span=document.createElement('span'),title=document.createElement('strong'),meta=document.createElement('small');
  label.className='loan-choice';input.type='checkbox';input.checked=checked.has(loan.loan_id);input.setAttribute('aria-label','Return '+lookup(loan.catalog_id)?.title+' · catalog #'+loan.catalog_id);
  title.textContent=lookup(loan.catalog_id)?.title??'Catalog #'+loan.catalog_id;meta.textContent='#'+loan.catalog_id+' · '+copyFormat(loan.catalog_id)+' · '+loan.borrower+' · since '+loan.checked_out_on;
  input.addEventListener('change',invalidate);span.append(title,meta);label.append(input,span);li.append(label);list.append(li);loanChecks.push({input,loan});
 }
}
function draw(){invalidate();$('mode-checkout').setAttribute('aria-pressed',String(mode==='checkout'));$('mode-checkin').setAttribute('aria-pressed',String(mode==='checkin'));
 $('borrower-field').hidden=mode==='checkin';$('checkout-borrower').required=mode==='checkout';$('review-heading').textContent=mode==='checkin'?'Review returns':'Review checkout';$('date-label').textContent=mode==='checkin'?'RETURN DATE':'CHECKOUT DATE';
 $('file-help').textContent=mode==='checkin'?'Select checked-out copies below, or import the original .md list to narrow them down.':'Choose the .md list you received. Importing does not check anything out.';
 $('copy-help').textContent=mode==='checkin'?'Select only the physical copies being returned.':'Choose the physical copy you are lending. Already-loaned copies cannot be selected.';
 if(mode==='checkout')drawCheckout();else drawCheckin();$('review-checkout').disabled=!liveReady||saving;
}
for(const action of ['checkout','checkin'])$('mode-'+action).addEventListener('click',()=>{if(saving)return;mode=action;draw();feedback('')});
service.start((data,error)=>{
 if(error){liveReady=false;$('connection-status').textContent=service.configured?'Could not refresh shared availability. Try again when connected.':'Shared checkout saving is not connected yet.';$('review-checkout').disabled=true;$('confirm-checkout').disabled=true;return}
 const changed=snapshot?.revision!==data.revision;snapshot=data;liveReady=true;CheckoutImport.applySnapshot(cards,data);$('connection-status').textContent='Shared availability is up to date.';
 if(changed&&!saving)draw();else if(!saving)$('review-checkout').disabled=false;
});
$('checkout-file').addEventListener('change',async()=>{
 const generation=++reading;request=null;selects=[];invalidate();$('checkout-review').hidden=true;const file=$('checkout-file').files?.[0];
 if(!file){draw();feedback('Choose a Markdown list.');return}
 try{if(file.size>CheckoutImport.MAX_FILE_BYTES)throw Error('Choose a Markdown list smaller than 256 KB.');const parsed=await CheckoutImport.parseMarkdown(await file.text(),cards);if(generation!==reading)return;request=parsed;$('checkout-borrower').value=request.borrower;draw();feedback('List imported. Review the physical copies before confirming.');if(mode==='checkout')$('checkout-borrower').focus()}
 catch(error){if(generation===reading)feedback(error.message||'Could not read this list.',true)}
});
for(const id of ['checkout-borrower','checkout-date'])$(id).addEventListener('input',invalidate);
function busy(value){saving=value;for(const id of ['mode-checkout','mode-checkin','checkout-file','checkout-borrower','checkout-date','edit-checkout'])$(id).disabled=value;for(const select of selects)select.disabled=value;for(const item of loanChecks)item.input.disabled=value;}
function returnId(){return 'return-'+(globalThis.crypto?.randomUUID?.()??Date.now().toString(36)+'-'+Math.random().toString(36).slice(2))}
function makePlan(previousId){
 if(!liveReady)throw Error('Shared checkout saving is not connected. No checkout has been changed.');
 if(mode==='checkout'){if(!request)throw Error('Import a Markdown list first.');return CheckoutImport.createPlan(request,$('checkout-borrower').value,$('checkout-date').value,selects.map(s=>Number(s.value)),cards)}
 return CheckoutImport.createReturnPlan(loanChecks.filter(c=>c.input.checked).map(c=>c.loan.catalog_id),snapshot.active_loans,$('checkout-date').value,previousId??returnId());
}
$('checkout-review').addEventListener('submit',event=>{
 event.preventDefault();if(saving)return;
 try{plan=makePlan();const ids=plan.catalog_ids;
  $('approval-summary').textContent=(mode==='checkout'?plan.borrower+' · '+plan.checked_out_on:'Returning copies · '+plan.returned_on)+'\n\n'+ids.map(id=>lookup(id).title+' · #'+id+' · '+copyFormat(id)+(mode==='checkin'?' · '+snapshot.active_loans.find(l=>l.catalog_id===id).borrower:'')).join('\n');
  $('confirm-checkout').textContent=mode==='checkin'?'Confirm check-in':'Confirm checkout';$('confirm-checkout').disabled=false;$('checkout-approval').hidden=false;$('confirm-checkout').focus();
 }catch(error){feedback(error.message,true);invalidate()}
});
$('edit-checkout').addEventListener('click',()=>{invalidate();(mode==='checkout'?$('checkout-borrower'):$('checkout-date')).focus()});
$('confirm-checkout').addEventListener('click',async()=>{
 if(!plan||saving)return;
 try{const submitted=makePlan(plan.request_id);busy(true);$('confirm-checkout').disabled=true;$('review-checkout').disabled=true;
  await service.mutate(submitted);saving=false;draw();feedback(submitted.operation==='checkin'?'Check-in saved. The returned copies are now available to everyone.':'Checkout saved. These copies are now checked out to '+submitted.borrower+'.');
 }catch(error){saving=false;feedback(error.message||'The save could not be confirmed.',true);await service.refresh().catch(()=>{});invalidate()}
 finally{busy(false);$('review-checkout').disabled=!liveReady}
});
})();
