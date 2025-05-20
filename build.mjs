import esbuild from 'esbuild';
import path from 'path';

const watch = process.argv.includes('--watch');

const sharedConfig = {
  bundle: true,
  minify: !watch,
  sourcemap: watch ? 'inline' : false,
  logLevel: 'info',
  loader: { '.js': 'jsx', '.ts': 'tsx' }, // Process .js and .ts files with jsx/tsx loader
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
};

async function build() {
  try {
    // Example: content script
    // await esbuild.build({
    //   ...sharedConfig,
    //   entryPoints: ['src/content.ts'],
    //   outfile: 'dist/content.js',
    // });

    // Sidebar (React app)
    await esbuild.build({
      ...sharedConfig,
      entryPoints: ['src/sidebar/index.tsx'],
      outfile: 'dist/sidebar/index.js',
      platform: 'browser', // Target browser environment
      define: {
        'process.env.NODE_ENV': watch ? '\"development\"' : '\"production\"',
      },
    });

    // Background script
    await esbuild.build({
      ...sharedConfig,
      entryPoints: ['src/background/index.ts'],
      outfile: 'dist/background/index.js',
      platform: 'browser', // Or 'node' if it doesn't interact with browser APIs directly much
                         // For sidePanel API, 'browser' is appropriate.
    });

    console.log('Build successful!');
    if (watch) {
      console.log('Watching for changes...');
    }
  } catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
  }
}

build();

if (watch) {
  const chokidar = await import('chokidar');
  chokidar.watch('src/**/*', { ignored: /node_modules|dist/ , ignoreInitial: true}).on('all', (event, pathValue) => { // Renamed path to pathValue to avoid conflict with path module
    console.log(`File ${pathValue} ${event}. Rebuilding...`);
    build();
  });
} 