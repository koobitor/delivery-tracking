const axios = require('axios')
const cheerio = require('cheerio')

exports.cj = async (id) => {
  const url = "http://thagnexs.cjkx.net/web/g_detail.jsp?slipno=" + id

  const html = await axios
    .get(url)
    .then(result => result.data)

  const result = await Promise
    .all([html])
    .then(result => result)

  const $ = await cheerio.load(result[0])

  const check = $('table').eq(0).text().trim()

  if(check != ""){
    // tracking_id, status
    const bill = $('table').eq(0).text().trim().replace('Bill No. : ','').split('(')
    const tracking_id = bill[0].trim()
    const status = bill[1].replace(')','')

    // sender, recipient, consignee
    const basic = $('table').eq(2).find('tr').eq(1)
    const sender = basic.find('td').eq(0).text().trim()
    const recipient = basic.find('td').eq(1).text().trim()
    const consignee = basic.find('td').eq(3).text().trim()

    // agent
    const agent = $('table').eq(4).find('tr')
    const pickup = agent.eq(1)
    const delivery = agent.eq(2)
    const pickup_agent_name = pickup.find('td').eq(1).text().trim()
    const pickup_agent_tel = pickup.find('td').eq(2).text().trim()
    const pickup_dm = pickup.find('td').eq(3).text().trim()
    const pickup_dm_phone = pickup.find('td').eq(4).text().trim()
    const delivery_agent_name = delivery.find('td').eq(1).text().trim()
    const delivery_agent_tel = delivery.find('td').eq(2).text().trim()
    const delivery_dm = delivery.find('td').eq(3).text().trim()
    const delivery_dm_phone = delivery.find('td').eq(4).text().trim()

    // tracking
    let trackings = []
    const tracking = $('table').eq(6).find('tr')
    tracking.each((i,item) => {
      if(i > 0){
        const row = $(item).find('td')
        const date = row.eq(0).text().trim()
        const time = row.eq(1).text().trim()
        const agent = row.eq(2).text().trim()
        const scan_division = row.eq(3).text().trim()
        const etc = row.eq(4).text().trim()

        trackings.push({
          "date": date,
          "time": time,
          "agent": agent,
          "scan_division": scan_division,
          "etc": etc
        })
      }
    })

    return {
      "tracking_id": tracking_id,
      "status": status,
      "sender": sender,
      "recipient": recipient,
      "consignee": consignee,
      "agent": {
        "pickup": {
          "agent_name": pickup_agent_name,
          "agent_tel": pickup_agent_tel,
          "dm": pickup_dm,
          "dm_phone": pickup_dm_phone
        },
        "delivery": {
          "agent_name": delivery_agent_name,
          "agent_tel": delivery_agent_tel,
          "dm": delivery_dm,
          "dm_phone": delivery_dm_phone
        }
      },
      "tracking": trackings
    }
  }else{
    return {
      "error": "invalid_order_no",
      "msg": "Invalid Order No.!"
    }
  }
}