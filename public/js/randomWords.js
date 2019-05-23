

'use strict'

var $noun = $('#Noun');
var $Verb = $('#Verb');
var $Adjective = $('#Adjective');
var $Adverb = $('#Adverb');
var $Pronoun = $('#Pronoun');
var $Preposition = $('#Preposition');
var $Conjunction = $('#Conjunction');
var $Determiner = $('#Determiner');
var $Exclamation = $('#Exclamation');

var getWord = function(num, collec){
	firebase.firestore().collection(collec).where("num", "==", num)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            $("#"+collec).html(doc.data().word);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}

var refresh = function(){
	var Noun = Math.floor((Math.random() * 2542) + 1);
	var Verb = Math.floor((Math.random() * 1001) + 1);
	var Adjective = Math.floor((Math.random() * 839) + 1);
	var Adverb = Math.floor((Math.random() * 340) + 1);
	var Pronoun = Math.floor((Math.random() * 46) + 1);
	var Preposition = Math.floor((Math.random() * 96) + 1);
	var Conjunction = Math.floor((Math.random() * 38) + 1);
	var Determiner = Math.floor((Math.random() * 45) + 1);
	var Exclamation = Math.floor((Math.random() * 13) + 1);

	getWord(Noun, "Noun");
	getWord(Verb, "Verb");
	getWord(Adjective, "Adjective");
	getWord(Adverb, "Adverb");
	getWord(Pronoun, "Pronoun");
	getWord(Preposition, "Preposition");
	getWord(Conjunction, "Conjunction");
	getWord(Determiner, "Determiner");
	getWord(Exclamation, "Exclamation");
}

var $update = $('#submit');

$($update).on("click", function(){
	refresh();
});	

$(document).ready(function(){
	refresh();
})

$('#textarea').bind('keyup', function(e) {
	var period = 190;
	 var code = e.which;
	 console.log(code);

	if(code == period){
		refresh();
	}
	
});

$.fn.getCursorPosition = function() {  
    var el = $(this).get(0);  
    var pos = 0;  
    if ('selectionStart' in el) {  
        pos = el.selectionStart;  
    } else if ('selection' in document) {  
        el.focus();  
        var Sel = document.selection.createRange();  
        var SelLength = document.selection.createRange().text.length;  
        Sel.moveStart('character', -el.value.length);  
        pos = Sel.text.length - SelLength;  
    }  
    return pos;  
} 
     
$.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

var insertWord = function(word){
	var curr = $('#textarea').getCursorPosition();
	console.log($('#textarea').getCursorPosition());
	if($('#textarea').val().trim().charAt($('#textarea').val().trim().length-1)=="." || $('#textarea').val().trim().length == 0){
		if(!$('#textarea').focus()){
			$('#textarea').focus();
		}
		$('#textarea').val(insertAtCursor($('#textarea').val(),toUpp(word.text()),curr));
		$('#textarea').selectRange((curr + word.text().length));
	} else {
		if(!$('#textarea').focus()){
			$('#textarea').focus();
		}
		$('#textarea').val(insertAtCursor($('#textarea').val(),word.text(),curr));
		$('#textarea').selectRange((curr + word.text().length));
		// $('#textarea').val($('#textarea').val()+$noun.text());
	}
}

var toUpp = function(text) {
	return text.substr(0,1).toUpperCase() + text.substr(1);
};
var insertAtCursor = function(text, word, pos){
	return text.substr(0,pos)+word+text.substr(pos);
};

($noun).on('click', function(){
	insertWord($noun);
})
$Verb.on('click', function(){
	insertWord($Verb);
})
$Adjective.on('click', function(){
	insertWord($Adjective);
})
$Adverb.on('click', function(){
	insertWord($Adverb);
})	
$Pronoun.on('click', function(){
	insertWord($Pronoun);
})
$Preposition.on('click', function(){
	insertWord($Preposition);
})
$Conjunction.on('click', function(){
	insertWord($Conjunction);
})
$Determiner.on('click', function(){
	insertWord($Determiner);
})
$Exclamation.on('click', function(){
	insertWord($Exclamation);
})


$('#textarea').bind('keypress', function(e) {
	 var code = e.which;

	 switch(code){
	 	case 49:
	 		insertWord($noun);
	 		e.preventDefault();
	 		break;
	 	case 50:
	 		insertWord($Verb);
	 		e.preventDefault();
	 		break;
 		case 51:
	 		insertWord($Adjective);
	 		e.preventDefault();
	 		break;
 		case 52:
	 		insertWord($Adverb);
	 		e.preventDefault();
	 		break;
 		case 53:
	 		insertWord($Pronoun);
	 		e.preventDefault();
	 		break;
 		case 54:
	 		insertWord($Preposition);
	 		e.preventDefault();
	 		break;
 		case 55:
	 		insertWord($Conjunction);
	 		e.preventDefault();
	 		break;
 		case 56:
	 		insertWord($Determiner);
	 		e.preventDefault();
	 		break;
 		case 57:
	 		insertWord($Exclamation);
	 		e.preventDefault();
	 		break;
 		case 48:
 			refresh();
			e.preventDefault();
		break;

	 }

});


// var n = 0;
// var v = 0;
// var j = 0;
// var r = 0;
// var p = 0;
// var prep = 0;
// var c = 0;
// var a = 0;
// var u = 0;
// var d = 0;

// var addPreposition = function(data) {
//   var collection = firebase.firestore().collection('Preposition');
//   return collection.add(data);
// };

// var addNoun = function(data) {
//   var collection = firebase.firestore().collection('Noun');
//   return collection.add(data);
// };
// var addVerb = function(data) {
//   var collection = firebase.firestore().collection('Verb');
//   return collection.add(data);
// };
// var addAdjective = function(data) {
//   var collection = firebase.firestore().collection('Adjective');
//   return collection.add(data);
// };
// var addAdverb = function(data) {
//   var collection = firebase.firestore().collection('Adverb');
//   return collection.add(data);
// };
// var addPronoun = function(data) {
//   var collection = firebase.firestore().collection('Pronoun');
//   return collection.add(data);
// };

// var addConjunction = function(data) {
//   var collection = firebase.firestore().collection('Conjunction');
//   return collection.add(data);
// };
// var addDeterminer = function(data) {
//   var collection = firebase.firestore().collection('Determiner');
//   return collection.add(data);
// };
// var addExclamation = function(data) {
//   var collection = firebase.firestore().collection('Exclamation');
//   return collection.add(data);
// };
// var addDeterminer = function(data) {
//   var collection = firebase.firestore().collection('Determiner');
//   return collection.add(data);
// };



// $.getJSON("rand.json", function(data){

//  should have used switch statement...................
// 		for(var i =0; i<data.length-1;i++){
// 			// console.log(data[i].pos);
// 			if(data[i].pos=="n"){
// 				n++;
// 				addNoun({
// 					"num":n,
// 					"word":data[i].word
// 				});

// 			} else if(data[i].pos=="v"){
// 				v++;
// 				addVerb({
// 					"num":v,
// 					"word":data[i].word
// 				});

// 			} else if(data[i].pos=="j"){
// 				j++;
// 				addAdjective({
// 					"num":j,
// 					"word":data[i].word
// 				});

// 			} else if(data[i].pos=="r"){
// 				r++;
// 				addAdverb({
// 					"num":r,
// 					"word":data[i].word
// 				});

// 			} else if(data[i].pos=="p"){
// 				p++;
// 				addPronoun({
// 					"num":p,
// 					"word":data[i].word
// 				});

// 			} else if(data[i].pos=="i"){
// 				prep++;
// 				addPreposition({
// 					"num":prep,
// 					"word":data[i].word
// 				});

// 			} else if(data[i].pos=="c"){
// 				c++;
// 				addConjunction({
// 					"num":c,
// 					"word":data[i].word
// 				});

// 			} else if(data[i].pos=="a"){
// 				a++;
// 				addDeterminer({
// 					"num":a,
// 					"word":data[i].word
// 				});

// 			} else if(data[i].pos=="u"){
// 				u++;
// 				addExclamation({
// 					"num":u,
// 					"word":data[i].word
// 				});

			// } else 
		// 	if(data[i].pos=="d" || data[i].pos=="a"){
		// 		d++;
		// 		addDeterminer({
		// 			"num":d,
		// 			"word":data[i].word
		// 		});

		// 	} 

		// }
// 			console.log("n "+n);
// 			console.log("v "+v);
// 			console.log("j "+j);
// 			console.log("r "+r);
// 			console.log("p "+p);
// 			console.log("i "+prep);
// 			console.log("c "+c);
			// console.log("d "+(d));
// 			console.log("u "+u);

	// });
