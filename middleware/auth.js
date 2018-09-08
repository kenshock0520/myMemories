export default function ({ store, redirect, route }) {
    // store.state.user != null && route.name == 'login' ? redirect('/') : ''
    // store.state.user == null && isAdminRoute(route) ? redirect('/login') : ''
    if (store.state.user == null && route.name !== 'login') {
        redirect('/login')
    }
    if (store.state.user != null && route.name === 'login') {
        redirect('/')
    }
}
// function isAdminRoute(route) {
//    if (route.matched.some(record => record.path == '/admin')) {
//        return true
//    }
// }
