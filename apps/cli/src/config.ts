export interface CLIConfig {
  defaultMode: 'word' | 'sentence' | 'paragraph';
  defaultStyle: 'casual' | 'formal' | 'creative' | 'technical';
  autoSave: boolean;
  suggestionDelay: number;
}

export const defaultConfig: CLIConfig = {
  defaultMode: 'sentence',
  defaultStyle: 'casual',
  autoSave: false,
  suggestionDelay: 1000,
};

export function loadConfig(): CLIConfig {
  // In a real implementation, this would load from a config file
  // For now, return defaults
  return defaultConfig;
}
