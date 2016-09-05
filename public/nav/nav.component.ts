import { Component, Inject, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Sessions } from '../sessions/sessions.service';
import { CurrentUser } from '../security/currentUser.model';
import { UnreviewedSessionCount } from '../sessions/unreviewedSessionCount.service';
import { CurrentIdentity } from '../security/currentIdentity.service';

@Component({
  selector: 'nav',
  templateUrl: '/nav/nav.component.html'
})
export class NavComponent {

  currentUser: CurrentUser;
  
  constructor(
    private currentIdentity: CurrentIdentity,
    private sessions : Sessions, 
    @Inject('toastr') private toastr, 
    private unreviewedSessionCount: UnreviewedSessionCount,
    private changeDetectorRef: ChangeDetectorRef) {

    this.currentUser = currentIdentity.currentUser;
    
    unreviewedSessionCount.updateUnreviewedSessionCount(function() {
      changeDetectorRef.detectChanges();
    });
  }
  
}
