import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('1. Building production bundle...');
execSync('npm.cmd run build', { stdio: 'inherit' });

// Copy .htaccess, robots.txt, sitemap.xml to dist
['.htaccess', 'public/robots.txt', 'public/sitemap.xml'].forEach(file => {
  if (fs.existsSync(file)) {
    const dest = path.join('dist', path.basename(file));
    fs.copyFileSync(file, dest);
    console.log(`2. Copied ${file} to ${dest}`);
  }
});

console.log('3. Creating cpanel_deploy.zip archive...');
try {
  if (fs.existsSync('cpanel_deploy.zip')) {
    fs.unlinkSync('cpanel_deploy.zip');
  }
  execSync('powershell.exe -Command "Compress-Archive -Path dist/*, dist/.htaccess -DestinationPath cpanel_deploy.zip -Force"', { stdio: 'inherit' });
  console.log('\n=======================================================');
  console.log('SUCCESS: cpanel_deploy.zip generated successfully!');
  console.log('=======================================================');
} catch (e) {
  console.error('Error creating zip:', e.message);
}
