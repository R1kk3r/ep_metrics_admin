var eejs = require('ep_etherpad-lite/node/eejs')
  , express = require('ep_etherpad-lite/node_modules/express')

exports.expressServer = function(hook, args, cb) {
  args.app.get('/admin/metrics', function(req, res) {
    var render_args = {
      errors: []
    };
    res.send(eejs.require("ep_metrics_admin/templates/admin/metrics.html", render_args))
  })
  
  args.app.use('/admin/metrics/static', express.static(__dirname + '/static'))
}

exports.eejsBlock_adminMenu = function (hook_name, args, cb) {
      var hasAdminUrlPrefix = (args.content.indexOf('<a href="admin/') != -1)
          , hasOneDirDown = (args.content.indexOf('<a href="../') != -1)
              , hasTwoDirDown = (args.content.indexOf('<a href="../../') != -1)
                  , urlPrefix = hasAdminUrlPrefix ? "admin/" : hasTwoDirDown ? "../../" : hasOneDirDown ? "../" : ""
                    ;
                      
                        args.content = args.content + '<li><a href="'+ urlPrefix +'metrics">Metrics informations</a> </li>';
                          return cb();
};
