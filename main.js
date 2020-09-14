//select the start game button
document.querySelector(".control-buttons span").onclick = function () {
    "use strict";

    //prompt window to ask for name
    let yourName = prompt("What`s your Name");
    //if name is empty
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';
    } else {
        //set name to your name
        document.querySelector(".name span").innerHTML = yourName;
    }

    //remove splash screen
    document.querySelector('.control-buttons').remove();
};


//Effect duration
let duration = 1000;

//Select blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");
//create Array from game blocks
let blocks = Array.from(blocksContainer.children);

//create range of keys
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

//add order css properity
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    //add click event
    block.addEventListener('click', function () {

        //trigger the flip function
        flipBlock(block);
    });


});

//flip block function
function flipBlock(selectedBlock) {
    //add class is-flipped 
    selectedBlock.classList.add('is-flipped');

    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //if there is two selected blocks
    if (allFlippedBlocks.length === 2) {


        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}


//stop clicking function  
function stopClicking() {
    //Add class no clicking on main container
    blocksContainer.classList.add('no-clicking');
    setTimeout(() =>{
         //remove class no clickingafter duration
                blocksContainer.classList.remove('no-clicking');

},duration)};


//check Matched block function
function checkMatchedBlocks(firstBlock, secondBlock){
    
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology){
        
        firstBlock.classList.remove('is-flipped');
         secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('has-match');
         secondBlock.classList.add('has-match');
        
        document.getElementById('success').play();
    }else{
        triesElement.innerHTML = parseInt(triesElement.HTML) +1;
        
        
        
        setTimeout(() => {
            
            firstBlock.classList.remove('is-flipped');
         secondBlock.classList.remove('is-flipped');
        },duration);
        
         document.getElementById('fail').play();
    }
    
    
    
}


//shuffle function
function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        //Decrease length by One
        current--;

        // 1-Save current element in Stash
        temp = array[current];

        //2- current element = Random element
        array[random] = temp;

        //3- Random element = get element

        array[current] = array[random];
    }
    return array;
}
