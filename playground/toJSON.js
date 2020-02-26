
const pet = {
    name: 'Hal'
}

pet.toJSON = function () {
    console.log(this);
    this.type = 'dog';
    return this;
}

console.log(JSON.stringify(pet))