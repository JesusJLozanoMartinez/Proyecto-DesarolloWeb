
$("#butAny").on("click", function(){
    if($(this).is(":checked")){
        alert("This will invalidate all of the other checkboxes");
    }
})
$("#butHP").on("click", function(){
    $("#butBal").prop("checked", false);
})
$("#butLC").on("click", function(){
    $("#butBal").prop("checked", false);
})
$("#butLF").on("click", function(){
    $("#butBal").prop("checked", false);
})
$("#butBal").on("click", function(){
    $("#butLC").prop("checked", false);
    $("#butLF").prop("checked", false);
    $("#butHP").prop("checked", false);
})

$("#botonsubmit").click(function (e) { 
    e.preventDefault();
    console.log("pico boton")
    $(".dietContainer").html('');
    sendApiReq(0);
    sendApiReq(1);
    
});
async function sendApiReq(cont){
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
    if (cont == 0){
        var qarr = ["egg", "protein", "cereal", "pancakes", "waffles", "omelette", "oatmeal", "yougurt","cookies", "Muffins"];
    }else{
        var qarr = ["egg", "fish", "meat", "pizza", "cheese", "chicken", "ham", "bread", "pizza", "pasta", "vegtables", "fruit", "protein", "grilled"];
        if($("#butVegan").is(':checked') || $("#butVeget").is(':checked')){
            qarr = ["protein", "fruit", "salad", "vegtables", "soy"];
        }
    }
    let q = qarr[Math.floor(Math.random() * qarr.length)];
    let APP_ID = "ee7a873b";
    let API_KEY = "e7ac86435ec6c45bc54e7e5513ddf7ee";
    if(healthlabels != ""){
        var resp = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}&${healthlabels}&calories=100-300`);
        let datar = await resp.json();
        if(datar.hits.length == 0){
            let q = qarr[Math.floor(Math.random() * qarr.length)];
        }
        resp = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}&${healthlabels}&calories=100-300`);
    }else{
        var resp = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}&calories=100-300`);
        let datar = await resp.json();
        if(datar.hits.length == 0){
            let q = qarr[Math.floor(Math.random() * qarr.length)];
        }
        resp = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${q}&calories=100-300`);
    }
    console.log(resp);
    let data = await resp.json();
    console.log(data);
    if(data.hits.length == 0){
        alert('No recipes available with those specifications');
    }
    if (cont == 0){
        useData(data);
    }else{
        useData(data);
        useData(data);
    }

}
function useData(data){
    arr = data.hits;
    rand = arr[Math.floor(Math.random() * arr.length)];
    $(".dietContainer").append(`<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${rand.recipe.image}" style="width:200px;height:121px; alt="Recipe picture">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${rand.recipe.label}<i class="material-icons right">more_vert</i></span>
      <p><a target="_blank" rel="noopener noreferrer" href="${rand.recipe.shareAs} target="_blank">Link to the recipe</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${rand.recipe.label}<i class="material-icons right">close</i></span>
      <p>Calories: ${rand.recipe.calories}</p>
    </div>
  </div>`);
}