import { parse } from "https://deno.land/std/flags/mod.ts";
import { green, red } from "https://deno.land/std/fmt/colors.ts";
import { contract } from "./mod.ts";

const args = parse(Deno.args)._;
const man = `
 optcalc
Calculate approximate delta for a purchased contract.

USAGE:
  optcalc quantity_of_contracts current_contract_price bought_contract_price

EXAMPLE:
  optcalc 10 1.80 0.50
`.trim();

if (args.length < 3) {
  console.log(man);
  Deno.exit(1);
}

const [quantity, currentPrice, boughtPrice] = parse(Deno.args)._;

function numberColorizer(x: number) {
  if (x >= 0) {
    return green;
  }

  return red;
}

function moniesFormat(x: number): string {
  const output = x.toFixed(2);
  const colorize = numberColorizer(x);
  return colorize(output);
}

const monies = contract(quantity, currentPrice, boughtPrice).delta;

if (Number.isNaN(monies)) {
  console.log(man);
  Deno.exit(1);
}

console.log("You netted:", moniesFormat(monies), "$");

Deno.exit(0);
