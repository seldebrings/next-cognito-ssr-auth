import http from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import { apiResolver, parseBody } from 'next-server/dist/server/api-utils'

import login from '../signin'
import { NextApiRequest } from 'next'
import { createMocks } from 'node-mocks-http'
import { NextApiCookieResponse } from '../../../utils/types'

describe("/login", () => {
 test("With valid credentials, responds 200 and return, token cookie and auth object", async () => {
    expect.assertions(3)
    const { req, res } = createMocks<NextApiRequest, NextApiCookieResponse>({
      method: 'POST',
      body: {
        email: 'correct@email.com',
        password: 'correct_password',
      }
    });
    await login(req as any, res as NextApiCookieResponse)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getHeaders()['set-cookie']).toMatch('token=123')
    expect(res._getJSONData()).toMatchObject({ jwt:"123", email: 'correct@email.com', authenticated: true })
  }) 

  test("responds 401 with incorrect credentials", async () => {
    expect.assertions(1)
    const { req, res } = createMocks<NextApiRequest, NextApiCookieResponse>({
      method: 'POST',
      body: {
        email: 'wrong@email.com',
        password: 'wrong_password',
      }
    });
    return login(req as any, res).catch(e => expect(e).toMatchObject({ statusCode:401 }));
  })
}) 