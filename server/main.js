import { Meteor } from 'meteor/meteor';

import { Aud } from '../imports/collections/aud';
import { Bec } from '../imports/collections/bec';
import { Far } from '../imports/collections/far';
import { Reg } from '../imports/collections/reg';
import { UserScores } from '../imports/collections/userScores';

//Allow users to remove their own profiles
Meteor.users.allow({remove: function () { return true; }});

Meteor.startup(() => {
  /*ServiceConfiguration.configurations.remove({
    service: "twitter"
  });
  ServiceConfiguration.configurations.insert({
    service: "twitter",
    consumerKey: Meteor.settings.public.twitter.consumerKey,
    loginStyle: "popup",
    secret: Meteor.settings.twitter.consumerSecret
  });*/
});
