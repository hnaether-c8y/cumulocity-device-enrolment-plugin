import { DeviceEnrolmentViewComponent } from './device-enrolment-view.component';
import { of } from 'rxjs';

describe('DeviceEnrolmentViewComponent', () => {
  const date = new Date();
  let component: DeviceEnrolmentViewComponent;
  let inventoryMock: any;
  let assetPropertiesServiceMock: any;
  let clipboardServiceMock: any;
  let assetPropertiesViewServiceMock: any;

  beforeEach(() => {
    inventoryMock = { detail: jest.fn() };
    assetPropertiesServiceMock = { getCustomProperties: jest.fn() };
    clipboardServiceMock = { transform: jest.fn() };
    assetPropertiesViewServiceMock = {
      getRegistrationCode: jest.fn(),
    };
    jest.useFakeTimers();

    component = new DeviceEnrolmentViewComponent(
      inventoryMock,
      assetPropertiesServiceMock,
      clipboardServiceMock,
    );
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });
});
