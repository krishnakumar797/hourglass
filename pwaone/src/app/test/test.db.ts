import Dexie from 'dexie';
import { TestModel } from './test.model';

export class TestDB extends Dexie {

  testModel: Dexie.Table<TestModel, string>;

  constructor() {
    super('TestModel');
    this.version(1).stores({
      testModel: 'uid,name,age,address,time'
    });
  }
}
