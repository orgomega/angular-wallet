
import {KeycloakService} from 'keycloak-angular'

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8080',
          realm: 'wallet',
          clientId: 'angular-web-client'
        },
        initOptions:{
          checkLoginIframe:true,
          checkLoginIframeInterval:25
        },
        loadUserProfileAtStartUp:true
      });
  }