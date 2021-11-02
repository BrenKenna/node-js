// Simple class
class Person{

    // Constructor
    constructor(name, age, birth_date) {
        this.name = name;
        this.age = age;
        this.birth_date = birth_date;
    }

    // Getters
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    get_BirthDate() {
        return this.birth_date;
    }

    // Setters
    setName(name) {
        this.name = name;
    }
    setAge(age) {
        this.age = age;
    }
}

// Exports
module.exports = Person;