// Sort arrays
array1 = [1, 2, 8, 4, 3];
array2 = ['c', 'd', 'b', 'a'];
array3 = [
    {name: 'Tom', age: 20},
    {name: 'Alex', age: 45},
    {name: 'Dan', age: 30},
    {name: 'Phill', age; 33}
];


// Sort numericall, alphabetically
console.log(array1.sort());
console.log(array2.sort());


// Sort an object by one key value
array3.sort( (person1, person2) => {

    // Fetch name from object
    const name1 = person1.name.toUpperCase();
    const name2 = person2.name.toLocaleLowerCase;

    // Evaluate
    if(name1 < name2){
        return -1;
    }
    if(name1 > name2){
        return 1;
    }
    return 0;
    
});


// Reverse sort an aray
console.log(array2.sort().reverse());