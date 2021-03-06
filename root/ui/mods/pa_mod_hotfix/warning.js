(function() {
  var setupDialog = function() {
    $(".{%= name %}_dialog").dialog({
      dialogClass: "no-close",
      draggable: false,
      resizable: false,
      height: 400,
      width: 600,
      modal: true,
      autoOpen: model.buildVersion() != '{%= build %}',
      buttons: {
          "EXIT": function () {
              model.exit();
          },
          "LATER": function () {
              $(this).dialog("close");
          }
      }
    });
  }

  //load html dynamically
  var loadTemplate = function (element, url, model) {
    element.load(url, function () {
      console.log("Loading html " + url);
      ko.applyBindings(model, element.get(0));
      setupDialog()
    });
  };

  var enableCanery = function() {
    var container = $('<div id="insertion_point"></div>')
    container.appendTo('body')
    loadTemplate(container, 'coui://ui/mods/{%= name %}/warning.html', model);
  }
/*
  if (model.buildVersion()) {
    enableCanery()
  } else {
    model.buildVersion.subscribe(enableCanery)
  }
*/
})()
