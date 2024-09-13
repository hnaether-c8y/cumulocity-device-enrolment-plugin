import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import { C8yStepper, ClipboardService, gettext } from '@c8y/ngx-components';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { CdkStep, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormControl } from '@angular/forms';
import { DeviceEnrolmentViewService } from '../device-enrolment-widget/component/device-enrolment-view/device-enrolment-view.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'c8y-device-enrolment',
  templateUrl: 'device-enrolment-modal.component.html',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false }
    }
  ]
})
export class DeviceEnrolmentModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild(C8yStepper, { static: false })
  stepper: C8yStepper;
  @ViewChild(C8yStepper, { read: ElementRef, static: false })
  container: ElementRef;
  success: boolean | undefined = undefined;
  deviceId: string;
  resultControl: FormControl = new FormControl();
  waitOrRetry: string = gettext('Waiting');
  readonly connectSmartphoneTitle: string = gettext('Connect your smartphone to our IoT platform');
  readonly enterDeviceName: string = gettext('Enter the Device name');
  readonly generateCodeTitle: string = gettext(
    'Generate the code.'
  );
  readonly resultTitle: string = gettext('Result');
  private destroyNotifier$ = new Subject<void>();

  codeDevice : string = '';
  codeContainer : string = '';
  errorMessage: string = '';
  externalId: string = this.generateDeviceId();
  isCodeRequestPending: boolean;

  constructor(
    private bsModalRef: BsModalRef,
    private renderer: Renderer2,
    private assetPropertiesViewService: DeviceEnrolmentViewService,
    private clipboardService: ClipboardService
  ) {}

  ngAfterViewInit() {
    this.stepper.selectionChange
      .pipe(throttleTime(100), takeUntil(this.destroyNotifier$))
      .subscribe((stepper: Partial<C8yStepper>) => this.onStepperSelectionChange(stepper));
  }

  ngOnDestroy() {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  onStepperSelectionChange(stepper: Partial<C8yStepper>) {
    const GENERATE_CODE_STEP_INDEX = 2;
    if (stepper.selectedIndex === GENERATE_CODE_STEP_INDEX) {
      if (isEmpty(this.codeDevice) && isEmpty(this.codeContainer)) {
        this.generateCode();
      }
    }
  }

  onComplete() {
    this.stepper.setIndex(3);
    this.success = true;
  }

  generateDeviceId() {
    return 'phone' + Math.floor(Math.random() * 100000);
  }


  back() {
    this.stepper.previous();
  }

  next($event) {
    const { step } = $event as { stepper: C8yStepper; step: CdkStep };
    step.completed = true;
    this.stepper.next();
  }

  cancel() {
    this.bsModalRef.hide();
  }

  retry() {
    this.success = undefined;
    this.waitOrRetry = gettext('Retrying');
    if (this.container) {
      this.renderer.setStyle(this.container.nativeElement, 'display', 'block');
    }
    this.stepper.selectedIndex = 2;
  }

  onFailure() {
    this.resultControl.setErrors({ phoneNotConnected: true });
    this.success = false;
    this.stepper.next();
    if (this.container) {
      this.renderer.setStyle(this.container.nativeElement, 'display', 'none');
    }
  }

  async generateCode() {
    try {
      this.isCodeRequestPending = true;
      const data = await this.assetPropertiesViewService.getRegistrationCode(this.externalId);
      this.isCodeRequestPending = false;
      if (data['error']) {
        this.errorMessage = data['error'];
        this.codeDevice = '';
        this.codeContainer = '';
        this.success = false;
      } else {
        this.codeDevice = data['script'] || '';
        this.codeContainer = data['docker'] || '';
        this.errorMessage = '';
      }
    } finally {
      this.isCodeRequestPending = false;
    }
  }

  copyIt(text) {
    this.clipboardService.writeText(text);
  }
}
