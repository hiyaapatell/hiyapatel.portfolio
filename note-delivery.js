/* Deliver visitor notes without opening a mail application. */
(() => {
const endpoint='https://formsubmit.co/ajax/hhpatel@mit.edu';
document.addEventListener('submit',async event=>{
 const form=event.target;
 if(!(form instanceof HTMLFormElement)||!form.closest('.note-dialog'))return;
 event.preventDefault();event.stopImmediatePropagation();
 if(form.dataset.sending==='true'||!form.reportValidity())return;
 const values=new FormData(form);
 const name=String(values.get('name')||'').trim(),email=String(values.get('email')||'').trim(),message=String(values.get('message')||'').trim();
 if(!name||!email||!message)return;
 const submit=form.querySelector('button[type="submit"]');
 let status=form.querySelector('.note-delivery-status');
 if(!status){status=document.createElement('p');status.className='note-delivery-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(status);}
 status.textContent='Sending your note…';status.dataset.state='pending';
 form.dataset.sending='true';form.setAttribute('aria-busy','true');if(submit)submit.disabled=true;
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
 try{
   const response=await fetch(endpoint,{
     method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
     body:JSON.stringify({name,email,message,_replyto:email,_subject:'Portfolio note from '+name,_template:'table',_url:location.origin+location.pathname+'#notes'}),
     signal:controller.signal
   });
   const result=await response.json();
   if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Delivery rejected');
   status.textContent='Thank you! Your note has been submitted.';status.dataset.state='success';form.reset();
 }catch(error){
   status.textContent='Your note couldn’t be sent. Please try again, or email ';
   const fallback=document.createElement('a');fallback.href='mailto:hhpatel@mit.edu';fallback.textContent='hhpatel@mit.edu';status.append(fallback,document.createTextNode('.'));
   status.dataset.state='error';
 }finally{
   clearTimeout(timeout);delete form.dataset.sending;form.removeAttribute('aria-busy');if(submit)submit.disabled=false;
 }
},true);
})();
