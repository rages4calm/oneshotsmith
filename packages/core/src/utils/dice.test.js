import { describe, it, expect } from "vitest";
import { rollDice, abilityModifier } from "./dice";
describe("rollDice", () => {
    it("should roll 1d6 within valid range", () => {
        for (let i = 0; i < 100; i++) {
            const result = rollDice("1d6");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(6);
        }
    });
    it("should roll 2d6+3 within valid range", () => {
        for (let i = 0; i < 100; i++) {
            const result = rollDice("2d6+3");
            expect(result).toBeGreaterThanOrEqual(5); // 2+3
            expect(result).toBeLessThanOrEqual(15); // 12+3
        }
    });
    it("should handle modifiers correctly", () => {
        for (let i = 0; i < 100; i++) {
            const result = rollDice("1d20-2");
            expect(result).toBeGreaterThanOrEqual(-1); // 1-2
            expect(result).toBeLessThanOrEqual(18); // 20-2
        }
    });
});
describe("abilityModifier", () => {
    it("should calculate correct modifiers", () => {
        expect(abilityModifier(8)).toBe(-1);
        expect(abilityModifier(10)).toBe(0);
        expect(abilityModifier(11)).toBe(0);
        expect(abilityModifier(12)).toBe(1);
        expect(abilityModifier(14)).toBe(2);
        expect(abilityModifier(16)).toBe(3);
        expect(abilityModifier(18)).toBe(4);
        expect(abilityModifier(20)).toBe(5);
    });
});
