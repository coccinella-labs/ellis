import * as readline from 'readline';
import { generateTextCompletion } from './gemini';
import * as fs from 'fs';

interface EditorOptions {
  mode: 'word' | 'sentence' | 'paragraph';
  style: 'casual' | 'formal' | 'creative' | 'technical';
  initialContent?: string;
  outputFile?: string;
}

export class TextEditor {
  private text: string = '';
  private mode: 'word' | 'sentence' | 'paragraph';
  private style: 'casual' | 'formal' | 'creative' | 'technical';
  private outputFile?: string;
  private rl: readline.Interface;
  private suggestion: string = '';
  private isGenerating: boolean = false;

  constructor(options: EditorOptions) {
    this.mode = options.mode;
    this.style = options.style;
    this.text = options.initialContent || '';
    this.outputFile = options.outputFile;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.rl.on('line', async (input) => {
      await this.handleInput(input);
    });

    this.rl.on('SIGINT', () => {
      this.saveAndExit();
    });
  }

  private async handleInput(input: string) {
    if (input === '.exit' || input === '.quit') {
      this.saveAndExit();
      return;
    }

    if (input === '.save') {
      this.saveFile();
      this.rl.prompt();
      return;
    }

    if (input === '.help') {
      this.showHelp();
      this.rl.prompt();
      return;
    }

    // If there's a suggestion and user pressed Enter on empty input, accept it
    if (this.suggestion && input.trim() === '') {
      this.text += this.suggestion + '\n';
      this.suggestion = '';
      this.rl.prompt();
      return;
    }

    // Clear any previous suggestion
    if (this.suggestion) {
      this.suggestion = '';
    }

    // Add the input to our text
    this.text += input + '\n';

    // Generate AI suggestion
    await this.generateSuggestion();

    this.rl.prompt();
  }

  private async generateSuggestion() {
    if (this.isGenerating) return;

    this.isGenerating = true;

    try {
      this.suggestion = await generateTextCompletion(
        this.text,
        this.mode,
        this.style
      );

      if (this.suggestion) {
        console.log(this.suggestion);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      this.isGenerating = false;
    }
  }

  private showHelp() {
    console.log('Commands:');
    console.log('  .help  - Show help');
    console.log('  .save  - Save to file');
    console.log('  .exit  - Save and exit');
    console.log('  Ctrl+C - Save and exit');
    console.log('Suggestions:');
    console.log('  Type text + Enter for suggestions');
    console.log('  Empty Enter accepts suggestion');
    console.log('  New text gets fresh suggestions');
  }

  private saveFile() {
    if (!this.outputFile) {
      console.log('No output file. Use --output flag.');
      return;
    }

    try {
      fs.writeFileSync(this.outputFile, this.text);
      console.log(`Saved: ${this.outputFile}`);
    } catch (error) {
      console.error(`Save failed: ${error}`);
    }
  }

  private saveAndExit() {
    if (this.text.trim()) {
      this.saveFile();
    }
    this.rl.close();
    process.exit(0);
  }

  async start() {
    console.log('Type text + Enter for suggestions. .help for commands.');
    if (this.text) {
      console.log(this.text);
    }

    this.rl.prompt();
  }
}
