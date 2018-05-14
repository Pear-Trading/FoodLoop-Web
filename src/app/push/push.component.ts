import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../config.service';
import { SwPush } from '@angular/service-worker';
import { ApiService } from '../providers/api-service';
import "rxjs/Rx";


@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
export class PushComponent implements OnInit {

  subscribeButton = false;
  unsubscribeButton = true;

  private VAPID_PUBLIC_KEY: string;

  tweets = []


  constructor(private api: ApiService, private configService: ConfigService, private swPush: SwPush) {
  }

  ngOnInit() {
    this.VAPID_PUBLIC_KEY = this.configService.get('VAPID_PUBLIC_KEY')
  }

  subscribeToPush() {

      // Requesting messaging service to subscribe current client (browser)

      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(pushSubscription => {

          // Passing subscription object to our backend
          console.log(pushSubscription.endpoint)
          console.log(pushSubscription.getKey)
          this.api.addSubscriber(pushSubscription)
            .subscribe(
            res => {
              console.log('[App] Add subscriber request answer', res)
              this.subscribeButton = true;
              this.unsubscribeButton = false;
            },
            err => {
              console.log('[App] Add subscriber request failed', err)
            }
            )
        })
        .catch(err => {
          console.error(err);
        })
    }

  unsubscribeFromPush(){

    this.subscribeButton = false;
    this.unsubscribeButton = true;
    // Get active subscription
    this.swPush.subscription
      .take(1)
      .subscribe(pushSubscription => {
        console.log('[App] pushSubscription', pushSubscription)
        // Delete the subscription from the backend
        this.api.deleteSubscriber(pushSubscription)
          .subscribe(
          res => {
            console.log('[App] Delete subscriber request answer', res)
            // Unsubscribe current client (browser)
            pushSubscription.unsubscribe()
              .then(success => {
                console.log('[App] Unsubscription successful', success)
              })
              .catch(err => {
                console.log('[App] Unsubscription failed', err)
              })

          },
          err => {
            console.log('[App] Delete subscription request failed', err)
          }

          )

      })
    }
}
