import app from '../../src/app';

describe('\'discounts\' service', () => {
  it('registered the service', () => {
    const service = app.service('discounts');
    expect(service).toBeTruthy();
  });
});
