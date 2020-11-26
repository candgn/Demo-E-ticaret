

if(document.readyState=="loading"){
    document.addEventListener('DomContentLoaded',ready)
}else{
    ready();
    carousel();
    
    //kategorileri çekme
     var categories=[];
    
     fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>json.forEach(p => {
         
         if(categories.includes(p.category)){
             
         }else{
            categories.push(p.category);
            //kategori filtresi için dropdownlisti çektiğimiz kategorilerle oluşturma
            var catItem = document.createElement("option");
            catItem.classList.add("categories-dropdown-list");
            var catfilter = document.getElementById("catfilter");
            var option=p.category;
            
             var catOptions = `<option value="${p.category}">${p.category}</option>`;
            catItem.innerHTML=catOptions;
            catfilter.append(catItem);
            console.log(option);
         }
         
        
      }));
    
    
   
   
    //açılışta sepette ürünler tablosunu gizleme
    var cart_row=document.getElementsByClassName("cart-product-row");
    if(cart_row.length==0){
       var cartfull = document.getElementById("cart-full");
        cartfull.style.display="none";
        var toplam_alan = document.getElementsByClassName("toplam-alan")[0];
    toplam_alan.style.display="none";
       }
    
}

//ürünleri çekme
  function ready(){
     
      //ürünleri çekme ve ürün kartlarını oluşturma
      fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>json.forEach(p => {
        var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementById("pwrap");
  
    var cartRowContents = `
       <div class="product">
                    <img class="pimg" src="${p.image}">
                    <hr class="divider">
                    <div class="pinfo">
                        <p class="ptitle">${p.title}</p>
                        <p class="pcat">${p.category}</p>
                    </div>
                    <div class="pbuy">
                        <div class="buy-icon" id="${p.id}" onclick="addToCart(this)"><i class="material-icons" style="color:grey" >shopping_cart</i></div>
                        <p class="pprice">${p.price}₺</p> 
                                               
                    </div>
                    
                </div>`;
    cartRow.innerHTML = cartRowContents;
    cartRow.id=p.id;
    cartItems.appendChild(cartRow); 
      }));
   
    document.getElementById("pwrap").classList.add("grid");
  }


//sepete ürün ekleme
function addToCart(btn){
    //satırı oluşturma
    var id=btn.id;
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-product-row');
    var cartItems = document.getElementById("cart-table");
    
    
    //sepete ürün ekleyince tabloyu görünür sepet boş yazısını görünmez yapma
    var cartfull = document.getElementById("cart-full");
    cartfull.style.display = "block";
    var toplam_alan = document.getElementsByClassName("toplam-alan")[0];
    toplam_alan.style.display="block";
    var cart_empty=document.getElementsByClassName("cart-empty")[0];
    cart_empty.style.display="none";
    var sepet= document.getElementById("sepet");
    sepet.style.color="orange";
    
    btn.getElementsByClassName("material-icons")[0].style.color="orange";
 
    //sepete eklenen ürünlerin verilerini çekme ve elementi oluşturma
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>json.forEach(p => {
        if(p.id==id){
            
            var cartRowContents = `
                    <td class="cart-photo-row"><img src="${p.image}"></td>
                    <td class="cart-title-row">${p.title}</td>
                    <td class="cart-price-row">${p.price} ₺</td>
                    <td class="cart-remove-row" id="${id}" onclick="removeFromCart(this)"><i class="material-icons" style="color:red" >remove_circle</i></td>
        `;
    cartRow.innerHTML = cartRowContents;
    cartRow.id=id;
    cartItems.appendChild(cartRow);  
            updateCartTot();
        }
       
  
    
      }));
  
    
    
}


//sepetten eleman çıkarma
function removeFromCart(event){
     
    event.parentNode.remove();
    
    //sepetteki son ürünü silince sepet boş yazısını getirip ürünler başlıklarını kaldırma
    var cart_row=document.getElementsByClassName("cart-product-row");
    if(cart_row.length==0){
       var cartfull = document.getElementById("cart-full");
        cartfull.style.display="none";
        var toplam_alan = document.getElementsByClassName("toplam-alan")[0];
    toplam_alan.style.display="none";
        var cart_empty=document.getElementsByClassName("cart-empty")[0];
        cart_empty.style.display="block";
        var sepet= document.getElementById("sepet");
    sepet.style.color="whitesmoke";
       }
 
    updateCartTot();
    
    
}

//sepete eklenen ürünlerin toplam fiyatını hesaplama

function updateCartTot(islem,fiyat){
    var tot=0;
    var cartItemRows=document.getElementsByClassName("cart-product-row");
    
    for(var i=0;i<cartItemRows.length;i++){
        var cartRow=cartItemRows[i];
        var itemPrice = cartRow.getElementsByClassName("cart-price-row")[0];
        var price = parseFloat(itemPrice.innerText.replace(' ₺', ''));
        tot=tot+price;
        
    }
    
    tot = Math.round(tot * 100) / 100;
    
    document.getElementsByClassName('toplam-price')[0].innerText =  tot+' ₺' ;
    
}
    //sepeti açma kapama
    function myFunction() {
  var x = document.getElementById("shopping-cart");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else if(x.style.display === ""){
    x.style.display = "block";
            }
    else {
    x.style.display = "none";
  }
}

//filtreleme 

function filter(){
    
    var products = document.getElementsByClassName("cart-row");
    var selectedOption= document.getElementById("catfilter");
    var selectedValue = selectedOption.options[selectedOption.selectedIndex].value;
    
    var minInput= document.getElementById("filter-price-min");
    var minInputvalue=parseFloat(minInput.value);
    
    var maxInput= document.getElementById("filter-price-max");
    var maxInputvalue=parseFloat(maxInput.value);
    
    
    
  
    
    for(var i=0;i<products.length;i++){
            products[i].style.display="block";
        
    }
    for(var i=0;i<products.length;i++){
        var product = products[i].getElementsByClassName("pcat")[0];
        var pprice = products[i].getElementsByClassName("pprice")[0];
        var price = parseFloat(pprice.innerText.replace(' ₺', ''));
        var kontrol=1;
        if(minInput.value==""){
            minInputvalue=0;
            
        }
        if(maxInput.value==""){
            maxInputvalue=Number.MAX_VALUE;
        }
       
        if((selectedValue==product.innerText||selectedValue=="Hepsi")&&price>minInputvalue&&price<maxInputvalue){
            kontrol=kontrol*0;
            var urun_yok=document.getElementsByClassName("urun-yok")[0];
            urun_yok.style.display="none";
        }else{
            products[i].style.display="none";
        }
        
    }
    if(kontrol!=0){
            var urun_yok=document.getElementsByClassName("urun-yok")[0];
            urun_yok.style.display="block";
        }

   
}

//slider
function carousel(){
  

    
    
    
    fetch('https://fakestoreapi.com/products?limit=5')
            .then(res=>res.json())
            .then(json=>json.forEach(p => {
        var cell = document.createElement('div');
    cell.className = 'carousel-cell';
    
  var carousel = document.getElementsByClassName("carousel")[0];
    var cartRowContents = `
       <div class="product">
                    <img class="pimg" src="${p.image}">
                    <hr class="divider">
                    <div class="pinfo">
                        <p class="ptitle">${p.title}</p>
                        <p class="pcat">${p.category}</p>
                    </div>
                    <div class="pbuy">
                        <div class="buy-icon" id="${p.id}" onclick="addToCart(this)"><i class="material-icons" style="color:grey" >shopping_cart</i></div>
                        <p class="pprice">${p.price}₺</p> 
                                               
                    </div>
                    
                </div>`;
        
       
          var elem = document.querySelector('.carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});
            cell.innerHTML = cartRowContents;
            flkty.append( cell );
      }));
    
    

    
}


//input sayı mı değil mi kontrol

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
  
    return true;
}

//cart buy icon

function demo(){
    alert("Demo sürüm. Bu özellik demo sürümde etkin değildir!");
}



