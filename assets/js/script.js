
$("#butAny").on("click", function(){
    if($(this).is(":checked")){
        alert("This will invalidate all of the other checkboxes");
    }
})
$("#botonsubmit").click(function (e) { 
    e.preventDefault();
    console.log("pico boton")
    sendApiReq();
    
});
async function sendApiReq(){
    var healthlabels = ""
    if($("#butPF").is(':checked')){
        healthlabels = healthlabels + 'health=peanut-free';
    }
    if($("#butVegan").is(':checked')){
        if(healthlabels != ""){
            healthlabels = healthlabels + '&';
        }
        healthlabels = healthlabels + 'health=vegan';
    }
    if($("#butVeget").is(':checked')){
        if(healthlabels != ""){
            healthlabels = healthlabels + '&';
        }
        healthlabels = healthlabels + 'health=vegetarian';
    }
    if($("#butLC").is(':checked')){
        if(healthlabels != ""){
            healthlabels = healthlabels + '&';
        }
        healthlabels = healthlabels + 'diet=low-carb';
    }
    if($("#butLF").is(':checked')){
        if(healthlabels != ""){
            healthlabels = healthlabels + '&';
        }
        healthlabels = healthlabels + 'diet=low-fat';
    }
    if($("#butHP").is(':checked')){
        if(healthlabels != ""){
            healthlabels = healthlabels + '&';
        }
        healthlabels = healthlabels + 'diet=high-protein';
    }
    if($("#butBal").is(':checked')){
        if(healthlabels != ""){
            healthlabels = healthlabels + '&';
        }
        healthlabels = healthlabels + 'diet=balanced';
    }
    if($("#butAny").is(':checked')){
        healthlabels = "";
    }

    var qarr = ["egg", "fish", "meat", "pizza", "cheese", "chicken, ham, bread, flour, pizza, pasta, vegtables, fruit, protein"];
    if($("#butVegan").is(':checked') || $("#butVeget").is(':checked')){
        qarr = ["protein", "fruit", "salad", "vegtables", "soy"];
    }
    let q = qarr[Math.floor(Math.random() * qarr.length)];
    let APP_ID = "ee7a873b";
    let API_KEY = "e7ac86435ec6c45bc54e7e5513ddf7ee";
    if(healthlabels != ""){
        var resp = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}&${healthlabels}`);
        let datar = await resp.json();
        if(datar.hits.length == 0){
            let q = qarr[Math.floor(Math.random() * qarr.length)];
        }
        resp = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}&${healthlabels}`);
    }else{
        var resp = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}`);
        let datar = await resp.json();
        if(datar.hits.length == 0){
            let q = qarr[Math.floor(Math.random() * qarr.length)];
        }
        resp = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}`);
    }
    console.log(resp);
    let data = await resp.json();
    console.log(data);
    if(data.hits.length == 0){
        alert('No recipes available with those specifications');
    }
    useData(data);
}

function useData(data){

}