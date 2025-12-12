import rpc from './rpc'

export default async function getNotionUsers(ids: string[]) {
  // Return mock users for now since we're using the official API
  // which doesn't expose user details the same way
  const users: any = {}

  for (const id of ids) {
    users[id] = { full_name: id }
  }

  return { users }
}
