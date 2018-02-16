
///// make argument required

const required = () => {
  throw new Error('argument is required');
}

const divison = (a = required(), b = required()) => a /b;

console.log(divison(10,5))


//compose function
const compose = (...fns) => x => {
  return fns.reduce((acc,fn) => fn(acc),x);
}

const createit = str => str.toUpperCase();
const excalim = str => `${str}!`;

console.log(compose(createit,excalim)('yes'));


//concat in es6
const newArray = [1,2,3,4,5];
const newArrayFuc = (array = required(), newValues = required()) => {
  return [...array, ...newValues];
}

console.log(newArrayFuc(newArray,[2,3,4,5]));


// Learning Javascript "this"
class Person{
  constructor(firstname,lastname){
    this._firstname = firstname;
    this._lastname = lastname;
    this._fullname = '';
  }
  //in order to make a function chainable, we have to use return this;
  fullName(){
      this._fullname = `${this._firstname} ${this._lastname}`
      return this;
  }

  gettingName = () => {
    console.log(this._fullname);
  }
}


const person = new Person('sungmin', 'yi');
console.log(person.fullName())
person.gettingName();


const person2 = {
  firstName:'Sungmin',
  sayHi(){
    return console.log(`Hi, ${this.firstName}`)
  }
}
person2.sayHi();

function myName(){
  return console.log(`${this.firstName}`);
}

person2.myName = myName;
person2.myName();


function yourName(){
  console.log(`${this.firstName}`)
}

yourName.call(person2)
yourName.apply(person2)


const Util = {
  myName(arg){
    console.log(arg);
  },
  CallMyName(arg){
    this.myName(arg);
  }
}



//call && bind
const numbers = [1,2,3,4,5,6];
const slice = numbers.slice.call(numbers,1,4);
console.log(slice)


const count = {
  count:0,
  increment:function(){
  setInterval(() => {
      console.log(this.count++);
    },1000);
  }
};
