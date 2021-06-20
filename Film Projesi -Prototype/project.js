//ANA JS DOSYASI

const form=document.getElementById("film-form");
const titleElement=document.querySelector("#title");
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");
const secondCardBody=document.querySelectorAll(".card-body")[1];
const clear =document.getElementById("clear-films");

//UI OBJESİNİ BAŞLATMA
 const ui=new UI();

//Storage objesi üret
const storage =new Storage();

 //Tüm eventleri yükleme
 eventListeners();
 
 function eventListeners(){
     form.addEventListener("submit",addFilm);
     document.addEventListener("DOMContentLoaded",function(){
         let films = storage.getFilmsFromStorage();
         ui.loadAllFilms(films);
     });
     secondCardBody.addEventListener("click",deleteFilm);
     clear.addEventListener("click",clearAllFilms);
 }
 function addFilm(e){
    const title=titleElement.value;
    const director = directorElement.value;
    const url=urlElement.value;

    if(title ===""||director===""||url===""){
        //Hata
        ui.displayMessages("Tüm Alanları Doldurun..","danger");

    }
    else{
        // Yeni film
        const newFilm= new Film(title,director,url);
        ui.addFilmToUI(newFilm) //Arayüze film ekleme
        storage.addFilmToStorage(newFilm); // storage'a film ekleme

        ui.displayMessages("Film Başarıyla Eklendi","success");

    }

    ui.clearInputs(titleElement,urlElement,directorElement); // Ekleme işleminden sonra input içindeki değerleri silicez. 

    e.preventDefault(); //formun submit edilmesini önlemek için
 }

 function deleteFilm(e){
    if(e.target.id==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
      // Filmin ismini almak için kardeşler arasında geziyoruz.
        ui.displayMessages("Silme işlemi başarılı..","success");
    }
 }
 function clearAllFilms(){
     if (confirm("Emin misiniz?")){
     ui.clearAllFilmsFromUI();
     storage.clearAllFilmsFromStorage();

    }
 }