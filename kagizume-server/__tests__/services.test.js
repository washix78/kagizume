'use strict';

const path = require('path');

const services = require('../services/services');

describe('services', ()=> {

  test('listDpaths', () => {
    expect(services.listDpaths('./__tests__/dir')).toEqual([
      `${__dirname}${path.sep}dir`,
      `${__dirname}${path.sep}dir${path.sep}dir_1`,
      `${__dirname}${path.sep}dir${path.sep}dir_2`,
      `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_21`,
      `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_21${path.sep}dir_211`,
      `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_21${path.sep}dir_212`,
      `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_22`,
    ]);
  });

  test('listDirSummary', () => {
    expect(services.listDirSummary('./__tests__/dir')).toEqual([
      {
        path: `${__dirname}${path.sep}dir`,
        fileCount: 1
      }, {
        path: `${__dirname}${path.sep}dir${path.sep}dir_1`,
        fileCount: 1
      }, {
        path: `${__dirname}${path.sep}dir${path.sep}dir_2`,
        fileCount: 1
      }, {
        path: `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_21`,
        fileCount: 0
      }, {
        path: `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_21${path.sep}dir_211`,
        fileCount: 0
      }, {
        path: `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_21${path.sep}dir_212`,
        fileCount: 2
      }, {
        path: `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_22`,
        fileCount: 0
      }
    ]);
  });

  test('listFpaths', () => {
    expect(services.listFpaths('./__tests__/dir')).toEqual([
      `${__dirname}${path.sep}dir${path.sep}file_1.txt`,
    ]);
    expect(services.listFpaths('./__tests__/dir/dir_2/dir_21')).toEqual([]);
    expect(services.listFpaths('./__tests__/dir/dir_2/dir_21/dir_212')).toEqual([
      `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_21${path.sep}dir_212${path.sep}file_2121.txt`,
      `${__dirname}${path.sep}dir${path.sep}dir_2${path.sep}dir_21${path.sep}dir_212${path.sep}file_2122.txt`,
    ]);
  });

});
