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