export async function onRequestPost(context) {
  const { request } = context
  const { email, password } = await request.json()

  // Exemplu simplu, fără DB reală
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
  }

  return new Response(JSON.stringify({ message: `User created: ${email}` }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
