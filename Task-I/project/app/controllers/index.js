// app/controllers/index.js
import Controller from '@ember/controller';
import {match, not} from '@ember/object/computed';

export default Controller.extend({
  responseMessage: '',
  isSuccess: false,
  emailAddress: '',

  isValid: match('emailAddress', /^.+@.+\..+$/),
  isDisabled: not('isValid'),

  actions: {
    saveInvitation() {
      //Show message while loading (It could be useless because DB save operation is quick enough)
      this.set('isSuccess',false);
      this.set('responseMessage', `Saving of the following email address is in progress: ${this.get('emailAddress')}`);
      this.set('emailAddress', this.get('emailAddress'));
      const newSubscriber = this.store.createRecord('subscriber', {
        email: this.get('emailAddress')
      });
      newSubscriber.save().then(() =>{
        //Wait for DB save, then - show message
        this.set('isSuccess', true);
        this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
        this.set('emailAddress','')
        setTimeout(() => {this.set('responseMessage','')},4000)
      });
    }
  }

});
