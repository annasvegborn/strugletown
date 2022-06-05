
var item = document.getElementById("Tab");
item.style.fontWeight = "bold";

function showCards(card)
{
	typeCardName = card + "Card"
	if(typeCardName == "Card"){
		typeCardName = "card";
	}

	var typeCard = document.getElementsByClassName(typeCardName);
	var cards = document.getElementsByClassName("card");

	var i;
	for (i = 0; i < cards.length; i++)
	{
	  cards[i].style.display = "none";
	}

	for (i = 0; i < typeCard.length; i++)
	{
		typeCard[i].style.display = "block";
	}


	var tabs = document.getElementsByClassName("pageTabs");
	var item = document.getElementById(card + "Tab");

	for (i = 0; i < tabs.length; i++)
	{
		tabs[i].style.fontWeight = "normal";
	}

	item.style.fontWeight = "bold";
}


// var slideIndex = 0;
// carousel();

// function carousel() {
//   var i;
//   var x = document.getElementsByClassName("coverImg");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > x.length) {slideIndex = 1}
//   x[slideIndex-1].style.display = "block";
//   setTimeout(carousel, 10000); // Change image every 2 seconds
// }

