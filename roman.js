/**
 * Created by Samuel Beckingham-Cook on 10/03/2016.
 *
 * MIT License, blah blah.
 */


(function(window){



    'use strict';
    function createRoman() {

        var Roman = {};

        //Define numerals
        var numerals = [{
            'symbol': "I",
            'worth': 1},{
            'symbol': "V",
            'worth': 5},{
            'symbol': "X",
            'worth': 10},{
            'symbol': "L",
            'worth': 50},{
            'symbol': "C",
            'worth': 100},{
            'symbol': "D",
            'worth': 500},{
            'symbol': "M",
            'worth': 1000}
        ];

        //Positional Notation Order, for Roman numerals this is generally considered as 3, so you
        //would write VIII and then IX, as opposed to VIIII.
        //With an order of 2, we would write VII and then IIX, and VI and IIIX for an order of 1.
        var pnOrder = 3;

        Roman.convertTo = function (int) {
            //Create empty numeral string
            var numeralString = '';

            //Sort numerals lowest to highest
            numerals.sort(function(a,b){return a.worth - b.worth});

            //Now switch to highest to lowest. Can you believe this is the most efficient way!?
            numerals.reverse();

            //To create the string, the code will take as many of the highest symbol it can and adjust
            //the numeralString accordingly, before moving on to the next string.  For roman numerals,
            //this means there will never be a remainder.
            //TODO: Remainder functions, currently just lost in the ether.

            //Create a record of the last result (Purpose will become clear further along)
            var lastResult = 0;

            for (var i = 0; i < numerals.length; i++) {

                //Find out how many symbols to put in
                var totalSymbols = Math.floor(int / numerals[i].worth);

                //Append symbols to string, logic varies depending on iteration due to positional notation
                if (i > 1) {
                    //Check if it requires subtraction notation
                    if (totalSymbols > pnOrder) {
                        //Take away last added symbols
                        numeralString = numeralString.slice(0, (numeralString.length-lastResult));

                        //Calculate difference between current symbol and previous symbol and divide by current
                        //symbol to calculate max number of symbols possible between two symbols
                        //e.g. there can only ever be 4 I's between V and X regardless of how wild the pnOrder is
                        var maxSymbols = (numerals[i-1].worth - numerals[i].worth) / numerals[i].worth;

                        var symbolsToAdd;

                        if (lastResult === 0) {
                            symbolsToAdd = new Array((maxSymbols - pnOrder) + 1).join(numerals[i].symbol);
                            numeralString += symbolsToAdd + numerals[i - 1].symbol;
                        } else {
                            symbolsToAdd = new Array((maxSymbols - pnOrder) + 1).join(numerals[i].symbol);
                            numeralString += symbolsToAdd + numerals[i - 2].symbol;
                        }
                    } else {
                        //No subtraction notation is needed, so the symbols can simply be appended
                        numeralString += new Array(totalSymbols + 1).join(numerals[i].symbol)
                    }

                }
                else {
                    //First iteration, this is simply the highest symbol repeated as many times as possible
                    numeralString += new Array(totalSymbols + 1).join(numerals[i].symbol)
                }

                //Record this result for the next iteration
                lastResult = totalSymbols;


                //Remove the value accounted for in this iteration
                int -= totalSymbols * numerals[i].worth;

            }

            return numeralString;
        };

        Roman.convertFrom = function (numeralInput) {

            //TODO validate entered numerals against ones stored in the object

            var returnValue = 0;

            //Search the numeral array for the matching symbol and bring back the worth
            function getNumeralValue(symbol) {
                for (var i = 0 ; i< numerals.length; i++) {
                    if (numerals[i].symbol === symbol) {
                        return numerals[i].worth;
                    }
                }
            }

            var repeatCounter = 1;

            //Iterate over each numeral in string and compare it to the next numeral
            for (var i = 0 ; i < numeralInput.length; i++) {

                //Value of current numeral
                var thisWorth = getNumeralValue(numeralInput.charAt(i).toUpperCase());
                //Value
                var nextWorth = getNumeralValue(numeralInput.charAt(i+1).toUpperCase());

                if (thisWorth > nextWorth || nextWorth === undefined) {
                    //If current numeral is worth more than the next, then it is addition notation, so the value needs to be added.
                    //The value will be multiplied based on the repeat counter
                    returnValue += (thisWorth * repeatCounter);
                    repeatCounter = 1;
                } else if (thisWorth < nextWorth){
                    //If the numeral is lower, then it is a subtraction, but it needs to subtract the all the symbols in the subtraction notation
                    returnValue -= (thisWorth * repeatCounter);
                    repeatCounter = 1;
                } else {
                    //This symbol and the next are the same, which means it may be addition or subtraction based on the pnOrder.
                    //We need to total the amount of identical numerals to compare to the pnOrder so we know whether to add or subtract.
                    repeatCounter++;
                }

            }

            return returnValue;

        };

        return Roman;
    }



    if(typeof(Roman) === 'undefined'){
        window.Roman = createRoman();
    }
    else {
        console.log("Roman already defined.")
    }

//TODO: Define methods for string/number objects
    Number.prototype.convertTo = function() {
        return Roman.convertTo(this);
    };

    String.prototype.convertTo = function() {
        return Roman.convertTo(parseInt(this));
    };

})(window);

