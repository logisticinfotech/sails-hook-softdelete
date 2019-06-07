/**
 * jobqueue hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
module.exports = function jobqueue(sails) {

  return {
    initialize: async function () {
      // sails
      // .after(['hook:userhooks:loaded'], function() {
      //   // init();
      //   console.error('gyu ho ', sails.models);
      // });
      //   var hook = this;
      var eventsToWaitFor = [];
      if (sails.hooks.orm) {
        eventsToWaitFor.push('hook:orm:loaded');
      }

      if (sails.hooks.pubsub) {
        eventsToWaitFor.push('hook:pubsub:loaded');
      }

      sails.after(eventsToWaitFor, function () {
        sails.log.info(" 🍺   Logistic Infotech's sails-hook-softdelete loaded 🍺  ");
        init();
      });
    }
  };

  function init() {
    _(sails.models)
      .forEach(function (model) {
        if (model.softDelete) {
          console.log('gyu ho ', model.attributes);
          _.extend(model.attributes, {
            deletedAt1: {
              type: 'datetime',
              defaultsTo: null
            }
          });
        }
      });
  }

};
