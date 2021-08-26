#!/usr/bin/env node
import { exec } from 'shelljs';
import { program } from 'commander';
import * as Configstore from 'configstore';

const STORE = new Configstore('example-config-store');

const cli = () => {
  program
    .version('0.0.1')
    .option(
      '-e, --example <example>',
      'This is the description of the global cli option',
      'example default value'
    );

  program
    .command('example-command-1 <required1> <required2>')
    .alias('example-alias-1')
    .description('This is the command description')
    .action((required1, required2) => {
      exec(`echo ${required1}, ${required2}`);
    });

  program
    .command('example-command-2')
    .alias('example-alias-2')
    .option(
      '-oo, --optionalOption [optionalOption]',
      'An optional option for this command'
    )
    .option(
      '-ro, --requiredOption <requiredOption>',
      'A required option for this command'
    )
    .description('This is the command description')
    .action(options => {
      exec(`echo ${options.optionalOption}, ${options.requiredOption}`);
    });

  program
    .command('set-config <key> [value]')
    .alias('sc')
    .description('Set a config key/value pair')
    .action((key, value) => {
      STORE.set(key, value);
      console.log(`Set ${key} to ${value} in the config file.`);
    });

  program
    .command('config')
    .alias('conf')
    .description('View CLI config defaults.')
    .action(() => {
      console.log(STORE.all);
    });

  program.parse(process.argv);
};

cli();
