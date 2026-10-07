/* NOVAORA storefront - vanilla JS. Demo only: no real payments or backend. */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LS=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},SV=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const $$$=n=>'$'+n.toFixed(2).replace(/\.00$/,''),slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const qs=new URLSearchParams(location.search),PAGE=document.body.dataset.page;
const CATS=['Fashion','Beauty','Electronics','Home & Living','Kitchen','Grocery','Footwear','Bags','Accessories','Kids','Sports','Watches'];
const DESC={Fashion:'Soft, durable fabric with a tailored modern fit.',Beauty:'Dermatologist-tested formula for everyday care.',Electronics:'Reliable performance with a long-lasting battery.',"Home & Living":'Designed to bring warmth and style to any room.',Kitchen:'Built for daily cooking and easy cleaning.',Grocery:'Fresh, responsibly sourced and carefully packed.',Footwear:'Cushioned comfort with a durable grip sole.',Bags:'Spacious, structured and made to last.',Accessories:'Finished with quality materials and clean detailing.',Kids:'Safe, durable and made for little hands.',Sports:'Engineered for training comfort and durability.',Watches:'Precision movement with a refined finish.'};
/* name|category|price|discount%|rating|reviews|badge|brand|colors|sizes */
const RAW=`Stylish flora frock Girls|Fashion|68|25|4.7|1284|BEST SELLER|Arden|Black,Ivory,Sage|S,M,L,XL
Classic Linen Shirt and jense|Fashion|54|0|4.5|642|NEW|Arden|White,Sand|S,M,L,XL
Burkha hand work design|Fashion|89|30|4.6|512|SALE|Arden|Indigo|S,M,L,XL
Hydrating Face Serum|Beauty|34|20|4.8|2210|BEST SELLER|Lume||
Premium Skincare Set|Beauty|96|35|4.7|874|LIMITED|Lume||
Body Care Collection|Beauty|58|0|4.4|390|NEW|Lume||
Wireless Headphones|Electronics|149|34|4.7|3120|BEST SELLER|Sonique|Black,Silver|
Smart Watch|Electronics|199|25|4.5|1890|TRENDING|Pulse|Black,Rose Gold|
Portable Speaker|Electronics|79|20|4.6|1450|SALE|Sonique|Black,Blue|
Drop String light|Home & Living|120|25|4.7|560|BEST SELLER|Hearth|White,Sand|
Modern Table Lamp|Home & Living|64|0|4.5|420|NEW|Hearth|Brass,Black|
Luxury Cushion Set|Home & Living|45|20|4.6|810|SALE|Hearth|Ivory,Charcoal|
Decorative Vase|Home & Living|38|0|4.3|260||Hearth|White|
Non Stick Cooker Set|Kitchen|140|35|4.7|1720|BEST SELLER|Cookwell|Black|
Electric Blender|Kitchen|85|25|4.5|990|TRENDING|Cookwell|Silver,Black|
Clear Glass Candy Jar Set|Kitchen|32|0|4.6|1320||Cookwell||
Fresh Organic Fruites|Grocery|18|0|4.8|2400|BEST SELLER|Origin||
Fresh Organic Vegetables|Grocery|18|0|4.8|2400|BEST SELLER|Origin||
Organic Honey|Grocery|14|10|4.7|870||Origin||
Beef|Grocery|14|10|4.7|870||Origin||
Running Shoes|Footwear|110|30|4.6|1530|TRENDING|Stride|White,Black|7,8,9,10,11,12
Slippers Bow|Footwear|95|20|4.5|1100|SALE|Stride|Grey,Navy|7,8,9,10,11,12
Flora Paris Sandals|Footwear|95|20|4.5|1100|SALE|Stride|Grey,Navy|7,8,9,10,11,12
Ballet Bow Flat shoes|Footwear|95|20|4.5|1100|Trading|Stride|Grey,Navy|7,8,9,10,11,12
Leather handbag|Bags|130|30|4.7|940|LIMITED|Maison|Tan,Black|
Classic tote bag|Bags|72|0|4.5|680|NEW|Maison|Olive,sunflower design|
Crossbody bag|Bags|72|0|4.5|680|NEW|Maison|Olive,sky blue|
Traveling Bags|Bags|72|0|4.5|680|NEW|Maison|Olive,sky blue|
Classic Sunglasses|Accessories|65|25|4.4|520|SALE|Vista|Black,Tortoise|
Anti Tarnish Earrings|Accessories|65|25|4.4|520|Limited|Vista|Black,Tortoise|
Pendant Necklace collection|Accessories|65|25|4.4|520|Limited|Vista|All design,Tortoise|
Casual Rings|Accessories|65|25|4.4|520|Limited|Vista|All design,Gold|
Gold Bracelets|Accessories|48|0|4.6|760||Maison|Gold,Design|
Kids Frock Dress|Kids|36|15|4.8|630||Tinker||
Kids T shirt |Kids|36|15|4.8|630||Tinker||
Kids Sneakers|Kids|42|0|4.5|210|NEW|Tinker|Yellow,Navy|4,6,8,10
Denim Jecket|Kids|42|0|4.5|210|NEW|Tinker|Yellow,Navy|4,6,8,10
Football|Sports|40|20|4.6|1210|BEST SELLER|Flexa|Teal,Charcoal|
Cricket Bat|Sports|40|20|4.6|1210|BEST SELLER|Flexa|Teal,Charcoal|
Sports Shoes|Sports|40|20|4.6|1210|BEST luxery|Flexa|Teal,Charcoal|
Yoga Mat|Sports|40|20|4.6|1210|BEST SELLER|Flexa|Teal,Charcoal|
Classic Analog Watch|Watches|220|30|4.7|390|LIMITED|Aurel|Steel,Gold|
Luxury Men Watch|Watches|130|0|4.5|520|NEW|Aurel|Brown,Black|;
Elegant Women Watch|Watches|130|0|4.5|520|NEW|Aurel|Brown,Black|;
Smart Watch|Watches|130|0|4.5|520|NEW|Aurel|Brown,Black|`;
/* Real product photography — remote Unsplash images, replacing the old illustrated placeholders. */
const PHOTO={
cats:{
"Fashion":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhTKLVo5DlekJDP9OQUndNBFmPBr9XuvyErcgo_7x0zPtZnxDS_rJ9e7we&s=10",
"Beauty":"https://miro.medium.com/v2/resize:fit:1400/1*1lM5GzDHc4-f_9cZGVkN7A.jpeg",
"Electronics":"https://i.pinimg.com/236x/28/42/b9/2842b9cc4bf8ce0fa98cb63cb4afb0f1.jpg",
"Home & Living":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrDpucO0TiydkgqH81aZinYYthH2LlJvHP64cb1DekXouw0Us3UG3knj3B&s=10",
"Kitchen":"https://i.pinimg.com/736x/90/da/0c/90da0c2b6bf38f50d00cec3c3c2b4476.jpg",
"Grocery":"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
"Footwear":"https://i.pinimg.com/736x/2e/28/ec/2e28ec13ab91de382f2c6abc00712c54.jpg",
"Bags":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmfb9f7d4dK8xbAobIx5uDP6TNqVMzTOY1Q8BN7tuF4qbRo80IZh10hs&s=10",
"Accessories":"https://i.pinimg.com/originals/ec/0e/75/ec0e752f2b89a4f0b9e31ff14bc8b4b5.jpg",
"Kids":"https://fabakids.pk/cdn/shop/files/AI_result_for_WhatsApp_Image_2026-09-21_at_5.38.20_PM_2.jpg?v=1789996780&width=1024",
"Sports":"https://i.pinimg.com/736x/f3/76/9a/f3769a05b0d72ee078a866730302de2b.jpg",
"Watches":"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85"
},
hero:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1800&q=85"
};
const PRODUCT_PHOTOS = {
  "fashion-1": "https://i.pinimg.com/736x/b3/e3/0a/b3e30a56db4d124527cf50e4c82fb026.jpg",
  "fashion-2": "https://i.pinimg.com/736x/e1/cd/3f/e1cd3f58ce85fcaed95af37a14eef926.jpg",
  "fashion-3": "https://i.pinimg.com/1200x/45/ec/c1/45ecc140acca46a42585f728541869f0.jpg"
};

const Beauty_PHOTOS = {
  "fashion-1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRujm64MHE_j2WryTD5rZqov8X6KjdNV5JdfNxtZ7A5azwwJEcJjFU7ljU&s=10",
  "fashion-2": "https://i.pinimg.com/736x/e1/cd/3f/e1cd3f58ce85fcaed95af37a14eef926.jpg",
  "fashion-3": "https://i.pinimg.com/1200x/45/ec/c1/45ecc140acca46a42585f728541869f0.jpg"
};


const P = RAW.split('\n').map((l, i) => {
  const [n, c, pr, d, r, rv, b, br, co, sz] = l.split('|');

  const s = slug(n);

  // Fashion products ko fixed image ID do
 let mainPhoto = PHOTO.cats[c];

if (c === "Fashion") {
  const fashionImages = [
    "https://i.pinimg.com/736x/b3/e3/0a/b3e30a56db4d124527cf50e4c82fb026.jpg",
    "https://i.pinimg.com/736x/e1/cd/3f/e1cd3f58ce85fcaed95af37a14eef926.jpg",
    "https://i.pinimg.com/1200x/45/ec/c1/45ecc140acca46a42585f728541869f0.jpg"
  ];


  mainPhoto = fashionImages[i] || fashionImages[0];
}

if (c === "Beauty") {

  const beautyImages = {
    "hydrating-face-serum":
      "https://www.cultbeauty.com/images?url=https://static.thcdn.com/productimg/original/13127423-1564882195886181.jpg&format=webp&auto=avif&width=1200&height=1200&fit=cover",

    "Pink Flora Perfume":
      "https://i.pinimg.com/736x/8b/d8/43/8bd843aa72e03b7ddc2238fea679f804.jpg",

    "body-care-collection":
      "https://i.pinimg.com/736x/4e/39/ff/4e39ff912c6c523da808b2498d37cfc1.jpg"
  };

  mainPhoto = beautyImages[s] || PHOTO.cats[c];
}

if (c === "Electronics") {

  const electronicsImages = {
    "wireless-headphones":
      "https://i.pinimg.com/236x/a8/ca/85/a8ca852a46210b36e9cc6ed4751a090a.jpg",

    "smart-watch":
      "https://i.pinimg.com/236x/c6/3f/ac/c63facd2a3a1a8b590b550d4600b5d40.jpg?nii=t",

    "portable-speaker":
      "https://www.tinyminymo.com/cdn/shop/files/Pinterest-Inspired-Wireless-Mini-Speaker-20.webp?v=1786996170&width=1946"
  };

  mainPhoto = electronicsImages[s] || PHOTO.cats[c];
}
if (c === "Home & Living") {

  const homeandlivingImages = {

     "drop-string-light":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8DHsrzGiuIq4aFrywgQkDr8iycH6M_ZONuylqdP6QRSMeqA4vnlUrVA5&s=10",

    "modern-table-lamp":
      "https://i.pinimg.com/originals/2b/cd/35/2bcd3578b6cd4d74f2012b17361c530e.jpg?nii=t",

    "luxury-cushion-set":
      "https://m.media-amazon.com/images/I/A1GkcfUlytL.jpg",

    "decorative-vase":
      "https://i.pinimg.com/236x/c2/fb/d7/c2fbd7eda817ab9ee5c8ea54eb055325.jpg"
  };

  mainPhoto = homeandlivingImages[s] || PHOTO.cats[c];
}

if (c === "Kitchen") {

  const kitchenImages = {

    "non-stick-cooker-set":
      "https://binzahidmarket.com/cdn/shop/files/prestige-granite-non-stick-cookware-green-set-9-piece-sets-311.png?v=1789937439&width=2048",

    "electric-blender":
      "https://i.pinimg.com/236x/d1/42/b1/d142b11eb1a12d356d2ed4d47b97ea5d.jpg",

    "clear-glass-candy-jar-set":
      "https://m.media-amazon.com/images/I/81dkRQrHp0L.jpg",

  };

  mainPhoto = kitchenImages[s] || PHOTO.cats[c];

}

if (c === "Grocery") {

  const groceryImages = {

    "fresh-organic-fruites":
      "https://images.stockcake.com/public/1/a/6/1a607fed-9d14-45f2-b126-ba1a2d6b3e31_large/fresh-fruit-display-stockcake.jpg",

    "fresh-organic-vegetables":
      "https://c8.alamy.com/comp/BM24H8/packed-food-and-vegetables-in-a-supermarket-BM24H8.jpg",

    "organic-honey":
      "https://i.pinimg.com/236x/a8/02/fa/a802fade4b7620758f20874eb9c9332a.jpg?nii=t",

    "beef":
      "https://media.istockphoto.com/id/2202805950/photo/meat-products-put-up-for-sale-in-a-commercial-refrigerator.jpg?s=612x612&w=0&k=20&c=dLajExs9ILMDwbZ8mbGoTWlvKpIndAjPFabENQBq_1Y="

  };

  mainPhoto = groceryImages[s] || PHOTO.cats[c];

}

if (c === "Footwear") {

  const footwearImages = {

    "running-shoes":
      "https://i.pinimg.com/236x/0c/cb/97/0ccb973418ae3796844411cb048c47a4.jpg",

    "slippers-bow":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuzyZAmubxEa5mQBTNYF_DGyIZQqAZq3dJWB0EtkGioV0LJh9gPtuiepE&s=10",

    "flora-paris-sandals":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrPh7kvlZYYkZ3wOQxBcoa-Cf8cpbcbvHuXe2YjAoH-oo2UsOatqd0Akxe&s=10",

    "ballet-bow-flat-shoes":
      "https://i.pinimg.com/736x/84/23/87/84238736c3bdf001dd53b8115c6557ba.jpg"

  };

  mainPhoto = footwearImages[s] || PHOTO.cats[c];

}

if (c === "Bags") {

  const bagsImages = {

    "leather-handbag":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVluy4rrwg4VZt0Q3eWcZ45VZ5mXubE2xdb4jelSlxy3X7gugMu9UzhoA&s=10",

    "classic-tote-bag":
      "https://i.pinimg.com/originals/6a/0c/d5/6a0cd525694c271337c095ddf2ca295f.png?nii=t",

    "crossbody-bag":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6DN9kyE1VT6p36UVjDGP401AVQUmHve6ccdIRK6HlFa7a0NGvC7m2FKMC&s=10",

    "traveling-bags":
      "https://i.pinimg.com/236x/a8/63/89/a86389b811e0a0fc541e924a67333910.jpg?nii=t"

  };

  mainPhoto = bagsImages[s] || PHOTO.cats[c];

}

if (c === "Accessories") {

  const accessoriesImages = {

    "classic-sunglasses":
      "https://i.pinimg.com/564x/fa/0f/29/fa0f29e18b00b3206046237cefdc84a0.jpg",

    "anti-tarnish-earrings":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvOxLkSCfJmadWxhXRqm0Lwypny3_nsJsLqdAA86Pl7XYtcK4aQXXQMi71&s=10",

     "pendant-necklace-collection":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30Op-sPyFk3bLV-IHdynO8Yzc8PkUXMMMUz2E4AbP1gILKGGes2U0lf8M&s=10",

    "casual-rings":
      "https://i.pinimg.com/474x/af/f2/62/aff2628e9d883006a28d76940a9e525b.jpg",

      "gold-bracelets":
      "https://i.pinimg.com/736x/59/d1/38/59d138ffda628f71e62fa91909864691.jpg",

  };

  mainPhoto = accessoriesImages[s] || PHOTO.cats[c];

}


if (c === "Kids") {

  const kidsImages = {

    "kids-frock-dress":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQnXOASkU68yunIutKVzgf2V92ppGdLwqVitWQI_Xio32U-W8I-u2Il34&s=10",

    "kids-t-shirt":
      "https://www.bareprintdesign.com.au/cdn/shop/files/greenitsmybirthdayonblackshirtcopy_eaac8add-cf06-40b2-aed9-8911999b0393.jpg?v=1754295728&width=1946",

    "kids-sneakers":
      "https://image.made-in-china.com/365f3j00EBVbyuzCHNpQ/2025-Children-School-Shoe-Light-Jogging-Sneakers-Kid-Casual-Flat-Skate-Shoes.webp",

    "denim-jecket":
      "https://i.pinimg.com/236x/9d/24/82/9d248250c4d67f83f8aa2656d8c198f7.jpg",

  };

  mainPhoto = kidsImages[s] || PHOTO.cats[c];

}


if (c === "Sports") {

  const sportsImages = {

    "football":
      "https://i.pinimg.com/736x/b4/54/e1/b454e11ce34a335dcc5cd2c5fb229a9c.jpg",

    "cricket-bat":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4pjbfqzirMtV1FUnrtUm1NKReytSSVcr1PDlvQDTUyfyAg_qvAZOvFf8&s=10",

    "sports-shoes":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3KG80AYkE96P01T3ZULhG_aAH6tasVQNTsq0O16CWMPGKbXg59gwUA60&s=10",

    "yoga-mat":
      "https://i.pinimg.com/474x/27/01/3d/27013dc5d62e4da55f80b6973c292777.jpg"

  };

  mainPhoto = sportsImages[s] || PHOTO.cats[c];

}

if (c === "Watches") {

  const watchesImages = {

    "classic-analog-watch":
      "https://i.pinimg.com/736x/0d/01/b7/0d01b70529d2ee8895969bd209571854.jpg",

    "luxury-men-watch":
      "https://i.pinimg.com/originals/b4/0e/fb/b40efb4feb40060e273a7f606f79b6ae.jpg",

    "elegant-women-watch":
      "https://i.pinimg.com/736x/9f/55/c7/9f55c7de520a13d2e82b7cb7b70af1c9.jpg",

    "smart-watch":
      "https://i.pinimg.com/236x/70/69/f8/7069f85cad8225a7cadb4b49f5718820.jpg"

  };

  mainPhoto = watchesImages[s] || PHOTO.cats[c];

}

  return {
    id: s,
    n,
    c,
    price: +pr,
    d: +d,
    r: +r,
    rv: +rv,
    b,
    br,
    col: co ? co.split(',') : [],
    sz: sz ? sz.split(',') : [],
    stock: i % 11 == 7 ? 0 : 15 + (i * 3) % 40,
    t: i,
    desc: `${n}. ${DESC[c]}`,

    imgs: [
      mainPhoto,
      mainPhoto,
      mainPhoto
    ]
  };
});
const sale=p=>+(p.price*(1-p.d/100)).toFixed(2),byId=id=>P.find(p=>p.id===id);
/* image fallback: branded SVG placeholder */
/* image fallback: if a photo file is missing, draw the category illustration (never a broken icon) */
const G={
Fashion:'<path d="M120 120 L170 95 Q200 125 230 95 L280 120 L325 185 L283 208 L270 188 L270 315 L130 315 L130 188 L117 208 L75 185 Z"/>',
Beauty:'<rect x="160" y="165" width="80" height="150" rx="16"/><rect x="182" y="120" width="36" height="48" rx="6"/><circle cx="200" cy="108" r="16"/>',
Electronics:'<path d="M110 230 Q110 110 200 110 Q290 110 290 230" fill="none" stroke-width="18"/><rect x="92" y="215" width="44" height="86" rx="18"/><rect x="264" y="215" width="44" height="86" rx="18"/>',
'Home & Living':'<path d="M140 140 L260 140 L290 220 L110 220 Z"/><rect x="194" y="220" width="12" height="80"/><ellipse cx="200" cy="312" rx="56" ry="12"/>',
Kitchen:'<rect x="105" y="170" width="190" height="115" rx="18"/><rect x="60" y="195" width="45" height="14" rx="7"/><rect x="295" y="195" width="45" height="14" rx="7"/><rect x="125" y="145" width="150" height="26" rx="10"/>',
Grocery:'<rect x="140" y="140" width="120" height="170" rx="26"/><rect x="150" y="105" width="100" height="38" rx="10"/><rect x="160" y="195" width="80" height="60" rx="8" fill="#fff" opacity=".45"/>',
Footwear:'<path d="M70 250 L70 190 Q150 195 175 150 L200 165 Q230 215 320 225 Q345 232 345 262 L345 280 L70 280 Z"/>',
Bags:'<rect x="105" y="170" width="190" height="140" rx="22"/><path d="M155 170 Q155 105 200 105 Q245 105 245 170" fill="none" stroke-width="16"/>',
Accessories:'<circle cx="140" cy="215" r="58"/><circle cx="260" cy="215" r="58"/><rect x="190" y="205" width="20" height="14"/><path d="M82 205 L55 170 M318 205 L345 170" stroke-width="12" fill="none"/>',
Kids:'<rect x="90" y="215" width="95" height="95" rx="10"/><rect x="195" y="215" width="95" height="95" rx="10"/><rect x="142" y="115" width="95" height="95" rx="10"/>',
Sports:'<rect x="70" y="170" width="38" height="110" rx="10"/><rect x="292" y="170" width="38" height="110" rx="10"/><rect x="108" y="212" width="184" height="26" rx="8"/><rect x="40" y="195" width="30" height="60" rx="8"/><rect x="330" y="195" width="30" height="60" rx="8"/>',
Watches:'<rect x="168" y="70" width="64" height="260" rx="22" opacity=".55"/><circle cx="200" cy="200" r="82"/><circle cx="200" cy="200" r="66" fill="#fff" opacity=".9"/><path d="M200 200 L200 150 M200 200 L238 212" stroke="#14130f" stroke-width="8" stroke-linecap="round" fill="none"/>'};
const PAL=[['#faf7f0','#e6d6b2','#b8893a'],['#f1f1ee','#d6d9de','#34322c'],['#eef3ef','#cfe0d3','#2f6b4a'],['#f6eee9','#e8cfc0','#9b5a3c'],['#eef0f6','#cfd6ea','#33427a'],['#f3efe8','#ddd1bd','#6b5a3a']];
const gsvg=(c,i,v,label)=>{const p=PAL[(i+v)%6],rot=[0,-6,6][v],sc=[1,.85,1.12][v];return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="${label.replace(/&/g,'and')}"><defs><radialGradient id="b" cx=".35" cy=".25" r="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></radialGradient></defs><rect width="400" height="400" fill="url(#b)"/><ellipse cx="200" cy="332" rx="${110*sc}" ry="14" fill="#14130f" opacity=".12"/><g transform="rotate(${rot} 200 200) translate(${200-200*sc} ${200-200*sc}) scale(${sc})" fill="${p[2]}" stroke="${p[2]}" stroke-width="0" stroke-linejoin="round">${G[c]}</g><text x="200" y="372" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="#34322c">${label.replace(/&/g,'and')}</text></svg>`};
window.fb=el=>{el.onerror=null;el.removeAttribute('src');el.classList.add('img-missing');};
const IM=(s,a,x='')=>`<img src="${s}" alt="${a}" loading="lazy" ${x} onerror="fb(this)">`;
/* state */
let cart=LS('nv_cart',[]),wish=LS('nv_wish',[]),coupon=LS('nv_coupon',null);
const saveCart=()=>{SV('nv_cart',cart);SV('nv_coupon',coupon);badge()},saveWish=()=>{SV('nv_wish',wish);$$('.hb').forEach(b=>b.classList.toggle('on',wish.includes(b.dataset.id)));$('#wc')&&($('#wc').textContent=wish.length)};
const badge=()=>{const n=cart.reduce((a,i)=>a+i.q,0);$$('.cc2').forEach(e=>e.textContent=n)};
function toast(m,bad){const t=document.createElement('div');t.className='toast'+(bad?' bad':'');t.textContent=m;$('#toasts').append(t);setTimeout(()=>t.remove(),2800)}
const COUPONS={NOVA10:{pct:10,label:'10% off'},SAVE20:{off:20,min:100,label:'$20 off orders over $100'}};
function totals(){const sub=cart.reduce((a,i)=>a+sale(byId(i.id))*i.q,0);let disc=0;if(coupon&&COUPONS[coupon]){const c=COUPONS[coupon];disc=c.pct?sub*c.pct/100:sub>=c.min?c.off:0}const ship=!cart.length||sub-disc>=150?0:10;return{sub,disc,ship,total:sub-disc+ship}}
function addCart(id,q=1,color,size){const p=byId(id);if(!p.stock)return toast('This product is out of stock.',1);color=color||p.col[0];size=size||p.sz[0];const l=cart.find(i=>i.id===id&&i.color===color&&i.size===size);l?l.q+=q:cart.push({id,q,color,size});saveCart();toast('Product added to your cart.')}
/* components */
const stars=r=>'★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r));
const card=p=>`<article class="pc"><a class="pi" href="product.html?id=${p.id}">${IM(p.imgs[0],p.n)}${p.b?`<span class="bd ${p.b.split(' ')[0]}">${p.b}</span>`:''}</a><button class="hb ${wish.includes(p.id)?'on':''}" data-act="wish" data-id="${p.id}" aria-label="Add ${p.n} to wishlist">♥</button><div class="pb"><h3><a href="product.html?id=${p.id}">${p.n}</a></h3><p>${DESC[p.c]}</p><div class="st">${stars(p.r)} <small>${p.r} (${p.rv.toLocaleString()})</small></div><div class="pr"><b>${$$$(sale(p))}</b>${p.d?`<s>${$$$(p.price)}</s><em>${p.d}% OFF</em>`:''}</div><button class="btn sm" data-act="add" data-id="${p.id}" ${p.stock?'':'disabled'}>${p.stock?'Add to Cart':'Out of Stock'}</button><button class="btn sm alt" data-act="qv" data-id="${p.id}">Quick View</button></div></article>`;
const grid=(l,c='')=>l.length?`<div class="pg ${c}">${l.map(card).join('')}</div>`:`<div class="empty"><h3>No products found</h3><p>Try a different search or clear your filters.</p><a class="btn" href="shop.html">Browse all products</a></div>`;
const catCard=c=>`<a class="cc" href="shop.html?cat=${encodeURIComponent(c)}">${IM(PHOTO.cats[c],c)}<b>${c}</b><span>${P.filter(p=>p.c===c).length} items · Explore</span></a>`;
const trust=()=>`<div class="banner">${[['🔒','Secure Payments','Your payment information is protected.'],['🚚','Fast Delivery','Reliable delivery to your doorstep.'],['↩','Easy Returns','Simple return process.'],['✔','Genuine Products','Quality products from trusted sellers.'],['💬','Customer Support','We\'re here when you need us.']].slice(0,4).map(t=>`<div><div class="n">${t[0]}</div><h3>${t[1]}</h3><p>${t[2]}</p></div>`).join('')}</div><div class="banner" style="margin-top:14px;grid-template-columns:1fr 3fr"><div><div class="n">💬</div><h3>Customer Support</h3><p>We're here when you need us.</p></div><div><h3>Fast &amp; Reliable Home Delivery</h3><p>Delivery available nationwide · Estimated delivery 2–5 business days · Live delivery tracking · Secure packaging · Easy returns within 14 days.</p></div></div>`;
const REV=[['Amelia R.','Wireless Headphones',5,'Sound quality is superb and the battery lasts all week. Arrived in two days.'],['Daniel K.','Premium Oversized Hoodie',5,'Heavyweight fabric and a perfect fit. Washed well with no shrinking.'],['Sara M.','Ceramic Dinner Set',4,'Beautiful glaze and securely packed. Everything arrived intact.'],['Omar H.','Smart Watch',5,'Accurate tracking, bright display and setup took five minutes.'],['Priya N.','Hydrating Face Serum',5,'My skin feels softer within a week. Already reordered.'],['Lucas B.','Non-Stick Cookware Set',4,'Even heating and easy to clean. Great value at the sale price.']];
const reviews=l=>`<div class="rv">${l.map(r=>`<div class="rc"><div class="u"><span class="av">${r[0][0]}</span><div><b>${r[0]}</b><div class="vp">✔ Verified Purchase</div></div></div><div class="st">${stars(r[2])}</div><p><b>${r[1]}</b></p><p>${r[3]}</p></div>`).join('')}</div>`;
/* countdown */
function countdown(){let end=LS('nv_end',0);if(end<Date.now()){end=Date.now()+(2*3600+14*60+36)*1000;SV('nv_end',end)}const tick=()=>{let s=Math.max(0,Math.floor((end-Date.now())/1000));if(!s){end=Date.now()+8.5e6;SV('nv_end',end)}const v=[s/3600|0,s/60%60|0,s%60].map(x=>String(x).padStart(2,'0'));$$('.cd').forEach(e=>e.innerHTML=v.map(x=>`<span>${x}</span>`).join(' : '))};tick();setInterval(tick,1000)}
/* header / footer */
const NAV=[['Home','index.html'],['Shop','shop.html'],['Categories','category.html'],['Deals','deals.html'],['New Arrivals','shop.html?sort=new'],['Best Sellers','shop.html?sort=rating'],['About','about.html'],['Contact','contact.html']];
function chrome(){const u=LS('nv_user',null);const nav=NAV.map(n=>`<a href="${n[1]}" class="${location.pathname.endsWith(n[1].split('?')[0])&&!n[1].includes('?')?'on':''}">${n[0]}</a>`).join('');
$('#hdr').innerHTML=`<div class="top"><div class="wrap"><span>🚚 Free delivery on orders over $150</span><span>🔒 Secure payments</span><span>↩ Easy returns</span><a href="contact.html">💬 Customer support</a></div></div><header><div class="wrap hm"><button class="btn alt sm burger" data-act="menu" aria-label="Open menu">☰</button><a class="logo" href="index.html" aria-label="NOVAORA home">NOVA<i>O</i>RA</a><form class="sf" action="shop.html" role="search"><input name="q" id="q" placeholder="Search products, brands and categories" autocomplete="off" aria-label="Search" value="${(qs.get('q')||'').replace(/"/g,'')}"><button aria-label="Search">🔍</button><div class="sug" hidden></div></form><div class="ic"><button class="msearch" data-act="msearch" aria-label="Search">🔍</button><a class="hide" href="${u?'account.html':'login.html'}">👤 ${u?u.name.split(' ')[0]:'Account'}</a><a class="hide" href="wishlist.html">♥ Wishlist (<span id="wc">${wish.length}</span>)</a><a href="cart.html" aria-label="Cart">🛒 Cart (<span class="cc2">0</span>)</a></div></div><nav class="main"><div class="wrap">${nav}</div></nav></header><div class="scrim"></div><aside class="drawer" aria-label="Menu"><div class="logo" style="padding:8px 12px">NOVA<i>O</i>RA</div>${nav}<a href="${u?'account.html':'login.html'}">My Account</a><a href="wishlist.html">Wishlist</a><a href="orders.html">My Orders</a></aside>`;
const col=(h,l)=>`<div><h4>${h}</h4>${l.map(x=>`<a href="${x[1]}">${x[0]}</a>`).join('')}</div>`;
$('#ftr').innerHTML=`<footer><div class="wrap"><div class="fg"><div><div class="logo" style="color:#fff">NOVA<i>O</i>RA</div><p style="margin-top:8px">Everything You Love. One Place.</p><div class="pay"><span>VISA</span><span>Mastercard</span><span>Wallet</span><span>COD</span></div></div>${col('Shop',[['All Products','shop.html'],['New Arrivals','shop.html?sort=new'],['Best Sellers','shop.html?sort=rating'],['Deals','deals.html'],['Categories','category.html']])}${col('Customer Care',[['Contact Us','contact.html'],['Shipping','about.html#shipping'],['Returns','about.html#returns'],['FAQs','contact.html#faq'],['Order Tracking','orders.html']])}${col('Company',[['About Us','about.html'],['Careers','contact.html'],['Privacy Policy','about.html#privacy'],['Terms &amp; Conditions','about.html#terms']])}${col('Follow Us',[['Instagram','https://instagram.com'],['Facebook','https://facebook.com'],['YouTube','https://youtube.com'],['TikTok','https://tiktok.com']])}</div><div class="copy">© 2026 NOVAORA. All rights reserved.</div></div></footer>`;
const sf=$('.sf'),inp=$('#q'),sg=$('.sug');inp.addEventListener('input',()=>{const v=inp.value.trim().toLowerCase();if(v.length<2)return sg.hidden=true;const r=[...P.filter(p=>p.n.toLowerCase().includes(v)).slice(0,5).map(p=>[p.n,'Product',`product.html?id=${p.id}`]),...CATS.filter(c=>c.toLowerCase().includes(v)).slice(0,2).map(c=>[c,'Category',`shop.html?cat=${encodeURIComponent(c)}`])];sg.innerHTML=r.map(x=>`<a href="${x[2]}">${x[0]}<small>${x[1]}</small></a>`).join('')||'<a href="#">No suggestions</a>';sg.hidden=false});
document.addEventListener('click',e=>{if(!e.target.closest('.sf'))sg.hidden=true});badge()}
/* global actions */
const drawer=o=>{$('.drawer').classList.toggle('open',o);$('.scrim').classList.toggle('on',o)};
function quick(id){const p=byId(id),m=document.createElement('div');m.className='modal';m.innerHTML=`<div role="dialog" aria-modal="true" aria-label="${p.n}"><button class="x" aria-label="Close">×</button><div class="zm" style="cursor:default">${IM(p.imgs[0],p.n)}</div><div><span class="tag">${p.c}</span><h2 style="margin:8px 0">${p.n}</h2><div class="st">${stars(p.r)} <small>${p.r} (${p.rv})</small></div><div class="pr" style="margin:8px 0"><b>${$$$(sale(p))}</b>${p.d?`<s>${$$$(p.price)}</s><em>${p.d}% OFF</em>`:''}</div><p>${p.desc}</p><div class="row"><button class="btn" data-act="add" data-id="${p.id}">Add to Cart</button><a class="btn alt" href="product.html?id=${p.id}">Full details</a></div></div></div>`;m.addEventListener('click',e=>{if(e.target===m||e.target.className==='x')m.remove()});document.body.append(m)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act,id=b.dataset.id;
if(a==='menu')drawer(1);if(a==='msearch'){$('.sf').classList.toggle('open');$('#q').focus()}
if(a==='add')addCart(id);if(a==='qv')quick(id);
if(a==='wish'){const i=wish.indexOf(id);i<0?(wish.push(id),toast('Added to your wishlist.')):(wish.splice(i,1),toast('Removed from your wishlist.'));saveWish();if(PAGE==='wishlist')R.wishlist()}
if(a==='mv'){addCart(id);wish=wish.filter(x=>x!==id);saveWish();R.wishlist()}
if(['inc','dec','rm'].includes(a)){const l=cart[+b.dataset.i];a==='inc'?l.q++:a==='dec'?l.q=Math.max(1,l.q-1):cart.splice(+b.dataset.i,1);saveCart();R.cart()}});
document.addEventListener('click',e=>{if(e.target.matches('.scrim')){drawer(0);$('.fl')?.classList.remove('open');e.target.classList.remove('on')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){drawer(0);$('.modal')?.remove()}});
/* validation helper */
function validate(form,rules){let ok=true;$$('.in',form).forEach(i=>{const r=rules[i.name],er=i.parentElement.querySelector('.err');if(!r||!er)return;const m=r(i.value.trim(),form);er.textContent=m||'';i.classList.toggle('bad',!!m);if(m)ok=false});return ok}
const req=m=>v=>v?'':m,email=v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)?'':'Enter a valid email address.',phone=v=>/^[+\d][\d\s-]{6,}$/.test(v)?'':'Enter a valid phone number.',pass=v=>v.length>=8?'':'Password must be at least 8 characters.';
const field=(l,n,t='text',x='',w='')=>`<label class="f ${w}">${l}<input class="in" name="${n}" type="${t}" ${x}><span class="err"></span></label>`;
/* page renderers */
const R={};const A=$('#app');
R.index=()=>{A.innerHTML=`<div class="hero"><div class="wrap"><div><h1>Discover Products You'll Love</h1><p>Curated essentials, everyday favorites and premium finds — delivered to your door.</p><a class="btn gold" href="shop.html">Shop Now</a><a class="btn alt" href="deals.html">Explore Deals</a></div><div class="im">${IM(PHOTO.hero,'Curated lifestyle collection')}</div></div></div>
<div class="wrap perks"><div>🚚 Free delivery over $150</div><div>🔒 Secure checkout</div><div>↩ 14-day returns</div><div>📦 Secure packaging</div></div>
<div class="wrap"><section><div class="sh"><h2>Shop by Category</h2><a class="btn alt sm" href="category.html">All categories</a></div><div class="cg">${CATS.map(catCard).join('')}</div></section>
<section><div class="flash"><div class="sh"><h2>Flash Deals</h2><div class="cd"></div></div>${grid(P.filter(p=>p.d>=30).slice(0,4))}</div></section>
<section><div class="sh"><h2>Trending Products</h2><a class="btn alt sm" href="shop.html">View all</a></div>${grid(P.filter(p=>p.b==='TRENDING'||p.b==='BEST SELLER').slice(0,8))}</section>
<section><div class="sh"><h2>Why Shop With NOVAORA?</h2></div>${trust()}</section>
<section><div class="sh"><h2>What Customers Say</h2></div>${reviews(REV)}</section>
<section>${newsletter()}</section></div>`;countdown()};
const newsletter=()=>`<div class="nl"><h2>Stay in the Loop</h2><p>Get exclusive deals, new arrivals and special offers.</p><form id="nl" novalidate><input type="email" name="e" placeholder="Enter your email" aria-label="Email"><button class="btn gold">Subscribe</button></form></div>`;
document.addEventListener('submit',e=>{if(e.target.id==='nl'){e.preventDefault();const v=e.target.e.value.trim();email(v)?toast('Enter a valid email address.',1):(toast('Thanks for subscribing to NOVAORA!'),e.target.reset())}});
R.category=()=>{A.innerHTML=`<div class="wrap"><section><div class="sh"><h2>All Categories</h2></div><div class="cg">${CATS.map(catCard).join('')}</div></section></div>`};
/* shop with live filters */
R.shop=(deals)=>{const F={q:(qs.get('q')||'').toLowerCase(),cat:qs.get('cat')||'',max:300,rate:0,disc:deals?10:0,stock:false,sort:qs.get('sort')||'rel',pg:1,col:'',size:'',brand:''},PER=9;
const brands=[...new Set(P.map(p=>p.br))].sort(),cols=[...new Set(P.flatMap(p=>p.col))].sort(),sizes=[...new Set(P.flatMap(p=>p.sz))];
A.innerHTML=`<div class="wrap"><div class="crumb"><a href="index.html">Home</a> / Shop</div><div class="shop"><aside class="fl" id="fl"><div class="sh" style="margin:0 0 8px"><h3>Filters</h3><button class="btn sm alt" id="fx">Done</button></div><h4>Categories</h4><label><input type="radio" name="c" value="" checked> All</label>${CATS.map(c=>`<label><input type="radio" name="c" value="${c}"> ${c}</label>`).join('')}<h4>Max Price: <span id="pv">$300</span></h4><input type="range" id="pr" min="10" max="300" value="300" step="5"><h4>Brand</h4><select id="br"><option value="">All brands</option>${brands.map(b=>`<option>${b}</option>`).join('')}</select><h4>Rating</h4><select id="rt"><option value="0">Any rating</option><option value="4">4★ &amp; up</option><option value="4.5">4.5★ &amp; up</option></select><h4>Availability</h4><label><input type="checkbox" id="av"> In stock only</label><h4>Discount</h4><select id="dc"><option value="0">Any</option><option value="10">10% or more</option><option value="25">25% or more</option><option value="30">30% or more</option></select><h4>Color</h4><select id="co"><option value="">Any color</option>${cols.map(b=>`<option>${b}</option>`).join('')}</select><h4>Size</h4><select id="sz"><option value="">Any size</option>${sizes.map(b=>`<option>${b}</option>`).join('')}</select><button class="btn alt full" id="clr" style="margin-top:16px">Clear filters</button></aside><div><div class="tb"><div><b id="cnt"></b></div><div><button class="btn alt sm fbtn" id="fo">Filter &amp; Sort</button> <select id="so" aria-label="Sort by"><option value="rel">Relevance</option><option value="lh">Price: Low to High</option><option value="hl">Price: High to Low</option><option value="rating">Rating</option><option value="new">Newest</option></select></div></div><div id="gr"></div><div class="pgn" id="pn"></div></div></div></div>`;
$(`#fl input[name=c][value="${F.cat}"]`)&&($(`#fl input[name=c][value="${F.cat}"]`).checked=true);$('#so').value=F.sort;$('#dc').value=F.disc;
const draw=()=>{let l=P.filter(p=>(!F.q||(p.n+p.c+p.br).toLowerCase().includes(F.q))&&(!F.cat||p.c===F.cat)&&sale(p)<=F.max&&p.r>=F.rate&&p.d>=F.disc&&(!F.stock||p.stock)&&(!F.col||p.col.includes(F.col))&&(!F.size||p.sz.includes(F.size))&&(!F.brand||p.br===F.brand));
const s={lh:(a,b)=>sale(a)-sale(b),hl:(a,b)=>sale(b)-sale(a),rating:(a,b)=>b.r-a.r||b.rv-a.rv,new:(a,b)=>b.t-a.t,rel:(a,b)=>b.rv-a.rv}[F.sort];l.sort(s);
const pages=Math.max(1,Math.ceil(l.length/PER));F.pg=Math.min(F.pg,pages);
$('#cnt').textContent=F.q?`${l.length} products found for "${qs.get('q')}"`:`${l.length} products${F.cat?' in '+F.cat:''}`;
$('#gr').innerHTML=grid(l.slice((F.pg-1)*PER,F.pg*PER),'');$('#pn').innerHTML=pages>1?Array.from({length:pages},(_,i)=>`<button class="${i+1===F.pg?'on':''}" data-p="${i+1}">${i+1}</button>`).join(''):''};
$('#pn').addEventListener('click',e=>{if(e.target.dataset.p){F.pg=+e.target.dataset.p;draw();scrollTo({top:0,behavior:'smooth'})}});
const bind=(id,k,fn=v=>v,ev='change')=>$(id).addEventListener(ev,e=>{F[k]=fn(e.target.type==='checkbox'?e.target.checked:e.target.value);F.pg=1;draw()});
$$('#fl input[name=c]').forEach(r=>r.addEventListener('change',e=>{F.cat=e.target.value;F.pg=1;draw()}));
bind('#pr','max',Number,'input');$('#pr').addEventListener('input',e=>$('#pv').textContent='$'+e.target.value);bind('#br','brand');bind('#rt','rate',Number);bind('#av','stock');bind('#dc','disc',Number);bind('#co','col');bind('#sz','size');bind('#so','sort');
$('#clr').onclick=()=>location.href=deals?'deals.html':'shop.html';
const dr=o=>{$('#fl').classList.toggle('open',o);$('.scrim').classList.toggle('on',o)};$('#fo').onclick=()=>dr(1);$('#fx').onclick=()=>dr(0);draw()};
R.deals=()=>{A.innerHTML=`<div class="wrap"><div class="crumb"><a href="index.html">Home</a> / Deals &amp; Offers</div><section style="padding-top:0"><div class="flash"><div class="sh"><h2>Flash Deals</h2><div><small>Ends in</small><div class="cd"></div></div></div>${grid(P.filter(p=>p.d>=30).slice(0,4))}</div></section><section><div class="sh"><h2>Today's Deals</h2></div>${grid(P.filter(p=>p.d>=20&&p.d<30).slice(0,4))}</section><section><div class="sh"><h2>Limited-Time Offers</h2><div class="cd"></div></div>${grid(P.filter(p=>p.b==='LIMITED'||p.b==='SALE').slice(0,4))}</section><section><div class="sh"><h2>Bundle Offers</h2></div><div class="rv">${[['Work From Home Bundle',['wireless-keyboard','modern-table-lamp','wireless-headphones']],['Kitchen Starter Bundle',['non-stick-cookware-set','electric-blender','storage-container-set']],['Self-Care Bundle',['hydrating-face-serum','premium-skincare-set','body-care-collection']]].map(([n,ids])=>{const ps=ids.map(byId),t=ps.reduce((a,p)=>a+sale(p),0),b=t*.9;return`<div class="rc"><h3>${n}</h3><p>${ps.map(p=>p.n).join(' + ')}</p><div class="pr" style="margin:10px 0"><b>${$$$(b)}</b><s>${$$$(t)}</s><em>Extra 10% OFF</em></div><button class="btn full" data-bundle="${ids}">Add Bundle to Cart</button></div>`}).join('')}</div></section><section><div class="sh"><h2>All Discounted Products</h2></div>${grid(P.filter(p=>p.d).sort((a,b)=>b.d-a.d).slice(0,12))}</section></div>`;countdown();$$('[data-bundle]').forEach(b=>b.onclick=()=>{b.dataset.bundle.split(',').forEach(i=>addCart(i))})};
R.product=()=>{const p=byId(qs.get('id'))||P[0];let img=0,color=p.col[0],size=p.sz[0],q=1;document.title=p.n+' | NOVAORA';
A.innerHTML=`<div class="wrap"><div class="crumb"><a href="index.html">Home</a> / <a href="shop.html?cat=${encodeURIComponent(p.c)}">${p.c}</a> / ${p.n}</div><div class="pd"><div><div class="zm" id="zm">${IM(p.imgs[0],p.n)}</div><div class="th">${p.imgs.map((s,i)=>`<button class="${i?'':'on'}" data-i="${i}" aria-label="Image ${i+1}">${IM(s,p.n)}</button>`).join('')}</div></div><div><span class="tag">${p.br}</span><h1>${p.n}</h1><div class="st">${stars(p.r)} <small>${p.r} · ${p.rv.toLocaleString()} reviews</small></div><div class="pr" style="margin:10px 0"><b>${$$$(sale(p))}</b>${p.d?`<s>${$$$(p.price)}</s><em>${p.d}% OFF</em>`:''}</div><span class="tag ${p.stock?'in':'out'}">${p.stock?'In stock ('+p.stock+' left)':'Out of stock'}</span><p style="margin:12px 0">${p.desc}</p>${p.col.length?`<b>Color: <span id="cl">${color}</span></b><div class="opt" id="oc">${p.col.map((c,i)=>`<button class="${i?'':'on'}">${c}</button>`).join('')}</div>`:''}${p.sz.length?`<b>Size</b><div class="opt" id="os">${p.sz.map((c,i)=>`<button class="${i?'':'on'}">${c}</button>`).join('')}</div>`:''}<div class="row"><div class="q"><button id="m" aria-label="Decrease">−</button><span id="qn">1</span><button id="pl" aria-label="Increase">+</button></div><button class="btn" id="ac" ${p.stock?'':'disabled'}>Add to Cart</button><button class="btn gold" id="bn" ${p.stock?'':'disabled'}>Buy Now</button><button class="btn alt hb2" data-act="wish" data-id="${p.id}">♥ Wishlist</button></div><div class="box"><b>🚚 Fast &amp; Reliable Home Delivery</b><ul><li>Delivery available in your area</li><li>Estimated delivery: 2–5 business days</li><li>Live delivery tracking and secure packaging</li><li>Free delivery on orders over $150</li></ul></div></div></div>
<div class="tabs"><h3>Description</h3><p>${p.desc} Every NOVAORA product is quality-checked before dispatch and covered by our genuine-product guarantee.</p><h3>Specifications</h3><table><tr><th>Brand</th><td>${p.br}</td></tr><tr><th>Category</th><td>${p.c}</td></tr>${p.col.length?`<tr><th>Colors</th><td>${p.col.join(', ')}</td></tr>`:''}${p.sz.length?`<tr><th>Sizes</th><td>${p.sz.join(', ')}</td></tr>`:''}<tr><th>Warranty</th><td>12 months</td></tr></table><h3>Features</h3><ul style="margin-left:20px"><li>Premium materials and careful finishing</li><li>Backed by the NOVAORA genuine-product guarantee</li><li>Packed securely for safe delivery</li></ul><h3>Shipping Information</h3><p>Orders ship within 24 hours. Standard delivery takes 2–5 business days, with tracking sent by email.</p><h3>Return Policy</h3><p>Return unused items in original packaging within 14 days for a full refund.</p><h3>Customer Reviews</h3>${reviews(REV.slice(0,3).map(r=>[r[0],p.n,r[2],r[3]]))}</div><section><div class="sh"><h2>Related Products</h2></div>${grid(P.filter(x=>x.c===p.c&&x.id!==p.id).concat(P.filter(x=>x.c!==p.c)).slice(0,4))}</section></div>`;
const zm=$('#zm');zm.onmousemove=e=>{const r=zm.getBoundingClientRect(),i=$('img',zm);i.style.transformOrigin=`${(e.clientX-r.left)/r.width*100}% ${(e.clientY-r.top)/r.height*100}%`;i.style.transform='scale(2)'};zm.onmouseleave=()=>$('img',zm).style.transform='';
$$('.th button').forEach(b=>b.onclick=()=>{$('img',zm).src=p.imgs[b.dataset.i];$('img',zm).onerror=function(){fb(this)};$$('.th button').forEach(x=>x.classList.remove('on'));b.classList.add('on')});
const pick=(id,fn)=>$(id)&&$(id).addEventListener('click',e=>{if(e.target.tagName!=='BUTTON')return;$$('button',$(id)).forEach(x=>x.classList.remove('on'));e.target.classList.add('on');fn(e.target.textContent)});pick('#oc',v=>{color=v;$('#cl').textContent=v});pick('#os',v=>size=v);
$('#m').onclick=()=>$('#qn').textContent=q=Math.max(1,q-1);$('#pl').onclick=()=>$('#qn').textContent=q=Math.min(p.stock||1,q+1);$('#ac').onclick=()=>addCart(p.id,q,color,size);$('#bn').onclick=()=>{addCart(p.id,q,color,size);location.href='checkout.html'}};
R.cart=()=>{const t=totals();A.innerHTML=`<div class="wrap"><div class="sh" style="margin-top:24px"><h2>Shopping Cart</h2></div>${cart.length?`<div class="two"><div>${cart.map((l,i)=>{const p=byId(l.id);return`<div class="ci">${IM(p.imgs[0],p.n)}<div><a href="product.html?id=${p.id}"><b>${p.n}</b></a><div style="color:var(--mute);font-size:13px">${[l.color,l.size].filter(Boolean).join(' · ')}</div><div class="pr"><b>${$$$(sale(p))}</b>${p.d?`<s>${$$$(p.price)}</s>`:''}</div><div class="q" style="margin-top:6px"><button data-act="dec" data-i="${i}" aria-label="Decrease quantity">−</button><span>${l.q}</span><button data-act="inc" data-i="${i}" aria-label="Increase quantity">+</button></div></div><div style="text-align:right"><b>${$$$(sale(p)*l.q)}</b><br><button class="lk" data-act="rm" data-i="${i}">Remove</button></div></div>`}).join('')}</div><div class="sum"><h3>Order Summary</h3>${sumRows(t)}<form id="cp" style="display:flex;gap:6px;margin:12px 0"><input class="in" name="c" placeholder="Coupon (try NOVA10)" value="${coupon||''}" aria-label="Coupon code"><button class="btn sm">Apply</button></form><a class="btn full gold" href="checkout.html">Proceed to Checkout</a><p style="font-size:12.5px;color:var(--mute);margin-top:10px">🚚 Estimated delivery 2–5 business days.</p></div></div>`:`<div class="empty"><h3>Your cart is empty</h3><p>Add something you love to get started.</p><a class="btn" href="shop.html">Start shopping</a></div>`}</div>`;
$('#cp')&&($('#cp').onsubmit=e=>{e.preventDefault();const c=e.target.c.value.trim().toUpperCase();if(!COUPONS[c])return toast('That coupon code isn\'t valid.',1);if(COUPONS[c].min&&totals().sub<COUPONS[c].min)return toast('Add more items — '+COUPONS[c].label+'.',1);coupon=c;saveCart();toast('Coupon applied: '+COUPONS[c].label+'.');R.cart()})};
const sumRows=t=>`<div><span>Subtotal</span><span>${$$$(t.sub)}</span></div><div><span>Delivery</span><span>${t.ship?$$$(t.ship):'Free'}</span></div><div><span>Discount</span><span>-${$$$(t.disc)}</span></div><div class="t"><span>Total</span><span>${$$$(t.total)}</span></div>`;
R.wishlist=()=>{const l=wish.map(byId).filter(Boolean);A.innerHTML=`<div class="wrap"><div class="sh" style="margin-top:24px"><h2>My Wishlist (${l.length})</h2></div>${l.length?`<div class="pg">${l.map(p=>card(p).replace('<button class="btn sm alt" data-act="qv"',`<button class="btn sm alt" data-act="mv" data-id="${p.id}">Move to Cart</button><button class="lk" data-act="wish" data-id="${p.id}">Remove</button><button hidden data-act="qv"`)).join('')}</div>`:`<div class="empty"><h3>Your wishlist is empty</h3><p>Tap the heart on any product to save it here.</p><a class="btn" href="shop.html">Discover products</a></div>`}</div>`};
R.checkout=()=>{if(!cart.length){A.innerHTML=`<div class="wrap"><div class="empty"><h3>Your cart is empty</h3><a class="btn" href="shop.html">Start shopping</a></div></div>`;return}const t=totals(),u=LS('nv_user',{});
A.innerHTML=`<div class="wrap"><div class="sh" style="margin-top:24px"><h2>Checkout</h2></div><form id="co" class="two" novalidate><div><div class="card"><h3>Delivery Information</h3><div class="fg2">${field('Full Name','name','text',`autocomplete="name" value="${u.name||''}"`)}${field('Phone Number','phone','tel','autocomplete="tel"')}${field('Email','email','email',`autocomplete="email" value="${u.email||''}"`,'w')}${field('Address','address','text','','w')}${field('Apartment / House','apt')}${field('City','city')}${field('Area','area')}${field('Postal Code','zip')}</div></div><div class="card"><h3>Delivery Method</h3><label class="pm"><input type="radio" checked disabled> <div><b>Home Delivery</b><br><small>Estimated delivery: 2–5 business days · Tracking included</small></div></label></div><div class="card"><h3>Payment Method</h3><p style="font-size:12.5px;color:var(--mute);margin-bottom:10px">Demo checkout — no real payment is processed.</p><label class="pm"><input type="radio" name="pay" value="Cash on Delivery" checked><div><b>Cash on Delivery</b><br><small>Pay when your order arrives.</small></div></label><label class="pm"><input type="radio" name="pay" value="Card Payment"><div><b>Card Payment</b></div></label><div class="pmx fg2" id="cardf" hidden>${field('Card Number','cn','text','inputmode="numeric" placeholder="1234 5678 9012 3456"','w')}${field('Expiry (MM/YY)','ce')}${field('CVV','cv','password','inputmode="numeric" maxlength="4"')}${field('Cardholder Name','ch','text','','w')}</div><label class="pm"><input type="radio" name="pay" value="Digital Wallet"><div><b>Digital Wallet</b><br><small>Pay with your saved wallet (demo).</small></div></label></div></div><div class="sum"><h3>Order Summary</h3>${cart.map(l=>{const p=byId(l.id);return`<div style="gap:10px;align-items:center"><span style="display:flex;gap:10px;align-items:center">${IM(p.imgs[0],p.n,'style="width:46px;height:46px;border-radius:8px;object-fit:cover"')}<span>${p.n}<br><small>Qty ${l.q}</small></span></span><span>${$$$(sale(p)*l.q)}</span></div>`}).join('')}<hr style="border:0;border-top:1px solid var(--line);margin:8px 0">${sumRows(t)}<button class="btn gold full" style="margin-top:14px">Place Order</button><p style="font-size:12.5px;color:var(--mute);margin-top:10px">🚚 Fast &amp; reliable home delivery, secure packaging, easy returns.</p></div></form></div>`;
$$('input[name=pay]').forEach(r=>r.onchange=()=>$('#cardf').hidden=$('input[name=pay]:checked').value!=='Card Payment');
$('#co').onsubmit=e=>{e.preventDefault();const f=e.target,card=f.pay.value==='Card Payment';const rules={name:req('Enter your full name.'),phone,email,address:req('Enter your address.'),city:req('Enter your city.'),area:req('Enter your area.'),zip:v=>/^\d{4,6}$/.test(v)?'':'Enter a valid postal code.'};if(card)Object.assign(rules,{cn:v=>/^\d{13,19}$/.test(v.replace(/\s/g,''))?'':'Enter a valid card number.',ce:v=>/^(0[1-9]|1[0-2])\/\d{2}$/.test(v)?'':'Use MM/YY.',cv:v=>/^\d{3,4}$/.test(v)?'':'Enter 3 or 4 digits.',ch:req('Enter the cardholder name.')});
if(!validate(f,rules)){toast('Please fix the highlighted fields.',1);return $('.in.bad')?.focus()}
const o={no:'NV-'+Date.now().toString().slice(-8),date:new Date().toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}),items:cart.map(l=>({n:byId(l.id).n,q:l.q})),total:totals().total,pay:f.pay.value,addr:[f.address.value,f.apt.value,f.area.value,f.city.value,f.zip.value].filter(Boolean).join(', '),status:'Processing'};SV('nv_last',o);SV('nv_orders',[o,...LS('nv_orders',[])]);cart=[];coupon=null;saveCart();location.href='order-success.html'}};
R['order-success']=()=>{const o=LS('nv_last',null);if(!o){A.innerHTML=`<div class="wrap"><div class="empty"><h3>No recent order</h3><a class="btn" href="shop.html">Continue shopping</a></div></div>`;return}A.innerHTML=`<div class="wrap"><div class="ok"><div class="ck">✓</div><h1>Order Confirmed!</h1><p>Thank you for shopping with NOVAORA.</p><dl><dt>Order number</dt><dd><b>${o.no}</b></dd><dt>Delivery address</dt><dd>${o.addr}</dd><dt>Payment method</dt><dd>${o.pay}</dd><dt>Estimated delivery</dt><dd>2–5 business days</dd><dt>Order total</dt><dd><b>${$$$(o.total)}</b></dd></dl><a class="btn" href="orders.html">Track my orders</a> <a class="btn alt" href="shop.html">Continue shopping</a></div></div>`};
const DEMO=[{no:'NV-20481937',date:'Sep 12, 2026',items:[{n:'Wireless Headphones',q:1}],total:98.34,status:'Delivered'},{no:'NV-20473310',date:'Sep 28, 2026',items:[{n:'Premium Oversized Hoodie',q:2}],total:101,status:'Out for Delivery'},{no:'NV-20470022',date:'Oct 1, 2026',items:[{n:'Hydrating Face Serum',q:1},{n:'Body Care Collection',q:1}],total:84.2,status:'Shipped'}];
const ordersTable=()=>`<div class="ob"><table><tr><th>Order</th><th>Date</th><th>Products</th><th>Total</th><th>Status</th></tr>${[...LS('nv_orders',[]),...DEMO].map(o=>`<tr><td><b>${o.no}</b></td><td>${o.date}</td><td>${o.items.map(i=>i.n+' ×'+i.q).join(', ')}</td><td>${$$$(o.total)}</td><td><span class="tag ${o.status==='Delivered'?'in':''}">${o.status}</span></td></tr>`).join('')}</table></div>`;
R.orders=()=>{A.innerHTML=`<div class="wrap"><div class="sh" style="margin-top:24px"><h2>My Orders</h2></div>${ordersTable()}</div>`};
R.account=()=>{const u=LS('nv_user',null);if(!u){location.href='login.html';return}const S={'My Profile':()=>`<form id="pf" novalidate class="fg2">${field('Full Name','name','text',`value="${u.name}"`)}${field('Email','email','email',`value="${u.email}"`)}<div class="w"><button class="btn">Save changes</button></div></form>`,'My Orders':ordersTable,'Wishlist':()=>`<p>You have ${wish.length} saved item(s).</p><a class="btn" href="wishlist.html">Open wishlist</a>`,'Saved Addresses':()=>`<div class="card"><b>Home</b><p>${u.name}, 24 Garden Street, Apt 5B</p></div><p style="color:var(--mute)">New addresses are saved during checkout.</p>`,'Payment Methods':()=>`<div class="card"><b>Cash on Delivery</b><p>Default payment method</p></div>`,'Notifications':()=>['Order updates','Deals and offers','New arrivals'].map(x=>`<label class="pm"><input type="checkbox" checked> ${x}</label>`).join(''),'Account Settings':()=>`<button class="btn alt" id="clrd">Clear saved cart and wishlist</button>`,'Logout':()=>''};
A.innerHTML=`<div class="wrap"><div class="sh" style="margin-top:24px"><h2>Hello, ${u.name.split(' ')[0]}</h2></div><div class="dash"><nav id="dn">${Object.keys(S).map((k,i)=>`<button class="${i?'':'on'}">${k}</button>`).join('')}</nav><div id="dc2" class="card"></div></div></div>`;
const show=k=>{if(k==='Logout'){localStorage.removeItem('nv_user');toast('You have been logged out.');setTimeout(()=>location.href='index.html',700);return}$('#dc2').innerHTML=`<h3>${k}</h3>`+S[k]();$('#pf')&&($('#pf').onsubmit=e=>{e.preventDefault();if(validate(e.target,{name:req('Enter your name.'),email})){SV('nv_user',{name:e.target.name.value,email:e.target.email.value});toast('Profile updated.')}});$('#clrd')&&($('#clrd').onclick=()=>{cart=[];wish=[];saveCart();saveWish();toast('Saved data cleared.')})};
$('#dn').onclick=e=>{if(e.target.tagName==='BUTTON'){$$('#dn button').forEach(b=>b.classList.remove('on'));e.target.classList.add('on');show(e.target.textContent)}};show('My Profile')};
const pwf=(l,n)=>`<label class="f">${l}<span class="pw"><input class="in" name="${n}" type="password" autocomplete="current-password"><button type="button" class="tg">Show</button></span><span class="err"></span></label>`;
const tg=()=>$$('.tg').forEach(b=>b.onclick=()=>{const i=b.previousElementSibling;i.type=i.type==='password'?'text':'password';b.textContent=i.type==='password'?'Show':'Hide'});
R.login=()=>{A.innerHTML=`<div class="wrap"><div class="auth card"><h2>Welcome back</h2><p style="color:var(--mute);margin:4px 0 14px">Log in to your NOVAORA account.</p><form id="lf" novalidate style="display:grid;gap:12px">${field('Email','email','email','autocomplete="email"')}${pwf('Password','password')}<div style="display:flex;justify-content:space-between"><label><input type="checkbox" name="rm"> Remember me</label><a href="#" id="fp" style="color:var(--gold);font-weight:600">Forgot password?</a></div><button class="btn full">Login</button></form><p style="margin-top:14px">New here? <a href="signup.html" style="color:var(--gold);font-weight:700">Create an account</a></p></div></div>`;tg();$('#fp').onclick=e=>{e.preventDefault();const v=$('input[name=email]').value.trim();email(v)?toast('Enter your email above first.',1):toast('Password reset link sent to '+v+' (demo).')};
$('#lf').onsubmit=e=>{e.preventDefault();if(!validate(e.target,{email,password:req('Enter your password.')}))return;const em=e.target.email.value.trim(),ex=LS('nv_acc',{})[em];if(ex&&ex.p!==e.target.password.value)return toast('Incorrect email or password.',1);SV('nv_user',{name:ex?ex.name:em.split('@')[0].replace(/^./,c=>c.toUpperCase()),email:em});toast('Welcome back!');setTimeout(()=>location.href='account.html',600)}};
R.signup=()=>{A.innerHTML=`<div class="wrap"><div class="auth card"><h2>Create your account</h2><form id="sf2" novalidate style="display:grid;gap:12px;margin-top:12px">${field('Full Name','name','text','autocomplete="name"')}${field('Email','email','email','autocomplete="email"')}${field('Phone','phone','tel','autocomplete="tel"')}${pwf('Password','password')}${pwf('Confirm Password','confirm')}<button class="btn full">Create Account</button></form><p style="margin-top:14px">Already registered? <a href="login.html" style="color:var(--gold);font-weight:700">Login</a></p></div></div>`;tg();
$('#sf2').onsubmit=e=>{e.preventDefault();const f=e.target;if(!validate(f,{name:req('Enter your full name.'),email,phone,password:pass,confirm:(v,f)=>v===f.password.value?'':'Passwords do not match.'}))return;const a=LS('nv_acc',{});a[f.email.value.trim()]={name:f.name.value.trim(),p:f.password.value};SV('nv_acc',a);SV('nv_user',{name:f.name.value.trim(),email:f.email.value.trim()});toast('Account created. Welcome to NOVAORA!');setTimeout(()=>location.href='account.html',700)}};
R.about=()=>{A.innerHTML=`
<style>
.about-page{
  max-width:1400px;
  margin:auto;
  padding:40px 28px 70px;
}

.about-hero{
  min-height:430px;
  border-radius:24px;
  overflow:hidden;
  position:relative;
  display:flex;
  align-items:center;
  padding:60px;
  background:
    linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.25)),
    url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85')
    center/cover;
  color:white;
}

.about-hero-content{
  max-width:650px;
}

.about-label{
  text-transform:uppercase;
  letter-spacing:4px;
  font-size:13px;
  margin-bottom:18px;
  opacity:.9;
}

.about-hero h1{
  font-size:clamp(42px,6vw,78px);
  line-height:1;
  margin:0 0 22px;
  font-family:Georgia,serif;
}

.about-hero p{
  font-size:18px;
  line-height:1.7;
  max-width:580px;
  color:#f3f3f3;
}

.about-section{
  padding:80px 0 20px;
}

.about-intro{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:60px;
  align-items:center;
}

.about-intro h2{
  font-family:Georgia,serif;
  font-size:42px;
  margin:0 0 20px;
}

.about-intro p{
  line-height:1.8;
  color:#555;
  font-size:16px;
}

.about-image{
  height:420px;
  border-radius:20px;
  overflow:hidden;
}

.about-image img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

.about-values{
  margin-top:70px;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
}

.about-value{
  padding:32px;
  border:1px solid #e5e0d8;
  border-radius:18px;
  background:#faf9f6;
  transition:.3s;
}

.about-value:hover{
  transform:translateY(-6px);
  box-shadow:0 15px 35px rgba(0,0,0,.08);
}

.about-icon{
  font-size:30px;
  margin-bottom:18px;
}

.about-value h3{
  font-family:Georgia,serif;
  font-size:22px;
  margin:0 0 12px;
}

.about-value p{
  color:#666;
  line-height:1.7;
  margin:0;
}

.about-story{
  margin-top:80px;
  background:#111;
  color:white;
  border-radius:24px;
  padding:65px;
  text-align:center;
}

.about-story h2{
  font-family:Georgia,serif;
  font-size:42px;
  margin:0 0 20px;
}

.about-story p{
  max-width:760px;
  margin:auto;
  line-height:1.8;
  color:#ddd;
}

.about-stats{
  margin-top:45px;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:25px;
}

.about-stat strong{
  display:block;
  font-size:34px;
  font-family:Georgia,serif;
}

.about-stat span{
  color:#aaa;
  font-size:14px;
  letter-spacing:1px;
}

@media(max-width:800px){
  .about-page{
    padding:25px 16px 50px;
  }

  .about-hero{
    padding:40px 28px;
    min-height:420px;
  }

  .about-intro{
    grid-template-columns:1fr;
    gap:30px;
  }

  .about-values{
    grid-template-columns:1fr;
  }

  .about-stats{
    grid-template-columns:1fr;
  }

  .about-story{
    padding:45px 25px;
  }
}
</style>

<div class="about-page">

  <section class="about-hero">
    <div class="about-hero-content">
      <div class="about-label">THE NOVAORA STORY</div>
      <h1>More Than<br>Just Shopping.</h1>
      <p>
        NOVAORA brings fashion, beauty, technology, home essentials
        and everyday finds together in one carefully curated destination.
      </p>
    </div>
  </section>

  <section class="about-section">
    <div class="about-intro">

      <div>
        <div class="about-label" style="color:#a8792c">
          WHO WE ARE
        </div>

        <h2>Designed for the way you shop today.</h2>

        <p>
          NOVAORA was created with one simple idea — shopping should feel
          effortless, inspiring and enjoyable.
        </p>

        <p>
          From everyday essentials to products that add something special
          to your lifestyle, we bring carefully selected categories together
          so you can discover more without the hassle.
        </p>

        <p>
          Every part of NOVAORA is designed around quality, convenience
          and a modern shopping experience.
        </p>
      </div>

      <div class="about-image">
        <img
          src="https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="NOVAORA shopping experience">
      </div>

    </div>
  </section>

  <section class="about-section">

    <div style="text-align:center;margin-bottom:40px">
      <div class="about-label" style="color:#a8792c">
        WHY NOVAORA
      </div>

      <h2 style="font-family:Georgia,serif;font-size:42px;margin:0">
        Shopping with a difference.
      </h2>
    </div>

    <div class="about-values">

      <div class="about-value">
        <div class="about-icon">✦</div>
        <h3>Curated Products</h3>
        <p>
          We bring together products across popular categories
          so discovering something new feels simple.
        </p>
      </div>

      <div class="about-value">
        <div class="about-icon">◇</div>
        <h3>Quality First</h3>
        <p>
          We believe a great shopping experience starts with products
          that are worth bringing into your everyday life.
        </p>
      </div>

      <div class="about-value">
        <div class="about-icon">♡</div>
        <h3>Made for You</h3>
        <p>
          From browsing to checkout, NOVAORA is designed to make
          online shopping comfortable and effortless.
        </p>
      </div>

    </div>
  </section>

  <section class="about-story">
    <h2>Our Vision</h2>

    <p>
      To create a modern destination where people can discover
      products they love, shop with confidence and enjoy a better
      online experience every time they visit NOVAORA.
    </p>

    <div class="about-stats">

      <div class="about-stat">
        <strong>01</strong>
        <span>MODERN EXPERIENCE</span>
      </div>

      <div class="about-stat">
        <strong>∞</strong>
        <span>EVERYDAY DISCOVERY</span>
      </div>

      <div class="about-stat">
        <strong>24/7</strong>
        <span>ONLINE SHOPPING</span>
      </div>

    </div>
  </section>

</div>
`};
R.contact=()=>{A.innerHTML=`<div class="wrap"><section><h1>Contact Us</h1><div class="two" style="margin-top:20px"><form class="card" id="cf" novalidate style="display:grid;gap:12px">${field('Name','name')}${field('Email','email','email')}<label class="f">Message<textarea class="in" name="msg" rows="5"></textarea><span class="err"></span></label><button class="btn">Send message</button></form><div><div class="card"><h3>Get in touch</h3><p>support@novaora.example<br>Mon–Sat, 9am–8pm</p></div><div class="card" id="faq"><h3>FAQs</h3><p><b>How long does delivery take?</b><br>2–5 business days.</p><p style="margin-top:8px"><b>Can I return an item?</b><br>Yes, within 14 days.</p></div></div></div></section></div>`;$('#cf').onsubmit=e=>{e.preventDefault();if(validate(e.target,{name:req('Enter your name.'),email,msg:v=>v.length>=10?'':'Write at least 10 characters.'})){toast('Message sent. We\'ll reply within one business day.');e.target.reset()}}};
/* boot */
chrome();R[PAGE]?.();
