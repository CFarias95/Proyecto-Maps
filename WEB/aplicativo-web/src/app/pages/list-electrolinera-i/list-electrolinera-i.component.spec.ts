import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListElectrolineraIComponent } from './list-electrolinera-i.component';

describe('ListElectrolineraIComponent', () => {
  let component: ListElectrolineraIComponent;
  let fixture: ComponentFixture<ListElectrolineraIComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListElectrolineraIComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListElectrolineraIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
