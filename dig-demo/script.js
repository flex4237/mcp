// Simple behavior: dialog open/close, clear buttons, and Persian digit formatting for amount field
const openBtn = document.getElementById('openDialog');
const dialog = document.getElementById('dialog');
const overlay = document.getElementById('dialogOverlay');
const dialogClose = document.getElementById('dialogClose');
const dialogCancel = document.getElementById('dialogCancel');

openBtn.addEventListener('click', ()=>{
  dialog.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

function closeDialog(){
  dialog.classList.add('hidden');
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

dialogClose.addEventListener('click', closeDialog);
dialogCancel.addEventListener('click', closeDialog);
overlay.addEventListener('click', closeDialog);

// clear buttons
document.getElementById('clearEmail').addEventListener('click', ()=>{
  document.getElementById('emailInput').value='';
});

// Persian digits helpers
function toFaDigits(str){
  return str.replace(/\d/g, d=>String.fromCharCode(1776+Number(d)));
}
function toEnDigits(str){
  return str.replace(/[۰-۹]/g,d=>String.fromCharCode(d.charCodeAt(0)-1728));
}

const amountInput = document.getElementById('amountInput');
const amountHidden = document.getElementById('amountHidden');

amountInput.addEventListener('input', (e)=>{
  const raw = toEnDigits(e.target.value.replace(/[,٬]/g,''));
  // keep only digits and optional dot
  const cleaned = raw.replace(/[^0-9.]/g,'');
  amountHidden.value = cleaned; // latin value for form submission
  // display with grouping
  const parts = cleaned.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
  e.target.value = toFaDigits(parts.join('.'));
});

// clear amount
document.getElementById('clearAmount').addEventListener('click', ()=>{
  amountInput.value=''; amountHidden.value='';
});
