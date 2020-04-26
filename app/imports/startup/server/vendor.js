import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Vendors } from '../../api/vendor/vendor.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.vendorName} (${data.owner})`);
  Vendors.insert(data);
}

/** Initialize the collection if empty. */
if (Vendors.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendors.');
    Meteor.settings.defaultVendors.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Vendors', function publish() {
 if (this.userId) {
    return Vendors.find();
    }
 return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('VendorsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Vendors.find();
  }
  return this.ready();
});
