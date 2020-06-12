const Stack = require('./stack');
const Queue = require('./queue');

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
console.log(display(starTrek));

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

console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
console.log(is_palindrome("Tauhida"));

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

function sortStack(stack, sortedStack = new Stack(), tempStack = new Stack(), largest = 0, prevLargest = 0) {
  if (isEmpty(stack)) {
    return sortedStack;
  } 

  let current = stack.top;
  while (current !== null) {
    if (current.data >= largest) {
      largest = current.data;
    }
    sortedStack.push(current.data);
    current = current.next;
  }

  let sortcurrent = sortedStack.top;
  while (sortcurrent !== null && sortcurrent.next !== prevLargest) {
    if (sortcurrent.data === largest) {
      tempStack.push(sortcurrent.data);
    }
    stack.push(sortcurrent.data);
    sortcurrent = sortcurrent.next;
  }

  let found = tempStack.pop();
  sortedStack.push(found);
  prevLargest = largest;
  largest = 0;

  return sortStack(stack, sortedStack, tempStack, largest, prevLargest);
  
}

console.log(sortStack(starTrek));

// 6)

// 7)

// 8)

// 9)

// 10)