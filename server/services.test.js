'use strict';

const path = require('path');

const services = require('./services');

describe('listDpaths', () => {
  test('', () => {
    var dpaths = services.listDpaths(path.resolve('./test/list-dpaths'));
    expect(dpaths).toEqual([
      path.resolve('./test/list-dpaths/d1'),
      path.resolve('./test/list-dpaths/d2'),
      path.resolve('./test/list-dpaths/d2/d1'),
      path.resolve('./test/list-dpaths/d2/d2'),
      path.resolve('./test/list-dpaths/d2/d1/d1'),
    ]);
  });
});

describe('listFpaths', () => {
  test('', () => {
    var fpaths = services.listFpaths(path.resolve('./test/list-fpaths'));
    expect(fpaths).toEqual([
      path.resolve('./test/list-fpaths/1.txt'),
      path.resolve('./test/list-fpaths/2.txt'),
    ]);
  });
});



describe('moveFpaths', () => {
  test('', () => {

  });
});



try {
  services.removeFpaths([
    path.resolve('./test/remove-fpaths/1.txt')
  ]);
} catch (e) {
  console.log('ERR');
console.log(e.stack);
console.log('ERR');

}
