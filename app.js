var EMAILJS_PUBLIC = 'vO1JLR3TEoMLqHqhU';
var EMAILJS_SERVICE = 'service_chzr6eo';
var EMAILJS_TEMPLATE = 'template_w2ct94l';
var FIREBASE_FN_URL = 'https://submitorder-mglznpa3zq-uc.a.run.app';
var MY_PHOTOS = {
  '0001-bulbasaur': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0001-bulbasaur.jpg',
  '0002-ivysaur': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0002-ivysaur.jpg',
  '0003-venusaur': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0003-venusaur.jpg',
  '0004-charmander': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0004-charmander.jpg',
  '0005-charmeleon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0005-charmeleon.jpg',
  '0006-charizard': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0006-charizard.jpg',
  '0006-mega-charizard-x': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0006-mega-charizard-x.jpg',
  '0007-squirtle': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0007-squirtle.jpg',
  '0008-wartortle': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0008-wartortle.jpg',
  '0009-blastoise': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0009-blastoise.jpg',
  '0025-pikachu': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0025-pikachu.jpg',
  '0045-vileplume': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0045-vileplume.jpg',
  '0054-psyduck': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0054-psyduck.jpg',
  '0068-machamp': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0068-machamp.jpg',
  '0082-magneton': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0082-magneton.jpg',
  '0092-gastly': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0092-gastly.jpg',
  '0094-gengar': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0094-gengar.jpg',
  '0104-cubone': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0104-cubone.jpg',
  '0105-marowak': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0105-marowak.jpg',
  '0120-staryu': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0120-staryu.jpg',
  '0123-scyther': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0123-scyther.jpg',
  '0129-magikarp': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0129-magikarp.jpg',
  '0130-gyarados': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0130-gyarados.jpg',
  '0132-ditto': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0132-ditto.jpg',
  '0133-eevee': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0133-eevee.jpg',
  '0134-vaporeon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0134-vaporeon.jpg',
  '0135-jolteon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0135-jolteon.jpg',
  '0136-flareon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0136-flareon.jpg',
  '0143-snorlax': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0143-snorlax.jpg',
  '0145-zapdos': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0145-zapdos.jpg',
  '0146-moltres': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0146-moltres.jpg',
  '0150-mewtwo': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0150-mewtwo.jpg',
  '0151-mew': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0151-mew.jpg',
  '0172-pichu': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0172-pichu.jpg',
  '0175-togepi': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0175-togepi.jpg',
  '0196-espeon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0196-espeon.jpg',
  '0197-umbreon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0197-umbreon.jpg',
  '0250-ho-oh': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0250-ho-oh.jpg',
  '0382-kyogre': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0382-kyogre.jpg',
  '0383-groudon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0383-groudon.jpg',
  '0470-leafeon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0470-leafeon.jpg',
  '0471-glaceon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0471-glaceon.jpg',
  '0487-giratina': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0487-giratina.jpg',
  '0493-arceus': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0493-arceus.jpg',
  '0700-sylveon': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0700-sylveon.jpg',
  '0959-tinkaton': 'https://storage.googleapis.com/pokeprintadmin.firebasestorage.app/product-photos/0959-tinkaton.jpg'
};

function getPrice(g){return g<=149?8:g<=249?10:12;}

var TC={fire:{bg:'#3d1a0a',text:'#e87722',border:'#7a3410'},water:{bg:'#0a1a2e',text:'#4a9fd4',border:'#1a4a7a'},grass:{bg:'#0a2010',text:'#4ab84a',border:'#1a5a1a'},electric:{bg:'#2e2400',text:'#d4b800',border:'#6a5a00'},psychic:{bg:'#2e0a1a',text:'#d45a8a',border:'#7a1a4a'},ghost:{bg:'#1a0a2e',text:'#8a6ad4',border:'#4a2a8a'},dragon:{bg:'#0a0a2e',text:'#6a6ad4',border:'#2a2a8a'},dark:{bg:'#1a1410',text:'#8a7a6a',border:'#4a3a2a'},fairy:{bg:'#2e0a1e',text:'#d47ab4',border:'#8a2a6a'},normal:{bg:'#1e1e18',text:'#a0a090',border:'#4a4a40'},fighting:{bg:'#2e1000',text:'#c46030',border:'#7a2a00'},flying:{bg:'#0e1a2e',text:'#7aaad4',border:'#2a5a8a'},poison:{bg:'#1e0a2e',text:'#a05ac4',border:'#5a1a7a'},ground:{bg:'#2a1e08',text:'#b4884a',border:'#6a4a10'},rock:{bg:'#1e1a0a',text:'#909060',border:'#4a4820'},bug:{bg:'#0e1e00',text:'#7aa020',border:'#2a5800'},steel:{bg:'#141820',text:'#8898b0',border:'#303848'},ice:{bg:'#081e2a',text:'#6ab4cc',border:'#1a5878'}};
function ts(t){return TC[t]||TC.normal;}

function ballSVG(type){
  var s=ts(type);
  return '<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="32" stroke="'+s.border+'" stroke-width="2" fill="'+s.bg+'"/><path d="M4 36 Q36 36 68 36" stroke="'+s.border+'" stroke-width="2"/><circle cx="36" cy="36" r="8" fill="'+s.bg+'" stroke="'+s.text+'" stroke-width="1.5"/><circle cx="36" cy="36" r="4" fill="'+s.text+'" opacity="0.6"/></svg>';
}

var allDesigns=[],activeFilter='all',cart=[],info={},step='cart';

function getFilters(designs){
  var types=new Set();
  designs.forEach(function(d){if(d.pokemon&&d.pokemon.types)d.pokemon.types.forEach(function(t){types.add(t.toLowerCase());});});
  return['all'].concat(Array.from(types).sort());
}

function renderFilters(designs){
  document.getElementById('filter-bar').innerHTML=getFilters(designs).map(function(f){
    var s=ts(f);
var style=f==='all'?'':' style="border-color:'+s.border+';color:'+s.text+'"';
var activeStyle=f==='all'?'':' style="background:'+s.bg+';border-color:'+s.border+';color:'+s.text+'"';
return '<button class="filter-btn '+(f===activeFilter?'active':'')+'"'+( f===activeFilter?activeStyle:style)+' onclick="setFilter(\''+f+'\')">'+(f==='all'?'All types':f)+'</button>';
  }).join('');
}

var searchQuery='';
function setFilter(f){activeFilter=f;renderFilters(allDesigns);renderProducts();}
function searchDesigns(q){searchQuery=q.toLowerCase();renderProducts();}

function renderProducts(){
  var filtered=activeFilter==='all'?allDesigns:allDesigns.filter(function(d){
    return d.pokemon&&d.pokemon.types&&d.pokemon.types.map(function(t){return t.toLowerCase();}).indexOf(activeFilter)>=0;
  });
  if(searchQuery){filtered=filtered.filter(function(d){var name=d.pokemon?d.pokemon.name.toLowerCase():d.title.toLowerCase();return name.indexOf(searchQuery)>=0;});}
  if(!filtered.length){document.getElementById('shop-content').innerHTML='<div class="error-state"><p class="error-msg">No designs found for this type.</p></div>';return;}
  var html=filtered.map(function(d){
    var price=getPrice(d.total_weight_grams||0);
    var type=d.pokemon&&d.pokemon.types&&d.pokemon.types[0]?d.pokemon.types[0].toLowerCase():'normal';
    var s=ts(type);
    var desc=d.pokemon&&d.pokemon.description?d.pokemon.description.substring(0,90)+'...':'A precision multi-colour 3D printed Pokemon Poke Ball fusion.';
    var rawName=d.pokemon?d.pokemon.name:d.title;var pokeName=rawName.charAt(0).toUpperCase()+rawName.slice(1);
    var photo=MY_PHOTOS[d.slug]||'';
    var imgContent=photo?'<img src="'+photo+'" alt="'+pokeName+'" loading="lazy" onclick="openLightbox(this.src,this.alt)" style="cursor:zoom-in">'
      :'<div class="poke-placeholder">'+ballSVG(type)+'</div>';
    var safeName=pokeName.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    return '<div class="product-card">'
      +'<div class="product-img">'+imgContent
      +'<div class="type-badge" style="background:'+s.bg+';color:'+s.text+';border:0.5px solid '+s.border+'">'+type+'</div>'
      +'</div>'
      +'<div class="product-info">'
      +'<p class="product-name">'+pokeName+'</p>'
      +'<p class="product-desc">'+desc+'</p>'
      +'<div class="product-footer">'
      +'<span class="product-price">$'+price+'</span>'
      +'<button class="add-btn" onclick="addToCart(\''+d.slug+'\','+price+',\''+safeName+'\',\''+photo+'\')">Add to cart</button>'
      +'</div></div></div>';
  }).join('');
  document.getElementById('shop-content').innerHTML='<div class="products-grid">'+html+'</div>';
}

function showError(msg){
  document.getElementById('shop-content').innerHTML='<div class="error-state"><p class="error-title">Could not load designs</p><p class="error-msg">'+msg+'</p><button class="retry-btn" onclick="loadDesigns()">Try again</button></div>';
}

function loadDesigns(){
  document.getElementById('shop-content').innerHTML='<div class="loading-state"><div class="loading-spinner"></div><p>Loading designs...</p></div>';
  var xhr=new XMLHttpRequest();
  xhr.open('GET','designs.json',true);
  xhr.timeout=30000;
  xhr.onload=function(){
    if(xhr.status!==200){showError('HTTP '+xhr.status);return;}
    var data;
    try{data=JSON.parse(xhr.responseText);}catch(e){showError('Parse error: '+e.message);return;}
    allDesigns=data.data||[];
    if(!allDesigns.length){showError('No designs found');return;}
    renderFilters(allDesigns);
    renderProducts();
  };
  xhr.onerror=function(){showError('Network error');};
  xhr.ontimeout=function(){showError('Request timed out');};
  xhr.send();
}

function total(){return cart.reduce(function(s,i){return s+i.price*i.qty;},0);}
function count(){return cart.reduce(function(s,i){return s+i.qty;},0);}
function genRef(){return 'BPP-'+Date.now().toString(36).toUpperCase().slice(-6);}

function addToCart(slug,price,name,photo){
  var existing=null;
  for(var i=0;i<cart.length;i++){if(cart[i].slug===slug){existing=cart[i];break;}}
  if(existing){existing.qty++;}else{cart.push({slug:slug,price:price,name:name,photo:photo,qty:1});}
  document.getElementById('cart-count').textContent=count();
  flashCart();
}

function flashCart(){
  var btn=document.getElementById('cart-count');
  btn.style.background='#f0d080';
  setTimeout(function(){btn.style.background='';},400);
}

function openCart(){document.getElementById('panel').classList.add('open');document.getElementById('ov').classList.add('open');renderStep();}
function closeCart(){document.getElementById('panel').classList.remove('open');document.getElementById('ov').classList.remove('open');}

function setStep(s){
  step=s;
  var steps=['cart','details','confirm'];
  for(var i=0;i<steps.length;i++){
    var t=document.getElementById('t'+(i+1));
    t.className='stab';
    if(steps[i]===s)t.classList.add('active');
    else if((s==='details'&&steps[i]==='cart')||(s==='confirm'&&steps[i]!=='confirm'))t.classList.add('done');
  }
  document.getElementById('ptitle').textContent=s==='cart'?'Your Cart':s==='details'?'Your Details':'Confirm Order';
  document.getElementById('steps').style.display='flex';
  renderStep();
}

function renderStep(){
  if(step==='cart')renderCart();
  else if(step==='details')renderDetails();
  else if(step==='confirm')renderConfirm();
}

function renderCart(){
  var B=document.getElementById('pbody'),F=document.getElementById('pfoot');
  if(!cart.length){
    B.innerHTML='<div style="text-align:center;padding:4rem 0;color:var(--muted)"><p style="color:#fff;font-size:15px;font-weight:500;margin-bottom:6px">Your cart is empty</p><p style="font-size:13px">Browse the collection and add some figures.</p></div>';
    F.innerHTML='<button class="btn-gold" onclick="closeCart()">Browse collection</button>';
    return;
  }
  var items='';
  for(var i=0;i<cart.length;i++){
    var it=cart[i];
    items+='<div class="citem"><div class="cthumb">'+(it.photo?'<img src="'+it.photo+'" alt="'+it.name+'">':it.name.slice(0,3).toUpperCase())+'</div><div class="cdetail"><p class="cname">'+it.name+' Pokeball</p><p class="csub">$'+it.price+' each</p></div><div class="cright"><span class="cprice">$'+(it.price*it.qty).toFixed(2)+'</span><div class="qrow"><button class="qbtn" onclick="chgQty(\''+it.slug+'\',-1)">-</button><span class="qnum">'+it.qty+'</span><button class="qbtn" onclick="chgQty(\''+it.slug+'\',1)">+</button></div><button class="rmbtn" onclick="rmItem(\''+it.slug+'\')">Remove</button></div></div>';
  }
  B.innerHTML=items+'<div class="summary"><div class="srow"><span>Subtotal ('+count()+' item'+(count()!==1?'s':'')+')</span><span>$'+total().toFixed(2)+'</span></div><div class="srow"><span>Shipping</span><span style="color:#4ab84a">Local pickup only</span></div><div class="sdiv"></div><div class="stotal"><span>Total due at delivery</span><span>$'+total().toFixed(2)+'</span></div></div><div class="notice"><p class="ntext"><strong>Pay on delivery</strong> - no payment taken now. Cash or Zelle accepted when you collect.</p></div>';
  F.innerHTML='<button class="btn-gold" onclick="setStep(\'details\')">Continue</button>';
}

function chgQty(slug,d){
  for(var i=0;i<cart.length;i++){if(cart[i].slug===slug){cart[i].qty=Math.max(1,cart[i].qty+d);break;}}
  renderCart();
}
function rmItem(slug){
  var nc=[];for(var i=0;i<cart.length;i++){if(cart[i].slug!==slug)nc.push(cart[i]);}cart=nc;renderCart();
}

function renderDetails(){
  var B=document.getElementById('pbody'),F=document.getElementById('pfoot');
  var mi='';for(var i=0;i<cart.length;i++){mi+='<div class="mini-row"><span>'+cart[i].name+' x '+cart[i].qty+'</span><span>$'+(cart[i].price*cart[i].qty).toFixed(2)+'</span></div>';}
  B.innerHTML='<button class="btn-back" onclick="setStep(\'cart\')">Back to cart</button><div class="mini"><p class="mini-label">Order summary</p>'+mi+'<div class="mini-total"><span>Total due at delivery</span><span>$'+total().toFixed(2)+'</span></div></div><div class="fg"><label class="flabel">Full name</label><input class="finput" id="fn" type="text" placeholder="Your name" value="'+(info.name||'')+'"><p class="ferr" id="en">Please enter your name</p></div><div class="fg"><label class="flabel">Phone number</label><input class="finput" id="fp" type="tel" placeholder="e.g. 010-1234-5678" value="'+(info.phone||'')+'"><p class="ferr" id="ep">Please enter a valid phone number</p></div><div class="fg"><label class="flabel">Email address</label><input class="finput" id="fe" type="email" placeholder="you@example.com" value="'+(info.email||'')+'"><p class="ferr" id="ee">Please enter a valid email</p></div><div class="fg"><label class="flabel">Preferred contact method</label><select class="fselect" id="fc"><option value="" disabled '+((!info.contact_method)?'selected':'')+'>Select one</option><option value="SMS" '+(info.contact_method==='SMS'?'selected':'')+'>SMS</option><option value="WhatsApp" '+(info.contact_method==='WhatsApp'?'selected':'')+'>WhatsApp</option><option value="Email" '+(info.contact_method==='Email'?'selected':'')+'>Email</option></select><p class="ferr" id="ec">Please select a contact method</p></div><div class="fg"><label class="flabel">Shiny design request <span style="color:var(--muted);font-size:10px">(optional)</span></label><textarea class="ftextarea" id="fsh" placeholder="Describe any shiny colour variant you would like">'+(info.shiny||'')+'</textarea><p class="fhint">Leave blank for the standard colour scheme.</p></div>';
  F.innerHTML='<button class="btn-gold" onclick="validate()">Review order</button>';
}

function validate(){
  var n=document.getElementById('fn').value.trim(),p=document.getElementById('fp').value.trim(),e=document.getElementById('fe').value.trim(),c=document.getElementById('fc').value,sh=document.getElementById('fsh').value.trim();
  var ok=true;
  function chk(fid,eid,test){document.getElementById(eid).style.display=test?'none':'block';document.getElementById(fid).classList.toggle('err',!test);if(!test)ok=false;}
  chk('fn','en',n.length>0);chk('fp','ep',p.length>=7);chk('fe','ee',e.indexOf('@')>=0&&e.indexOf('.')>=0);chk('fc','ec',c.length>0);
  if(ok){info={name:n,phone:p,email:e,contact_method:c,shiny:sh};setStep('confirm');}
}

function renderConfirm(){
  var B=document.getElementById('pbody'),F=document.getElementById('pfoot');
  var mi='';for(var i=0;i<cart.length;i++){mi+='<div class="mini-row"><span>'+cart[i].name+' Pokeball x '+cart[i].qty+'</span><span>$'+(cart[i].price*cart[i].qty).toFixed(2)+'</span></div>';}
  B.innerHTML='<button class="btn-back" onclick="setStep(\'details\')">Edit details</button><div class="mini"><p class="mini-label">Items</p>'+mi+'<div class="mini-total"><span>Total due at delivery</span><span>$'+total().toFixed(2)+'</span></div></div><div class="cdetails" style="margin-bottom:1.25rem"><p class="mini-label" style="margin-bottom:9px">Your details</p><div class="crow"><span>Name</span><span>'+info.name+'</span></div><div class="crow"><span>Phone</span><span>'+info.phone+'</span></div><div class="crow"><span>Email</span><span>'+info.email+'</span></div><div class="crow"><span>Contact via</span><span>'+info.contact_method+'</span></div>'+(info.shiny?'<div class="crow"><span>Shiny request</span><span>'+info.shiny+'</span></div>':'')+'</div><div class="notice"><p class="ntext"><strong>Pay on delivery</strong> - cash or Zelle accepted. Nothing is charged now.</p></div>';
  F.innerHTML='<button class="btn-gold" id="pbtn" onclick="placeOrder()">Place order</button>';
}

function placeOrder(){
  var btn=document.getElementById('pbtn');
  btn.disabled=true;btn.textContent='Placing order...';
  var ref=genRef();
  var placedAt=new Date().toISOString();
  var itemsText='';
  for(var i=0;i<cart.length;i++){itemsText+=cart[i].name+' Pokeball x'+cart[i].qty+' - $'+(cart[i].price*cart[i].qty).toFixed(2)+'\n';}
  var orderItems=[];
  for(var i=0;i<cart.length;i++){orderItems.push({slug:cart[i].slug,name:cart[i].name,qty:cart[i].qty,unit_price:cart[i].price,line_total:+(cart[i].price*cart[i].qty).toFixed(2)});}
  var orderData={ref:ref,placed_at:placedAt,customer:{name:info.name,phone:info.phone,email:info.email,contact_method:info.contact_method},items:orderItems,total_usd:+total().toFixed(2),shiny_request:info.shiny||'',payment:'cash_or_zelle_on_delivery',fulfillment:'local_pickup'};
  document.getElementById('pbody').innerHTML='<div class="sending"><div class="spin"></div><p>Sending your order...</p></div>';
  document.getElementById('pfoot').innerHTML='';
  var orderXhr=new XMLHttpRequest();
  orderXhr.open('POST',FIREBASE_FN_URL,true);
  orderXhr.setRequestHeader('Content-Type','application/json');
  orderXhr.send(JSON.stringify(orderData));
  if(typeof emailjs!=='undefined'){
    emailjs.send(EMAILJS_SERVICE,EMAILJS_TEMPLATE,{order_ref:ref,placed_at:new Date(placedAt).toLocaleString('en-US',{dateStyle:'medium',timeStyle:'short'}),customer_name:info.name,customer_phone:info.phone,customer_email:info.email,items:itemsText,total_usd:total().toFixed(2)}).then(function(){renderDone(ref);}).catch(function(){renderDone(ref);});
  } else {
    renderDone(ref);
  }
}

function renderDone(ref){
  document.getElementById('steps').style.display='none';
  document.getElementById('ptitle').textContent='Order placed';
  var first=info.name.split(' ')[0];
  document.getElementById('pbody').innerHTML='<div class="cscreen"><div class="cicon"><svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13l6 6 10-10" stroke="#c9a84c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h2 class="ctitle">Order confirmed!</h2><p class="csub2">Thanks '+first+'! Your order is in. I will be in touch via '+info.contact_method+' to arrange collection.</p><p class="cref">Ref: '+ref+'</p><div class="cdetails"><div class="crow"><span>Items</span><span>'+count()+' figure'+(count()!==1?'s':'')+'</span></div><div class="crow"><span>Total due</span><span>$'+total().toFixed(2)+'</span></div><div class="crow"><span>Payment</span><span>Cash or Zelle on delivery</span></div><div class="crow"><span>Contact method</span><span>'+info.contact_method+'</span></div></div><div class="notice"><p class="ntext">No payment taken now - cash or Zelle is due when you collect your order.</p></div></div>';
  document.getElementById('pfoot').innerHTML='<button class="btn-gold" onclick="resetAndClose()">Back to shop</button>';
  cart=[];info={};
  document.getElementById('cart-count').textContent='0';
}

function resetAndClose(){step='cart';closeCart();}

var ejsScript=document.createElement('script');
ejsScript.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
ejsScript.onload=function(){if(typeof emailjs!=='undefined')emailjs.init(EMAILJS_PUBLIC);};
document.head.appendChild(ejsScript);

loadDesigns();
