var foodList;
var DayProfileList;
var Meal = 1;
var ingredientsPermeal = new Array();
$(document).on("change", ".Amount", function(){
    
    addTogether();
});
$( document ).ready(function() {

    $("#LoginB").click(function(){
        document.getElementById('id01').style.display='block';
    });

    $(".mx-auto").each(function(){
        $(this).hide();
    });
    $("#PageFour").show();
    $("#MealProfiles").show();
    
    // BMI Submit
    $("#Submit").click(function(){

       var weight = $("#weight").val();
       var height = $("#height").val()/100;

       var BMI = Math.round(weight/(height*height));
        console.log(BMI);

        var FAT = (BMI/25)*100;
       $("#test1").text("Your BMI is "+BMI+"%");
       $(".progress-bar").css("width", FAT+"%").text(FAT+"%");
       $("#test2").text("Your are "+FAT+"% FAT");

        if(FAT>100){
       $(".progress-bar").css("background", "red")

        }
    });

    
    // Pagination
    $('.pagination li').click(function(i)
    {
       let nr = $(this).text(); // This is your rel value

       $(".mx-auto").each(function(){
        $(this).hide();
    });
console.log(nr);
       switch(nr){
           case '1':
           $("#PageOne").show();
           pageNr=1;
           break;
           case '2':
           $("#PageTwo").show();
           pageNr=2;
           LoadCanvas();
           break;
           case '3':
           $("#PageThree").show();
           pageNr=3;
           break;
           case '4':
           $("#PageFour").show();
           pageNr=3;
           break;
       }
    });

     

  
    
    $.post("/GetFoodList",
        {
          getFood: 1
        },
        function(data,status){
        //   alert("Data: " + data + "\nStatus: " + status);          
          foodList = data;
          console.log(foodList);
            foodList.forEach(value => {
                var select = document.getElementById("foodSelect")
                var opt = document.createElement('option');
                opt.value = JSON.stringify(value);
                opt.innerHTML = value.FoodName;
                select.appendChild(opt);
            });
        });

        

    
});

$("#LoadDays").click(function(){

    $.post("/GetDayProfile",
    {
      getFood: 1
    },
    function(data,status){
      console.log(data);
      DayProfileList = JSON.parse(data);

      DayProfileList.forEach(element => {
        CreateDayProfileCard(element);
      });
      
    });
});

    
$("#AddtoDB").click(function(){
    
    $.post("/AddtoDB",
        {
          FoodName: $("#foodName").val(),
          Calories: $("#foodCalories").val(),
          Protein: $("#foodProtein").val(),
          Carbohydrates: $("#foodCarbohydrates").val(),
          Fat: $("#foodFat").val()
        },
        function(data,status){
          console.log("Data: " + data + "\nStatus: " + status);
          console.log(data);
        });
});

$("#CreateDay").click(function(){
    
    // var value = JSON.parse($("#foodSelect").val());
    // console.log(value.Calories);
    countMeals();
    ingredientsPermeal.forEach(element => {
        
    });
    
    let dayProfile = JSON.stringify(createMealDayObject());
    const name = $("#DayProfileName").val();
    console.log("DayName " + name);
    console.log(dayProfile);
    $.post("/SaveDayProfile",
    {
        name: name,
        dayProfile: dayProfile
    },
    function(data,status){
      alert("Data: " + data + "\nStatus: " + status);
    });
});

$("#AddIngredient").click(function(){

    addIngredient(false);
    
});

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function appendList(thing){
    foodList.forEach(value => {
        var opt = document.createElement('option');
        opt.value = JSON.stringify(value);
        opt.innerHTML = value.FoodName;
        thing.appendChild(opt);
    });
}

function addTogether(){

    // var selected = document.getElementsByClassName("foodSelect");
    var Macronutrients = new Object;
    var totalCalories = 0;
    var totalProtein = 0;
    var totalCarbohydrates = 0;
    var totalFat = 0;
    var counter = 0;

    var amounts1 = document.querySelectorAll(".Amount");
    var amounts = Array.prototype.slice.call(amounts1).map(function(element) {
        return element.value;
    });
    var classesNodeList = document.querySelectorAll(".foodSelect");
    var classes = Array.prototype.slice.call(classesNodeList).map(function(element) {
        return element.value;
    });

    for(var i = 0; i<amounts.length; i++){

        var object = JSON.parse(classes[i]);
        console.log(object.Protein);
        totalCalories += parseInt(object.Calories) * parseInt(amounts[i])/100 ;
        totalProtein += object.Protein * parseInt(amounts[i])/100;
        totalCarbohydrates += parseInt(object.Carbohydrates) * parseInt(amounts[i])/100;
        totalFat += parseInt(object.Fat) * parseInt(amounts[i])/100;
    }

    document.getElementById("DailyCalories").innerHTML = "Calories: "+ totalCalories;
    document.getElementById("DailyProtein").innerHTML = "Protein: "+ totalProtein;
    document.getElementById("DailyCarbohydrates").innerHTML = "Carbohydrates: " + totalCarbohydrates;
    document.getElementById("DailyFat").innerHTML = "Fat: " + totalFat;

    Macronutrients['Calories'] =  totalCalories;
    Macronutrients['Protein'] =  totalProtein;
    Macronutrients['Carbohydrates'] =  totalCarbohydrates;
    Macronutrients['Fat'] =  totalFat;

    return Macronutrients;

}

$("#AddMeal").click(function(){

    countMeals();
    addIngredient(true);

});

function addIngredient(MoreMeals){

    if(MoreMeals)
    addMeal();

    var div = document.getElementById("Meals");
    var select = document.createElement("select");
    var label = document.createElement("label");
    var input = document.createElement("input");
    // <input type="text" class="form-control form-control col-md-5 d-inline" placeholder="Amount" id="foodProtein">
    
    //Add class
    label.classList.add("mt-2");
    select.classList.add("form-control", "col-md-5", "foodSelect", "d-inline");
    input.classList.add("form-control", "col-md-5", "d-inline", "ml-1", "Amount");
    input.placeholder = "Amount";
    input.type = "text";
    

    //Text
    var classes = $(".foodSelect").length+1;
    label.innerHTML = "Meal "+classes;

    appendList(select);
    //div.append(label)
    div.append(select);
    div.append(input);

    
}

function addMeal(){

    Meal++;
    var div = document.getElementById("Meals");
    var mealDiv = document.createElement("div");
    var Para = document.createElement("p");

    mealDiv.classList.add("Meal"+Meal);
    Para.innerHTML = "Meal "+ Meal + ": ";

    //Append
    div.append(mealDiv);
    mealDiv.append(Para);

}

function countMeals(){

    var sum = 0;

    var classesNodeList = document.querySelectorAll(".foodSelect");
    //console.log(classesNodeList.length);

    ingredientsPermeal.forEach(element => {
        sum+=element;
        console.log(element);
    });
    ingredientsPermeal.push(classesNodeList.length-sum);
     console.log(classesNodeList.length-sum);    
}

function createMealDayObject(){

    var MealsObject = new Array();
    var Meals = 1;

    var amounts1 = document.querySelectorAll(".Amount");
    var amounts = Array.prototype.slice.call(amounts1).map(function(element) {
        return element.value;
    });

    var classesNodeList = document.querySelectorAll(".foodSelect");
    var classes = Array.prototype.slice.call(classesNodeList).map(function(element) {
        return element.value;
    });
        

    for(var k = 0; k<ingredientsPermeal.length; k++){

        for(var i = 0; i<ingredientsPermeal[k]; i++){
            
            var object = JSON.parse(classes[i]);

            object['DayAmount'] = parseInt(amounts[i]);
            object['Meal'] = Meals;
            MealsObject.push(object);
        }

        Meals++;
    }

    // MealsObject.push(addTogether());

    return MealsObject;
}

function CreateDayProfileCard(data){

    MealDiv = document.getElementById("MealProfiles");
    var DayName = data[0].Dayname;
    DayDiv = document.createElement("div");
    DayDiv.classList.add("DayProfile");

    p = document.createElement("p").innerHTML = DayName;
    DayDiv.append(p);

    var Calories = 0;
    var Protein = 0;
    var Carbohydrates = 0;
    var Fat = 0;

    data.forEach(element => {
        var Ingredient = document.createElement('div');
        Ingredient.classList.add("Ingredient");


        var FoodSource = getIngredient(element.foodId);
        DayName = FoodSource.Dayname;
        Calories += getMacroAmount(FoodSource.Calories, element.Amount);
        Protein += getMacroAmount(FoodSource.Protein, element.Amount);
        Carbohydrates += getMacroAmount(FoodSource.Carbohydrates, element.Amount);
        Fat += getMacroAmount(FoodSource.Fat, element.Amount);

        var FoodName = document.createElement('a');
        FoodName.innerHTML = FoodSource.FoodName+ " ";

        
        var Meal = document.createElement('a');
        Meal.innerHTML = "Meal: " + element.Meal + " ";
        
        var Amount = document.createElement('a');
        Amount.innerHTML = "Amount: " + element.Amount + " ";

        Ingredient.append(FoodName);
        Ingredient.append(Meal);
        Ingredient.append(Amount);
        DayDiv.append(Ingredient);
            
        });

        CaloriesText = document.createElement('a');
        ProteinText = document.createElement('a');
        CarbohydrateText = document.createElement('a');
        FatText = document.createElement('a');
        CaloriesText.classList.add("MacroResult");
        ProteinText.classList.add("MacroResult");
        CarbohydrateText.classList.add("MacroResult");
        FatText.classList.add("MacroResult");


        CaloriesText.innerHTML = " Calories: " + Calories;
        ProteinText.innerHTML = " Protein: " + Protein;
        CarbohydrateText.innerHTML = " Carbohydrates: " + Carbohydrates;
        FatText.innerHTML = " Fat: " + Fat;

        DayDiv.append(CaloriesText)
        DayDiv.append(ProteinText)
        DayDiv.append(CarbohydrateText)
        DayDiv.append(FatText);

        MealDiv.append(DayDiv);
    
}

function getIngredient(id){

    for(var i = 0; i<foodList.length; i++){
        if(foodList[i].id == id)
        return foodList[i];
    }
}

function getMacroAmount(macro, amount){

        return (macro* (amount/100));
}
