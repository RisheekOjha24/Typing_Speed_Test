// let typing_speed=(actualWords/totalTimeTaken) * 60;

const typing_ground = document.querySelector('#textarea');
const topscroll=document.querySelector('.navbar');
const btn = document.querySelector('.btn');

const op = document.querySelectorAll('.output');
const score = document.querySelector('#score');
const cw = document.querySelector('#coorect-words');
const accuracy = document.querySelector('#accuracy');
const tt = document.querySelector('#timetaken');

const show_sentence = document.querySelector('#showSentence');
const show_time = document.querySelector('#show-time');

const scrollButton = document.getElementById("scrollButton");
const downscroll = document.querySelector(".end-edge");
let targetPosition;

let scrollEffect=()=>
{
  if(btn.innerText.toLowerCase()=="done")
     {
        targetPosition = downscroll.offsetTop;
     }
  else
  {
    targetPosition = topscroll.offsetTop;
  }
  // Use `smooth scrolling behavior
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });

}

btn.addEventListener('click',()=>
{
    switch(btn.innerText.toLowerCase())
    {
        case "start":
          typing_ground.placeholder="Best Of luck !";
            typing_ground.style.backgroundColor="white";
            typing_ground.removeAttribute('disabled');
            typing_ground.focus();
            scrollEffect();
            startTyping();
            break;
        case "done":
          typing_ground.placeholder = "Full throttle, I see!"
            typing_ground.style.backgroundColor="transparent";
            typing_ground.setAttribute('disabled','true');
             // Calculate the position of the target div
          scrollEffect();
            endTyping();
            break;
    }
}
)  // addEventListener close
const quotes = [
    "Embrace the journey not just the destination",
    "The only way to do great work is to love what you do",
    "Be the change you wish to see in the world",
    "Believe you can and you're halfway there",
    "The future depends on what you do today",
    "In the middle of every difficulty lies opportunity",
    "Your time is limited, don't waste it living someone else's life",
    "The best way to predict the future is to create it",
    "If you are looking for a person to change your life, take a look in the mirror",
    "Life is 10% what happens to us and 90% how we react to it",
    "Make your problems adventures and achieve greatness in every situation in life",
    "Dream big and dare to fail becasue 10 years passed and 10 years will"
  ];

  let startTime, endTime,totalTimeTaken ,sentence_To_Write;

  const startTyping = () =>
  {
    op.forEach((paragraph) => {
      paragraph.innerHTML = ""; // Clear the inner HTML content of paragraphs
      paragraph.style.backgroundColor='transparent';
    });
    let randomNumber = Math.floor(Math.random()*quotes.length);
    show_sentence.innerText=quotes[randomNumber];
    let date= new Date();
    startTime = date.getTime();
    show_time.style.backgroundColor='white';
    btn.innerText = "Done";
    
    showTimer(); 
  }

// step 6
let intervalID,elapsedTime=20;

 const showTimer = () =>
 {
    if(btn.innerText=="Done")
    {
      intervalID = setInterval(()=>
      {
        elapsedTime--;
        show_time.innerHTML = elapsedTime;
        if(elapsedTime==0)
        {
          typing_ground.placeholder="Oops Times Up!";
          typing_ground.style.backgroundColor="transparent";
          scrollEffect();
          endTyping();
        }
        if(elapsedTime<10)
        {
          show_time.style.backgroundColor='red';
          show_time.style.color='white';
        }
      }, 1000)
       
     
    }
    else if(btn.innerText=="Start")
    {
      elapsedTime = 20;
      clearInterval(intervalID);
      show_time.innerHTML = elapsedTime;
    }
  
 }


  const endTyping = () =>
  {
    btn.innerText="Start";
    show_time.style.backgroundColor='white';
    op.forEach((paragraph) => {

      paragraph.style.backgroundColor='transparent';   //important paragraph color bottomm
    });
         typing_ground.setAttribute('disabled','true');
    let date= new Date();
    endTime = date.getTime();

    totalTimeTaken = (endTime - startTime)/1000;
    
   calcTypingSpeed(totalTimeTaken);

    show_sentence.innerText="";       
        typing_ground.value="";

        show_time.style.backgroundColor='white';
          show_time.style.color='black';
      
      showTimer();
    
  }
  
  const errorChecking=(words) =>
  {
    let num=0
    sentence_To_Write=show_sentence.innerHTML;
    sentence_To_Write=sentence_To_Write.trim().split(" ");
    console.log(sentence_To_Write);
    console.log(words);
    for(let i=0;i<words.length;i++)
    {
      if(words[i]==sentence_To_Write[i])
      {
        num++;
        console.log(sentence_To_Write[i]);
      }
    } 
    return num;
  }

  const calcTypingSpeed= (time_taken)=>
  {
    let totalWords=typing_ground.value.trim();
    let actualWords= totalWords===""? 0 : totalWords.split(" ")

    actualWords= errorChecking(actualWords);
    let sentLength= sentence_To_Write.length
    let accuracy_taken = ((actualWords/sentLength)*100).toFixed(1)
      if(actualWords!=0)
      {
          let typingSpeed = Math.round((actualWords/time_taken) * 60);
          // score.innerText=`Your typing speed is ${typingSpeed} WPM & you wrote ${actualWords} words correctly out of ${sentence_To_Write.length} words and time taken ${time_taken} sec`;
          score.innerText=`Typing Speed: ${typingSpeed} WPM`;
          accuracy.innerText=`Accuracy: ${accuracy_taken} %`;
          tt.innerText=`Time Taken: ${time_taken.toFixed(1)} sec`;
          cw.innerText=`Coorect Words: ${actualWords}/${sentLength}`;
      }
      else
      {
            // score.innerText=`Your typing speed is ${typingSpeed} WPM & you wrote ${actualWords} words correctly out of ${sentence_To_Write.length} words and time taken ${time_taken} sec`;
            score.innerText=`Typing Speed: ${0} WPM`;
            accuracy.innerText=`Accuracy: 0 %`;
            tt.innerText=`Time Taken: 0 sec`;
            cw.innerText=`Coorect Words: 0/${sentLength}`;
      }
    }

  





