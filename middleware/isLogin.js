export default async function({ app, redirect }) {
  let token =
    app.$cookies.cookies && app.$cookies.cookies.token
      ? app.$cookies.cookies.token
      : null
  // let path = process.server ? req.path : route.path
  if (!token) {
    redirect({ path: '//m.xxx.com/account/register' })
  }
}
