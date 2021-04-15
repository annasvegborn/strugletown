function showCards(card)
{
	var typeCard = document.getElementsByClassName(card);
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
}