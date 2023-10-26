const machineLogic = require("./src/machine-logic");

const { Argument, Option, program } = require('commander')

const snacks = ["Biskuit", "Chips", "Oreo", "Tango", "Cokelat"]

const description = `This is a vending machine`;

const snackOptions = new Option("-s, --snack <snack>", "Choose snack")
  .choices(snacks)
  .default(snacks[0]);

program
  .description(description)
  .action(machineLogic)
  .addOption(snackOptions)
  .addArgument(new Argument("[number]", "Input money"));

program.parse(process.argv);

