/* jshint node: true */
/* global describe, it */

var json   = require('../');
var gulp   = require("gulp");
require('should');
require('mocha');

describe('gulp-json-editor', function() {
  describe('#json()', function() {

    it('should modify property of JSON object (by object editor)', function(done) {

      var stream = gulp.src('test/test.json').pipe(json({
        version: '2.0.0'
      }));

      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.should.have.properties({
          'name': 'test object',
          'version': '2.0.0'
        });
      }).on('end', done);

    });

    it('should add property of JSON object (by object editor)', function(done) {
 
      var stream = gulp.src('test/test.json').pipe(json({
        description: 'this is test'
      }));
 
      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.should.have.properties({
          'name': 'test object',
          'version': '1.0.0',
          'description': 'this is test'
        });
      }).on('end', done);
    });

    it('should modify nested property of JSON object (by object editor)', function(done) {

      var stream = gulp.src('test/test.json').pipe(json({
        nested: {
          version: '2.0.1'
        }
      }));

      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.nested.should.have.properties({
          'name': 'nested object',
          'version': '2.0.1'
        });
      }).on('end', done);
    });

    it('should add nested property of JSON object (by object editor)', function(done) {

      var stream = gulp.src('test/test.json').pipe(json({
        nested: {
          description: 'this is test for nested'
        }
      }));

      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.nested.should.have.properties({
          'name': 'nested object',
          'version': '1.0.0',
          'description': 'this is test for nested'
        });
      }).on('end', done);
    });

    it('should multiple properties of JSON object (by object editor)', function(done) {

      var stream = gulp.src('test/test.json').pipe(json({
        version: '2.0.0',
        description: 'this is test',
        nested: {
          version: '2.0.1',
          description: 'this is test for nested'
        }
      }));

      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.should.have.properties({
          'version': '2.0.0',
          'description': 'this is test',
          'name': 'test object'
        });
        obj.nested.should.have.properties({
          'version': '2.0.1',
          'description': 'this is test for nested',
          'name': 'nested object'
        });
      }).on('end', done);
    });

  });
});
