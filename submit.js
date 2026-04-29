exports.handler = async (event) => {
  if (event.httpMethod \!== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { fields } = JSON.parse(event.body);
  const TOKEN    = process.env.AIRTABLE_TOKEN;
  const BASE_ID  = process.env.AIRTABLE_BASE_ID;
  const TABLE_ID = process.env.AIRTABLE_TABLE_ID;

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields })
  });

  const data = await res.json();
  return {
    statusCode: res.ok ? 200 : res.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
};
