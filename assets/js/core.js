$(document).ready(function() {
	var bingoHeader = ["B", "I", "N", "G", "O"];
	// for bingo card numbers
	var bColArray = [];
	var iColArray = [];
	var nColArray = [];
	var gColArray = [];
	var oColArray = [];
	var pickedNum = [];
	var selectedNum = [];

	// for pattern checker
	var column0 = [];
	var column1 = [];
	var column2 = [];
	var column3 = [];
	var column4 = [];
	var row1 = [];
	var row2 = [];
	var row3 = [];
	var row4 = [];
	var row5 = [];
	var diagL = [];
	var diagR = [];
	var fourCorner = [];

	// for td click
	var col;
	var row;

	// for number display
	var displayNums = "<table><tr>";
	var numbers = [];
	var ctr = 0;

	getNewCard();

	for (var i = 1; i <= 75; i++) {
		if (i >= 1 && i <= 15) {
			numbers.push("B" + i);
		} else if (i >= 16 && i <= 30) {
			numbers.push("I" + i);
		} else if (i >= 31 && i <= 45) {
			numbers.push("N" + i);
		} else if (i >= 46 && i <= 60) {
			numbers.push("G" + i);
		} else if (i >= 61 && i <= 75) {
			numbers.push("O" + i);
		}
	}


	var ctr = 0;
	for (var i = 0; i < 11; i++) {
		
		displayNums += "<tr>"

		for (var j = 0; j < 7; j++) {
			if ((j == 0 && i == 10) || (j == 6 && i == 10)) {
				displayNums += "<td>" + " ";
			}
			if (ctr <= 74) {
				displayNums += "<td data-id=" + numbers[ctr] + ">" + numbers[ctr];
				ctr++;
			}
		}
	}
	$("#displayNums").html(displayNums);

	$("#btnNewCard").click(function() {
		getNewCard();

		$("td").css("background-color", "");

		$("td").mouseover(function() {
			$(this).css("cursor", "pointer");
		}); // end of td mouseover function

		$("td").click(function(){
			col = Number($(this).parent().children().index($(this)));
			row = Number($(this).parent().parent().children().index($(this).parent()));
			// console.log(row, col);
			var temp = $(this).text();
			for (var i = 0; i < selectedNum.length; i++) {
				if (selectedNum[i] == temp) {
					$(this).css("background-color", "orange");
				}
			}

			bingoChecker();
		}); // end of td click function
	});

	$("#btnDraw").click(function() {
		getDrawNum();		
	}); // end of btnDraw click function

	$("td").mouseover(function() {
		$(this).css("cursor", "pointer");
	}); // end of td mouseover function

	$("#bingoCard td").click(function(){
		col = Number($(this).parent().children().index($(this)));
		row = Number($(this).parent().parent().children().index($(this).parent()));
		// console.log(row, col);
		var temp = $(this).text();
		for (var i = 0; i < selectedNum.length; i++) {
			if (selectedNum[i] == temp) {
				$(this).css("background-color", "orange");
			}
		}
		
		bingoChecker();

		
	}); // end of td click function

	$("#btnPlayAgain").click(function() {
		$(this).load("bingo.html");
	});

	$("#btnBingo").click(function() {
		$(this).load("won.html");
	});

	function doReset() {
		// for bingo card numbers
		bColArray = [];
		iColArray = [];
		nColArray = [];
		gColArray = [];
		oColArray = [];
		pickedNum = [];

		// for pattern checker
		column0 = [];
		column1 = [];
		column2 = [];
		column3 = [];
		column4 = [];
		row1 = [];
		row2 = [];
		row3 = [];
		row4 = [];
		row5 = [];
		diagL = [];
		diagR = [];
		fourCorner = [];

		// for td click
		col;
		row;

		$("#drawLetter").html("");
		$("#drawNum").html("");
	} // end of doReset function


	function bingoChecker() {
		// column winning pattern checker
		for (var i = 1; i <= 5; i++) {
			if (row == i && col == 0) {
				column0.push("col0");
			} else if (row == i && col == 1) {
				column1.push("col1");
			} else if (row == i && col == 2) {
				column2.push("col2");
			} else if (row == i && col == 3) {
				column3.push("col3");
			} else if (row == i && col == 4) {
				column4.push("col4");
			}
		}

		// row winning pattern checker
		for (var i = 0; i <= 4; i++) {
			if (row == 1 && col == i) {
				row1.push("row1");
			} else if (row == 2 && col == i) {
				row2.push("row2");
			} else if (row == 3 && col == i) {
				row3.push("row3");
			} else if (row == 4 && col == i) {
				row4.push("row4");
			} else if (row == 5 && col == i) {
				row5.push("row5");
			}
		}

		// diagonal TL to BR pattern checker
		if (row == 1 && col == 0) {
			diagL.push("diagL");
		} else if (row == 2 && col == 1) {
			diagL.push("diagL");
		} else if (row == 4 && col == 3) {
			diagL.push("diagL");
		} else if (row == 5 && col == 4) {
			diagL.push("diagL");
		}

		// diagonal TR to BL pattern checker
		if (row == 1 && col == 4) {
			diagR.push("diagR");
		} else if (row == 2 && col == 3) {
			diagR.push("diagR");
		} else if (row == 4 && col == 1) {
			diagR.push("diagR");
		} else if (row == 5 && col == 0) {
			diagR.push("diagR");
		}

		// 4 corner pattern checker
		if (row == 1 && col == 0) {
			fourCorner.push("fourCorner");
		} else if (row == 1 && col == 4) {
			fourCorner.push("fourCorner");
		} else if (row == 5 && col == 0) {
			fourCorner.push("fourCorner");
		} else if (row == 5 && col == 4) {
			fourCorner.push("fourCorner");
		}

		if (column0.length == 5 || column1.length == 5 || column2.length == 4 || column3.length == 5 || column4.length == 5) {
			$("#btnBingo").css("pointer-events", "auto");
			$("#btnBingo").css("opacity", 1);
		} else if (row1.length == 5 || row2.length == 5 || row3.length == 4 || row4.length == 5 || row5.length == 5) {
			$("#btnBingo").css("pointer-events", "auto");
			$("#btnBingo").css("opacity", 1);
		} else if (diagL.length == 4 || diagR.length == 4 || fourCorner.length == 4) {
			$("#btnBingo").css("pointer-events", "auto");
			$("#btnBingo").css("opacity", 1);
		}
	} // end of bingoChecker function


	function getNewCard() {
		doReset();

		var bingoTable = "<table>";

		for (var th = 0; th < bingoHeader.length; th++) {
			bingoTable += "<th>" + bingoHeader[th];
		}

		for (var tableRow = 0; tableRow < bingoHeader.length; tableRow++) {
			bingoTable += "<tr>";

			for (var tableColumn = 0; tableColumn < bingoHeader.length; tableColumn++) {
				
				if (tableColumn == 0) {
					var bTemp = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
				
					if (bColArray.indexOf(bTemp) == -1) {
						bColArray.push(bTemp);
					} else {
						tableColumn--;
					}

				} else if (tableColumn == 1) {
					var iTemp = Math.floor(Math.random() * (30 - 16 + 1)) + 16;
				
					if (iColArray.indexOf(iTemp) == -1) {
						iColArray.push(iTemp);
					} else {
						tableColumn--;
					}

				} else if (tableColumn == 2) {
					var nTemp = Math.floor(Math.random() * (45 - 31 + 1)) + 31;
				
					if (tableRow == 2) {
						nColArray.push("FREE");
					} else {
						if (nColArray.indexOf(nTemp) == -1) {
						nColArray.push(nTemp);
						} else {
							tableColumn--;
						}
					}

				} else if (tableColumn == 3) {
					var gTemp = Math.floor(Math.random() * (60 - 46 + 1)) + 46;
				
					if (gColArray.indexOf(gTemp) == -1) {
						gColArray.push(gTemp);
					} else {
						tableColumn--;
					}

				} else if (tableColumn == 4) {
					var oTemp = Math.floor(Math.random() * (75 - 61 + 1)) + 61;
				
					if (oColArray.indexOf(oTemp) == -1) {
						oColArray.push(oTemp);
					} else {
						tableColumn--;
					}	
				}

			} // end of tableColumn for loop
			
			bingoTable += "<td>" + bColArray[tableRow];
			bingoTable += "<td>" + iColArray[tableRow];
			bingoTable += "<td>" + nColArray[tableRow];
			bingoTable += "<td>" + gColArray[tableRow];
			bingoTable += "<td>" + oColArray[tableRow];

		} // end of tableRow
		
		$("#bingoCard").html(bingoTable);
	} // end of getNewCard function
	

	function getDrawNum() {
		var drawLetter = Math.floor(Math.random() * 5);
		var drawNum;

		for (var counter = 0; counter <= 0; counter++) {
			if (drawLetter == 0) {
				drawNum = Math.floor(Math.random() * (15 - 1 + 1)) + 1;

				if (pickedNum.indexOf(bingoHeader[drawLetter] + drawNum) == -1) {
					selectedNum.push(drawNum);
					pickedNum.push(bingoHeader[drawLetter] + drawNum);
					$("#drawNum").html(bingoHeader[drawLetter] + drawNum);
				} else {
					counter--;
				}
				
			} else if (drawLetter == 1) {
				drawNum = Math.floor(Math.random() * (30 - 16 + 1)) + 16;

				if (pickedNum.indexOf(bingoHeader[drawLetter] + drawNum) == -1) {
					selectedNum.push(drawNum);
					pickedNum.push(bingoHeader[drawLetter] + drawNum);
					$("#drawNum").html(bingoHeader[drawLetter] + drawNum);
				} else {
					counter--;
				}
				
			} else if (drawLetter == 2) {
				drawNum = Math.floor(Math.random() * (45 - 31 + 1)) + 31;

				if (pickedNum.indexOf(bingoHeader[drawLetter] + drawNum) == -1) {
					selectedNum.push(drawNum);
					pickedNum.push(bingoHeader[drawLetter] + drawNum);
					$("#drawNum").html(bingoHeader[drawLetter] + drawNum);
				} else {
					counter--;
				}
				
			} else if (drawLetter == 3) {
				drawNum = Math.floor(Math.random() * (60 - 46 + 1)) + 46;

				if (pickedNum.indexOf(bingoHeader[drawLetter] + drawNum) == -1) {
					selectedNum.push(drawNum);
					pickedNum.push(bingoHeader[drawLetter] + drawNum);
					$("#drawNum").html(bingoHeader[drawLetter] + drawNum);
				} else {
					counter--;
				}
				
			} else if (drawLetter == 4) {
				drawNum = Math.floor(Math.random() * (75 - 61 + 1)) + 61;

				if (pickedNum.indexOf(bingoHeader[drawLetter] + drawNum) == -1) {
					selectedNum.push(drawNum);
					pickedNum.push(bingoHeader[drawLetter] + drawNum);
					$("#drawNum").html(bingoHeader[drawLetter] + drawNum);
				} else {
					counter--;
				}
			}
		} // end of counter for loop

		for (var i = 0; i < pickedNum.length; i++) {
			for (var j = 0; j < numbers.length; j++) {
				if (pickedNum[i] == numbers[j]) {
					$("td[data-id='" + numbers[j] + "']").css("background-color", "orange");
				}
			}
		}
	} // end of getDrawNum function
}); // end of document ready