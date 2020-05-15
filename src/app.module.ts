import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { database } from './config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MonitorModule } from './monitor/monitor.module';
import { WebhookModule } from './alarm/alarm.module';
import { VersionModule } from './version/version.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    AuthModule,
    UserModule, 
    MonitorModule,
    WebhookModule,
    VersionModule,
    ApplicationModule
  ],
  controllers: [AppController],
})
export class AppModule {}
