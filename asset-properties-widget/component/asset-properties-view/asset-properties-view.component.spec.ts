import { AssetPropertiesViewComponent } from './asset-properties-view.component';
import { of } from 'rxjs';

describe('AssetPropertiesViewComponent', () => {
  const date = new Date();
  let component: AssetPropertiesViewComponent;
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

    component = new AssetPropertiesViewComponent(
      inventoryMock,
      assetPropertiesServiceMock,
      clipboardServiceMock,
    );
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });
});
