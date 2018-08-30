const tracking = require('./index')

describe('#CJ Tracking', () => {
  it('correct json format', async () => {
    const tracking_id = "600015473603"

    await Promise
      .all([tracking.cj(tracking_id), tracking.cj('0')])
      .then(result => {
        const success = result[0]
        const error = result[1]

        expect(success).toMatchObject(expect.objectContaining({
          tracking_id: expect.any(String),
          sender: expect.any(String),
          recipient: expect.any(String),
          consignee: expect.any(String),
          agent: {
            pickup: {
              agent_name: expect.any(String),
              agent_tel: expect.any(String),
              dm: expect.any(String),
              dm_phone: expect.any(String)
            },
            delivery: {
              agent_name: expect.any(String),
              agent_tel: expect.any(String),
              dm: expect.any(String),
              dm_phone: expect.any(String)
            }
          },
          tracking: expect.arrayContaining([
            expect.objectContaining({
              date: expect.any(String),
              time: expect.any(String),
              agent: expect.any(String),
              scan_division: expect.any(String),
              etc: expect.any(String)
            })
          ])
        }))

        expect(error).toEqual(expect.objectContaining({
          error: expect.any(String),
          msg: expect.any(String)
        }))
      })
  })
})