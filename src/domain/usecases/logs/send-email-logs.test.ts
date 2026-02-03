import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('send-email-logs.ts', () => {
  const mockEmailService = {
    sendEmailWithFilesystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should call sendEmail and saveLog', async () => {
    const resolve = await sendEmailLogs.execute('franco@google.com');

    expect(resolve).toBe(true);
    expect(mockEmailService.sendEmailWithFilesystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: 'low',
      message: 'Log email send',
      origin: 'send-email-logs.ts',
    });
  });

  test('Should log in case of error', async () => {
    mockEmailService.sendEmailWithFilesystemLogs.mockResolvedValue(false);

    const resolve = await sendEmailLogs.execute('franco@google.com');

    expect(resolve).toBe(false);
    expect(mockEmailService.sendEmailWithFilesystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: 'high',
      message: 'Error: Email log not send',
      origin: 'send-email-logs.ts',
    });
  });
});
