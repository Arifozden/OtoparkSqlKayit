$(function (){
    tumArabalariGetir();
    hepsiniGetir();
});

function tumArabalariGetir(){
    $.get("/arabalariGetir",function (arabalar){
        arabalariDuzenle(arabalar);
    });
}

function arabalariDuzenle(arabalar){
    let yaz="<select id='secilenMarka' onchange='modelleriBul()'>";
    let oncekiMarka="";
    yaz+="<option>Marka sec</option>";
    for(const araba of arabalar){
        if(araba.marka!=oncekiMarka){
            yaz+="<option>"+araba.marka+"</option>";
        }
        oncekiMarka=araba.marka;
    }
    yaz+="</select>";
    $("#marka").html(yaz);
}


function modelleriBul(){
    const seciliMarka=$("#secilenMarka").val();
    $.get("/arabalariGetir",function (arabalar){
        modelleriDuzenle(arabalar,seciliMarka);
    });
}

function modelleriDuzenle(arabalar,secilenMarka){
    let yaz="<select id='seciliModel'>";
    for(const araba of arabalar){
        if(araba.marka===secilenMarka){
            yaz+="<option>"+araba.model+"</option>";
        }
    }
    yaz+="</select>";
    $("#model").html(yaz);
}

function tasitKayit(){
    const tasit={  //javascript objesi olusturduk
        tc:$("#tc").val(),  //$ ile jquery kullaniyoruz
        ad:$("#ad").val(),
        adres:$("#adres").val(),
        plaka:$("#plaka").val(),
        marka:$("#secilenMarka").val(),
        model:$("#seciliModel").val(),
    }
 //olusturdugumuz objeyi post ile server a gonderiyoruz
 //hangi fonksiyona, neyi gonderdigimizi yaziyoruz
 //ve devaminda ne yapacagini soyluyoruz
    $.post("/kaydet",tasit,function (){
        hepsiniGetir();
    });
    //degerleri aldiktan sonra felt lerin icini bosaltiyoruz
    $("#tc").val("");
    $("#ad").val("");
    $("#adres").val("");
    $("#plaka").val("");
    $("#secilenMarka").val("");
    $("#seciliModel").val("");
}
//ilk fonksiyondan sonra icinde fonksiyon varsa onu yaziyoruz
function hepsiniGetir(){
    //serverdan get ile cagiriyoruz
    //fonksiyonun icinde arabalari getiriyoruz
    $.get("/hepsiniGetir",function (arabalar){
        //serverdan array geldi simdi onu duzenleme zamani
        //bir fonksiyon daha yaziyoruz icine array i aliyor
        bilgiDuzenle(arabalar);
    });
}
//server dan gelen array i html e yazdirma
function bilgiDuzenle(arabalar){
    let yaz="<table class='table table-striped'><tr><th>TC</th><th>Ad</th><th>Adres</th>"+
        "<th>Plaka</th><th>Marka</th><th>Model</th><th></th></tr>";
    for(const araba of arabalar){
        yaz+="<tr><td>"+araba.tc+"</td><td>"+araba.ad+"</td><td>"+araba.adres+"</td><td>"+araba.plaka+"</td><td>"+araba.marka+"</td><td>"+araba.model+"</td>" +
            "<td><button class='btn btn-danger' onclick='birTasitSil("+araba.tc+")'>Sil</button> </td></tr>";
    }
    yaz+="</table>";
    $("#arabalar").html(yaz);
}

function birTasitSil(tc){
    const url="/birTasitSil?tc="+tc;
    $.get(url,function (){
        window.location.href="/";
    })
}
function hepsiniSil(){
    $.get("/hepsiniSil", function (){
        hepsiniGetir();
    })
}