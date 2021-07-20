import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QcsVerComponent } from './qcs-ver.component';

describe('QcsVerComponent', () => {
  let component: QcsVerComponent;
  let fixture: ComponentFixture<QcsVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcsVerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QcsVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
