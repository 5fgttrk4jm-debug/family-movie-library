/* Parse exported lists as text and validate physical-copy choices against the catalog. */
(function(root){
'use strict';
const MAX_FILE_BYTES=256*1024;
const confirmed=r=>['Photo confirmed','Owner confirmed'].includes(r.inventory_status);
function aliases(cards){const map=new Map();for(const card of cards.filter(confirmed))for(const id of card.catalog_ids??[card.id])map.set(id,card);return map}
function unescapeMarkdown(value){return value.replace(/\\([\\`*_{}\[\]()|<>~])/g,'$1')}
function oneField(text,name){const values=[...text.matchAll(new RegExp('^\\*\\*'+name+':\\*\\*[^\\S\\n]*(.*)$','gm'))].map(m=>m[1].trim());if(values.length>1)throw Error('The file repeats '+name+'.');return values[0]??''}
async function defaultHash(text){const bytes=new TextEncoder().encode(text);const hash=await globalThis.crypto.subtle.digest('SHA-256',bytes);return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function parseMarkdown(input,cards,hash=defaultHash){
 if(typeof input!=='string'||new TextEncoder().encode(input).length>MAX_FILE_BYTES)throw Error('Choose a Markdown list smaller than 256 KB.');
 const text=input.replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n');
 const lines=text.split('\n').filter(line=>/^\s*- Catalog ID:/.test(line));
 if(!lines.length)throw Error('No catalog IDs found. Choose a Movie picks .md file saved by this website.');
 const ids=lines.map(line=>{const m=line.match(/^\s*- Catalog ID: (\d+)\s*$/);if(!m||!Number.isSafeInteger(+m[1]))throw Error('The file contains an invalid catalog ID.');return +m[1]});
 if(new Set(ids).size!==ids.length)throw Error('The list repeats a catalog ID.');
 const count=oneField(text,'Selected entries');
 if(count&&(!/^\d+$/.test(count)||+count!==ids.length))throw Error('The selected-entry count does not match the catalog IDs.');
 const items=text.match(/^- \[[ xX]\] /gm);
 if(items&&items.length!==ids.length)throw Error('Each requested title must have exactly one catalog ID.');
 const lookup=aliases(cards);const seen=new Set();
 for(const id of ids){const card=lookup.get(id);if(!card)throw Error('Catalog #'+id+' is unknown or unconfirmed.');if(seen.has(card.id))throw Error('The list requests the same combined title more than once.');seen.add(card.id)}
 let requestId=oneField(text,'Request ID');
 if(requestId&&!/^[A-Za-z0-9_-]{1,120}$/.test(requestId))throw Error('The request ID is invalid.');
 if(!requestId)requestId='legacy-'+(await hash(text)).slice(0,20);
 let borrower=unescapeMarkdown(oneField(text,'Name'));if(borrower==='Not provided')borrower='';
 return {request_id:requestId,borrower,ids};
}
function reviewRows(request,cards){
 const lookup=aliases(cards);
 return request.ids.map(id=>{const card=lookup.get(id);if(!card)throw Error('Catalog #'+id+' is no longer confirmed.');
  const available=card.available_copy_ids??card.catalog_ids??[card.id];
  const copies=(card.copies??[{id:card.id,format:card.format}]).map(copy=>{const loan=(card.checked_out_copies??[]).find(l=>l.catalog_id===copy.id);return {id:copy.id,format:copy.format,available:available.includes(copy.id),borrower:loan?.borrower??'',checked_out_on:loan?.checked_out_on??''}});
  return {requested_id:id,card_id:card.id,title:card.title,copies};
 });
}
function createPlan(request,borrower,on,selections,cards){
 borrower=String(borrower??'').trim();
 if(!borrower||borrower.length>80||/[\u0000-\u001f\u007f]/.test(borrower))throw Error('Enter the borrower’s name (up to 80 characters).');
 const date=new Date(on+'T00:00:00Z');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(on)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==on)throw Error('Choose a valid checkout date.');
 const reviewed=reviewRows(request,cards);
 if(!Array.isArray(selections)||selections.length!==reviewed.length||new Set(selections).size!==selections.length)throw Error('Choose exactly one physical copy for every title.');
 reviewed.forEach((row,index)=>{const copy=row.copies.find(c=>c.id===selections[index]);if(!copy)throw Error('Choose a physical copy of '+row.title+'.');if(!copy.available)throw Error('Catalog #'+copy.id+' is already checked out.');});
 return {version:1,operation:'checkout',request_id:request.request_id,borrower,checked_out_on:on,requested_catalog_ids:[...request.ids],catalog_ids:[...selections]};
}
function applySnapshot(cards,snapshot){
 const active=new Map(snapshot.active_loans.map(loan=>[loan.catalog_id,loan]));
 for(const card of cards){const ids=card.catalog_ids??[card.id];card.checked_out_copies=ids.filter(id=>active.has(id)).map(id=>({...active.get(id)}));card.available_copy_ids=confirmed(card)?ids.filter(id=>!active.has(id)):[];card.checkout_status=card.checked_out_copies.length?(card.available_copy_ids.length?'Some copies checked out':'Checked out'):(confirmed(card)?'Available':'Unconfirmed');}
}
function createReturnPlan(ids,loans,on,requestId){
 if(!Array.isArray(ids)||!ids.length||new Set(ids).size!==ids.length)throw Error('Select the copies being returned.');
 const date=new Date(on+'T00:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(on)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==on)throw Error('Choose a valid return date.');
 const chosen=ids.map(id=>{const loan=loans.find(l=>l.catalog_id===id);if(!loan?.loan_id)throw Error('The selected loan changed. Refresh and review it again.');if(on<loan.checked_out_on)throw Error('A return cannot precede checkout.');return loan});
 return {version:1,operation:'checkin',request_id:requestId,returned_on:on,catalog_ids:[...ids],loan_ids:chosen.map(l=>l.loan_id)};
}
const api={MAX_FILE_BYTES,parseMarkdown,reviewRows,createPlan,applySnapshot,createReturnPlan};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CheckoutImport=api;
})(globalThis);
