const config = require('../../config/config');
jest.mock('request-promise');
const request = require('request-promise');
const mockFlickrResponseObject = require('../__mocks__/mockFlickrResponse');

describe('Testing getFlickrFeed route to call flickr api', () => {
  test('testing getFlickrFeed route', async () => {
    request.get.mockImplementation(() => Promise.resolve(mockFlickrResponseObject.mockResponseObject));
    const response = await request.get(config + 'kitten');
    console.log(response);
    expect(response.items.length).toBe(2);
  });
});
