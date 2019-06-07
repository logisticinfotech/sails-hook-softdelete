/**
 * jobqueue hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
module.exports = function softdelete(sails) {

  return {
    initialize: async function () {
      //   var hook = this;
      var eventsToWaitFor = [];
      if (sails.hooks.userhooks) {
        eventsToWaitFor.push('hook:userhooks:loaded');
      }

      // // if (sails.hooks.orm) {
      // //   eventsToWaitFor.push('hook:orm:loaded');
      // // }

      // // if (sails.hooks.pubsub) {
      // //   eventsToWaitFor.push('hook:pubsub:loaded');
      // // }

      sails.after(eventsToWaitFor, function () {
        init();
        sails.log.info(" 🍺   Logistic Infotech's sails-hook-softdelete loaded 🍺  ");
      });
    }
  };

  function init() {
    // console.error('init ', sails.models);
    _.each(sails.models, function (model, modelkey) {
      // console.error('init forEach ', model);
      if (model.softDelete) {
        console.log('model.softDelete true found ', modelkey);
        _.extend(model.attributes, {
          deletedAt: {
            type: 'ref',
            columnType: 'datetime',
            defaultsTo: null
          }
        });
      }
    });

  }

};
