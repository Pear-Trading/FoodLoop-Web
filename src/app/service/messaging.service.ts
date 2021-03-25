import { Injectable } from '@angular/core';
import { ApiService } from '../providers/api-service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private readonly angularFireMessaging: AngularFireMessaging,
    private api: ApiService
  ) { }

	/**
	 * Requests user consent to send push notifications if this has not been
	 * granted and has not been previously denied (i.e., it won't spam people).
	 */
  requestPermission(): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support the Notifications API.');
      return;
    }
    
    switch (Notification.permission) {
      case 'granted':
      	console.debug('Push notification permission granted');
      	this.registerDeviceToken();
      	break;
    	case 'denied':
    		console.debug('Push notification permission refused');
    		break;
    	default:
      	console.debug('Push notification permission not granted');
      	Notification.requestPermission().then(function(permission: string) {
		      if (permission === 'granted') {
		        console.debug('Push notification permission granted');
		        this.registerDeviceToken();
		      }
		    });
    }
  }

	/**
	 * Request a unique token for a given device and send it to the server to store
	 * in the database (if it doesn't already exist).
	 */
  registerDeviceToken(): void {
    this.angularFireMessaging.requestToken.subscribe((token: string) => {
      this.api.checkDeviceToken({'token': token}).subscribe(
        result => {
          if (result.exists) { 
          	console.debug('Device already registered.'); 
            localStorage.setItem('devicetoken', token);
          } else {
            this.api.addDeviceToken({'token': token, 'email': localStorage.getItem('email')}).subscribe(
              result => {
                console.debug('Device registered successfully.');
                localStorage.setItem('devicetoken', token);
              },
              error => {
                console.error('Device could not be registered.', error._body);
              }
            );
          }
        },
        error => {
          console.error(error._body);
        }
      );
    }, (err) => {
      console.error('Unable to get token.', err);
    });
  }

	/**
	 * Display a newly-received message as a Notification.
	 */
  receiveMessage(): void {
    this.angularFireMessaging.messages.subscribe((message) => {
      console.debug('Message received:', message);
    	this.displayNotification(message['notification']);
      this.currentMessage.next(message);
    });
  }
  
  /**
   * Display a message as a notification (if the Notifications API) is supported,
   * or an alert (if not).
   *
   * @param notification The notification object to display.
   */
  displayNotification(notification): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support the Notifications API.');
      window.alert(`${notification.title}\n${notification.body}`);
    } else {
    	console.log(window.location.origin);
		  var options = {
				  body: notification.body,
				  icon: window.location.origin + "/assets/img/logo-128.png",
			}
		  const noti = new Notification(notification.title, options);
  	}
  }
}
