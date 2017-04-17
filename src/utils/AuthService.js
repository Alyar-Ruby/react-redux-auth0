import Auth0Lock from 'auth0-lock'
// import Auth0LockPasswordless from 'auth0-lock-passwordless'
import jwtDecode from 'jwt-decode'
import phoneNumberIcon from '../images/phonenumber.svg'
import socialIconGoogle from '../images/google_g_logo.svg'
import socialIconLinkedin from '../images/linkedin-logo-blue.svg'
import socialIconMicrosoft from '../images/microsoft_logo.svg'

export default class AuthService {
  options = {
    auth: {
      redirectUrl: 'http://localhost:3000/dashboard',
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
    additionalSignUpFields: [
      {
        name: 'phone',
        placeholder: 'Phone',
        type: 'number',
        icon: phoneNumberIcon,
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
      console.log(socialIconMicrosoft)

      var customStyle = ''
      customStyle += '.auth0-lock-header-bg-blur { background-image: none!important } .auth0-lock-header-bg { background: white!important; } .auth0-lock-header-bg-solid { background-color: white!important } '
      customStyle += '.auth0-lock-social-button { margin: 0px 20px!important; } '
      customStyle += '.auth0-lock-social-button-icon { display: none!important; } '
      customStyle += '.auth0-lock-social-button[data-provider^=google] { background-color:white!important; background-image: url(' + socialIconGoogle + ')!important; } '
      customStyle += '.auth0-lock-social-button[data-provider^=linkedin] { background-color:white!important; background-image: url(' + socialIconLinkedin + ')!important; } '
      customStyle += '.auth0-lock-social-button[data-provider^=windows] { background-color:white!important; background-image: url(' + socialIconMicrosoft + ')!important; } '

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
