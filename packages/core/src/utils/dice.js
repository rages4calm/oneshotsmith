// Simple dice roller and parser
export function rollDice(notation) {
    // Parse notation like "2d6+3"
    const match = notation.match(/(\d+)d(\d+)([+-]\d+)?/);
    if (!match)
        return 0;
    const [, numDice, dieSize, modifier] = match;
    const num = parseInt(numDice, 10);
    const size = parseInt(dieSize, 10);
    const mod = modifier ? parseInt(modifier, 10) : 0;
    let total = mod;
    for (let i = 0; i < num; i++) {
        total += Math.floor(Math.random() * size) + 1;
    }
    return total;
}
export function abilityModifier(score) {
    return Math.floor((score - 10) / 2);
}
