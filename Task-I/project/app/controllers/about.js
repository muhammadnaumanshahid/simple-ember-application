import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    //Delete record from FireBase DB
    unsubscribe(subscriber) {
      this.store.findRecord('subscriber',subscriber.id).then(record => {
        record.destroyRecord();
      })
    }
  }
});
