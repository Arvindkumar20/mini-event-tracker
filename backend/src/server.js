import { env } from './config/env.js';
import { connectDB } from './db/connect.js';
import { createApp } from './app.js';

async function bootstrap() {
  await connectDB();
  const app = createApp();
  app.listen(Number(env.PORT), () => {
    console.log(`API ready at http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});