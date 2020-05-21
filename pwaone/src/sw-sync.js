(function () {
  'use strict';

  importScripts('dexie.min.js');

  const db = new Dexie("TestModel");

  db.version(1).stores({
    testModel: 'uid,name,age,address,time'
  });

  db.open();
  console.log("HERE at synch sw");

  self.addEventListener('sync', function (event) {
     if (event.tag == 'test_updated') {
       console.log("event updated")
       event.waitUntil(serverSync());
     }
  });
  const syncRequest = [];
  async function serverSync() {
    // const syncViewResponse = await fetch('http://localhost:3000/syncdata');
    // const syncView = await syncViewResponse.json();

    // const serverMap = new Map();
    // Object.entries(syncView).forEach(kv => serverMap.set(kv[0], kv[1]));

    // const syncRequest = {
    //   update: [],
    //   remove: [],
    //   get: []
    // };

    // const deleteLocal = [];
    console.log("server synching started");
    await db.testModel.toCollection().each(testModel => {
      console.log("test model "+ testModel);
      syncRequest.push(testModel);
    });

    // // all these ids are not in our local database, fetch them
    // serverMap.forEach((value, key) => syncRequest.get.push(key));

    // // delete local todos
    // let deleted = false;
    // for (const id of deleteLocal) {
    //   await db.todos.delete(id);
    //   deleted = true;
    // }

    // // if no changes end sync
    // if (syncRequest.update.length === 0
    //   && syncRequest.remove.length === 0
    //   && syncRequest.get.length === 0) {
    //   if (deleted) {
    //     return notifyClients();
    //   } else {
    //     return Promise.resolve();
    //   }
    // }

    // send sync request to the server
    const syncResponse = await fetch('/save', {
      method: 'POST',
      body: JSON.stringify(syncRequest),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let successText = await syncResponse.text();
    console.log("Success "+ successText);
    if (syncResponse.status === 200) {
     // const sync = await syncResponse.json();
      console.log("synching finished");
      return Promise.resolve();
      // await db.transaction('rw', db.todos, async () => {
      //   if (sync.get && sync.get.length > 0) {
      //     await db.todos.bulkPut(sync.get);
      //   }

      //   if (sync.updated) {
      //     Object.entries(sync.updated).forEach(async (kv) => await db.todos.update(kv[0], {ts: kv[1]}));
      //   }
      //   if (sync.removed) {
      //     sync.removed.forEach(async (id) => await db.todos.delete(id));
      //   }
      // });
    } else {

    return Promise.reject('sync failed: ' + response.status);
    }
  }

}());
