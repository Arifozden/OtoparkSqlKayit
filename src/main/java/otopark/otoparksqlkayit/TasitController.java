package otopark.otoparksqlkayit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TasitController {
    //once array olusturuyoruz
   // public final List<Tasit> tasitKayit=new ArrayList<>();
    //public final List<Araba> arabaKayit=new ArrayList<>();
    //database kayit olacagi icin bu arraylistleri kaldiriyoruz
    //database icin gerekli kodlari yaziyoruz

    @Autowired
    private TasitRepository rep;

   /* public TasitController(){   //bu constructor ile acilir tablolar icin olusturdugumuz degerleri siliyoruz
         Araba araba1=new Araba("Volvo","V30");
         arabaKayit.add(araba1);
         Araba araba2=new Araba("Volvo","V70");
         arabaKayit.add(araba2);
         Araba araba3=new Araba("Audi","A8");
         arabaKayit.add(araba3);
         Araba araba4=new Araba("Audi","Q7");
         arabaKayit.add(araba4);
         Araba araba5=new Araba("Toyota","Yaris");
         arabaKayit.add(araba5);
         Araba araba6=new Araba("Toyota","Auris");
         arabaKayit.add(araba6);
    }*/

    @GetMapping("/arabalariGetir")
    public List<Araba>arabalariGetir(){
       // return arabaKayit; array sildigimiz icin fonk arrayi degil sql den gelen degerleeri dondurecek asagidaki fonk araciligi ile
        return rep.tumArabalariGetir();
    }

    //Java script icine access point leri olusturuyoruz

    //kayit fonksiyonu ile arraylist icine girilen degerlerle bir araba kaydediyoruz
@PostMapping("/kaydet")
    public void kaydet(Tasit araba){
        //tasitKayit.add(araba); array i sildik yukarida. asagidaki fonk ile sql den alacagiz
    rep.tasitKayit(araba);
    }

    //kayittan sonra hepsinigetir fonksiyonu ile array i donduruyoruz
@GetMapping("/hepsiniGetir")
    public List<Tasit>hepsiniGetir(){
    //return tasitKayit;   arrayi sildik
    return rep.tumTasitlariGetir();
    }


    @GetMapping("/birTasitSil")
    public void birTasitSil(String tc){
        rep.birTasitSil(tc);
    }
    //son olarak array i temizleme fonksiyonu ile array i temizleyip, donduruyoruz.
@GetMapping("/hepsiniSil")
    public void hepsiniSil(){
    //tasitKayit.clear();
    rep.tumTasitlariSil();
    }
}

