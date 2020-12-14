export class Ajax {

    constructor() {

    }

 call(requestUrl,requestBody,requestMethod) {
     let xhr = new XMLHttpRequest();

     xhr.responseType = "text";
     xhr.setRequestHeader("content-type","application/json");

     xhr.onload = () => {
         console.log(xhr.responseText);
     }
     xhr.onerror = () => {
         console.log('error');
         console.log(xhr.status);
     }
     xhr.onreadystatechange=function(){
         if (xhr.readyState === 4){
             console.log(xhr.responseText)
         }
     }

     xhr.open(requestMethod,requestUrl,true)
     xhr.send();




 }
}