//ANA JS DOSYASI

const form=document.getElementById("film-form");
const titleElement=document.querySelector("#title");
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");
const secondCardBody=document.querySelectorAll(".card-body")[1];
const clear =document.getElementById("clear-films");

 //Tüm eventleri yükleme
 eventListeners();
 
 function eventListeners(){
     form.addEventListener("submit",addFilm);
     document.addEventListener("DOMContentLoaded",function(){
         let films = Storage.getFilmsFromStorage();
         UI.loadAllFilms(films);
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
       UI.displayMessages("Tüm Alanları Doldurun..","danger");

    }
    else{
        // Yeni film
        const newFilm= new Film(title,director,url);
        UI.addFilmToUI(newFilm) //Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); // storage'a film ekleme

       UI.displayMessages("Film Başarıyla Eklendi","success");

    }

    UI.clearInputs(titleElement,urlElement,directorElement); // Ekleme işleminden sonra input içindeki değerleri silicez. 

    e.preventDefault(); //formun submit edilmesini önlemek için
 }

 function deleteFilm(e){
    if(e.target.id==="delete-film"){
        UI.deleteFilmFromUI(e.target);
       Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
      // Filmin ismini almak için kardeşler arasında geziyoruz.
        UI.displayMessages("Silme işlemi başarılı..","success");
    }
 }
 function clearAllFilms(){
     if (confirm("Emin misiniz?")){
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();

    }
 }