const generarRandoms = (cant) => {
    console.log('generarRandoms');
    var arr = [];
    for (let i = 0; i < cant; i++) {
        newNumber = Math.floor(Math.random() * (cant - 1) + 1);
        arr.push(newNumber);
    };
    var count = {};
    arr.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    
    return count;
}

//generarRandoms(10);

process.on('Generar', (msg, cant)=> {
    console.log('Generar');
    const sum = generarRandoms(cant)
    process.send(sum)
})