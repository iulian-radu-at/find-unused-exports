import * as fs from 'fs';
import { log } from './log';

export const readJsonFile = (path: string): { [kes: string]: any } | undefined => {
  if (fs.existsSync(path) === false) {
    return undefined;
  }

  try {
    let content = fs.readFileSync(path, 'utf8');
    /* we remove the comments from it */
    content = content.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => (g ? '' : m));
    return JSON.parse(content);
  } catch (e) {
    log(`Error parsing "${path}"`, e.message ?? e);
    return undefined;
  }
};

export const readFile = (path: string): string => fs.readFileSync(path, 'utf8');

export const isDirectory = (path: string): boolean => {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (error) {
    return false;
  }
};

export const isFile = (path: string): boolean => {
  try {
    return fs.lstatSync(path).isFile();
  } catch (error) {
    return false;
  }
};
