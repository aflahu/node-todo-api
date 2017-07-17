var persons = [1,2,3,4,5]
var total = 0
var berjabat = (persons) => {
    for (var i = 0; i < persons.length; i++) {
      for (var a = i+1; a < persons.length; a++) {
        console.log(i+1,'dengan sa',a+1);
        total++
      }
    }
}
berjabat(persons)
console.log(total);
