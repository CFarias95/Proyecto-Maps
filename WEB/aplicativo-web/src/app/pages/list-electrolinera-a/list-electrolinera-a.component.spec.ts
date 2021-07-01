import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListElectrolineraAComponent } from './list-electrolinera-a.component';

describe('ListElectrolineraAComponent', () => {
  let component: ListElectrolineraAComponent;
  let fixture: ComponentFixture<ListElectrolineraAComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListElectrolineraAComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListElectrolineraAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
