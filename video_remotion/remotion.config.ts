import { Config } from '@remotion/cli/config';
import fs from 'fs';
import path from 'path';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');

const possibleBrowserPaths = [
  path.resolve(__dirname, '.remotion', 'chrome-headless-shell', 'mac-arm64', 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell'),
  '/Users/juanpablo/Desktop/Indicadores/.remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell',
];

for (const p of possibleBrowserPaths) {
  if (fs.existsSync(p)) {
    Config.setBrowserExecutable(p);
    break;
  }
}
