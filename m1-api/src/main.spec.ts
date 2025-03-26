import { NestFactory } from '@nestjs/core';
import { mock } from 'jest-mock-extended';
import { AppModule } from './app.module';
import 'dotenv/config';

jest.mock('@nestjs/core');

describe('Main', () => {
  it('should create NestJS application, enable CORS, and listen on the specified port', async () => {
    const mockApp = mock();
    const mockAppListen = jest.fn();

    const mockCreate = jest
      .spyOn(NestFactory, 'create')
      .mockImplementation(async () => mockApp);

    mockApp.enableCors.mockReturnValue(mockApp);
    mockApp.listen.mockImplementation(mockAppListen);

    process.env.API_PORT = '3000';
    expect(mockCreate).toHaveBeenCalledWith(AppModule);
    expect(mockApp.enableCors).toHaveBeenCalled();
    expect(mockAppListen).toHaveBeenCalledWith(3000);
  });
});
