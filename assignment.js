const Stack = require('./stack');
const Queue = require('./queue');
const DLQueue = require('./dlqueue');
const StackQueue = require('./stackqueue');

// 1)

const starTrek = new Stack();
starTrek.push('Kirk');
starTrek.push('Spock');
starTrek.push('McCoy');
starTrek.push('Scotty');

// 2)

function peek(stack) {
  return stack.top;
}

function isEmpty(stack) {
  return (!stack.top);
}

function display(stack) {
  let current = stack.top;
  let dis = [];
  while (current !== null) {
    dis.push(current.data);
    current = current.next;
  }
  return dis.join(', ');
}

starTrek.pop();
starTrek.pop();
starTrek.push('Scotty');
console.log(display(starTrek)); // 1

// 3)

function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  let revS = '';
  const stack = new Stack();

  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
  }

  let current = stack.top;
  while (current !== null) {
    revS+= stack.pop();
    current = current.next;
  }
  
  return (s === revS);
}

console.log(is_palindrome('dad')); // 2
console.log(is_palindrome('A man, a plan, a canal: Panama')); // 3
console.log(is_palindrome('1001')); // 4
console.log(is_palindrome('Tauhida')); // 5

// 4)

function matchParens(s){
  const stack = new Stack();
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
  }

  let current = stack.top; // we reverse the string, so we need reverse logic too
  while (current !== null) {
    let val = stack.pop();
    if (val === ')') count ++;
    if (val === '(') count --;

    if (count < 0) {
      return 'Missing a )'; 
    }
    current = current.next;
  }
  if (count > 0) {
    return 'Missing a ( ';
  }

  return true;
}

// 5)

function sortStack(stack) {

  if (isEmpty(stack)) {
    return null;
  }

  if (!stack.top.next) {
    return stack;
  }

  let tempStack = new Stack();
  let temp = stack.pop();
  let current = stack.top;
  
  while (current!== null) {
    if (current.data >= temp){
      tempStack.push(temp);
      temp = stack.pop();
    } else {
      tempStack.push(stack.pop());
    }
    current = current.next;
  }

  let tempCurrent = tempStack.top;

  while (tempCurrent !== null) {
    if (tempCurrent.data < temp) {
      stack.push(temp);
      temp = tempStack.pop();
    } else {
      stack.push(tempStack.pop());
    }
    tempCurrent = tempCurrent.next;
  }
  
  stack.push(temp);
  return stack;
}
console.log(display(sortStack(starTrek))); // 6

// 6)

const starTrekQ = new Queue();
starTrekQ.enqueue('Kirk');
starTrekQ.enqueue('Spock');
starTrekQ.enqueue('Uhura');
starTrekQ.enqueue('Sulu');
starTrekQ.enqueue('Checkov');

function peekQ(queue) {
  return queue.first;
}

function isEmptyQ(queue) {
  return (!queue.first);
}

function displayQ(queue) {
  let current = queue.first;
  let dis = [];
  while (current) {
    dis.push(current.data);
    current = current.next;
  }
  return dis.join(', ');
}

starTrekQ.enqueue('Kirk');
starTrekQ.enqueue('Uhura');
starTrekQ.enqueue('Sulu');
starTrekQ.enqueue('Checkov');
starTrekQ.dequeue();
starTrekQ.dequeue();
starTrekQ.dequeue();
starTrekQ.dequeue();
starTrekQ.dequeue();


console.log(displayQ(starTrekQ)); // 7

// 7)

const starTrekDLQ = new DLQueue();
starTrekDLQ.enqueue('Kirk');
starTrekDLQ.enqueue('Uhura');
starTrekDLQ.enqueue('Sulu');
starTrekDLQ.enqueue('Checkov');

console.log(peekQ(starTrekDLQ)); // 8

// 8) implemented in stackqueue.js


// 9)

function squareDance(queue) {
  const spareQueue = new Queue();
  let m = '';
  let f = '';

  let current = queue.first;
  while (current) {


    if (current.data.startsWith('F')) {
      if (f === '') {
        f = current.data.split(' ')[1];
      }
      else {
        spareQueue.enqueue(current.data);
      } 
    }

    if (current.data.startsWith('M')) {

      if (m === '') {
        m = current.data.split(' ')[1];
      }
      else {
        spareQueue.enqueue(current.data);
      } 
    }
    

    if (m && f) {
      console.log(`Female dancer is ${f}, and the male dancer is ${m}`);
      m = '';
      f = '';
    }
    
    if (spareQueue.first) {
      if (spareQueue.first.data.startsWith('M')) {
        if (m === '') {
          m = spareQueue.dequeue();
          m = m.split(' ')[1];
        }
      } else if (spareQueue.first.data.startsWith('F')) {
        if (f === '') {
          f = spareQueue.dequeue();
          f = m.split(' ')[1];
        }
      }
    }
    current = current.next;
  }

  let maleCount = 0;
  let femaleCount = 0;
  let spareCurrent = spareQueue.first;

  while (spareCurrent) {
    //console.log(spareCurrent);
    if (spareCurrent.data.startsWith('M')) {
      maleCount++;
    }
    if (spareCurrent.data.startsWith('F')) {
      femaleCount++;
    }

    spareCurrent = spareCurrent.next;
  }

  if (m) {
    maleCount++;
  }

  if (f) {
    femaleCount++;
  }

  if (maleCount) {
    console.log(`There are ${maleCount} male dancers waiting to dance`);
  }
  if (femaleCount) {
    console.log(`There are ${femaleCount} female dancers waiting to dance`);
  }
}

const testQueue = new Queue();

testQueue.enqueue('F Jane');
testQueue.enqueue('M Frank');
testQueue.enqueue('M John');
testQueue.enqueue('M Sherlock');
testQueue.enqueue('F Madonna');
testQueue.enqueue('M David');
testQueue.enqueue('M Christopher');
testQueue.enqueue('F Beyonce');

console.log(squareDance(testQueue));



// 10)

/* One in every 4 customers are sent back to the end of 
queue.  Therefore, we can determine a rate of how long the line
ends up given a starting point, as long as we know how long
it takes to process each person.

Let's say it takes 15 seconds to process and we start with a
queue of 100.

on average, after minute 1, queue has 97 people.
after minute 5, queue has 85 people 
after minute 15, queue has 55 people 
after minute 22, queue has 22 people in it.  it will now go on forever
until they get their paperwork.

*/
