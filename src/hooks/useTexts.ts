
import { texts, TextKeys } from '@/config/texts';

export const useTexts = () => {
  return texts;
};

// Helper function para acessar textos aninhados
export const getText = (path: string): string => {
  const keys = path.split('.');
  let result: any = texts;
  
  for (const key of keys) {
    result = result[key];
    if (result === undefined) {
      console.warn(`Text key not found: ${path}`);
      return path;
    }
  }
  
  return result;
};
