import Auth0Lock from 'auth0-lock'
// import Auth0LockPasswordless from 'auth0-lock-passwordless'
import jwtDecode from 'jwt-decode'

var url = require('../images/phonenumber.svg')

export default class AuthService {
  options = {
    auth: {
      redirectUrl: 'http://localhost:3000/callback',
      responseType: 'token'
    },
    avatar: {
      url: function(email, cb) {
        // Obtain the avatar url for the email input by the user, Lock
        // will preload the image before displaying it.
        // Note that in case of an error you call cb with the error in
        // the first arg instead of `null`.
        var url = null// obtainAvatarUrl(email);
        cb(null, url)
      },
      displayName: function(email, cb) {
        // Obtain the display name for the email input by the user.
        // Note that in case of an error you call cb with the error in
        // the first arg instead of `null`.
        var displayName = '' //obtainDisplayName(email);
        cb(null, displayName)
      }
    },
    languageDictionary: {
      title: '',
      emailInputPlaceholder: 'Email',
      passwordInputPlaceholder: 'Password',
      usernameInputPlaceholder: 'Username',
      usernameOrEmailInputPlaceholder: 'Username or Email'
    },
    showIcon: false,
    socialButtonStyle: 'small',
    theme: {
      logo: 'http://cdn.onlinewebfonts.com/svg/download_518099.png',
      authButtons: {
        'google': {
          displayName: 'Test Conn', 
          primaryColor: '#b7b7b7', 
          foregroundColor: '#000000', 
          icon: 'http://example.com/icon.png'
        },
      },
      labeledSubmitButton: false,
      primaryColor: '#fa8e2e',
    },
    additionalSignUpFields: [{
      name: 'phone',
      placeholder: 'Phone',
      type: 'number',
      icon: url,
      validator: function(phonenumber) {
        return {
          valid: phonenumber.length > 6,
          hint: 'Must be a valid phone number',
        }
      } 
    }
      
    ]
  }

  constructor(clientId, domain) {
    
    // Configure Auth0 lock
    this.lock = new Auth0Lock(clientId, domain, this.options)
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  themeChanged = false
  changeTheme() {
    if (this.themeChanged == false)
    {
      var customStyle = ''
      customStyle += '.auth0-lock-header-bg-blur { background-image: none!important } .auth0-lock-header-bg { background: white!important; } .auth0-lock-header-bg-solid { background-color: white!important } '
      customStyle += '.auth0-lock-social-button { margin: 0px 20px!important; } '
      customStyle += '.auth0-lock-social-button-icon { display: none!important; } '
      customStyle += '.auth0-lock-social-button[data-provider^=google] { background-color:white!important; background-image: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' viewBox=\'0 0 48 48\'><defs><path id=\'a\' d=\'M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z\'/></defs><clipPath id=\'b\'><use xlink:href=\'#a\' overflow=\'visible\'/></clipPath><path clip-path=\'url(#b)\' fill=\'#FBBC05\' d=\'M0 37V11l17 13z\'/><path clip-path=\'url(#b)\' fill=\'#EA4335\' d=\'M0 11l17 13 7-6.1L48 14V0H0z\'/><path clip-path=\'url(#b)\' fill=\'#34A853\' d=\'M0 37l30-23 7.9 1L48 0v48H0z\'/><path clip-path=\'url(#b)\' fill=\'#4285F4\' d=\'M48 48L17 24l-4-3 35-10z\'/></svg>")!important; } '
      customStyle += '.auth0-lock-social-button[data-provider^=linkedin] { background-color:white!important; background-image: url("data:image/svg+xml;utf8,<svg id=\'Layer_1\' data-name=\'Layer 1\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 57 57\'><defs><style> .cls-1 { fill: #259ad6; } </style></defs><title>linkedin-logo-blue</title><path class=\'cls-1\' d=\'M55,34.22V53.78H43.62V35.53c0-4.58-1.64-7.71-5.74-7.71A6.2,6.2,0,0,0,32.05,32a7.77,7.77,0,0,0-.38,2.76V53.78H20.33s.15-30.92,0-34.12H31.68V24.5l-.07.11h.07V24.5A11.27,11.27,0,0,1,41.9,18.86C49.36,18.86,55,23.74,55,34.22Zm-46.5-31C4.58,3.22,2,5.76,2,9.11S4.51,15,8.31,15h.07c4,0,6.42-2.62,6.42-5.9S12.34,3.22,8.46,3.22ZM2.72,53.78H14.06V19.66H2.72Zm0,0\' /></svg>")!important; } '
      customStyle += '.auth0-lock-social-button[data-provider^=windows] { background-color:white!important; background-image: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' viewBox=\'0 0 439 439\'><rect height=\'439\' width=\'439\' fill=\'#f3f3f3\'/><rect height=\'194\' width=\'194\' x=\'17\'  y=\'17\'  fill=\'#F35325\'/><rect height=\'194\' width=\'194\' x=\'228\' y=\'17\'  fill=\'#81BC06\'/><rect height=\'194\' width=\'194\' x=\'17\'  y=\'228\' fill=\'#05A6F0\'/><rect height=\'194\' width=\'194\' x=\'228\' y=\'228\' fill=\'#FFBA08\'/></svg>")!important; } '

      var styleId = 'auth0-lock-style'
      var style = document.getElementById(styleId)
      if (style.styleSheet) {
        style.styleSheet.cssText = customStyle + style.styleSheet.cssText
      } else {
        style.innerHTML = customStyle + style.innerHTML
      }

      this.themeChanged = true

      console.log('Auth0Lock Theme is changed to custom style')
    }
  }

  // ======================================================
  // Public methods
  // ======================================================
  login() {
    this.changeTheme()
    console.log(url)
    

    // Call the show method to display the widget.
    this.lock.show()
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }

  // ======================================================
  // Static methods
  // ======================================================
  static getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken()
    return !!token && !AuthService.isTokenExpired(token)
  }

  static setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
  }

  // getProfile(){
  //   // Retrieves the profile data from localStorage
  //   const profile = localStorage.getItem('profile')
  //   return profile ? JSON.parse(localStorage.profile) : {}
  // }

  static setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  static getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  static getTokenExpirationDate() {
    const token = AuthService.getToken()
    const decoded = jwtDecode(token)
    if(!decoded.exp) {
      return null
    }

    const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp)
    return date
  }

  static isTokenExpired() {
    const token = AuthService.getToken()
    if (!token) return true
    const date = AuthService.getTokenExpirationDate(token)
    const offsetSeconds = 0
    if (date === null) {
      return false
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }
}
