'use strict';

// Basic template description.
exports.description = 'Create a minimal mod for Planitary Annihilation';

// Template-specific notes to be displayed before question prompts.
//exports.notes = ''

// Template-specific notes to be displayed after question prompts.
exports.after = "Note: you may want to work on a copy of modinfo.json and copy it back if you're using PAMM.  PAMM rewrites the file without formmating every time you toggle enabled." +
  "\n\n" +
  "For further modding info, check out the forums." +
  "\n\n" +
  "https://forums.uberent.com/threads/pa-modding-reference-guides-applications-tools.48136/" +
  "https://forums.uberent.com/threads/guide-getting-your-mod-on-pamm.55189/";

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  init.process({type: 'grunt'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description', 'Hot fix for... in version...'),
    init.prompt('author_name'),
    init.prompt('author_identifier', function(value, props, done) {
      done(null, 'pa.' + props.author_name + '.')
    }),
    init.prompt('identifier', function(value, props, done) {
      done(null, props.author_identifier + props.name)
    }),
    init.prompt('version'),
    init.prompt('forum'),
    init.prompt('licenses', 'Apache-2.0'),
    init.prompt('scene', 'live_game'),
    init.prompt('build'),
  ], function(err, props) {
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    //init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
