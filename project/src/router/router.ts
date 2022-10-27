export enum AppRoute {
  Main = '/',
  Login = './login',
  Offer = './offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
