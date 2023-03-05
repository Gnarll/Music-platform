import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    await app.listen(5000, () =>
      console.log(`Server is running on port ${PORT}`),
    );
  } catch (e) {
    console.log(e);
  }
};

start();
