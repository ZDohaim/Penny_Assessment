import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://zdohaim:123qwe4r@pennyassessmenttest.medkkz5.mongodb.net/?retryWrites=true&w=majority&appName=pennyassessmenttest'
    ),
    LoginModule,
  ],
})
export class AppModule {}
