import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';

describe('file-system.datasource.ts', () => {
  const logPath: string = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test('Should create logs files if they not exists', () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
  });
});
