import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
 SERVER_URL ="http://localhost:3000"

//  behaivior subject
  wishlistCount = new BehaviorSubject(0)
  cartCount =  new BehaviorSubject(0)
  

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWhishlistCount()
      this.getCartCount()
    }
  }

  getAllProductsAPI(){
   return this.http.get(`${this.SERVER_URL}/products/all`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }

  LoginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }

  getProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/product/get/${id}`)
  }

  appendTokenHeader(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // whishlist/add/
  addTowhishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/whishlist/add`,product,this.appendTokenHeader())
  }

  // /whishlist/get-allproducts
  getWhishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/whishlist/get-allproducts`,this.appendTokenHeader())
  }

  getWhishlistCount(){
    this.getWhishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
 })
  }


// /wishlist/remove/:id
deleteWishlistItemAPI(id:any){
  return this.http.delete(`${this.SERVER_URL}/wishlist/remove/${id}`,this.appendTokenHeader())
}

// cart/add
addtocartAPI(product:any){
  return this.http.post(`${this.SERVER_URL}/cart/add`,product,this.appendTokenHeader())
}

// /cart/get-all-products
getCartAPI(){
   return this.http.get(`${this.SERVER_URL}/cart/get-all-products`,this.appendTokenHeader()) 
}

getCartCount(){
  this.getCartAPI().subscribe((res:any)=>{
    this.cartCount.next(res.length)
})
}

}
