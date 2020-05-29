import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { database } from './config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { AlarmModule } from './alarm/alarm.module';
import { VersionModule } from './version/version.module';
import { ApplicationModule } from './application/application.module';
import { FrameworkModule } from './framework/framework.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    AuthModule,
    UserModule, 
    EventsModule,
    AlarmModule,
    VersionModule,
    ApplicationModule,
    FrameworkModule
  ],
  controllers: [AppController],
})
export class AppModule {}
