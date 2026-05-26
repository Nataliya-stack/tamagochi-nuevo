class Tamagotchi {
    constructor (nombre, avatar, estados) {
        this.nombre = nombre;
        this.avatar = avatar; 
        this.estados = estados;
        this.salud = Math.floor(Math.random() * 10) + 1;
        this.felicidad = Math.floor(Math.random() * 10) + 1;
        this.limpieza = Math.floor(Math.random() * 10) + 1;
        this.energia = Math.floor(Math.random() * 10) + 1;
    }

reiniciarStats() {
        this.salud = Math.floor(Math.random() * 10) + 1;
        this.felicidad = Math.floor(Math.random() * 10) + 1;
        this.limpieza = Math.floor(Math.random() * 10) + 1;
        this.energia = Math.floor(Math.random() * 10) + 1;
        this.avatar = this.estados.normal; 
    }
}

////////////////////////////////////////////////////////////////////////////////////

//class Tamagotchi {
    // В скобках указываем новые переменные для приема чисел снаружи
    // constructor (nombre, avatar, estados, saludInicial, felicidadInicial, limpiezaInicial, energiaInicial) {
        //this.nombre = nombre;
        //this.avatar = avatar; 
        //this.estados = estados;
        
        // Просто берем то число, которое нам передали из скобок new Tamagotchi
        //this.salud = saludInicial;
        //this.felicidad = felicidadInicial;
        //this.limpieza = limpiezaInicial;
        //this.energia = energiaInicial;
    //}
//}