#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { TextEditor } from './editor';
import { config } from 'dotenv';
import { version } from '../package.json';

// Load .env from project root (traverse up from current directory)
function findEnvFile(startDir: string): string | null {
  let currentDir = startDir;
  const root = path.parse(startDir).root;

  while (currentDir !== root) {
    const envPath = path.join(currentDir, '.env');
    if (fs.existsSync(envPath)) {
      return envPath;
    }
    currentDir = path.dirname(currentDir);
  }

  return null;
}

const envPath = findEnvFile(process.cwd()) || path.join(__dirname, '../.env');
config({ path: envPath });

const program = new Command();

program
  .name('autofix')
  .description('AI-powered text completion editor for the command line')
  .version(version);

program
  .command('new')
  .description('Create a new document')
  .option(
    '-m, --mode <mode>',
    'completion mode: word, sentence, paragraph',
    'sentence'
  )
  .option(
    '-s, --style <style>',
    'writing style: casual, formal, creative, technical',
    'casual'
  )
  .option('-o, --output <file>', 'output file path')
  .action(async (options) => {
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY required');
      console.error('Set in .env file or export GEMINI_API_KEY=your_key');
      process.exit(1);
    }

    const editor = new TextEditor({
      mode: options.mode as 'word' | 'sentence' | 'paragraph',
      style: options.style as 'casual' | 'formal' | 'creative' | 'technical',
      outputFile: options.output,
    });

    await editor.start();
  });

program
  .command('edit <file>')
  .description('Edit an existing file')
  .option(
    '-m, --mode <mode>',
    'completion mode: word, sentence, paragraph',
    'sentence'
  )
  .option(
    '-s, --style <style>',
    'writing style: casual, formal, creative, technical',
    'casual'
  )
  .action(async (file, options) => {
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY required');
      console.error('Set in .env file or export GEMINI_API_KEY=your_key');
      process.exit(1);
    }

    if (!fs.existsSync(file)) {
      console.error(`❌ File not found: ${file}`);
      process.exit(1);
    }

    const content = fs.readFileSync(file, 'utf-8');
    const editor = new TextEditor({
      mode: options.mode as 'word' | 'sentence' | 'paragraph',
      style: options.style as 'casual' | 'formal' | 'creative' | 'technical',
      initialContent: content,
      outputFile: file,
    });

    await editor.start();
  });

program.parse(process.argv);
