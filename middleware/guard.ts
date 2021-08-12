import moment from "moment";
import {GET_API_IS_ADMIN} from "../static/ApiUrls";
// @ts-ignore
export default async function (context) {
  const token = JSON.parse(<string>localStorage.getItem('token'));
  console.log('token', token);
  let isAdmin = false;
  if (token) {
    const res = await context.$axios.$get(GET_API_IS_ADMIN()+'/'+token.user_id);
    isAdmin = res.data;
  }

  if (!token && context.route.name !== 'index') {
    return context.redirect('/');
    // @ts-ignore
  } else if (!isAdmin && context.route.name.includes('admin')) {
    console.log(isAdmin, context.route.name, context.route.name.includes('admin'))
    return context.redirect('/game');
  } else if (token && token.expiration && moment(token.expiration) < moment()) {
    localStorage.removeItem('token');
    return context.redirect('/');
  }
}
