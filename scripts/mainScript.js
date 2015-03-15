//variable declarations
var imageX = '<img src="media/x.png" style="margin-left:15px;">';
var imageO = '<img src="media/o.png" style="margin-left:15px;">';
var clickCount = 0,
    elementCount = 0;
var XboxesClicked = [],
    OboxesClicked = [];
var winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var interval = null;

// None AI (PVP) 
$(document).ready(function() {

    $('td').each(idAttach);
    $("td").on("click", clickHandler);
    $("td").on("click", movesTrack);

    interval = setInterval(function() {

        winCheck(XboxesClicked);
        winCheck(OboxesClicked);
    }, 1000);

});


//click helper function
var clickHandler = function() {

    if (!$(this).html()) {

        if (clickCount % 2 != 0) {

            $(this).html(imageX);
        } else {

            $(this).html(imageO);
        }

        clickCount++;
    }
}


//id function for all td boxes
var idAttach = function() {

    $(this.id = elementCount);
    elementCount++;
}


//tracking moves function and pushing them to 2 arrays
var movesTrack = function() {

    if ($(this).html() == imageX) {

        XboxesClicked.push(parseInt($(this).prop('id')));
    } else if ($(this).html() == imageO) {

        OboxesClicked.push(parseInt($(this).prop('id')));
    }

}


//win function, checking O and X array with winCombinations array
var winCheck = function(checkedBoxes) {

    var counter = 0;
    var checkedBoxes = new Set(checkedBoxes);

    for (var x = 0; x < winCombinations.length; x++) {

        winCombinations[x].forEach(function(entry) {

            checkedBoxes.forEach(function(entryC) {

                if (entry == entryC) {

                    counter++;
                }
            });
        });

        if (counter == 3) {

            //using win function with css class attached to it
            winDecorator(winCombinations[x]);
            clearInterval(interval);
            break;
        } else {

            counter = 0;
        }
    }
}


//restart button function, all arrays and variables to 0 and setInterval function
var gameRestart = function() {

    $('td').html("");
    clickCount = 0, elementCount = 0;
    XboxesClicked = [], OboxesClicked = [];

    interval = setInterval(function() {

        winCheck(XboxesClicked);
        winCheck(OboxesClicked);
    }, 1000);

    $('td').removeClass('winClass');
}


//add style to wining boxes
var winDecorator = function(winingCombination) {

    winingCombination.forEach(function(comb) {

        $('td').eq(comb).addClass('winClass');
    });
}


//AI Must lie here, one module with couple of functions