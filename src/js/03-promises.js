import Notiflix from 'notiflix';



const form = document.querySelector('form');

form.addEventListener('submit',  onFormSubmit);


function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  
  const delay =Number(formData.get('delay'));
  const step = Number (formData.get('step'));
  const amount = Number (formData.get('amount')); 
  makeCicle(delay, step, amount);
}

function makeCicle(delay, step, amount) {
 
  for (let i = 0; i < amount; i += 1) {
    const position = i;
    
    const p = createPromise(position, delay)
     console.log("🚀 ~ file: 03-promises.js ~ line 35 ~ makeCicle ~ delay", delay)
    console.log("в цикле promise", position)
    p.then(onMakeSuccessMessage).catch(onMakeFailuresMessage)
    delay += step;
  }    
      
}


function createPromise(position, delay) {
console.log("🚀 ~ file: 03-promises.js ~ line 43 ~ createPromise ~ position", position)
  
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  })
   console.log("🚀 ~ file: 03-promises.js ~ line 56 ~ createPromise ~ promise", promise)
  return promise
}
 
  





function onMakeSuccessMessage({position, delay}) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onMakeFailuresMessage({position, delay}) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

