const player1 = {
    NOME: 'Mario',
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};
const player2 = {
    NOME: 'Luigi',
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let results;

    switch (true) {
        case random < 0.33:
            results = 'RETA';
            break;
        case random < 0.66:
            results = 'CURVA';
            break;
        default:
            results = 'CONFRONTO';
    }

    return results
}


async function logRollResults(characterName, block, diceResults, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResults} + ${attribute} = ${diceResults + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // rolar dados
        let diceResults1 = await rollDice()
        let diceResults2 = await rollDice()

        //teste de habilidades
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === 'RETA') {
            totalTestSkill1 = diceResults1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResults2 + character2.VELOCIDADE;

            await logRollResults(character1.NOME, 'velocidade', diceResults1, character1.VELOCIDADE);
            await logRollResults(character2.NOME, 'velocidade', diceResults2, character2.VELOCIDADE);
        }
        if (block === 'CURVA') {
            totalTestSkill1 = diceResults1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResults2 + character2.MANOBRABILIDADE;

            await logRollResults(character1.NOME, 'manobrabilidade', diceResults1, character1.MANOBRABILIDADE);
            await logRollResults(character2.NOME, 'manobrabilidade', diceResults2, character2.MANOBRABILIDADE);
        }
        if (block === 'CONFRONTO') {
            let powerResults1 = diceResults1 + character1.PODER
            let powerResults2 = diceResults2 + character2.PODER

            console.log(`${character1.NOME} confrontou ${character2.NOME} 🥊`)

            await logRollResults(character1.NOME, 'poder', diceResults1, character1.PODER);
            await logRollResults(character2.NOME, 'poder', diceResults2, character2.PODER);

            if(powerResults2 > powerResults1 && powerResults1 > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`)
                character1.PONTOS--;
            }

            if(powerResults1 > powerResults2 && powerResults2 > 0){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`)
                character2.PONTOS--;
            }

            console.log(powerResults1 === powerResults2 ? 'Confronto empatado! Nenhum ponto foi perdido' : '');
        }

        //verificando o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log('_______________________________________________');
    }
}

async function declareWinner(character1,character2) {
    console.log('Resultado Final:')
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS)
    console.log(`${character1.NOME} venceu a corrida! Parabéns! 🏆`)
    else if(character2.PONTOS > character1.PONTOS)
    console.log(`${character2.NOME} venceu a corrida! Parabéns! 🏆`)
    else console.log('A corrida terminou em empate!');
}


(async function main() {
    console.log(`🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1,player2);
})()