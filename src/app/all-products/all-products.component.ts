import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any = []
  constructor (private api:ApiService,private toaster:ToasterService){}

  ngOnInit(): void {
    this.api.getAllProductsAPI().subscribe((res:any)=>{
      this.allProducts = res
    })
  }

  addtoWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addTowhishlistAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.title} added to your whishlist!!!`)
          this.api.getWhishlistCount()
        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)
        }
      })
      
    }else{
    this.toaster.showWarning("Operation Deneid.....Please login")
    }
  }

  addtoCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addtocartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(res)
          this.api.getCartCount()
        },
        error:(err:any)=>{
          console.log(err);
          this.toaster.showError(err.error)
        }
      })
      // this.toaster.showSuccess("Proceed to add item to cart")
    }else{
     this.toaster.showWarning("Operation Deneid.....Please login")
    }
  }

}
