import { describe, test, expect } from "bun:test";

/**
 * Create a simple String calculator that can receive a string with positive values lower than 1000 and sum all the values in that string. The values may be separated by commas, new lines or both. The user can define a custom separator by passing it preceded by "\\" in the first line of the string. If the custom separator nas more than one character is should be contained by square brackets. A list of custom separators can be also define, in that case each separator should be in square brackets. When custom separators are defined, only those should be used in the values string.
 */

function sum (input: string): number {
    if (input === "") {
        return 0;
    }

    const values = input
        .replaceAll("\n", ",")
        .split(",")
        .map(v => Number.parseInt(v));

    if (values.some(v => v < 0)) {
        throw new Error("no negatives allowed.");
    }

    return values.reduce((c, n) => c + n, 0);
}

describe("string calculator", () => {
    test("empty string returns 0", () => {
        const res = sum("");

        expect(res).toBe(0);
    });

    test("single value return the value", () => {
        const res = sum("42");

        expect(res).toBe(42);
    });

    test("csv string return the sum of the values", () => {
        const res = sum("40,1,1");

        expect(res).toBe(42);
    });

    test("new line separated string, return the sum of the values", () => {
        const res = sum("40\n1\n1");

        expect(res).toBe(42);
    });

    test("csv and new line separated string, return the sum of the values", () => {
        const res = sum("40,1\n1");

        expect(res).toBe(42);
    });
    test("negative number, throws an error", () => {
        expect(() => sum("-1,-2\n3")).toThrow(new Error("no negatives allowed."))
    });

    test("number higher than 1000, throws an error", () => {
        expect(() => sum("-1,-2\n3")).toThrow(new Error("bigger than 1000 not allowed."))
    });


    // test("non numerical character throw error", () => {
    //     expect(sum("brito")).toThrow("isso e uma calculadora, sua capivara.")
    // });
});