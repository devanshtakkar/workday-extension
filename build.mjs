import esbuild from 'esbuild';

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

async function createBuildContexts() {
  // Create build contexts for each entry point
  const contexts = [];

  try {
    // Sidebar (React app)
    const sidebarContext = await esbuild.context({
      ...sharedConfig,
      entryPoints: ['src/sidebar/index.tsx'],
      outfile: 'dist/sidebar/index.js',
      platform: 'browser',
      define: {
        'process.env.NODE_ENV': watch ? '\"development\"' : '\"production\"',
      },
    });
    contexts.push(sidebarContext);

    // Popup (React app)
    const popupContext = await esbuild.context({
      ...sharedConfig,
      entryPoints: ['src/popup/index.tsx'],
      outfile: 'dist/popup/index.js',
      platform: 'browser',
      define: {
        'process.env.NODE_ENV': watch ? '\"development\"' : '\"production\"',
      },
    });
    contexts.push(popupContext);

    // Background script
    const backgroundContext = await esbuild.context({
      ...sharedConfig,
      entryPoints: ['src/background/index.ts'],
      outfile: 'dist/background/index.js',
      platform: 'browser',
    });
    contexts.push(backgroundContext);

    return contexts;
  } catch (e) {
    console.error('Failed to create build contexts:', e);
    process.exit(1);
  }
}

async function main() {
  const contexts = await createBuildContexts();
  
  // Initial build
  for (const context of contexts) {
    await context.rebuild();
  }
  
  console.log('Initial build successful!');
  
  if (watch) {
    console.log('Starting esbuild watch mode...');
    
    // Start watching for all contexts
    for (const context of contexts) {
      await context.watch();
    }
    
    console.log('Watching for changes. Press Ctrl+C to exit.');
    
    // Handle process termination
    process.on('SIGINT', async () => {
      console.log('Shutting down watchers...');
      for (const context of contexts) {
        await context.dispose();
      }
      process.exit(0);
    });
  } else {
    // Dispose contexts after the build is complete
    for (const context of contexts) {
      await context.dispose();
    }
  }
}

main().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
}); 