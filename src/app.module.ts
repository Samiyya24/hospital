import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    // ConfigModule({envFilePath:'.env', isGlobal:true})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
