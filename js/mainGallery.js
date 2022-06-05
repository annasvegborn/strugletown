function loadImgages(row){
	var rowNr = row;
	console.log(rowNr);

    id = "row" + rowNr;
    text = "load" + rowNr;

	document.getElementById(id).style.display = "flex";
    document.getElementById(text).style.display = "none";

    if(rowNr <= 5){
        newNr = parseInt(rowNr) + 1;
        newtext = "load" + newNr;
        document.getElementById(newtext).style.display = "block";
    }

}