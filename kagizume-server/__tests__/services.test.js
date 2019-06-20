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

});
