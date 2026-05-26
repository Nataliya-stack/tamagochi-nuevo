const avatarImg = document.getElementById('pet-avatar'); 
const nameEl = document.getElementById('pet-name');
const container = document.getElementById('stats-container');
const gameOverMsg = document.getElementById('game-over-msg');

const btnAlimentar = document.getElementById('btn-alimentar');
const btnJugar = document.getElementById('btn-jugar');
const btnDormir = document.getElementById('btn-dormir');
const btnDuchar = document.getElementById('btn-duchar');
const btnReprender = document.getElementById('btn-reprender');
const btnAcariciar = document.getElementById('btn-acariciar');

const panelBotones = document.getElementById('panel-botones');
const btnReiniciar = document.getElementById('btn-reiniciar');

const STATS_MAP = [
    { label: 'SALUD', key: 'salud' },
    { label: 'FELICIDAD', key: 'felicidad' },
    { label: 'LIMPIEZA', key: 'limpieza' },
    { label: 'ENERGIA', key: 'energia' }
];

let cicloVidaInterval = null;

const game = {
    clamp: (value) => Math.max(0, Math.min(10, value)),

    iniciarCiclo: () => {
        clearInterval(cicloVidaInterval); 
        
        cicloVidaInterval = setInterval(() => {
            tamagotchi.salud = game.clamp(tamagotchi.salud - 1);
            tamagotchi.felicidad = game.clamp(tamagotchi.felicidad - 1);
            tamagotchi.limpieza = game.clamp(tamagotchi.limpieza - 1);
            tamagotchi.energia = game.clamp(tamagotchi.energia - 1);    
            game.render();
        }, 5000);
    },

    render: () => {
        avatarImg.src = tamagotchi.avatar;
        nameEl.innerText = tamagotchi.nombre;
        
        container.classList.remove('hidden'); 

        container.innerHTML = STATS_MAP.map(s => `
            <div class="flex flex-nowrap items-center justify-between w-full mb-3 text-base sm:text-lg font-bold tracking-wider uppercase whitespace-nowrap">
                <span class="min-w-20 shrink-0 text-left">${s.label}:</span>
                <span class="stars flex flex-nowrap items-center justify-end -space-x-0.3 min-w-0 flex-1 text-sm sm:text-xl overflow-hidden"">${"☀️".repeat(tamagotchi[s.key])}</span>
            </div>
        `).join('');

        if (tamagotchi.salud === 0 || tamagotchi.felicidad === 0 || tamagotchi.limpieza === 0 || tamagotchi.energia === 0) {
            game.detenerJuego();
        }
    },

    detenerJuego: () => {
        clearInterval(cicloVidaInterval);     
    
        gameOverMsg.classList.remove('hidden');
        tamagotchi.avatar = tamagotchi.estados["morir"];
        avatarImg.src = tamagotchi.avatar;

        panelBotones.classList.add('hidden');
        btnReiniciar.classList.remove('hidden');
    },

    cambiarAvatar: (nuevoEstado) => {
        tamagotchi.avatar = tamagotchi.estados[nuevoEstado];
        game.render();
    },

    reiniciarJuego: () => {
        console.log("¡Кнопка нажата! Работает!");
    tamagotchi.reiniciarStats();     
    gameOverMsg.classList.add('hidden');
    btnReiniciar.classList.add('hidden');
    panelBotones.classList.remove('hidden');
    game.render();
    game.iniciarCiclo(); 
    }
};

const accionAlimentar = () => {
    tamagotchi.energia = game.clamp(tamagotchi.energia + 3);
    tamagotchi.felicidad = game.clamp(tamagotchi.felicidad + 2);
    tamagotchi.limpieza = game.clamp(tamagotchi.limpieza - 1);
    game.cambiarAvatar('alimentar'); 
};

const accionJugar = () => {
    tamagotchi.felicidad = game.clamp(tamagotchi.felicidad + 2);
    tamagotchi.energia = game.clamp(tamagotchi.energia - 2);
    tamagotchi.limpieza = game.clamp(tamagotchi.limpieza - 2);
    game.cambiarAvatar('jugar'); 
};

const accionDormir = () => {
    tamagotchi.energia = game.clamp(tamagotchi.energia + 5);
    tamagotchi.salud = game.clamp(tamagotchi.salud + 2);
    game.cambiarAvatar('dormir');
};

const accionDuchar = () => {
    tamagotchi.salud = game.clamp(tamagotchi.salud + 3);
    tamagotchi.limpieza = game.clamp(tamagotchi.limpieza + 10); 
    game.cambiarAvatar('duchar');
};

const accionReprender = () => {
    tamagotchi.felicidad = game.clamp(tamagotchi.felicidad - 3);
    game.cambiarAvatar('reprender');
};

const accionAcariciar = () => {
    tamagotchi.felicidad = game.clamp(tamagotchi.felicidad + 4);
    game.cambiarAvatar('acariciar');
};

btnAlimentar.addEventListener('click', accionAlimentar);
btnJugar.addEventListener('click', accionJugar);
btnDormir.addEventListener('click', accionDormir);
btnDuchar.addEventListener('click', accionDuchar);
btnReprender.addEventListener('click', accionReprender);
btnAcariciar.addEventListener('click', accionAcariciar);
btnReiniciar.addEventListener('click', () => {
    game.reiniciarJuego();
});

game.iniciarCiclo();
game.render();
