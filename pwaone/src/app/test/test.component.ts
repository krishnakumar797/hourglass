import { Component } from '@angular/core';
import { TestModel } from './test.model';
import { TestDB } from './test.db';
import { v1 } from 'uuid';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent {
  title = 'My Component';
  private testDB: TestDB;

  constructor() {
    this.testDB = new TestDB();
  }

  public logForm(testModel: TestModel): void {
    this.testDB.transaction('rw', this.testDB.testModel, async () => {
      // generating random number
      testModel.uid = v1();
      testModel.time = Date.now();
      await this.testDB.testModel.add(testModel);
      this.requestSync();
    });
  }

  requestSync() {
    navigator.serviceWorker.ready.then(swRegistration => swRegistration.sync.register('test_updated'));
  }
}
