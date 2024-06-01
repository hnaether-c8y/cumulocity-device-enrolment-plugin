import { DeviceEnrolmentViewService } from './device-enrolment-view.service';
import { of } from 'rxjs';

describe('DeviceEnrolmentViewService', () => {
  let service: DeviceEnrolmentViewService;
  let c8yApiMock: any;

  const response = {
    status: 200,
    data: [
      {
        count: 2349,
        creationTime: '2024-02-01T05:39:26.300Z',
        firstOccurrenceTime: '2024-02-01T05:39:26.298Z',
        id: '7094',
        lastUpdated: '2024-02-07T08:34:18.687Z',
        text: 'test',
        time: '2024-02-07T08:34:18.681Z',
        type: 'test'
      }
    ]
  };

  beforeEach(async () => {
    c8yApiMock = { list: jest.fn() };

    service = new DeviceEnrolmentViewService(
      c8yApiMock,
    );
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve  the alarms with status 200', async () => {
    // given
    const spyOnList = jest.spyOn(c8yApiMock, 'list').mockReturnValue(Promise.resolve(response));

    // when
    const obj = await service.getRegistrationCode('dummy');

    // expect
    expect(spyOnList).toBeCalledTimes(1);
    expect(obj.length).toBe(1);
    expect(spyOnList).toHaveBeenCalledWith('dummy');
  });

});
