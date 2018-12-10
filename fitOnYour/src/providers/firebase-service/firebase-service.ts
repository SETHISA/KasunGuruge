
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';



/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
 
export class FirebaseServiceProvider {
a:Number
b:Number
age
userId
  constructor(public afd:AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  

   getCustomerDetails(){
    
    return this.afd.list(this.userId+'/Shop1/customerDetails/');
  }

  addCustomerDetails(name, age, waist, chest){
    this.afd.list(this.userId+'/Shop1/customerDetails/').push({name, age ,waist, chest});
  }

  removeCustomerDetails(id){
    console.log("id="+id);
    this.afd.list(this.userId+'/Shop1/customerDetails/').remove(id);
    
  }


 


  getCartDetails(){
    return this.afd.list(this.userId+'/Shop1/cartDetails/');
  }
  addItemToCart(name, age, waist, chest,time, imageUrl){
    this.afd.list(this.userId+'/Shop1/cartDetails/').push({name, age ,waist, chest,time,imageUrl});
  }
  removeItemToCart(id){
    this.afd.list(this.userId+'/Shop1/cartDetails/').remove(id);
  }




  getShopDetails(){
    return this.afd.list('Shop1/details/');
  }
  addShopDetails(details){
    this.afd.list('Shop1/details/').push({details});
  }

  updateShopDetails(details){
    this.afd.object('Shop1/details').update({
      details:details
    });
  }
  removeShopDetails(id){
    this.afd.list('Shop1/details/').remove(id);
  }
  


youngUpdate(youngCount ){
    this.afd.object('Shop1/youngerCount').update({
      countY:youngCount
    });
   
}
eldUpdate(elderCount){
  this.afd.object('Shop1/elderCount').update({
    countE:elderCount
  });
}

 getYoungerCount(callBack1){

  this. afd.list('Shop1/youngerCount')
  .subscribe(data => {
    
     this.a=data[0].$value;
     callBack1(this.a);
     
  },
  (ex) => {
      console.log('Found exception: ', ex);
  });
  
}


 getElderCount(callBack1){
 
   this. afd.list('Shop1/elderCount')
.subscribe(data => {
   
   this.b=data[0].$value;
   callBack1(this.b);
   
},
(ex) => {
    console.log('Found exception: ', ex);
});






// return this.valu2[0];
//console.log(this.a[0]);
// return this.afd.list('/Shop1/elderCount');
}


getAge(id,callBack1){

  this.afd.list(this.userId+'/Shop1/cartDetails/'+id)
  .subscribe(data => {
    this.age=data[0].$value;
    callBack1(this.age);
  })

}


}
