const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order - randomPos;
    });
})();

function flipCard(){
 
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');

    if(!hasFlippedCard){
         // check first click on card
         hasFlippedCard = true;
         firstCard = this;

         
    }else{
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
       
    }
}
   function checkForMatch(){
        //do cards match?
     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
          isMatch ? disableCards() : unflipCards();
         
   }

   function disableCards(){
         firstCard.removeEventListener('click', flipCard);
         secondCard.removeEventListener('click', flipCard);

         resetBoard();
   }
   function unflipCards(){
       lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

       resetBoard();
    }, 1500);
   }

   function resetBoard(){
       [hasFlippedCard, lockBoard] = [false, false];
       [firstCard, secondCard] = [null, null];
   }

  


cards.forEach(card => card.addEventListener('click', flipCard));